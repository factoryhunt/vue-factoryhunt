<template>
  <div class="component-container">
    <img class="button" src="../../../assets/button.png">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../../../assets/less/global";

  .component-container {

    .button {
      position: fixed;
      width: 50px;
      height: 50px;
      bottom: 30px;
      right: 30px;
      cursor: pointer;
    }
  }
</style>
