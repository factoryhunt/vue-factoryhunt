<template>
  <div class="dashboard-page-container">

    <!-- Left-side -->
    <div class="left-container">
      <div class="profile-container">
        <div class="profile-inner-container">
          <div id="company-image"></div>
          <div class="title-contents">
            <p class="title">{{ account.account_name_english }}</p>
            <p v-if="contact.first_name" class="sub-title">{{contact.first_name_english + ' ' + contact.last_name_english}}<small></small></p>
          </div>
          <button id="view-button" @click="routeCompanyPage" class="view-button button-white">View website</button>
          <button id="edit-button" @click="routeCompanyEditPage" class="edit-button button-white">Edit</button>
        </div>
      </div>
    </div>

    <!-- Right-side -->
    <div class="right-container">

      <!-- Header -->
      <header class="header-container">
        <p class="sub-title">Hello, {{contact.first_name_english ? (contact.salutation + ' ' + contact.first_name_english + ' ' + contact.last_name_english) : contact.contact_email}}!</p>
      </header>

      <!-- Link -->
      <!--<div class="link-container">-->
        <!--<p class="text">회사 정보를 입력하고 멋진 홈페이지를 바이어에게 공유하세요! 몇 분만 투자하면 됩니다.</p>-->
        <!--<a @click="removeLinkContainer"><icon class="cancel-button" name="times" scale="1.4"></icon></a>-->
      <!--</div>-->

      <!-- Body -->
      <div class="body-container">

        <p class="title">Dashboard</p>

        <div class="box-container">
          <div class="title-container">
            <a href="/dashboard/company/domain" class="button">Edit</a>
            <p class="title">Customized domain</p>
          </div>
          <div class="text-container">
            <p class="text">Share the link below and use it as your company website.</p>
            <a id="clipboard" data-clipboard-target="#domain-text">
              <span id="domain-text" class="text">www.factoryhunt.co.kr/{{account.domain}}
              </span>
            </a>
            <span id="copied-text">URL copied</span>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <a href="/dashboard/company" class="button">Edit</a>
            <p class="title">Company information</p>
          </div>
          <div class="text-container">
            <p class="text">Update company information and create a website in a minute.</p>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <a href="/dashboard/product" class="button">Edit</a>
            <p class="title">Product information</p>
          </div>
          <div class="text-container">
            <p class="text">Update product information and create an online product catalog.</p>
          </div>
        </div>

        <div class="box-container">
          <div class="title-container">
            <a href="/dashboard/account" class="button">Edit</a>
            <p class="title">Account Information</p>
          </div>
          <div class="text-container">
            <p class="text">Update your contact information. You will be connected with potential buyers by email.</p>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import Icon from '../../../../node_modules/vue-awesome/components/Icon'
  import Clipboard from 'clipboard'
  export default {
    components: { Icon },
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
      }
    },
    methods: {
      removeLinkContainer () {
        $('.link-container').fadeOut(500, () => {
          $(this).remove()
        })
      },
      routeCompanyPage () {
        location.href = `/${this.account.domain}`
      },
      routeCompanyEditPage () {
        location.href = '/dashboard/company'
      },
      activateClipboardJS () {
        /* eslint-disable no-unused-vars */
        const clipboard = new Clipboard('#clipboard')
        clipboard.on('success', (e) => {
          console.info('Action:', e.action)
          console.info('Text:', e.text)
          console.info('Trigger:', e.trigger)
          $('#copied-text').show().delay(1000).fadeOut(500)
          e.clearSelection()
        })
        clipboard.on('error', (e) => {
          alert('오류 발생. 다시 시도해주세요.')
        })
        /* eslint-enable no-unused-vars */
      },
      applyImageBackground () {
        const $image = $('#company-image')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/temp-logo-image_english_512.png)'
        }
        $image.css('background-image', image)
      },
      trackingDomain () {
        $('#item-dashboard').attr('aria-selected', true)
      },
      activateJquery () {
        $(document).ready(() => {
          this.trackingDomain()
          this.applyImageBackground()
          this.activateClipboardJS()
        })
      }
    },
    created () {
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/index";

  p {
    margin: 0;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .sub-title {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  .page-container {

    .left-container {
      .profile-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 240px;
        border: 1px solid @color-light-grey;
        border-radius: @border-radius;

        .profile-inner-container {
          position: relative;
          text-align: center;

          #company-image {
            width: 100%;
            height: 240px;
            background-color: @color-white;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            margin-bottom: 12px;
            background-size: cover;
            background-position: 50%, 50%;
            background-repeat: no-repeat;
          }

          .title-contents {
            margin-bottom: 22px;

            .title {
              word-wrap: break-word;
              font-weight: 500;
              font-size: 24px;
              margin: 0;
            }
            .sub-title {
              font-size: 20px;
              font-weight: 300;
              margin: 0;
            }
          }

          button {
            color: @color-font-base;
            border: 1px solid @color-input-placeholder;
            width: 80%;
            margin-bottom: 8px;
            padding-top: 6px;
            padding-bottom:6px;
            font-weight: 600;
          }
          #edit-button {
            margin-bottom: 18px;
          }
        }
      }
    }

    .right-container {
      padding-left: 270px;

      .header-container {

      }

      .link-container {
        position: relative;
        background-color: @color-link;
        border-radius: @border-radius;
        margin-bottom: 50px;

        .text {
          opacity: 1;
          font-size:17px;
          font-weight:400;
          padding: 8px 20px;
          height: 90px;
          color: @color-white;
        }

        .cancel-button {
          position: absolute;
          right: 16px;
          top: 9px;
          font-weight: 100;
          color: @color-white;
        }
      }

      .body-container {

        .box-container {
          display: block;
          border: 1px solid @color-light-grey;
          border-radius: @border-radius;
          margin-bottom: 30px;

          .title-container {
            padding: 8px 20px;
            background-color: @color-lightest-grey;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;

            .title {
              font-size:17px;
              font-weight: 500;
              margin-bottom: 0;
            }
            .button {
              color: @color-font-base;
              border: 1px solid @color-deep-gray;
              border-radius: @border-radius;
              padding: 2px 8px;
              font-size: 14px;
              text-decoration: none;
              float: right;
            }
          }

          .text-container {
            padding: 8px 20px;
            font-size:18px;
            font-weight: 300;
            margin: 10px 0;

            #share-button {
              vertical-align: middle;
              margin-left: 5px;
            }
            #copied-text {
              display: none;
              margin-left: 8px;
              color: @color-font-base;
              font-size:16px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>
