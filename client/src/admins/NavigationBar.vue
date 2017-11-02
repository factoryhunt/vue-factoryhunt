<template>
  <nav class="navbar navbar-default navigation-container">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">

        <a class="navbar-brand" href="/">
          <img id="logo" src="../assets/fh_logo_512.png">
        </a>

        <ul class="nav navbar-nav">
          <li><a id="dashboard" href="/admin">Dashboard</a></li>
        </ul>

        <!--<div v-show="this.$route.path !== '/admin'" class="navbar-form navbar-left">-->
          <!--<div class="form-group">-->
            <!--<i class="fa fa-search" aria-hidden="true"></i>-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<input type="text" class="form-control" v-model="input" :value="input" :placeholder="placeholder.input">-->
          <!--</div>-->
        <!--</div>-->

      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <ul class="nav navbar-nav navbar-right">
        <li @click="onLogout"><a>Exit</a></li>
      </ul>

    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        input: '',
        placeholder: {
          input: 'Search..'
        }
      }
    },
    methods: {
      onLogout: function () {
        this.$http.post('api/auth/logout')
          .then(response => {
            alert('Logout')
            this.$router.push({
              path: '/'
            })
          })
      }
    }
  }
</script>

<style scoped>

  .navigation-container {
    background-color: #333333;
    height: 75px;
    border: none;
    border-radius: 0;
    display: block;
    margin-bottom: 0;
  }

  .navbar-brand #logo {
    width: 45px;
  }

  .navbar-nav a {
    margin-top: 12px;
    font-weight: 400;
    font-size: 23px;
    color: white;
  }

  .navbar-form {
    background-color: #FFF;
    margin-top: 15px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    /*box-shadow: 1px 1px 10px 1px #eeeeee;*/
  }
  .navbar-form input {
    height: 45px;
    font-size: 18px;
    border: none;
    box-shadow: none;
    width: 600px;
  }
  .navbar-form i {
    font-size: 18px;
    margin-top: 3px;
  }
</style>
