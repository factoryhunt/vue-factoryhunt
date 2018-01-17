<template>
  <section>
    <!-- Header -->
    <home-header></home-header>

    <!-- Search bar -->
    <div class="form-container">
      <form @submit.prevent="onSearchInput">
        <input v-model="input" type="text" pattern="[A-Za-z0-9 ]{2,50}" :title="getTitle" class="form-control" id="searchInput" :placeholder="getInput">
        <button type="submit" class="btn btn-default" v-lang.search></button>
      </form>
    </div>

    <!-- Featured -->
    <div class="featured-container">
      <h2 class="title" v-lang.featured></h2>
      <spinkit id="featured-loader"></spinkit>
      <div class="featured-card-container" v-for="(feature, i) in value.features">
        <featured-card :account="feature" :line="i === (value.features.length - 1) ? 'off' : 'on'"></featured-card>
      </div>
    </div>

  </section>
</template>

<script>
  import HomeHeader from '../../components/HomeHeader'
  import FeaturedCard from '../../components/FeaturedCard'
  import Spinkit from '../../components/Spinkit/Spinkit.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      HomeHeader,
      FeaturedCard,
      Spinkit
    },
    data () {
      return {
        value: {
          account: {},
          contact: {},
          features: []
        },
        input: '',
        sub_categories: null,
        inputActive: false,
        placeholder: 'Try "Toy"'
      }
    },
    messages: {
      eng: {
        featured: 'Featured Suppliers',
        input: 'Try "Toy"',
        search: 'Search',
        searchCaution: 'English only and at least 2 characters, please'
      },
      kor: {
        featured: '추천 제조업체',
        input: '"Toy"를 검색해보세요.',
        search: '검색',
        searchCaution: '영어로만 입력해주세요. (2자 이상)'
      }
    },
    computed: {
      ...mapGetters([
        'getContactId',
        'getAccountId',
        'isLoggedIn'
      ]),
      getInput () {
        return this.translate('input')
      },
      getTitle () {
        return this.translate('searchCaution')
      }
    },
    methods: {
      onSearchInput () {
        if (this.input) {
          location.href = `/search?input=${this.input}`
        }
      },
      onSearchGuide (keyword) {
        this.$router.push({
          path: '/search',
          query: {
            input: keyword
          }
        })
      },
      filterKeyword (keyword) {
        if (keyword.indexOf(this.input) !== -1) {
          return keyword
        }
      },
      getCategory () {
        this.$http.get(`/api/data/category/sub`)
          .then(res => {
            this.sub_categories = res.data
          })
      },
      isInputFocus () {
        $(document).ready(function () {
          if ($('#searchInput').is(':focus')) {
            console.log('focus')
            this.inputActive = true
          } else {
            console.log('not focus')
            this.inputActive = false
          }
        })
      },
      getFeaturedSuppliers () {
        this.featuredLoaderStart()
        this.$http.get('api/data/account/featured')
          .then(res => {
            this.featuredLoaderStop()
            this.value.features = res.data
          })
          .catch(() => {
            this.featuredLoaderStop()
          })
      },
      featuredLoaderStart () {
        $(document).ready(() => {
          const $loader = $('#featured-loader')
          $loader.removeClass().addClass('spinkit-contents')
        })
      },
      featuredLoaderStop () {
        $(document).ready(() => {
          const $loader = $('#featured-loader')
          $loader.removeClass().addClass('invisible')
        })
      }
    },
    created () {
      this.getFeaturedSuppliers()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/index';

  /*Form container*/
  .form-container {
    position: relative;
    padding: 10px;
    border: 1px lightgray solid;
    border-radius: 4px;
    margin-bottom: 120px;
    box-shadow: 1px 1px 10px 1px #e4e4e4;
    height: 50px;

    input {
      position: absolute;
      margin-right: 300px;
      height: 30px;
      font-size: 17px;
      font-weight: 400;
      width: 220px;
      .input-none-border;
    }

    button {
      display: none;
    }

    .form-guide-container {
      background-color: #FFF;
      position: absolute;
      z-index: 9998;
      font-size:16px;
      top: 100%;
      left: 0;
      border-left: 1px solid lightgrey;
      border-right: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      box-shadow: 1px 1px 10px lightgrey;
      width: 100%;

      .category-result-container {
        padding: 10px 6px;
        &:hover {
          background-color: #eeeeee;
          cursor: pointer;
        }
      }
    }
  }

  .featured-container {
    #featured-loader {
      padding: 80px 0;
    }
    .title {
      font-size:26px;
      font-weight: 700;
      margin-bottom: 0;
    }
  }

  @media ( min-width: 744px ) {
    .form-container {
      margin-bottom: 165px;

      input {
        .input-none-border;
        width: 95%;
      }
    }

    .featured-container {
      .title {
        font-size:29px;
        font-weight: 700;
        margin-bottom: 0;
      }
    }
  }
  @media ( min-width: 1128px ) {
    .form-container {
      position: relative;
      padding: 10px;
      border: 1px lightgray solid;
      border-radius: 4px;
      margin-bottom: 140px;
      box-shadow: 1px 1px 10px 1px #e4e4e4;
      height: 80px;
    }
    .form-container input {
      .input-none-border;
      position: absolute;
      margin-right: 300px;
      height: 60px;
      font-size: 20px;
      font-weight: 400;
      width: 900px;
    }
    .form-container button {
      position: absolute;
      font-weight: 500;
      right: 12px;
      font-size: 16px;
      height: 60px;
      width: 100px;
      background-color: #f2583d;
      color: #FFF;
      border: none;
      display: inherit;
    }
  }
</style>
