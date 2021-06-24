<template>
<div class="news">
    <header>
        <div class="container">
           <iframe class="frame-top" src="/main.html" scrolling="no" frameborder="0"></iframe>
            <h2 v-if="lang=='rus'">Новости</h2>
            <h2 v-if="lang=='eng'" >News</h2>
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
                <li @click="openNew(i-1)" v-for="i in count" class="infinite-list-item" :key="i">
                    <div class="image" :style="'background: url(\''+news[i-1].img+'\') no-repeat center top / cover'"></div>
                    <div class="text">
                        <div class="meta">
                            <p> {{news[i-1].date}}</p>
                        </div>
                        <h3>{{news[i-1].header}}</h3>
                    </div>
                </li>

            </ul>
            <p class="scroll-msg" v-if="loading">Загружаем новости...</p>

        </div>
    </section>
    <el-dialog width="1100px" :visible.sync="dialog">
        <div class="image" :style="'background: url(\''+dc.img+'\') no-repeat center center / cover'"></div>
        <h3>{{dc.header}}</h3>
        <div class="text" v-html="dc.text"></div>
        <div class="video" v-html="dc.video"></div>
    </el-dialog>
</div>
</template>

<script>
export default {
    computed: {
         lang: function () {
            return this.$store.state.lang
        },
        noMore() {
            return this.count >= this.news.length - 1
        },
    },
    methods: {
        openNew(i) {
            const loading = this.$loading({
                
                text: 'Загрузка',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            this.dc.img = this.news[i].img
            this.dc.header = this.news[i].header
            this.dc.text = this.news[i].text
            this.dc.video = this.news[i].video
            setTimeout(() => {
                loading.close();
                this.dialog = true;
            }, 500);
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
                header: '',
                text: '',
                video: ''
            },
            dialog: false,
            loading: false,
            count: 6,
            
            news: [{
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера 1',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.',
                    
                    video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/lyh2kAjcmSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
                {
                    img: '/img/211.jpg',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim augue libero, nec tempor tortor sodales id. Mauris sit amet lacus quis risus facilisis convallis sed quis orci. Integer rhoncus nunc aliquam iaculis vehicula. Phasellus euismod condimentum nisi vel dignissim. Sed non rutrum sem. Curabitur condimentum diam ullamcorper volutpat euismod. Maecenas ut feugiat tortor. Vivamus vel lectus urna. Aliquam erat volutpat. Curabitur tempus odio vitae condimentum eleifend. Curabitur rutrum diam non massa fringilla, ac porta libero fermentum. Sed non tortor posuere, congue dui id, dapibus augue. Vestibulum urna lacus, pretium a vestibulum at, varius sit amet sapien. Integer dictum dignissim enim ac lobortis. Curabitur gravida maximus laoreet.'
                },
            ]
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
    .text{
        font-size: 16px;
    }
    iframe{
        width: 100%!important;
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
    section{
        .container{
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
        align-items: center;
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
@media (max-width: 1200px){
    .el-dialog{
        width: 100vw!important;
    }
}
@media (max-width:1100px){

    .news .infinite-list-item{
        max-width: unset;
    }
    .news section .container{
        padding: 0;
    }
    .news .infinite-list{
        padding-left: 0;
    }
}
@media (max-width: 500px) {
    .news .infinite-list-item .image{
        height: 250px;
    }
}
</style>
