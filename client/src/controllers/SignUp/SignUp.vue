<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <form class="form-container" @submit.prevent="onSignUpButton">
        <div class="input-container">
          <input required v-model="value.company" type="text" placeholder="Company">
          <i id="image-company" class="fa fa-building-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required v-model="value.email" type="email" placeholder="Email">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" placeholder="Password">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>
        <p class="password-caution-text">Password must be at least 8 characters.</p>

        <div class="sign-up-button-container">
          <spinkit id="sign-up-loader"></spinkit>
          <button id="sign-up-button" class="button-orange">Sign Up</button>
        </div>
        <p class="terms">
          By clicking Create Account, you agree to our <a href="/terms">Terms</a> and that you have read our <a href="/privacy">Privacy policy</a>, including our Cookie Use. You may receive SMS Notifications from Facebook and can opt out at any time.
        </p>
        <div class="divider"></div>

        <div class="log-in-container">
          <a class="text-login" @click="onLoginButton">Did you already have account?</a>
          <a class="button-white" @click="onLoginButton">Login</a>
        </div>
      </form> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
  import AuthHeader from '../../components/AuthHeader'
  import Spinkit from '../../components/Spinkit/Spinkit.vue'

  export default {
    metaInfo: {
      title: 'Sign Up | Factory Hunt'
    },
    components: {
      AuthHeader,
      Spinkit
    },
    data () {
      return {
        value: {
          email: '',
          company: '',
          password: ''
        },
        placeholder: {
          company: '회사명 | (주)팩토리헌트',
          email: '이메일',
          password: '비밀번호'
        },
        msg: {
          signUp: '계정 만들기',
          login: '로그인',
          noAccount: '계정이 이미 있으신가요?'
        }
      }
    },
    methods: {
      onLoginButton () {
        this.$router.push({path: '/login'})
      },
      async onSignUpButton () {
        const $loader = $('#sign-up-loader')
        const $signUpButton = $('#sign-up-button')
        try {
          $loader.removeClass().addClass('spinkit-input')
          $signUpButton.css('display', 'none')
          await this.signUp()
          $loader.removeClass().addClass('invisible')
          $signUpButton.css('display', 'inherit')
          alert('Sign up success. \nPlease check your email and verify it.')
          location.href = '/dashboard'
        } catch (err) {
          console.log(err)
          $loader.removeClass().addClass('invisible')
          $signUpButton.css('display', 'inherit')
          alert(err.data.msg)
        }
      },
      signUp () {
        return new Promise((resolve, reject) => {
          const data = {
            company: this.value.company,
            email: this.value.email,
            password: this.value.password
          }
          this.$store.dispatch('signUp', data)
            .then(() => { resolve() })
            .catch((err) => { reject(err.response) })
        })
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/index";

  /*#sign-up-loader {*/
  /*margin-top: 12px;*/
  /*}*/

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

      #image-company {
        right: 16px;
      }
      #image-password {
        right: 18px;
      }
    }

    .sign-up-button-container {
      margin-top: 40px;
      .button-orange {
        width: 100%;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .password-caution-text {
      margin-top: 5px;
      margin-bottom: 0;
      font-size: 13px;
      color: @color-font-gray;
    }

    .terms {
      text-align: center;
      margin-top: 17px;
      font-size: 12px;
      color: @color-font-gray;
    }

    .log-in-container {
      position: relative;

      .text-login {
        font-size:15px;
      }
      .button-white {
        position: absolute;
        font-size:16px;
        padding: 4px 12px;
        color: @color-orange;
        text-decoration: none;
        top: -7px;
        right: 0;
      }
    }
  }
</style>
