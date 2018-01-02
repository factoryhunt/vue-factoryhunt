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
            <li class="list-title" v-lang.factoryhunt></li>
            <br>
            <li class="small"><a href="/about" v-lang.aboutUs></a></li>
            <li class="small"><a href="/contact" v-lang.contactUs></a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title" v-lang.languages></li>
            <br>
            <!--<li class="small"><router-link :to="{ path: '/membership' }">Membership</router-link></li>-->
            <!--<li class="small"><router-link :to="{ path: '/help', params: { id:100 } }"><a>Help</a></router-link></li>-->
            <!--<li class="small"><a href="/for-suppliers">For suppliers</a></li>-->
            <!--<li class="small"><router-link :to="{ path: '/openapi', params: { id:100 } }"><a>API</a></router-link></li>-->
            <!--<li class="small"><router-link :to="{ path: '/korean', params: { id:100 } }"><a>한국어</a></router-link></li>-->
            <li class="small"><a @click="onEnglishButton">English</a></li>
            <li class="small"><a @click="onKoreanButton">한국어</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 column">
          <ul class="list-unstyled">
            <li class="list-title" v-lang.followUs></li>
            <br>
            <li class="small"><a href="//www.facebook.com/factoryhunt" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a></li>
            <li class="small"><a href="https://www.youtube.com/channel/UCC3c1TvZIsssj5aSTM9qj6A" target="_blank"><i class="fa fa-youtube-play" aria-hidden="true"></i> YouTube</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
  export default {
    messages: {
      eng: {
        factoryhunt: 'Factory Hunt',
        aboutUs: 'About Us',
        contactUs: 'Contact Us',
        languages: 'Languages',
        followUs: 'Follow Us'
      },
      kor: {
        factoryhunt: '팩토리 헌트',
        aboutUs: '소개',
        contactUs: '문의하기',
        languages: '언어',
        followUs: '팔로잉'
      }
    },
    methods: {
      onEnglishButton () {
        this.language = 'eng'
        window.scrollTo(0, 0)
      },
      onKoreanButton () {
        this.language = 'kor'
        window.scrollTo(0, 0)
//        location.reload()
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
