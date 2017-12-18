<template>
  <div class="page-container">

    <nav-bar :isUserLoggedIn="isLoggedIn" :account="value.account" :contact="value.contact"></nav-bar>

    <div class="body-container">

      <div class="left-container">

        <div class="header-container">
          <h1 class="title">{{ value.product.product_name }}</h1>
          <div class="sub-title-container">
            <h4 class="sub-title">{{ value.product.product_origin }}</h4>
            •
            <div class="star-container" v-for="index in 5">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
            •
            <h4 class="review-title">총 0개의 평가</h4>
          </div>
        </div>
        <div class="divider"></div>

        <div class="right-container">
          <div class="product-image-container">

            <div id="product-carousel" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li id="1st" data-target="#product-carousel" data-slide-to="0" class="active">

                </li>
                <li id="2nd" v-show="value.product.product_image_url_2" data-target="#product-carousel" data-slide-to="1">

                </li>
                <li id="3rd" v-show="value.product.product_image_url_3" data-target="#product-carousel" data-slide-to="2">

                </li>
                <li id="4th" v-show="value.product.product_image_url_4" data-slide-to="3">
                </li>
                <li id="5th" v-show="value.product.product_image_url_5" data-slide-to="4">
                </li>
                <li id="6th" v-show="value.product.product_image_url_6" data-slide-to="5">
                </li>
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">
                <div class="item active">
                  <img :src="value.product.product_image_url_1">
                </div>
                <div :class="value.product.product_image_url_2 ? 'item' : 'disable' " v-if="value.product.product_image_url_2">
                  <img :src="value.product.product_image_url_2" alt="...">
                </div>
                <div :class="value.product.product_image_url_3 ? 'item' : 'disable' " v-if="value.product.product_image_url_3">
                  <img :src="value.product.product_image_url_3" alt="...">
                </div>
                <div :class="value.product.product_image_url_4 ? 'item' : 'disable' " v-if="value.product.product_image_url_4">
                  <img :src="value.product.product_image_url_4" alt="...">
                </div>
                <div :class="value.product.product_image_url_5 ? 'item' : 'disable' " v-if="value.product.product_image_url_5">
                  <img :src="value.product.product_image_url_5" alt="...">
                </div>
                <div :class="value.product.product_image_url_6 ? 'item' : 'disable' " v-if="value.product.product_image_url_6">
                  <img :src="value.product.product_image_url_6" alt="...">
                </div>
              </div>

              <!-- Controls -->
              <a class="left carousel-control" href="#product-carousel" role="button" data-slide="prev">
                <icon class="arrow-image" name="arrow-left"></icon>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#product-carousel" role="button" data-slide="next">
                <icon class="arrow-image" name="arrow-right"></icon>
                <span class="sr-only">Next</span>
              </a>
            </div>

            <h4>{{ quote }}</h4>
            <button @click="onSendInquiry" class="button-orange">
              문의하기
            </button>
          </div>
          <div class="divider"></div>
        </div>

        <div class="information-container">
          <div class="category-contents">
            <span>{{value.product.primary_product_category}}</span>
            <span> > </span>
            <span>{{value.product.secondary_product_category}}</span>
          </div>
          <p id="vendor-text">제조사: <a @click="routeAccountProfilePage">{{ value.vendor.account_name }}</a></p>
          <div class="vendor-logo-container">
            <a v-if="value.vendor.thumbnail_url"><img class="vendor-logo-image" :src="value.vendor.thumbnail_url" @click="routeAccountProfilePage"></a>
            <a v-else><img class="vendor-logo-image" src="../assets/temp-logo-image_512.png" @click="routeAccountProfilePage"></a>
          </div>
          <!--<div class="list-container">-->
          <!--<div class="left-contents">최소 주문량: {{value.product.minimum_order_quantity}}</div>-->
          <!--<div class="right-contents">제품 가격: 미정</div>-->
          <!--</div>-->
          <!--<div class="list-container">-->
          <!--<div class="left-contents">소재 및 재질: {{ value.product.material_type }}</div>-->
          <!--<div class="right-contents">규격: {{ value.product.item_dimensions }}</div>-->
          <!--</div>-->

          <p class="left-contents">최소 주문량: {{value.product.minimum_order_quantity}}</p>
          <p class="right-contents">제품 가격: 미정</p>
          <p class="left-contents">소재 및 재질: {{ value.product.material_type }}</p>
          <p class="right-contents">규격: {{ value.product.item_dimensions }}</p>

        </div>
        <div class="divider"></div>

        <div class="reviews-container">
          <h3>평가 <small>0개</small></h3>
          <br>
          <h4>아직 평가가 없습니다.</h4>
        </div>
        <div class="divider"></div>
      </div>

      <div class="catalog-container">
        <h3>설명</h3>
        <br>
        <div class="catalog-inner-container" v-html="value.product.product_description"></div>
      </div>
      <div class="divider"></div>

      <div class="related-products-container">
        <h3 class="title">연관 제품</h3>
        <br>
        <div class="row">
          <div class="product-container" v-for="(product, index) in value.products" v-if="value.product.product_id !== product_id">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <div class="each-product">
                <img @click="routeProductProfilePage(index)" :src="value.product.product_image_url_1">
                <p>{{value.product.product_name}}</p>
                <div class="star-container" v-for="index in 5">
                  <i class="fa fa-star-o" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <copyright-bar></copyright-bar>

  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import CopyrightBar from '../components/CopyrightBar'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      NavBar,
      CopyrightBar
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'getAccountId',
        'getContactId'
      ])
    },
    data () {
      return {
        domain: this.$route.params.company,
        productDomain: this.$route.params.name,
        quote: '제품 가격을 문의하세요',
        value: {
          account: {},
          contact: {},
          products: [],
          product: {},
          vendor: {}
        }
      }
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(res => {
            this.value.contact = res[0].data
            this.value.account = res[1].data
          })
      },
      async fetchDatas () {
        const promise = await Promise.all([
          this.fetchProduct(),
          this.fetchVendor()
        ])
        this.value.product = promise[0]
        this.value.vendor = promise[1]
        if (!this.value.product.product_image_url_1) {
          this.value.product.product_image_url_1 = '../../static/product_loading_image.png'
        }
        this.applyJquery()
        this.activateJS()
      },
      fetchProduct () {
        return new Promise((resolve, reject) => {
          this.$http.get(`/api/data/product/domain/${this.productDomain}`)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject(err.response)
            })
        })
      },
      fetchVendor () {
        return new Promise((resolve, reject) => {
          this.$http.get(`/api/data/account/domain/${this.domain}`)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject(err.response)
            })
        })
      },
      activateJS () {
        this.changePageTitle()
      },
      onSendInquiry () {
        const productName = this.product.product_name
        const pid = this.product.product_id
        const aid = this.account.account_id
        this.$router.push({
          path: '/contact/premium',
          query: {
            input: this.input,
            productName: productName,
            pid: pid,
            aid: aid
          }
        })
      },
      applyJquery () {
        $(document).ready(function () {
          $('.carousel').hover(function () {
            $('.carousel-control').css({
              'opacity': '0.2'
            })
          }, function () {
            $('.carousel-control').css('opacity', '0')
          })
          $('#product-carousel').carousel({
            interval: false
          })
        })
      },
      changePageTitle () {
        document.title = `${this.value.product.product_name} - ${this.value.vendor.account_name} | Factory Hunt`
      },
      routeAccountProfilePage () {
        location.href = `/${this.domain}`
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.tryAutoLogin()
      this.fetchDatas()
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';

  // Global
  p {
    margin: 0;
  }
  textarea {
    resize: none;
  }

  .header-container .title {
    font-weight:500;
    margin-bottom: 10px;
    word-wrap: break-word;
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

  .right-container {
    position: relative;

    .arrow-image {
      position: absolute;
      top: 50%;
      color: @color-white;
    }
  }

  .information-container {
    position: relative;

    .category-contents {
      color: @color-font-gray;
      font-size: 17px;
      font-weight: 300;
    }

    #vendor-text {
      font-size: 19px;
      margin-bottom: 28px;
    }

    .vendor-logo-container {
      position: absolute;
      top: 0;
      right: 0;

      .vendor-logo-image {
        width: 60px;
        height: 60px;
        border: 1px solid @color-lightest-grey;
        border-radius: 30px;
      }
    }

    p {
      font-size: 19px;
      font-weight: 300;
      margin-bottom: 3px;
    }

    .list-container {
      position: relative;
      display: table;
      width: 100%;
      font-size: 19px;
      font-weight: 300;
      margin-bottom: 12px;

      .left-contents {
        display: table-cell;
        width: 50%;
      }
      .right-contents {
        display: table-cell;
        width: 50%;
      }
    }
  }

  .reviews-container h4 {
    font-size:19px;
    font-weight:300;
  }

  .product-image-container {

    #product-carousel {
      box-shadow: 1px 1px 10px 1px #e4e4e4;
    }

    .carousel-inner {
      width: 100%;
      height: 100%;

      .item {
        width: 100%;
        height: 100%;
        background-color: @color-white;

        img {
          height: 100%;
        }
      }
    }
  }
  .product-image-container img {
  }
  .product-image-container h4 {
    text-align: center;
    font-weight:400;
    color: grey;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .product-image-container button {
    height:45px;
    width: 100%;
    font-size:17px;
    font-weight:500;
  }
  .product-image-container .carousel {
    box-shadow: 1px 1px 10px 1px #e4e4e4;
    margin-bottom: 20px;
    height: 340px;
    width: 340px;
  }

  .product-image-container .carousel .carousel-indicators {
    bottom: 0;
  }
  .product-image-container .carousel .carousel-indicators li {
    border: none;
    background-color: #e4e4e4;
    width: 8px;
    height: 8px;
    margin: 0;
  }
  .product-image-container .carousel .carousel-indicators .active  {
    border: none;
    background-color: grey;
  }
  .product-image-container .carousel .carousel-control {
    background-color: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2)) !important;
    opacity:0;
  }
  .product-image-container .carousel .carousel-control:hover {
  }
  .arrow-image {
    top: 50%;
  }

  .review-container {
  }

  .catalog-container {
    position: relative;
  }
  .catalog-inner-container {
    overflow: hidden;
    text-align: inherit;
  }
  .catalog-inner-container img {
    width:100% !important;
  }
  /* App.vue에서 조절하는 거 아니면 db에서 가져온 게 css 적용이 안된다 */
  .catalog-container iframe {
    /*width:100%;*/
    /*height:300px;*/
  }

  .related-products-container h4 {
    font-size:19px;
    font-weight:300;
    margin-top: 20px;
  }
  .related-products-container .title {
    margin-bottom: 10px;
  }
  .related-products-container .product-container .each-product {
    margin-bottom:25px;
    min-height:340px;
  }
  .related-products-container .product-container .each-product img {
    cursor: pointer;
    width: 100%;
    box-shadow: 1px 1px 10px 1px #e4e4e4;
  }
  .related-products-container .product-container .each-product p {
    margin-top: 15px;
    margin-bottom: 4px;
    font-size:16px;
  }
  .related-products-container .product-container .each-product .star-container {
    color: #317fa9;
    display: inline-block;
    text-align: center;
  }

  @media ( min-width: 744px ) {
    .left-container{

    }
    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }
  }
  @media ( min-width: 1128px ) {
    .left-container {
      position: relative;
      padding-right: 410px;
    }
    .right-container {
      position: absolute;
      width: 340px;
      top: 0;
      right: 0;
    }
    .right-container .divider {
      display: none;
    }
  }
</style>
