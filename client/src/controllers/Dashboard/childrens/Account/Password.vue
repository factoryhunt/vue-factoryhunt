<template>
  <div class="dashboard-page-container">
    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <!-- Required Input Container -->
        <div class="required-container input-container">
          <p class="title">새로운 비밀번호</p>
          <p class="sub-title">비밀번호는 문자와 숫자의 조합으로 최소 8문자를 포함해야 합니다.</p>

          <!-- Current Password Container -->
          <div class="box-container">
            <div class="left-contents">현재 비밀번호</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.currentPassword"></div>
          </div>
          <br>

          <!-- New Password Container -->
          <div class="box-container">
            <div class="left-contents">새로운 비밀번호</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.newPassword"></div>
          </div>
          <!-- Confirm Password Container -->
          <div class="box-container">
            <div class="left-contents">확인</div>
            <div class="right-contents"><input required minlength="8" type="password" placeholder="" v-model="value.newPasswordConfirm"></div>
          </div>
        </div>

        <!-- Edit Password Container -->
        <div class="confirm-container input-container">
          <button class="button-orange">변경하기</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: '비밀번호 변경 | Factory Hunt'
    },
    props: {
      contact: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters([
        'getContactId'
      ])
    },
    data () {
      return {
        value: {
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        }
      }
    },
    methods: {
      onEditButton () {
        const data = {
          password: this.value.currentPassword,
          new_password: this.value.newPassword,
          new_password_confirm: this.value.newPasswordConfirm
        }
        this.$http.put(`/api/data/contact/password_change/${this.getContactId}`, data)
          .then(() => {
            alert('비밀번호가 변경되었습니다.')
            location.reload()
          })
          .catch(err => {
            console.log(err.response)
            alert(err.response.data.msg_kor)
          })
      },
      mappingData () {
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
    }

  }
</style>
