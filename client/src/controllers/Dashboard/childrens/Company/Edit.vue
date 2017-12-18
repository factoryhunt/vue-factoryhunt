<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Right-side sticky UI container -->
    <!--<div class="right-container">-->
    <!--<div class="sticky-container">-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.first.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.first.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.second.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.second.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="each-container">-->
    <!--<p class="title">{{ msg.sticky.third.title }}</p>-->
    <!--<p class="sub-title">{{ msg.sticky.third.subTitle }}</p>-->
    <!--</div>-->
    <!--<div class="caption-container">-->
    <!--<p class="caption">{{ msg.sticky.caption }}</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!-- Left-side UI container -->
    <form class="form-container" @submit.prevent="onEditButton(value)">

      <!-- Company Name -->
      <div class="account-name-container input-container">
        <p class="title">Company Name</p>
        <i class="fa fa-circle required-circle" aria-hidden="true"><span> Required field</span></i>
        <p class="sub-title">Use the official company name from the business registration certificate.</p>
        <input required pattern="[가-힣A-Za-z0-9 ().,]{2,50}" title="You can use letters, numbers, and special characters(( ) . ,)between 2 and 50 characters." id="account-name-input" type="text" placeholder="Factory Hunt, Inc." v-model="value.accountName" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <p class="hidden-title"></p>
        <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Company Short Description -->
      <div class="short-description-container input-container">
        <p class="title">Slogan</p>
        <p class="sub-title">Describe your company in 50 characters or less.</p>
        <input id="short-description-input" maxlength="50" @keyup="countInputLength" placeholder="Factory Hunt is a global B2B platform." v-model="value.shortDescription">
        <p class="third-title">{{ 50 - value.shortDescriptionCount }}</p>
      </div>

      <!-- Company Long Description -->
      <div class="description-container input-container">
        <p class="title">Company Description</p>
        <p class="sub-title">Describe your company</p>
        <textarea id="description-input" maxlength="25000" rows="10" placeholder="Factory Hunt is a global B2B platform." v-model="value.description"></textarea>
      </div>

      <!-- Company Information -->
      <div class="information-container input-container">
        <p class="title">Company Information</p>
        <p class="sub-title">Fill out the information below.</p>
        <!-- Products -->
        <div class="box-container">
          <div class="left-contents">Products</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="LED, Light bulbs, ..." v-model="value.products"></div>
        </div>
        <!-- Website -->
        <div class="box-container">
          <div class="left-contents">Website</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="www.factoryhunt.com" v-model="value.website" spellcheck="false"></div>
        </div>
        <!-- Phone -->
        <div class="box-container">
          <div class="left-contents">Phone</div>
          <div class="right-contents"><input type="text" maxlength="21" placeholder="+82-2-1234-5678" v-model="value.phone"></div>
        </div>
        <!-- Established Year -->
        <div class="box-container">
          <div class="left-contents">Established Year</div>
          <div class="right-contents"><input type="text" maxlength="10" placeholder="1970-01-01" v-model="value.establishedDate"></div>
        </div>
        <p class="sub-title" style="margin-top: 12px">Address Information</p>
        <!-- Country -->
        <div class="box-container">
          <div class="left-contents">Country</div>
          <div class="right-contents">
            <select v-model="value.country">
              <option disabled value="">Select a country</option>
              <option></option>
            </select>
          </div>
        </div>
        <!-- State -->
        <div class="box-container">
          <div class="left-contents">State</div>
          <div class="right-contents"><input type="text" maxlength="15" placeholder="California" v-model="value.state"></div>
        </div>
        <!-- City -->
        <div class="box-container">
          <div class="left-contents">City</div>
          <div class="right-contents"><input type="text" maxlength="15" placeholder="San Francisco" v-model="value.city"></div>
        </div>
        <!-- Street Address -->
        <div class="box-container">
          <div class="left-contents">Street address</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="7 hacker street" v-model="value.streetAddress" @keyup="checkPostalCode(value.postalCode)"></div>
        </div>
        <!-- Street Address Detail -->
        <div class="box-container">
          <div class="left-contents">Street address 2</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="Floor 2" v-model="value.streetAddressDetail"></div>
        </div>
        <!-- Postal Code -->
        <div class="box-container">
          <div class="left-contents">Postal code</div>
          <div class="right-contents"><input type="text" pattern="[0-9]" title="" placeholder="" v-model="value.postalCode"></div>
        </div>
      </div>

      <!-- Company History -->
      <div class="history-container input-container">
        <p class="title">Company History</p>
        <p class="sub-title"></p>
        <textarea rows="10" maxlength="25000" placeholder="" v-model="value.history"></textarea>
        <i id="history-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <p class="title">Confirm and edit</p>
        <p class="sub-title">Please confirm the information above before you submit it. Company information will be updated immediately.</p>
        <button class="button-orange">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NavBar from '../../components/NavBar.vue'
  import FooterBar from '../../../../components/FooterBar'
  import Spinkit from '../../../../components/Spinkit/Spinkit'
  export default {
    metaInfo: {
      title: 'Edit Comapny information | Factory Hunt'
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      NavBar,
      FooterBar,
      Spinkit
    },
    data () {
      return {
        value: {
          contact: {},
          mainImageUrl: '',
          mainImageFileName: '',
          logoUrl: '',
          logoImageFileName: '',
          accountName: '',
          shortDescription: '',
          shortDescriptionCount: 0,
          description: '',
          products: '',
          website: '',
          phone: '',
          establishedDate: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
          streetAddress: '',
          streetAddressDetail: '',
          history: ''
        },
        toggle: {
          isDomainAvailable: null,
          isAccountNameAvailable: null,
          isUserAdmin: false
        },
        msg: {
          fileSelect: 'Choose File',
          accountName: {
            title: 'Company Name',
            subTitle: '사업자등록증의 회사명과 일치시켜주세요.',
            hiddenTitle: ''
          },
          confirm: {
            title: '확인 및 수정',
            subTitle: '수정할 정보를 다시 한 번 확인하고 내용이 맞다면 수정하기 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!',
            edit: '수정하기'
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'getContactId',
        'getAccountId',
        'isLoggedIn'
      ])
    },
    methods: {
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
        this.checkAllInputOnce(this.value)
        this.applyInputFocusBlurEvent()
        this.preventEnterKeySubmit()
      },
      // update server data to local data
      applyLocalData (account) {
        this.value.mainImageUrl = account.account_image_url_1
        this.value.logoUrl = account.thumbnail_url
        this.value.accountName = account.account_name_english
        this.value.description = account.company_description_english
        this.value.shortDescription = account.company_short_description_english
        this.value.shortDescriptionCount = (account.company_short_description).length
        this.value.products = account.products
        this.value.phone = account.phone
        this.value.website = account.website
        this.value.establishedDate = this.getYear(account.established_date)
        this.value.country = account.mailing_country_english
        this.value.state = account.mailing_state_english
        this.value.city = account.mailing_city_english
        this.value.postalCode = account.mailing_postal_code_english
        this.value.streetAddress = account.mailing_street_address_english
        this.value.streetAddressDetail = account.mailing_street_address_2_english
        this.value.history = account.history_english
      },
      getYear (date) {
        if (date === '0000-00-00') {
          return ''
        }
        let temp = new Date(date)
        let year = temp.getFullYear()
        let month = (temp.getMonth() + 1)
        let day = temp.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        return `${year}-${month}-${day}`
      },
      checkAllInputOnce (value) {
        this.checkAccountName(value.accountName)
      },
      checkAccountName (value) {
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')
        if (value) {
          this.toggle.isAccountNameAvailable = true
          this.msg.accountName.hiddenTitle = ''
          accountNameMark.removeClass('fa fa-exclamation')
        } else {
          this.toggle.isAccountNameAvailable = false
          this.msg.accountName.hiddenTitle = '필수 입력 항목입니다.'
          hiddenTitle.css({'color': 'red'})
          accountNameMark.addClass('fa fa-exclamation')
        }
      },
      checkPostalCode (postalCode) {
        this.value.postalCode = postalCode.replace(/[^0-9]/g, '')
      },
      onEditButton (value) {
        // modal loading start
        $('#modal-spinkit').removeClass().addClass('spinkit-modal')

        // props
        const data = {
          account_name_english: value.accountName,
          company_short_description_english: value.shortDescription,
          company_description_english: value.description,
          products: value.products,
          website: value.website,
          phone: value.phone,
          established_date: value.establishedDate,
          mailing_country_english: value.country,
          mailing_state_english: value.state,
          mailing_city_english: value.city,
          mailing_postal_code_english: value.postalCode,
          mailing_street_address_english: value.streetAddress,
          mailing_street_address_2_english: value.streetAddressDetail,
          history_english: value.history
        }
        // request
        this.$http.put(`/api/data/account/${this.getAccountId}`, data)
          .then(() => {
            $('#modal-spinkit').removeClass()
            alert('Edited success')
            window.scrollTo(0, 0)
            location.reload()
          })
          .catch(() => {
            $('#modal-spinkit').removeClass()
            alert('Edit failed. Try again please.')
          })
      },
      // jQuery for CSS
      applyStickyCSS () {
        $(document).ready(function () {
          const $sticky = $('.sticky-container')
//          const $stickyStopper = $('.sticky-stopper')
          if ($sticky.offset()) { // make sure ".sticky" element exists
//            var generalSidebarHeight = $sticky.innerHeight() // 30
            var stickyTop = $sticky.offset().top
//            var stickyBottom = stickyTop + $sticky.outerHeight()
            var stickOffset = 110
//            var stickyStopperPosition = $stickyStopper.offset().top // 2259
//            var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset
//            var diff = stopPoint + stickOffset
            $(window).scroll(function () { // scroll event
              var windowTop = $(window).scrollTop() // returns number
//              console.log('windowTop: ', windowTop)
//              console.log('stickyTop: ', stickyTop)
//              console.log('stickyBottom: ', stickyBottom)
//              console.log('stickyStopperPosition: ', stickyStopperPosition)
//              console.log('stopPoint: ', stopPoint)
//              console.log('diff: ', diff)
              if (stickyTop - windowTop < stickOffset) {
                $sticky.css({
                  'position': 'fixed',
                  'top': stickOffset,
                  'width': '310px'
                })
              } else {
                $sticky.css({
                  'position': 'absolute',
                  'top': 'initial'
                })
              }
//              else if (stickyStopperPosition - windowTop < 0) {
//                $sticky.css({
//                  'position': 'absolute',
//                  'bottom': stickyStopperPosition
//                })
            })
          }
        })
      },
      applyInputFocusBlurEvent (input, mark) {
        const accountNameInput = $('#account-name-input')
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')

        accountNameInput.blur(() => {
          if (this.value.accountName) {
            this.toggle.isAccountNameAvailable = true
            this.msg.accountName.hiddenTitle = ''
            accountNameMark.removeClass('fa fa-exclamation')
          } else {
            this.toggle.isAccountNameAvailable = false
            this.msg.accountName.hiddenTitle = '필수 입력 항목입니다.'
            hiddenTitle.css({'color': 'red'})
            accountNameMark.addClass('fa fa-exclamation')
          }
        })
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      countInputLength () {
        this.value.shortDescriptionCount = $('#short-description-input').val().length
      }
    },
    created () {
    },
    mounted () {
      this.applyAttributes()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/css/index';

  /* Global CSS */

  .title {
    display: inline-block;
    font-size: 32px;
    font-weight:700;
    margin-bottom:0;
  }
  .sub-title {
    font-size: 24px;
    font-weight:300;
    margin-bottom:10px;
  }
  /* Global CSS */
  .information-container {
    position: relative;
  }

  .description-container {
    position: relative;
  }

  .history-container {
    position: relative;
  }

  .certification-container {
    position: relative;
  }
  .required-circle {
    vertical-align: top;
    padding-top: 8px;
    display: inline-block;
    color: @color-orange;
    font-size: 0.5px;

    span {
      font-size:12px !important;
      font-weight:500;
    }
  }

  @media ( min-width: 768px ) {
    .image-container {
      height: 460px;
    }

    .left-container {
    }

    .header-container .title {
      padding-right: 75px;
    }
    .header-container .logo {
      width: 70px;
      border-radius: 35px;
      border: 1px solid #eeeeee;
    }

    .right-container {
      max-width: 600px;
      margin: 0 auto 30px auto;
    }

    .location-container {  }
    .location-container #map {
      margin: 30px 0;
      width: 100%;
      min-height: 450px;
    }
  }

  @media ( min-width: 1128px ) {

    @height: 50px;
    @mark-right-amount: 12px;
    @small-mark-right-amount: 18px;
    @mark-bottom-amount: 16px;
    @font-size-button: 22px;
    @font-weight-button: 600;

    /* Global CSS */
    .dashboard-page-container {
    }

    .input-container {
      margin-bottom: 40px;
    }
    .box-container {
      position: relative;
      width: 100%;
      border: 1px solid @color-light-grey;
      border-radius: @border-radius;
      margin-bottom: 4px;

      .left-contents {
        float: left;
        font-size: 16px;
        font-weight: 600;
        padding-left: 18px;
        height: @height;
        line-height: @height;
        width: 140px;
        border-right: 1px solid @color-light-grey;
      }
      .right-contents {
        padding-left: 140px;

        input {
          border: none;
          margin-bottom: 0 !important;
        }
        select {
          position: relative;
          border: none;
          margin-bottom: 0 !important;
        }
        #disabled-option {
          color: @color-input-placeholder;
        }
      }
    }

    .title {
      font-size: 30px;
      font-weight:600;
      margin-bottom:18px;
    }
    .sub-title {
      font-size: 20px;
      font-weight:300;
      margin-bottom: 4px;
    }
    .third-title {
      font-size: 15px;
      font-weight:600;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      height: @height;
      font-size: 20px !important;
      font-weight: 400;
      margin-bottom: 5px !important;

      &:focus,
      &:active,
      &:visited {
        -webkit-transition: all 500ms;
        -moz-transition: all 500ms;
        -ms-transition: all 500ms;
        -o-transition: all 500ms;
        transition: all 500ms;
        border: 1px solid @color-link;
      }
    }
    label {
      .upload-label-basic;
      border: 1px solid @color-font-base;
      margin-top: 10px;
      font-size: @font-size-button;
      font-weight: @font-weight-button;
    }
    textarea {
      font-size: 20px !important;
      font-weight: 400 !important;

      &:focus,
      &:active,
      &:visited {
        -webkit-transition: all 500ms;
        -moz-transition: all 500ms;
        -ms-transition: all 500ms;
        -o-transition: all 500ms;
        transition: all 500ms;
        border: 1px solid @color-link;
      }
    }
    select {
      font-size: 20px !important;
      font-weight: 400 !important;
      margin-bottom: 5px !important;
      height: @height !important;
    }
    button {
      font-size: @font-size-button;
      font-weight: @font-weight-button;
      border: 1px solid @color-orange;
    }

    .big-mark {
      position: absolute;
      font-size: 28px;
      font-weight: 100;
      right: @mark-right-amount;
    }
    .small-mark {
      position: absolute;
      font-size: 22px;
      font-weight: 100;
      width: 30px;
      color: @color-font-base;
      right: @small-mark-right-amount
    }
    /* Global CSS */

    /*<!--.right-container {-->*/
      /*<!--position: absolute;-->*/
      /*<!--z-index: 2;-->*/
      /*<!--width: 310px;-->*/
      /*<!--right: 0;-->*/
      /*<!--background-color: @color-white;-->*/

      /*<!--.title {-->*/
        /*<!--font-size: 28px !important;-->*/
        /*<!--font-weight:400 !important;-->*/
        /*<!--margin-bottom:0 !important;-->*/
      /*<!--}-->*/
      /*<!--.sub-title {-->*/
        /*<!--font-size: 18px !important;-->*/
        /*<!--font-weight:300 !important;-->*/
        /*<!--margin-bottom: 4px !important;-->*/
      /*<!--}-->*/

      /*<!--.each-container {-->*/
        /*<!--margin-bottom: 30px;-->*/
      /*<!--}-->*/

      /*<!--.caption {-->*/
        /*<!--margin-top: 60px;-->*/
        /*<!--font-weight:700;-->*/
      /*<!--}-->*/
    /*<!--}-->*/

    .account-name-container {
      position: relative;

      .required-circle {
        left: 80px;
      }

      #account-name-mark {
        top: 105px;
        right: -3px;
        color: red;
      }
    }

    .short-description-container {
      .third-title {
        text-align: right;
        margin-right: 3px;
      }
    }

    .description-container {
      position: relative;

      #description-mark {
        bottom: @mark-bottom-amount;
      }
    }

    .information-container {
      position: relative;

      #products-mark {
        top: 104px;
        /*right: 11px;*/
        left: 15px;
      }
      #website-mark {
        top: 160px;
        /*right: 18px;*/
        left: 18px;
      }
      #phone-mark {
        top: 216px;
        /*right: 19px;*/
        left: 19px;
      }
      #established-date-mark {
        top: 270px;
        /*right: 17px;*/
        left: 17px;
      }
      #country-mark {

      }
      #state-mark {

      }
      #city-mark {

      }
      #postal-code-mark {

      }
      #street-address-mark {

      }
      #street-address-detail-mark {

      }
    }

    .history-container {
      position: relative;
      #history-mark {
        bottom: @mark-bottom-amount;
      }
    }

    .certification-container {}

    .confirm-container {
      .title {
        margin-bottom: 0 !important;
      }
      .sub-title {
        margin-bottom: 40px !important;
      }
      button {
        font-size: @font-size-button;
        font-weight: @font-weight-button;
      }
    }
  }
</style>
