<template>
  <div class="page-container">
    <div class="form-contents">

      <auth-header></auth-header>

      <div class="form-container">
        <div class="input-container">
          <input v-model="company" type="text" placeholder="Company">
          <i id="image-company" class="fa fa-building-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input v-model="email" type="email" placeholder="Email">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </div>

        <div class="input-container">
          <input v-model="password" type="password" placeholder="Password">
          <i id="image-password" class="fa fa-lock" aria-hidden="true"></i>
        </div>

        <div class="sign-up-button-container">
          <button class="button-orange" @click="onSignUpButton" @keyup.enter="onLoginButton">Sign Up</button>
        </div>

        <div class="divider"></div>

        <div class="log-in-container">
          <a class="text-login" @click="onLoginButton">Did you already have account?</a>
          <button class="button-white" @click="onLoginButton">Login</button>
        </div>
      </div> <!--form-container -->
    </div> <!-- form-contents -->
  </div> <!-- page-container -->
</template>

<script>
  import AuthHeader from '../../components/AuthHeader'

  export default {
    metaInfo: {
      title: 'Sign Up | Factory Hunt'
    },
    components: {
      AuthHeader
    },
    data () {
      return {
        email: '',
        company: '',
        password: ''
      }
    },
    methods: {
      onSignUpButton: function () {
        const data = {
          company: this.company,
          email: this.email,
          password: this.password
        }
        if (data.password.length < 8) {
          return alert('Too short password')
        }

        this.$http.post('/api/auth/register', data)
          .then(res => {
            if (res.data) {
              location.href = `/${this.company}`
            } else {
              alert('Sign up failed. Try again.')
            }
          })
      },
      onLoginButton: function () {
        location.href = '/login'
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/index';

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
      .button-orange {
        width: 100%;
        height: 50px;
        margin-top: 50px;
        font-weight: 600;
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
