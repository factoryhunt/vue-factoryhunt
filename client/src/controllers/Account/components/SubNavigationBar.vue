<template>
  <div class="navbar-component-container">
    <div class="left-container">
      <ul>
        <li><a href="#header-container">Title</a></li>
        <li>•</li>
        <li><a href="#address-container">Address</a></li>
        <li>•</li>
        <li><a href="#review-container">Reviews</a></li>
        <li>•</li>
        <li><a href="#product-container">Products</a></li>
      </ul>
    </div>
    <div class="right-container">
      <a @click="onEditButton" class="edit-button">수정하기</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['company'],
    data () {
      return {
        msg: ''
      }
    },
    created () {
      this.applyCSS()
    },
    methods: {
      onEditButton () {
        this.$router.push({
          path: `/${this.company}/edit-kor`
        })
      },
      applyCSS () {
        $(document).ready(function () {
          $(window).scroll(() => {
            const height = $(window).scrollTop()
//            console.log(height)
//            $(window).resize(function () {
//              if ($(window).width() >= 1128) {
//                //
//              }
//            })
            if (height > 570) {
              $('.navbar-component-container').removeClass('navbar-component-container').addClass('navbar-component-container-fixed')
            } else {
              $('.navbar-component-container-fixed').removeClass('navbar-component-container-fixed').addClass('navbar-component-container')
            }
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../../assets/less/global";

  .navbar-component-container {
    position: relative;
    display: none;
  }

  @media ( min-width: 744px ) {

  }
  @media ( min-width: 1128px ) {

    ul {
      list-style: none;
      padding: 0 !important;

      li {
        display: inline;
        margin-right: 3px;

        a {
          font-size: 15px;
          font-weight: 500;
        }
      }
    }

    .left-container {
      position: relative;
    }
    .right-container {
      position: absolute;
      top: 0;
      right: 0;

      a {
        color: @color-orange;
        font-size: 15px;
        font-weight: 500;
      }
    }



    .navbar-component-container {
      display: inherit;
      position: relative;
      width: 100%;
      height: 51px;
      line-height: 51px;
      background-color: @color-white;
      z-index: 2;
      border-bottom: 1px solid @color-deep-gray;
    }

    .navbar-component-container-fixed {
      width: 100% !important;
      height: 51px;
      line-height: 51px;
      top: 0 !important;
      left: 0;
      position: fixed !important;
      background: @color-white !important;
      z-index: 3 !important;
      border-bottom: 1px solid @color-deep-gray;
    }
  }
</style>
