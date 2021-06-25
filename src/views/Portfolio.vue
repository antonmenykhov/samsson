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
                <li @click="openNew(i)" v-for="i in count+1" class="infinite-list-item" :key="i">
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
    <div class="section reviews">
        <div class="container">
            <h4 v-if="lang=='rus'">Отзывы</h4>
            <h4 v-if="lang=='eng'">Reviews</h4>
            <h2 v-if="lang=='rus'">Отзывы наших партнеров</h2>
            <h2 v-if="lang=='eng'">Feedback from our partners</h2>
            <p class="sectDescription">{{reviews.text[lang]}}</p>

            <div class="image-gallery">
                <div @click="openLightBox2(i)" class="gallery-item" v-for="item,i in reviews.gallery" :key="i" :style="'background: url(\''+item+'\') no-repeat center center / cover'"></div>
            </div>
            <LightBox ref="lightbox2"  :showThumbs="false" :show-caption="true" :show-light-box="false" :media="revArr"></LightBox>
        </div>
    </div>
    <el-dialog width="1200px" :visible.sync="dialog">
        <div class="work-card">
            <div class="image" :style="'background: url(\''+dc.img+'\') no-repeat center top / cover'">

            </div>
            <div class="text">
                <h3>{{dc.name}}</h3>
                <p v-html="dc.text"></p>
                <div class="tools">
                    <div v-for="tool,i in dc.tools" :key="i" class="tool" :style="'background: url(\''+tool+'\') no-repeat center center / contain'"></div>
                </div>
            </div>
            <div class="gallery">
                <h3 v-if="dc.gallery[0]">Галерея</h3>
                <div class="image-gallery">
                    <div @click="openLightBox(i)" class="gallery-item" v-for="item,i in dc.gallery" :key="i" :style="'background: url(\''+item.thumb+'\') no-repeat center center / cover'">
                   <p> {{item.caption}}</p>
                    </div>
                </div>
                <LightBox ref="lightbox" :showThumbs="false" :show-caption="true" :show-light-box="false" :media="dc.gallery"></LightBox>

            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import LightBox from '../components/LightBox.vue'
require('../components/style.css')
export default {
    components: {
        LightBox
    },

    methods: {
        openLightBox(index) {
            this.$refs.lightbox.showImage(index)
        },
        openLightBox2(index) {
            this.getRewies()
            this.$refs.lightbox2.showImage(index)
        },

        openNew(i) {
            const loading = this.$loading({

                text: 'Загрузка',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            this.dc.img = this.portfolio[i - 1].acf.img
            this.dc.name = this.portfolio[i - 1].acf.name[this.lang]
            this.dc.text = this.portfolio[i - 1].acf.description[this.lang]
            this.dc.tools = this.portfolio[i - 1].acf.tools
            this.getGallery(i)
            setTimeout(() => {
                loading.close();
                this.dialog = true;
            }, 500);
        },
        getRewies() {
            this.revArr = [];
            for (let i = 0; i < this.reviews.gallery.length; i++) {
                this.revArr.push({
                    type: 'image',
                    thumb: this.reviews.gallery[i],
                    src: this.reviews.gallery[i],
                    caption: ''
                })

            }
        },
        getGallery(i) {

            this.dc.gallery = [];

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
        reviews: function () {
            return this.$store.state.reviews
        }

    },
    data() {
        return {
            revArr: [],
            loading: false,
            dialog: false,
            dc: {
                img: null,
                name: null,
                text: null,
                gallery: [],
                tools: [],
            },
            count: 3,

        }
    },
}
</script>

<style lang="scss">
.vib-footer {

    text-align: center;
    background: rgba(0, 0, 0, 0.822)
}

.portfolio {
    .image-gallery {
        
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
       


        .gallery-item {
            height: 200px;
            width: 200px;
            margin: 10px;
            cursor: pointer;
            transition: all .2s;
            will-change: auto;
            display: flex;
            align-items: flex-end;
            justify-content: stretch;
            p{
                text-align: center;
                background: rgba(0, 0, 0, 0.726);
                color: white;
                margin: 0;
                padding:4px 2px;
                word-break: keep-all;
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
            }
        }

        .gallery-item:hover {
            transform: scale(1.1);
        }
    }

    .work-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
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
        max-width: 350px;

    }

    .work-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all .3s;
        will-change: auto;
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
will-change: auto;
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
            will-change: auto;
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

.tools {
    display: flex;
    flex-wrap: wrap;
}

.tool {
    height: 50px;
    flex: 1 1 100px;
    margin: 10px;
}

.reviews {
    .image-gallery {
        .gallery-item {
            height: 500px;
            fleX: 1 1 300px;
            margin: 30px;
            border: 1px solid rgba(128, 128, 128, 0.541)
        }
    }
}
@media (max-width: 1210px){
    .el-dialog{
        width: 100vw!important;
    }
}

@media (max-width: 768px) {
    .portfolio .work-card .gallery h3{
        margin: 20px 10px;
    }
    .portfolio header h2{
        font-size: 40px!important;
    }
    .reviews .image-gallery .gallery-item{
        height: 350px;
    }
    .infinite-list {
        padding-left: 0;
    }

    .el-dialog__wrapper {
        .el-dialog {
            max-width: 100vw !important;
            width: 100vw !important;
        }
    }

    .portfolio .work-card .text {
        flex: unset;
        border-radius: 0 0 5px 5px;
    }

    .portfolio {
        .work-card {
            flex-direction: column;
            align-items: center !important;

            .image {
                flex: unset;
                height: 300px;
                width: 100%;
                border-radius: 5px 5px 0 0;
            }

            .text {
                width: 100%;
                margin: 0;
                h3{
                    text-align: center;
                }
            }

            .gallery {

                flex: 1 1 200px !important;
            }
            .image-gallery{
                .gallery-item{
                    height: 130px;
                    flex: 1 1 130px;
                }
            }
        }

    }
}
</style>
