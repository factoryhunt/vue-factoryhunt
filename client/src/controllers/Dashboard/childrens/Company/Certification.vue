<template>
  <div class="dashboard-page-container">
    <div class="body-container">
      <!--Company Certification -->
      <div class="certification-container input-container">
        <p class="sub-title">Please prove that the product you are dealing with is certified by agencies. It is not a required entry, but it can give buyers confidence about your company and products.</p>
        <p class="third-title">Business registration certificate, Factory registration certificate, Product registrations, and etc.</p>
        <label for="certification-input">Choose File</label>
        <input id="certification-input" multiple class="file" type="file" name="img_files[]">
        <!--@change="filesChange($event.target.name, $event.target.files)"-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Upload certification | Factory Hunt'
    },
    data () {
      return {
        msg: ''
      }
    },
    created () {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;
  // Global
  input {
    width: 100%;
    height: @height;
    font-size: 20px !important;
    font-weight: 400;
    margin-bottom: 5px !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  label {
    .upload-label-basic;
    border: 1px solid @color-font-base;
    margin-top: 10px;
    font-size: @font-size-button;
    font-weight: @font-weight-button;
  }
  textarea {
    font-size: 20px !important;
    font-weight: 400 !important;

    &:focus,
    &:active,
    &:visited {
      -webkit-transition: all 500ms;
      -moz-transition: all 500ms;
      -ms-transition: all 500ms;
      -o-transition: all 500ms;
      transition: all 500ms;
      border: 1px solid @color-orange;
    }
  }
  select {
    font-size: 20px !important;
    font-weight: 400 !important;
    margin-bottom: 5px !important;
    height: @height !important;
  }
  button {
    font-size: @font-size-button;
    font-weight: @font-weight-button;
    border: 1px solid @color-orange;
  }

  .big-mark {
    position: absolute;
    font-size: 28px;
    font-weight: 100;
    right: @mark-right-amount;
  }
  .small-mark {
    position: absolute;
    font-size: 22px;
    font-weight: 100;
    width: 30px;
    color: @color-font-base;
    right: @small-mark-right-amount
  }
  .required-circle {
    position: absolute;
    top: 8px;
    color: @color-orange;
    font-size: 1px;
  }

  .dashboard-page-container {

    .header-container {
    }

    .body-container {

      .input-container {
        margin-bottom: 40px;
      }
      .title {
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 18px;
      }
      .sub-title {
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 8px;
      }
      .third-title {
        font-size: 15px;
        font-weight:600;
        margin-bottom: 4px;
      }
      .caution-text {
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
</style>
