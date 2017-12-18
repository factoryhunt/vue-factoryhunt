<template>
  <div class="dashboard-page-container">

    <spinkit id="loader"></spinkit>

    <form @submit.prevent="onEditButton">
      <div class="body-container">

        <p class="title">Account Information</p>
        <p class="sub-title">Please upload all information below. It will make easier for buyers to contact you.</p>

        <div class="input-container">
          <!-- Email -->
          <div class="box-container" style="background-color: #eeeeee">
            <div class="left-contents">Email</div>
            <div class="right-contents"><input disabled type="email" v-model="value.email"></div>
          </div>

          <!-- First name -->
          <div class="box-container">
            <div class="left-contents">Last Name</div>
            <div class="right-contents"><input type="text" placeholder="홍" v-model="value.firstName"></div>
          </div>
          <!-- Last name -->
          <div class="box-container">
            <div class="left-contents">First Name</div>
            <div class="right-contents"><input type="text" placeholder="길동" v-model="value.lastName"></div>
          </div>

          <!-- Title -->
          <div class="box-container">
            <div class="left-contents">Title</div>
            <div class="right-contents"><input type="text" placeholder="CEO, 대리.." v-model="value.title"></div>
          </div>

          <!-- Mobile -->
          <div class="box-container">
            <div class="left-contents">Mobile Number</div>
            <div class="right-contents"><input type="text" placeholder="+82-10-1234-5678" v-model="value.mobile"></div>
          </div>

          <!-- Phone -->
          <div class="box-container">
            <div class="left-contents">Office Phone</div>
            <div class="right-contents"><input type="text" placeholder="+82-31-123-4567" v-model="value.phone"></div>
          </div>
        </div>

        <!-- Confirm -->
        <div class="confirm-container input-container">
          <p class="title">Confirm and Edit</p>
          <p class="sub-title">Please confirm the information above befor you submit it. All information will be updated immediately.</p>
          <button class="button-orange">Confirm</button>
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
            alert('Edited')
            window.scrollTo(0, 0)
            location.reload()
          })
          .catch(() => {
            $('#loader').removeClass()
            alert('Failed. Please try again.')
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
        .sub-title {
          margin-bottom: 20px;
        }
      }
    }

  }
</style>
