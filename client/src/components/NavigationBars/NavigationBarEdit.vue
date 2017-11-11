<template>
  <nav class="navbar-edit-container">

    <div class="logo-container">
      <a href="/"><img id="logo" src="../../assets/fh_logo_512.png"></a>
    </div>

    <div class="button-container">
      <span v-if="isUserLoggedIn" class="each-button-container">
        <a class="edit-button" @click="onEditButton">{{ msg.edit }}</a>
      </span>
      <span @click="onEnglishButton" class="each-button-container">
        <a>{{ msg.english }}</a>
      </span>
    </div>
  </nav>
</template>

<script>
  import cookie from '../../../src/assets/js/cookie'
  export default {
    props: ['inputData'],
    data () {
      return {
        msg: {
          edit: '수정하기',
          english: 'English'
        },
        value: {
          company: this.$route.params.company
        },
        placeholder: {
          //
        },
        isUserLoggedIn: false
      }
    },
    created () {
      console.log('Admin NavBar Created')
      this.applyCSS()
      this.checkValidation()
    },
    methods: {
      onSearchInput: function () {
        if (this.input) {
          this.$router.push({
            path: '/search',
            query: {
              input: this.input
            }
          })
        }
      },
      onLoginButton () {
        this.$router.push({
          path: '/login'
        })
      },
      onSignUpButton () {
        this.$router.push({
          path: '/signup'
        })
      },
      onLogoutButton () {
        cookie.deleteCookie('nekot')
        this.$store.dispatch('setInitialState')
        location.reload()
      },
      onEditButton () {
        alert('Edit success.')
        this.$router.push({
          path: `/${this.value.company}`
        })
      },
      onEnglishButton () {
        this.$router.push({
          path: '/korean'
        })
      },
      checkValidation () {
        const token = cookie.getCookie('nekot')
        const data = {
          headers: {
            'x-access-token': token
          }
        }
        this.$http.get(`/api/auth/check`, data)
          .then(() => {
            this.isUserLoggedIn = true
          })
          .catch(() => {
            alert('Login session is expired')
            this.isUserLoggedIn = false
            this.$router.push({
              path: '/login'
            })
          })
      },
      applyCSS () {
        $(document).ready(function () {
          $(window).scroll(() => {
            const height = $(window).scrollTop()
            if (height > 0) {
              $('.navbar-edit-container').css('border-bottom', '1px solid #DBDBDB')
            } else {
              $('.navbar-edit-container').css('border-bottom', 'none')
            }
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../assets/less/global';

  .navbar-edit-container {
    position: fixed;
    z-index: 3;
    top: 0 !important;
    left: 0 !important;
    height: 80px;
    width: 100%;
    background-color: @color-white;

    .logo-container {
      position: absolute;
      width: 80px;

      img {
        padding: 17.5px;
      }
    }

    .button-container {
      position: absolute;
      top: 0;
      right: 0;
      line-height: 80px;
      margin: 0 20px;

      .each-button-container {
        margin: 0 10px;

        a {
          color: grey;
          font-size:16px;
        }

        .edit-button {
          color: @color-orange;
          font-weight:700;
        }
      }
    }
  }

  @media ( min-width: 744px ) {
  }

  @media ( min-width: 1128px ) {
  }
</style>
