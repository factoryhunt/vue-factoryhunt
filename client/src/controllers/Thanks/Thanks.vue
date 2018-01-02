<template>
  <div class="page-container">
    <nav-bar></nav-bar>

    <div class="body-container">
      <div class="body-contents">
        <h3 v-lang.title></h3>
        <button @click="onGoBackButton" class="btn btn-default" v-lang.button></button>
      </div>
    </div>

    <footer-bar></footer-bar>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import FooterBar from '../../components/FooterBar'
  import CopyrightBar from '../../components/CopyrightBar'

  export default {
    components: {
      NavBar,
      FooterBar,
      CopyrightBar
    },
    metaInfo: {
      title: 'Thank You for Sign Up | Factory Hunt'
    },
    messages: {
      eng: {
        title: 'Thank you for sign up!',
        button: 'Login'
      },
      kor: {
        title: '가입해주셔서 정말 감사합니다!',
        button: '로그인'
      }
    },
    methods: {
      onGoBackButton () {
        this.$router.push({
          path: '/login'
        })
      },
      getLanguage () {
        const lang = this.$route.query.lang
        if (lang) {
          this.language = lang
        }
      }
    },
    created () {
      this.getLanguage()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/index';
  button {
    margin: 30px 0;
    font-size: 16px;
  }
</style>
