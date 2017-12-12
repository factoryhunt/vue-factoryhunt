<template>
  <div class="dashboard-page-container">

    <spinkit id="modal-spinkit"></spinkit>

    <!-- Header -->
    <header class="header-container">
      <p class="title">제품 업로드</p>
      <!--<i id="required-circle" class="fa fa-circle required-circle" aria-hidden="true"></i>-->
      <!--<p class="caution-text">표시는 필수 입력 항목입니다.</p>-->
    </header>

    <div class="divider"></div>

    <!-- Body -->
    <div class="body-container">
      <form @submit.prevent="onUploadButton">

        <!-- Category -->
        <div class="category-container input-container">
          <p class="title">카테고리</p>
          <!--<i class="fa fa-circle required-circle" aria-hidden="true"> <span> 필수입력</span></i>-->
          <div class="category-inner-container">
            <!-- Primary -->
            <div class="primary-category-container">
              <ul>
                <li v-for="(primary, index) in value.categories" @click="onPrimaryCategory(index, $event)">{{primary.name}}</li>
              </ul>
            </div>
            <!-- Secondary -->
            <div class="secondary-category-container">
              <ul>
                <li v-for="(secondary, i) in value.subCategories" @click="onSecondaryCategory(i, $event)">{{secondary.name}}</li>
              </ul>
            </div>
          </div>
          <p v-if="value.primaryCategory" class="hidden-text">선택한 카테고리: {{value.primaryCategory}} {{ value.secondaryCategory ? '> ' + value.secondaryCategory : ''}} </p>
          <p class="caution-text">상품과 맞지 않는 카테고리에 등록할 경우 강제 이동되거나 판매중지, 판매금지 될 수 있습니다.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Name & Code -->
        <div class="name-container input-container">
          <p class="title">제품명</p>
          <i class="fa fa-circle required-circle" aria-hidden="true"><span> 필수입력</span></i>
          <input id="name-count-input" pattern="[가-힣A-Za-z0-9 ]{2,100}" title="2자 이상 100자 이하의 문자와 숫자로 제한됩니다." minlength="2" maxlength="100" v-model="value.productName" @keyup="countNameLength" placeholder="제품 이름을 입력해주세요." type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <p class="count-text">{{ 100 - value.nameCount }}</p>
          <p class="caution-text">판매 상품과 직접 관련이 없는 다른 상품명, 유명 상품 유사문구, 스팸성 키워드 입력 시 관리자에 의해 판매 금지 될 수 있습니다.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Image -->
        <div class="image-container input-container">
          <p class="title">제품 이미지</p>
          <i class="fa fa-circle required-circle" aria-hidden="true"> <span> 필수입력</span></i>
          <p class="sub-title">첫 번째 사진에는 대표 이미지를 올려주세요. 최대 5개까지 등록할 수 있습니다.</p>
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
            <span id="thumbnail-text">대표 이미지</span>
          </div>
          <p class="caution-text">판매 상품과 관련이 없는 이미지를 올리면 관리자에 의해 판매 금지 될 수 있습니다.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Information -->
        <div class="information-container input-container">
          <p class="title">제품 정보</p>
          <p class="sub-title">양식에 맞게 정확히 입력해주세요.</p>

          <!--<div class="box-container">-->
            <!--<div class="left-container">개당 가격</div>-->
            <!--<div class="right-container">-->
              <!--<input placeholder="개당 가격을 입력해주세요" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">-->
            <!--</div>-->
          <!--</div>-->
          <div class="box-container">
            <div class="left-container">제품 코드</div>
            <div class="right-container">
              <input placeholder="Factory_Hunt_A_01" maxlength="100" v-model="value.productCode" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">최소 주문량 (MOQ)</div>
            <div class="right-container">
              <input placeholder="1,000 ..." maxlength="10" v-model="value.moq" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">생산지</div>
            <div class="right-container">
              <!--<select required v-model="value.origin">-->
              <select v-model="value.origin">
                <option id="disabled-option" disabled value="">이 제품이 생산되는 곳을 선택해주세요</option>
                <option v-for="country in value.countries" :value="country.name">{{country.name}}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">규격 (mm)</div>
            <div class="right-container">
              <input placeholder="100 x 100 x 100mm" maxlength="100" v-model="value.dimension" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <div class="box-container">
            <div class="left-container">소재 및 재질</div>
            <div class="right-container">
              <input placeholder="철, 종이, 나무 .." maxlength="100" v-model="value.materialType" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </div>
          </div>
          <p class="caution-text">공개하고 싶지 않은 정보는 칸을 비워두세요.</p>
        </div>
        <div class="divider"></div>

        <!-- Product Description -->
        <div class="description-container input-container">
          <p class="title">제품 설명</p>
          <vue-editor :editorToolbar="customToolbar"
                      useCustomImageHandler
                      @imageAdded="handleImageAdded"
                      id="html-editor"
                      v-model="value.editor">

          </vue-editor>
          <spinkit id="editor-spinkit"></spinkit>
          <p class="caution-text">상품명과 직접적 관련 없는 상품상세, 외부 링크 입력 시 관리자에 의해 판매 금지 될 수 있습니다.
          </p>
        </div>
        <div class="divider"></div>

        <!-- Upload Button -->
        <div class="confirm-container input-container">
          <p class="title">확인 및 업로드</p>
          <p class="sub-title">업로드 할 정보를 다시 한 번 확인하고 내용이 맞다면 업로드 버튼을 눌러주세요. 바로 웹사이트에 반영됩니다!</p>
          <button class="button-orange">업로드</button>
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
      title: '제품 업로드 | Factory Hunt'
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
        value: {
          files: [],
          countries: countries.korean,
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
          origin: '대한민국',
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
      onUploadButton () {
//        if (!this.value.primaryCategory) {
//          return alert('제품 주 카테고리를 지정해주세요.')
//        }
//
//        if (!this.value.secondaryCategory) {
//          return alert('제품 세부 카테고리를 지정해주세요.')
//        }

        if (this.value.files.length < 1) {
          return alert('제품 이미지를 최소한 1개는 올려야 합니다.')
        }

        $('#modal-spinkit').removeClass().addClass('spinkit-modal')
        let formData = new FormData()
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        formData.append('product_name', this.value.productName)
        formData.append('product_domain', this.filterProductDomain(this.value.productName))
        formData.append('product_code', this.value.productCode)
        formData.append('product_image_url_1', 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/product_loading_image.png')
        formData.append('primary_product_category', this.value.primaryCategory)
        formData.append('secondary_product_category', this.value.secondaryCategory)
        formData.append('product_origin', this.value.origin)
        formData.append('item_dimensions', this.value.dimension)
        formData.append('material_type', this.value.materialType)
        formData.append('minimum_order_quantity', this.value.moq)
        formData.append('product_description', this.value.editor)
        for (var i = 0; i < this.value.files.length; i++) {
          formData.append('images', this.value.files[i])
        }

        this.$http.post(`/api/data/product/${this.getAccountId}`, formData, config)
          .then(() => {
            $('#modal-spinkit').removeClass()
            alert('제품이 업로드 되었습니다. \n제품 승인까지는 최대 24시간까지 소요됩니다.')
            location.href = '/dashboard/product'
          })
          .catch(() => {
            $('#modal-spinkit').removeClass()
            alert('제품 업로드 실패. 다시 시도해주세요.')
          })
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
      this.value.categories = categories
      this.activateJquery()
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../../../assets/less/global';

  #html-editor {
    height: 500px !important;
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

        .required-circle {
          top: 46px;
        }
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

          .required-circle {
            left: 107px;
          }

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

          .required-circle {
            left: 82px;
          }

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
              left: 64px;
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
            margin-bottom: 0 !important;
          }
          .sub-title {
            margin-bottom: 40px !important;
          }
          button {
            font-size: @font-size-button;
            font-weight: @font-weight-button;
          }
        }

      }
    }

    /* Global CSS */

    /*<!--.right-container {-->*/
    /*<!--position: absolute;-->*/
    /*<!--z-index: 2;-->*/
    /*<!--width: 310px;-->*/
    /*<!--right: 0;-->*/
    /*<!--background-color: @color-white;-->*/

    /*<!--.title {-->*/
    /*<!--font-size: 28px !important;-->*/
    /*<!--font-weight:400 !important;-->*/
    /*<!--margin-bottom:0 !important;-->*/
    /*<!--}-->*/
    /*<!--.sub-title {-->*/
    /*<!--font-size: 18px !important;-->*/
    /*<!--font-weight:300 !important;-->*/
    /*<!--margin-bottom: 4px !important;-->*/
    /*<!--}-->*/

    /*<!--.each-container {-->*/
    /*<!--margin-bottom: 30px;-->*/
    /*<!--}-->*/

    /*<!--.caption {-->*/
    /*<!--margin-top: 60px;-->*/
    /*<!--font-weight:700;-->*/
    /*<!--}-->*/
    /*<!--}-->*/
  }
</style>
