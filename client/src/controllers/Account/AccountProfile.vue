<template>
  <div class="page-container">

    <nav-bar :inputData="value.input"></nav-bar>

    <div class="image-container">
      <div class="main-image"></div>
    </div>

    <div class="detail-contents">

      <!-- Left-side UI container -->
      <div class="left-container">

        <!-- Sticky Header -->
        <div class="sticky-outer-container">
          <div class="sticky-inner-container">
            <div class="sticky-container">
              <ul>
                <li><a href="#INTRO" class="sticky-item">Intro</a></li>
                <li>•</li>
                <li><a href="#ADDRESS" class="sticky-item">Address</a></li>
                <li>•</li>
                <li><a href="#PRODUCTS" class="sticky-item">Products</a></li>
                <li v-if="toggle.isUserAdmin"><a id="edit-button" @click="onEditButton">{{ msg.kor.edit }}</a></li>
              </ul>
            </div>

            <div class="sticky-company-container">
              <a href="#app"class="sticky-item">
                <div id="sticky-company-logo"></div>
                <span id="sticky-company-name">{{account.account_name_english}}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Company Header -->
        <div id="header-container" class="header-container">
          <h1 class="title">{{ account.account_name_english }}</h1>
          <img v-if="account.thumbnail_url" class="logo" :src="account.thumbnail_url">
          <img v-else class="logo" src="../../assets/fh_logo_512.png">
          <div class="sub-title-container">
            <h4 class="sub-title">{{ account.billing_country }}</h4>
            •
            <div class="star-container" v-for="index in 5">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
            •
            <h4 class="review-title">reviews <small>(0)</small></h4>
          </div>
        </div>
        <div class="divider"></div>

        <!-- Company Description -->
        <div id="INTRO" class="description-container">
          <h3>Company description</h3>
          <br>
          <textarea>{{ account.company_short_description }}</textarea>
        </div>
        <div class="divider"></div>

        <!-- Company Information -->
        <div class="information-container">
          <h3>Information</h3>
          <br>
          <dl class="dl-horizontal information-table-container">
            <dt>Products</dt>
            <dd>{{ account.products_english }}</dd>
            <dt>Website</dt>
            <dd><a :href="checkWebsiteLinkHasHttp(account.website)" target="_blank">{{ account.website }}</a></dd>
            <dt>Phone</dt>
            <dd>{{ account.phone }}</dd>
            <dt>Location</dt>
            <dd>{{ getLocation }}</dd>
            <dt>Established year</dt>
            <dd>{{ getYear(account.established_date) }}</dd>
          </dl>
        </div>
        <div class="divider"></div>

        <!-- Company History -->
        <!--<div class="history-container">-->
          <!--<h3>History</h3>-->
          <!--<br>-->
          <!--<textarea>{{ account.history }}</textarea>-->
        <!--</div>-->
        <!--<div class="divider"></div>-->

        <!-- Company Certification -->
        <!--<div class="certification-container">-->
          <!--<h3>Certifications</h3>-->
          <!--<br>-->
        <!--</div>-->
        <!--<div class="divider"></div>-->

        <!-- Company Review -->
        <div id="review-container" class="review-container">
          <h3>Reviews <small>(0)</small></h3>
          <br>
          <p>No review.</p>
        </div>
        <div class="divider"></div>
      </div>

      <!-- Contact Form -->
      <div class="right-container">
        <div class="form-container">

          <h3>Contact</h3>
          <br>
          <div class="input-container">
            <input v-model="value.email" type="text" :placeholder="placeholder.email">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea v-model="value.quiry" rows="10" :placeholder="placeholder.textarea"></textarea>

          <p class="quote">{{msg.quote}}</p>

          <div class="button-container">
            <button @click="sendEmail(value.email, value.quiry)" type="submit" class="btn btn-default">Send inquiry</button>
          </div>
        </div>
      </div>

      <!-- Company Address -->
      <div id="ADDRESS" class="address-container">
        <h3 class="title">Address</h3>
        <div id="map"></div>
      </div>

      <!-- Company Products -->
      <div id="PRODUCTS" class="products-container">
        <div class="row">

          <div class="col-md-12">
            <h3 class="title">Products <small>({{products.length}})</small></h3>

            <div class="product-container" v-for="(product, index) in this.products">
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="each-product">
                  <img @click="routeProductProfilePage(index)" :src="product.product_image_url_1">
                  <p>{{product.product_name}}</p>
                  <div class="star-container" v-for="index in 5">
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <footer-bar></footer-bar>

  </div>
