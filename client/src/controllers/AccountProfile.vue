<template>
  <div class="page-container">

    <nav-bar :inputData="input"></nav-bar>

    <div class="image-container">
      <img class="main-image" :src="account.account_image_url_1">
    </div>

    <div class="detail-contents">

      <div class="left-container">

        <div class="header-container">
          <h1 class="title">{{ account.account_name_english }}</h1>
          <img v-show="account.thumbnail_url" class="logo" :src="account.thumbnail_url">
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

        <div class="description-container">
          <h3>Company description</h3>
          <br>
          <h4 class="sub-title">{{ account.company_short_description }}</h4>
        </div>
        <div class="divider"></div>

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
            <dd>{{getLocation}}</dd>
            <dt>Established year</dt>
            <dd>{{ getYear(account.established_date) }}</dd>
          </dl>
        </div>
        <div class="divider"></div>

        <!--<div class="history-container">-->
          <!--<h3>History</h3>-->
          <!--<br>-->
        <!--</div>-->
        <!--<div class="divider"></div>-->

        <!--<div class="certification-container">-->
          <!--<h3>Certifications</h3>-->
          <!--<br>-->
        <!--</div>-->
        <!--<div class="divider"></div>-->

        <div class="review-container">
          <h3>Reviews <small>(0)</small></h3>
          <br>
          <p>No review.</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="right-container">

        <div class="form-container">

          <h3>Contact</h3>
          <br>
          <div class="input-container">
            <input v-model="email" type="text" :placeholder="placeholder.email">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea v-model="quiry" rows="10" :placeholder="placeholder.textarea"></textarea>

          <p class="quote">{{quote}}</p>

          <div class="button-container">
            <button @click="sendEmail(email, quiry)" type="submit" class="btn btn-default">Send inquiry</button>
          </div>
        </div>

      </div>

      <div class="location-container">
        <h3 class="title">Location</h3>
        <div id="map"></div>
      </div>

      <div class="products-container">
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
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    metaInfo: {
      title: 'Supplier | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        company: this.$route.params.company,
        id: this.$route.query.id,
        input: this.$route.query.input,
        account: {},
        products: [],
        placeholder: {
          email: 'contact@email.com',
          textarea: 'Enter your message'
        },
        email: '',
        quiry: '',
        quote: 'Request a quote to get pricing'
      }
    },
    computed: {
      getLocation () {
        const street = this.account.mailing_street_address_english
        const city = this.account.mailing_city_english
        const state = this.account.mailing_state_english
        const country = this.account.mailing_country_english
        return state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
      }
    },
    methods: {
      titleTemplate: function (account) {
        return account ? `${account} - Factory Hunt` : ' - Supplier'
      },
//      getAccount: function (id) {
//        this.$http.get(`/api/accounts/account/${id}`)
//          .then(response => {
//            this.account = response.data
//            this.initMap()
//          })
//      },
      checkIsMyAccount () {
        this.$http.get('/api/auth/session')
          .then(res => {
          })
      },
      getAccount: function (company) {
        this.$http.get(`/api/data/account/company/${company}`)
          .then(response => {
            if (!response.data) {
              this.$router.push({ path: '/error' })
            }
            this.account = response.data
            this.getProducts(this.account.account_id)
            this.initMap()
          })
      },
      getProducts: function (id) {
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
      }
    },
    created () {
      console.log('AccountProfile Created')
      window.scrollTo(0, 0)

      this.getAccount(this.company)
    },
    mounted () {
      console.log('AccountProfile Mounted')
    },
    updated () {
      console.log('AccountProfile Updated')
    }
  }
</script>

<style scoped>
  /*Top image container*/
  .image-container {
    overflow: hidden;
    width: 100%;
    height: 200px;
    display: -webkit-flex;
    display:         flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .image-container .main-image {
  }

  .left-container {

  }

  .header-container {
    position: relative;
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
    top: 0;
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

  }
  .description-container .sub-title {
    font-weight:200;
  }

  .information-container {

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

  .review-container {
    font-weight: 300;
    font-size:18px;
  }

  .right-container {
    margin-bottom: 60px;
  }
  .form-container {
    font-size: 17px;
  }
  .form-container .input-container {
    position: relative;
    border:1px solid lightgrey;
    border-radius: 4px;
    margin-bottom: 25px;
  }
  .form-container .input-container input {
    width: 100%;
    border-radius: 4px;
    padding: 10px 50px 10px 10px;
    border: none;
    box-shadow: none;
    outline: none;
  }
  .form-container .input-container i {
    position: absolute;
    right: 20px;
    top: 32%;
  }

  .form-container textarea {
    font-size: 17px;
  }
  .form-container .quote {
    margin: 14px 0;
    color: grey;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
  }
  .form-container button {
    width: 100%;
    height: 50px;
    font-weight: 500;
    font-size: 16px;
  }

  .location-container {  }
  .location-container #map {
    margin: 30px 0 60px 0;
    width: 100%;
    min-height: 330px;
  }

  .products-container {
    margin-top: 20px;
  }
  .products-container .title {
    margin-bottom: 30px;
  }
  .product-container .each-product {
    margin-bottom: 65px;
  }
  .product-container .each-product img {
    cursor: pointer;
    width: 100%;
    box-shadow: 1px 1px 10px 1px #e4e4e4;
  }
  .product-container .each-product p {
    margin-top: 15px;
    margin-bottom: 4px;
    font-size:16px;
  }
  .product-container .each-product .star-container {
    color: #317fa9;
    display: inline-block;
    text-align: center;
  }

  @media ( min-width: 768px ) {
    .image-container {
      height: 460px;
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

    .location-container {  }
    .location-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 450px;
    }
  }

  @media ( min-width: 1128px ) {
    .image-container {
      height: 490px;
    }

    .left-container {
      position: relative;
      padding-right: 410px;
    }
    .header-container .title {
      padding-right: 81px;
    }
    .header-container .logo {
      width: 76px;
      border-radius: 38px;
      border: 1px solid #eeeeee;
    }
    .right-container {
      position: absolute;
      width: 340px;
      top: 0;
      right: 0;
    }

    .form-container button {
      margin-bottom: 0;
    }

    .location-container {  }
    .location-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 500px;
    }
  }
</style>
