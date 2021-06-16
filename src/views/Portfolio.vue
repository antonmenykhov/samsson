<template>
<div class="portfolio">
    <header>
        <iframe class="frame-top" src="/main.html" scrolling="no" frameborder="0"></iframe>
        <div class="container">

            <h2 v-if="lang=='rus'">Портфолио</h2>
            <h2 v-if="lang=='eng'">Portfolio</h2>
        </div>
    </header>
    <div class="section">
        <div class="container">
            <h4 v-if="lang=='rus'">Портфолио</h4>
            <h4 v-if="lang=='eng'">Portfolio</h4>
            <h2 v-if="lang=='rus'">Наши проекты</h2>
            <h2 v-if="lang=='eng'">Our projects</h2>
            <div class="progressbar"></div>
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li @click="openNew(i)" v-for="i in count" class="infinite-list-item" :key="i">
                    <div class="work-wrapper" :style="'background: url(\''+portfolio[i-1].acf.img+'\') no-repeat center top / cover'">
                    </div>
                    <div class="text">
                        <h3>{{portfolio[i-1].acf.name[lang]}}</h3>
                        <el-button v-if="lang=='rus'">Подробнее</el-button>
                        <el-button v-if="lang=='eng'">More</el-button>

                    </div>
                </li>

            </ul>
            <p class="scroll-msg" v-if="loading">Загружаем проекты...</p>
        </div>
    </div>
    <el-dialog width="1200px" :visible.sync="dialog">
        <div class="work-card">
            <div class="image" :style="'background: url(\''+dc.img+'\') no-repeat center top / cover'">

            </div>
            <div class="text">
                <h3>{{dc.name}}</h3>
                <p v-html="dc.text"></p>
            </div>
            <div  class="gallery">
                <h3 v-if="dc.gallery[0]">Галерея</h3>
                <div class="image-gallery">
                    <div @click="openLightBox(i)" class="gallery-item" v-for="item,i in dc.gallery" :key="i" :style="'background: url(\''+item.thumb+'\') no-repeat center center / cover'"></div>
                </div>
                <LightBox v-touch="swipe"  ref="lightbox" :show-caption="true" :show-light-box="false" :media="dc.gallery"></LightBox>
                
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import LightBox from '../components/LightBox.vue'
require('vue-it-bigger/dist/vue-it-bigger.min.css')
export default {
    components: {
        LightBox
    },
    methods: {
        openLightBox(index) {
      this.$refs.lightbox.showImage(index)
    },
        

        openNew(i) {
            const loading = this.$loading({

                text: 'Загрузка',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            this.dc.img = this.portfolio[i - 1].acf.img
            this.dc.name = this.portfolio[i - 1].acf.name[this.lang]
            this.dc.text = this.portfolio[i - 1].acf.description[this.lang]
            
            this.getGallery(i)
            setTimeout(() => {
                loading.close();
                this.dialog = true;
            }, 500);
        },
        getGallery(i) {
            
           
             this.dc.gallery=[];

            for (let j = 0; j < this.portfolio[i - 1].acf.gallery.length; j++) {
                let item = this.portfolio[i - 1].acf.gallery[j];
                
                let arrItem = {}
                if (item.type == 'image') {
                    arrItem.type = item.type;
                    arrItem.thumb = item.img;
                    arrItem.src = item.img;
                    arrItem.caption = item.sign[this.lang]
                }
                if (item.type == 'youtube') {
                    arrItem.type = item.type;
                    arrItem.caption = item.sign[this.lang]
                    arrItem.id = item.video.split('=')[1];
                    arrItem.thumb = 'https://img.youtube.com/vi/' + arrItem.id + '/hqdefault.jpg';
                }
                this.dc.gallery.push(arrItem);
                
            }

            
            
        },
        load() {
            this.loading = true
            let razn = (this.portfolio.length - 1) - this.count;
            setTimeout(() => {

                if (razn >= 3) {
                    this.count += 3
                    this.loading = false
                }
                if (razn == 2) {
                    this.count += 2
                    this.loading = false
                }
                if (razn == 1) {
                    this.count += 1
                    this.loading = false
                }
                if (razn <= 0) {

                    this.loading = false
                }
            }, 500)
        }
    },
    computed: {
       

        lang: function () {
            return this.$store.state.lang
        },

        portfolio: function () {
            return this.$store.state.portfolio
        },

    },
    data() {
        return {

            loading: false,
            dialog: false,
            dc: {
                img: null,
                name: null,
                text: null,
                gallery: [],
            },
            count: 3,

        }
    },
}
</script>

<style lang="scss">
.vib-footer{
    font-size: 20px;
    text-align: center;
    background: rgba(0, 0, 0, 0.822)
}

.portfolio {
    .image-gallery{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .gallery-item{
            height: 200px;
            width: 200px;
            margin: 10px;
            cursor: pointer;
            transition: all .2s;
        }
        .gallery-item:hover{
            transform: scale(1.1);
        }
    }
    .work-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;

        .gallery {
            flex: 1 1 600px;
            height: auto;

            h3 {
                margin: 10px 0;
                padding: 10px;
                color: white;
                text-align: center;
                word-break: keep-all;
                font-size: 24px;

                background: #126B8F;
            }

            .el-carousel__item {

                .sign {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                    border-radius: 5px;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.522);
                    color: white;
                    font-size: 20px;
                    padding: 10px 0;
                }
            }
        }

        .image {
            flex: 1 1 300px;
            min-height: 350px;
            border-radius: 5px 0 0 0;
            height: auto;
        }

        .text {

            flex: 1 1 300px;
            position: unset;
            background: rgb(230, 230, 230);
            display: flex;
            margin-top: 0;
            flex-direction: column;
            border-radius: 0 5px 0 0;
            height: max-content;
            min-height: 350px;

            h3 {
                color: #126B8F;
                text-align: left;
                word-break: keep-all;
                font-size: 24px;
            }

        }
    }

    .infinite-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .infinite-list-item {
        fleX: 1 1 300px;
        height: 400px;
        margin: 15px;
        position: relative;
        list-style: none;
        cursor: pointer;
        overflow: hidden;

    }

    .work-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all .3s;
    }

    .infinite-list-item:hover {
        .text {
            transform: translateY(-50px);
        }

        .el-button {
            opacity: 1;
            transform: translateY(50px);
        }

        .work-wrapper {
            transform: scale(1.2);
        }
    }

    .text {
        position: absolute;
        text-align: center;
        transition: 0.3s;
        right: 20px;
        bottom: 35px;
        left: 20px;

        background: #126B8F;
        margin: auto;
        text-align: left;
        padding: 30px 20px 30px;
        border-radius: 5px;

        h3 {
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            margin: 0
        }

        .el-button {
            margin-top: 10px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            color: #126B8F;
            background-color: white;
            font-weight: 700;
            text-transform: uppercase;
            border: none;
            border-radius: 5px;
            padding: 12px 35px 12px 35px;
            transition: all .2s ease-in-out;
            transform: translateY(30px);
            opacity: 0;
            transition: 0.3s;
        }

        .el-button:hover {
            background: #126B8F;
            color: white;
        }
    }

    .section {
        .container {
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 50px 0;
        }

        h4 {
            color: #126B8F;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 15px;
            font-family: Rubik;
            letter-spacing: 5px;
        }

        h2 {
            font-size: 42px;
            margin-bottom: 0;
            text-transform: capitalize;
            margin-top: 0;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: -1px;
            color: #232323;
        }
    }
}
</style>
