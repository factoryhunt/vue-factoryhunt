<template>

  <div class="page-container">

    <nav-bar :inputData="input"></nav-bar>

    <div class="detail-contents">

      <div class="left-container">
        <div class="header-container">
          <h1 class="title">{{ product.product_name }}</h1>
          <div class="sub-title-container">
            <h4 class="sub-title">{{ product.product_origin }}</h4>
            •
            <div class="star-container" v-for="index in 5">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
            •
            <h4 class="review-title">reviews <small>(0)</small></h4>
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
                <li id="2nd" v-show="product.product_image_url_2" data-target="#product-carousel" data-slide-to="1">

                </li>
                <li id="3rd" v-show="product.product_image_url_3" data-target="#product-carousel" data-slide-to="2">

                </li>
                <li id="4th" v-show="product.product_image_url_4" data-slide-to="3">
                </li>
                <li id="5th" v-show="product.product_image_url_5" data-slide-to="4">
                </li>
                <li id="6th" v-show="product.product_image_url_6" data-slide-to="5">
                </li>
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">
                <div class="item active">
                  <img :src="product.product_image_url_1" alt="...">
                </div>
                <div :class="product.product_image_url_2 ? 'item' : 'disable' " v-if="product.product_image_url_2">
                  <img :src="product.product_image_url_2" alt="...">
                </div>
                <div :class="product.product_image_url_3 ? 'item' : 'disable' " v-if="product.product_image_url_3">
                  <img :src="product.product_image_url_3" alt="...">
                </div>
                <div :class="product.product_image_url_4 ? 'item' : 'disable' " v-if="product.product_image_url_4">
                  <img :src="product.product_image_url_4" alt="...">
                </div>
                <div :class="product.product_image_url_5 ? 'item' : 'disable' " v-if="product.product_image_url_5">
                  <img :src="product.product_image_url_5" alt="...">
                </div>
                <div :class="product.product_image_url_6 ? 'item' : 'disable' " v-if="product.product_image_url_6">
                  <img :src="product.product_image_url_6" alt="...">
                </div>
              </div>

              <!-- Controls -->
              <a class="left carousel-control" href="#product-carousel" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#product-carousel" role="button" data-slide="next">
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>

            <h4>{{ quote }}</h4>
            <button @click="onSendInquiry" class="btn btn-default">
              Send inquiry
            </button>
          </div>
          <div class="divider"></div>
        </div>

        <div class="information-container">
          <h3>Information</h3>
          <br>
          <h4>{{product.primary_product_category}}</h4>
          <h4>{{product.secondary_product_category}}</h4>
          <h4 v-show="product.minimum_order_quantity">MOQ: {{ product.minimum_order_quantity }}</h4>
          <h4 v-show="product.item_dimensions">Dimensions: {{ product.item_dimensions }}</h4>
          <h4 v-show="product.material_type">Material type: {{ product.material_type }}</h4>
          <h4>Made by: <a @click="routeAccountProfilePage">{{account.account_name_english}}</a></h4>
        </div>
        <div class="divider"></div>

        <div class="reviews-container">
          <h3>Reviews <small>(0)</small></h3>
          <br>
          <h4>No review.</h4>
        </div>
        <div class="divider"></div>
      </div>

      <div class="catalog-container">
        <h3>Catalogs</h3>
        <br>
        <div class="catalog-inner-container" v-html="product.product_description"></div>
      </div>
      <div class="divider"></div>

      <div class="related-products-container">
        <h3 class="title">Related products</h3>
        <br>
        <div class="row">
          <div class="product-container" v-for="(product, index) in products" v-if="product.product_id !== product_id">
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

    <footer-bar></footer-bar>

  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    metaInfo: {
      title: 'Product | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        input: this.$route.query.input,
        product_id: parseInt(this.$route.query.id),
        products: [],
        product: [],
        account: [],
        quote: 'Request a quote to get pricing'
      }
    },
    methods: {
      requestProductData: function () {
        // find single product by using product id
        this.$http.get(`/api/data/product/id/${this.product_id}`)
          .then(response => {
            this.product = response.data

            this.requestAccountData(this.product.account_id)
          })
      },
      requestAccountData: function (accountId) {
        this.$http.get(`/api/data/account/id/${accountId}`)
          .then(response => {
            this.account = response.data

            this.requestRelatedProductsData(this.account.account_id)
          })
      },
      requestRelatedProductsData: function (aid) {
        this.$http.get(`/api/data/product/account_id/${aid}`)
          .then(response => {
            this.products = response.data
          })
      },
      routeAccountProfilePage: function () {
        const domain = this.account.domain
        this.$router.push({
          path: `/${domain}`
        })
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
      onSendInquiry: function () {
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
      applyBootstrap: function () {
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
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.requestProductData()
      this.applyBootstrap()
    },
    watch: {
      '$route.query.id' (n, o) {
        this.products = []
        this.product = []
        this.account = []
        location.reload()
        window.scrollTo(0, 0)
//        this.product_id = n
//        this.requestProductData()
      }
    }
  }
</script>

<style scoped>

  .header-container .title {
    font-weight:500;
    margin-bottom: 10px;
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

  .information-container {

  }
  .information-container h4 {
    font-size:19px;
    font-weight:300;
    line-height:1.6;
  }

  .reviews-container h4 {
    font-size:19px;
    font-weight:300;
  }

  .product-image-container {
  }
  .product-image-container img {
    box-shadow: 1px 1px 10px 1px #e4e4e4;
  }
  .product-image-container h4 {
    text-align: center;
    font-weight:400;
    color: grey;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .product-image-container .btn {
    height:45px;
    width: 100%;
    font-size:17px;
    font-weight:500;
  }
  .product-image-container .carousel {
    box-shadow: 1px 1px 10px 1px #e4e4e4;
    margin-bottom: 20px;
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
  .product-image-container .glyphicon {
    top: 50%;
  }

  .catalog-container {
    margin-top: 20px;
  }
  .catalog-inner-container {
    overflow: hidden;
    text-align: center;
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
      height: 440px;
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
