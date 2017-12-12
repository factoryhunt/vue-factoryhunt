<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <form class="form-container" @submit.prevent="onEditButton(value)">
      <!-- Company Domain -->
      <div class="domain-container input-container">
        <!--<p class="title">도메인 주소</p>-->
        <!--<i class="fa fa-circle required-circle" aria-hidden="true"><span> 필수입력</span></i>-->
        <p class="title">회사 이름이 포함된 맞춤형 도메인으로 변경하세요.</p>
        <br>
        <p class="sub-title">www.factoryhunt.com/<span id="domain-text">{{ value.domain }}</span></p>
        <input required pattern="[가-힣a-z0-9]{3,50}" title="3자 이상 50자 이하의 문자와 숫자로만 구성되어야 합니다." id="domain-input" type="text" :placeholder="placeholder.domain" v-model="value.domain" @keyup="domainInputPressed" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <i id="domain-mark" class="big-mark" aria-hidden="true"></i>
        <p class="hidden-title">{{msg.domain.hiddenTitle}}</p>
        <spinkit id="domain-spinkit"></spinkit>
      </div>

      <!-- Confirm and Submit -->
      <div class="confirm-container input-container sticky-stopper">
        <!--<p class="title">확인 및 수정</p>-->
        <!--<p class="sub-title">수정할 정보를 다시 한 번 확인하고 내용이 맞다면 수정하기 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!</p>-->
        <button class="button-orange">수정하기</button>
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
      title: '도메인 수정 | Factory Hunt'
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
          domain: ''
        },
        toggle: {
          isDomainAvailable: null
        },
        placeholder: {
          domain: '도메인 주소'
        },
        msg: {
          domain: {
            title: '도메인 주소',
            subTitle: '팩토리헌트에서 사용할 도메인 주소를 입력해주세요. 이 주소는 회사 이름을 나타내는 단어의 조합들로 입력하면 좋습니다.',
            hiddenTitle: '3자 이상 50자 이하의 문자와 숫자로만 구성되어야 합니다.'
          },
          confirm: {
            title: '',
            subTitle: '',
            edit: ''
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
      // not allowed capital letters
      applyAttributes () {
        // when login user is page admin, keep going
        this.applyLocalData(this.account)
        this.checkAllInputOnce(this.value)
        this.applyInputFocusBlurEvent()
      },
      applyLocalData (account) {
        this.value.domain = account.domain
      },
      checkAllInputOnce (value) {
        this.checkDomain(value.domain)
      },
      checkDomain (domain) {
//        const domainInput = $('.domain-container > input')
        const spinkitInput = $('#domain-spinkit')
        const domainMark = $('.domain-container > #domain-mark')
        const hiddenTitle = $('.domain-container > .hidden-title')

        if (this.value.domain.length <= 2) {
          this.toggle.isDomainAvailable = false
          this.msg.domain.hiddenTitle = '도메인 주소는 문자를 포함하여 3자 이상이어야 합니다.'
          domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
          hiddenTitle.css({'color': '#767676'})
          return
        }

        // not allowed only number
        const numCheck = /^[0-9]*$/
        if (numCheck.test(this.value.domain)) {
          this.toggle.isDomainAvailable = false
          this.msg.domain.hiddenTitle = '도메인 주소는 문자를 포함하여 3자 이상이어야 합니다.'
          domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
          hiddenTitle.css({'color': '#767676'})
          return
        }

        // not allowed static domain string (ex:about, contact-us ..)

        // loading start
        domainMark.removeClass()
        spinkitInput.removeClass().addClass('spinkit-input')

        // after loading
        this.$http.get(`/api/data/account/domain/${domain}`)
          .then(res => {
            spinkitInput.removeClass().addClass('invisible')

            if (res.data) {
              // when domain already existed
              this.toggle.isDomainAvailable = false
              this.msg.domain.hiddenTitle = '이미 사용중인 주소입니다. 다른 주소를 사용해주세요.'
              domainMark.removeClass().addClass('big-mark fa fa-times').css({'color': 'red'})
              hiddenTitle.css({'color': 'red'})

              // when it is mine
              if (res.data.domain === this.account.domain) {
                this.toggle.isDomainAvailable = true
                this.msg.domain.hiddenTitle = '3자 이상 50자 이하의 문자와 숫자로만 구성되어야 합니다.'
                domainMark.removeClass().addClass('big-mark fa fa-check').css({'color': 'green'})
                hiddenTitle.css({'color': '#484848'})
              } // when available
            } else {
              this.toggle.isDomainAvailable = true
              this.msg.domain.hiddenTitle = '사용 가능한 주소입니다.'
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
      domainInputPressed () {
        this.value.domain = this.value.domain.toLowerCase()
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
      },
      onEditButton (value) {
        $('#modal-spinkit').removeClass().addClass('spinkit-modal')

        // props
        const data = {
          domain: value.domain
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
      font-size: 30px;
      font-weight:300;
      margin-bottom: 4px;
    }
    .third-title {
      font-size: 15px;
      font-weight:600;
      margin-bottom: 4px;
    }
    #domain-text {
      font-weight: 400;
      font-size:28px;
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

    .domain-container {
      position: relative;

      .required-circle {
      }

      #domain-mark {
        top: 116px;
      }

      .spinkit-input {
        position: absolute;
        top: 122px;
        right: @mark-right-amount;
      }
    }

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
