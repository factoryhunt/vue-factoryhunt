<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <div class="form-container">
        <div class="input-container">
          <input v-model="email" :value="email" type="email" :placeholder="placeholder.email">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input v-model="password" :value="password" type="password" :placeholder="placeholder.password">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </div>

        <div class="sign-up-button-container">
          <button class="button-orange" @click="onSignUpButton" @keyup.enter="onLoginButton">
            {{ msg.login }}
          </button>
        </div>

        <div class="divider"></div>

        <div class="log-in-container">
          <a class="text-login" @click="onForgotPassword">{{ msg.forgot }}</a>
          <button class="button-white" @click="onSignUpButton">
            {{ msg.signUp }}
          </button>
        </div>
      </div> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
  import AuthHeader from '../../components/AuthHeader'

  export default {
    metaInfo: {
      title: 'Login | Factory Hunt'
    },
    components: {
      AuthHeader
    },
    data () {
      return {
        email: '',
        password: '',
        placeholder: {
          email: '이메일 | your@email.com',
          password: '비밀번호'
        },
        msg: {
          forgot: '비밀번호가 기억나지 않으세요?',
          login: '로그인',
          signUp: '회원가입'
        }
      }
    },
    methods: {
      onLoginButton: function () {
        const data = {
          email: this.email,
          password: this.password
        }
        this.$http.post('/api/auth/login', data)
          .then(res => {
            console.log(res.data)
            if (res.data.lead_id) {
              alert('Login success.')
              this.$router.push({
                path: '/'
              })
            } else {
              alert('Login failed.')
            }
          })
      },
      onForgotPassword: function () {
        alert('Comming soon.')
      },
      onSignUpButton: function () {
        this.$router.push({
          path: '/register'
        })
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/less/global";

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
    }

    .sign-up-button-container {
      .button-orange {
        width: 100%;
        height: 50px;
        margin-top: 50px;
        font-size: 18px;
      }
    }

    .button-container #button-signup {
      margin-top: 70px;
      height: 50px;
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
        top: -7px;
        right: 0;
      }
    }
  }
</style>
