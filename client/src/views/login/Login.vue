<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <form @submit.prevent="loginSubmit({login: login, password: password})" class="box">
                        <h1>Авторизация</h1>
                        <p class="text-muted"> Пожалуйста, введите логин и пароль!</p>
                        <input type="text" v-model="login" placeholder="Логин">
                        <input type="password" v-model="password" placeholder="Пароль">
<!--                        <a class="forgot text-muted" href="#">Forgot password?</a>-->
                        <input type="submit" value="Войти">
                        <div class="col-md-12">
                            <ul class="social-network social-circle">
                                <li><a href="#" class="icoFacebook" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#" class="icoTwitter" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                login: null,
                password: null
            }
        },
        methods: {
            ...mapActions({
                loginSubmit: 'loginSubmit'
            })
        }
    }
</script>

<style scoped>

</style>