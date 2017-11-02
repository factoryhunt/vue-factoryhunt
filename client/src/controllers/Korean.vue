<template>
  <div class="page-container">

    <nav-bar></nav-bar>
    <div class="contents">

      <h2><span style="color: #f2583d;">팩토리 헌트</span>는</h2>
      <h2>{{title2}}</h2>

      <div class="description-container">
        <p>{{msg1}}</p>
      </div>
      <!--<p class="terms">{{terms}}</p>-->
      <h3 class="terms">{{email}}</h3>

      <!--<div class="form-container">-->
        <!--&lt;!&ndash;action="/api/aws/upload" &ndash;&gt;-->
        <!--<form enctype="multipart/form-data" novalidate>-->
          <!--<input class="form-control company" :value="data.company" v-model="data.company" placeholder="회사 이름" type="text">-->
          <!--<input class="form-control company" :value="data.name" v-model="data.name" placeholder="이름" type="text">-->
          <!--<input class="form-control company" :value="data.email" v-model="data.email" placeholder="이메일" type="text">-->
          <!--<input class="form-control company" :value="data.website" v-model="data.website" placeholder="웹사이트" type="text">-->
          <!--<div class="form-group">-->
            <!--<input @change="filesChange($event.target.name, $event.target.files)" multiple class="file" type="file" name="img_files[]">-->
            <!--<p class="help-block">{{information}}</p>-->
          <!--</div>-->
          <!--<p class="terms">{{terms}}</p>-->
          <!--<button @click="onSubmit" class="btn btn-default submit">제출하기</button>-->
        <!--</form>-->
      <!--</div>-->
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    metaInfo: {
      title: '팩토리 헌트 - 제조업체 검색엔진 | Bulk Wholesale | High Quality & Responsible Price | Fastest Quote | Handy ordering | factoryhunt.com'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
//        title: '공장 제품을 노출시키고 싶으세요?',
        title1: '팩토리 헌트는',
        title2: '해외 바이어들이 사용하는 제조업체 검색엔진입니다.',
        msg1: '이메일로 영문 카탈로그와 제품 사진을 공유해주시면, 검색엔진에 등록시켜서 해외 바이어들과 연결되도록 도와드립니다.',
//        msg2: '검색엔진에 등록시켜서 해외 바이어들과 연결되실 수 있도록 도와드립니다.',
        information: '영문으로된 당사의 제품 카탈로그만 첨부해주세요.',
        terms: '파일을 첨부하는 것으로 당사의 홈페이지에 있는 제품정보의 사용을 동의하는 것으로 간주합니다.',
        email: 'info@factoryhunt.com',
        data: {
          company: '',
          name: '',
          email: '',
          website: '',
          files: null
        },
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
    },
    computed: {
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      }
    },
    methods: {
      onSubmit: function () {
        const data = {
          company: this.data.company,
          name: this.data.name,
          email: this.data.email,
          website: this.data.website,
          files: this.data.files
        }
        this.$http.post('/api/aws/upload', data)
          .then(res => {
            console.log(res)
          })
      },
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING
//        upload(formData)
//          .then(x => {
//            this.uploadedFiles = [].concat(x);
//            this.currentStatus = STATUS_SUCCESS;
//          })
//          .catch(err => {
//            this.uploadError = err.response;
//            this.currentStatus = STATUS_FAILED;
//          });
      },
      filesChange (fieldName, fileList) {
        if (!fileList.length) return

        this.data.files = fileList
        console.log(fieldName)
        console.log(this.data.files)
        // save it
        this.save(this.files)
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style scoped>
  .description-container {
    margin-top: 50px;
    margin-bottom:100px;
    font-weight: 400;
    font-size: 20px;
  }

  .form-container {
    max-width: 600px;
    margin: 100px auto;
  }
  .form-container input {
    margin: 10px 0;
  }
  .form-container .company {
   height: 50px;
  }
  .form-container .file {
    margin-top: 30px;
  }
  .form-container .terms {
    margin-top: 100px;
    font-size: 13px;
    color: grey;
    text-align: center;
  }
  .form-container .submit {
    width: 100%;
    height: 50px;
  }
</style>
