<template>
  <div class="leads-container">

    <div class="row">
      <div class="search-container">
        <div class="col-md-2">
          <h4>Accounts <small>({{accounts.length}})</small></h4>
        </div>
        <div class="col-md-9">
          <input @keyup.enter="requestData(input)" v-model="input" :value="input" type="text" class="search-bar form-control" placeholder="working only for company">
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="list-unstyled" v-for="(account, index) in accounts">
        <li>id: {{ account.account_id }}</li>
        <li>account_name_english: {{ account.account_name_english }}</li>
        <li>account_name: {{ account.account_name }}</li>
        <li>account_type: {{ account.account_type }}</li>
        <li>account_image_url_1: {{ account.account_image_url_1 }}</li>
        <li>account_image_url_2: {{ account.account_image_url_2 }}</li>
        <li>account_image_url_3: {{ account.account_image_url_3 }}</li>
        <li>account_image_url_4: {{ account.account_image_url_4 }}</li>
        <li>account_image_url_5: {{ account.account_image_url_5 }}</li>
        <li>billing_city: {{ account.billing_city }}</li>
        <li>billing_country: {{ account.billing_country }}</li>
        <li>billing_postal_code: {{ account.billing_postal_code }}</li>
        <li>billing_state: {{ account.billing_state }}</li>
        <li>billing_street_address: {{ account.billing_street_address }}</li>
        <li>billing_street_address_2: {{ account.billing_street_address_2 }}</li>
        <li>business_registration_number: {{ account.business_registration_number }}</li>
        <li>company_short_description: {{ account.company_short_description }}</li>
        <li>created_date: {{ account.created_date }}</li>
        <li>customer_priority: {{ account.customer_priority }}</li>
        <li>duns_number: {{ account.duns_number }}</li>
        <li>established_date: {{ account.established_date }}</li>
        <li>fax: {{ account.fax }}</li>
        <li>mailing_city: {{ account.mailing_city }}</li>
        <li>mailing_city_english: {{ account.mailing_city_english }}</li>
        <li>mailing_country: {{ account.mailing_country }}</li>
        <li>mailing_country_english: {{ account.mailing_country_english }}</li>
        <li>mailing_postal_code: {{ account.mailing_postal_code }}</li>
        <li>mailing_postal_code_english: {{ account.mailing_postal_code_english }}</li>
        <li>mailing_state: {{ account.mailing_state }}</li>
        <li>mailing_state_english: {{ account.mailing_state_english }}</li>
        <li>mailing_street_address: {{ account.mailing_street_address }}</li>
        <li>mailling_street_address_2: {{ account.mailling_street_address_2 }}</li>
        <li>mailling_street_address_english: {{ account.mailling_street_address_english }}</li>
        <li>mailing_street_address_2_english: {{ account.mailing_street_address_2_english }}</li>
        <li>membership_type: {{ account.membership_type }}</li>
        <li>membership_monthly_fee: {{ account.membership_monthly_fee }}</li>
        <li>notes: {{ account.notes }}</li>
        <li>number_of_employees: {{ account.number_of_employees }}</li>
        <li>parent_account_id: {{ account.parent_account_id }}</li>
        <li>phone: {{ account.phone }}</li>
        <li>product_types: {{ account.product_types }}</li>
        <li>product_types_english: {{ account.product_types_english }}</li>
        <li>products: {{ account.products }}</li>
        <li>products_english: {{ account.products_english }}</li>
        <li>thumbnail_url: {{ account.thumbnail_url }}</li>
        <li>website: {{ account.website }}</li>
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
        accounts: [],
        input: ''
      }
    },
    methods: {
      requestData: function (input) {
        this.$http.get(`/api/accounts/accountname/${this.input}`)
          .then((response) => {
            this.accounts = response.data
            console.log(this.accounts)
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
