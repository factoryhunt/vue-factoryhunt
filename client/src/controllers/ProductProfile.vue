<template>
  <div class="page-container">

    <nav-bar v-if="toggle.isAuthLoaded" :isUserLoggedIn="isLoggedIn" :account="value.account" :contact="value.contact"></nav-bar>

    <div class="body-container">
      <!-- Left side -->
      <div class="left-container">

        <!-- Header -->
        <div class="header-container">
          <h1 class="title">{{ value.product.product_name }}</h1>
          <div class="sub-title-container">
            <h4 class="sub-title" v-show="value.product.product_origin">{{ value.product.product_origin }} •</h4>
            <h4 class="sub-title"><i class="fa fa-star-o" aria-hidden="true" v-for="index in 5"></i> •</h4>
            <h4 class="review-title" v-lang.header.reviews="{count: 0}"></h4>
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

          <h4 class="quote-text" v-lang.image.quote></h4>
          <button @click="onSendInquiry" class="button-orange inquiry-button" v-lang.image.button></button>

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
          <a @click="routeAccountProfilePage">
            <img v-if="value.vendor.thumbnail_url" class="vendor-logo-image" :src="value.vendor.thumbnail_url"/>
            <img v-else class="vendor-logo-image" src="/static/temp-logo-image_english_512.png"/>
          </a>
          <div class="category-contents" v-show="value.product.primary_product_category">
            <span>{{value.product.primary_product_category}}</span>
            <span> > </span>
            <span>{{value.product.secondary_product_category}}</span>
          </div>
          <p id="vendor-text">by <a @click="routeAccountProfilePage">{{ value.vendor.account_name_english }}</a></p>
          <!--<div class="list-container">-->
          <!--<div class="left-contents">최소 주문량: {{value.product.minimum_order_quantity}}</div>-->
          <!--<div class="right-contents">제품 가격: 미정</div>-->
          <!--</div>-->
          <!--<div class="list-container">-->
          <!--<div class="left-contents">소재 및 재질: {{ value.product.material_type }}</div>-->
          <!--<div class="right-contents">규격: {{ value.product.item_dimensions }}</div>-->
          <!--</div>-->

          <div class="list-container" v-show="value.product.minimum_order_quantity">
            <div class="left-contents" v-lang.information.moq></div>
            <div class="right-contents">{{addComma(value.product.minimum_order_quantity)}}</div>
          </div>
          <div class="list-container" v-show="value.product.price">
            <div class="left-contents" v-lang.information.price></div>
            <div class="right-contents">{{value.product.price}}</div>
          </div>
          <div class="list-container" v-show="value.product.material_type">
            <div class="left-contents" v-lang.information.material></div>
            <div class="right-contents">{{value.product.material_type}}</div>
          </div>
          <div class="list-container" v-show="value.product.item_dimensions">
            <div class="left-contents" v-lang.information.dimension></div>
            <div class="right-contents">{{value.product.item_dimensions}}</div>
          </div>

        </div>
        <div class="divider"></div>

        <!-- Reviews -->
        <div class="reviews-container">
          <h3 v-lang.reviews.title="{count: 0}"></h3>
          <br>
          <h4 style="font-size:18px">No review</h4>
        </div>
        <div class="divider"></div>
      </div>

      <!-- Introduction -->
      <div class="product-introduction-container" v-show="value.product.product_description">
        <h3 v-lang.intro.title></h3>
        <br>
        <div class="product-introduction-inner-container" v-html="value.product.product_description"></div>
      </div>
      <div class="divider" v-show="value.product.product_description"></div>

      <!-- Catalog -->
      <div v-show="value.product.product_pdf_url" class="catalog-container" id="catalog-container">
        <h3 v-lang.catalog.title></h3>
        <img v-show="!toggle.isCatalogLoaded" src="/static/product_loading_image_text.png">
        <!--<h3><a href="/static/web/viewer.html?file=http://localhost:8080/static/test.pdf" target="_blank">Catalog</a></h3>-->
        <!--<iframe id="catalog" src="/static/web/viewer.html?file=/static/test.pdf" allowfullscreen webkitallowfullscreen scrolling="no"  name="pdf" width="724" height="300" style="border: none;">-->
        <!--This browser does not support PDFs. Please download the PDF to view it: <a target="pdf" :href="value.product.product_image_url_2">Download PDF</a>-->
        <!--</iframe>-->
      </div>
      <div class="divider" v-show="value.product.product_pdf_url"></div>
    </div>

    <!-- Related products -->
    <div class="related-products-container">
      <div class="related-products-wrapper">
        <h3 class="title" v-lang.related.title="{count: value.products.length > 0 ? value.products.length - 1 : 0}"></h3>
        <div class="product-wrapper">
          <div class="product-container" v-for="(product, index) in value.products" :key="index" v-if="value.product.product_id !== product.product_id">
            <div class="image-container">
              <img class="product-image" @click="routeProductProfilePage(index)" :src="product.product_image_url_1">
            </div>
            <div class="content-container">
              <!--<p class="primary-container">{{product.primary_product_category}}</p>-->
              <p class="product-name">{{product.product_name}}</p>
              <div class="star-container">
                <i class="fa fa-star-o" aria-hidden="true" v-for="index in 5" :key="index"></i>
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
  import Spinkit from '../components/Spinkit/Spinkit.vue'
  import pdflib from 'pdfjs-dist'
  import CopyrightBar from '../components/CopyrightBar'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      NavBar,
      CopyrightBar,
      Spinkit
    },
    messages: {
      eng: {
        header: {
          reviews: 'Reviews <small>({count})</small>'
        },
        image: {
          quote: 'Send inquiry to get pricing.',
          button: 'Send Inquiry'
        },
        information: {
          moq: 'MOQ',
          price: 'Price',
          material: 'Material',
          dimension: 'Dimension'
        },
        reviews: {
          title: 'Reviews <small>({count})</small>'
        },
        intro: {
          title: 'Product introduction'
        },
        catalog: {
          title: 'Catalog'
        },
        related: {
          title: 'Related products <small>({count})</small>'
        }
      },
      kor: {
        header: {
          reviews: '평가 (0)'
        },
        image: {
          quote: '가격 협상을 위해 문의하세요.',
          button: '문의하기'
        },
        information: {
          moq: '최소주문량',
          price: '가격',
          material: '소재 및 재질',
          dimension: '규격'
        },
        reviews: {
          title: '평가 <small>({count})</small>'
        },
        intro: {
          title: '제품 정보'
        },
        catalog: {
          title: '카탈로그'
        },
        related: {
          title: '연관 제품 <small>({count})</small>'
        }
      }
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
          isAuthLoaded: false,
          isCatalogLoaded: false
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
        try {
          const vendor = await this.fetchProduct()
          this.value.vendor = vendor.account
          this.value.product = vendor.product
          if (!this.value.product.product_image_url_1) {
            this.value.product.product_image_url_1 = '../../static/product_loading_image.png'
          }
          this.fetchReletedProducts(this.value.product.account_id)
          this.applyJquery()
        } catch (err) {
          this.$router.replace('/error')
        }
      },
      fetchProduct () {
        return new Promise((resolve, reject) => {
          this.$http.get(`/api/data/product/domain/${this.domain}/${this.productDomain}`)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject(err.response)
            })
        })
      },
      fetchReletedProducts (id) {
        this.$http.get(`/api/data/product/account_id/${id}/approved`)
          .then(res => {
            this.value.products = res.data
            this.relatedProductImageResize()
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
      addComma (str) {
        str = String(str)
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
      },
      applyJquery () {
        $(document).ready(() => {
          this.changePageTitle()
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
        canvas.style.marginBottom = '-2px'
        page.render(renderContext)
        this.toggle.isCatalogLoaded = true
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
      activateSlick () {
        $(document).ready(() => {
          $('.product-image-container').slick({
            infinite: true,
            arrows: true,
            dots: true,
            draggable: true,
            nextArrow: '<div id="right-arrow-container"><i id="right-arrow" class="fa fa-angle-right"></i></div>',
            prevArrow: '<div id="left-arrow-container"><i id="left-arrow" class="fa fa-angle-left"></i></div>'
          })
          $('.item').css('outline', 'none')
          $('.slick-dots').css('bottom', '4px')
          $('.slick-dots li').css('margin', '0')

          $('#right-arrow-container').css({
            'font-size': '3rem',
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
            'font-size': '3rem',
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
          const $image = $('.related-products-container .product-image')
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
  }
  textarea {
    resize: none;
  }

  .left-container {
    margin-top:22px;
    min-height: 377px;
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
  .header-container i {
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
      padding-right: 80px;
    }

    .vendor-logo-image {
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      border: 1px solid @color-lightest-grey;
      border-radius: 50%;
    }

    p {
      font-size: 19px;
      font-weight: 300;
      margin-bottom: 3px;
    }

    .list-container {
      position: relative;
      font-weight: 300;
      font-size:17px;
      line-height: 1.9em;

      .left-contents {
        position: absolute;
        word-break: break-all;
        max-width: 100px;
      }
      .right-contents {
        text-align: left;
        padding-left: 100px;
        word-break: break-all;
      }
    }
  }

  .reviews-container h4 {
    font-size:19px;
    font-weight:300;
  }

  .right-container {
    z-index: 2;

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

      p {
        margin: 0 !important;
      }
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

  .related-products-container {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0;

    .related-products-wrapper {
      padding-bottom: 20px;

      .title {
        margin-top: 0;
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
      }
      .product-wrapper {

        .product-container {
          padding-bottom: 40px;
          padding-left: 20px;
          padding-right: 20px;

          .image-container {
            img {
              cursor: pointer;
              width: 100%;
              box-shadow: 1px 1px 10px 1px #e4e4e4;
            }
          }

          .content-container {
            word-break: break-all;
            margin-top: 8px;

            .primary-category {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin: 4px 0 0 0;
              font-size: 16px;
              font-weight: 500;
            }
            .product-name {
              font-size: 16px;
              font-weight: 400;
            }
            .star-container {
              margin: 0;
              i {
                font-size: 14px;
                color: @color-link;
              }
            }
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .left-container{

    }
    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .related-products-container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 24px;

      .related-products-wrapper {
        padding-bottom: 1.6rem;

        .title {
          padding-left: 6px;
          padding-right: 6px;
        }
        .product-wrapper {
          position: relative;

          .product-container {
            display: inline-block;
            vertical-align: top;
            width: 50%;
            padding-left: 6px;
            padding-right: 6px;

            .image-container {
              img {
              }
            }

            .content-container {
              word-break: break-all;

              .primary-category {
              }
              .product-name {
              }
              .star-container {
                i {
                }
              }
            }
          }
        }
      }
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

    .related-products-container {
      max-width: 1060px;
      margin: 0 auto;
      padding: 0;

      .related-products-wrapper {
        padding-bottom: 1.6rem;

        .title {
          padding-left: 10px;
          padding-right: 10px;
        }
        .product-wrapper {
          position: relative;

          .product-container {
            display: inline-block;
            width: 25%;
            padding-left: 10px;
            padding-right: 10px;

            .image-container {
              img {
              }
            }

            .content-container {
              word-break: break-all;

              .primary-category {
              }
              .product-name {
              }
              .star-container {
                i {
                }
              }
            }
          }
        }
      }
    }
  }
</style>
