<template>
  <nav class="navbar-container">

    <div class="logo-container">
      <a href="/"><img id="logo" src="/static/logo_white.png"></a>
    </div>

    <div class="search-container" v-show="this.$route.path !== '/'">
      <i class="fa fa-search search-icon" aria-hidden="true"></i>
      <input @keyup.enter="onSearchInput" type="text" v-model="input" :placeholder="placeholder.input">
    </div>

    <div class="button-container">
      <!--<span v-if="isUserLoggedIn" class="each-button-container">-->
        <!--<a @click="onLogoutButton">{{ msg.logout }}</a>-->
      <!--</span>-->
      <!--<span @click="onSignInButton" class="each-button-container">-->
        <!--<a>{{ msg.signin }}</a>-->
      <!--</span>-->
      <span class="each-button-container">
        <a href="https://www.factoryhunt.co.kr" target="_blank">한국어</a>
      </span>
    </div>
  </nav>
</template>

<script>
  import cookie from '../../src/assets/js/cookie'
  export default {
    props: ['inputData'],
    data () {
      return {
        msg: {
          logout: '로그아웃',
          mypage: '마이페이지',
          signin: 'Sign in'
        },
        placeholder: {
          input: 'Search'
        },
        input: this.inputData,
        isUserLoggedIn: false
      }
    },
    created () {
      console.log('NavigationBarInput Created')
      this.applyCSS()
      this.checkValidation()
    },
    methods: {
      onSearchInput: function () {
        if (this.input) {
          this.$router.push({
            path: '/search',
            query: {
              input: this.input
            }
          })
        }
      },
      onSignInButton () {
        this.$router.push({
          path: '/login'
        })
      },
      onSignUpButton () {
        this.$router.push({
          path: '/signup'
        })
      },
      onLogoutButton () {
        cookie.deleteCookie('nekot')
        this.$store.dispatch('setInitialState')
        location.reload()
      },
      onKoreanButton () {
        this.$router.push({
          path: '/korean'
        })
      },
      checkValidation () {
        const token = cookie.getCookie('nekot')
        const data = {
          headers: {
            'x-access-token': token
          }
        }
        this.$http.get(`/api/auth/check`, data)
          .then(() => {
            this.isUserLoggedIn = true
          })
          .catch(() => {
            this.isUserLoggedIn = false
          })
      },
      applyCSS () {
        if (this.$route.path !== '/') {
          $(document).ready(function () {
            $('.navbar-container').css('border-bottom', '1px solid #DBDBDB')
            $('.logo-container').css('border-right', '1px solid #DBDBDB')
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../assets/less/global';

  .navbar-container {
    position: relative;
    height: 80px;

    .logo-container {
      position: absolute;
      width: 80px;

      img {
        padding: 11.5px;
      }
    }

    .search-container {
      position: absolute;
      margin: 27.5px 100px;
      font-size: 18px;

      .search-icon {}
      input {
        width: 85%;
        padding: 0 10px;
        border: none;
        box-shadow: none;
        outline: none;
      }
    }

    .button-container {
      float: right;
      line-height: 80px;
      margin: 0 20px;

      .each-button-container {
        margin: 0 10px;

        a {
          color: grey;
          font-size:16px;
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .search-container {
      margin: 27.5px 100px;

      input {
        width: 520px;
      }
    }
  }

  @media ( min-width: 1128px ) {
    .search-container {
      margin: 27.5px 100px;

      input {
        width: 900px;
      }
    }
  }
</style>
