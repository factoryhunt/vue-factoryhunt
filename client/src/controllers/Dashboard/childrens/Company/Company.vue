<template>
  <div class="dashboard-page-container">
    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div class="menu-container">
            <a id="item-company-edit" class="menu" href="/dashboard/company" v-lang.left.editCompany></a>
            <a id="item-domain-edit" class="menu" href="/dashboard/company/domain" v-lang.left.editDomain></a>
            <a id="item-image-edit" class="menu" href="/dashboard/company/image" v-lang.left.photos></a>
            <!--<a id="item-certification-upload" class="menu" href="/dashboard/company/certifications">인증서 등록</a>-->
            <button @click="routeCompanyPage" class="view-button button-white" v-lang.left.viewButton></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">
      <router-view :account="account"></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Company | Factory Hunt'
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
    data () {
      return {
        msg: ''
      }
    },
    messages: {
      eng: {
        left: {
          editCompany: 'Edit Company',
          editDomain: 'Edit Domain',
          photos: 'Photos',
          viewButton: 'View Website'
        },
        right: {
        }
      },
      kor: {
        left: {
          editCompany: '회사 정보 수정',
          editDomain: '도메인 수정',
          photos: '이미지 등록',
          viewButton: '회사 페이지 보기'
        },
        right: {
        }
      }
    },
    methods: {
      routeCompanyPage () {
        location.href = `/${this.account.domain}`
      },
      trackingDomain () {
        $(document).ready(() => {
          $('#item-company').attr('aria-selected', true)
          if (this.$route.path === '/dashboard/company') {
            $('#item-company-edit').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/company/domain') {
            $('#item-domain-edit').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/company/image') {
            $('#item-image-edit').attr('aria-selected', true)
          }
          if (this.$route.path === '/dashboard/company/certifications') {
            $('#item-certification-upload').attr('aria-selected', true)
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
