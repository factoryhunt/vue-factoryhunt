<template>
  <div class="body-container">
    <div class="divider"></div>
    <div class="footer-container">

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

      <div class="right-container">
        <a href="/terms" v-lang.terms></a>
        <a href="/privacy" v-lang.privacy></a>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    messages: {
      eng: {
        terms: 'Terms',
        privacy: 'Privacy'
      },
      kor: {
        terms: '이용약관',
        privacy: '개인정보 보호정책'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/css/index';

  .body-container {
    margin-top: 60px;
    margin-bottom: 60px !important;
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
              margin-right: 8px;
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
              font-size: 14px;
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
        vertical-align: middle;

        a {
          vertical-align: middle;
          font-weight: 400;
          color: @color-font-gray;
          margin-left: 4px;
          font-size: 14px;
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

          .copyright-container {

            .logo-gray-container {

              #logo {
              }
            }
            .text-container {
              .fa-copyright {
                vertical-align: middle;
                font-size: 16px;
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
                margin-right: 8px;
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
