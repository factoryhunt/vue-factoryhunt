<template>
  <div class="component-container">
    <div class="body-container">
      <div class="tab-container">
        <a id="item-dashboard" class="tab" href="/dashboard">Dashboard</a>
        <a id="item-company" class="tab" href="/dashboard/company">Company</a>
        <a id="item-product" class="tab" href="/dashboard/product">Product</a>
        <a id="item-account" class="tab" href="/dashboard/account">My Account</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: ''
      }
    },
    methods: {
//      trackingDomain () {
//        $(document).ready(() => {
//          $('.tab').attr('aria-selected', false)
//          if (this.$route.path === '/dashboard') {
//            $('#item-dashboard').attr('aria-selected', true)
//          }
//          if (this.$route.path === '/dashboard/company') {
//            $('#item-company').attr('aria-selected', true)
//          }
//          if (this.$route.path === '/dashboard/product') {
//            $('#item-product').attr('aria-selected', true)
//          }
//          if (this.$route.path === '/dashboard/account') {
//            $('#item-account').attr('aria-selected', true)
//          }
//        })
//      }
    },
    created () {
//      this.trackingDomain()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/index";

  // Global
  .component-container {
    background-color: @color-font-base;
    width: 100%;
    height: 40px;
  }

  .tab-container {

    .tab {
      color: @color-menu-gray;
      line-height: 40px;
      margin-right: 20px;
      font-size: 15px;
      font-weight: 400;
      text-decoration: none;

      &:hover {
        color: @color-white;
        cursor: pointer;
      }
    }
    .tab[aria-selected="true"] {
      color: @color-white;
    }
  }
</style>
