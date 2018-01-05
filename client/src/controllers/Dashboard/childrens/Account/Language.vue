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
          <div class="box-container">
            <div class="left-contents" v-lang.body.language></div>
            <div class="right-contents">
              <select v-model="value.language" name="language" id="language" @change="onLanguageChange($event.target.value)">
                <option value="" disabled>Language</option>
                <option value="eng">English</option>
                <option value="kor">한국어</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
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
          language: ''
        }
      }
    },
    messages: {
      eng: {
        editSuccess: 'Your information has been edited.',
        editFail: 'Edit failed. Please try again.',
        header: {
          title: 'Language Support',
          subTitle: 'Please set your default language.'
        },
        body: {
          language: 'Language'
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
          title: '언어 지원',
          subTitle: '기본 언어를 설정해주세요.'
        },
        body: {
          language: '언어'
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
          language_default: this.value.language
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
        this.value.language = localStorage.getItem('vue-lang')
      },
      onLanguageChange (value) {
        this.value.language = value
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
