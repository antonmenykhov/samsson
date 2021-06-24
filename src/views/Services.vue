<template>
<div class="services-view">
    <header>
        <iframe class="frame-top" src="/main.html" scrolling="no" frameborder="0"></iframe>
        <div class="container">
            <h2 v-if="lang=='rus'">Услуги</h2>
            <h2 v-if="lang=='eng'">Services</h2>
        </div>
    </header>
    <section class="service-holder">
        <div class="container">
            <h4 v-if="lang=='rus'">Услуги</h4>
            <h4 v-if="lang=='eng'">Services</h4>
            <h2 v-if="lang=='rus'">Наши компетенции</h2>
            <h2 v-if="lang=='eng'">Our competencies</h2>
            <p class="sectDescription">{{services.signSer[lang]}}</p>
            <div class="progressbar"></div>
            <div class="services-holder">
                <div class="service-wrapper" v-for="item,i in services.services" :key="i">
                    <span class="material-icons">
                        {{item.icon}}
                    </span>
                    <h3>{{item.name[lang]}}</h3>
                    <p v-html="item.desc[lang]"> </p>
                </div>
            </div>
        </div>
    </section>
    <section class="razdels">

        <div class="container">
            <h4 v-if="lang=='rus'">Системы</h4>
            <h4 v-if="lang=='eng'">Systems</h4>
            <h2 v-if="lang=='rus'">Разделы инженерных систем</h2>
            <h2 v-if="lang=='eng'">ENGINEERING SYSTEMS</h2>
            <p class="sectDescription">{{services.signIS[lang]}}</p>
            <div class="progressbar"></div>
            <div class="razdel-holder">
                <div class="razdel" v-for="razdel,i in services.razdels" :key="i">
                    <h3>{{razdel.name[lang]}}</h3>
                   

                </div>
            </div>
        </div>
    </section>
    <section class="lics">
        <div class="container">
            <h4 v-if="lang=='rus'">Документы</h4>
            <h4 v-if="lang=='eng'">Docs</h4>
            <h2 v-if="lang=='rus'">Разрешительная документация </h2>
            <h2 v-if="lang=='eng'">Permits documentation</h2>
            <div class="lic-desc">{{services.servtext[lang]}}</div>
            <div class="lics-holder">
                <div class="lics-wrapper" v-for="lic,i in services.docs" :key="i">
                    <a target="_blank" :href="lic.file"><img :src="lic.img" alt=""></a>
                </div>
            </div>
        </div>
    </section>
    <section class="lics">
        <div class="container">
            <h4 v-if="lang=='rus'">Сертификаты</h4>
            <h4 v-if="lang=='eng'">Certificates</h4>
            <h2 v-if="lang=='rus'">Дилерские Сертификаты</h2>
            <h2 v-if="lang=='eng'">Dealer Certificates</h2>
            <div class="lic-desc">{{services.certtext[lang]}}</div>
            <div class="lics-holder">
                <div class="lics-wrapper" v-for="lic,i in services.certs" :key="i">
                    <a target="_blank" :href="lic.file"><img :src="lic.img" alt=""></a>
                </div>
            </div>
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
        services: function () {
            return this.$store.state.services
        }
    }
}
</script>

<style lang="scss">
.lics {
    padding-bottom: 90px;

    .lics-holder {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
    }

    .lic-desc {
        text-align: center;
        margin: 20px 150px;
        font-size: 18px;
        font-weight: 400;
        color: #515151;
        max-width: 800px;
    }

    .lics-wrapper:hover {
        transform: scale(1.1);
    }

    .lics-wrapper {
        width: 250px;
        margin: 20px;
        overflow: hidden;
        transition: all .2s;
        position: relative;
        will-change: auto;
        border: 1px solid rgb(173, 173, 173);
        border-radius: 5px;
        padding: 10px;

        a {
            width: 200px;
            height: 300px;

        }

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
}

.services-view {
    .service-holder {
        padding-top: 90px;
    }

    .services-holder {
        display: flex;
        flex-wrap: wrap;

        width: 100%;

        .service-wrapper {
            flex: 1 1 400px;
            margin: 10px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            background: rgba(236, 236, 236, 0.555);

            border-radius: 10px;
            transition: all .2s;
            will-change: auto;

            h3 {
                color: #232323;
                text-transform: uppercase;
                font-size: 20px;
                margin: 0;
            }

            p {
                color: #232323;
            }

            .material-icons {
                font-size: 80px;
                color: #126B8F;
                margin-bottom: 20px;
            }
        }

        .service-wrapper:hover {
            background: rgb(236, 236, 236);
            box-shadow: 0 0 5px rgb(0 0 0 / 7%);
        }
    }

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

@media (max-width: 768px) {
    .lics .lic-desc {
        margin: 20px 0;
    }

    .services-view .service-holder {
        padding-top: 30px;
    }
    .services-view header h2{
        font-size: 40px!important;
    }

}
</style>
