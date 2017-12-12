<template>
  <div class="component-container">
    <div class="contents">
      <div class="tab-container">
        <a id="item-dashboard" class="tab" href="/dashboard">관리자 센터</a>
        <a id="item-company" class="tab" href="/dashboard/company">회사</a>
        <a id="item-product" class="tab" href="/dashboard/product">제품</a>
        <a id="item-account" class="tab" href="/dashboard/account">내 계정</a>
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
  @import (reference) "../../../assets/less/global";

  // Global
  .component-container {
    background-color: @color-font-base;
    width: 100%;
    height: 40px;
  }
  .contents {
    margin-top: 0;
    margin-bottom: 0;
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
