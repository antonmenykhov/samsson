<template>
<div id="app">
    <div v-if="loading" class="loading">
        <div class="logo">
            <div class="logo-img"></div>
            <div class="logo-text">{{$store.state.name[lang].name}}</div>
        </div>
    </div>
    <div id="menu" class="top-line-c">
        <div class="top-line">

            <div class="logo" @click="goRoute('/')">
                <div class="logo-img"></div>
                <div class="logo-text">{{$store.state.name[lang].name}}</div>
            </div>
            <div class="menu">
                <div @click="goRoute(item.link)" class="menu-item" v-for="item,i in menu[lang]" :key="i">
                    {{item.name}}
                </div>
                <div @click="changeLang" class="lang-switcher">
                    <el-switch v-model="langSwitch" inactive-text="RUS" active-text="ENG" active-value="eng" inactive-value="rus" active-color="#2EACDA" inactive-color="#2EACDA">
                    </el-switch>
                </div>
            </div>
        </div>

    </div>
    <router-view />
    <footer>
        <div class="container">
            <div class="footer-contacts">
                <div class="logo">
                    <div class="logo-img"></div>
                    <div class="logo-text">{{$store.state.name[lang].name}}</div>
                </div>
            </div>
            <div class="footer-contacts">
                <div>
                    <h5 v-if="lang=='rus'">Почта: {{contacts.mail}}</h5>
                    <h5 v-if="lang=='eng'">Mail: {{contacts.mail}}</h5>
                </div>
                <div>
                    <h5 v-if="lang=='rus'">Телефон: {{contacts.phone}}</h5>
                    <h5 v-if="lang=='eng'">Phone: {{contacts.phone}}</h5>
                </div>
                <div>
                    <h5 v-if="lang=='rus'">Адрес: {{contacts.adres[lang]}}</h5>
                    <h5 v-if="lang=='eng'">Adress: {{contacts.adres[lang]}}</h5>
                </div>
            </div>
            <div class="footer-menu">
                <div @click="goRoute(item.link)" class="menu-item" v-for="item,i in menu[lang]" :key="i">
                    {{item.name}}
                </div>
            </div>

        </div>
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
            loading: false,
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
    mounted() {
        let coockie = document.cookie.split(';');
        let index = coockie.indexOf("lang=eng") + coockie.indexOf("lang=rus");
        if (index >= -1){
            let lang = coockie[index+1].slice(5)
            this.$store.commit('setLang', lang);
            this.langSwitch=lang
        }
        
        window.scrollTo(0, 0)
        this.loading = true;
        document.body.style.overflowY = 'scroll';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%'
        setTimeout(() => {
            this.loading = false;
            document.body.style.overflowY = 'auto'
            document.body.style.position = 'static'
        }, 4000)
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
        contacts: function () {
            return this.$store.state.contacts
        }
    },

    methods: {
        changeLang() {
            const loading = this.$loading({

            });
            setTimeout(() => {
                document.cookie = "lang="+this.langSwitch+"; max-age=2592000";
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

header {
    overflow: hidden;
    position: relative;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
        position: relative;
        z-index: 2;

        color: white !important;
        font-size: 42px;
        margin-top: 50px;

    }
}

@keyframes pulse {
    50% {
        transform: scale(1.03);
    }
}

@keyframes slideleft {

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideright {

    100% {
        transform: translateX(100%);
        opacity: 1;
    }
}

@keyframes slidetop {
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideup {
    100% {
        transform: translateY(-200vh);
        opacity: 0;
    }
}

.loading {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: white;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slideup 1s forwards;
    animation-delay: 3s;
    will-change: auto;
    .logo-img {
        background: url('/img/logo.png') no-repeat center center / cover;
        height: 300px;
        width: 300px;
        animation: slidetop 1s forwards;
        opacity: 0;
        transform: translateY(200vh);
        will-change: auto;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 120px;
        color: $dark;
        font-weight: 700;
    }

    .logo-text {
        transform: translateX(50%);
        position: relative;
        will-change: auto;
        opacity: 0;
        transition: all .2s ease-in-out;
        animation: slideleft 2s forwards;
        animation-delay: 1s;

    }

    .logo-text::after {
        will-change: auto;
        background: white;
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        content: '';
        animation: slideright 2s forwards;
        animation-delay: 1s;
    }
}

.menu-item:hover {
    color: $light !important;
    cursor: pointer;
}

footer {
    .logo-img {
        background: url('/img/logo.png') no-repeat center center / cover;
        height: 50px;
        width: 50px;
        margin-right: 10px;
    }

    .logo {
        color: white;
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
    }

    .container {
        height: 100%;
    }

    .footer-menu {
        flex: 1 1 300px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        height: 100px;
        justify-content: center;

        .menu-item {
            color: white;
            margin: 5px 40px;
            font-size: 16px;
            height: 19px;
        }
    }

    .footer-contacts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 300px;

        h5 {
            color: white;
            margin: 5px;
            font-size: 16px;
            font-weight: 400;
            height: 19px;
        }
    }

    background: $dark;
    height: 150px;
}

.el-loading-mask {
    background: white !important;
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
