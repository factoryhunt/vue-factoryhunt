<template>
  <nav class="navigation-outer-container">
    <div class="navigation-inner-container">

      <div class="logo-container">
        <a href="/"><img id="logo" src="/static/logo_white.png"></a>
      </div>

      <div class="search-container" v-show="this.$route.path !== '/'">
        <input @keyup.enter="onSearchInput" v-model="input" placeholder="Search" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>

      <div class="button-container">
        <span class="each-button-container">
          <a class="nav-button" href="/login">로그인</a>
        </span>
      </div>
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
            $('.navigation-outer-container').css('border-bottom', '1px solid #DBDBDB')
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';
  .navigation-outer-container {
    background: @color-white;
    width: 100%;
    height: 80px;
    z-index: 3;

    .navigation-inner-container {
      display: table;
      width: 100%;

      .logo-container {
        display: table-cell;
        vertical-align: middle;
        width: 80px;

        #logo {
          width: 80px;
          padding: 11.5px;
        }
      }

      .search-container {
        display: table-cell;
        vertical-align: middle;
        width: 70%;
        border-left: 1px solid @color-light-grey;

        input {
          width: 100%;
          height: 75px;
          padding: 0 20px;
          border: none;
          outline: none;
          font-size: 18px;
          font-weight: 300;
        }
      }

      .button-container {
        display: table-cell;
        vertical-align: middle;
        text-align: right;
        padding-right: 20px;

        .each-button-container {
          margin-left: 30px;
          font-weight: 400;
          font-size: 15px;

          .nav-button {
            color: @color-font-gray;
          }
        }
      }
    }
  }
</style>
