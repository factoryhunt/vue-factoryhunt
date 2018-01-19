<template>
  <section id="alert" :class="$store.getters.getAlertState ? 'alert-container success' : 'alert-container fail'">
    <div v-if="$store.getters.getAlertState"  class="success">
      <h5 class="message" v-lang.success></h5>
    </div>
    <div v-else=""  class="fail">
      <h5 class="message" v-lang.fail></h5>
      <p class="reason"></p>
    </div>
    <i @click="onHideButton" id="hide-button" class="fa fa-times" aria-hidden="true"></i>
  </section>
</template>

<script>
  export default {
    messages: {
      eng: {
        success: '<i class="fa fa-check-circle-o" aria-hidden="true"></i> Your information has been updated successfully.',
        fail: '<i class="fa fa-ban" aria-hidden="true"> Failed to update your information.'
      },
      kor: {
        success: '<i class="fa fa-check-circle-o" aria-hidden="true"></i> 정보가 성공적으로 업데이트 되었습니다.',
        fail: '<i class="fa fa-ban" aria-hidden="true"> 정보를 업데이트 하지 못했습니다.'
      }
    },
    data () {
      return {
        value: {
          state: null
        }
      }
    },
    methods: {
      onHideButton () {
        $(document).ready(() => {
          $('#alert').hide()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/index";

  .alert-container {
    display: none;
    position: relative;
    height: 50px;
    text-align: center;

    &.success {
      background-color: @color-light-green;
    }
    &.fail {
      background-color: @color-light-red;
    }

    .message {
      line-height: 50px;
      font-size: 1.6rem;
      font-weight: 400;
    }

    #hide-button {
      font-size: 2rem;
      font-weight: 100;
      position: absolute;
      line-height: 50px;
      top: 0;
      right: 25px;
      cursor: pointer;
    }
  }
</style>
