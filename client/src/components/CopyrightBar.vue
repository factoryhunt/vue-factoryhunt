<template>
  <div class="body-container">
    <div class="footer-container">

      <!-- Left-side -->
      <div class="left-container">
        <div class="copyright-container">
          <div class="logo-gray-container">
            <img id="logo" src="../assets/favicon_gray.png">
          </div>
          <div class="text-container">
            <span><i class="fa fa-copyright"></i> 2018 Factory Hunt</span>
          </div>
        </div>
      </div>

      <!-- Right-side -->
      <div class="right-container">
        <a class="each-button" href="/terms" v-lang.terms></a>
        <a class="each-button" href="/privacy" v-lang.privacy></a>
        <span class="language-container each-button">
          <select v-model="value.language" @change="onLanguageSelect($event.target.value)" name="languages" id="languages">
          <option value="" disabled>Languages</option>
          <option value="eng">English</option>
          <option value="kor">한국어</option>
        </select>
          <i id="arrow-icon" class="fa fa-angle-down"></i>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: {
          language: ''
        }
      }
    },
    messages: {
      eng: {
        terms: 'Terms',
        privacy: 'Privacy'
      },
      kor: {
        terms: '이용약관',
        privacy: '개인정보 보호정책'
      }
    },
    methods: {
      onLanguageSelect (value) {
        localStorage.setItem('vue-lang', value)
        this.language = value
        location.reload(() => {
          window.scrollTo(0, 0)
        })
      },
      getUserDefaultLanguage () {
        const language = localStorage.getItem('vue-lang')
        this.value.language = language
      }
    },
    mounted () {
      this.getUserDefaultLanguage()
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';

  .body-container {
    border-top: 1px solid @color-light-grey;
    padding-top: 24px;
    padding-bottom: 60px !important;
    min-height: 0;

    .divider {
      margin: 24px 0 24px 0;
    }

    .footer-container {
      display: table;
      width: 100%;
      vertical-align: middle;

      .left-container {
        display: table-cell;
        vertical-align: top;

        .copyright-container {
          display: table;

          .logo-gray-container {
            display: table-cell;
            vertical-align: middle;

            #logo {
              width: 22px;
              height: 22px;
            }
          }
          .text-container {
            white-space: nowrap;
            display: table-cell;
            vertical-align: middle;
            color: @color-deep-gray;
            .fa-copyright {
              vertical-align: middle;
              font-size: 13px;
            }
            span {
              margin-left: 5px;
              font-weight: 400;
              font-size: 14px;
            }
          }
        }
      }

      .right-container {
        display: table-cell;
        text-align: right;
        vertical-align: top;

        .each-button {
          margin-left: 6px;
        }

        a {
          vertical-align: top;
          font-weight: 400;
          color: @color-font-gray;
          font-size: 14px;
        }

        .language-container {
          position: relative;
          border: 1px solid @color-light-grey;
          display: inline-block;
          border-radius: @border-radius;

          select {
            width: inherit;
            border: none;
            font-size: 17px;
            padding-right: 20px;
          }
          #arrow-icon {
            position: absolute;
            font-size: 25px;
            top: 8px;
            right: 10px;
          }
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .body-container {

      .divider {
      }

      .footer-container {

        .left-container {
          vertical-align: middle;

          .copyright-container {

            .logo-gray-container {

              #logo {
              }
            }
            .text-container {
              .fa-copyright {
                vertical-align: middle;
                font-size:13px;
              }
              span {
                font-size: 16px;
              }
            }
          }
        }

        .right-container {
          a {
            font-size: 15px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  @media ( min-width: 1128px ) {
    .body-container {
      min-height: 0;

      .divider {
        margin: 24px 0 24px 0;
      }

      .footer-container {
        display: table;
        width: 100%;
        vertical-align: middle;

        .left-container {
          display: table-cell;
          vertical-align: middle;

          .copyright-container {
            display: table;

            .logo-gray-container {
              display: table-cell;
              vertical-align: middle;

              #logo {
                width: 22px;
                height: 22px;
              }
            }
            .text-container {
              display: table-cell;
              vertical-align: middle;
              color: @color-deep-gray;
              .fa-copyright {
                vertical-align: middle;
              }
              span {
                margin-left: 5px;
                font-size: 16px;
              }
            }
          }
        }

        .right-container {
          display: table-cell;
          text-align: right;
          vertical-align: middle;

          a {
            vertical-align: middle;
            font-weight: 400;
            color: @color-font-gray;
            margin-left: 12px;
            font-size: 15px;
          }
        }
      }
    }
  }
</style>
