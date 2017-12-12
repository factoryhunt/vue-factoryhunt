<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <form class="form-container" @submit.prevent="onLoginButton">
        <div class="input-container">
          <input required v-model="value.email" type="email" :placeholder="placeholder.email">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" :placeholder="placeholder.password">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>

        <div class="login-button-container">
          <spinkit id="login-loader"></spinkit>
          <button id="login-button" class="button-orange">로그인</button>
        </div>

        <div class="divider"></div>

        <div class="login-container">
          <a class="text-login" @click="onForgotPassword">{{ msg.forgot }}</a>
          <a class="button-white" @click="onSignUpButton">
            {{ msg.signUp }}
          </a>
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
        },
        placeholder: {
          email: '이메일',
          password: '비밀번호'
        },
        msg: {
          forgot: '비밀번호가 기억나지 않으세요?',
          login: '로그인',
          signUp: '회원가입'
        }
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn'
      ])
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(() => {
            location.href = '/dashboard'
          })
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
            alert(err.data.msg_kor)
          })
      },
      onForgotPassword () {
        alert('준비중 입니다.')
      },
      onSignUpButton () {
        this.$router.push({
          path: '/signup'
        })
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.tryAutoLogin()
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/css/index";

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
        padding: 4px 12px;
        top: -7px;
        right: 0;
        text-decoration: none;
      }
    }
  }
</style>
