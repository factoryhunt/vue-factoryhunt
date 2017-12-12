<template>
  <div class="dashboard-page-container">
    <div class="body-container">
      <!--Company Certification -->
      <div class="certification-container input-container">
        <p class="sub-title">귀사에서 취급하는 제품이 기관으로부터 당당히 인증을 받았다는 것을 증명해주세요. 입력해야할 필수 항목은 아니지만 바이어들에게 신뢰를 줄 수 있습니다.</p>
        <p class="third-title">사업자등록증, 공장등록증, 제품인증서..</p>
        <label for="certification-input">파일 선택</label>
        <input id="certification-input" multiple class="file" type="file" name="img_files[]">
        <!--@change="filesChange($event.target.name, $event.target.files)"-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '인증서 업로드 | Factory Hunt'
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
  @import (reference) "../../../../assets/less/global";

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
