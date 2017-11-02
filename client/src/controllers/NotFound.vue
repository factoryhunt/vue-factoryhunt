<template>
  <div class="page-container">
    <nav-bar></nav-bar>

    <div class="contents">
      <h3>{{msg}}</h3>
      <button @click="onGoBackButton" class="btn btn-default">
        Go back to home
      </button>
    </div>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    components: {
      NavBar,
      FooterBar
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
