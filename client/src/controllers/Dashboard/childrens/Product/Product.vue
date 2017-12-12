<template>
  <div class="dashboard-page-container">
    <spinkit id="loader"></spinkit>
    <router-view v-if="toggle.isProductFetched" :isProductFetched="toggle.isProductFetched" :products="value.products" :account="account"></router-view>
  </div>
</template>

<script>
  import Spinkit from '../../../../components/Spinkit/Spinkit.vue'
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: '제품 | Factory Hunt'
    },
    components: {
      Spinkit
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      },
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          products: []
        },
        toggle: {
          isProductFetched: false
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAccountId'
      ])
    },
    methods: {
      fetchProducts (id) {
        if (!id) return console.log('fetchProduct failed (/Dashboard/Product/Product.vue)')
        this.$http.get(`/api/data/product/account_id/${id}`)
          .then(res => {
            this.value.products = res.data
            this.toggle.isProductFetched = true
            this.deactivateLoader()
          })
          .catch(() => {
            this.toggle.isProductFetched = true
            this.deactivateLoader()
          })
      },
      highlightSubNavBarTab () {
        $('#item-product').attr('aria-selected', true)
      },
      activateLoader () {
        const $loader = $('#loader')
        $loader.removeClass().addClass('spinkit-default')
      },
      deactivateLoader () {
        const $loader = $('#loader')
        $loader.removeClass().addClass('invisible')
      },
      applyJquery () {
        $(document).ready(() => {
          this.highlightSubNavBarTab()
          this.activateLoader()
        })
      }
    },
    created () {
      this.fetchProducts(this.account.account_id)
      this.applyJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";
</style>
