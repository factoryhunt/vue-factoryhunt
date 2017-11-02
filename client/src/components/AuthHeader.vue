<template>
  <div class="component-container">
    <p class="title text-center" @click="onTitle">{{title}}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Factory Hunt'
      }
    },
    methods: {
      onTitle: function () {
        this.$router.push({
          path: '/'
        })
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .component-container {
  }
  .component-container .title {
    margin: 30px 0;
    font-weight: 500;
    font-size: 50px;
    color: #f2583d;
    cursor: pointer;
  }
</style>
