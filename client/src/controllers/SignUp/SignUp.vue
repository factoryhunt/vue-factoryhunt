<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <form class="form-container" @submit.prevent="onSignUpButton">
        <div class="input-container">
          <input required v-model="value.company" type="text" :placeholder="getCompany">
          <i id="image-company" class="fa fa-building-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required v-model="value.email" type="email" :placeholder="getEmail">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input required minlength="8" v-model="value.password" type="password" :placeholder="getPassword">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>
        <p class="password-caution-text" v-lang.caution></p>

        <div class="sign-up-button-container">
          <spinkit id="sign-up-loader"></spinkit>
          <button id="sign-up-button" class="button-orange" v-lang.signUp></button>
        </div>
        <p class="terms" v-lang.terms></p>
        <div class="divider"></div>

        <div class="log-in-container">
          <a class="text-login" @click="onLoginButton" v-lang.alreadyHaveAccount></a>
          <a class="button-white" @click="onLoginButton" v-lang.login></a>
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
        }
      }
    },
    messages: {
      eng: {
        company: 'Company',
        email: 'Email',
        password: 'Password',
        caution: 'Password must be at least 8 characters.',
        terms: 'By clicking Sign Up, you agree to our <a href="/terms">Terms</a> and that you have read our <a href="/privacy">Privacy Policy</a>, including our Cookie Use.',
        login: 'Login',
        alreadyHaveAccount: 'Did you already have account?',
        signUp: 'Sign Up',
        signUpSuccess: 'You have signed up successfully. \nPlease check your email to activate your account.'
      },
      kor: {
        company: '회사명',
        email: '이메일',
        password: '비밀번호',
        terms: '계정 만들기 버튼을 클릭하면, Factory Hunt의 <a href="/terms">이용약관</a>에 동의하며 쿠키 사용을 포함한 Factory Hunt의 <a href="/privacy">개인정보 보호정책</a>을 읽었음을 인정하게 됩니다.',
        caution: '비밀번호는 문자와 숫자의 조합으로 최소 8 문자를 포함해야 합니다.',
        login: '로그인',
        alreadyHaveAccount: '계정이 이미 있으신가요?',
        signUp: '계정 만들기',
        signUpSuccess: '성공적으로 가입되었습니다. \n계정 활성화를 위해 이메일을 확인해주세요.'
      }
    },
    computed: {
      getCompany () {
        return this.translate('company')
      },
      getEmail () {
        return this.translate('email')
      },
      getPassword () {
        return this.translate('password')
      },
      getSuccessMessage () {
        return this.translate('signUpSuccess')
      }
    },
    methods: {
      getLanguage () {
        const lang = this.$route.query.lang
        if (lang) {
          this.language = lang
        }
      },
      onLoginButton () {
        location.href = '/login'
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
          alert(this.getSuccessMessage)
          location.href = '/dashboard'
        } catch (err) {
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
