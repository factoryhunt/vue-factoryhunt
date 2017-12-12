<template>
  <div class="page-container">

    <nav-bar></nav-bar>

    <div class="body-container">

      <h2>Contact Us</h2>
      <hr>

      <div class="inner-contents">

        <div class="right-container">
          <div class="form-container">

            <h3 class="title">Contact</h3>
            <br>
            <div class="input-container">
              <input v-model="email" type="text" :placeholder="placeholder.email">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </div>

            <textarea v-model="quiry" rows="12" :placeholder="placeholder.textarea"></textarea>

            <div class="button-container">
              <button @click="sendEmail(email, quiry)" type="submit" class="btn btn-default">Send inquiry</button>
            </div>
          </div>
        </div>

        <div class="left-container">
          <div class="location-container">
            <hr>
            <h3 class="title">Location</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25392017.06642179!2d132.10668611474622!3d39.02417588597382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca43fa198ee59%3A0x9b0e31cc41a900d9!2s417+Yeongdong-daero%2C+Gangnam-gu%2C+Seoul!5e0!3m2!1sen!2skr!4v1502419672699" width="550" height="450" frameborder="0" style="border: 0px; pointer-events: none;" allowfullscreen=""></iframe>
          </div>
        </div>

      </div>

    </div>

    <footer-bar></footer-bar>
    <copyright-bar></copyright-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import FooterBar from '../../components/FooterBar'
  import CopyrightBar from '../../components/CopyrightBar'
  export default {
    metaInfo: {
      title: 'Contact Us | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar,
      CopyrightBar
    },
    data () {
      return {
        placeholder: {
          email: 'contact@example.com',
          textarea: 'Enter your message'
        },
        email: '',
        quiry: ''
      }
    },
    created () {
      window.scrollTo(0, 0)
    },
    methods: {
      sendEmail: function (email, quiry) {
        alert('Sent success.')
        const data = {
          email: email,
          quiry: this.convertEnterToBrTag(quiry),
          subject: 'inquiry for Factory Hunt'
        }
        this.$http.post('/api/mail/contact', data)
          .then(response => {
            console.log('mail sent: ' + response.data)
          })
      },
      convertEnterToBrTag: function (subject) {
        return subject.replace(/\n/g, '<br />')
      }
    }
  }
</script>

<style less="lang" scoped>
  
  .inner-contents {
    position: relative;
  }

  .left-container {
  }
  .location-container {
  }
  .location-container .title {
    margin-top: 30px;
  }
  .location-container iframe {
    margin-top: 30px;
    width:100%;
    height:445px;
    border-radius: 4px;
  }

  .right-container {
  }
  .form-container {
    font-size: 17px;
  }
  .form-container .input-container {
    position: relative;
    border:1px solid lightgrey;
    border-radius: 4px;
    margin-bottom: 25px;
  }
  .form-container .input-container input {
    width: 100%;
    border-radius: 4px;
    padding: 10px 50px 10px 10px;
    border: none;
    box-shadow: none;
    outline: none;
  }
  .form-container .input-container i {
    position: absolute;
    right: 20px;
    top: 32%;
  }
  .form-container textarea {
    font-size: 17px;
    margin-bottom: 27px;
    width: 100%;
  }
  .form-container button {
    width: 100%;
    height: 50px;
    font-weight: 500;
    font-size: 16px;
  }

  @media ( min-width: 744px ) {
  }
  @media ( min-width: 1128px ) {
    .left-container {
      position: relative;
      padding-right: 450px;
      min-height: 550px;
    }

    .form-container .title {
    }
    .location-container hr {
      display: none;
    }
    .right-container {
      z-index: 9998;
      position: absolute;
      right: 0;
      top: 0;
      width: 400px;
    }
  }
</style>

