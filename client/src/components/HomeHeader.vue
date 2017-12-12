<template>
  <header>

    <div class="header-container">
      <h1 class="title">{{ title }}</h1>
      <p class="sub-title">Discover reliable suppliers and import high quality products.</p>
    </div>

  </header>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Factory Hunt'
      }
    }
  }
</script>

<style scoped>
  .header-container {
    margin-top: 45px;
  }
  .title {
    font-size: 34px;
    color: #f2583d;
    font-weight: 500;
    padding-top: 20px;
  }
  .sub-title {
    font-size:24px;
    font-weight: 300;
    margin-bottom: 30px;
    width: 90%;
  }

  @media ( min-width: 744px ) {
    .header-container {
      margin-top: 90px;
    }
    .title {
      font-size: 40px;
    }
    .sub-title {
      font-size:29px;
      width: 55%;
      margin-bottom: 60px;
    }
  }
  @media ( min-width: 1128px ) {
    .header-container {
      margin-top: 50px;
    }
    .title {
      font-size: 50px;
    }
    .sub-title {
      font-size:40px;
      width: 55%;
    }
  }
</style>
