<template>
<div v-if="about" class="home">
    <header class="main-header">
        <iframe class="frame-top" src="/main.html" scrolling="no" frameborder="0"></iframe>
        <div class="header">
            <div class="container">

                <div class="main-line">
                    <div class="logo">

                    </div>
                    <h1>{{$store.state.name[lang].name}}</h1>
                    <p>{{$store.state.name[lang].dev}}</p>
                </div>
            </div>
        </div>
    </header>
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
    <section class="razdels">
        <div class="container">
            <h2 v-if="lang=='rus'">Разделы инженерных систем</h2>
            <h2 v-if="lang=='eng'">ENGINEERING SYSTEMS</h2>
            
            <p class="sectDescription">{{services.signIS[lang]}}</p>
            <div class="razdel-holder">
                <div class="razdel" v-for="razdel,i in services.razdels" :key="i">
                    <h3>{{razdel.name[lang]}}</h3>
                    

                </div>
            </div>
        </div>
    </section>
    <section id="numbers" ref="numbers" class="numbers" @click="getNums">
        <div class="container">
            <div class="number-wrapper" v-for="number,i in numbers" :key="i">
                <div class="number-name">{{number.name[lang]}}</div>
                <div v-if="i==0" class="number big">{{animatedNumber1}} <span>{{number.ed[lang]}}</span></div>
                <div v-if="i==0" class="number">{{animatedNumber4}} <span>{{number.ed[lang]}} / {{number.deltaper[lang]}}</span></div>
                <div v-if="i==1" class="number big">{{animatedNumber2}} <span>{{number.ed[lang]}}</span></div>
                <div v-if="i==1" class="number">{{animatedNumber5}} <span>{{number.ed[lang]}} / {{number.deltaper[lang]}}</span></div>
                <div style="flex: 1" v-if="i==2" class="number big">{{animatedNumber3}} <span>{{number.ed[lang]}}</span></div>
            </div>
        </div>
    </section>
    <section class="partners">
        <div class="container">
            <h2 v-if="lang=='rus'">Наши партнеры и поставщики</h2>
            <h2 v-if="lang=='eng'">Our partners and suppliers</h2>
            <div class="partner-wrapper">
                <div class="partner" v-for="partner,i in partners" :key="i" :style="'background: url(\''+partner+'\') no-repeat center center / contain'">

                </div>
            </div>
        </div>
    </section>
    <section @click="getNums" class="maps">
        <div class="container">
            <h2 v-if="lang=='rus'">География проектов</h2>
            <h2 v-if="lang=='eng'">Projects on map</h2>
            <div class="map">
                <div v-for="marker,i in geo" :key="i" class="map-marker" :style="'left:'+marker.cords.x+'%; top:'+marker.cords.y+'%'">

                    <el-tooltip v-if="marker.name.rus!='Тюмень'" class="item" effect="dark" :content="marker.name[lang]" placement="top">
                        <span class="material-icons dot"> location_on </span>
                    </el-tooltip>
                    <el-tooltip v-if="marker.name.rus=='Тюмень'" class="item" effect="dark" placement="top">
                        <div v-if="lang=='rus'" slot="content">
                            <h5>Тюмень</h5>
                            <h6>Центральный офис</h6>
                            <p>Адрес: {{contacts.adres[lang]}}</p>
                            <p>Телефон: {{contacts.phone}}</p>
                            <p>Почта: {{contacts.mail}}</p>
                        </div>
                        <div v-if="lang=='eng'" slot="content">
                            <h5>Tyumen</h5>
                            <h6>Central office</h6>
                            <p>Adress: {{contacts.adres[lang]}}</p>
                            <p>Phone: {{contacts.phone}}</p>
                            <p>Mail: {{contacts.mail}}</p>
                        </div>
                        <span class="material-icons yellow"> location_on </span>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </section>

</div>
</template>

