<template>
  <form class="narrow-contents" @submit.prevent="sendEmail(email, quiry)" id="form-container">

    <h2 v-lang.title></h2>
    <hr>

    <div class="input-container">
      <input v-if="lead.company_english" class="input-disable" type="text" placeholder="Company" :value="lead.company_english" readonly>
      <input v-else class="input-disable" type="text" placeholder="Company" :value="lead.company" readonly>
      <i class="fa fa-building-o" aria-hidden="true"></i>
    </div>

    <div class="input-container">
      <input class="input-disable" type="text" placeholder="Products" :value="lead.products_english" readonly>
      <i class="fa fa-cube" aria-hidden="true"></i>
    </div>

    <div class="input-container">
      <input required type="email" v-model="email" :placeholder="getEmailPlaceholder">
      <i class="fa fa-envelope-o" aria-hidden="true"></i>
    </div>

    <textarea required rows="7" v-model="quiry" :placeholder="getMessagePlaceholder"></textarea>

    <div class="button-container">
      <div class="help-container">
        <a href="/contact" target="_blank" v-lang.needOurHelp></a>
      </div>
      <button type="submit" class="button-orange" v-lang.button></button>
    </div>
  </form>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        id: this.$route.query.id,
        lead: {},
        email: '',
        quiry: '',
        msg: {
          title: 'Contact form'
        },
        placeholder: {
          email: 'contact@example.com',
          textarea: 'Enter your message'
        },
        attach: 'Attach what you look for if you want',
        error: {
          in: {
            name: false,
            email: false,
            message: false
          },
          text: {
            name: 'Name is required',
            email: 'Email is required',
            message: 'Message is required'
          }
        }
      }
    },
    messages: {
      eng: {
        title: 'Contact form',
        emailPlaceholder: 'Email',
        messagePlaceholder: 'Enter your message',
        needOurHelp: '<i class="fa fa-info-circle"></i> Need our help?',
        button: '<i class="fa fa-paper-plane"></i> Send inquiry',
        emailSentSuccess: 'Email sent successfully.'
      },
      kor: {
        title: '문의',
        emailPlaceholder: '이메일',
        messagePlaceholder: '내용을 입력하세요',
        needOurHelp: '<i class="fa fa-info-circle"></i> 도움이 필요하신가요?',
        button: '<i class="fa fa-paper-plane"></i> 문의하기',
        emailSentSuccess: '메일을 성공적으로 보냈습니다.'
      }
    },
    computed: {
      getCompany () {
        return this.lead.company_english ? this.lead.company + '(' + this.lead.company_english + ')' : this.lead.company
      },
      getEmailPlaceholder () {
        return this.translate('emailPlaceholder')
      },
      getMessagePlaceholder () {
        return this.translate('messagePlaceholder')
      },
      getSendSuccessMessage () {
        return this.translate('emailSentSuccess')
      }
    },
    methods: {
      getThisLeadData: function (id) {
        this.$http.get(`/api/data/lead/${id}`)
          .then(response => {
            this.lead = response.data
          })
      },
      sendEmail: function (email, quiry) {
        alert('Sent success.')
        const data = {
          email: email,
          company: this.getCompany,
          quiry: this.convertEnterToBrTag(quiry),
          subject: 'An inquiry for lead'
        }
        this.$http.post('/api/mail/company', data)
          .then(() => {
            console.log(this.getSendSuccessMessage)
          })
      },
      // textarea의 데이터를 post로 전송할 때 \n이 없어지는 상태로 전송이 되기 때문에
      // 변환을 해줘야 한다. php의 nl2br 과 같다고 한다.
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.getThisLeadData(this.id)
    }
  }
</script>

<style scoped>
  .input-container {
    position: relative;
    border:1px solid lightgrey;
    border-radius: 4px;
    margin-bottom: 25px;
  }
  .input-container input {
    width: 100%;
    border-radius: 4px;
    font-size: 20px;
    padding: 10px 10px 10px 55px;
    border: none;
    box-shadow: none;
    outline: none;
  }
  .input-container i {
    position: absolute;
    left: 20px;
    top: 32%;
    font-size: 20px;
    width: 55px;
  }
  .input-disable {
    background-color: #eeeeee;
  }

  textarea {
    font-size: 20px;
  }

  .button-container {

  }
  .button-container .help-container {
    text-align: right;
    margin-top: 50px;
    margin-bottom: 18px;
    font-size: 17px;
  }
  .button-container .help-container a {
  }
  .button-container button {
    display: block;
    width: 100%;
    height: 55px;
    font-weight: 600;
    font-size: 18px;
  }
</style>
