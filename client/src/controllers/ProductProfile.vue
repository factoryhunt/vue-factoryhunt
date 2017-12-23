<template>
  <div class="page-container">

    <nav-bar v-if="toggle.isAuthLoaded" :isUserLoggedIn="isLoggedIn" :account="value.account" :contact="value.contact"></nav-bar>

    <div class="body-container">

      <div class="left-container">

        <!-- Header -->
        <div class="header-container">
          <h1 class="title">{{ value.product.product_name }}</h1>
          <div class="sub-title-container">
            <h4 class="sub-title">{{ value.product.product_origin }}</h4>
            •
            <div class="star-container" v-for="index in 5">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
            •
            <h4 class="review-title">Reviews (0)</h4>
          </div>
        </div>
        <div class="divider"></div>

        <!-- Product Images -->
        <div class="right-container">

          <div class="product-image-container">
            <div class="item">
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

          <h4 class="quote-text">Send inquiry to get pricing</h4>
          <button @click="onSendInquiry" class="button-orange inquiry-button">Send inquiry</button>

          <!--<div class="product-image-containers">-->

          <!--<div id="product-carousel" class="carousel slide" data-ride="carousel">-->
          <!--&lt;!&ndash; Indicators &ndash;&gt;-->
          <!--<ol class="carousel-indicators">-->
          <!--<li id="1st" data-target="#product-carousel" data-slide-to="0" class="active">-->

          <!--</li>-->
          <!--<li id="2nd" v-show="value.product.product_image_url_2" data-target="#product-carousel" data-slide-to="1">-->

          <!--</li>-->
          <!--<li id="3rd" v-show="value.product.product_image_url_3" data-target="#product-carousel" data-slide-to="2">-->

          <!--</li>-->
          <!--<li id="4th" v-show="value.product.product_image_url_4" data-slide-to="3">-->
          <!--</li>-->
          <!--<li id="5th" v-show="value.product.product_image_url_5" data-slide-to="4">-->
          <!--</li>-->
          <!--<li id="6th" v-show="value.product.product_image_url_6" data-slide-to="5">-->
          <!--</li>-->
          <!--</ol>-->

          <!--&lt;!&ndash; Wrapper for slides &ndash;&gt;-->
          <!--<div class="carousel-inner" role="listbox">-->
          <!--<div class="item active">-->
          <!--<img :src="value.product.product_image_url_1">-->
          <!--</div>-->
          <!--<div :class="value.product.product_image_url_2 ? 'item' : 'disable' " v-if="value.product.product_image_url_2">-->
          <!--<img :src="value.product.product_image_url_2" alt="...">-->
          <!--</div>-->
          <!--<div :class="value.product.product_image_url_3 ? 'item' : 'disable' " v-if="value.product.product_image_url_3">-->
          <!--<img :src="value.product.product_image_url_3" alt="...">-->
          <!--</div>-->
          <!--<div :class="value.product.product_image_url_4 ? 'item' : 'disable' " v-if="value.product.product_image_url_4">-->
          <!--<img :src="value.product.product_image_url_4" alt="...">-->
          <!--</div>-->
          <!--<div :class="value.product.product_image_url_5 ? 'item' : 'disable' " v-if="value.product.product_image_url_5">-->
          <!--<img :src="value.product.product_image_url_5" alt="...">-->
          <!--</div>-->
          <!--<div :class="value.product.product_image_url_6 ? 'item' : 'disable' " v-if="value.product.product_image_url_6">-->
          <!--<img :src="value.product.product_image_url_6" alt="...">-->
          <!--</div>-->
          <!--</div>-->

          <!--&lt;!&ndash; Controls &ndash;&gt;-->
          <!--<a class="left carousel-control" href="#product-carousel" role="button" data-slide="prev">-->
          <!--<icon class="arrow-image" name="arrow-left"></icon>-->
          <!--<span class="sr-only">Previous</span>-->
          <!--</a>-->
          <!--<a class="right carousel-control" href="#product-carousel" role="button" data-slide="next">-->
          <!--<icon class="arrow-image" name="arrow-right"></icon>-->
          <!--<span class="sr-only">Next</span>-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->

          <div class="divider"></div>
        </div>

        <!-- Information -->
        <div class="information-container">
          <a><div class="vendor-logo-image" @click="routeAccountProfilePage"></div></a>
          <div class="category-contents">
            <span>{{value.product.primary_product_category}}</span>
            <span> > </span>
            <span>{{value.product.secondary_product_category}}</span>
          </div>
          <p id="vendor-text">Made by: <a @click="routeAccountProfilePage">{{ value.vendor.account_name_english }}</a></p>
          <!--<div class="list-container">-->
          <!--<div class="left-contents">최소 주문량: {{value.product.minimum_order_quantity}}</div>-->
          <!--<div class="right-contents">제품 가격: 미정</div>-->
          <!--</div>-->
          <!--<div class="list-container">-->
          <!--<div class="left-contents">소재 및 재질: {{ value.product.material_type }}</div>-->
          <!--<div class="right-contents">규격: {{ value.product.item_dimensions }}</div>-->
          <!--</div>-->

          <p class="left-contents" v-show="value.product.minimum_order_quantity">MOQ: {{value.product.minimum_order_quantity}}</p>
          <p class="right-contents" v-show="value.product.price">Price: {{ value.product.price }}</p>
          <p class="left-contents" v-show="value.product.material_type">Materials: {{ value.product.material_type }}</p>
          <p class="right-contents" v-show="value.product.item_dimensions">Dimensions: {{ value.product.item_dimensions }}</p>

        </div>
        <div class="divider"></div>

        <!-- Reviews -->
        <div class="reviews-container">
          <h3>Reviews <small>(0)</small></h3>
          <br>
          <h4>No review.</h4>
        </div>
        <div class="divider"></div>
      </div>

      <div class="product-introduction-container">
        <h3>Product Introduction</h3>
        <br>
        <div class="product-introduction-inner-container" v-html="value.product.product_description"></div>
      </div>
      <div class="divider"></div>

      <div class="catalog-container" id="catalog-container">
        <h3>Catalog</h3>
        <!--<h3><a href="/static/web/viewer.html?file=http://localhost:8080/static/test.pdf" target="_blank">Catalog</a></h3>-->
        <!--<iframe id="catalog" src="/static/web/viewer.html?file=/static/test.pdf" allowfullscreen webkitallowfullscreen scrolling="no"  name="pdf" width="724" height="300" style="border: none;">-->
        <!--This browser does not support PDFs. Please download the PDF to view it: <a target="pdf" :href="value.product.product_image_url_2">Download PDF</a>-->
        <!--</iframe>-->
      </div>
      <div class="divider"></div>

      <div class="related-products-container">
        <h3 class="title">Related products</h3>
        <br>
        <div class="row">
          <div class="product-container" v-for="(product, index) in value.products" v-if="value.product.product_id !== product.product_id">
            <div v-if="index < 9" class="col-md-3 col-sm-6 col-xs-12">
              <div class="each-product">
                <img class="related-image" @click="routeProductProfilePage(index)" :src="product.product_image_url_1">
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

    <copyright-bar></copyright-bar>

  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import pdflib from 'pdfjs-dist'
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
        input: this.$route.query.input ? this.$route.query.input : '',
        value: {
          account: {},
          contact: {},
          products: [],
          product: {},
          vendor: {}
        },
        toggle: {
          isAuthLoaded: false
        },
        options: this || { scale: 1 }
      }
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(res => {
            this.toggle.isAuthLoaded = true
            this.value.contact = res[0].data
            this.value.account = res[1].data
          })
          .catch(() => {
            this.toggle.isAuthLoaded = true
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
        this.fetchReletedProducts(this.value.product.account_id)
        this.applyJquery()
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
      fetchReletedProducts (id) {
        this.$http.get(`/api/data/product/account_id/${id}`)
          .then(res => {
            this.value.products = res.data
            this.relatedProductImageResize()
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
      onSendInquiry () {
        const pid = this.value.product.product_id
        const aid = this.value.vendor.account_id
        this.$router.push({
          path: '/contact/premium',
          query: {
            input: this.input,
            pid: pid,
            aid: aid
          }
        })
      },
      applyJquery () {
        $(document).ready(() => {
          this.changePageTitle()
          this.applyCompanyLogoImage()
          this.imageResize()
          this.activateSlick()
          this.renderPDF()
          $(window).resize(() => {
            this.imageResize()
          })
        })
      },
      renderPDF () {
        const url = this.value.product.product_pdf_url
        pdflib.PDFJS.getDocument(url).then((pdf) => {
          for (let i = 1; i <= pdf.numPages; i += 1) {
            const canvas = document.createElement('canvas')
            canvas.id = 'catalog'
            document.getElementById('catalog-container').appendChild(canvas)
            pdf.getPage(i).then((page) => {
              this.renderPage(page, canvas)
            })
          }
        })
      },
      renderPage (page, canvas) {
        const viewport = page.getViewport(1.5)
        const canvasContext = canvas.getContext('2d')
        const renderContext = {
          canvasContext,
          viewport
        }
        canvas.height = viewport.height
        canvas.width = viewport.width
        canvas.style.width = '100%'
        canvas.style.marginBottom = '-5px'
        page.render(renderContext)
      },
      changePageTitle () {
        document.title = `${this.value.product.product_name} - ${this.value.vendor.account_name_english} | Factory Hunt`
      },
      routeAccountProfilePage () {
        location.href = `/${this.domain}`
      },
      routeProductProfilePage (index) {
        const productDomain = this.value.products[index].product_domain
        if (this.input) {
          location.href = `/${this.domain}/${productDomain}?input=${this.input}`
        } else {
          location.href = `/${this.domain}/${productDomain}`
        }
      },
      applyCompanyLogoImage () {
        const $logo = $('.vendor-logo-image')
        var image = this.value.vendor.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(/static/temp-logo-image_english_512.png)'
        }
        $logo.css('background-image', image)
      },
      activateSlick () {
        $(document).ready(() => {
          $('.product-image-container').slick({
            infinite: true,
            arrows: true,
            dots: true,
            draggable: true,
            nextArrow: '<div id="right-arrow-container"><i id="right-arrow" class="fa fa-arrow-right"></i></div>',
            prevArrow: '<div id="left-arrow-container"><i id="left-arrow" class="fa fa-arrow-left"></i></div>'
          })
          $('.item').css('outline', 'none')
          $('.slick-dots').css('bottom', '4px')
          $('.slick-dots li').css('margin', '0')

          $('#right-arrow-container').css({
            'position': 'absolute',
            'right': '0',
            'top': '0',
            'opacity': '0',
            'width': '15%',
            'height': '100%',
            'z-index': '1',
            'background': 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2))',
            'cursor': 'pointer'
          })
          $('#right-arrow').css({
            'position': 'absolute',
            'right': '30%',
            'top': '50%'
          })
          $('#left-arrow-container').css({
            'position': 'absolute',
            'left': '0',
            'top': '0',
            'opacity': '0',
            'width': '15%',
            'height': '100%',
            'z-index': '1',
            'background': 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.2))',
            'cursor': 'pointer'
          })
          $('#left-arrow').css({
            'position': 'absolute',
            'left': '30%',
            'top': '50%'
          })

          $('.product-image-container').hover(function () {
            $('#right-arrow-container, #left-arrow-container').css({
              'opacity': '0.7'
            })
          }, function () {
            $('#right-arrow-container, #left-arrow-container').css('opacity', '0')
          })
        })
      },
      imageResize () {
        $(document).ready(() => {
          const $image = $('.product-image-container img')
          $image.css('height', $image.width() + 'px')
        })
      },
      relatedProductImageResize () {
        $(document).ready(() => {
          const $image = $('.related-image')
          $image.css('height', $image.width() + 'px')
        })
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
    word-break: break-all;
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

  .information-container {
    position: relative;

    .category-contents {
      color: @color-font-gray;
      font-size: 17px;
      font-weight: 300;
      padding-right: 80px;
    }

    #vendor-text {
      font-size: 19px;
      margin-bottom: 28px;
    }

    .vendor-logo-image {
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      border: 1px solid @color-lightest-grey;
      border-radius: 50%;
      background-repeat: no-repeat !important;
      background-size: cover !important;
      background-position: 50% 50% !important;
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

  .right-container {

    .product-image-container {
      box-shadow: 1px 1px 10px 1px #e4e4e4;
      margin-bottom: 20px;
      width: 100%;
    }

    h4 {
      text-align: center;
      font-weight:400;
      color: grey;
      font-size: 14px;
      margin-bottom: 15px;
    }
    button {
      height:45px;
      width: 100%;
      font-size:17px;
      font-weight:500;
    }
  }

  .review-container {
  }

  .product-introduction-container {
    position: relative;
    font-size:19px;
    font-weight:300;

    .product-introduction-inner-container {
      text-align: inherit;
      word-break: break-all;
    }
    img {
      width:100% !important;
    }
  }

  .catalog-container {
    position: relative;
    overflow: hidden;

    h3 {
      margin-bottom: 30px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
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
