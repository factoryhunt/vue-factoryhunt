<template>
  <header>
    <div class="header-container">
      <h1 class="title" v-lang.title></h1>
      <p class="sub-title" v-lang.subTitle></p>
    </div>
  </header>
</template>

<script>
  export default {
    messages: {
      eng: {
        title: 'Factory Hunt',
        subTitle: 'Discover reliable suppliers and import high quality products.'
      },
      kor: {
        title: '팩토리 헌트',
        subTitle: '믿을 수 있는 공장을 찾고 <br>좋은 제품을 수입하세요.'
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
