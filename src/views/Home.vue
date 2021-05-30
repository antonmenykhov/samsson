<template>
<div v-if="about" class="home">
    <section class="header">
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
            <div class="main-line">
                <div class="logo">

                </div>
                <h1>{{$store.state.name[lang].name}}</h1>
                <p>{{$store.state.name[lang].dev}}</p>
            </div>
        </div>
    </section>
    <section class="targets">
        <h2 v-if="lang=='rus'">Наши цели</h2>
        <h2 v-if="lang=='eng'">Our mission</h2>
        <div class="container">

            <div class="target-wrapper" v-for="target,i in targets[lang]" :key="i">
                <div class="icon">
                    <span class="material-icons">
                        track_changes
                    </span>
                </div>
                <div class="text">
                    <h4 v-if="lang=='rus'">Цель №{{i+1}}</h4>
                    <h4 v-if="lang=='eng'">Aim №{{i+1}}</h4>
                    <p>{{target}}</p>
                </div>

            </div>
        </div>
    </section>
    <section class="about">
        <div class="container">
            <div class="about-holder">
                <div class="image">

                </div>
                <div class="text">
                    <h4 v-if="lang=='rus'">О компании</h4>
                    <h4 v-if="lang=='eng'">About us</h4>
                    <h2 v-if="lang=='rus'">Несколько фактов о нашей компании</h2>
                    <h2 v-if="lang=='eng'">Some facts about our company</h2>
                    <div class="progressbar"></div>
                    <el-steps direction="vertical">
                        <el-step v-for="fact,i in facts[lang]" :title="fact" :key="i"></el-step>
                    </el-steps>
                </div>
            </div>
        </div>
    </section>
    <section class="methods">
        <div class="container">
            <div class="left">
                <h2 v-if="lang=='rus'">Наши методы работы</h2>
                <h2 v-if="lang=='eng'">Our methods in work</h2>
            </div>
            <div class="right">
                <div class="method" v-for="method,i in methods[lang]" :key="i">
                    <div class="number">{{i+1}}</div>
                    <p>{{method}}</p>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {

    name: 'Home',
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

        }
    },
    methods: {
        changeLang() {
            this.$store.commit('setLang', this.langSwitch);
            console.log(this.lang)

        }
    },

    computed: {
        about: function () {
            return this.$store.state.about
        },
        lang: function () {
            return this.$store.state.lang
        },
        customers: function () {
            return this.about.customers
        },
        geo: function () {
            return this.about.geo
        },
        partners: function () {
            return this.about.partners
        },
        facts: function () {
            let facts = {};
            facts.rus = this.about.facts.rus.split('\r\n');
            facts.eng = this.about.facts.eng.split('\r\n');
            return facts
        },
        targets: function () {
            let targets = {};
            targets.rus = this.about.target.rus.split('\r\n');
            targets.eng = this.about.target.eng.split('\r\n');
            return targets
        },
        methods: function () {
            let methods = {};
            methods.rus = this.about.methods.rus.split('\r\n');
            methods.eng = this.about.methods.eng.split('\r\n');
            return methods
        },
        contacts: function () {
            return this.$store.state.contacts
        }

    }
}
</script>

<style lang="scss">
$dark : #126B8F;
$light: #2EACDA;

.methods {
    padding: 90px 0;
    background: #f6f7f9;

    h2 {
        font-size: 42px;
        margin-bottom: 0;

        margin-top: 0;
        line-height: 1.2;
        font-weight: 800;
        letter-spacing: -1px;
        color: white;
        z-index: 2;
    }

    .left {
        flex: 1 1 300px;
        background: url('/img/methods.jpg') no-repeat center center / cover;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 500px;
        border-radius: 6px;
        padding: 10px;
    }

    .left::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: linear-gradient(to top, #126c8fee, #126B8F);
        border-radius: 6px;
    }

    .right {
        flex: 10 1 300px;
        display: flex;
        flex-wrap: wrap;
    }
    .method:hover{
        .number{
            transform: scale(1.3);
        }
    }
    .method{
        flex: 1 1 300px;
        margin: 20px;
        font-size: 16px;
        color: rgb(97,97,97);
        font-weight: 400;
        display: flex;
        align-items: center;
        p{
            width:80%;
        }
        .number{
            will-change: transform;
            margin-left: 10px;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            background: #126B8F;
            color: white;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 5;
            margin-right: 30px;
            transition: all .2s;
        }
        .number::before{
            content: '';
            position: absolute;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: #126c8fc2;
            z-index: -1;
            left: -5px;
            top: -5px;
            transition: all .2s ease-in-out;
            
        }
        .number::after{
            content: '';
            position: absolute;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background: #126c8f77;
            z-index: -2;
            left: -10px;
            top: -10px;
            transition: all .2s ease-in-out;
        }
    }
}

