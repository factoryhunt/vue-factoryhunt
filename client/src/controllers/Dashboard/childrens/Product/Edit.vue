<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Header -->
    <header class="header-container">
      <p class="title" v-lang.header.title></p>
      <!--<i id="required-circle" class="fa fa-circle required-circle" aria-hidden="true"></i>-->
      <!--<p class="caution-text"> Required field</p>-->
    </header>

    <div class="divider"></div>

    <!-- Body -->
    <div class="body-container">
      <form @submit.prevent="onEditButton">

        <!-- Category -->
        <div class="category-container input-container">
          <p class="title" v-lang.category.title></p>
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
          <p v-if="value.primaryCategory" class="hidden-text" v-lang.category.select="{category: getCategory}"></p>
          <p class="caution-text" v-lang.category.caution></p>
        </div>
        <div class="divider"></div>

        <!-- Product Name -->
        <div class="name-container input-container">
          <p class="title" v-lang.productName.title></p>
          <i class="fa fa-circle required-circle" aria-hidden="true"> <span v-lang.requiredField></span></i>
          <input id="name-count-input" required minlength="1" maxlength="100" pattern="[A-Za-z0-9 ]{2,100}" :title="getProductNameInputTitle" v-model="value.productName" @keyup="countNameLength" placeholder="Please enter your product name." type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <p class="count-text">{{ 100 - value.nameCount }}</p>
          <p class="caution-text" v-lang.productName.caution></p>
        </div>
        <div class="divider"></div>

        <!-- Product Image -->
        <div class="image-container input-container">
          <p class="title" v-lang.productImage.title></p>
          <i class="fa fa-circle required-circle" aria-hidden="true"> <span v-lang.requiredField></span></i>
          <p class="sub-title" v-lang.productImage.subTitle></p>
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
            <span id="thumbnail-text" v-lang.productImage.mainImage></span>
          </div>
          <p class="caution-text" v-lang.productImage.caution></p>
        </div>
        <div class="divider"></div>

        <!-- Product Information -->
        <div class="information-container input-container">
          <p class="title" v-lang.information.title></p>
          <p class="sub-title" v-lang.information.subTitle></p>

          <!--<div class="box-container">-->
          <!--<div class="left-container">Unit price</div>-->
          <!--<div class="right-container">-->
          <!--<input placeholder="Enter unit price" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">-->
          <!--</div>-->
          <!--</div>-->
          <div class="box-container">
            <div class="left-container" v-lang.information.code></div>
            <div class="right-container">
              <input placeholder="Factory_Hunt_A_01" maxlength="100" v-model="value.productCode" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container" v-lang.information.moq></div>
            <div class="right-container">
              <input placeholder="100" maxlength="10" pattern="[0-9]{1,10}" :title="getMoqInputTitle" v-model="value.moq" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container" v-lang.information.origin></div>
            <div class="right-container">
              <!--<select required v-model="value.origin">-->
              <select v-model="value.origin">
                <option id="disabled-option" disabled value="" v-lang.information.originPlaceholder></option>
                <option v-for="country in value.countries" :value="country.name">{{country.name}}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="left-container" v-lang.information.size></div>
            <div class="right-container">
              <input placeholder="100 x 100 x 100mm" maxlength="100" v-model="value.dimension" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container" v-lang.information.materials></div>
            <div class="right-container">
              <input placeholder="" maxlength="100" v-model="value.materialType" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <p class="caution-text" v-lang.information.caution></p>
        </div>
        <div class="divider"></div>

        <!-- Product Description -->
        <div class="description-container input-container">
          <p class="title" v-lang.introduction.title></p>
          <vue-editor :editorToolbar="customToolbar"
                      useCustomImageHandler
                      @imageAdded="handleImageAdded"
                      id="html-editor"
                      v-model="value.editor">

          </vue-editor>
          <spinkit id="editor-spinkit"></spinkit>
          <p class="caution-text" v-lang.introduction.caution></p>
          </p>
        </div>
        <div class="divider"></div>

        <!-- Catalog -->
        <div class="catalog-container input-container">
          <p class="title" v-lang.catalog.title></p>
          <p class="sub-title" v-lang.catalog.subTitle></p>
          <label for="pdf-input" v-lang.catalog.button></label>
          <input name="catalog_pdf" id="pdf-input" type="file" accept="application/pdf" @change="onPDFchanged($event.target.files)">
          <div class="file-information-container">
            <p id="file-information-text">{{msg.pdfText}}</p>
            <a id="pdf-cancel-button" @click="onPDFcancel" v-lang.catalog.cancel></a>
          </div>
        </div>
        <div class="divider"></div>

        <!-- Upload Button -->
        <div class="confirm-container input-container">
          <p class="title" v-lang.confirm.title></p>
          <p class="sub-title" v-lang.confirm.subTitle></p>
          <button class="button-orange" v-lang.confirm.button></button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
  import countries from '../../../../assets/models/countries.json'
  import categories from '../../../../assets/models/categories.json'
  import Spinkit from '../../../../components/Spinkit/Spinkit.vue'
  import pdflib from 'pdfjs-dist'
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
        },
        msg: {
          pdfText: ''
        }
      }
    },
    messages: {
      eng: {
        requiredField: 'Required field',
        uploadSuccess: 'Your product has been saved.',
        uploadFail: 'Product save failed. please try again.',
        header: {
          title: 'Edit Product'
        },
        category: {
          title: 'Category',
          select: 'Selected category: {category}',
          caution: 'If you register in a category that does not match the product, your product may be forcibly moved, stopped selling, or prohibited from selling.'
        },
        productName: {
          title: 'Product Name',
          inputTitle: 'You can use letters and numbers between 2 and 100 characters.',
          placeholder: 'Please enter your product name.',
          caution: 'You may be prohibited from selling by other company name, similar phrase from famous product, or spammy keyword when it is not related directly with the product.'
        },
        productImage: {
          title: 'Product image',
          subTitle: 'The first photo will be the main product image. You can upload up to 5 images.',
          mainImage: 'Main image',
          caution: 'If you upload an image that is not relevant to your product, you may be banned by the administrator.'
        },
        information: {
          title: 'Product Information',
          subTitle: 'Please fill out the form correctly.',
          code: 'Product code',
          moq: 'MOQ',
          moqInputTitle: 'You can use only numbers.',
          origin: 'Product of Origin',
          originPlaceholder: 'Please select where the product is produced',
          size: 'Size (mm)',
          materials: 'Materials',
          caution: 'Leave blank for information you do not want to disclose.'
        },
        introduction: {
          title: 'Product Introduction',
          caution: 'Product details not directly related to the product name may be prohibited by the administrator.'
        },
        catalog: {
          title: 'Catalog',
          subTitle: 'PDF only. Maximum upload file size :10MB',
          button: 'Select PDF',
          caution: 'Maximum file size is 10MB',
          cancel: 'Cancel'
        },
        confirm: {
          title: 'Confirm and Save',
          subTitle: 'Please confirm the information above before you save it. The information will be updated immediately.',
          button: 'Save'
        }
      },
      kor: {
        requiredField: '필수입력',
        uploadSuccess: '정보가 수정 되었습니다.',
        uploadFail: '정보 수정 실패. 다시 시도해주세요.',
        header: {
          title: '제품 수'
        },
        category: {
          title: '카테고리',
          select: '선택한 카테고리: {category}',
          caution: '상품과 맞지 않는 카테고리에 등록할 경우 강제 이동되거나 판매중지, 판매금지 될 수 있습니다.'
        },
        productName: {
          title: '제품명',
          inputTitle: '2자 이상 100자 이하 영어로만 입력해주세요.',
          placeholder: '제품 이름을 입력해주세요.',
          caution: '판매 상품과 직접 관련이 없는 다른 상품명, 유명 상품 유사문구, 스팸성 키워드 입력 시 관리자에 의해 판매 금지 될 수 있습니다.'
        },
        productImage: {
          title: '제품 이미지',
          subTitle: '첫 번째 사진에는 대표 이미지를 올려주세요. 최대 5개까지 등록할 수 있습니다.',
          mainImage: '대표 이미지',
          caution: '판매 상품과 관련이 없는 이미지를 올리면 관리자에 의해 판매 금지 될 수 있습니다.'
        },
        information: {
          title: '제품 정보',
          subTitle: '양식에 맞게 정확히 입력해주세요.',
          code: '제품 코드',
          moq: '최소 주문량 (MOQ)',
          moqInputTitle: '숫자만 입력해주세요.',
          origin: '생산지',
          originPlaceholder: '이 제품이 생산되는 곳을 선택해주세요.',
          size: '규격 (mm)',
          materials: '소재 및 재질',
          caution: '공개하고 싶지 않은 정보는 칸을 비워두세요.'
        },
        introduction: {
          title: '제품 설명',
          caution: '상품명과 직접적 관련 없는 상품상세, 외부 링크 입력 시 관리자에 의해 판매 금지 될 수 있습니다.'
        },
        catalog: {
          title: '카탈로그',
          subTitle: 'PDF 파일만 가능합니다. 최대 업로드 크기 :10MB',
          button: 'PDF 선택',
          caution: '파일 크기는 최대 10MB 입니다.',
          cancel: '취소'
        },
        confirm: {
          title: '확인 및 수정',
          subTitle: '수정 할 정보를 다시 한 번 확인하고 내용이 맞다면 수 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!',
          button: '수정하기'
        }
      }
    },
    computed: {
      ...mapGetters([
        'getAccountId',
        'getContactId'
      ]),
      getCategory () {
        return this.value.primaryCategory + (this.value.secondaryCategory ? '> ' + this.value.secondaryCategory : '')
      },
      getProductNamePlaceholder () {
        return this.translate('productName.placeholder')
      },
      getProductNameInputTitle () {
        return this.translate('productName.inputTitle')
      },
      getProductOriginPlaceholder () {
        return this.translate('information.originPlaceholder')
      },
      getMoqInputTitle () {
        return this.translate('information.moqInputTitle')
      },
      getPDFcaution () {
        return this.translate('catalog.caution')
      },
      getUploadSuccess () {
        return this.translate('uploadSuccess')
      },
      getUploadFail () {
        return this.translate('uploadFail')
      }
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
        formData.append('pdf', document.getElementById('pdf-input').files[0])
        this.$http.put(`/api/data/product/${this.productId}`, formData, config)
          .then(() => {
            $('#loader').remove()
            alert(this.getUploadSuccess)
            location.href = '/dashboard/product'
          })
          .catch(() => {
            $('#loader').remove()
            alert(this.getUploadFail)
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

        // pdf information mapping
        if (product.product_pdf_url) {
          this.readPDF()
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
      },
      readPDF () {
        const url = this.value.product.product_pdf_url
        const file = new File([''], url)
        var reader = new FileReader()
        reader.onload = (event) => {
          console.log('event', event)
        }
        reader.readAsDataURL(file)
        console.log('file', file)
        pdflib.PDFJS.getDocument(url).then((pdf) => {
          console.log(pdf)
          pdf.getStats().then((meta) => {
            console.log('meta: ', meta)
          })
        })
      },
      onPDFchanged (files) {
        const maxSize = 15 * 1024 * 1024
        var fileSize = ((files[0].size) / 1024) / 1024
        fileSize = fileSize.toFixed(1)
        // over 15MB
        if (files[0].size > maxSize) {
          this.onPDFcancel()
          alert(this.getPDFcaution)
          return
        }

        $('#pdf-cancel-button').css('display', 'inline-block')
        this.msg.pdfText = `${files[0].name} (${fileSize}MB)`
        var reader = new FileReader()
        reader.onload = (event) => {
          console.log(event)
        }
        reader.readAsDataURL(files[0])
      },
      onPDFcancel () {
        $('#pdf-input').val('')
        this.msg.pdfText = ''
        $('#pdf-cancel-button').css('display', 'none')
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

        .catalog-container {

          label {
            .upload-label-basic;
            border: 1px solid @color-font-base;
            margin-top: 10px;
            font-size: @font-size-button;
            font-weight: @font-weight-button;
          }

          .file-information-container {
            margin-top: 8px;

            #pdf-cancel-button {
              display: none;
              font-size: 17px;
              margin-left: 8px;
            }
            #file-information-text {
              float: left;
              font-size: 17px;
              color: @color-font-gray;
            }
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
