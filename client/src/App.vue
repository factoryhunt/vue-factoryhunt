<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import (reference) "./assets/less/global";

  #app {
    font-family: 'Roboto', sans-serif;
    color: @color-font-base;
    background-color: @color-white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    font-weight:400;
    color: @color-link;
  }
  a:hover {
    cursor: pointer;
    color: @color-link;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  img {
    width:100%;
  }
  iframe {
    width:100%;
    height:180px;
  }
  input {
    .input-basic
  }

  textarea {
    .textarea-basic
  }

  .button-orange {
    border:none;
    .button-custom(@color-orange, @color-white)
  }
  .button-white {
    border:1px solid @color-orange;
    .button-custom(@color-white, @color-orange)
  }

  .contents {
    .contents-size(1040px, 60px auto, 0 12px);
  }
  .detail-contents {
    .contents-size(1040px, 30px auto, 0 12px);
  }
  .narrow-contents {
    .contents-size(800px, 60px auto, 0 12px);
  }

  .btn, .btn-lg {
    background-color: @color-orange;
    color: @color-white;
    border: none;
  }
  .btn:hover, .btn-lg:hover {
    background-color: @color-orange;
    color: @color-white;
  }
  .btn:focus, .btn-lg:focus {
    background-color: @color-orange;
    color: @color-white;
  }

  .divider {
    margin:18px 0 30px 0;
    width:100%;
    height: 1px;
    background-color: @color-deep-gray;
    display: block;
  }

  /*Google maps API Hard Control*/
  .gm-style-pbc {
    opacity: 0 !important;
  }

  @media ( min-width: 744px ) {
    iframe {
      width:100%;
      height:440px;
    }
    .contents {
      padding: 0 24px;
    }
    .detail-contents {
      position: relative;
      padding: 0 24px;
    }
    .main-contents {
      position: relative;
      padding: 0 24px;
    }
  }
  @media ( min-width: 1128px ) {
    iframe {
      width:100%;
      height:544px;
    }
    .contents {
      padding: 0;
    }
    .detail-contents {
      position: relative;
      padding: 0;
    }
    .main-contents {
      position: relative;
      padding: 0;
    }
  }
</style>
