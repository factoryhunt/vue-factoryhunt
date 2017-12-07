<template>
  <div class="leads-container">

    <div class="row">
      <div class="search-container">
        <div class="col-md-2">
          <h4>Leads <small>({{leads.length}})</small></h4>
        </div>
        <div class="col-md-9">
          <input @keyup.enter="requestData(input)" v-model="input" type="text" class="search-bar form-control" placeholder="working only for company">
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="list-unstyled" v-for="(lead, index) in leads">
        <li>id: {{ lead.lead_id }}</li>
        <li>company: {{ lead.company }}</li>
        <li>contact_title: {{ lead.contact_title }}</li>
        <li>created_date: {{ lead.created_date }}</li>
        <li>customer_priority: {{ lead.customer_priority }}</li>
        <li>email: {{ lead.email }}</li>
        <li>established_date: {{ lead.established_date }}</li>
        <li>fax: {{ lead.fax }}</li>
        <li>first_name: {{ lead.first_name }}</li>
        <li>languages: {{ lead.languages }}</li>
        <li>last_name: {{ lead.last_name }}</li>
        <li>lead_source: {{ lead.lead_source }}</li>
        <li>lead_status: {{ lead.lead_status }}</li>
        <li>lead_type: {{ lead.lead_type }}</li>
        <li>mailing_city: {{ lead.mailing_city }}</li>
        <li>mailing_city_english: {{ lead.mailing_city_english }}</li>
        <li>mailing_country: {{ lead.mailing_country }}</li>
        <li>mailing_country_english</li>
        <li>mailing_postal_code: {{ lead.mailing_postal_code }}</li>
        <li>mailing_postal_code_english: {{ lead.mailing_postal_code_english }}</li>
        <li>mailing_state: {{ lead.mailing_state }}</li>
        <li>mailing_state_english: {{ lead.mailing_state_english }}</li>
        <li>mailing_street_address: {{ lead.mailing_state_street_address }}</li>
        <li>mailing_street_address_2: {{ lead.mailing_state_street_address_2 }}</li>
        <li>mailling_street_address_2_english: {{ lead.mailling_ }}</li>
        <li>mailing_street_address_english: {{ lead.mailing_street_address_english }}</li>
        <li>mobile: {{ lead.mobile }}</li>
        <li>notes: {{ lead.notes }}</li>
        <li>number_of_employees: {{ lead.number_of_employees }}</li>
        <li>phone: {{ lead.phone }}</li>
        <li>phone_ext: {{ lead.phone_ext }}</li>
        <li>product_types: {{ lead.product_types }}</li>
        <li>product_types_english: {{ lead.product_types_english }}</li>
        <li>products: {{ lead.products }}</li>
        <li>products_english: {{ lead.products_english }}</li>
        <li>salutation: {{ lead.salutation }}</li>
        <li>wetsite: {{ lead.wetsite }}</li>
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
        leads: [],
        input: ''
      }
    },
    methods: {
      requestData: function (input) {
        this.$http.get(`/api/leads/company/${this.input}`)
          .then((response) => {
            this.leads = response.data
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
