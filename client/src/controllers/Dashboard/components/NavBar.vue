<template>
  <div class="component-container">

    <!-- NavBar -->
    <nav class="navbar-container">
      <!-- Logo Left-side -->
      <div class="logo-container">
        <a href="/"><img id="logo" src="../../../assets/new-logo.png"></a>
      </div>

      <!-- Profile in NavigationBar -->
      <div class="button-container">
        <div class="each-button-container">
          <div v-if="account.thumbnail_url" id="user-logo" class="each-button" @click="onProfileImage"></div>
          <div v-else="" id="user-logo" class="each-button" src="../../../assets/fh_logo_512.png" @click="onProfileImage"></div>
        </div>
      </div>

      <!-- Profile Toggle Menu -->
      <div class="profile-toggle-container">
        <div class="dropdown-container">
          <div class="dropdown-pointer"></div>
          <div class="dropdown-pointer-bg"></div>
          <div class="dropdown-contents">
            <div class="user-container">
              <p class="user-email">{{contact.contact_email}}</p>
              <p class="user-company-name">{{account.account_name_english}}</p>
              <p class="user-name">{{contact.salutation + ' ' + contact.first_name_english + ' ' + contact.last_name_english}}</p>
            </div>
            <div class="footer-divider"></div>
            <div class="footer">
              <div class="footer-left">
                <a id="my-page-button" @click="routeDashboardPage">Dashboard</a>
              </div>
              <div class="footer-right">
                <a id="logout-button" @click="onLogoutButton">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sub NavBar -->
    <sub-nav-bar></sub-nav-bar>
  </div>
</template>

