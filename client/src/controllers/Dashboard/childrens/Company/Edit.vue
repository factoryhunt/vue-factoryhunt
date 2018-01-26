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
        <p class="title" v-lang.name.title></p>
        <span class="required-text" v-lang.name.required></span>
        <p class="sub-title" v-lang.name.desc></p>
        <input required pattern="[A-Za-z0-9 ().,]{2,50}" :title="getNameInputTitle" id="account-name-input" type="text" :placeholder="getNamePlaceholder" v-model="value.accountName" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <p class="hidden-title"></p>
        <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Company Short Description -->
      <div class="short-description-container input-container">
        <p class="title" v-lang.slogan.title></p>
        <p class="sub-title" v-lang.slogan.desc></p>
        <input id="short-description-input" maxlength="150" :title="getSloganInputTitle" pattern="[A-Za-z0-9 .,']{2,150}" @keyup="countInputLength" :placeholder="getSloganPlaceholder" v-model="value.shortDescription">
        <p class="third-title">{{ 150 - value.shortDescriptionCount }}</p>
      </div>

      <!-- Company Long Description -->
      <div class="description-container input-container">
        <p class="title" v-lang.description.title></p>
        <p class="sub-title" v-lang.description.desc></p>
        <textarea id="description-input" pattern="[A-Za-z0-9 ().,]{1,25000}" :title="getDescriptionInputTitle" maxlength="25000" rows="10" :placeholder="getDescriptionPlaceholder" v-model="value.description"></textarea>
      </div>

      <!-- Company Information -->
      <div class="information-container input-container">
        <p class="title" v-lang.company.title></p>
        <p class="sub-title" v-lang.company.desc></p>
        <!-- Products -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.products.title></div>
          <div class="right-contents"><input type="text" pattern="[A-Za-z0-9 ',-]{1,100}" :title="getProductsInputTitle" maxlength="100" :placeholder="getProductsPlaceholder" v-model="value.products"></div>
        </div>
        <!-- Website -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.website.title></div>
          <div class="right-contents"><input type="text" pattern="[A-Za-z0-9 .]{1,100}" :title="getWebsiteInputTitle" maxlength="100" :placeholder="getWebsitePlaceholder" v-model="value.website" spellcheck="false"></div>
        </div>
        <!-- Phone -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.phone.title></div>
          <div class="right-contents"><input type="text" maxlength="21" pattern="[0-9 +-]{1,21}" :title="getPhoneInputTitle" :placeholder="getPhonePlaceholder" v-model="value.phone"></div>
        </div>
        <!-- Established Year -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.year.title></div>
          <div class="right-contents"><input type="text" maxlength="10" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" title ="YYYY-MM-DD" :placeholder="getYearPlaceholder" v-model="value.establishedDate"></div>
        </div>
        <p class="sub-title" style="margin-top: 12px" v-lang.company.desc2></p>
        <!-- Country -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.country.title></div>
          <div class="right-contents">
            <select required title="required" v-model="value.country">
              <option id="disabled-option" disabled value="" v-lang.company.country.defaultValue></option>
              <option v-for="country in value.country_list" :value="country.country_name">{{country.country_name}}</option>
            </select>
          </div>
        </div>
        <!-- State -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.state.title></div>
          <div class="right-contents"><input type="text" maxlength="50" pattern="[A-Za-z -]{1,50}" :title="getStateInputTitle" :placeholder="getStatePlaceholder" v-model="value.state"></div>
        </div>
        <!-- City -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.city.title></div>
          <div class="right-contents"><input type="text" maxlength="50" pattern="[A-Za-z -]{1,50}" :title="getCityInputTitle" :placeholder="getCityPlaceholder" v-model="value.city"></div>
        </div>
        <!-- Street Address -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.street.title></div>
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()]{1,50}" :title="getStreetInputTitle" :placeholder="getStreetPlaceholder" v-model="value.streetAddress" @keyup="checkPostalCode(value.postalCode)"></div>
        </div>
        <!-- Street Address Detail -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.street2.title></div>
          <div class="right-contents"><input type="text" maxlength="100" pattern="[A-Za-z0-9 -.,#()]{1,50}" :title="getStreetInputTitle" :placeholder="getStreet2Placeholder" v-model="value.streetAddressDetail"></div>
        </div>
        <!-- Postal Code -->
        <div class="box-container">
          <div class="left-contents" v-lang.company.postal.title></div>
          <div class="right-contents"><input type="text" pattern="[0-9-]{1,10}" :title="getPostalInputTitle" :placeholder="getPostalPlaceholder" v-model="value.postalCode"></div>
        </div>
      </div>

      <!-- Company History -->
      <div class="history-container input-container">
        <p class="title" v-lang.history.title></p>
        <p class="sub-title" v-lang.history.desc></p>
        <textarea rows="10" maxlength="25000" :title="getDescriptionInputTitle" :placeholder="getHistoryPlaceholder" v-model="value.history"></textarea>
        <i id="history-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <p class="title" v-lang.save.title></p>
        <p class="sub-title" v-lang.save.desc></p>
        <button class="button-orange" v-lang.save.button></button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import country from '../../../../assets/models/country.json'
  import Spinkit from '../../../../components/Spinkit/Spinkit'
  export default {
    metaInfo: {
      title: 'Edit Company information | Factory Hunt'
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
      Spinkit
    },
    data () {
      return {
        value: {
          country_list: country,
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
        }
      }
    },
    messages: {
      eng: {
        name: {
          title: 'Company Name',
          required: '<i class="fa fa-circle" aria-hidden="true"></i> Required field',
          desc: 'Use the official company name from the business registration certificate.',
          placeholder: 'Factory Hunt, Inc.',
          inputTitle: 'It must be characters 2-50 and can only contain letters, numbers, periods, comma, and parentheses.'
        },
        slogan: {
          title: 'Slogan',
          desc: 'Describe your company in 150 characters or less.',
          placeholder: 'Factory Hunt is a global B2B platform.',
          inputTitle: 'It must be characters 2-150 and can only contain letters, numbers, periods, comma, and apostrophe.'
        },
        description: {
          title: 'Company Description',
          desc: 'Describe your company.',
          placeholder: 'Factory Hunt is a global B2B platform.',
          inputTitle: 'It must be less than 25000 digits.'
        },
        company: {
          title: 'Company Information',
          desc: 'Please fill out the information below.',
          desc2: 'Address Information',
          products: {
            title: 'Products',
            placeholder: 'LED, Light bulbs, ...',
            inputTitle: 'It must be 1-100 characters and can only contain letters, numbers, comma, hyphens, and apostrophe.'
          },
          website: {
            title: 'Website',
            placeholder: 'www.factoryhunt.com',
            inputTitle: 'It must be 1-100 characters and can only contain letters, numbers and periods.'
          },
          phone: {
            title: 'Phone',
            placeholder: '+1-917-1234-5678',
            inputTitle: 'It must be 1-21 characters and can only contain numbers, plus, and hyphens.'
          },
          year: {
            title: 'Established Date',
            placeholder: 'YYYY-MM-DD'
          },
          country: {
            title: 'Country',
            defaultValue: 'Select a country.'
          },
          state: {
            title: 'State',
            placeholder: 'California',
            inputTitle: 'It must be 1-50 characters and can only contain letters and hyphens.'
          },
          city: {
            title: 'City',
            placeholder: 'San Francisco',
            inputTitle: 'It must be 1-50 characters and can only contain letters and hyphens.'
          },
          street: {
            title: 'Street Address',
            placeholder: '7 Hacker Street',
            inputTitle: 'It must be 1-100 characters and can only contain letters, numbers, hyphens, periods, comma, hash, and parentheses'
          },
          street2: {
            title: 'Street Address 2',
            placeholder: 'Floor 2',
            inputTitle: 'It must be 1-100 characters and can only contain letters, numbers, hyphens, periods, comma, hash, and parentheses'
          },
          postal: {
            title: 'Postal Code',
            placeholder: '12345',
            inputTitle: 'It must be 1-10 characters and can only contain letters.'
          }
        },
        history: {
          title: 'Company History',
          desc: '',
          placeholder: '1984 : B brand founded\n' +
          '2000 : Management buyout from C and merged with D \n' +
          '2005 : E leads a management buyout of the Group as CEO, backed by F\n' +
          '2009 : Group opens Chinese facility\n' +
          '2013 : LED lighting range is launched Group’s Chinese facility expanded\n' +
          '2015 : Group achieves sales of $100m for the first time Offices opened in United States\n' +
          '2016 : Group’s Chinese facility is expanded to 52,500 square metres Offices opened in Hong Kong and Spain'
        },
        save: {
          title: 'Confirm and Save',
          desc: 'Please confirm the information above before you save it. Company information will be updated immediately.',
          button: 'Save'
        },
        alert: {
          success: 'Your information has been updated successfully.',
          fail: 'Information update failed. Please try again.'
        }
      },
      kor: {
        name: {
          title: '회사명',
          required: '<i class="fa fa-circle" aria-hidden="true"></i> 필수입력',
          desc: '사업자등록증의 회사명과 일치시켜주세요.',
          placeholder: 'Factory Hunt, Co., Ltd.',
          inputTitle: '2~50자의 영어와 숫자, 마침표, 쉼표 그리고 소괄호만 입력해주세요.'
        },
        slogan: {
          title: '슬로건',
          desc: '귀사를 한 문장으로 표현해주세요.',
          placeholder: 'Factory Hunt is a global B2B platform.',
          inputTitle: '2~150자의 영어와 숫자, 마침표, 쉼표, 그리고 작은따옴표만 입력해주세요.'
        },
        description: {
          title: '회사 소개',
          desc: '회사를 소개해주세요. 양식은 자유입니다.',
          placeholder: 'Factory Hunt is a global B2B platform.',
          inputTitle: '이 항목은 25000자로 제한됩니다.'
        },
        company: {
          title: '회사 정보',
          desc: '각 항목에 알맞은 정보를 입력해주세요.',
          desc2: '주소 - 도로명 주소로 정확히 입력해야 지도에 위치가 표시됩니다.',
          products: {
            title: '취급 품목',
            placeholder: 'LED, Light bulbs, ...',
            inputTitle: '1~100자의 영어와 숫자, 쉼표, 하이픈, 그리고 작은따옴표만 입력해주세요.'
          },
          website: {
            title: '웹사이트',
            placeholder: 'www.factoryhunt.com',
            inputTitle: '1~100자의 영어와 숫자, 그리고 마침표만 입력해주세요.'
          },
          phone: {
            title: '전화번호',
            placeholder: '+82-31-123-4567',
            inputTitle: '1~21자의 숫자와 더하기, 그리고 하이픈만 입력해주세요.'
          },
          year: {
            title: '설립일',
            placeholder: 'YYYY-MM-DD'
          },
          country: {
            title: '국가',
            defaultValue: '국가를 선택해주세요.'
          },
          state: {
            title: '도',
            placeholder: 'Gyeonggi-do',
            inputTitle: '1~50자의 영어와 하이픈만 입력해주세요.'
          },
          city: {
            title: '시, 군',
            placeholder: 'Bucheon-si',
            inputTitle: '1~50자의 영어와 하이픈만 입력해주세요.'
          },
          street: {
            title: '도로명 주소',
            placeholder: '20, Gongdan-daero',
            inputTitle: '1~100자의 영어와 숫자, 하이픈, 마침표, 쉼표, 샵, 그리고 소괄호만 입력해주세요.'
          },
          street2: {
            title: '상세 주소',
            placeholder: 'Gongdan Building Floor 2',
            inputTitle: '1~100자의 영어와 숫자, 하이픈, 마침표, 쉼표, 샵, 그리고 소괄호만 입력해주세요.'
          },
          postal: {
            title: '우편번호',
            placeholder: '12345',
            inputTitle: '1~10자의 숫자만 입력해주세요.'
          }
        },
        history: {
          title: '연혁',
          desc: '회사의 연혁을 입력해주세요.',
          placeholder: '1984 : B brand founded\n' +
          '2000 : Management buyout from C and merged with D \n' +
          '2005 : E leads a management buyout of the Group as CEO, backed by F\n' +
          '2009 : Group opens Chinese facility\n' +
          '2013 : LED lighting range is launched Group’s Chinese facility expanded\n' +
          '2015 : Group achieves sales of $100m for the first time Offices opened in United States\n' +
          '2016 : Group’s Chinese facility is expanded to 52,500 square metres Offices opened in Hong Kong and Spain'
        },
        save: {
          title: '확인 및 저장',
          desc: '저장할 정보를 다시 한 번 확인하고 내용이 맞다면 저장하기 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!',
          button: '저장하기'
        },
        alert: {
          success: '정보가 성공적으로 업데이트 되었습니다.',
          fail: '정보를 업데이트 실패. 다시 시도해주세요.'
        }
      }
    },
    computed: {
      ...mapGetters([
        'getContactId',
        'getAccountId',
        'isLoggedIn'
      ]),
      getNamePlaceholder () {
        return this.translate('name.placeholder')
      },
      getNameInputTitle () {
        return this.translate('name.inputTitle')
      },
      getSloganPlaceholder () {
        return this.translate('slogan.placeholder')
      },
      getSloganInputTitle () {
        return this.translate('slogan.inputTitle')
      },
      getDescriptionPlaceholder () {
        return this.translate('description.placeholder')
      },
      getDescriptionInputTitle () {
        return this.translate('description.inputTitle')
      },
      getProductsPlaceholder () {
        return this.translate('company.products.placeholder')
      },
      getProductsInputTitle () {
        return this.translate('company.products.inputTitle')
      },
      getWebsitePlaceholder () {
        return this.translate('company.website.placeholder')
      },
      getWebsiteInputTitle () {
        return this.translate('company.website.inputTitle')
      },
      getPhonePlaceholder () {
        return this.translate('company.phone.placeholder')
      },
      getPhoneInputTitle () {
        return this.translate('company.phone.inputTitle')
      },
      getYearPlaceholder () {
        return this.translate('company.year.placeholder')
      },
      getStatePlaceholder () {
        return this.translate('company.state.placeholder')
      },
      getStateInputTitle () {
        return this.translate('company.state.inputTitle')
      },
      getCityPlaceholder () {
        return this.translate('company.city.placeholder')
      },
      getCityInputTitle () {
        return this.translate('company.city.inputTitle')
      },
      getStreetPlaceholder () {
        return this.translate('company.street.placeholder')
      },
      getStreetInputTitle () {
        return this.translate('company.street.inputTitle')
      },
      getStreet2Placeholder () {
        return this.translate('company.street2.placeholder')
      },
      getPostalPlaceholder () {
        return this.translate('company.postal.placeholder')
      },
      getPostalInputTitle () {
        return this.translate('company.postal.inputTitle')
      },
      getHistoryPlaceholder () {
        return this.translate('history.placeholder')
      },
      getSuccessAlert () {
        return this.translate('alert.success')
      },
      getFailAlert () {
        return this.translate('alert.fail')
      }
    },
    methods: {
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
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
        this.value.products = account.products_english
        this.value.phone = account.phone
        this.value.website = account.website
        this.value.establishedDate = this.getYear(account.established_date)
        this.value.country = account.mailing_country_english
        this.value.state = account.mailing_state_english
        this.value.city = account.mailing_city_english
        this.value.postalCode = account.mailing_postal_code_english
        this.value.streetAddress = account.mailing_street_address_english
        this.value.streetAddressDetail = account.mailing_street_address_2_english
        this.value.history = account.history
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
          products_english: value.products,
          website: value.website,
          phone: value.phone,
          established_date: value.establishedDate,
          mailing_country_english: value.country,
          mailing_state_english: value.state,
          mailing_city_english: value.city,
          mailing_postal_code_english: value.postalCode,
          mailing_street_address_english: value.streetAddress,
          mailing_street_address_2_english: value.streetAddressDetail,
          history: value.history
        }
        // request
        this.$http.put(`/api/data/account/${this.getAccountId}`, data)
          .then(() => {
            this.onEditSuccess()
          })
          .catch(() => {
            this.onEditFail()
          })
      },
      showAlert (state, msg) {
        $(document).ready(() => {
          window.scrollTo(0, 0)
          const $alert = $('#alert')
          this.$store.commit('changeAlertState', {
            state,
            msg
          })
          $alert.show()
          setTimeout(() => {
            $('.alert-container').hide()
          }, 6000)
        })
      },
      onEditSuccess () {
        $('#modal-spinkit').removeClass()
        this.showAlert(true, this.getSuccessAlert)
      },
      onEditFail () {
        $('#modal-spinkit').removeClass()
        this.showAlert(false, this.getFailAlert)
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
    mounted () {
      this.applyAttributes()
      for (var i in this.value.country_list) {
        console.log(this.value.country_list[i])
      }
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
  .required-text {
    display: inline-block;
    vertical-align: top;
    padding-top: 8px;
    color: @color-orange;
    font-size: 11px;
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
