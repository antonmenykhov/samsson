<template>
<div class="services">
    <header>
        <div class="container">
            <div class="top-line">
                <div class="logo">
                    <div class="logo-img"></div>
                    <div class="logo-text">{{$store.state.name[lang].name}}</div>
                </div>
                <div class="menu">
                    <div class="menu-item" v-for="item,i in menu[lang]" :key="i">
                        {{item.name}}
                    </div>
                    <div @click="changeLang" class="lang-switcher">
                        <el-switch v-model="langSwitch" inactive-text="RUS" active-text="ENG" active-value="eng" inactive-value="rus" active-color="#126B8F" inactive-color="#2EACDA">
                            ></el-switch>
                    </div>
                </div>

            </div>
            <h2>Новости</h2>
        </div>
    </header>
    <section>
        <div class="container">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="item,i in news" class="infinite-list-item" :key="i">
                    <div class="image" :style="'background: url(\''+item.img+'\') no-repeat center top / cover'"></div>
                    <div class="text">
                        <div class="meta">
                            <p> {{item.date}}</p>
                        </div>
                        <h3>{{item.header}}</h3>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</div>
</template>

<script>
export default {
    computed: {
        lang: function () {
            return this.$store.state.lang
        },
    },
    methods: {
        changeLang() {
            this.$store.commit('setLang', this.langSwitch);
            console.log(this.lang)

        }
    },
    data() {
        return {
            langSwitch: 'RUS',
            menu: {
                eng: [{
                        name: 'About',
                        link: ''
                    },
                    {
                        name: 'Services',
                        link: ''
                    },
                    {
                        name: 'Portfolio',
                        link: ''
                    },
                    {
                        name: 'News',
                        link: ''
                    },
                    {
                        name: 'Contacts',
                        link: ''
                    },
                ],
                rus: [{
                        name: 'О компании',
                        link: ''
                    },
                    {
                        name: 'Услуги',
                        link: ''
                    },
                    {
                        name: 'Портфолио',
                        link: ''
                    },
                    {
                        name: 'Новости',
                        link: ''
                    },
                    {
                        name: 'Контакты',
                        link: ''
                    },
                ]
            },
            news: [{
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
                {
                    img: '/img/main.png',
                    category: 'Категория',
                    date: 'Май 31, 2021',
                    header: 'Это тестовая новость для примера'
                },
            ]
        }
    },
}
</script>

<style lang="scss">
.services {
    header {
        background: url('/img/main.png') no-repeat center top /cover;
        height: 40vh;

        h2 {
            color: white;
            font-size: 42px;
            margin-top: 100px;
        }
    }

    section {
        background: #f6f6f6;
        padding: 90px 0;
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
        cursor: pointer;
        flex: 1 1 300px;
        margin: 15px;
        overflow: hidden;
        text-align: left;
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
        }
        h3:hover{
            color: #126B8F;
        }
    }
}
</style>
