<template>
  <div class="footer-container">
    <div class="divider"></div>
    <div class="contents">
      <div class="row">

        <div class="col-md-3 col-sm-6">
          <ul class="list-unstyled">
            <li class="list-title"><img class="logo-image" src="../assets/fh_logo_sub.jpg" alt=""></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title">Factory Hunt</li>
            <br>
            <li class="small"><router-link :to="{ path: '/about', params: { id:100 } }">About Us</router-link></li>
            <li class="small"><router-link :to="{ path: '/contact', params: { id:100 } }">Contact Us</router-link></li>
            <li class="small"><router-link :to="{ path: '/terms', params: { id:100 } }">Terms & Conditions</router-link></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title">Services</li>
            <br>
            <!--<li class="small"><router-link :to="{ path: '/membership' }">Membership</router-link></li>-->
            <!--<li class="small"><router-link :to="{ path: '/help', params: { id:100 } }"><a>Help</a></router-link></li>-->
            <li class="small"><router-link :to="{ path: '/faqs', params: { id:100 } }"><a>FAQs</a></router-link></li>
            <!--<li class="small"><router-link :to="{ path: '/openapi', params: { id:100 } }"><a>API</a></router-link></li>-->
            <li class="small"><router-link :to="{ path: '/korean', params: { id:100 } }"><a>한국어</a></router-link></li>
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

      <div class="sub-divider"></div>

      <div class="row">
        <div class="col-md-10">
          <div class="copyright-container">
            <i class="fa fa-copyright"></i> {{copyright}}
          </div>
        </div>
      </div>

    </div>
  </div>
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

<style scoped>
  .contents {
    max-width:1000px;
    margin: 0 auto;
  }

  .divider {
    margin: 30px 0 50px 0;
  }

  .sub-divider {
    margin: 50px 0 30px 0;
    width: 100%;
    height: 1px;
    background-color: #DBDBDB;
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

  .copyright-container {
    color: gray;
    padding-bottom:70px;
  }

  li {
  font-weight: 300;
  font-size:15px;
  line-height:1.6;
  }

  a {
  color: gray;
  }



</style>
