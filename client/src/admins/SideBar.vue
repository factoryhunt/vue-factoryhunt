<template>
  <div class="menu-container">
    <ul class="list-container">
      <li @click="selectMenu('lead')">Leads</li>
      <li @click="selectMenu('account')">Accounts</li>
      <li>Opportunity</li>
      <li>Contacts</li>
      <li @click="selectMenu('product')">Products</li>
      <li @click="selectMenu('lead-registration')">Lead Upload</li>
      <li @click="selectMenu('account-registration')">Account Upload</li>
      <li @click="selectMenu('product-registration')">Product Upload</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      selectMenu: function (menu) {
        this.$router.push({
          path: `/admin/${menu}`,
          params: {
            status: menu
          }
        })
      }
    }
  }
</script>

<style scoped>
  .menu-container {
    float: left;
    background-color: #4f4f4f;
    color: #FFF;
    max-width: 215px;
    padding: 0 !important;
    margin: 0 !important;
  }

  .list-container {
    list-style: none;
    line-height: 60px;
    padding: 0 !important;
    margin: 0 !important;
    text-align: left;
  }

  .list-container li {
    padding-left: 12px !important;
    font-size:20px;
  }
  .list-container li:hover {
    background-color: #333333;
    cursor: pointer;
  }

</style>
