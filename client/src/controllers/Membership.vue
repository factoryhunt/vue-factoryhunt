<template>
  <div class="page-container">

    <nav-bar></nav-bar>

    <div class="contents">
      <div class="row">
        <h2>{{msg.title}}</h2>
        <hr>
        <div class="col-md-6">
          <div class="free-container">
            <p class="title">Free</p>

            <div class="price-container">
              <i class="fa fa-usd" aria-hidden="true"> <strong> 0</strong></i>
            </div>

            <ul>
              <li>Updating company information</li>
              <li>Appearing in buyer search results</li>
            </ul>
          </div>

        </div>
        <div class="col-md-6">
          <div class="premium-container">
            <p class="title">Premium</p>

            <div class="price-container">
              <i class="fa fa-usd" aria-hidden="true">
                <strong> 100 / month</strong>
              </i>
            </div>

            <ul>
              <li>Company minisite with verification mark</li>
              <li>Top-tier priority listing in buyer search results</li>
              <li>Unlimited products display</li>
              <li>Product showcase</li>
              <li>Real-time customer care</li>
            </ul>

          </div>
        </div>
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
      title: 'Membership | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        msg: {
          title: 'Supplier Membership'
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
