<template>
  <div class="page-container">
    <nav-bar></nav-bar>

    <div class="detail-contents">
      <h2>{{msg.title}}</h2>
      <hr>

      <input type="text" :placeholder="placeholder.input" v-model="supplierNumber" :value="supplierNumber">
      <button @click="callYear" class="btn btn-lg">
        Call API
      </button>

      <div v-for="result in apiResult" class="result-container">
        <h3>{{result.supplierSidoName}} <small>{{result.year}}</small></h3>
        <h4>{{result.foreignamount}} {{result.amount}}</h4>
      </div>

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
    data () {
      return {
        msg: {
          title: 'Factory Hunt API'
        },
        placeholder: {
          input: 'Enter inc. number'
        },
        apiResult: [],
        supplierNumber: ''
      }
    },
    methods: {
      callYear () {
        console.log('call year called')
        const data = {
          supplierNumber: this.supplierNumber
        }
        this.$http.post('/api/open/amount', data)
          .then(res => {
            console.log(res)
            this.apiResult = res.data.response.body.items.item
          })
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style scoped>

</style>
