<template>
  <div class="component-container">
    <input :type="type" :placeholder="placeholder" v-model="typeValue">
    <i class="fa fa-industry" aria-hidden="true"></i>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: ''
    },
    props: ['type', 'placeholder'],
    data () {
      return {
        typeValue: this.type
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style land="less" scoped>
  @import (reference) "../../../assets/less/global";
</style>
