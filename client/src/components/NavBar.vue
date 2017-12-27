<template>
  <nav class="navigation-outer-container">
    <div class="navigation-inner-container">

      <!-- Left Logo -->
      <div class="logo-container">
        <div class="logo-inner-container">
          <a href="/" id="logo-anchor">
            <img id="logo" src="/static/logo_white.png">
          </a>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-icon-container">
          <div class="search-icon-contents">
            <i id="search-icon" class="fa fa-search"></i>
          </div>
        </div>
        <input @keyup.enter="onSearchInput" v-model="input" placeholder="Search" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>

      <!-- Right Buttons -->
      <div class="button-container">
        <div class="button-inner-container">
          <nav>
            <ul class="button-wrapper">
              <!--<li class="button-item-container">-->
                <!--<div class="button-item-wrapper">-->
                  <!--<div class="button-item">-->
                    <!--<a>Languages<small> ▼</small></a>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
              <li v-if="!isUserLoggedIn" class="button-item-container">
                <div class="button-item-wrapper">
                  <div class="button-item">
                    <a href="/signup" v-lang.signUp></a>
                  </div>
                </div>
              </li>
              <li v-if="!isUserLoggedIn" class="button-item-container">
                <div class="button-item-wrapper">
                  <div class="button-item">
                    <a href="/login" v-lang.login></a>
                  </div>
                </div>
              </li>
              <li v-if="isUserLoggedIn" class="button-item-container">
                <div class="button-item-wrapper">
                  <div class="button-item">
                    <div id="user-logo" @click="onProfileImage"></div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Profile Toggle Menu -->
      <div class="profile-toggle-container">
        <div class="dropdown-container">
          <div class="dropdown-pointer"></div>
          <div class="dropdown-pointer-bg"></div>
          <div class="dropdown-contents" v-show="contact.contact_id">
            <div class="user-container">
              <p class="user-email">{{contact.contact_email}}</p>
              <p class="user-company-name">{{account.account_name_english}}</p>
              <p class="user-name">{{contact.salutation + ' ' + contact.first_name_english + ' ' + contact.last_name_english}}</p>
            </div>
            <div class="footer-divider"></div>
            <div class="footer">
              <div class="footer-left">
                <a id="my-page-button" @click="routeDashboardPage" v-lang.dashboard></a>
              </div>
              <div class="footer-right">
                <a id="logout-button" @click="onLogoutButton" v-lang.logout></a>
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
    messages: {
      eng: {
        signUp: 'Sign Up',
        login: 'Login',
        dashboard: 'Dashboard',
        logout: 'Logout'
      },
      kor: {
        signUp: '회원가입',
        login: '로그인',
        dashboard: '관리자 센터',
        logout: '로그아웃'
      }
    },
    computed: {

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
          image = 'url(../../static/temp-logo-image_english_512.png)'
        }
        $image.css('background-image', image)
      },
      searchBarDisplaying () {
        if (this.$route.path === '/') {
          $('.search-container').css('visibility', 'hidden')
        } else {
          $('.search-container').css('visibility', 'visible')
        }
      },
      activateJquery () {
        $(document).ready(() => {
          this.searchBarDisplaying()
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
    z-index: 3;

    .navigation-inner-container {
      display: table;
      width: 100%;

      .logo-container {
        .logo-inner-container {
          position: relative;

          #logo-anchor {
            display: table-cell;
          }

          #logo {
            display: table-cell;
            position: relative;
            padding: 11.5px;
            width: 80px;
            height: 80px;
            text-align: center;
            vertical-align: middle;
          }
        }
      }

      .search-container {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        border-left: 1px solid @color-light-grey;
        visibility: hidden;

        .search-icon-container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 20px;

          .search-icon-contents {
            position: relative;
            width: 100%;
            height: 100%;
          }

          #search-icon {
            position: absolute;
            left: 8px;
            top: 31px;
            font-size:17px;
            display: none;
          }
        }

        input {
          width: 100%;
          height: 75px;
          padding: 0 26px;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 300;
        }
      }

      .button-container {
        display: table-cell;
        vertical-align: middle;
        visibility: hidden;

        .button-inner-container {
          display: block;

          nav {
            display: block;

            .button-wrapper {
              display: table-cell;
              list-style: none;
              margin: 0;
              padding: 0;

              .button-item-container {
                display: table-cell;

                .button-item-wrapper {
                  height: 80px;
                  line-height: 80px;
                  background: transparent;
                  display: inline-block;
                  padding: 0 8px;
                  white-space: nowrap;

                  .button-item {
                    display: inline-block;
                    padding: 8px;
                    vertical-align: middle;
                    line-height: 1;

                    a {
                      color: @color-font-gray;
                    }
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
            }
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
            right: 56px;
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
            right: 56px;
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
  @media ( min-width: 744px ) {
    .navigation-outer-container {

      .navigation-inner-container {

        .logo-inner-container {

          #logo-anchor {
          }
          #logo {
          }
        }

        .search-container {

          .search-icon-container {
            .search-icon-contents {
              #search-icon {
                left: 12px;
                top: 30px;
                font-size:20px;
                display: inherit;
              }
            }
          }

          input {
            width: 100%;
            height: 75px;
            padding-left: 42px;
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

            #user-logo {
            }
          }
        }
      }
    }
  }
  @media ( min-width: 1128px ) {
    .navigation-outer-container {

      .navigation-inner-container {
        display: table;
        width: 100%;

        .logo-container {
          display: table-cell;
          vertical-align: middle;

          .logo-inner-container {
            position: relative;

            #logo-anchor {
              display: table-cell;
            }

            #logo {
              display: table-cell;
              width: 80px;
              height: 80px;
              position: relative;
              text-align: center;
              vertical-align: middle;
            }
          }
        }

        .search-container {
          display: table-cell;
          vertical-align: middle;
          border-left: 1px solid @color-light-grey;

          input {
            width: 100%;
            height: 75px;
            padding-left: 42px;
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
          visibility: visible;

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

      }
    }
  }
</style>
