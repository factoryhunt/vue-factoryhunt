<template>
  <div class="dashboard-page-container">

    <div v-if="!toggle.isShowing" class="body-container">
      <button id="first-drop-button" class="button-orange" @click="toggle.isShowing = true">
        Delete account
      </button>
    </div>
    <div v-else class="body-container">
      <form @submit.prevent="dropAccount">
        <!-- Account Drop -->
        <div class="drop-container input-container">
          <p class="title">Delete account</p>

          <div class="description-container input-container">
            <p class="sub-title">Could you tell us why you want to stop using the service?</p>
            <textarea rows="10" placeholder="If you tell us the reason why you want to delete the account, we will do our best to improve the service to make users happy." v-model="value.description"></textarea>
          </div>
        </div>

        <!-- Cautions -->
        <div class="caution-container input-container">
          <p class="title">What happens when a user delete account.</p>
          <ul>
            <li><p class="sub-title">All information will be deleted.</p></li>
            <li><p class="sub-title">No more appears in the search result.</p></li>
            <li><p class="sub-title">Your domain could be taken by someone else.</p></li>
            <li><p class="sub-title">There could be some disadvantages when you signup again.</p></li>
          </ul>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="sub-title">Are you sure you want to delete your account?</p>
          <button id="drop-button" class="button-orange">Delete</button>
          <button id="cancel-button" class="button-white" @click="onCancelButton">Cancel</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: 'Manage Account | Factory Hunt'
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
          .catch(() => { alert('Failed. Please try again.') })
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
            alert('Your account has been deleted')
          })
          .catch(() => {
            alert('Failed. Please try again.')
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
