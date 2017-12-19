<template>
  <form class="narrow-contents" @submit.prevent="sendEmail(email, quiry)" id="form-container">

    <div class="narrow-contents">
      <h2>{{msg.title}}</h2>
      <hr>

      <div class="input-container">
        <input class="input-disable" type="text" placeholder="Company" :value="account.account_name_english" readonly>
        <i class="fa fa-building-o" aria-hidden="true"></i>
      </div>

      <div class="input-container">
        <input class="input-disable" type="text" placeholder="Products" :value="product.product_name" readonly>
        <i class="fa fa-cube" aria-hidden="true"></i>
      </div>

      <div class="input-container">
        <input required type="email" v-model="email" :placeholder="placeholder.email">
        <i class="fa fa-envelope-o" aria-hidden="true"></i>
      </div>

      <textarea required rows="7" v-model="quiry" :placeholder="placeholder.textarea"></textarea>

      <div class="button-container">
        <div class="help-container">
          <a @click="onNeedHelpButton"><i class="fa fa-info-circle"></i> Need our help?</a>
        </div>
        <button type="submit" class="btn-lg btn-default"><i class="fa fa-paper-plane"></i> Send inquiry</button>
      </div>

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
        input: this.$route.query.input,
        pid: this.$route.query.pid,
        aid: this.$route.query.aid,
        product: {},
        account: {},
        email: '',
        quiry: '',
        placeholder: {
          email: 'contact@example.com',
          textarea: 'Enter your message'
        },
        msg: {
          title: 'Contact form'
        },
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
    methods: {
      requestProductData: function () {
        this.$http.get(`/api/data/product/product_id/${this.pid}`)
          .then(response => {
            this.product = response.data
            console.log(this.product.account_id)
            this.requestAccountData(this.product.account_id)
          })
      },
      requestAccountData: function () {
        this.$http.get(`/api/data/account/${this.aid}`)
          .then(response => {
            this.account = response.data
          })
      },
      sendEmail: function (email, quiry) {
        alert('Sent success.')
        const data = {
          email: email,
          company: this.account.account_name_english,
          product: this.product.product_name,
          pid: this.pid,
          quiry: this.convertEnterToBrTag(quiry),
          subject: 'An inquiry for verified product'
        }
        this.$http.post('/api/mail/product', data)
          .then(response => {
            console.log('mail sent: ' + response.data)
          })
      },
      // textarea의 데이터를 post로 전송할 때 \n이 없어지는 상태로 전송이 되기 때문에
      // 변환을 해줘야 한다. php의 nl2br 과 같다고 한다.
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      },
      onNeedHelpButton: function () {
        alert('Coming soon')
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.requestProductData()
      this.requestAccountData()
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
  }

</style>
