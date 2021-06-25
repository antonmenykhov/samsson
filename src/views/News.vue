<template>
<div class="news">
    <header>
        <div class="container">
            <iframe class="frame-top" src="/main.html" scrolling="no" frameborder="0"></iframe>
            <h2 v-if="lang=='rus'">Новости</h2>
            <h2 v-if="lang=='eng'">News</h2>
        </div>
    </header>
    <section>
        <div class="container">
            <h4 v-if="lang=='rus'">Новости</h4>
            <h4 v-if="lang=='eng'">News</h4>
            <h2 v-if="lang=='rus'">Свежие факты</h2>
            <h2 v-if="lang=='eng'">New facts</h2>
            <div class="progressbar"></div>
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li @click="openNew(i)" v-for="news, i in news" class="infinite-list-item" :key="i">
                    <div class="image" :style="'background: url(\''+news.acf.img.sizes.large+'\') no-repeat center top / cover'"></div>
                    <div class="text">
                        <div class="meta">
                            <p> {{news.acf.date}}</p>
                        </div>
                        <h3>{{news.acf.name[lang]}}</h3>
                    </div>
                </li>

            </ul>
            <p class="scroll-msg" v-if="loading">Загружаем новости...</p>

        </div>
    </section>
    <el-dialog width="1100px" :visible.sync="dialog">
        <div class="image" :style="'background: url(\''+dc.img+'\') no-repeat center center / cover'"></div>
        <h3>{{dc.name[lang]}}</h3>
        <div class="text" v-html="dc.text[lang]"></div>
       
        <div class="image-gallery">
            <div @click="openLightBox(i)" class="gallery-item" v-for="item,i in dc.gallery" :key="i" :style="'background: url(\''+item.thumb+'\') no-repeat center center / contain'">

            </div>
        </div>
        <LightBox ref="lightbox" :showThumbs="false" :show-caption="false" :show-light-box="false" :media="dc.gallery"></LightBox>
    </el-dialog>
</div>
</template>

<script>
import LightBox from '../components/LightBox.vue'
require('../components/style.css')
export default {
    components:{
        LightBox
    },
    computed: {
        lang: function () {
            return this.$store.state.lang
        },
        noMore() {
            return this.count >= this.news.length - 1
        },
        news: function () {
            return this.$store.state.news
        }
    },
    methods: {
        openNew(i) {
            const loading = this.$loading({

                text: 'Загрузка',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            this.dc.img = this.news[i].acf.img.sizes[this.extralarge]
            this.dc.name = this.news[i].acf.name
            this.dc.text = this.news[i].acf.text
            this.getGallery(i)
            setTimeout(() => {
                loading.close();
                this.dialog = true;
            }, 500);
        },
        openLightBox(index) {
            this.$refs.lightbox.showImage(index)
        },
        getGallery(i) {

            this.dc.gallery = [];

            for (let j = 0; j < this.news[i].acf.gallery.length; j++) {
                let item = this.news[i].acf.gallery[j];

                let arrItem = {}
                if (item.type == 'image') {
                    arrItem.type = item.type;
                    arrItem.thumb = item.image.sizes.medium;
                    arrItem.src = item.image.sizes[this.extralarge];

                }
                if (item.type == 'youtube') {
                    arrItem.type = item.type;

                    arrItem.id = item.video.split('=')[1];
                    arrItem.thumb = 'https://img.youtube.com/vi/' + arrItem.id + '/hqdefault.jpg';
                }
                this.dc.gallery.push(arrItem);

            }

        },
        load() {
            this.loading = true
            let razn = (this.news.length - 1) - this.count;
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
    data() {
        return {
            dc: {
                img: '',
                name: '',
                text: '',
                gallery: '',
                video: ''
            },
            extralarge: '2048x2048',
            dialog: false,
            loading: false,
            count: 3,

        }
    },
}
</script>

<style lang="scss">
.el-dialog {
    h3 {
        font-size: 30px;
        color: #126B8F;
        width: 100%;
        text-align: center;
    }

    .image {
        width: 100%;
        height: 500px;
    }

    .text {
        font-size: 16px;
    }

    iframe {
        width: 100% !important;
        height: 400px;
        margin-top: 20px;
    }
}

.scroll-msg {
    font-family: Rubik;
    color: #126B8F;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.news {
    .el-dialog {
         h3{
             word-break: keep-all!important;
             text-align: center;
         }
        .text {
           word-break: keep-all!important;
            font-size: 18px;
        }
        .image-gallery{
            display: flex;
            width: 100%;
            justify-content: center;
        }
        .gallery-item{
            height: 200px;
            flex: 1 1 200px;
            max-width: 200px;
        }
    }

    section {
        .container {
            flex-direction: column;

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

    section {
        background: #f6f6f6;
        padding: 50px 0;
    }

    .infinite-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        width: 100%;
    }

    .infinite-list-item:hover {
        box-shadow: 6px 5px 30px rgb(0 0 0 / 12%);
        border-color: transparent;
    }

    .infinite-list-item {
        max-width: calc(33% - 30px);
        cursor: pointer;
        flex: 1 1 300px;
        margin: 15px;
        overflow: hidden;
        text-align: left;
        will-change: auto;
        -webkit-transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
        background: #fff;
        border-radius: 7px;
        border: 1px solid #e6e6e6;

        .image {
            height: 330px;
        }

        .text {
            padding: 28px 35px 30px;
        }

        .meta {
            display: flex;
            align-items: center;
            color: #616161;

            p {
                margin: 0 10px;
                font-family: Rubik;
            }

            p:first-child {
                margin-left: 0;
            }
        }

        h3 {
            font-size: 21px;
            color: #232323;
            transition: all .2s ease-in-out;
            will-change: auto;
        }

        h3:hover {
            color: #126B8F;
        }
    }
}

@media (max-width: 1200px) {
    .el-dialog {
        width: 100vw !important;
    }
}

@media (max-width:1100px) {

    .news .infinite-list-item {
        max-width: unset;
    }

    .news section .container {
        padding: 0;
    }

    .news .infinite-list {
        padding-left: 0;
    }
}

@media (max-width: 500px) {
    .news .infinite-list-item .image {
        height: 250px;
    }
}
.el-dialog__wrapper{
    z-index: 9999!important;
}
</style>