.about-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;

    .image {
        flex: 1 1 300px;
    }

    .text {
        flex: 1 1 300px;
        display: flex;
        flex-direction: column;

        h4 {
            color: $dark;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: 5px;
            font-family: Rubik, sans-serif;
        }

        h2 {
            font-size: 42px;
            margin-bottom: 0;
            margin-top: 0;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: -1px;
            color: #232323;
        }

        .el-step__title {
            color: #616161;
            padding: 3px 0;
        }

        .el-step__head {
            color: $dark;
            border-color: $dark;
        }

        .el-step__line {
            background-color: $dark;
        }

    }
}

.progressbar {
    height: 5px;
    width: 90px;
    background: #126c8f46;
    margin: 20px 0;
    position: relative;
    border-radius: 30px;

}

.progressbar::before {
    content: "";
    position: absolute;
    left: 0;
    top: -2.7px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: $dark;
    animation: goBack 5s infinite;
}

@keyframes goBack {
    50% {
        transform: translateX(90px);
    }
}

.about {
    background: url('/img/about.jpg') no-repeat center center / cover;
    height: 80vh;
    z-index: -2;

    .container {
        height: 100%;
    }
}

.header {
    background: url('/img/main.png') no-repeat center center / cover;
    height: 100vh;
    z-index: -1;

}

.main-line {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .logo {
        margin-top: 150px;
        background: url('/img/logo.png') no-repeat center center / contain;
        height: 200px;
        width: 200px;
    }

    h1 {
        color: white;
        font-size: 90px;
        margin: 0
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: -10px;
        text-transform: lowercase;
    }
}

.top-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0;

    .logo {
        display: flex;
        align-items: center;
    }

    .logo-img {
        background: url('/img/logo.png') no-repeat center center / contain;
        height: 50px;
        width: 50px;
        margin: 10px;
    }

    .logo-text {
        color: white;
        font-size: 30px;
        font-weight: 600;
    }

    .menu {
        display: flex;
    }

    .menu-item {
        margin: 5px 10px;
        color: white;
        font-size: 18px;
    }

    .lang-switcher {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .el-switch__label {
        color: white;
    }

    .el-switch__label.is-active {
        color: $light;
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.targets {
    margin-top: -250px;
    z-index: 2;

    h2 {
        color: white;
        z-index: 10;
        width: 100%;
        text-align: center;
        font-size: 40px;
        text-transform: uppercase;
    }
}

.target-wrapper {
    flex: 1 1 300px;
    display: flex;

    background: #ffffff;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
    border-bottom: 3px solid $dark;
    border-radius: 6px 6px 6px 6px;
    padding: 20px;
    margin: 15px;
    height: 230px;
    transition: all .3s ease-in-out;

    .icon {
        display: flex;
        align-items: center;
        margin-right: 15px;
    }

    h4 {
        color: #232323;
        font-size: 20px;
        text-transform: uppercase;
    }

    .material-icons {
        font-size: 70px;
        width: 70px;
        height: 70px;
        transition: all .2s ease-in-out;
        color: $dark;
    }

    p {
        font-size: 16px;
        font-weight: 400;
        color: #616161;
    }
}

.target-wrapper:hover {

    transform: translateY(-10px);

    .material-icons {
        animation: spin 1s infinite;
    }
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
