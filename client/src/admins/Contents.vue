<template>
  <div class="admin-container">

    <navigation-bar></navigation-bar>

    <side-bar></side-bar>

    <container></container>
  </div>
</template>

<script>
  import NavigationBar from './NavigationBar'
  import SideBar from './SideBar'
  import Container from './Content'
  import Leads from './Leads'
  import Accounts from './Accounts'
  import Products from './Products'
  export default {
    components: {
      NavigationBar,
      SideBar,
      Container,
      Leads,
      Accounts,
      Products
    },
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      checkSessionAllowed () {
        this.$http.get('/api/auth/session')
          .then(res => {
            console.log(res)
            if (!res.data.passport.user) {
              this.$router.push({
                path: '/'
              })
            }
          })
      }
    },
    created () {
      this.checkSessionAllowed()
    }
  }
</script>

<style scoped>
</style>
