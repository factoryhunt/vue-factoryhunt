<template>
  <section class="body-container">
    <div class="divider"></div>
    <footer class="footer-container">
      <div class="row">

        <div class="col-md-3 col-sm-6">
          <ul class="list-unstyled">
            <li class="list-title"><img class="logo-image" src="/static/logo_and_title.png" alt=""></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title">Factory Hunt</li>
            <br>
            <li class="small"><a href="/about">About Us</a></li>
            <li class="small"><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title">Services</li>
            <br>
            <!--<li class="small"><router-link :to="{ path: '/membership' }">Membership</router-link></li>-->
            <!--<li class="small"><router-link :to="{ path: '/help', params: { id:100 } }"><a>Help</a></router-link></li>-->
            <li class="small"><a href="/for-suppliers">For suppliers</a></li>
            <!--<li class="small"><router-link :to="{ path: '/openapi', params: { id:100 } }"><a>API</a></router-link></li>-->
            <!--<li class="small"><router-link :to="{ path: '/korean', params: { id:100 } }"><a>한국어</a></router-link></li>-->
            <li class="small"><a href="https://www.factoryhunt.co.kr"
                                 target="_blank">한국어</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title">Follow us</li>
            <br>
            <li class="small"><a href="//www.facebook.com/factoryhunt" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>

          </ul>
        </div>


      </div>
    </footer>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        copyright: '2017 factoryhunt.com'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';

  section {
    display: none;
  }

  .body-container {
    min-height: 0;
  }

  .divider {
    margin: 60px 0;
  }

  .column {
    padding-left: 80px;
  }

  .logo-image {
    width: 250px;
  }

  .list-title {
    font-weight:500;
  }

  li {
    font-weight: 300;
    font-size:15px;
    line-height:1.6;
  }

  a {
    color: @color-font-gray;
  }

  @media ( min-width: 744px ) {

  }
  @media ( min-width: 1128px ) {
    section {
      display: inherit;
    }
  }
</style>
