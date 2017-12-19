<template>
  <section>
      <home-header></home-header>

      <div class="form-container">
        <input @keyup.enter="onSearchInput()" v-model="input" type="text" class="form-control" id="searchInput" :placeholder="placeholder">
        <button @click="onSearchInput()" type="submit" class="btn btn-default">Search</button>
      </div>

      <h2 class="featured-title">Featured Suppliers</h2>
      <featured-card line="on" id="7"></featured-card>
      <featured-card line="on" id="10"></featured-card>
      <featured-card line="on" id="5"></featured-card>
      <featured-card line="on" id="3"></featured-card>
      <featured-card line="on" id="4"></featured-card>
      <featured-card line="on" id="1"></featured-card>
      <featured-card line="on" id="11"></featured-card>
      <featured-card line="off" id="6"></featured-card>

  </section>
</template>

<script>
  import HomeHeader from '../../components/HomeHeader'
  import FeaturedCard from '../../components/FeaturedCard'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      HomeHeader,
      FeaturedCard
    },
    data () {
      return {
        value: {
          account: {},
          contact: {}
        },
        msg: {
          inputGuide: 'Loading..'
        },
        input: '',
        sub_categories: null,
        inputActive: false,
        placeholder: 'Try "Toy"'
      }
    },
    computed: {
      ...mapGetters([
        'getContactId',
        'getAccountId',
        'isLoggedIn'
      ])
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
      }
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

  .featured-title {
    font-size:26px;
    font-weight: 700;
    margin-bottom: 0;
  }

  @media ( min-width: 744px ) {
    .form-container {
      margin-bottom: 165px;
    }
    .form-container input {
      .input-none-border;
      width: 95%;
    }
    .featured-title {
      font-size:29px;
      font-weight: 700;
      margin-bottom: 0;
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
