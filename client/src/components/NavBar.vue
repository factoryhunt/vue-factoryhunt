<template>
  <nav class="navbar-container">

    <div class="logo-container">
      <a href="/"><img id="logo" src="../assets/fh_logo_512.png"></a>
    </div>

    <div class="search-container" v-show="this.$route.path !== '/'">
      <i class="fa fa-search search-icon" aria-hidden="true"></i>
      <input @keyup.enter="onSearchInput" type="text" v-model="input" :value="input" :placeholder="placeholder.input">
    </div>

    <div class="button-container">
      <span v-if="isUserLoggedIn" class="each-button-container">
        <a @click="onLogoutButton">{{ msg.logout }}</a>
      </span>
      <span @click="onKoreanButton" class="each-button-container">
        <a>한국어</a>
      </span>
    </div>
  </nav>
</template>

<script>
  export default {
    props: ['inputData'],
    data () {
      return {
        input: this.inputData,
        placeholder: {
          input: 'Search'
        },
        msg: {
          logout: '로그아웃'
        },
        isUserLoggedIn: false
      }
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
      onLoginButton: function () {
        this.$router.push({
          path: '/login'
        })
      },
      onSignUpButton: function () {
        this.$router.push({
          path: '/signup'
        })
      },
      onLogoutButton () {
        console.log('onLogoutButton')
        this.$http.get('/api/auth/logout')
          .then(res => {
            location.reload()
          })
      },
      onHelpButton: function () {
        this.$router.push({
          path: '/help'
        })
      },
      onKoreanButton: function () {
        this.$router.push({
          path: '/korean'
        })
      }
    },
    created () {
      console.log('NavigationBarInput Created')
      if (this.$route.path !== '/') {
        $(document).ready(function () {
          $('.navbar-container').css('border-bottom', '1px solid #DBDBDB')
          $('.logo-container').css('border-right', '1px solid #DBDBDB')
        })
      }
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn
    },
    mounted () {
      console.log('NavigationBarInput Mounted')
    },
    updated () {
      console.log('NavigationBarInput Updated')
    }
  }
</script>

<style scoped>
  .navbar-container {
    position: relative;
    height: 80px;
  }

  .logo-container {
    position: absolute;
    width: 80px;
  }
  .logo-container img {
    padding: 17.5px;
  }

  .search-container {
    position: absolute;
    margin: 27.5px 100px;
    font-size: 18px;
  }
  .search-container .search-icon {
  }
  .search-container input {
    width: 85%;
    padding: 0 10px;
    border: none;
    box-shadow: none;
    outline: none;
  }

  .button-container {
    float: right;
    line-height: 80px;
    margin: 0 20px;
  }
  .button-container .each-button-container {
    margin: 0 10px;
  }
  .button-container .each-button-container a {
    color: grey;
    font-size:16px;
  }

  @media ( min-width: 744px ) {
    .search-container {
      margin: 27.5px 100px;
    }
    .search-container input {
      width: 520px;
    }
  }
  @media ( min-width: 1128px ) {
    .search-container {
      margin: 27.5px 100px;
    }
    .search-container input {
      width: 900px;
    }
  }
</style>
