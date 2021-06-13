<template>
<div class="contacts">
    <header>
        <div class="container">
            <h2 v-if="lang=='rus'">Контакты</h2>
            <h2 v-if="lang=='eng'">Contacts</h2>
        </div>
    </header>
    <section class="contact">
        <div class="container">
            <h4 v-if="lang=='rus'">Контакты</h4>
            <h4 v-if="lang=='eng'">Contacts</h4>
            <h2 v-if="lang=='rus'">Всегда на связи</h2>
            <h2 v-if="lang=='eng'">Always online</h2>
            <div class="progressbar"></div>
            <div class="contact-wrapper">
                <div class="contact-holder">
                    <span class="material-icons">
                        email
                    </span>
                    <h5 v-if="lang=='rus'">Почта</h5>
                    <h5 v-if="lang=='eng'">Mail</h5>
                    <p>
                        {{contacts.mail}}
                    </p>
                </div>
                <div class="contact-holder">
                    <span class="material-icons">
                        map
                    </span>
                    <h5 v-if="lang=='rus'">Адрес</h5>
                    <h5 v-if="lang=='eng'">Adress</h5>
                    <p>
                        {{contacts.adres[lang]}}
                    </p>
                </div>
                <div class="contact-holder">
                    <span class="material-icons">
                        call
                    </span>
                    <h5 v-if="lang=='rus'">Телефон</h5>
                    <h5 v-if="lang=='eng'">Phone</h5>
                    <p>
                        {{contacts.phone}}
                    </p>
                </div>
            </div>

        </div>
    </section>
    <section class="form">
        <div class="container">
            <h4 v-if="lang=='rus'">Контакты</h4>
            <h4 v-if="lang=='eng'">Contacts</h4>
            <h2 v-if="lang=='rus'">Форма обратной связи</h2>
            <h2 v-if="lang=='eng'">Contact Form</h2>
            <div class="progressbar"></div>
            <el-form>
                <el-form-item>
                    <el-input v-model="form.name" v-if="lang=='rus'" placeholder="Имя"></el-input>
                    <el-input v-model="form.phone" v-if="lang=='rus'" placeholder="Телефон"></el-input>
                    <el-input v-model="form.name" v-if="lang=='eng'" placeholder="Name"></el-input>
                    <el-input v-model="form.phone" v-if="lang=='eng'" placeholder="Phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.meassage" v-if="lang=='rus'" type="textarea" :rows="3" placeholder="Сообщение"></el-input>
                    <el-input v-model="form.meassage" v-if="lang=='eng'" type="textarea" :rows="3" placeholder="Message"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button @click="send" :loading="loading" v-if="lang=='rus'">Отправить</el-button>
                    <el-button @click="send" :loading="loading" v-if="lang=='eng'">Send</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
    <iframe src="/map.html" frameborder="0"></iframe>
</div>
</template>

<script>
export default {
    methods: {
        send(){
            this.loading=true
        }
    },
    data() {
        return {
            loading: false,
            form: {
                name: '',
                phone: '',
                message: ''
            }
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
}
</script>

<style lang="scss">
$dark : #126B8F;
$light: #2EACDA;
.contacts iframe{
    width: 100%;
    height: 400px;
}
.form {

    padding: 50px 0;
    background: #eff2f7;

    .container {
        flex-direction: column;
    }

    .btn .el-form-item__content {
        justify-content: center;
        width: 100%;

        .el-button {
            background: $dark;
            border: 0;
            font-size: 18px;
            display: inline-block;
            text-align: center;
            padding: 14px 39px;
            border-radius: 7px;
            margin-top: 10px;
            transition: 0.3s;
            color: #fff;
        }
        .el-button:hover{
            transform: scale(1.1);
        }
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

    .el-form {
        width: 100%;
        max-width: 700px;

    }

    .el-form-item {
        margin: 0;
    }

    .el-form-item__content {
        display: flex;
        width: 100%;
    }

    .el-input,
    .el-textarea {
        margin: 10px;
        font-size: 18px;
    }

    .el-textarea__inner,
    .el-input__inner {
        padding: 10px;
    }
}

.contact {
    padding: 30px 0;

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

    .container {
        flex-direction: column;
        width: 100%;
    }

    .contact-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .contact-holder {
        flex: 1 1 300px;
        margin: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #d0e5fb;
        border-radius: 5px 5px 5px 5px;
        margin-bottom: 30px;
        padding: 23px 25px 15px 25px;

        h5 {
            color: #232323;

            font-size: 24px;
            font-weight: 800;
            text-transform: capitalize;
            margin-top: 15px;
            margin-bottom: 10px;
        }

        p {
            color: rgba(86, 86, 86, .8);
            margin: 0 0 15px 0;
        }

        .material-icons {
            font-size: 40px;
            color: $dark;

        }
    }
}

header {
    background: url('/img/211.jpg') no-repeat center center /cover;
    height: 40vh;

    h2 {
        color: white;
        font-size: 42px;
        margin-top: 150px;
    }

    position: relative;
}

header::before {
    content: '';
    background: rgba(0, 0, 0, 0.422);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
}

header .container {
    z-index: 2;
    position: relative;
}
</style>
