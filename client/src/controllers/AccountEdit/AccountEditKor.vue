<template>
  <div class="page-container">

    <spinkit></spinkit>

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
        <div class="main-image-container input-container">
          <p class="title">{{ msg.mainImage.title }}</p>
          <p class="sub-title">{{ msg.mainImage.subTitle }}</p>
          <div class="image-container">
            <img v-if="account.account_image_url_1" :src="account.account_image_url_1">
            <img v-else src="../../assets/temp_01.png">
          </div>
          <label for="main-image-input">파일 선택</label>
          <input id="main-image-input" class="file" type="file" name="img_files[]">
        </div>

        <!-- Company Logo Image -->
        <div class="main-image-container input-container">
          <p class="title">{{ msg.logoImage.title }}</p>
          <p class="sub-title">{{ msg.logoImage.subTitle }}</p>
          <div class="image-container">
            <img v-if="account.account_image_url_1" :src="account.thumbnail_url">
            <img v-else src="../../assets/fh_logo_512.png">
          </div>
          <label for="logo-image-input">파일 선택</label>
          <input id="logo-image-input" class="file" type="file" name="img_files[]">
        </div>

        <!-- Company Name -->
        <div class="account-name-container input-container">
          <p class="title">{{ msg.accountName.title }}</p>
          <p class="sub-title">{{ msg.accountName.subTitle }}</p>
          <input type="text" :placeholder="placeholder.companyName">
        </div>

        <!-- Company Description -->
        <div class="description-container input-container">
          <p class="title">{{ msg.description.title }}</p>
          <p class="sub-title">{{ msg.description.subTitle }}</p>
          <textarea rows="9" :placeholder="placeholder.description"></textarea>
        </div>

        <!-- Company Information -->
        <div class="information-container input-container">
          <p class="title">{{ msg.information.title }}</p>
          <p class="sub-title">{{ msg.information.subTitle }}</p>
          <input type="text" :placeholder="placeholder.information.products">
          <input type="text" :placeholder="placeholder.information.website">
          <input type="text" :placeholder="placeholder.information.phone">
          <input type="text" :placeholder="placeholder.information.establishedYear">
          <p class="sub-title" style="margin-top: 10px">{{ msg.information.address }}</p>
          <input type="text" :placeholder="placeholder.information.country">
          <input type="text" :placeholder="placeholder.information.state">
          <input type="text" :placeholder="placeholder.information.city">
          <input type="text" :placeholder="placeholder.information.postalCode">
          <input type="text" :placeholder="placeholder.information.streetAdress">
          <input type="text" :placeholder="placeholder.information.streetAddressDetail">
        </div>

        <!-- Company History -->
        <div class="history-container input-container">
          <p class="title">{{ msg.history.title }}</p>
          <p class="sub-title">{{ msg.history.subTitle }}</p>
          <textarea rows="9" :placeholder="placeholder.history"></textarea>
        </div>

        <!-- Company Certification -->
        <div class="certification-container input-container">
          <p class="title"> {{ msg.certification.title }} </p>
          <p class="sub-title"> {{ msg.certification.subTitle }} </p>
          <p class="third-title"> {{ msg.certification.thirdTitle }} </p>
          <label for="certification-input">파일 선택</label>
          <input id="certification-input" multiple class="file" type="file" name="img_files[]">
          <!--@change="filesChange($event.target.name, $event.target.files)"-->
        </div>

        <!-- Confirm and Submit -->
        <div class="confirm-container input-container sticky-stopper">
          <p class="title"> {{ msg.confirm.title }} </p>
          <p class="sub-title"> {{ msg.confirm.subTitle }} </p>
          <button class="button-orange">{{ msg.confirm.edit }}</button>
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
      title: 'Supplier | Factory Hunt'
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
        value: {
          company: this.$route.params.company,
          description: ''
        },
        toggle: {
          isUserAdmin: false
        },
        placeholder: {
          companyName: '(주)팩토리헌트',
          description: '추구하는 것이 무엇인지, 얼만큼 전문성이 있는지 간결하게 작성하는게 좋습니다.',
          information: {
            products: '제조 품목',
            website: '웹사이트 | www.factoryhunt.com',
            phone: '연락처 | +82-10-1234-5678',
            establishedYear: '설립연도 | 2017',
            country: '국가',
            state: '도 | 경기도',
            city: '시 | 화성시',
            postalCode: '우편번호 | 01234',
            streetAdress: '도로명 주소 | 공단대로',
            streetAddressDetail: '상세주소 | 2층'
          },
          history: '2000년 1월 1일 - 회사 설립 \n' +
          '2000년 10월 1일 - 수출 규모 10억원 달성\n\n' +
          '2003년 1월 1일 - 수출 규모 100억원 달성',
          certification: ''
        },
        msg: {
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
            subTitle: '홈페이지에 제일 먼저 노출됩니다. 가장 멋진 사진을 올려주세요!'
          },
          logoImage: {
            title: '회사 로고',
            subTitle: '회사를 상징하는 로고입니다. 아직 없어도 괜찮습니다.'
          },
          accountName: {
            title: '회사명',
            subTitle: '사업자등록증의 회사명과 일치시켜주세요.'
          },
          description: {
            title: '회사 소개',
            subTitle: '회사를 소개해주세요.'
          },
          information: {
            title: '회사 정보',
            subTitle: '항목에 맞춰 회사 정보를 정확히 입력해주세요.',
            address: '주소입력 - 이 항목을 정확히 입력해야 지도에 위치가 정확히 표시됩니다'
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
      console.log('AccountProfile Created')
      this.validateUser()
    },
    mounted () {
      this.fetchAccount('56848')
      this.applyCSS()
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
        console.log(company)
        this.$http.get(`/api/data/account/company/${company}`)
          .then(response => {
            if (!response.data) {
              this.$router.push({ path: '/error' })
            }
            this.account = response.data
            this.applyLocalData(this.account)
          })
      },
      applyLocalData (account) {
        this.value.accountName = this.account.account_name_english
      },
      getYear: function (year) {
        if (year) {
          year = year.split('-')
          return year[0]
        }
      },
      checkWebsiteLinkHasHttp: function (url) {
        if (url) {
          if (url.indexOf('http') === -1) {
            url = ('http://' + url).toLowerCase()
            return url
          }
        }
      },
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      },
      routeProductProfilePage: function (index) {
        this.$router.push({
          path: '/product/profile',
          query: {
            input: this.input,
            productName: this.products[index].product_name,
            id: this.products[index].product_id
          }
        })
      },
      applyCSS () {
        $(document).ready(function () {
          const $sticky = $('.sticky-container')
          const $stickyStopper = $('.sticky-stopper')
          if ($sticky.offset()) { // make sure ".sticky" element exists
            var generalSidebarHeight = $sticky.innerHeight() // 30
            var stickyTop = $sticky.offset().top
            var stickyBottom = stickyTop + $sticky.outerHeight()
            var stickOffset = 100
            var stickyStopperPosition = $stickyStopper.offset().top // 2259
            var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset
            var diff = stopPoint + stickOffset
            $(window).scroll(function () { // scroll event
              var windowTop = $(window).scrollTop() // returns number
              console.log('windowTop: ', windowTop)
              console.log('stickyTop: ', stickyTop)
              console.log('stickyBottom: ', stickyBottom)
              console.log('stickyStopperPosition: ', stickyStopperPosition)
              console.log('stopPoint: ', stopPoint)
              console.log('diff: ', diff)
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
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../assets/less/global';

  /* Global CSS */
  // For fixed navigation-bar
  .page-container {
    margin-top: 80px;
  }

  .spinkit {
    display: none !important;
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

  /*Top image container*/
  .image-container {
    position: relative;
    overflow: hidden;
    display: -webkit-flex;
    display:         flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .image-container .main-image {
  }

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

    /* Global CSS */
    .page-container {
      margin-top: 80px;
    }

    .input-container {
      margin-bottom: 60px;
    }

    .title {
      font-size: 32px !important;
      font-weight:700 !important;
      margin-bottom:12px !important;
    }
    .sub-title {
      font-size: 20px !important;
      font-weight:400 !important;
      margin-bottom: 4px !important;
    }
    .third-title {
      font-size: 16px !important;
      font-weight:600 !important;
      margin-bottom: 4px !important;
    }
    input {
      width: 100%;
      height: 50px;
      font-size: 20px !important;
      font-weight: 300 !important;
      margin-bottom: 5px !important;

      &:focus {
        border: 1px solid @color-orange;
      }
    }
    label {
      border-radius: @border-radius;
      border: 1px solid @color-font-base;
      padding: @button-padding;
      margin-top: 10px;
      font-size: 22px;
    }
    textarea {
      font-size: 20px !important;
      font-weight: 300 !important;

      &:focus {
        border: 1px solid @color-orange;
      }
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
          width: 100px;
          height: 100px;
          border-radius: 50px;
        }
      }

      .account-name-container {}

      .description-container {}

      .information-container {}

      .history-container {}

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
