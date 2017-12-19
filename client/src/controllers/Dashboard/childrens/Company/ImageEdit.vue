<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-loader"></spinkit>

    <!-- Logo -->
    <div class="logo-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">Edit Logo</p>
        <p class="sub-title">Your company's identity is visually expressed through its logo.</p>
        <p class="third-title">Upload a square image.</p>
      </div>

      <!-- Logo Image -->
      <div id="logo-image" class="logo-image"></div>

      <!-- Upload Button -->
      <div class="button-container">
        <label for="logo-image-input">Choose File</label>
        <input id="logo-image-input" type="file" @change="onLogoImageChanged($event.target.files)" accept="image/*">
        <button id="logo-image-upload-button" class="button-orange" @click="imageUpload('logo-image-input')">Upload</button>
      </div>
    </div>

    <!-- Main Image -->
    <div class="main-image-container">
      <!-- Title -->
      <div class="title-container">
        <p class="title">Edit Company Cover Photo</p>
        <p class="sub-title">A cover photo is the larger photo at the top of your company website.</p>
      </div>

      <!-- Main Image -->
      <div class="image-container">
        <img id="main-image" class="main-image">
      </div>

      <!-- Upload Button -->
      <div class="button-container">
        <p class="caution-text">Optimize your cover photo for the right dimensions: 1280 pixels wide and 460 pixels tall.</p>
        <label for="main-image-input">Choose File</label>
        <input id="main-image-input" type="file" @change="onMainImageChanged($event.target.files)" accept="image/*">
        <button id="main-image-upload-button" class="button-orange" @click="imageUpload('main-image-input')">Upload</button>
      </div>
    </div>

  </div>
</template>

<script>
  import Spinkit from '../../../../components/Spinkit/Spinkit.vue'
  import Compressor from '@xkeshi/image-compressor'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Spinkit
    },
    metaInfo: {
      title: 'Edit image | Factory Hunt'
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: {
          mainImageFileName: '',
          logoImageFileName: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAccountId'
      ])
    },
    methods: {
      //      filterImageFileName (fileName) {
//        fileName = fileName.replace(/ /gi, '+')
//        fileName = 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/accounts/' + this.getAccountId + '/' + fileName
//        return fileName
//      },
      readURL (image, files) {
//        console.log('files: ', files)
        if (files) {
          var reader = new FileReader()
          reader.onload = function (event) {
//            console.log('event: ', event)
//            image.attr('src', event.target.result)
            image.css('background-image', `url(${event.target.result})`)
          }
          reader.readAsDataURL(files[0])
//          console.log('reader: ', reader)
        }
      },
      onMainImageChanged (fileList) {
        var image = $('.main-image')
        var uploadButton = $('#main-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList)
      },
      onLogoImageChanged (fileList) {
        var image = $('.logo-image')
        var uploadButton = $('#logo-image-upload-button')
        uploadButton.css({'display': 'inline-block'})
        this.readURL(image, fileList)
      },
      async imageUpload (inputId) {
        this.activateLoader()
        const file = document.getElementById(inputId).files[0]
        console.log(file)
        try {
          const compressedFile = await this.imageCompress(file)
          console.log(compressedFile)
          await this.postImageToS3(inputId, compressedFile)
          this.deactivateLoader()
          alert('The image has been uploaded successfully.')
          location.reload()
        } catch (err) {
          this.deactivateLoader()
          alert('Failed. Please try again.')
        }
      },
      imageCompress (file) {
        return new Promise((resolve, reject) => {
          new Compressor(file, { // eslint-disable-line no-new
            quality: 0.6,
            success (resultFile) { resolve(resultFile) },
            error (err) { reject(err) }
          })
        })
      },
      postImageToS3 (inputId, file) {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          const config = {
            headers: {'content-type': 'multipart/form-data'}
          }
          formData.append('image', file)
          if (inputId === 'logo-image-input') {
            formData.append('db_column', 'thumbnail_url')
          } else if (inputId === 'main-image-input') {
            formData.append('db_column', 'account_image_url_1')
          }
          console.log(file)
          this.$http.put(`/api/data/account/image/${this.getAccountId}`, formData, config)
            .then(() => {
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      },
      activateLoader () {
        const $loader = $('#modal-loader')
        $loader.removeClass().addClass('spinkit-modal')
      },
      deactivateLoader () {
        const $loader = $('#modal-loader')
        $loader.removeClass()
      },
      applyLogoBackgroundImage () {
        const $image = $('#logo-image')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/temp-logo-image_english_512.png)'
        }
        $image.css('background-image', image)
      },
      applyMainBackgroundImage () {
        const $image = $('#main-image')
        var image = this.account.account_image_url_1
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../static/cover_image_english.png)'
        }
        $image.css('background-image', image)
      },
      activateJquery () {
        $(document).ready(() => {
          this.applyLogoBackgroundImage()
          this.applyMainBackgroundImage()
        })
      }
    },
    mounted () {
      window.scrollTo(0, 0)
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/css/index";

  // Global
  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;
  label {
    .upload-label-basic;
    border: 1px solid @color-font-base;
    font-size: @font-size-button;
    font-weight: @font-weight-button;
  }
  button {
    font-size: @font-size-button;
    font-weight: @font-weight-button;
    border: 1px solid @color-orange;
  }

  .dashboard-page-container {
    position: relative;

    .title {
      font-size: 30px;
      font-weight: 600;
    }
    .sub-title {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 0;
    }
    .third-title {
      font-size: 14px;
      font-weight:600;
      margin-bottom: 8px;
    }

    // title
    .title-container {
      display: inline-block;
      margin-bottom: 10px;
    }

    .logo-image-container {

      #logo-image {
        float: right;
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid @color-light-grey;
        background-size: cover;
        background-position: 50%, 50%;
        background-repeat: no-repeat;
      }
    }

    // images
    .main-image-container {
      position: relative;

      .image-container {
        position: relative;
        box-shadow: @box-shadow;
        margin-bottom: 8px;

        #main-image {
          width: 100%;
          height: 280px;
          background-size: cover;
          background-position: 50%, 50%;
          background-repeat: no-repeat;
        }
      }
      .caution-text {
        margin-bottom: 12px;
      }
    }
    .button-container {
      position: relative;
      margin-bottom: 60px;

      label {
        display: inline-block;
      }
      button {
        display: none;
        margin-left: 12px;
      }
    }

  }

  @media ( min-width: 744px ) {
    .page-container {

    }
  }
  @media ( min-width: 1128px ) {
    .page-container {

    }
  }
</style>
