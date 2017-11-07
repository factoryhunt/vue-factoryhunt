<template>
  <div class="home-container">

    <nav-bar></nav-bar>

    <div class="contents">

      <home-header></home-header>

      <div class="form-container">
        <input @keyup.enter="onSearchInput()" :value="input" v-model="input" type="text" class="form-control" id="searchInput" :placeholder="placeholder">
        <button @click="onSearchInput()" type="submit" class="btn btn-default">Search</button>

        <!--<div v-show="input" class="form-guide-container" v-if="sub_categories">-->
          <!--<div v-for="(category, index) in sub_categories" v-if="index < 7">-->
            <!--<div @click="onSearchGuide(category.sub_category)" class="category-result-container" v-if="category">-->
              <!--{{filterKeyword(category.sub_category)}}-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="sub_categories">-->
            <!--No result.-->
          <!--</div>-->
        <!--</div>-->

      </div>

      <h2 class="featured-title">Featured Suppliers</h2>

      <featured-card line="on" keywordData="7"></featured-card>
      <featured-card line="on" keywordData="10"></featured-card>
      <featured-card line="on" keywordData="5"></featured-card>
      <featured-card line="on" keywordData="3"></featured-card>
      <featured-card line="on" keywordData="4"></featured-card>
      <featured-card line="on" keywordData="1"></featured-card>
      <featured-card line="on" keywordData="11"></featured-card>
      <featured-card line="off" keywordData="6"></featured-card>

    </div>

    <footer-bar></footer-bar>

  </div>
</template>

<script>
  import cookie from '../assets/js/cookie'
  import NavBar from '../components/NavBar.vue'
  import HomeHeader from '../components/HomeHeader'
  import FeaturedCard from '../components/FeaturedCard'
  import FooterBar from '../components/FooterBar'

  export default {
    components: {
      NavBar,
      HomeHeader,
      FeaturedCard,
      FooterBar
    },
    data () {
      return {
        msg: {
          inputGuide: 'Loading..'
        },
        input: '',
        sub_categories: null,
        inputActive: false,
        placeholder: 'Try "Toy"'
      }
    },
    methods: {
      onSearchInput: function () {
        if (this.input) {
          this.$router.push({
            path: '/search',
            query: {
              input: this.input
            }
          })
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
      fetchUserState () {
        const token = cookie.getCookie('nekot')
        if (token) {
          this.$store.dispatch('setToken', token)
          this.$http.get('/api/auth/check', {headers: {'x-access-token': token}})
            .then(res => {
              const id = res.data.info.id
              console.log(id)
              this.$http.get(`/api/data/account/id/${id}`)
                .then(response => {
                  const account = response.data
                  this.$store.dispatch('setUser', account)
                })
            })
        }
      }
    },
    created () {
      console.log('Home.vue created')
      this.fetchUserState()
//      this.getCategory()
    },
    mounted () {
      console.log('Home mounted')
    },
    updated () {
      console.log('Home updated')
//      this.inputActive = true
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/less/global";

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
      margin-bottom: 80px;
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
