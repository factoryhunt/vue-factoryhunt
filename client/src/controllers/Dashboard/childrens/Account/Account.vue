<template>
  <div class="dashboard-page-container">
    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="menu-container">
            <a id="item-account-edit" class="menu" href="/dashboard/account" v-lang.editAccount></a>
            <a id="item-password-edit" class="menu" href="/dashboard/account/password" v-lang.changePassword></a>
            <!--<a id="item-language" class="menu" href="/dashboard/account/language" v-lang.language></a>-->
            <a id="item-management" class="menu" href="/dashboard/account/management" v-lang.management></a>
            <!--<button @click="routeCompanyPage" class="view-button button-white">See My Profile</button>-->
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <router-view :contact="contact"></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Account | Factory Hunt'
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      },
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    messages: {
      eng: {
        editAccount: 'Edit Account',
        changePassword: 'Change Password',
        management: 'Account Management',
        language: 'Language'
      },
      kor: {
        editAccount: '정보 수정',
        changePassword: '비밀번호 변경',
        management: '계정 관리',
        language: '언어'
      }
    },
    methods: {
      routeCompanyPage () {
        window.open(`/${this.account.domain}`)
      },
      trackingDomain () {
        $(document).ready(() => {
          $('#item-account').attr('aria-selected', true)

          if (this.$route.path === '/dashboard/account') {
            $('#item-account-edit').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/account/password') {
            $('#item-password-edit').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/account/management') {
            $('#item-management').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/account/language') {
            $('#item-language').attr('aria-selected', true)
          }
        })
      }
    },
    created () {
      this.trackingDomain()
    },
    watch: {
      '$route.path' () {
        this.trackingDomain()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";

  // Global
  .contents {
    margin-top: 0;
    margin-bottom: 0;
  }

  .dashboard-page-container {

    .left-container {
      .profile-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 240px;

        .profile-inner-container {
          position: relative;
          text-align: left;

          .menu {
            color: @color-font-base;
            text-decoration: none;
            display: block;
            font-weight: 300;
            font-size: 17px;
            margin-bottom: 15px;

            &:hover {
              font-weight: 700;
              cursor: pointer;
            }
            &[aria-selected="true"] {
              font-weight: 700;
              font-size:19px;
            }
          }
          button {
            color: @color-font-base;
            border: 1px solid @color-input-placeholder;
            width: 95%;
            font-size:15px;
            margin-top: 40px;
            padding-top: 9px;
            padding-bottom:9px;
            font-weight: 700;
          }
        }
      }
    }
    .right-container {
      padding-left: 260px;
    }
  }
</style>
