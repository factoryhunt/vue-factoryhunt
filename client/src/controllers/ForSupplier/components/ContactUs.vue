<template>
  <section class="contact-us" id="CONTACT">
    <div class="container scrollUpDelay">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="section-title">
            <h2> 문의하기 </h2>
            <p>신속하게 답변 드리겠습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-us-form scrollUpDelay">
      <div class="container">
        <form @submit.prevent="sendEmail">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <input required type="email" class="form-control" id="email" v-model="value.email" placeholder="이메일 주소">
              <textarea required class="form-control" rows="25" id="message" v-model="value.quiry" cols="10" placeholder="문의 내용 ..."></textarea>
              <button class="btn btn-default submit-btn form-submit">보내기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="social-icons scrollUpDelay">
            <ul>
              <li><a href="https://www.facebook.com/factoryhunt"><i class="fa fa-facebook"></i></a></li>
              <!--<li><a href="#"><i class="fa fa-twitter"></i></a></li>-->
              <li><a href="https://www.youtube.com/channel/UCC3c1TvZIsssj5aSTM9qj6A"><i class="fa fa-youtube-play"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        value: {
          email: '',
          quiry: ''
        }
      }
    },
    methods: {
      sendEmail: function () {
        const data = {
          email: this.value.email,
          quiry: this.convertEnterToBrTag(this.value.quiry),
          subject: '문의하기'
        }
        this.$http.post('/api/mail/contact', data)
          .then(response => {
            alert('성공적으로 메세지가 전달 되었습니다. \n문의하신 내용에 대한 답변을 곧 드릴 수 있도록 하겠습니다. \n감사합니다.')
            this.value.email = ''
            this.value.quiry = ''
            console.log('mail sent: ' + response.data)
          })
      },
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      }
    },
    updated () {
    },
    mounted () {
    },
    created () {
    }
  }
</script>

<style scoped>
  /*=============== Contact Us ===============*/
  #CONTACT {
    outline: none;
  }
  .contact-us-form .form-control {
    display: block;
    width: 100%;
    height: 50px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 21px;
    color: #555;
    background-color: transparent;
    border: 1px solid #aeaeae;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin-bottom: 15px;
    opacity: .8;
    outline: 0px !important;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  #message {
    height: 150px;
    resize: none;
  }
  .submit-btn,
  .submit-btn:active,
  .submit-btn:focus,
  .submit-btn:visited {
    background-color: transparent;
    border: solid 1px #F2583D;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 100%;
    height: 50px;
    font-size: 18px;
    color: #F2583D;
    outline: 0px !important;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .submit-btn:hover {
    background: #F2583D;
    color: #fff;
    border-color: #F2583D;
  }
  .social-icons {
    padding-top: 50px;
    padding-bottom: 70px;
  }
  .social-icons ul {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .social-icons ul li {
    list-style: none;
    display: inline;
    padding-left: 10px;
  }
  .social-icons ul li a {
    text-decoration: none;
    display: inline-block;
    text-align: center;
    border: 1px solid #9d9d9d;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    width: 45px;
    height: 45px;
    line-height: 49px;
    color: #9d9d9d;
  }
  .social-icons ul li a:hover {
    background-color: #F2583D;
    border: 1px solid #F2583D;
    color: #fff;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .social-icons ul li a i {
    font-size: 20px;
  }
</style>
