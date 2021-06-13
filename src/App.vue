<template>
<div id="app">
    <div id="menu" class="top-line-c">
        <div class="top-line">

            <div class="logo">
                <div class="logo-img"></div>
                <div class="logo-text">{{$store.state.name[lang].name}}</div>
            </div>
            <div class="menu">
                <div @click="goRoute(item.link)" class="menu-item" v-for="item,i in menu[lang]" :key="i">
                    {{item.name}}
                </div>
                <div @click="changeLang" class="lang-switcher">
                    <el-switch v-model="langSwitch" inactive-text="RUS" active-text="ENG" active-value="eng" inactive-value="rus" active-color="#2EACDA" inactive-color="#2EACDA">
                        ></el-switch>
                </div>
            </div>
        </div>

    </div>
    <router-view />
    <footer>

    </footer>
</div>
</template>

<script>
import axios from 'axios'
import constatns from './constants'
export default {
    data() {
        return {
            langSwitch: 'RUS',

            menu: {
                eng: [{
                        name: 'About',
                        link: '/'
                    },
                    {
                        name: 'Services',
                        link: '/services'
                    },
                    {
                        name: 'Portfolio',
                        link: '/portfolio'
                    },
                    {
                        name: 'News',
                        link: '/news'
                    },
                    {
                        name: 'Contacts',
                        link: '/contacts'
                    },
                ],
                rus: [{
                        name: 'О компании',
                        link: '/'
                    },
                    {
                        name: 'Услуги',
                        link: '/services'
                    },
                    {
                        name: 'Портфолио',
                        link: '/portfolio'
                    },
                    {
                        name: 'Новости',
                        link: '/news'
                    },
                    {
                        name: 'Контакты',
                        link: '/contacts'
                    },
                ]
            },
        }
    },
    beforeUpdate() {
        let menu = document.getElementById('menu');
        let menuOn = 0;
        window.onscroll = function () {
            window.addEventListener('scroll', function () {

                if (pageYOffset > 100) {
                    menu.classList.add('menu-blue');

                    menuOn = 1;
                }
                if (menuOn === 1) {
                    if (pageYOffset < 100) {
                        menu.classList.remove('menu-blue');

                        menuOn = 0
                    }
                }

            })
        }
    },
    computed: {
        lang: function () {
            return this.$store.state.lang
        },
    },
    methods: {
        changeLang() {
           const loading = this.$loading({
                

            });
            setTimeout(() => {
                this.$store.commit('setLang', this.langSwitch);
                loading.close();
            }, 500);
           

        },
        goRoute(link) {
           
            const loading = this.$loading({
                

            });
            setTimeout(() => {
                window.scrollTo(0, 0)
                 this.$router.push({ 'path': link })
                loading.close();
            }, 500);

        },
        getData() {
            axios.get(constatns.contacts).then(response => {
                this.$store.commit('setContacts', response.data.acf)
            })
            axios.get(constatns.news).then(response => {
                this.$store.commit('setNews', response.data)
            })
            axios.get(constatns.portfolio).then(response => {
                this.$store.commit('setPortfolio', response.data)

            })
            axios.get(constatns.about).then(response => {
                this.$store.commit('setAbout', response.data.acf)
            })
            axios.get(constatns.services).then(response => {
                this.$store.commit('setServices', response.data.acf)
            })
        }
    },
    created() {
        this.getData()
    },
}
</script>

<style lang="scss">
$dark : #126B8F;
$light: #2EACDA;

footer{
    background: $dark;
    height: 150px;
}

.el-loading-mask{
  background: white!important;
}
.top-line-c {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    transition: all .3s;
}

.menu-blue {
    background: $dark;
}

.top-line {
    max-width: 1200px;

}

* {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
}

body {
    margin: 0;
}

#app {

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}
</style>
