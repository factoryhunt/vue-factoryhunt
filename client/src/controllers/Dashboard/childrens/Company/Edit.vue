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
        <p class="title">{{ msg.accountName.title }}</p>
        <i class="fa fa-circle required-circle" aria-hidden="true"><span> 필수입력</span></i>
        <p class="sub-title">{{ msg.accountName.subTitle }}</p>
        <input required pattern="[가-힣A-Za-z0-9 ().,]{2,50}" title="2자 이상 50자 이하로 제한됩니다. 특수기호는 ( ) . , 만 사용 가능합니다." id="account-name-input" type="text" :placeholder="placeholder.accountName" v-model="value.accountName" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <p class="hidden-title">{{msg.accountName.hiddenTitle}}</p>
        <i id="account-name-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Company Short Description -->
      <div class="short-description-container input-container">
        <p class="title">슬로건</p>
        <p class="sub-title">귀사를 한 문장으로 표현해주세요.</p>
        <input id="short-description-input" maxlength="50" @keyup="countInputLength" v-model="value.shortDescription">
        <p class="third-title">{{ 50 - value.shortDescriptionCount }}</p>
      </div>

      <!-- Company Long Description -->
      <div class="description-container input-container">
        <p class="title">{{ msg.description.title }}</p>
        <p class="sub-title">{{ msg.description.subTitle }}</p>
        <textarea id="description-input" maxlength="25000" rows="10" :placeholder="placeholder.description" v-model="value.description"></textarea>
      </div>

      <!-- Company Information -->
      <div class="information-container input-container">
        <p class="title">회사 정보</p>
        <p class="sub-title">각 항목에 알맞은 정보를 입력해주세요.</p>
        <!-- Products -->
        <div class="box-container">
          <div class="left-contents">제조 품목</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="공업용 자재, 철강.." v-model="value.products"></div>
        </div>
        <!-- Website -->
        <div class="box-container">
          <div class="left-contents">웹사이트</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="www.factoryhunt.co.kr" v-model="value.website" spellcheck="false"></div>
        </div>
        <!-- Phone -->
        <div class="box-container">
          <div class="left-contents">연락처</div>
          <div class="right-contents"><input type="text" maxlength="21" placeholder="+82-2-1234-5678" v-model="value.phone"></div>
        </div>
        <!-- Established Year -->
        <div class="box-container">
          <div class="left-contents">설립연도</div>
          <div class="right-contents"><input type="text" maxlength="10" placeholder="1970-01-01" v-model="value.establishedDate"></div>
        </div>
        <p class="sub-title" style="margin-top: 12px">도로명 주소 입력 - 이 항목을 정확히 입력해야 지도에 정확한 위치가 표시됩니다.</p>
        <!-- Country -->
        <div class="box-container">
          <div class="left-contents">국가</div>
          <div class="right-contents">
            <select v-model="value.country">
              <option disabled value="">국가를 선택해주세요</option>
              <option>대한민국</option>
            </select>
          </div>
        </div>
        <!-- State -->
        <div class="box-container">
          <div class="left-contents">도</div>
          <div class="right-contents"><input type="text" maxlength="15" placeholder="경기도, 경상북도.. (서울은 빈칸)" v-model="value.state"></div>
        </div>
        <!-- City -->
        <div class="box-container">
          <div class="left-contents">시, 군, 구</div>
          <div class="right-contents"><input type="text" maxlength="15" placeholder="화성시, 남양주시.." v-model="value.city"></div>
        </div>
        <!-- Street Address -->
        <div class="box-container">
          <div class="left-contents">도로명 주소</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="공단대로" v-model="value.streetAddress" @keyup="checkPostalCode(value.postalCode)"></div>
        </div>
        <!-- Street Address Detail -->
        <div class="box-container">
          <div class="left-contents">상세 주소</div>
          <div class="right-contents"><input type="text" maxlength="100" placeholder="공단빌딩 2층 3호" v-model="value.streetAddressDetail"></div>
        </div>
        <!-- Postal Code -->
        <div class="box-container">
          <div class="left-contents">우편번호</div>
          <div class="right-contents"><input type="text" pattern="[0-9]{5}" title="5자리의 숫자로만 구성해주세요." placeholder="01542" v-model="value.postalCode"></div>
        </div>
      </div>

      <!-- Company History -->
      <div class="history-container input-container">
        <p class="title">{{ msg.history.title }}</p>
        <p class="sub-title">{{ msg.history.subTitle }}</p>
        <textarea rows="10" maxlength="25000" :placeholder="placeholder.history" v-model="value.history"></textarea>
        <i id="history-mark" class="small-mark" aria-hidden="true"></i>
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <p class="title"> {{ msg.confirm.title }} </p>
        <p class="sub-title"> {{ msg.confirm.subTitle }} </p>
        <button class="button-orange">{{ msg.confirm.edit }}</button>
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
      title: '회사 정보 수정 | Factory Hunt'
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
        placeholder: {
          accountName: '(주)팩토리헌트',
          shortDescription: '회사를 소개하는 간단한 소개 문구를 작성해주세요.',
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
            subTitle: '회사를 상징하는 로고입니다.',
            thirdTitle: '로고 사이즈는 정사각형에 최적화되어 있습니다.'
          },
          accountName: {
            title: '회사명',
            subTitle: '사업자등록증의 회사명과 일치시켜주세요.',
            hiddenTitle: ''
          },
          shortDescription: {
            title: '회사 소개',
            subTitle: '회사를 소개하는 짧은 문구를 작성해주세요.',
            thirdTitle: '200'
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
        this.value.accountName = account.account_name
        this.value.description = account.company_description
        this.value.shortDescription = account.company_short_description
        this.value.shortDescriptionCount = (account.company_short_description).length
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
          account_name: value.accountName,
          company_short_description: value.shortDescription,
          company_description: value.description,
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
        this.$http.put(`/api/data/account/${this.getAccountId}`, data)
          .then(() => {
            $('#modal-spinkit').removeClass()
            alert('수정 되었습니다.')
            window.scrollTo(0, 0)
            location.reload()
          })
          .catch(() => {
            $('#modal-spinkit').removeClass()
            alert('수정 실패. 다시 시도해주세요.')
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
