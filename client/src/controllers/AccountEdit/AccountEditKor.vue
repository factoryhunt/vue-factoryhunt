<template>
  <div class="page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <navigation-bar-admin></navigation-bar-admin>

    <div class="detail-contents">
      <!-- Right-side sticky UI container -->
      <div class="right-container">
        <div class="sticky-container">
          <div class="each-container">
            <p class="title">{{ msg.sticky.first.title }}</p>
            <p class="sub-title">{{ msg.sticky.first.subTitle }}</p>
          </div>
          <div class="each-container">
            <p class="title">{{ msg.sticky.second.title }}</p>
            <p class="sub-title">{{ msg.sticky.second.subTitle }}</p>
          </div>
          <div class="each-container">
            <p class="title">{{ msg.sticky.third.title }}</p>
            <p class="sub-title">{{ msg.sticky.third.subTitle }}</p>
          </div>
          <div class="caption-container">
            <p class="caption">{{ msg.sticky.caption }}</p>
          </div>
        </div>
      </div>

      <!-- Left-side UI container -->
      <div class="left-container">

        <!-- Company Main Image -->
        <form enctype="multipart/form-data">
          <div class="main-image-container input-container">
            <p class="title">{{ msg.mainImage.title }}</p>
            <p class="sub-title">{{ msg.mainImage.subTitle }}</p>
            <img v-if="value.mainImageUrl" :src="value.mainImageUrl">
            <img v-else-if="value.mainImageFile" :src="value.mainImageFile">
            <img v-else src="../../assets/temp_01.png">
            <label for="main-image-input">{{ msg.fileSelect }}</label>
            <input id="main-image-input" class="file" type="file" name="main_image_file[]" @change="onMainImageChanged($event.target.name, $event.target.files)" accept="image/*">
          </div>
        </form>

        <!-- Company Logo Image -->
        <form enctype="multipart/form-data">
          <div class="logo-container input-container">
            <p class="title">{{ msg.logoImage.title }}</p>
            <p class="sub-title">{{ msg.logoImage.subTitle }}</p>
            <img v-if="value.logoUrl" :src="value.logoUrl">
            <img v-else src="../../assets/fh_logo_512.png">
            <label for="logo-image-input">{{ msg.fileSelect }}</label>
            <input id="logo-image-input" class="file" type="file" name="logo_image_file[]" @change="onLogoImageChanged($event.target.name, $event.target.files)" accept="image/*">
          </div>
        </form>

        <!-- Company Domain -->
        <div class="domain-container input-container">
          <p class="title">{{ msg.domain.title }}</p>
          <p class="sub-title">{{ msg.domain.subTitle }}</p>
          <p class="third-title">도메인 주소: factoryhunt.com/{{ value.domain }}</p>
          <input id="domain-input" type="text" :placeholder="placeholder.domain" v-model="value.domain" :value="value.domain" @keyup="domainInputPressed" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
          <i id="domain-mark" class="big-mark" aria-hidden="true"></i>
          <p class="hidden-title">{{ msg.domain.hiddenTitle }}</p>
          <spinkit id="domain-spinkit"></spinkit>
        </div>

        <!-- Company Name -->
        <div class="account-name-container input-container">
          <p class="title">{{ msg.accountName.title }}</p>
          <p class="sub-title">{{ msg.accountName.subTitle }}</p>
          <input id="account-name-input" type="text" :placeholder="placeholder.accountName" v-model="value.accountName" :value="value.accountName" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
          <p class="hidden-title">{{msg.accountName.hiddenTitle}}</p>
          <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
        </div>

        <!-- Company Description -->
        <div class="description-container input-container">
          <p class="title">{{ msg.description.title }}</p>
          <p class="sub-title">{{ msg.description.subTitle }}</p>
          <textarea id="description-input" rows="10" :placeholder="placeholder.description" v-model="value.description" :value="value.description"></textarea>
          <i id="description-mark" class="small-mark" aria-hidden="true"></i>
        </div>

        <!-- Company Information -->
        <div class="information-container input-container">
          <p class="title">{{ msg.information.title }}</p>
          <p class="sub-title">{{ msg.information.subTitle }}</p>
          <input type="text" :placeholder="placeholder.information.products" v-model="value.products" :value="value.products">
          <input id="website-input" type="text" :placeholder="placeholder.information.website" v-model="value.website" :value="value.website" spellcheck="false">
          <input id="phone-input" type="text" :placeholder="placeholder.information.phone" v-model="value.phone" :value="value.phone">
          <input id="established-input" type="text" maxlength="10" :placeholder="placeholder.information.establishedDate" v-model="value.establishedDate" :value="value.establishedDate">
          <p class="sub-title" style="margin-top: 12px">{{ msg.information.address }}</p>
          <select v-model="value.country">
            <option disabled value="">{{ placeholder.information.country }}</option>
            <option>대한민국</option>
          </select>
          <input type="text" :placeholder="placeholder.information.state" v-model="value.state" :value="value.state">
          <input type="text" :placeholder="placeholder.information.city" v-model="value.city" :value="value.city">
          <input type="text" maxlength="5" :placeholder="placeholder.information.postalCode" v-model="value.postalCode" :value="value.postalCode" @keyup="checkPostalCode(value.postalCode)">
          <input type="text" :placeholder="placeholder.information.streetAddress" v-model="value.streetAddress" :value="value.streetAddress">
          <input type="text" :placeholder="placeholder.information.streetAddressDetail" v-model="value.streetAddressDetail" :value="value.streetAddressDetail">
          <i id="products-mark" class="small-mark" aria-hidden="true"></i>
          <i id="website-mark" class="small-mark" aria-hidden="true"></i>
          <i id="phone-mark" class="small-mark" aria-hidden="true"></i>
          <i id="established-date-mark" class="small-mark" aria-hidden="true"></i>
          <i id="country-mark" class="small-mark" aria-hidden="true"></i>
          <i id="state-mark" class="small-mark" aria-hidden="true"></i>
          <i id="city-mark" class="small-mark" aria-hidden="true"></i>
          <i id="street-address-mark" class="small-mark" aria-hidden="true"></i>
          <i id="street-address-detail-mark" class="small-mark" aria-hidden="true"></i>
        </div>

        <!-- Company History -->
        <div class="history-container input-container">
          <p class="title">{{ msg.history.title }}</p>
          <p class="sub-title">{{ msg.history.subTitle }}</p>
          <textarea rows="9" :placeholder="placeholder.history" v-model="value.history" :value="value.history"></textarea>
          <i id="history-mark" class="small-mark" aria-hidden="true"></i>
        </div>

        <!-- Company Certification -->
        <div class="certification-container input-container">
          <p class="title"> {{ msg.certification.title }} </p>
          <p class="sub-title"> {{ msg.certification.subTitle }} </p>
          <p class="third-title"> {{ msg.certification.thirdTitle }} </p>
          <label for="certification-input">{{ msg.fileSelect }}</label>
          <input id="certification-input" multiple class="file" type="file" name="img_files[]">
          <!--@change="filesChange($event.target.name, $event.target.files)"-->
        </div>

        <!-- Confirm and Submit -->
        <div class="confirm-container input-container sticky-stopper">
          <p class="title"> {{ msg.confirm.title }} </p>
          <p class="sub-title"> {{ msg.confirm.subTitle }} </p>
          <button class="button-orange" @click="onEditButton(value)">{{ msg.confirm.edit }}</button>
        </div>
      </div> <!-- left-container -->
    </div> <!-- detail-contents -->
  </div>
