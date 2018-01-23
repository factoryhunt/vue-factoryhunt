<template>
  <div class="home-container" v-if="toggle.isAuthLoaded">
    <!-- Navigation bar -->
    <nav-bar :account="value.account" :contact="value.contact" :isUserLoggedIn="this.isLoggedIn"></nav-bar>
    <!-- Header -->
    <home-header></home-header>
    <!-- About us -->
    <home-about-us></home-about-us>
    <!--Testimonials-->
    <home-testimonials></home-testimonials>
    <!--Features-->
    <home-features></home-features>
    <!--Counters-->
    <home-counters></home-counters>
    <!-- Footer -->
    <footer-bar></footer-bar>
    <!-- CopyrightBar -->
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  // components
  import NavBar from '../../components/NavBar.vue'
  import Header from './components/Header.vue'
  import AboutUs from './components/AboutUs.vue'
  import Testimonials from './components/Testimonials.vue'
  import Features from './components/Features.vue'
  import Counters from './components/Counters.vue'
  import FooterBar from '../../components/FooterBar.vue'
  import CopyrightBar from '../../components/CopyrightBar.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      NavBar: NavBar,
      HomeHeader: Header,
      HomeAboutUs: AboutUs,
      HomeTestimonials: Testimonials,
      HomeFeatures: Features,
      HomeCounters: Counters,
      FooterBar: FooterBar,
      CopyrightBar: CopyrightBar
    },
    data () {
      return {
        msg: 'Factory Hunt 홈페이지',
        value: {
          userId: '',
          account: {},
          contact: {}
        },
        toggle: {
          isAuthLoaded: false
        }
      }
    },
    messages: {
      eng: {
        title: 'Factory Hunt - A Hub for Manufacturer Listings'
      },
      kor: {
        title: 'Factory Hunt - 제조업체를 위한 무료 영어 홈페이지 & 온라인 카탈로그 제작 서비스'
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn'
      ]),
      getDocumentTitle () {
        return this.translate('title')
      }
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(res => {
            this.toggle.isAuthLoaded = true
            this.value.contact = res[0].data
            this.value.account = res[1].data
            this.activateJquery()
          })
          .catch(() => {
            this.activateJquery()
            this.toggle.isAuthLoaded = true
          })
      },
      activateJquery () {
        $(document).ready(() => {
          this.applySmoothScrolling()
          this.applyAddAnimation()
        })
      },
      changeDocumentTitle () {
        document.title = this.getDocumentTitle
      },
      applySmoothScrolling () {
        //      Add smooth scrolling feature
        /* eslint-disable */
//      Add the above line to ignore space and ';' issue
        $(document).ready(function () {
          // Select all links with hashes
          $('.nav-item, #scroll-to-top, #see-more-btn')
            .click(function (event) {
              // On-page links
              if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname
              ) {
                // Figure out element to scroll to
                var target = $(this.hash)
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
                // Does a scroll target exist?
                if (target.length) {
                  // Only prevent default if animation is actually gonna happen
                  event.preventDefault()
                  $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target)
                    $target.focus()
                    if ($target.is(':focus')) { // Checking if the target was focused
                      return false
                    } else {
                      $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                      $target.focus() // Set focus again
                    }
                  })
                }
              }
            })
        })
        /* eslint-enable */
//    Add above line to enable not ignoring space and ';' issues
      },
      applyAddAnimation () {
        //      Add Animation
        $(document).ready(function () {
          scrollReveal.reveal('.scrollRight', {
            duration: 1000,
            scale: 1,
            origin: 'right',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollLeft', {
            duration: 1000,
            scale: 1,
            origin: 'left',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollRightDelay', {
            duration: 1000,
            delay: 300,
            scale: 1,
            origin: 'right',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollLeftDelay', {
            duration: 1000,
            delay: 300,
            scale: 1,
            origin: 'left',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollDownDelay', {
            duration: 1000,
            delay: 0,
            scale: 1,
            origin: 'top',
            distance: '200px',
            easing: 'ease'
          })
          scrollReveal.reveal('.scrollUpDelay', {
            duration: 1000,
            delay: 0,
            scale: 1,
            origin: 'bottom',
            distance: '100px',
            easing: 'ease'
          })
        })
      }
    },
    mounted () {
      this.tryAutoLogin()
      this.changeDocumentTitle()
    }
  }
</script>

<!-- Global setting is controlled by App.vue file. Please check out App.vue file.-->
<!-- 'scoped' attribute means below stylesheet is applied for only this vue file -->
<style>
  p {
    font-size: 14px;
  }
  /* Small Devices */
  @media only screen and (max-width: 767px) {
    .home-container .section-title {
      padding-top: 50px !important;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {
    .home-container .section-title {
      padding-top: 50px !important;
    }
  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }
  /*=============== Generic CSS =================*/
  .home-container {
    overflow-x: hidden;
  }
  .home-container .section-title {
    padding-top: 90px;
    padding-bottom: 50px;
  }
  .home-container .section-title h2 {
    position: relative;
    text-align: center;
    color: #333;
    font-size: 40px;
    font-weight: 500;
  }
  .home-container .section-title p {
    color: #484848;
    font-size: 20px;
    line-height: 28px;
    font-weight: 300;
    text-align: center;
    margin-top: 10px;
  }
</style>
