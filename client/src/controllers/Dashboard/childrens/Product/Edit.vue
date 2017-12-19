<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Header -->
    <header class="header-container">
      <p class="title">Edit Product</p>
      <!--<i id="required-circle" class="fa fa-circle required-circle" aria-hidden="true"></i>-->
      <!--<p class="caution-text"> Required field</p>-->
    </header>

    <div class="divider"></div>

    <!-- Body -->
    <div class="body-container">
      <form @submit.prevent="onEditButton">

        <!-- Category -->
        <div class="category-container input-container">
          <p class="title">Category</p>
          <!--<i class="fa fa-circle required-circle" aria-hidden="true"> <span> Required field</span></i>-->
          <div class="category-inner-container">
            <!-- Primary -->
            <div class="primary-category-container">
              <ul>
                <li v-for="(primary, index) in value.categories" :class="primary.name === value.product.primary_product_category ? 'active' : ''" @click="onPrimaryCategory(index, $event)">{{primary.name}}</li>
              </ul>
            </div>
            <!-- Secondary -->
            <div class="secondary-category-container">
              <ul>
                <li v-for="(secondary, i) in value.subCategories" :class="secondary.name === value.product.secondary_product_category ? 'active' : ''" @click="onSecondaryCategory(i, $event)">{{secondary.name}}</li>
              </ul>
            </div>
          </div>
          <p v-if="value.primaryCategory" class="hidden-text">Selected category: {{value.primaryCategory}} {{ value.secondaryCategory ? '> ' + value.secondaryCategory : ''}} </p>
          <p class="caution-text">If you register in a category that does not match the product, your product may be forcibly moved, stopped selling, or prohibited from selling.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Name -->
        <div class="name-container input-container">
          <p class="title">Product Name</p>
          <i class="fa fa-circle required-circle" aria-hidden="true"><span> Required field</span></i>
          <input id="name-count-input" required minlength="1" maxlength="100" pattern="[가-힣A-Za-z0-9 ]{2,100}" title="You can use letters and numbers between 2 and 100 characters." v-model="value.productName" @keyup="countNameLength" placeholder="Please enter your product name." type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <p class="count-text">{{ 100 - value.nameCount }}</p>
          <p class="caution-text">You may be prohibited from selling by other company name, similar phrase from famous product, or spammy keyword when it is not related directly with the product.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Image -->
        <div class="image-container input-container">
          <p class="title">Product Image</p>
          <i class="fa fa-circle required-circle" aria-hidden="true"> <span> Required field</span></i>
          <p class="sub-title">The first photo will be the main product image. You can upload up to 5 images.</p>
          <div class="image-inner-container">
            <div class="image-each-container">
              <ul id="image-container-ul">
                <li id="image-edit" style="display: none;">
                  <img class="each-image" src="../../../../../static/white-bg.png">
                  <label></label>
                  <input name="thumbnail_image" type="file" accept="image/*">
                </li>
                <li id="image-add">
                  <img class="each-image" src="../../../../../static/white-bg.png">
                  <label for="thumbnail-image-add"><i class="fa fa-plus add-button" aria-hidden="true"></i></label>
                  <input id="thumbnail-image-add" name="thumbnail_image" @change="onImageAdded($event.target.name, $event.target.files)" type="file" multiple accept="image/*">
                </li>
              </ul>
            </div>
            <span id="thumbnail-text">Main image</span>
          </div>
          <p class="caution-text">If you upload an image that is not relevant to your product, you may be banned by the administrator.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Information -->
        <div class="information-container input-container">
          <p class="title">Product Information</p>
          <p class="sub-title">Please fill out the form correctly.</p>

          <!--<div class="box-container">-->
          <!--<div class="left-container">Unit price</div>-->
          <!--<div class="right-container">-->
          <!--<input placeholder="Enter unit price" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">-->
          <!--</div>-->
          <!--</div>-->
          <div class="box-container">
            <div class="left-container">Product code</div>
            <div class="right-container">
              <input placeholder="Factory_Hunt_A_01" maxlength="100" v-model="value.productCode" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">MOQ</div>
            <div class="right-container">
              <input placeholder="100" maxlength="10" pattern="[0-9]{1,10}" title="You can use only numbers." v-model="value.moq" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">Product of Origin</div>
            <div class="right-container">
              <!--<select required v-model="value.origin">-->
              <select v-model="value.origin">
                <option id="disabled-option" disabled value="">Please select where the product is produced.</option>
                <option v-for="country in value.countries" :value="country.name">{{country.name}}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">Size (mm)</div>
            <div class="right-container">
              <input placeholder="100 x 100 x 100mm" maxlength="100" v-model="value.dimension" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">Materials</div>
            <div class="right-container">
              <input placeholder="" maxlength="100" v-model="value.materialType" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <p class="caution-text">Leave blank for information you do not want to disclose.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Description -->
        <div class="description-container input-container">
          <p class="title">Product Introduction</p>
          <vue-editor :editorToolbar="customToolbar"
                      useCustomImageHandler
                      @imageAdded="handleImageAdded"
                      id="html-editor"
                      v-model="value.editor">

          </vue-editor>
          <spinkit id="editor-spinkit"></spinkit>
          <p class="caution-text">Product details not directly related to the product name may be prohibited by the administrator.
          </p>
        </div>
        <div class="divider"></div>

        <!-- Upload Button -->
        <div class="confirm-container input-container">
          <p class="title">Confirm and Save</p>
          <p class="sub-title">Please confirm the information above before you save it. The information will be updated immediately.</p>
          <button class="button-orange">Save</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import countries from '../../../../assets/models/countries.json'
  import categories from '../../../../assets/models/categories.json'
  import Spinkit from '../../../../components/Spinkit/Spinkit.vue'
  import { VueEditor } from 'vue2-editor'
  import { mapGetters } from 'vuex'
  export default {
    metaInfo: {
      title: 'Edit Product | Factory Hunt'
    },
    components: {
      VueEditor,
      Spinkit
    },
    data () {
      return {
        customToolbar: [
          ['bold', 'italic', 'underline'],
          ['image'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'header': [1, 2, 3, 4, false]}],
          [{'color': []}, {'background': []}],
          [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
          ['clean']
        ],
        productId: this.$route.query.id,
        value: {
          files: [],
          product: {},
          countries: countries.english,
          categories: categories,
          subCategories: '',
          thirdCategories: '',
          forthCategories: '',
          primaryCategory: '',
          secondaryCategory: '',
          productName: '',
          nameCount: 0,
          price: '',
          productCode: '',
          moq: '',
          origin: '',
          dimension: '',
          materialType: '',
          editor: ''
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
      filterProductDomain (productDomain) {
        return productDomain.replace(/ /g, '-')
      },
      countNameLength (e) {
        $(document).ready(() => {
          this.value.nameCount = $(e.target).val().length
        })
      },
      onPrimaryCategory (index, event) {
        $('.primary-category-container li').removeClass('active')
        $('.secondary-category-container li').removeClass('active')
        $(event.target).addClass('active')

        this.value.subCategories = this.value.categories[index].sub_category
        this.value.primaryCategory = this.value.categories[index].name
        this.value.secondaryCategory = ''
      },
      onSecondaryCategory (index, event) {
        $('.secondary-category-container li').removeClass('active')
        $(event.target).addClass('active')
        this.value.secondaryCategory = this.value.subCategories[index].name
      },
      onImageAdded (name, files) {
        const fileCount = files.length
        let childCount = ($('#image-container-ul')[0].children.length) - 1

        // single upload
        if (fileCount === 1 && childCount < 6) {
          this.addNewImage(childCount, files[0])
          // multiple upload
        } else {
          for (var i = 0; i < fileCount; i++) {
            if (childCount < 6) {
              this.addNewImage(childCount, files[i])
              childCount += 1
            }
          }
        }
        //
        console.log('current children count: ', childCount)
        if (childCount >= 5) {
          $('#image-add').remove()
        }
      },
      readURL ($li, file) {
        if (file) {
          var reader = new FileReader()
          reader.onload = (event) => {
            console.log(event)
            const url = event.target.result
            $li.css('display', 'inherit')
            $li.children('.each-image').attr('src', url)
          }
          reader.readAsDataURL(file)
        }
      },
      addNewImage (index, file) {
        this.value.files.push(file)
        const $edit = $('#image-edit').clone()
        const $add = $('#image-add')
        var $label = $edit.children('label')
        var $input = $edit.children('input')
        var $image = $edit.children('img')
        $edit.removeAttr('id')
        $edit.attr('id', `image-edit-${index}`)
        $label.attr('for', `thumbnail-image-input-${index}`)
        $input.attr('id', `thumbnail-image-input-${index}`)
        $image.attr('id', `thumbnail-image-${index}`)
        $input.change((event) => {
          this.editURL($image, event.target.files[0], index)
        })
        $add.before($edit)
        this.readURL($edit, file)
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
      },
      onEditButton () {
        $('#loader').removeClass().addClass('spinkit-modal')

        let formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        formData.append('product_name', this.value.productName)
        formData.append('product_domain', this.filterProductDomain(this.value.productName))
        formData.append('product_code', this.value.productCode)
        formData.append('primary_product_category', this.value.primaryCategory)
        formData.append('secondary_product_category', this.value.secondaryCategory)
        formData.append('product_origin', this.value.origin)
        formData.append('item_dimensions', this.value.dimension)
        formData.append('material_type', this.value.materialType)
        formData.append('minimum_order_quantity', this.value.moq)
        formData.append('product_description', this.value.editor)
        for (var i = 0; i < this.value.files.length; i++) {
          if (this.value.files[i].size > 0) {
            formData.append(`image_${i + 1}`, this.value.files[i])
          }
        }
        this.$http.put(`/api/data/product/${this.productId}`, formData, config)
          .then(() => {
            $('#loader').remove()
            alert('Your product has been uploaded.\nPlease allow up to 24 hours for product approval.')
            location.href = '/dashboard/product'
          })
          .catch(() => {
            $('#loader').remove()
            alert('Product upload failed. please try again.')
          })
      },
      fetchProduct () {
        this.$http.get(`/api/data/product/product_id/${this.productId}`)
          .then(res => {
            this.value.product = res.data
            this.mappingData(this.value.product)
          })
          .catch(() => {
            location.replace('/dashboard/product')
          })
      },
      mappingData (product) {
        this.value.primaryCategory = product.primary_product_category
        this.value.secondaryCategory = product.secondary_product_category
        this.value.productName = product.product_name
        this.value.productCode = product.product_code
        this.value.moq = product.minimum_order_quantity
        this.value.origin = product.product_origin
        this.value.dimension = product.item_dimensions
        this.value.materialType = product.material_type
        this.value.editor = product.product_description

        // sub category mapping
        for (const index in this.value.categories) {
          const primary = this.value.categories[index].name
          if (this.value.primaryCategory === primary) {
            this.value.subCategories = this.value.categories[index].sub_category
          }
        }

        // image mapping
        if (product.product_image_url_1) {
          this.value.files.push(new File([''], ''))
          this.readImage(1, product.product_image_url_1)
        }
        if (product.product_image_url_2) {
          this.value.files.push(new File([''], ''))
          this.readImage(2, product.product_image_url_2)
        }
        if (product.product_image_url_3) {
          this.value.files.push(new File([''], ''))
          this.readImage(3, product.product_image_url_3)
        }
        if (product.product_image_url_4) {
          this.value.files.push(new File([''], ''))
          this.readImage(4, product.product_image_url_4)
        }
        if (product.product_image_url_5) {
          this.value.files.push(new File([''], ''))
          this.readImage(5, product.product_image_url_5)
          $('#image-add').remove()
        }
      },
      readImage (index, url) {
        const $edit = $('#image-edit').clone()
        const $add = $('#image-add')
        const $label = $edit.children('label')
        const $input = $edit.children('input')
        const $image = $edit.children('img')
        $edit.removeAttr('id')
        $edit.css('display', 'inherit')
        $edit.attr('id', `image-edit-${index}`)
        $label.attr('for', `thumbnail-image-input-${index}`)
        $image.attr('id', `thumbnail-image-${index}`)
        $image.attr('src', url)
        $input.attr('id', `thumbnail-image-input-${index}`)
        $input.change((event) => {
          this.editURL($image, event.target.files[0], index)
        })
        $add.before($edit)
      },
      editURL ($image, file, index) {
        if (file) {
          var reader = new FileReader()
          reader.onload = (event) => {
            console.log(event)
            const url = event.target.result
            $image.attr('src', url)
            this.value.files[index - 1] = file
          }
          reader.readAsDataURL(file)
        }
      },
      handleImageAdded (file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        $('#editor-spinkit').removeClass().addClass('spinkit-input')
        var formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        formData.append('images', file)
        this.$http.post(`/api/data/product/editor/${this.getAccountId}`, formData, config)
          .then((result) => {
            console.log(result)
            $('#editor-spinkit').removeClass().addClass('invisible')
            let url = result.data // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url)
          })
          .catch((err) => {
            $('#editor-spinkit').removeClass().addClass('invisible')
            console.log(err)
          })
      }
    },
    mounted () {
      this.fetchProduct()
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/css/index';

  #html-editor {
    height: 300px !important;
  }

  @height: 50px;
  @mark-right-amount: 12px;
  @small-mark-right-amount: 18px;
  @mark-bottom-amount: 16px;
  @font-size-button: 22px;
  @font-weight-button: 600;
  // Global
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
  /*<!--label {-->*/
  /*<!--.upload-label-basic;-->*/
  /*<!--border: 1px solid @color-font-base;-->*/
  /*<!--margin-top: 10px;-->*/
  /*<!--font-size: @font-size-button;-->*/
  /*<!--font-weight: @font-weight-button;-->*/
  /*<!--}-->*/
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
      border: 1px solid @color-link;
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
  .required-circle {
    display: inline-block;
    vertical-align: top;
    padding-top: 8px;
    color: @color-orange;
    font-size: 0.5px;

    span {
      font-size:12px !important;
      font-weight:500;
    }
  }

  @media ( min-width: 768px ) {

  }

  @media ( min-width: 1128px ) {

    /* Global CSS */
    .dashboard-page-container {

      .header-container {

        .caution-text {
          margin-left: 14px;
        }
      }

      .body-container {

        .input-container {
          margin-bottom: 40px;
        }
        .title {
          display: inline-block;
          font-size: 30px;
          font-weight:600;
          margin-bottom:18px;
        }
        .sub-title {
          font-size: 20px;
          font-weight:300;
          margin-bottom: 8px;
        }
        .caution-text {
          font-size: 14px;
          font-weight: 300;
        }

        .category-container {
          position: relative;

          .category-inner-container {
            width: 100%;
            border: 1px solid @color-light-grey;
            margin-bottom: 12px;
            &:before {
              content: "";
              display: table;
            }
            &:after {
              content: "";
              display: table;
              clear: both;
            }

            ul {
              list-style: none;
              padding-left: 0;
              margin-bottom: 0;
              height: 250px;
              overflow: auto;

              .active {
                color: @color-orange;
                /*<!--background-color: @color-lightest-grey;-->*/
              }
            }
            li {
              position: relative;
              padding: 9px 14px;
              &:hover {
                background-color: @color-lightest-grey;
                cursor: pointer;
              }
            }

            .primary-category-container {
              position: relative;
              float: left;
              width: 30%;
              border-right: 1px solid @color-light-grey;
              li:after {
                position: absolute;
                top: 10px;
                right: 15px;
                width: 4px;
                height: 8px;
                content: ">";
              }
            }

            .secondary-category-container {
              position: relative;
              float: left;
              width: 70%;
            }
          }

          .hidden-text {
            font-size:17px;
            font-weight: 600;
            margin-bottom: 2px;
          }
        }

        .name-container {
          position: relative;

          .count-text {
            float: right;
            font-size: 15px;
            font-weight:600;
            margin-bottom: 4px;
            margin-right: 3px;
          }
        }

        .information-container {

          .box-container {
            position: relative;
            width: 100%;
            border: 1px solid @color-light-grey;
            border-radius: @border-radius;
            margin-bottom: 4px;

            .left-container {
              float: left;
              font-size: 16px;
              font-weight: 600;
              padding-left: 18px;
              height: @height;
              line-height: @height;
              width: 170px;
              border-right: 1px solid @color-light-grey;
            }
            .right-container {
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

        .image-container {
          position: relative;

          .image-inner-container {
            position: relative;

            #thumbnail-text {
              position: absolute;
              text-align: center;
              font-size: 15px;
              color: @color-link;
              top: 155px;
              left: 57px;
            }
            .required-circle {
              position: absolute;
              top: 12px;
              left: 166px;
              color: @color-orange !important;
            }

            .image-each-container {

              ul {
                list-style: none;
                margin: 0;
                padding: 0;

                &:before {
                  content: "";
                  display: table;
                }
                &:after {
                  clear: both;
                  content: "";
                  display: table;
                }

                li {
                  display: table-cell;
                  text-align: center;
                  position: relative;
                  float: left;
                  margin: 0 15px 15px 0;
                  padding: 0;
                  width: 188px;
                  height: 188px;

                  input {
                    display: none;
                  }

                  img {
                    width: 100%;
                    height: 100%;
                    border: 1px dashed @color-menu-gray;
                  }

                  label {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    cursor: pointer;
                    vertical-align: middle;
                  }

                  .add-button {
                    position: absolute;
                    font-weight: 100;
                    font-size: 40px;
                    color: @color-font-base;
                    top: 75px;
                    left: 80px;
                  }

                  .deactive {
                    display: none;
                  }
                }
              }
            }

          }
        }

        .description-container {

          .quillWrapper {
            margin-bottom: 8px;
          }
        }

        .confirm-container {
          .title {
            margin-bottom: 0;
          }
          .sub-title {
            margin-bottom: 40px;
          }
          button {
            font-size: @font-size-button;
            font-weight: @font-weight-button;
          }
        }

      }
    }
  }
</style>