<script>
import gsap from 'gsap'
export default {

    watch: {

        num1: function (newValue) {
            gsap.to(this.$data, { duration: 2, tweenedNumber1: newValue });
        },
        num2: function (newValue) {
            gsap.to(this.$data, { duration: 2, tweenedNumber2: newValue });
        },
        num3: function (newValue) {
            gsap.to(this.$data, { duration: 2, tweenedNumber3: newValue });
        },
        num4: function (newValue) {
            gsap.to(this.$data, { duration: 3, tweenedNumber4: newValue });
        },
        num5: function (newValue) {
            gsap.to(this.$data, { duration: 3, tweenedNumber5: newValue });
        }
    },
    name: 'Home',
    data() {
        return {

            num: [0, 0, 0],
            num1: 0,
            num2: 0,
            num3: 0,
            num4: 80000,
            num5: 500,
            num6: 0,
            tweenedNumber1: 0,
            tweenedNumber2: 0,
            tweenedNumber3: 0,
            tweenedNumber4: 80000,
            tweenedNumber5: 500,
            tweenedNumber6: 0

        }
    },

    methods: {
        getNums() {
            let rect = null;
            rect = document.getElementById('numbers').getBoundingClientRect();
            if (rect.top - window.innerHeight < 100) {
                window.removeEventListener('scroll', this.getNums)
                for (let i = 0; i < this.numbers.length; i++) {
                    //   let date = new Date(this.numbers[i].date);
                    //   let currentDate = new Date();
                    //   let dateS = date.getTime();
                    //   let currentDateS = currentDate.getTime();
                    //   let hours = Math.ceil((currentDateS - dateS) / 3600000);
                    this.num[i] = this.numbers[i].start * 1 //+ hours * this.numbers[i].delta;
                    this.num[i+3] = this.numbers[i].delta;
                }
                this.num1 = this.num[0]
                this.num2 = this.num[1]
                this.num3 = this.num[2]
                
                this.num4 = this.num[3]
                this.num5 = this.num[4]
                this.num6 = this.num[5]

            }
        }

    },

    mounted() {

        setTimeout(() => {

            window.addEventListener('scroll',

                this.getNums, )

        }, 1000)

    },
    computed: {

        animatedNumber1: function () {

            return this.tweenedNumber1.toFixed(0);
        },
        animatedNumber2: function () {
            return this.tweenedNumber2.toFixed(0);
        },
        animatedNumber3: function () {
            return this.tweenedNumber3.toFixed(0);
        },
        animatedNumber4: function () {
            return this.tweenedNumber4.toFixed(0);
        },
        animatedNumber5: function () {
            return this.tweenedNumber5.toFixed(0);
        },
        about: function () {
            this.getNums
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
        numbers: function () {
            return this.about.numbers
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
        },
        services: function () {
            return this.$store.state.services
        }

    }
}
</script>

<style lang="scss">
$dark : #126B8F;
$light: #2EACDA;

.numbers {
    background: #F6F7F9;
    display: flex;

    padding: 30px;

    .container {
        width: 100%;
        justify-content: center;
        align-items: stretch;
    }

    .number-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        flex: 1 1 300px;
        margin: 10px;
        ;
    }

    .number-name {
        text-align: center;
        font-size: 20px;
        color: #232323;

    }

    .number {
        color: $dark;
        font-size: 30px;
        margin-top: 20px;
        font-weight: 500;
    }
}

.el-tooltip__popper.is-dark {

    background: white !important;
    color: #232323 !important;
    font-size: 18px;
    text-transform: uppercase;

    h5 {
        margin: 5px 0;
        font-size: 18px;
        text-transform: uppercase;
        color: #232323 !important;
        font-weight: 400;
    }

    h6 {
        font-size: 16px !important;
        color: #616161 !important;
        text-transform: capitalize !important;
        margin: 0 0 5px 0;
        font-weight: 400;
    }

    p {
        font-size: 16px !important;
        color: #232323 !important;
        text-transform: capitalize !important;
        margin: 0;
        font-weight: 400;
    }

}

.popper__arrow {
    background: white !important;
    color: white !important
}

