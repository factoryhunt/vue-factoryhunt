<template>
  <div class="page-container">

    <p>{{title}}</p>

    <form  action="/api/aws/upload" enctype="multipart/form-data"  method="post">
      <input  type="file" name="img_files[]" accept="image/*">
      <button type="submit">Submit</button>
    </form>

    <input v-model="data.company" type="text" :placeholder="placeholder.company">
    <input v-model="data.company_english" type="text" :placeholder="placeholder.company_english">
    <input v-model="data.lead_type" type="text" :placeholder="placeholder.lead_type">
    <input v-model="data.salutation" type="text" :placeholder="placeholder.salutation">
    <input v-model="data.first_name" type="text" :placeholder="placeholder.first_name">
    <input v-model="data.last_name" type="text" :placeholder="placeholder.last_name">
    <input v-model="data.contact_title" type="text" :placeholder="placeholder.contact_title">
    <input v-model="data.languages" type="text" :placeholder="placeholder.languages">
    <input v-model="data.lead_source" type="text" :placeholder="placeholder.lead_source">
    <input v-model="data.customer_priority" type="text" :placeholder="placeholder.customer_priority">
    <input v-model="data.lead_status" type="text" :placeholder="placeholder.lead_status">
    <input v-model="data.established_date" type="text" :placeholder="placeholder.established_date">
    <input v-model="data.number_of_employees" type="text" :placeholder="placeholder.number_of_employees">
    <input v-model="data.product_types" type="text" :placeholder="placeholder.product_types">
    <input v-model="data.products" type="text" :placeholder="placeholder.products">
    <input v-model="data.product_types_english" type="text" :placeholder="placeholder.product_types_english">
    <input v-model="data.products_english" type="text" :placeholder="placeholder.products_english">
    <input v-model="data.phone" type="text" :placeholder="placeholder.phone">
    <input v-model="data.phone_ext" type="text" :placeholder="placeholder.phone_ext">
    <input v-model="data.mobile" type="text" :placeholder="placeholder.mobile">
    <input v-model="data.fax" type="text" :placeholder="placeholder.fax">
    <input v-model="data.website" type="text" :placeholder="placeholder.website">
    <input v-model="data.email" type="text" :placeholder="placeholder.email">
    <input v-model="data.password" type="password" :placeholder="placeholder.password">
    <input v-model="data.notes" type="text" :placeholder="placeholder.notes">
    <input v-model="data.mailing_street_address" type="text" :placeholder="placeholder.mailing_street_address">
    <input v-model="data.mailing_street_address_2" type="text" :placeholder="placeholder.mailing_street_address_2">
    <input v-model="data.mailing_city" type="text" :placeholder="placeholder.mailing_city">
    <input v-model="data.mailing_state" type="text" :placeholder="placeholder.mailing_state">
    <input v-model="data.mailing_postal_code" type="text" :placeholder="placeholder.mailing_postal_code">
    <input v-model="data.mailing_country" type="text" :placeholder="placeholder.mailing_country">
    <input v-model="data.mailing_street_address_english" type="text" :placeholder="placeholder.mailing_street_address_english">
    <input v-model="data.mailing_street_address_2_english" type="text" :placeholder="placeholder.mailing_street_address_2_english">
    <input v-model="data.mailing_city_english" type="text" :placeholder="placeholder.mailing_city_english">
    <input v-model="data.mailing_state_english" type="text" :placeholder="placeholder.mailing_state_english">
    <input v-model="data.mailing_postal_code_english" type="text" :placeholder="placeholder.mailing_postal_code_english">
    <input v-model="data.mailing_country_english" type="text" :placeholder="placeholder.mailing_country_english">
    <input v-model="data.created_date" type="text" :placeholder="placeholder.created_date">
    <input v-model="data.converted_date" type="text" :placeholder="placeholder.converted_date">
    <button @click="onCreate" class="btn-lg btn-default">Create</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Account Registration Page',
        placeholder: {
          company: 'Company',
          company_english: 'Company English',
          lead_type: 'Lead Type',
          salutation: 'Salutation',
          first_name: 'First Name',
          last_name: 'Last Name',
          contact_title: 'Contact title',
          languages: 'Languages',
          lead_source: 'Lead Source',
          customer_priority: 'Customer Priority',
          lead_status: 'Lead Status',
          established_date: 'Established Date',
          number_of_employees: 'Number of Employees',
          product_types: 'Product Types',
          products: 'Products',
          product_types_english: 'Product Types English',
          products_english: 'Products English',
          phone: 'Phone',
          phone_ext: 'Phone ext',
          mobile: 'Mobile',
          fax: 'Fax',
          website: 'Website',
          email: 'Email',
          password: 'Password',
          notes: 'Notes',
          mailing_street_address: 'mailing_street_address',
          mailing_street_address_2: 'mailing_street_address_2',
          mailing_city: 'mailing_city',
          mailing_state: 'mailing_state',
          mailing_postal_code: 'mailing_postal_code',
          mailing_country: 'mailing_country',
          mailing_street_address_english: 'mailing_street_address_english',
          mailing_street_address_2_english: 'mailing_street_address_2_english',
          mailing_city_english: 'mailing_city_english',
          mailing_state_english: 'mailing_state_english',
          mailing_postal_code_english: 'mailing_postal_code_english',
          mailing_country_english: 'mailing_country_english',
          created_date: 'created_date',
          converted_date: 'converted_date'
        },
        data: {
          company: '',
          company_english: '',
          lead_type: '',
          salutation: '',
          first_name: '',
          last_name: '',
          contact_title: '',
          languages: '',
          lead_source: '',
          customer_priority: '',
          lead_status: '',
          established_date: '',
          number_of_employees: '',
          product_types: '',
          products: '',
          product_types_english: '',
          products_english: '',
          phone: '',
          phone_ext: '',
          mobile: '',
          fax: '',
          website: '',
          email: '',
          password: '',
          notes: '',
          mailing_street_address: '',
          mailing_street_address_2: '',
          mailing_city: '',
          mailing_state: '',
          mailing_postal_code: '',
          mailing_country: '',
          mailing_street_address_english: '',
          mailing_street_address_2_english: '',
          mailing_city_english: '',
          mailing_state_english: '',
          mailing_postal_code_english: '',
          mailing_country_english: '',
          created_date: new Date(),
          converted_date: ''
        }
      }
    },
    methods: {
      onCreate: function () {
        const data = this.data
        this.$http.post(`/api/aws/upload`, data)
          .then(res => {
            console.log(res)
          })
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style scoped>
  .page-container {

  }

  .page-container p {
    font-size: 30px;
    font-weight:400;
  }

  .page-container input {
    width: 40%;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
    margin-top: 5px;
  }

  .page-container button {
    margin-top: 30px;
    width:100%;
    height: 80px;
  }
</style>
