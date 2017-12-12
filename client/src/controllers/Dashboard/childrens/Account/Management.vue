<template>
  <div class="dashboard-page-container">

    <div v-if="!toggle.isShowing" class="body-container">
      <button id="first-drop-button" class="button-orange" @click="toggle.isShowing = true">
        계정 해지하기
      </button>
    </div>
    <div v-else class="body-container">
      <form @submit.prevent="dropAccount">
        <!-- Account Drop -->
        <div class="drop-container input-container">
          <p class="title">계정 해지하기</p>

          <div class="description-container input-container">
            <p class="sub-title">왜 떠나시나요? 이유를 말씀해주세요.</p>
            <textarea rows="10" placeholder="자세히 적어주시면 검토 후 유저분들께 더 나은 서비스를 제공할 수 있도록 최선을 다하도록 하겠습니다. 감사합니다." v-model="value.description"></textarea>
          </div>
        </div>

        <!-- Cautions -->
        <div class="caution-container input-container">
          <p class="title">계정을 해지한다면 생기는 일</p>
          <ul>
            <li><p class="sub-title">회원님의 프로필과 회사, 제품 정보가 모두 없어집니다.</p></li>
            <li><p class="sub-title">웹사이트 검색 엔진에 정보가 더 이상 노출되지 않습니다.</p></li>
            <li><p class="sub-title">현재 사용 중인 도메인을 누군가가 사용할 수 있습니다.</p></li>
            <li><p class="sub-title">재가입시 불이익이 생길 수 있습니다.</p></li>
          </ul>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="sub-title">그래도 정말 떠나실건가요?..</p>
          <button id="drop-button" class="button-orange">해지하기</button>
          <button id="cancel-button" class="button-white" @click="onCancelButton">취소하기</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: '계정 관리 | Factory Hunt'
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
          description: ''
        },
        toggle: {
          isShowing: false
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAccountId',
        'getContactId'
      ])
    },
    methods: {
      showModal () {
        //
      },
      dropAccount () {
        this.deleteProducts()
          .then(() => { this.deleteContact() })
          .then(() => { this.deleteAccount() })
          .catch(() => { alert('계정 삭제 실패. 다시 시도해주세요.') })
      },
      onCancelButton () {
        location.replace('/dashboard')
      },
      deleteProducts () {
        return new Promise((resolve, reject) => {
          this.$http.delete(`/api/data/product/all/${this.getAccountId}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err.response)
            })
        })
      },
      deleteAccount () {
        return new Promise((resolve, reject) => {
          this.$http.delete(`/api/data/account/${this.getAccountId}`)
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err.response)
            })
        })
      },
      deleteContact () {
        this.$http.delete(`/api/data/contact/${this.getContactId}`)
          .then(() => {
            this.$store.dispatch('logout')
            alert('계정이 삭제되었습니다.')
          })
          .catch(() => {
            alert('계정 삭제 실패. 다시 시도해주세요.')
          })
      }
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

      #first-drop-button {
        font-size: 15px;
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
          width: 170px;
          border-right: 1px solid @color-light-grey;
        }
        .right-contents {
          padding-left: 180px;

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

      .confirm-container {

        #cancel-button {
          margin-left: 8px;
          border: 1px solid @color-input-placeholder;
          color: @color-font-base;
        }
      }
    }

  }
</style>
