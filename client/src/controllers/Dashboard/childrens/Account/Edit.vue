<template>
  <div class="dashboard-page-container">

    <spinkit id="loader"></spinkit>

    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <!-- Title -->
        <p class="title" v-lang.header.title></p>
        <p class="sub-title" v-lang.header.subTitle></p>

        <div class="input-container">
          <!-- Email -->
          <div class="box-container" style="background-color: #eeeeee">
            <div class="left-contents" v-lang.body.email></div>
            <div class="right-contents"><input disabled type="email" v-model="value.email"></div>
          </div>

          <!-- Last name -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.firstName></div>
            <div class="right-contents"><input type="text" placeholder="Robert" v-model="value.firstName"></div>
          </div>
          <!-- First name -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.lastName></div>
            <div class="right-contents"><input type="text" placeholder="Smith" v-model="value.lastName"></div>
          </div>

          <!-- Title -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.title></div>
            <div class="right-contents"><input type="text" placeholder="CEO, Manager.." v-model="value.title"></div>
          </div>

          <!-- Mobile -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.mobile></div>
            <div class="right-contents"><input type="text" placeholder="+1-917-1234-5678" v-model="value.mobile"></div>
          </div>

          <!-- Phone -->
          <div class="box-container">
            <div class="left-contents" v-lang.body.officeNumber></div>
            <div class="right-contents"><input type="text" placeholder="+1-917-123-4567" v-model="value.phone"></div>
          </div>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="title" v-lang.confirm.title></p>
          <p class="sub-title" v-lang.confirm.subTitle></p>
          <button class="button-orange" v-lang.confirm.button></button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import Spinkit from '../../../../components/Spinkit/Spinkit.vue'
  export default {
    metaInfo: {
      title: 'Edit Information | Factory Hunt'
    },
    components: {
      Spinkit
    },
    props: {
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          email: '',
          firstName: '',
          firstNameEnglish: '',
          lastName: '',
          lastNameEnglish: '',
          salutation: '',
          title: '',
          languages: '',
          phone: '',
          mobile: '',
          type: ''
        }
      }
    },
    messages: {
      eng: {
        editSuccess: 'Your information has been edited.',
        editFail: 'Edit failed. Please try again.',
        header: {
          title: 'Account Information',
          subTitle: 'Please upload all information below. It will make easier for buyers to contact you.'
        },
        body: {
          email: 'Email',
          firstName: 'First Name',
          lastName: 'Last Name',
          title: 'Title',
          mobile: 'Mobile Number',
          officeNumber: 'Office Phone'
        },
        confirm: {
          title: 'Confirm and Save',
          subTitle: 'Please confirm the information above before you save it. All information will be updated immediately.',
          button: 'Save'
        }
      },
      kor: {
        editSuccess: '정보가 업데이트 되었습니다.',
        editFail: '정보 수정 실패. 다시 시도해주세요.',
        header: {
          title: '정보 입력하기',
          subTitle: '모든 정보를 입력하면 바이어가 회원님을 찾는게 좀 더 수월해집니다.'
        },
        body: {
          email: '이메일',
          firstName: '이름',
          lastName: '성',
          title: '직책',
          mobile: '핸드폰 번호',
          officeNumber: '사무실 전화번호'
        },
        confirm: {
          title: '확인 및 수정',
          subTitle: '수정 할 정보를 다시 한 번 확인하고 내용이 맞다면 수정 버튼을 눌러주세요. 웹사이트에 바로 반영됩니다.',
          button: '수정하기'
        }
      }
    },
    computed: {
      getEditSuccess () {
        return this.translate('editSuccess')
      },
      getEditFail () {
        return this.translate('editFail')
      }
    },
    methods: {
      onEditButton () {
        $('#loader').removeClass().addClass('spinkit-modal')
        const data = {
          contact_email: this.value.email,
          first_name_english: this.value.firstName,
          last_name_english: this.value.lastName,
          contact_title: this.value.title,
          contact_phone: this.value.phone,
          contact_mobile: this.value.mobile
//          first_name_english: this.value.firstNameEnglish,
//          last_name_english: this.value.lastNameEnglish
//          languages: this.value.languages,
//          salutation: this.value.salutation
        }
        this.$http.put(`/api/data/contact/${this.contact.contact_id}`, data)
          .then(() => {
            $('#loader').removeClass()
            alert(this.getEditSuccess)
            window.scrollTo(0, 0)
            location.reload()
          })
          .catch(() => {
            $('#loader').removeClass()
            alert(this.getEditFail)
          })
      },
      mappingData () {
        this.value.email = this.contact.contact_email
        this.value.firstName = this.contact.first_name_english
        this.value.lastName = this.contact.last_name_english
        this.value.title = this.contact.contact_title
        this.value.phone = this.contact.contact_phone
        this.value.mobile = this.contact.contact_mobile
      },
      preventEnterKeySubmit () {
        $('input').keydown(() => {
          if (event.keyCode === 13) {
            event.preventDefault()
          }
        })
      },
      activateJquery () {
        $(document).ready(() => {
          this.preventEnterKeySubmit()
        })
      }
    },
    mounted () {
      this.mappingData()
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";

  /* Global CSS */
  p {
    margin: 0;
  }

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;

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
      border: 1px solid @color-orange;
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
      border: 1px solid @color-orange;
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

  .dashboard-page-container {
    position: relative;

    .header-container {
      margin-bottom:30px;

      .title {
        font-size:30px;
        font-weight: 600;
      }
    }

    .body-container {

      .confirm-container {
        .sub-title {
          margin-bottom: 20px;
        }
      }
    }

  }
</style>
