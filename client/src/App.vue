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
  @import "./assets/css/index";

  ::-webkit-input-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  }
  ::-moz-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  } /* ie */
  input:-moz-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  }

  #app {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: @color-font-base;
    background-color: @color-white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: none;
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
    .input-basic;
  }
  textarea {
    .textarea-basic;
  }
  select {
    .select-basic;
  }

  #ui-datepicker-div {
    background-color: @color-white !important;
    border: 1px solid @color-light-grey !important;
    width: 300px;
  }

  .button-orange {
    border:none;
    .button-custom(@color-orange, @color-white)
  }
  .button-white {
    border:1px solid @color-orange;
    .button-custom(@color-white, @color-orange)
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

  // Google maps API Hard Control
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
