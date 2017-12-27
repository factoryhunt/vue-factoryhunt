<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <form class="form-container" @submit.prevent="onLoginButton">
        <div class="input-container">
          <input required v-model="value.email" type="email" :placeholder="getEmail">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" :placeholder="getPassword">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>

        <div class="login-button-container">
          <spinkit id="login-loader"></spinkit>
          <button id="login-button" class="button-orange" v-lang.login></button>
        </div>

        <div class="divider"></div>

        <div class="login-container">
          <a class="text-login" @click="onForgotPassword" v-lang.forgotPassword></a>
          <a class="button-white" @click="onSignUpButton" v-lang.signUp></a>
        </div>
      </form> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
  import AuthHeader from '../../components/AuthHeader'
  import Spinkit from '../../components/Spinkit/Spinkit.vue'
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: 'Login | Factory Hunt'
    },
    components: {
      AuthHeader,
      Spinkit
    },
    data () {
      return {
        value: {
          email: '',
          password: ''
        }
      }
    },
    messages: {
      eng: {
        email: 'Email',
        password: 'Password',
        login: 'Login',
        signUp: 'Sign Up',
        forgotPassword: 'Forgot your password?'
      },
      kor: {
        email: '이메일',
        password: '비밀번호',
        login: '로그인',
        signUp: '회원가입',
        forgotPassword: '비밀번호가 기억나지 않으세요?'
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn'
      ]),
      getEmail () {
        return this.translate('email')
      },
      getPassword () {
        return this.translate('password')
      }
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(() => {
            location.href = '/dashboard'
          })
      },
      getLanguage () {
        const lang = this.$route.query.lang
        if (lang) {
          this.language = lang
        }
      },
      onLoginButton () {
        const data = {
          email: this.value.email,
          password: this.value.password
        }
        const $loader = $('#login-loader')
        const $loginButton = $('#login-button')
        $loader.removeClass().addClass('spinkit-input')
        $loginButton.css('display', 'none')
        this.$store.dispatch('login', data)
          .then(() => {
            location.href = '/dashboard'
          })
          .catch((err) => {
            $loader.removeClass().addClass('invisible')
            $loginButton.css('display', 'inherit')
            alert(err.data.msg)
          })
      },
      onForgotPassword () {
        alert('coming soon.')
      },
      onSignUpButton () {
        location.href = '/signup'
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.tryAutoLogin()
      this.getLanguage()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/index";

  .form-contents {
    .contents-size(500px, 60px auto, 0 24px);
  }

  .form-container {
    border-radius: 4px;
    box-shadow: @box-shadow;
    /*border: 1px solid #484848;*/
    padding: 30px;

    span {
      font-size: 15px;
    }

    .input-container {
      position: relative;
      border-radius: 4px;
      border: 1px solid @color-light-grey;
      margin: 10px 0;

      input {
        position: relative;
        width: 100%;
        height: 50px;
        padding: 12px 40px 12px 12px;
        font-size: 16px;
        outline: none;
        border: none;
      }
      i {
        position: absolute;
        font-size: 20px;
        top: 16px;
        right: 14px;
      }

      #image-password {
        right: 18px;
      }
    }

    .login-button-container {
      margin-top: 40px;
      .button-orange {
        width: 100%;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .login-container {
      position: relative;

      .text-login {
        font-size:15px;
      }
      .button-white {
        position: absolute;
        font-size:16px;
        color: @color-orange;
        padding: 4px 12px;
        top: -7px;
        right: 0;
        text-decoration: none;
      }
    }
  }
</style>
