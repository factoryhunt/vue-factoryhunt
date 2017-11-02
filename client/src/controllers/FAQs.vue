<template>
  <div class="page-container">
    <nav-bar></nav-bar>

    <div class="contents">
      <div class="row">
        <h2>{{msg.title}}</h2>
        <hr>
        <h4>{{msg.temp}}</h4>
      </div>
    </div>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    metaInfo: {
      title: 'FAQs | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        msg: {
          title: 'FAQs',
          temp: 'Coming soon...'
        }
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style scoped>
  .free-container {
  }
  .free-container .title {
  }

  .price-container {
    margin: 20px 0;
    font-size:20px;
  }
  .price-container strong {
    font-family: 'Roboto', sans-serif;
  }

  .premium-container {
  }
  .premium-container .title {
    color: #f2583d
  }

  .title {
    font-size:25px;
    font-weight:500;
  }

  ul {
    list-style-type:none;
  }
  li {
    font-size:21px;
    font-weight:400;
    line-height: 1.7;
  }
</style>
