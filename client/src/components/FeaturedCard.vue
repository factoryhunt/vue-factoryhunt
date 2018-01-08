<template>
  <div class="component-container">

    <div class="featured-container">

      <div class="featured-contents">

        <div class="featured-image-contents">
          <img :src="account.account_image_url_1" @click="routeAccountProfilePage">
          <!--<img src="../assets/fh_logo_512.png" @click="routeAccountProfilePage">-->
        </div>

        <div class="description-contents">
          <p class="product">{{ account.products_english }}</p>
          <p class="title">{{ account.account_name_english }}</p>
          <p class="description">{{ account.company_short_description }}</p>
          <div class="button-container" v-if="account.account_id">
            <button @click="routeAccountProfilePage" class="btn btn-default" v-lang.viewMore></button>
          </div>
        </div>

      </div>

    </div>

    <p v-show="line === 'on'" class="divider"></p>
  </div>
</template>

<script>
  export default {
    props: [
      'line',
      'account'
    ],
    data () {
      return {
        keyword: this.keywordData
      }
    },
    messages: {
      eng: {
        viewMore: 'View More'
      },
      kor: {
        viewMore: '자세히 보기'
      }
    },
    methods: {
      routeAccountProfilePage () {
        const domain = this.account.domain
        location.href = `/${domain}`
      }
    }
  }
</script>

<style scoped>

  .featured-container {
    position: relative;
    margin: 30px 0;
  }
  .featured-container .title {
    margin-bottom:30px;
  }
  .featured-contents {
    /*border-top: 1px solid lightgrey;*/
    /*border-bottom: 1px solid lightgrey;*/
  }
  .featured-contents .featured-image-contents {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display:         flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .featured-contents .featured-image-contents img {
  }
  .featured-contents .featured-image-contents img:hover {
    cursor: pointer;
  }
  .featured-contents .description-contents {
    padding: 12px;
  }
  .featured-contents .product {
    display: block;
    width: 100%;
    font-size:14px;
    font-weight: 500;
    color: #317fa9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0;
    margin-top: 2px;
  }
  .featured-contents .title {
    font-size:28px;
    font-weight:600;
    margin-bottom: 12px;
    line-height:30px;
  }
  .featured-contents .description {
    line-height: 22px;
    font-size:18px;
    font-weight:300;
    color: #6e6e6e;
    margin-bottom: 20px;
  }

  .featured-contents .description-contents button {
    background-color: #FFF;
    color: #317fa9;
    border: 1px solid #317fa9;
    width: 100%;
  }

  @media ( min-width: 744px ) {
    .featured-contents .featured-image-contents {
      position: absolute;
      left: 0;
      width: 460px;
      height: 300px;
    }
    .featured-contents .description-contents {
      height: 300px;
      padding-left:512px;
    }
    .featured-contents .product {
      font-size: 16px;
      margin-bottom: -2px;
      margin-top: 20px;
    }
    .featured-contents .title {
      font-size: 30px;
      line-height:36px;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* 라인수 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .featured-contents .description {
      display: block;
      line-height: 28px;
      font-size: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* 라인수 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 25px;
    }
    .featured-contents .description-contents button {
      width: 110px;
    }

    .divider {
      margin-top: 0;
    }
  }

  @media ( min-width: 1128px ) {
    .featured-contents .featured-image-contents {
      width:540px;
      height: 280px;
    }
    .featured-contents .description-contents {
      height: 280px;
      padding-top: 20px;
      padding-left: 592px;
    }
    .featured-contents .product {
      font-size: 18px;
      margin-bottom: 0;
      margin-top: -2px;
    }
    .featured-contents .title {
      font-size: 32px;
      margin-bottom: 15px;
    }
    .featured-contents .description {
      font-size: 22px;
      margin-bottom: 23px;
    }
    .featured-contents .description-contents button {

    }
  }
</style>
