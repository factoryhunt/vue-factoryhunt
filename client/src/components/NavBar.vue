<template>
  <nav class="navigation-outer-container">
    <div class="navigation-inner-container">

      <div class="logo-container">
        <a href="/"><img id="logo" src="/static/logo_white.png"></a>
      </div>

      <div class="search-container" v-show="this.$route.path !== '/'">
        <input @keyup.enter="onSearchInput" v-model="input" placeholder="Search" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>

      <div class="button-container">
        <span v-if="isUserLoggedIn" class="each-button-container">
          <div v-if="account.thumbnail_url" id="user-logo" class="each-button" @click="onProfileImage"></div>
          <div v-else="" id="user-logo" class="each-button" src="../../../assets/fh_logo_512.png" @click="onProfileImage"></div>
        </span>
        <span v-else>
          <span class="each-button-container">
          <a class="nav-button" href="/signup">Sign Up</a>
        </span>
        <span class="each-button-container">
          <a class="nav-button" href="/login">Login</a>
        </span>
        </span>
      </div>

      <!-- Profile Toggle Menu -->
      <div class="profile-toggle-container">
        <div class="dropdown-container">
          <div class="dropdown-pointer"></div>
          <div class="dropdown-pointer-bg"></div>
          <div class="dropdown-contents">
            <div class="user-container">
              <p class="user-email">{{contact.contact_email}}</p>
              <p class="user-company-name">{{account.account_name}}</p>
              <p class="user-name">{{contact.first_name + contact.last_name}}</p>
            </div>
            <div class="footer-divider"></div>
            <div class="footer">
              <div class="footer-left">
                <a id="my-page-button" @click="routeDashboardPage">관리자 센터</a>
              </div>
              <div class="footer-right">
                <a id="logout-button" @click="onLogoutButton">로그아웃</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
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
      isUserLoggedIn: {
        default: false
      }
    },
    data () {
      return {
        msg: {
          logout: '로그아웃',
          mypage: '마이페이지',
          signin: 'Sign in'
        },
        placeholder: {
          input: 'Search'
        },
        toggle: {
          isDropdownShown: false,
          isProfileDropdownShown: false
        },
        input: this.$route.query.input
      }
    },
    methods: {
      onSearchInput () {
        if (this.input) {
          location.href = `/search?input=${this.input}`
        }
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
      },
      applyCSS () {
        if (this.$route.path !== '/') {
          $('.navigation-outer-container').css('border-bottom', '1px solid #DBDBDB')
        }
      },
      applyImageBackgroundImage () {
        const $image = $('#user-logo')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../static/temp-logo-image_512.png)'
        }
        $image.css('background-image', image)
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyCSS()
          this.applyImageBackgroundImage()
        })
      }
    },
    mounted () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';
  .navigation-outer-container {
    position: relative;
    background: @color-white;
    width: 100%;
    height: 80px;
    z-index: 3;

    .navigation-inner-container {
      display: table;
      width: 100%;

      .logo-container {
        display: table-cell;
        vertical-align: middle;
        width: 80px;

        #logo {
          width: 80px;
          padding: 11.5px;
        }
      }

      .search-container {
        display: table-cell;
        vertical-align: middle;
        width: 70%;
        border-left: 1px solid @color-light-grey;

        input {
          width: 100%;
          height: 75px;
          padding: 0 20px;
          border: none;
          outline: none;
          font-size: 18px;
          font-weight: 300;
        }
      }

      .button-container {
        display: table-cell;
        vertical-align: middle;
        text-align: right;
        padding-right: 30px;

        .each-button-container {
          margin-left: 30px;
          font-weight: 400;
          font-size: 15px;

          .nav-button {
            color: @color-font-gray;
          }

          #user-logo {
            display: inline-block;
            cursor: pointer;
            width: 40px !important;
            height: 40px !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
            background-position: 50% 50% !important;
            border-radius: 20px;
            border: 2px solid @color-light-grey;
          }
        }
      }

      .profile-toggle-container {
        display: none;
        position: relative;
        right: 0;
        top: 75px;
        z-index: 9999 !important;

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
    }
  }
</style>
