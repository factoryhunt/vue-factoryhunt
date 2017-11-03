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
      <span class="each-button-container">
        <a v-if="isLoggedIn" @click="onLogoutButton">{{ msg.logout }}</a>
      </span>
      <span @click="onKoreanButton" class="each-button-container">
        <a>한국어</a>
      </span>
    </div>
  </nav>
  <!--<nav class="navbar navbar-default">-->
    <!--<div class="container-fluid">-->
      <!--&lt;!&ndash; Brand and toggle get grouped for better mobile display &ndash;&gt;-->
      <!--<div class="navbar-header">-->

        <!--&lt;!&ndash;<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="sr-only">Toggle navigation</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon-bar"></span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon-bar"></span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon-bar"></span>&ndash;&gt;-->
        <!--&lt;!&ndash;</button>&ndash;&gt;-->

        <!--<a class="navbar-brand" href="/">-->
          <!--<img id="logo" src="../assets/fh_logo_512.png">-->
        <!--</a>-->

        <!--<div v-show="this.$route.path !== '/'" class="navbar-form navbar-left">-->
          <!--<div class="form-group">-->
            <!--<i class="fa fa-search" aria-hidden="true"></i>-->
            <!--<input @keyup.enter="onSearchInput" type="text" class="form-control" v-model="input" :value="input" :placeholder="placeholder.input">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash; Collect the nav links, forms, and other content for toggling &ndash;&gt;-->
      <!--&lt;!&ndash;<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">&ndash;&gt;-->
        <!--<ul class="nav navbar-nav navbar-right">-->
          <!--<li @click="onKoreanButton"><a>한국어</a></li>-->
          <!--&lt;!&ndash;<li @click="onHelpButton"><a>Help</a></li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li @click="onSignUpButton"><a>Sign up</a></li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li @click="onLoginButton"><a>Login</a></li>&ndash;&gt;-->
        <!--</ul>-->
      <!--&lt;!&ndash;</div>&lt;!&ndash; /.navbar-collapse &ndash;&gt;&ndash;&gt;-->
    <!--</div>&lt;!&ndash; /.container-fluid &ndash;&gt;-->
  <!--</nav>-->
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
          login: '',
          logout: ''
        },
        isLoggedIn: false
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
      },
      requestIsUserLogin () {
        this.$http.get('/api/auth/session')
          .then(res => {
            if (res.data.passport.user) {
              this.isLoggedIn = true
              this.msg.login = ''
              this.msg.logout = '로그아웃'
            }
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
      this.requestIsUserLogin()
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
