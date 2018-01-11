<template>
  <div class="page-container">
    <nav-bar></nav-bar>

    <div class="body-container">
      <div class="body-contents">
        <h3>{{msg}}</h3>
        <button @click="onGoBackButton" class="button-orange">
          Go back Home
        </button>
      </div>
    </div>

    <footer-bar></footer-bar>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'
  import CopyrightBar from '../components/CopyrightBar'

  export default {
    components: {
      NavBar,
      FooterBar,
      CopyrightBar
    },
    metaInfo: {
      title: 'Not found | Factory Hunt'
    },
    data () {
      return {
        msg: 'Sorry, not found.'
      }
    },
    methods: {
      onGoBackButton () {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style scoped>
  button {
    margin: 30px 0;
    font-size: 16px;
  }
</style>
