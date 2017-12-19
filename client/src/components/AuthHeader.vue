<template>
  <div class="component-container">
    <a href="/"><p class="title text-center">Factory Hunt</p></a>
  </div>
</template>

<style lang="less" scoped>
  @import '../assets/css/index';
  .component-container {
    a {
      text-decoration: none;
    }

    .title {
      margin: 30px 0;
      font-weight: 500;
      font-size: 50px;
      color: @color-orange;
      cursor: pointer;
    }
  }
</style>
