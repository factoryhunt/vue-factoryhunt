<template>
  <div class="page-container">

    <nav-bar :inputData="input"></nav-bar>

    <div class="image-container">
      <!--<img v-if="!account.account_image_url_1" class="main-image" :src="account.account_image_url_1">-->
      <div class="temp-image-container">
        대표 이미지를 넣어주세요
      </div>
    </div>

    <div class="detail-contents">

      <div class="left-container">

        <div class="header-container">
          <i @click="toggle.isAccountNameEdited = true" v-if="!toggle.isAccountNameEdited" class="fa fa-pencil image-edit" aria-hidden="true"></i>
          <i @click="toggle.isAccountNameEdited = false" v-if="toggle.isAccountNameEdited" class="fa fa-check image-edit" aria-hidden="true"></i>
          <h1 v-if="!toggle.isAccountNameEdited" class="title">{{ value.accountName }}</h1>
          <input v-else class="title input-basic" type="text" :value="value.accountName" v-model="value.accountName"/>
          <img v-show="account.thumbnail_url" class="logo" :src="account.thumbnail_url">
          <div class="sub-title-container">
            <h4 class="sub-title">{{ account.mailing_country }}</h4>
            •
            <div class="star-container" v-for="index in 5">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
            •
            <h4 class="review-title"><small>{{ msg.kor.review }} (0)</small></h4>
          </div>
        </div>
        <div class="divider"></div>

        <div class="description-container">
          <i @click="toggle.isDescriptionEdited = true" v-if="!toggle.isDescriptionEdited" class="fa fa-pencil image-edit" aria-hidden="true"></i>
          <i @click="toggle.isDescriptionEdited = false" v-if="toggle.isDescriptionEdited" class="fa fa-check image-edit" aria-hidden="true"></i>
          <h3>{{ msg.kor.description }}</h3>
          <br>
          <h4 v-if="!toggle.isDescriptionEdited" class="sub-title">{{ value.description }}</h4>
          <textarea v-else rows="4" :value="value.description" v-model="value.description"></textarea>
        </div>
        <div class="divider"></div>

        <div class="information-container">
          <i class="fa fa-pencil image-edit" aria-hidden="true"></i>
          <h3>{{ msg.kor.information }}</h3>
          <br>
          <dl class="dl-horizontal information-table-container">
            <dt>{{ msg.kor.products }}</dt>
            <dd>{{ account.products_english }}</dd>
            <dt>{{ msg.kor.website }}</dt>
            <dd><a :href="checkWebsiteLinkHasHttp(account.website)" target="_blank">{{ account.website }}</a></dd>
            <dt>{{ msg.kor.phone }}</dt>
            <dd>{{ account.phone }}</dd>
            <dt>{{ msg.kor.address }}</dt>
            <dd>{{getLocation}}</dd>
            <dt>{{ msg.kor.establishedYear }}</dt>
            <dd>{{ getYear(account.established_date) }}</dd>
          </dl>
        </div>
        <div class="divider"></div>

        <div class="history-container">
          <i class="fa fa-pencil image-edit" aria-hidden="true"></i>
        <h3>{{ msg.kor.history }}</h3>
        <br>
        </div>
        <div class="divider"></div>

        <div class="certification-container">
          <i class="fa fa-pencil image-edit" aria-hidden="true"></i>
          <h3>{{ msg.kor.certifications }}</h3>
          <br>
        </div>
        <div class="divider"></div>

        <div class="review-container">
          <h3>{{ msg.kor.review }} <small>(0)</small></h3>
          <br>
          <p>{{ msg.kor.noReview }}</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="right-container">

        <div class="form-container">

          <h3>{{ msg.kor.contact }}</h3>
          <br>
          <div class="input-container">
            <input v-model="value.email" type="text" :placeholder="placeholder.kor.email">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </div>

          <textarea v-model="value.quiry" rows="10" :placeholder="placeholder.kor.textarea"></textarea>

          <p class="quote">{{msg.kor.quote}}</p>

          <div class="button-container">
            <button type="submit" class="button-orange">{{ msg.kor.sendInquiry }}</button>
          </div>
        </div>

      </div>

      <div class="location-container">
        <h3 class="title">{{ msg.kor.location }}</h3>
        <div id="map"></div>
      </div>

      <div class="products-container">
        <i class="fa fa-plus image-product-add" aria-hidden="true"></i>
        <div class="row">
          <div class="col-md-12">
            <h3 class="title">{{ msg.kor.products }} <small>({{products.length}})</small></h3>

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
  import NavBar from '../../components/NavBar'
  import FooterBar from '../../components/FooterBar'

  export default {
    metaInfo: {
      title: '정보수정 | 팩토리헌트'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        input: this.$route.query.input,
        account: {},
        products: [],
        msg: {
          eng: {
          },
          kor: {
            description: '회사 소개',
            information: '정보',
            history: '연혁',
            certifications: '인증서',
            review: '리뷰',
            noReview: '리뷰가 없습니다.',
            location: '위치',
            products: '제품',
            contact: '연락하기',
            quote: '메일을 보내 가격을 문의해보세요',
            sendInquiry: '문의하기',
            website: '웹사이트',
            phone: '연락처',
            address: '주소',
            establishedYear: '설립연도'
          }
        },
        placeholder: {
          eng: {
          },
          kor: {
            email: '이메일',
            textarea: '여기에 입력하세요'
          }
        },
        toggle: {
          isAccountNameEdited: false,
          isDescriptionEdited: false,
          isInformationEdited: false,
          isHistoryEdited: false,
          isCertificationEdited: false
        },
        value: {
          email: '',
          quiry: '',
          accountName: '',
          description: ''
        }
      }
    },
    computed: {
      getLocation () {
        const street = this.account.mailing_street_address_english
        const city = this.account.mailing_city_english
        const state = this.account.mailing_state_english
        const country = this.account.mailing_country_english
        return state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
      },
      onToggle (toggle) {
        toggle = !toggle
      }
    },
    methods: {
      titleTemplate: function (account) {
        return account ? `${account} - Factory Hunt` : ' - Supplier'
      },
      initialize () {
//        if (!this.$store.state.user) {
//          alert('로그인 정보가 만료되었습니다.')
//          this.$router.push({
//            path: '/login'
//          })
//        }
//        this.getAccount(this.$store.state.user.account_id)
        this.getAccount(59)
      },
      getAccount: function (id) {
        this.$http.get(`/api/data/account/id/${id}`)
          .then(response => {
            if (!response.data) {
              this.$router.push({ path: '/error' })
            }
            this.account = response.data
            this.duplicateData(this.account)
            this.getProducts(this.account.account_id)
            this.initMap()
          })
      },
      duplicateData (account) {
        this.value.accountName = account.account_name
        this.value.description = account.company_short_description
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
      window.scrollTo(0, 0)
      this.initialize()
    },
    mounted () {
    },
    updated () {
      console.log('controller Updated')
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/less/global";

  .image-edit {
    position: absolute;
    top: 3px;
    right: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  .image-product-add {
    position: absolute;
    top: 8px;
    left: 180px;
    font-size: 18px;
    cursor: pointer;
  }

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
  .temp-image-container {
    width: 100%;
    height: 100%;
    background-color: @color-light-grey;
    display: -webkit-flex;
    display:         flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: 50px;
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
    position: relative;
  }
  .description-container .sub-title {
    font-weight:200;
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
  }

  .certification-container {
    position: relative;
  }

  .review-container {
    position: relative;
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
    position: relative;
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
