<template>
  <div class="dashboard-page-container">

    <!-- Modal -->
    <div class="modal-background" @click="modalToggle">
      <div class="modal-container">
        <div class="modal-contents" @click="modalToggle">
          <p class="title">Are you sure you want to delete?</p>
          <div class="button-container">
            <div class="left-button-container">
              <button class="button-white confirm-button" @click="deleteProduct">Delete</button>
            </div>
            <div class="right-button-container">
              <button class="button-orange cancel-button" @click="modalToggle">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="header-container">
      <button v-if="products.length > 0" class="button-orange product-upload-button" @click="onProductUploadButton">New Product</button>
      <p class="title">Product List</p>
    </div>

    <!-- Body -->
    <div class="product-container">

      <!-- products empty -->
      <div v-if="products.length < 1" class="product-empty-container">
        <div class="empty">
          <p class="title">There is no registered product yet.</p>
          <p class="sub-title">Please add your product information. Potential buyers will be able to find your product information.</p>
          <button @click="onProductUploadButton" class="product-upload-button button-orange">
            Upload Product
          </button>
        </div>
      </div>

      <!-- products exist -->
      <div v-else class="product-list-container">
        <div class="list-container">
          <div v-for="(product, index) in products" :id="'list-' + index" class="list">
            <div class="image-container">
              <img class="product-image" :src="product.product_image_url_1">
            </div>
            <div class="category-container">
              <p class="primary-text">{{product.primary_product_category}}</p>
              <p class="secondary-text">{{product.secondary_product_category}}</p>
            </div>
            <div class="product-name-container">
              <p class="name-text">{{product.product_name_english}}</p>
              <p class="code-text">{{product.product_code}}</p>
            </div>
            <div class="status-container">
              <p :class="product.product_status === 'pending' ? 'pending' : 'on-sale'">{{product.product_status === 'pending' ? 'Pending' : 'Approved'}}</p>
              <p class="price-text">{{product.price ? product.price : ''}}</p>
            </div>
            <div class="tool-container">
              <a class="product-edit-button" @click="onEditButton(index)">Edit</a>
              <span>|</span>
              <a class="product-remove-button" @click="showProductRemoveModal(index)">Delete</a>
              <a class="view-product-button" @click="routeProductPage(index)">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Product | Factory Hunt'
    },
    props: {
      products: {
        type: Array,
        default: () => {
          return []
        }
      },
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          productIndex: null
        }
      }
    },
    methods: {
      onProductUploadButton () {
        location.href = '/dashboard/product/upload'
      },
      onEditButton (index) {
        const productId = this.products[index].product_id
        location.href = `/dashboard/product/edit?id=${productId}`
      },
      modalToggle () {
        $('.modal-container, .modal-background').toggle()
      },
      showProductRemoveModal (index) {
        this.modalToggle()
        this.value.productIndex = index
      },
      deleteProduct () {
        this.modalToggle()
        const index = this.value.productIndex
        const productId = this.products[index].product_id
        console.log(index)
        this.$http.delete(`/api/data/product/${productId}`)
          .then(() => {
            location.reload()
          })
          .catch((err) => {
            alert(err.response.data.msg)
          })
      },
      applyAttributes () {
        $(document).ready(() => {
          this.removeLastBorderBottom()
        })
      },
      removeLastBorderBottom () {
        var length = this.products.length - 1
        $(`#list-${length}`).css('border-bottom', 'none')
      },
      routeProductPage (index) {
        const url = `/${this.account.domain}/${this.products[index].product_domain}`
        location.href = url
      },
      activateJquery () {
        $(document).ready(() => {
        })
      }
    },
    created () {
      this.applyAttributes()
    }
//    watch: {
//      'products' () {
//        console.log('value.products changed')
//      }
//    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";

  @list-height: 60px;

  //Global
  p {
    margin: 0;
  }

  .list-divider {
    height: 1px;
    background-color: @color-light-grey;
  }

  .dashboard-page-container {

    // Header
    .header-container {

      .product-upload-button {
        font-weight: 600;
        font-size: 16px;
        float: right;
      }
    }

    // Products
    .product-container {
      border: 1px solid @color-light-grey;
      border-radius: @border-radius;
      margin-top:12px;

      .product-empty-container {
        padding: 80px 12px;

        .empty {
          text-align: center;
          .title {
            font-weight: 500;
            font-size: 24px;
          }
          .sub-title {
            font-weight: 300;
            font-size: 18px;
            margin-bottom: 28px;
          }
          .product-upload-button {
            font-weight: 600;
            font-size: 19px;
          }
        }
      }

      .product-list-container {
        padding: 0 22px;

        .list-container {
          width: 100%;

          .list {
            display: table;
            table-layout: fixed;
            width: 100%;
            padding: 22px 0;
            border-bottom: 1px solid @color-light-grey;

            &:hover {

              .tool-container {
                visibility: visible;
              }
            }

            // 7%
            .image-container {
              width: 7%;
              display: table-cell;
              vertical-align: middle;

              img {
                width: 50px;
              }
            }

            // 13%
            .category-container {
              vertical-align: middle;
              display: table-cell;
              width: 13%;
              padding: 0 8px;

              .primary-text {
                font-size: 15px;
                font-weight: 500;
              }
              .secondary-text {
                font-size: 14px;
                font-weight: 300;
              }
            }

            // 60%
            .product-name-container {
              vertical-align: middle;
              text-align: left;
              display: table-cell;
              padding: 0 8px;
              width: 60%;

              .name-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size:17px;
                font-weight: 400;
              }
              .code-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 300;
              }
            }

            // 10%
            .status-container {
              width: 12%;
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding: 0 8px;

              p {
                font-weight: 600;
              }
              i {
                font-size: 0.1px;
                margin-right: 2px;
              }

              .pending {
                color: @color-yellow;
                i {
                  color: @color-yellow;
                }
              }
              .on-sale {
                color: @color-green;
                i {
                  color: @color-green;
                }
              }
            }

            // 10%
            .tool-container {
              width: 8%;
              vertical-align: middle;
              text-align: center;
              display: table-cell;
              visibility: hidden;
              /*text-align: center;*/

              a {
                font-size: 15px;
                font-weight: 300;
              }
              span {
                color: @color-link;
              }

              .view-product-button {
                display: block;
              }
              .product-edit-button {

              }
              .product-remove-button {

              }
            }
          }
        }

      }
    }
  }
</style>
