<template>
  <div class="about-container">

    <h2>About Us</h2>
    <hr>
    <div class="containers">
      <p class="title-text">Introduce Factory Hunt</p>
      <div class="description-section">
        <p>Factory Hunt is a Supplier Search Engine & B2B Marketplace where businesses in South Korea can buy and sell products.</p>
        <p>Beyond just product discovery and verification, we help businesses in obtaining financing and insurance, managing their shipments and ensuring payments security.</p>
        <p>We facilitate the whole trading operation so that our buyers can find the most competitive products and obtain financing; and our suppliers can access new markets and trade in a secure environment.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'
  import CopyrightBar from '../components/CopyrightBar'
  export default {
    metaInfo: {
      title: 'About Us | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar,
      CopyrightBar
    },
    data () {
      return {
        msg: 'About Us',
        id: this.$route.params.id,
        query: this.$route.query.id,
        title: 'Factoryhunt',
        products: []
      }
    },
    methods: {
      getId: function () {
        return '<h1>{{ id }}</h1>'
      },
      requestProducts () {
        this.$http.get('api/products')
          .then(res => {
            this.products = res.data
          })
      },
      onButtonClick () {
        $('#myButton').modal()
      },
      funLoad () {
        const height = $(window).height()
        $('.containers').css({'height': height + 'px'})
      }
    },
    created () {
      window.scrollTo(0, 0)
//      window.onload = this.funLoad()
//      window.onresize = this.funLoad()
      this.requestProducts()
    },
    mounted () {
//      this.funLoad()
    },
    // watch는 key값의 변화를 항상 감시한다.
    watch: {
      $route: 'getId'
    }
  }
</script>

<style scoped>
  .title-text {
    font-size:32px;
    font-weight:400;
  }
  .description-section {
    font-size:22px;
    font-weight:300;
  }

</style>