</template>

<script>
  import cookie from '../../assets/js/cookie'
  import NavigationBarAdmin from '../../components/NavigationBars/NavigationBarAdmin'
  import FooterBar from '../../components/FooterBar'
  import Spinkit from '../../components/Spinkit/Spinkit'

  export default {
    metaInfo: {
      title: '회사정보 수정 | Factory Hunt'
    },
    components: {
      NavigationBarAdmin,
      FooterBar,
      Spinkit
    },
    data () {
      return {
        account: {},
        products: [],
        rawDomain: this.$route.params.company,
        value: {
          mainImageUrl: '',
          mainImageFile: '',
          logoUrl: '',
          logoImageFile: '',
          domain: '',
          accountName: '',
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
        placeholder: {
          domain: '도메인 주소',
          accountName: '(주)팩토리헌트',
          description: '회사가 얼만큼 그 제품에 대해 전문성이 있는지 간결하게 작성하는게 좋습니다.',
          information: {
            products: '제조 품목',
            website: '웹사이트 | www.factoryhunt.com',
            phone: '연락처 | +82-2-1234-5678, +82-1688-1234',
            establishedDate: '설립연도 | 1970-01-01',
            country: '국가',
            state: '도 | 경기도',
            city: '시 | 화성시',
            postalCode: '우편번호 | 01234',
            streetAddress: '도로명 주소 | 공단대로 공단빌딩',
            streetAddressDetail: '상세주소 | 2층 1호'
          },
          history: '2000년 1월 1일 - 회사 설립 \n' +
          '2000년 10월 1일 - 수출 규모 10억원 달성\n\n' +
          '2003년 1월 1일 - 수출 규모 100억원 달성',
          certification: ''
        },
        msg: {
          fileSelect: '파일 선택',
          sticky: {
            first: {
              title: '홈페이지',
              subTitle: '정보를 몇 개 입력하는 것만으로 멋진 공장 홈페이지를 무료로 가질 수 있습니다!'
            },
            second: {
              title: '검색 엔진',
              subTitle: '모든 정보를 입력하면 바이어들에게 홈페이지가 노출됩니다.'
            },
            third: {
              title: '인증',
              subTitle: '공장이 활발히 제품을 생산하고 있다는 것을 알려주세요. 검수 후 바이어들에게 연결될 수 있도록 도와드리겠습니다.'
            },
            caption: '모든 정보를 한 번에 입력하지 않아도 됩니다. 입력할 수 있는 것만 입력하고 수정해도 괜찮습니다.'
          },
          mainImage: {
            title: '대표 이미지',
            subTitle: '홈페이지에 가장 먼저 노출되고 강조되는 부분입니다. 가장 멋진 사진을 올려주세요!'
          },
          logoImage: {
            title: '회사 로고',
            subTitle: '회사를 상징하는 로고입니다.'
          },
          domain: {
            title: '도메인 주소',
            subTitle: '팩토리헌트에서 사용할 도메인 주소를 입력해주세요. 이 주소는 회사 이름을 나타내는 단어의 조합들로 입력하면 좋습니다.',
            hiddenTitle: ''
          },
          accountName: {
            title: '회사명',
            subTitle: '사업자등록증의 회사명과 일치시켜주세요.',
            hiddenTitle: ''
          },
          description: {
            title: '회사 소개',
            subTitle: '회사를 소개해주세요. 양식은 자유입니다.'
          },
          information: {
            title: '회사 정보',
            subTitle: '표시되는 형식에 맞춰 회사 정보를 정확히 입력해주세요.',
            address: '주소입력 - 이 항목을 정확히 입력해야 지도에 위치가 정확히 표시됩니다.'
          },
          history: {
            title: '연혁',
            subTitle: '회사가 보내온 시간을 입력해주세요.'
          },
          certification: {
            title: '인증서',
            subTitle: '귀사에서 취급하는 제품이 기관으로부터 당당히 인증을 받았다는 것을 증명해주세요. 입력해야할 필수 항목은 아니지만 바이어들에게 신뢰를 줄 수 있습니다.',
            thirdTitle: '사업자등록증, 공장등록증, 제품인증서..'
          },
          confirm: {
            title: '확인 및 수정',
            subTitle: '수정할 정보를 다시 한 번 확인하고 내용이 맞다면 수정하기 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!',
            edit: '수정하기'
          }
        }
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.validateUser()
    },
    mounted () {
      this.applyStickyCSS()
    },
    computed: {
      getLocation () {
        const street = this.account.mailing_street_address_english
        const city = this.account.mailing_city_english
        const state = this.account.mailing_state_english
        const country = this.account.mailing_country_english
        return state ? street + ', ' + city + ', ' + state + ', ' + country : street + ', ' + city + ', ' + country
      },
      getToken () {
        return cookie.getCookie('nekot')
      },
      getAccountId () {
        return this.account.account_id
      }
    },
    methods: {
      titleTemplate (account) {
        return account ? `${account} - Factory Hunt` : ' - Supplier'
      },
      validateUser () {
        const data = {
          headers: {
            'x-access-token': this.getToken
          }
        }
        this.$http.get('/api/auth/check', data)
          .then(() => {
//            const contactId = res.data.info.id
            this.toggle.isUserAdmin = true
            this.fetchAccount(this.rawDomain)
          })
          .catch(() => {
            alert('로그인 정보가 만료되었습니다.')
            this.toggle.isUserAdmin = false
            this.$router.push({
              path: '/login'
            })
          })
      },
      fetchAccount (company) {
        this.$http.get(`/api/data/account/company/${company}`)
          .then(response => {
            if (!response.data) {
              this.$router.push({ path: '/error' })
            }
            this.account = response.data
            this.applyLocalData(this.account)
            this.checkAllInputOnce(this.value)
            this.applyInputFocusBlurEvent()
          })
      },
      // update server data to local data
      applyLocalData (account) {
        this.value.mainImageUrl = account.account_image_url_1
        this.value.logoUrl = account.thumbnail_url
        this.value.domain = account.domain
        this.value.accountName = account.account_name
        this.value.description = account.company_short_description
        this.value.products = account.products
        this.value.phone = account.phone
        this.value.website = account.website
        this.value.establishedDate = this.getYear(account.established_date)
        this.value.country = account.mailing_country
        this.value.state = account.mailing_state
        this.value.city = account.mailing_city
        this.value.postalCode = account.mailing_postal_code
        this.value.streetAddress = account.mailing_street_address
        this.value.streetAddressDetail = account.mailing_street_address_2
        this.value.history = account.history
      },
      getYear (year) {
        if (year === '0000-00-00') {
          return ''
        } else {
          year = year.substring(0, 10)
          return year
        }
      },
      // not allowed capital letters
      domainInputPressed () {
        this.value.domain = this.value.domain.toLowerCase()
      },
      checkAllInputOnce (value) {
        this.checkDomain(value.domain)
        this.checkAccountName(value.accountName)
      },
      // domain exist checking
      onMainImageChanged (fieldName, fileList) {
        console.log(fieldName)
        console.log(fileList[0])

        if (!fileList) return
      },
      onLogoImageChanged (fieldName, fileList) {
        console.log(fieldName)
        console.log(fileList[0])

        if (!fileList) return
//        $('#main-image-input')
        var logoFileReader = new FileReader()
        console.log('reader created')
        logoFileReader.onload = function (event) {
//          console.log(event)
        }
        logoFileReader.readAsDataURL(fileList[0])
        console.log(logoFileReader)
        console.log('result:', logoFileReader.result)
        this.value.mainImageFile = logoFileReader.result
      },
      checkDomain (domain) {
//        const domainInput = $('.domain-container > input')
        const spinkitInput = $('#domain-spinkit')
        const domainMark = $('.domain-container > #domain-mark')
        const hiddenTitle = $('.domain-container > .hidden-title')

        // when domain field empty
        if (!this.value.domain) {
          this.toggle.isDomainAvailable = false
          this.msg.domain.hiddenTitle = '필수 입력 항목입니다.'
          domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
          hiddenTitle.css({'color': 'red'})
          return
        }

        // not allowed only number
        const numCheck = /^[0-9]*$/
        if (numCheck.test(this.value.domain)) {
          this.toggle.isDomainAvailable = false
          this.msg.domain.hiddenTitle = '도메인은 문자를 반드시 포함해야 합니다.'
          domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
          hiddenTitle.css({'color': 'red'})
          return
        }

        // not allowed static domain string (ex:about, contact-us ..)

        // loading start
        domainMark.removeClass()
        spinkitInput.removeClass().addClass('spinkit-input')

        // after loading
        this.$http.get(`/api/data/account/company/${domain}`)
          .then(res => {
            spinkitInput.removeClass().addClass('invisible')

            if (res.data) {
              // when domain already existed
              this.toggle.isDomainAvailable = false
              this.msg.domain.hiddenTitle = '이미 존재하는 주소입니다. 다른 주소를 사용해주세요.'
              domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
              hiddenTitle.css({'color': 'red'})

              // when it is mine
              if (res.data.domain === this.value.domain) {
                this.toggle.isDomainAvailable = true
                this.msg.domain.hiddenTitle = ''
                domainMark.removeClass().addClass('big-mark fa fa-check').css({'color': 'green'})
                hiddenTitle.css({'color': '#484848'})
              } // when available
            } else {
              this.toggle.isDomainAvailable = true
              this.msg.domain.hiddenTitle = ''
              domainMark.removeClass().addClass('big-mark fa fa-check').css({'color': 'green'})
              hiddenTitle.css({'color': '#484848'})
            }
          }) // Error
          .catch(() => {
            this.toggle.isDomainAvailable = false
            this.msg.domain.hiddenTitle = '서버 오류입니다. 다시 시도해주세요.'
            domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
          })
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

        if (!this.toggle.isDomainAvailable) {
          $('#domain-input').focus()
          return
        }

        if (!this.toggle.isAccountNameAvailable) {
          $('#account-name-input').focus()
          return
        }

        $('#modal-spinkit').removeClass().addClass('spinkit-modal')

        // props
        const data = {
          account_name: value.accountName,
          domain: value.domain,
          company_short_description: value.description,
          products: value.products,
          website: value.website,
          phone: value.phone,
          established_date: value.establishedDate,
          mailing_country: value.country,
          mailing_state: value.state,
          mailing_city: value.city,
          mailing_postal_code: value.postalCode,
          mailing_street_address: value.streetAddress,
          mailing_street_address_2: value.streetAddressDetail,
          history: value.history
        }
        // request
        this.$http.post(`/api/data/account/update/${this.getAccountId}`, data)
          .then(res => {
            this.routeHomePage()
          })
          .catch(() => {
            $('#modal-spinkit').removeClass()
            alert('update failed')
          })
      },
      routeHomePage () {
        this.$router.push({path: `/${this.value.domain}`})
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
        const domainInput = $('#domain-input')
        const accountNameInput = $('#account-name-input')
        const accountNameMark = $('#account-name-mark')
        const hiddenTitle = $('.account-name-container > .hidden-title')

        domainInput.blur(() => {
          this.checkDomain(this.value.domain)
        })

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
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../assets/less/global';

  /* Global CSS */
  // For fixed navigation-bar
  ::-webkit-input-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  }
  ::-moz-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  } /* firefox 19+ */
  :-ms-input-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  } /* ie */
  input:-moz-placeholder {
    color: @color-input-placeholder;
    font-weight: 200;
  }

  .page-container {
    margin-top: 80px;
  }

  .title {
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

  .left-container {

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

    /* Global CSS */
    .page-container {
      margin-top: 130px;
    }

    .input-container {
      margin-bottom: 60px;
    }

    .title {
      font-size: 32px !important;
      font-weight:700 !important;
      margin-bottom:18px !important;
    }
    .sub-title {
      font-size: 20px !important;
      font-weight:300 !important;
      margin-bottom: 4px !important;
    }
    .third-title {
      font-size: 16px !important;
      font-weight:600 !important;
      margin-bottom: 4px !important;
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
        border: 1px solid @color-orange;
      }
    }
    label {
      border: 1px solid @color-font-base;
      margin-top: 10px;
      font-size: 22px;
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
        border: 1px solid @color-orange;
      }
    }
    select {
      font-size: 20px !important;
      font-weight: 400 !important;
      margin-bottom: 5px !important;
      height: @height !important;
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
      color: red;
      right: @small-mark-right-amount
    }
    /* Global CSS */

    .right-container {
      position: absolute;
      z-index: 3 !important;
      width: 310px;
      right: 0;
      background-color: @color-white;

      .title {
        font-size: 28px !important;
        font-weight:400 !important;
        margin-bottom:0 !important;
      }
      .sub-title {
        font-size: 18px !important;
        font-weight:300 !important;
        margin-bottom: 4px !important;
      }

      .each-container {
        margin-bottom: 30px;
      }

      .caption {
        margin-top: 60px;
        font-weight:700;
      }
    }

    .left-container {
      position: relative;
      padding-right: 410px;

      .image-container {
        img {
          width: 100% !important;
          display: block;
        }
      }

      .logo-container {
        position: relative;

        img {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50px;
          border: 1px solid @color-light-grey;
          top: 0;
          left: 260px;
        }
      }

      .domain-container {
        position: relative;

        #domain-mark {
          top: 161px;
        }

        .spinkit-input {
          position: absolute;
          top: 161px;
          right: @mark-right-amount;
        }
      }

      .account-name-container {
        position: relative;

        #account-name-mark {
          top: 111px;
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
        }
        #website-mark {

        }
        #phone-mark {

        }
        #established-date-mark {

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
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }
</style>
