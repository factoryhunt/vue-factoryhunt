<template>
  <div class="page-container">

    <div class="form-container">
      <input @keyup.enter="onSearch" v-model="input" :value="input" type="text" :placeholder="placeholder">
    </div>

    <div class="result-container">
      {{datas}}

      <lead-registration v-show="this.$route.params.status === 'lead-registration'"></lead-registration>
      <account-registration v-show="this.$route.params.status === 'account-registration'"></account-registration>
      <product-registration v-show="this.$route.params.status === 'product-registration'"></product-registration>
    </div>

  </div>
</template>

<script>
  import LeadRegistration from './LeadRegistration'
  import AccountRegistration from './AccountRegistration'
  import ProductRegistration from './ProductRegistration'
  export default {
    components: {
      LeadRegistration,
      AccountRegistration,
      ProductRegistration
    },
    data () {
      return {
        placeholder: 'Serach..',
        input: '',
        status: 'lead',
        datas: []
      }
    },
    methods: {
      onSearch: function () {
        this.$http.get(`/api/${this.status}`)
          .then(res => {
            console.log(res.data)
          })
      }
    },
    created () {
    },
    watch: {
      '$route.params.status' (n, o) {
        window.scrollTo(0, 0)
        this.input = ''
      }
    }
  }
</script>

<style scoped>
  .page-container {
    position: relative;
    display: block;
    margin: 20px auto;
    max-width: 900px;
  }

  .form-container {
    width: 100%;
    height:auto;
    border: 1px solid grey;
    border-radius: 4px;
    box-shadow: 1px 1px 10px 1px #f2f2f2;
  }
  .form-container input {
    width: 100%;
    height: 100%;
    font-size: 24px;
    padding: 12px !important;
    border: none;
  }

  .result-container {
    margin-top: 20px;
  }
</style>
