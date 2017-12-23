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
            <i class="fa fa-copyright"><span>2017 Factory Hunt</span></i>
          </div>
        </div>
      </div>

      <div class="right-container">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </div>

    </div>
  </div>
</template>

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
            }
            span {
              font-family: sans-serif, "Roboto", Roboto !important;
              margin-left: 5px;
              font-weight: 600;
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
          margin-left: 4px;
          font-size: 15px;
        }
      }
    }
  }

  @media ( min-width: 744px ) {
    .body-container {
      min-height: 0;

      .footer-container {

        .right-container {
          a {
            margin-left: 12px;
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
                font-weight: 600;
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
