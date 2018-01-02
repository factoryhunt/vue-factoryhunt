<template>
  <div class="about-container">

    <h2 v-lang.title></h2>
    <hr>
    <div class="containers">
      <div class="description-section">
        <p>Factory Hunt is a supplier search engine & B2B platform where businesses can be connected each other.</p>
        <p>Any manufacturer/supplier can create a website and online product catalog for free. Once a website/catalog is created, the information will be displayed in search results.</p>
        <p>Our mission is to make a free website for every suppliers in the world and make it easy to connect businesses. As a platform, we will continue to develop services to help businesses and discover new opportunities. </p>
        <p>Best regards,</p>
        <p>Factory Hunt Team</p>
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
    messages: {
      eng: {
        title: 'About Factory Hunt',
        description: ''
      },
      kor: {
        title: '팩토리 헌트는',
        description: ''
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
  p {
    margin-bottom: 20px;
  }

</style>