.maps {
    padding: 90px;

    .yellow {
        color: rgb(245, 10, 10) !important;
        font-size: 35px;
    }

    .map-marker {
        position: absolute;
        cursor: pointer;

        .dot {
            font-size: 30px;
            color: black;
        }
    }

    .container {
        flex-direction: column;

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
}

.map {
    background: url('/img/map.png') no-repeat center center / contain;
    height: 40vw;
    width: 80vw;
    max-width: 1200px;
    max-height: 600px;
    position: relative;
}

.frame-top {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

}

.razdels {
    h2 {
        font-size: 42px;
        margin-bottom: 0;
        margin-top: 0;
        line-height: 1.2;
        font-weight: 800;
        letter-spacing: -1px;
        color: #232323;
    }

    .container {
        flex-direction: column;
        padding: 90px 0;
    }

    .razdel-holder {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .razdel:hover {
        background: rgb(238, 238, 238);
    }

    .razdel {
        flex: 1 1 300px;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        box-shadow: 0 0 5px rgb(0 0 0 / 7%);
        text-align: left;
        border-bottom: 3px solid $dark;
        border-radius: 6px 6px 6px 6px;
        margin: 15px;
        padding: 45px 30px 45px 30px;
        transition: all .2s ease-in-out;
        will-change: auto;

        p {
            color: #616161;
            font-size: 16px;
            text-overflow: ellipsis;

            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        h3 {
            color: #232323;
            height: 30px;
            font-size: 18px;
            width: 100%;
            text-align: center;
        }

        .el-button {
            color: $dark;
            background-color: white;
            font-weight: 700;
            text-transform: uppercase;
            border: 1px solid #e7e7e7;
            border-radius: 30px 30px 30px 30px;
            padding: 12px 35px 12px 35px;
            transition: all .2s ease-in-out;
            will-change: auto;
        }

        .el-button:hover {
            background: $dark;
            color: white;
        }
    }
}

.partners {
    .container {
        flex-direction: column;
        padding: 90px 0;
    }

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
}

.partner-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;

}

.partner {
    width: 180px;
    height: 100px;
    filter: grayscale(100);
    transition: all .2s;
    will-change: auto;
    margin: 5px;

}

.partner:hover {
    filter: grayscale(0);
}

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
        padding-left: 20px;
    }

    .method:hover {
        .number {
            transform: scale(1.3);
        }
    }

    .method {
        flex: 1 1 300px;
        margin: 20px;
        font-size: 16px;
        color: rgb(97, 97, 97);
        font-weight: 400;
        display: flex;
        align-items: center;

        p {
            width: 80%;
        }

        .number {
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
            will-change: auto;
        }

        .number::before {
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
            will-change: auto;

        }

        .number::after {
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
            will-change: auto;
        }
    }
}

h4 {
    font-family: Rubik;
}

.about-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;

    .image {
        flex: 1 1 300px;
        background: url('/img/about-2.png') no-repeat center center / contain;
        height: 500px;
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
    will-change: auto;

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
    will-change: auto;
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

.main-header {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    width: 100%;
    overflow: hidden;
}

.main-header::after {
    content: '';
    background: url('/img/main1.png') no-repeat center center / cover;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 150px;
}

.header {

    z-index: 2;

}

.main-line {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .logo {
        margin-top: -100px;
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
        cursor: pointer;
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
    position: relative;
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
    will-change: auto;

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
        will-change: auto;
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
.sectDescription{
    max-width: 800px;
    text-align: center;
    color: #616161;
    font-size: 16px;
}
.big{
    font-size: 40px!important;
}
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
@media (max-width: 1200px){
    .container, .top-line{
        padding: 0 20px;
    }
    .targets{
        .container{
            align-items: stretch;
        }
    }
    .target-wrapper{
        height: unset;
        
    }
    .about{
        height: unset;
        padding: 20px 0;
    }
    .main-line h1{
        font-size: 60px;
    }
    .main-line p{
        font-size: 18px;
    }
    h2{
        font-size: 30px!important;
    }
}
@media (max-width: 1000px){
    .about-holder .image{
        height: 300px;
    }
    .methods{
        .container{
            flex-direction: column;
            .left{
                height: unset;
                flex: unset;
                background: none;
                h2{
                    color: $dark;
                }
            }
            .left::after{
                background: none;
            }
        }
    }
    .numbers .number-name{
        font-size: 18px;
    }
    .big{
        font-size: 30px!important;
    }
    .numbers .number{
        font-size: 20px;
        margin-top: 10px;
    }
    .razdels .razdel{
        padding: 20px 12px;
    }
    .target-wrapper .icon{
        display: none;
    }
    .target-wrapper{
        flex: 1 1 200px;
    }
    .razdels .container,
    .partners .container{
        padding: 30px 30px;
    }
    .methods{
        padding: 30px 0;
    }
    .partner{
        width: 100px;
        height: 60px;
    }
    .maps{
        padding: 20px;
    }
    
}   
@media (max-width: 768px){
    .maps{
        display: none;
    }
    .targets{
        margin-top: 0;
        h2{
            color: #232323;
            
        }
    }
    h2{
        text-align: center!important;
    }
    .methods .method{
        margin: 0 0;
    }
    .about-holder .image{
        flex: 1 1 250px;
    }
    .about-holder .text{
        align-items: center;
    }
}
</style>
