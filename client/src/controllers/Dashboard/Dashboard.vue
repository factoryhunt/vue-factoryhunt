<template>
  <div v-if="value.account.account_id" class="page-container">
    <nav-bar :isUserLoggedIn="isLoggedIn" :account="value.account" :contact="value.contact"></nav-bar>
    <div class="body-container">
      <div class="body-contents">
        <router-view :account="value.account" :contact="value.contact"></router-view>
      </div>
    </div>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import CopyrightBar from '../../components/CopyrightBar.vue'
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: 'Dashboard | Factory Hunt'
    },
    components: {
      NavBar,
      CopyrightBar
    },
    data () {
      return {
        value: {
          account: {},
          contact: {}
        }
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'getAccountId',
        'getContactId'
      ])
    },
    methods: {
      tryAutoLogin () {
        this.$store.dispatch('autoLogin')
          .then(res => {
            this.value.contact = res[0].data
            this.value.account = res[1].data
          })
          .catch(() => {
            alert('Your session has expired. Please log-in again.')
            this.$router.push('/login')
          })
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.tryAutoLogin()
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/index";

  .body-contents {
    margin-top: 20px;
  }

  .dashboard-page-container {
    position: relative;
    // Header
    .header-container {
      .title {
        font-size:30px;
        font-weight: 600;
      }
    }
  }

</style>