<script>
  import SubNavBar from './SubNavBar.vue'
  export default {
    components: {
      SubNavBar
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
      },
      isUserPageAdmin: {
        default: false
      },
      isUserLoggedIn: {
        default: false
      }
    },
    data () {
      return {
        toggle: {
          isDropdownShown: false,
          isProfileDropdownShown: false
        }
      }
    },
    methods: {
      onLoginButton () {
        this.$router.push('/login')
      },
      onSignUpButton () {
        this.$router.push({
          path: '/signup'
        })
      },
      onLogoutButton () {
        this.$store.dispatch('logout')
      },
      routeDashboardPage () {
        location.href = '/dashboard'
      },
      onProfileImage () {
        const dropdown = $('.profile-toggle-container')

        if (this.toggle.isProfileDropdownShown) dropdown.css({'display': 'none'})
        else dropdown.css({'display': 'inherit'})
        this.toggle.isProfileDropdownShown = !this.toggle.isProfileDropdownShown
        this.toggleOffDropdown()
      },
      toggleDropdown () {
        const dropdown = $('.management-container .dropdown-container')

        if (this.toggle.isDropdownShown) dropdown.css({'display': 'none'})
        else dropdown.css({'display': 'inherit'})
        this.toggle.isDropdownShown = !this.toggle.isDropdownShown
        this.toggleOffProfileDropdown()
      },
      toggleOffDropdown () {
        if (this.toggle.isDropdownShown) {
          const dropdown = $('.management-container .dropdown-container')
          dropdown.css({'display': 'none'})
          this.toggle.isDropdownShown = false
        }
      },
      toggleOffProfileDropdown () {
        if (this.toggle.isProfileDropdownShown) {
          const dropdown = $('.profile-toggle-container')
          dropdown.css({'display': 'none'})
          this.toggle.isProfileDropdownShown = false
        }
      },
      routeMyPage () {
        this.$router.push({
          path: `/${this.account.domain}`
        })
      },
      routeProductUploadPage () {
        this.$router.push({
          path: `/${this.value.company}/upload`
        })
      },
      applyFixedNavBar () {
        if (this.$route.path === `/dashboard/company/edit` ||
          this.$route.path === `/dashboard/product/upload`) {
          $(document).ready(function () {
            $('.logo-container').css('border-right', 'none')
            $('.navbar-container').css('border-bottom', 'none')
            $('.navbar-container').removeClass().addClass('fixed-navbar-container')
            $(window).scroll(() => {
              const height = $(window).scrollTop()
              if (height > 0) {
                $('.fixed-navbar-container').css('border-bottom', '1px solid #DBDBDB')
              } else {
                $('.fixed-navbar-container').css('border-bottom', 'none')
              }
            })
          })
        }
      },
      applyImageBackground () {
        const $image = $('#user-logo')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/temp-logo-image_512.png)'
        }
        $image.css('background-image', image)
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyImageBackground()
        })
      }
    },
    created () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/index';

  .fixed-navbar-container {
    position: fixed;
    z-index: 3;
    top: 0 !important;
    left: 0 !important;
    height: 80px;
    width: 100%;
    background-color: @color-white;
  }

  .navbar-container {
    position: relative;
    display: table;
    width: 100%;
    height: 80px;
    z-index: 5;

    .logo-container {
      display: table-cell;
      vertical-align: middle;
      width: 80px;
      border-right: 1px solid #DBDBDB;

      img {
        padding: 11.5px;
      }
    }

    .button-container {
      display: table-cell;
      vertical-align: middle;
      text-align: right;

      .each-button-container {
        display: inline-block;
        vertical-align: middle;
        margin-right: 30px;

        #user-logo {
          cursor: pointer;
          width: 40px !important;
          height: 40px !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
          background-position: 50% 50% !important;
          border-radius: 50%;
          border: 2px solid @color-light-grey;
        }
      }
    }

    .profile-toggle-container {
      display: none;
      position: relative;
      right: 0;
      top: 75px;
      z-index: 10 !important;

      .dropdown-container {
        position: absolute;
        width: 300px;
        border: 1px solid @color-light-grey;
        border-radius: @border-radius;
        top: 100% + 25px;
        right: 0;
        background-color: @color-white;
        min-width: 160px;
        box-shadow: 0 2px 10px rgba(0,0,0,.2);

        .dropdown-pointer {
          border-color: transparent;
          border-bottom-color: @color-white;
          border-style: dashed dashed solid;
          border-width: 0 8.5px 8.5px;
          position: absolute;
          height: 0;
          width: 0;
          top: -9px;
          right: 41px;
          z-index: 5;
        }
        .dropdown-pointer-bg {
          border-color: transparent;
          border-bottom-color: @color-light-grey;
          border-style: dashed dashed solid;
          border-width: 0 8.5px 8.5px;
          position: absolute;
          height: 0;
          width: 0;
          top: -10px;
          right: 41px;
          z-index: 4;
        }

        .dropdown-contents {
          width: 300px;
          border-radius: @border-radius;
          padding: 12px 20px;
          top: 100% + 25px;
          right: 0;
          background-color: @color-white;
          min-width: 160px;
          box-shadow: 0 2px 10px rgba(0,0,0,.2);
          z-index: 1;

          .user-container {
            margin-bottom: 50px;
            text-align: right;
            .user-email {
              margin: 0;
              font-weight: 400;
            }

            .user-company-name {
              word-wrap: break-word;
              font-size: 22px;
              font-weight: 500;
            }

            .user-name {
              font-size: 18px;
              font-weight: 300;
            }
          }

          .footer-divider {
            height: 1px;
            background-color: @color-light-grey;
            position: absolute;
            width: 100%;
            left: 0;
            right: 0;
            bottom: 60px;
          }

          .footer {
            display: table;
            width: 100%;
            margin-bottom: 5px;
            font-size: 16px;

            .footer-left {
              display: table-cell;
              text-align: left;

              #my-page-button {
                display: inline !important;
                margin: 0 12px;
                color: @color-orange;
                /*<!--border: 1px solid @color-deep-gray;-->*/
                /*<!--border-radius: @border-radius;-->*/
                /*<!--padding: 5px 12px;-->*/
                /*<!--background-color: @color-light-grey;-->*/

                &:hover {
                  //
                }
              }
            }

            .footer-right {
              display: table-cell;
              text-align: right;

              #logout-button {
                display: inline !important;
                margin: 0 12px;
                color: @color-font-base;
                /*<!--border: 1px solid @color-deep-gray;-->*/
                /*<!--border-radius: @border-radius;-->*/
                /*<!--padding: 5px 12px;-->*/
                /*<!--background-color: @color-light-grey;-->*/
              }
            }

            a {
              text-decoration: none !important;
              display: block !important;
            }
          }
        }
      }
    }

    .management-container {
      .dropdown-container {
        position: absolute;
        display: none;
        top: 75px;
        right: 72px;

        .dropdown-contents {
          position: relative;
          border: 1px solid @color-light-grey;
          border-radius: @border-radius;
          background-color: @color-white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
          z-index: 1;

          .dropdown-pointer {
            border-color: transparent;
            border-bottom-color: @color-white;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            position: absolute;
            height: 0;
            width: 0;
            top: -9px;
            right: 27px;
            z-index: 5;
          }
          .dropdown-pointer-bg {
            border-color: transparent;
            border-bottom-color: @color-light-grey;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            position: absolute;
            height: 0;
            width: 0;
            top: -10px;
            right: 27px;
            z-index: 4;
          }

          .dropdown {
            position: relative;
            padding: 12px 20px;

            a {
              display: block;
              line-height: normal;
              margin-top: 3px;
            }
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .search-container {
      margin: 27.5px 100px;

      input {
        width: 520px;
      }
    }
  }

  @media ( min-width: 1128px ) {
    .search-container {
      margin: 27.5px 100px;

      input {
        width: 900px;
      }
    }
  }
</style>
