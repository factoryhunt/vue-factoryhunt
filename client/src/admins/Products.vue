<template>
  <div class="products-container">

    <div class="row">
      <div class="search-container">
        <div class="col-md-2">
          <h4>Products <small>({{products.length}})</small></h4>
        </div>
        <div class="col-md-9">
          <input @keyup.enter="requestData(input)" v-model="input" type="text" class="search-bar form-control" placeholder="working only for company">
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="list-unstyled" v-for="(product, index) in products">
        <li>account_id: {{ product.account_id }}</li>
        <li>product_id: {{ product.product_id }}</li>
        <li>product_name: {{ product.product_name }}</li>
        <li>product_code: {{ product.product_code }}</li>
        <li>product_image_url_1: {{ product.product_image_url_1 }}</li>
        <li>product_image_url_2: {{ product.product_image_url_2 }}</li>
        <li>product_image_url_3: {{ product.product_image_url_3 }}</li>
        <li>product_image_url_4: {{ product.product_image_url_4 }}</li>
        <li>product_image_url_5: {{ product.product_image_url_5 }}</li>
        <li>product_image_url_6: {{ product.product_image_url_6 }}</li>
        <li>product_image_url_7: {{ product.product_image_url_7 }}</li>
        <li>product_image_url_8: {{ product.product_image_url_8 }}</li>
        <li>product_image_url_9: {{ product.product_image_url_9 }}</li>
        <li>product_image_url_10: {{ product.product_image_url_10 }}</li>
        <li>primary_product_category: {{ product.primary_product_category }}</li>
        <li>secondary_product_category: {{ product.secondary_product_category }}</li>
        <li>product_origin: {{ product.product_origin }}</li>
        <li>product_unit: {{ product.product_unit }}</li>
        <li>minimum_order_quantity: {{ product.minimum_order_quantity }}</li>
        <li>product_description: {{ product.product_description }}</li>
        <li>active: {{ product.active }}</li>
        <li>notes: {{ product.notes }}</li>
        <li>created_date: {{ product.created_date }}</li>
        <br>
        <hr>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        products: [],
        input: ''
      }
    },
    methods: {
      requestData: function (input) {
        this.$http.get(`/api/products/productname/${this.input}`)
          .then((response) => {
            this.products = response.data
            console.log(this.products)
          })
      }
    }
  }
</script>

<style scoped>
  .search-container {
    height: 50px;
    line-height:50px;
    text-align: center;
  }

  .search-bar {
    height: 45px;
    line-height: 45px;
    font-size:18px;
  }
</style>