</template>

<script>
  import cookie from '../../assets/js/cookie'
  import NavBar from '../../components/NavBar'
  import FooterBar from '../../components/FooterBar'
  import SubNavigationBar from './components/SubNavigationBar'

  export default {
    metaInfo: {
      title: 'Supplier | Factory Hunt'
    },
    components: {
      NavBar,
      SubNavigationBar,
      FooterBar
    },
    data () {
      return {
        account: {},
        products: [],
        value: {
          company: this.$route.params.company,
          input: this.$route.query.input,
          email: '',
          quiry: '',
          // for admin editing
          accountName: ''
        },
        toggle: {
          isUserAdmin: false,
          isAccountNameEdited: false,
          isDescriptionEdited: false,
          isInformationEdited: false,
          isHistoryEdited: false,
          isCertificationEdited: false
        },
        placeholder: {
          email: 'contact@email.com',
          textarea: 'Enter your message'
        },
        msg: {
          quote: 'Request a quote to get pricing',
          kor: {
            edit: '수정하기'
          }
        }
      }
    },
    created () {
      window.scrollTo(0, 0)
      console.log('AccountProfile Created')
      this.validateUser()
      this.fetchAccount(this.value.company)
    },
    mounted () {
    },
    computed: {
      getLocation () {
        const street = this.account.mailing_street_address_english
        const city = this.account.mailing_city_english
        const state = this.account.mailing_state_english
        const country = this.account.mailing_country_english
        return state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
      },
      getToken () {
        return cookie.getCookie('nekot')
      },
      getAccountId () {
        return this.account.account_id
      }
    },
    methods: {
      titleTemplate (account) {
        return account ? `${account} - Factory Hunt` : ' - Supplier'
      },
      validateUser () {
        const data = {
          headers: {
            'x-access-token': this.getToken
          }
        }
        this.$http.get('/api/auth/check', data)
          .then(() => {
//            const contactId = res.data.info.id
            this.toggle.isUserAdmin = true
          })
          .catch(() => {
            this.toggle.isUserAdmin = false
          })
      },
      fetchAccount (company) {
        this.$http.get(`/api/data/account/company/${company}`)
          .then(response => {
            if (!response.data) {
              this.$router.push({ path: '/error' })
            }
            console.log(response)
            this.account = response.data
            this.applyLocalData(this.account)
            this.fetchProducts(this.account.account_id)
            this.initMap()
            this.activateJquery()
            document.title = `${this.account.account_name_english} | Factory Hunt`
          })
      },
      onEditButton () {
        this.$router.push({
          path: `/${this.value.company}/edit-kor`
        })
      },
      applyLocalData (account) {
        this.value.accountName = this.account.account_name_english
      },
      fetchProducts: function (id) {
        if (!id) return
        this.$http.get(`/api/data/product/account_id/${id}`)
          .then(response => {
            this.products = response.data
          })
      },
      getYear: function (year) {
        if (year) {
          year = year.split('-')
          return year[0]
        }
      },
      checkWebsiteLinkHasHttp: function (url) {
        if (url) {
          if (url.indexOf('http') === -1) {
            url = ('http://' + url).toLowerCase()
            return url
          }
        }
      },
      sendEmail: function (email, quiry) {
        alert('Sent success.')
        const data = {
          email: email,
          company: this.account.account_name_english,
          quiry: this.convertEnterToBrTag(quiry),
          subject: 'An inquiry for verified supplier'
        }
        this.$http.post('/api/mail/company', data)
          .then(response => {
            console.log('mail sent: ' + response.data)
          })
      },
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      },
      routeProductProfilePage: function (index) {
        this.$router.push({
          path: '/product/profile',
          query: {
            input: this.input,
            productName: this.products[index].product_name,
            id: this.products[index].product_id
          }
        })
      },
      initMap () {
        const latlng = new google.maps.LatLng(39.305, -76.617)
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: latlng,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
          },
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: false
        })
        var geocoder = new google.maps.Geocoder()
        this.geocodeAddress(geocoder, map)
      },
      geocodeAddress (geocoder, resultsMap) {
        /* eslint-disable no-unused-vars */
        const street = this.account.mailing_street_address_english
        const city = this.account.mailing_city_english
        const state = this.account.mailing_state_english
        const country = this.account.mailing_country_english
        const address = state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
        console.log(address)
        geocoder.geocode({'address': address}, function (results, status) {
          if (status === 'OK') {
            console.log('map ok')
            resultsMap.setCenter(results[0].geometry.location)
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            })
          } else {
            geocoder.geocode({'address': 'south korea'}, function (result, status) {
              resultsMap.setCenter(result[0].geometry.location)
            })
          }
        })
        /* eslint-enable no-unused-vars */
      },
      textareaResize () {
        $(document).ready(() => {
          const $description = $('.description-container textarea')
          const $history = $('.history-container textarea')
//          console.log($textarea[0].scrollHeight)
          $description.css({
            'height': ($description[0].scrollHeight) + 'px',
            'overflow': 'hidden'
          })
          $history.css({
            'height': ($history[0].scrollHeight) + 'px',
            'overflow': 'hidden'
          })
        })
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyImageCSS()
          this.applySmoothScrolling()
          this.applyStickyCSS()
          this.applyCompanyFadeInOutInStickyNavigationBar()
          this.applyCompanyLogoImage()
          this.textareaResize()
        })
      },
      applyStickyCSS () {
        const $stickyOuter = $('.sticky-outer-container')
        const $stickyInner = $('.sticky-inner-container')
        const $sticky = $('.sticky-container')
//          const $stickyStopper = $('.sticky-stopper')
        if ($stickyOuter.offset()) { // make sure ".sticky" element exists
//            var generalSidebarHeight = $sticky.innerHeight() // 30
          var stickyTop = $stickyOuter.offset().top
//            var stickyBottom = stickyTop + $sticky.outerHeight()
          var stickOffset = 0
//            var stickyStopperPosition = $stickyStopper.offset().top // 2259
//            var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset
//            var diff = stopPoint + stickOffset
          $(window).scroll(function () { // scroll event
            var windowTop = $(window).scrollTop() // returns number
//            console.log('windowTop: ', windowTop)
//            console.log('stickyTop: ', stickyTop)
//              console.log('stickyBottom: ', stickyBottom)
//              console.log('stickyStopperPosition: ', stickyStopperPosition)
//              console.log('stopPoint: ', stopPoint)
//              console.log('diff: ', diff)
            if (stickyTop - windowTop <= stickOffset) {
              $stickyOuter.css({
                'position': 'fixed',
                'top': stickOffset,
                'border-bottom': '1px solid #dbdbdb'
              })
              $stickyInner.css({
                'padding-right': 'none'
              })
              $sticky.css({
                'border-bottom': 'none'
              })
            } else {
              $stickyOuter.css({
                'position': 'absolute',
                'top': '-50px',
                'border-bottom': 'none'
              })
              $stickyInner.css({
                'padding-right': '410px'
              })
              $sticky.css({
                'border-bottom': '1px solid #dbdbdb'
              })
            }
//              else if (stickyStopperPosition - windowTop < 0) {
//                $sticky.css({
//                  'position': 'absolute',
//                  'bottom': stickyStopperPosition
//                })
          })
        }
      },
      applyCompanyFadeInOutInStickyNavigationBar () {
        $(document).ready(() => {
          const fadeContainer = $('.sticky-company-container')
          var title = $('.header-container .logo')
          var titleBottomOffset = title.offset().top + title.outerHeight() - 60
          $(window).scroll(function () { // scroll event
            var windowTop = $(window).scrollTop() // returns number
            if (windowTop > titleBottomOffset) {
              fadeContainer.css({'opacity': '1'}).fadeIn(200)
            } else {
              fadeContainer.fadeOut(200)
            }
          })
        })
      },
      applySmoothScrolling () {
        /* eslint-disable */
        $(document).ready(function () {

          // Select all links with hashes
          $('.sticky-item')
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
                    scrollTop: target.offset().top - 70
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
      applyCompanyLogoImage () {
        const $logo = $('#company-logo')
        const $stickyLogo = $('#sticky-company-logo')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../static/temp-logo-image_512.png)'
        }
        $logo.css('background-image', image)
        $stickyLogo.css('background-image', image)
      },
      applyImageCSS () {
        const $image = $('.main-image')
        var image = this.account.account_image_url_1
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../static/cover_image.png)'
        }
        $image.css('background-image', image)
      },
      imageResize () {
        const $image = $('.product-image')
        $image.css('height', $image.width() + 'px')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../assets/less/global';

  .image-edit {
    position: absolute;
    top: 1px;
    left: -32px;
    font-size: 24px;
    cursor: pointer;
  }
  .image-product-add {
    position: absolute;
    top: 8px;
    right: 0;
    font-size: 30px;
    cursor: pointer;
  }

  .detail-contents {
    margin-top: 0 !important;
  }

  /*Top image container*/
  .image-container {
    position: relative;
    /*overflow: hidden;*/
    /*width: 100%;*/
    /*height: 200px;*/
    /*display: -webkit-flex;*/
    /*display:         flex;*/
    /*-webkit-align-items: center;*/
    /*align-items: center;*/
    /*-webkit-justify-content: center;*/
    /*justify-content: center;*/
  }
  .image-container .main-image {
    /*background-image: url(../../assets/temp_01.png);*/
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: 50% 50% !important;
    height: 320px !important;
  }

  .left-container {

    .sticky-outer-container {
      display: none;
    }
  }

  .header-container {
    position: relative;
    padding-top: 24px;
  }
  .header-container .title {
    font-size: 32px;
    font-weight:500;
    margin-bottom:10px;
    padding-right: 65px;
  }
  .header-container .sub-title-container {
    padding-right: 65px;
  }
  .header-container .logo {
    position: absolute;
    top: 12px;
    right:0;
    border: 2px solid #eeeeee;
    width: 60px;
    border-radius: 30px;
  }
  .header-container .sub-title-container .sub-title  {
    font-weight: 400;
    display: inline;
  }
  .header-container .sub-title-container .review-title  {
    font-weight: 400;
    display: inline;
  }
  .header-container .star-container {
    display: inline;
  }
  .header-container .star-container i {
    color: #317fa9;
    /*color: rgb(53, 105, 206)*/
  }

  .description-container {
    position: relative;
    outline: none;

    .sub-title {
      font-weight:200;
    }
    textarea {
      resize: none;
      border: none;
      padding: 0;
      font-weight:200;
      font-size:18px;
    }
  }

  .information-container {
    position: relative;
  }
  .information-container .information-table-container dt {
    font-weight: 500;
    line-height:1.7;
    font-size:16px;
  }
  .information-container .information-table-container dd {
    font-weight: 400;
    line-height:1.7;
    font-size:16px;
  }

  .history-container {
    position: relative;

    textarea {
      resize: none;
      border: none;
      padding: 0;
      font-weight:200;
      font-size:18px;
    }
  }

  .certification-container {
    position: relative;
  }

  .review-container {
    font-weight: 300;
    font-size:18px;
  }

  .right-container {
    .form-container {
      font-size: 17px;

      .input-container {
        position: relative;
        border:1px solid @color-light-grey !important;
        border-radius: 4px;
        margin-bottom: 25px;

        i {
          position: absolute;
          right: 20px;
          top: 32%;
        }

        input {
          width: 100%;
          border-radius: 4px;
          padding: 10px 50px 10px 10px;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
      }

      textarea {
        font-size: 17px;
      }

      .quote {
        margin: 14px 0;
        color: grey;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }

      button {
        width: 100%;
        height: 50px;
        font-weight: 500;
        font-size: 16px;
      }
    }
  }

  .address-container {
    outline: none;
    #map {
      margin: 30px 0 60px 0;
      width: 100%;
      min-height: 330px;
    }
  }

  .products-container {
    margin-top: 20px;
    outline: none;

    .title {
      margin-bottom: 30px;
    }

    .each-product {
      margin-bottom: 65px;

      img {
        cursor: pointer;
        width: 100%;
        box-shadow: 1px 1px 10px 1px #e4e4e4;
      }

      p {
        margin-top: 15px;
        margin-bottom: 4px;
        font-size: 16px;
      }

      .star-container {
        color: #317fa9;
        display: inline-block;
        text-align: center;
      }
    }
  }

  @media ( min-width: 744px ) {
    .image-container {
      .main-image {
        height: 460px !important;
      }
    }

    .left-container {
    }

    .header-container .title {
      padding-right: 75px;
    }
    .header-container .logo {
      width: 70px;
      border-radius: 35px;
      border: 1px solid #eeeeee;
    }

    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .address-container {  }
    .address-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 450px;
    }
  }

  @media ( min-width: 1128px ) {
    .image-container {
      .main-image {
        height: 460px !important;
      }
    }

    .left-container {
      position: relative;
      margin-top: 50px;
      padding-right: 410px;

      .sticky-outer-container {
        display: inherit;
        position: absolute;
        background-color: @color-white;
        z-index: 3;
        height: 50px;
        line-height: 50px;
        width: 100%;
        top: -50px;
        left: 0;

        .sticky-inner-container {
          position: relative;
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
          padding-right: 410px;

          .sticky-container {
            position: relative;
            border-bottom: 1px solid @color-light-grey;

            ul {
              font-size: 16px;
              list-style: none;
              margin-bottom: 0;
              padding-left: 0;

              li {
                display: inline-block;
              }

              a {
                font-weight: 500;
              }

              #edit-button {
                position: absolute;
                color: @color-orange;
                right: 0;
                top: 0;
              }
            }
            .dot {
              margin: 0 5px;
            }
          }

          .sticky-company-container {
            position: absolute;
            top: -2px;
            right: 0;
            opacity: 0;

            a {
              text-decoration: none;
              color: @color-font-gray;

              #sticky-company-logo {
                display: inline-block;
                vertical-align: middle;
                width: 32px;
                height: 32px;
                border-radius: 16px;
                border: 1px solid @color-lightest-grey;
                background-position: 50% 50%;
                background-size: cover;
                background-repeat: no-repeat;
              }
              #sticky-company-name {
                font-weight: 500;
                margin-left: 5px;
                font-size: 16px;
              }
            }
          }
        }
      }

      .header-container {

        .title {
          padding-right: 81px;
        }

        .logo {
          width: 70px;
          border-radius: 35px;
          border: 1px solid #eeeeee;
        }
      }
    }

    .right-container {
      position: absolute;
      width: 340px;
      top: 5px;
      right: 0;
    }

    .form-container button {
      margin-bottom: 0;
    }

    .address-container {  }
    .address-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 500px;
    }
  }
</style>
