<template>
  <header class="header" id="HOME">
    <!--Navigation-->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#factoryhunt-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-left">
            <a class="navbar-brand" href="/">
              <img src="../../../assets/loog-b-2.png" alt="logo">
            </a>
            <a class="navbar-brand-title" href="/">
              <strong>Factory Hunt</strong>
              <span>제조업체 전문 검색엔진</span>
            </a>
          </div>
        </div>

        <!-- Col     the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="factoryhunt-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#ABOUT" class="nav-item">서비스</a></li>
            <li><a href="#FEATURES" class="nav-item">제품소개</a></li>
            <li><a href="#CHECK" class="nav-item">검색엔진</a></li>
            <li><a href="#CONTACT" class="nav-item">문의하기</a></li>
            <!-- Profile Image Menu -->
            <li class="dropdown" v-if="isUserLoggedIn">
              <div class="dropbtn" id="user-logo" @click="onProfileImage"></div>
              <div class="dropdown-content">
                <div class="dropdown-pointer"></div>
                <div class="dropdown-pointer-bg"></div>
                <div class="user-container">
                  <p class="user-email">{{contact.contact_email}}</p>
                  <p class="user-company-name">{{account.account_name}}</p>
                  <p class="user-name">{{contact.first_name + contact.last_name}}</p>
                </div>
                <div class="footer-divider"></div>
                <div class="footer">
                  <div class="footer-left">
                    <a id="my-page-button" @click="routeDashboardPage">관리자 센터</a>
                  </div>
                  <div class="footer-right">
                    <a id="logout-button" @click="onLogoutButton">로그아웃</a>
                  </div>
                </div>
              </div>
            </li>
            <li v-else><a href="https://www.factoryhunt.com/login?lang=kor" id="loginButton" class="nav-item">로그인</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div class="header-overlay">
      <div class="container header-container">
        <div class="row">
          <div class="col-md-6">
            <div class="header-text">
              <!-- Title & Description -->
              <h1><span>Factory Hunt</span>에서 영어 홈페이지와 온라인 카탈로그를 무료로 제작하세요. 해외 바이어와 연결됩니다.</h1>
              <p>PDF 파일만 있으면, 단 한번의 클릭으로 온라인 제품 카탈로그가 완성됩니다.</p>
            </div>
            <div class="header-btns scrollLeft">
              <!-- Header buttons -->
              <a href="https://www.factoryhunt.com/signup?lang=kor" id="startButton" class="btn btn-check">시작하기</a>
              <a href="#ABOUT" id="see-more-btn" class="btn btn-tour">
                자세한 정보 보기
                <i class="fa fa-angle-down"></i>
              </a>
            </div>
          </div>
          <div class="col-md-5 col-md-offset-1 scrollRight">
            <div class="header-signup">
              <!-- SignUp form -->
              <div class="signup-form text-gray bg-gray-light">
                <form @submit.prevent="onSignUpButton">
                  <div style="margin:0;padding:0;display:inline">
                    <input name="utf8" type="hidden" value="✓">
                  </div>
                  <dl class="form-group mt-0">
                    <dt class="input-label">
                      <label class="form-label f5" for="userCompany">제조업체 명칭(영어)</label>
                    </dt>
                    <dd>
                      <input type="text" pattern="[A-Za-z0-9 ().,]{2,50}" title="영어로 작성해 주세요. 특수기호는 ( ) . , 만 사용 가능합니다." required id="userCompany" v-model="value.company" class="form-control form-control-lg input-block" placeholder="제조업체 명칭을 영어로 적어주세요." autofocus="">
                    </dd>
                  </dl>
                  <dl class="form-group">
                    <dt class="input-label">
                      <label class="form-label f5" for="userEmail">이메일 주소</label>
                    </dt>
                    <dd>
                      <input type="email" required id="userEmail" v-model="value.email" class="form-control form-control-lg input-block" placeholder="you@example.com">
                    </dd>
                  </dl>
                  <dl class="form-group">
                    <dt class="input-label">
                      <label class="form-label f5" for="userPassword">비밀번호</label>
                    </dt>
                    <dd>
                      <input type="password" id="userPassword" v-model="value.password" class="form-control form-control-lg input-block" placeholder="비밀번호를 적어 주세요." required minlength="8">
                    </dd>
                    <p class="form-control-note1">비밀번호는 문자와 숫자의 조합으로 최소 8문자를 포함해야 합니다.</p>
                  </dl>
                  <spinkit id="sign-up-spinkit"></spinkit>
                  <button class="btn btn-primary btn-large btn-block btn-signup"> 계정 만들기 </button>
                  <p class="form-control-note2 mb-0 text-center">
                    계정 만들기 버튼을 클릭하면, Factory Hunt의 <a href="//www.factoryhunt.com/terms?lang=kor">이용약관</a>에 동의하며 쿠키 사용을 포함한 Factory Hunt의 <a href="//www.factoryhunt.com/privacy?lang=kor">개인정보취급방침</a>을 읽었음을 인정하게 됩니다.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import Spinkit from '../../../components/Spinkit/Spinkit.vue'
  export default {
    components: {
      Spinkit
    },
    props: ['isUserLoggedIn', 'account', 'contact'],
    data () {
      return {
        value: {
          company: '',
          email: '',
          password: ''
        },
        toggle: {
          isDropdownShown: false
        }
      }
    },
    methods: {
      async onSignUpButton () {
        const $spinkit = $('#sign-up-spinkit')
        const $signUpButton = $('.btn-signup')
        try {
          $spinkit.removeClass().addClass('spinkit-input')
          $signUpButton.css('display', 'none')
          await this.signUp()
          $spinkit.removeClass().addClass('invisible')
          $signUpButton.css('display', 'inherit')
          location.href = 'https://www.factoryhunt.com/thank-you-for-sign-up?lang=kor'
        } catch (err) {
          $spinkit.removeClass().addClass('invisible')
          $signUpButton.css('display', 'inherit')
          alert(err.msg_kor)
        }
      },
      signUp () {
        return new Promise((resolve, reject) => {
          const data = {
            company: this.value.company,
            email: this.value.email,
            password: this.value.password
          }
          this.$store.dispatch('signUp', data)
            .then(() => { resolve() })
            .catch((err) => { reject(err.response.data) })
        })
      },
      onLoginButton () {
        location.href = 'https://www.factoryhunt.com/login'
      },
      onLogoutButton () {
        this.$store.dispatch('logout')
      },
      onProfileImage () {
        const dropdown = $('.dropdown-content')

        if (this.toggle.isDropdownShown) dropdown.css({'display': 'none'})
        else dropdown.css({'display': 'inherit'})
        this.toggle.isDropdownShown = !this.toggle.isDropdownShown
      },
      routeDashboardPage () {
        location.href = '/dashboard'
      },
      applyImageBackgroundImage () {
        const $image = $('#user-logo')
        var image = this.account.thumbnail_url
        if (image) {
          image = 'url(' + image + ')'
        } else {
          image = 'url(../../../../static/temp-logo-image_512.png)'
        }
        $image.css('background-image', image)
      },
      activateJquery () {
        this.applyImageBackgroundImage()
        //    Show and hide menu
//      $(document).ready(function () {
//
//        $(window).scroll(function () {
//
//          if ($(window).scrollTop() < 80) {
//            $('.navbar').css({
//              'margin-top': '-100px',
//              'opacity': '0'
//            })
//            $('.navbar-default').css({
//              'background-color': 'rgba(59, 59, 59, 0)'
//            })
//          } else {
//            $('.navbar').css({
//              'margin-top': '0px',
//              'opacity': '1'
//            })
//            $('.navbar-default').css({
//              'background-color': 'rgba(59, 59, 59, 0.7)',
//              'border-color': '#444'
//            })
//            $('.navbar-brand img').css({
//              'height': '35px',
//              'padding-top': '0px'
//            })
//            $('.navbar-nav > li > a').css({
//              'padding-top': '15px'
//            })
//          }
//        })
//      })
        //    Active menu item on user click
        $(document).ready(function () {
          $('.navbar-nav li a').click(function () {
            $('.navbar-nav li a').parent().removeClass('active')
            $(this).parent().addClass('active')
          })
          //    Highlight menu item on scroll
          $(window).scroll(function () {
//
//          $(".navbar-nav li a[href='#HOME']").parent().removeClass('active')
            $('section').each(function () {
              var bb = $(this).attr('id') // ABOUT, CONTACT, CHECK
              var hei = $(this).outerHeight()
              var grttop = $(this).offset().top - 70
              if ($(window).scrollTop() > grttop && $(window).scrollTop() < grttop + hei) {
                $(".navbar-nav li a[href='#" + bb + "']").parent().addClass('active')
              } else {
                $(".navbar-nav li a[href='#" + bb + "']").parent().removeClass('active')
              }
            })
          })
          // customized error message
          var passwordInput = document.getElementById('userPassword')
          passwordInput.addEventListener('invalid', function (e) {
            if (passwordInput.validity.valueMissing) {
              e.target.setCustomValidity('비밀번호를 입력해 주세요.')
            } else if (!passwordInput.validity.valid) {
              e.target.setCustomValidity('비밀번호는 문자와 숫자의 조합으로 최소 8 문자를 포함해야 합니다.')
            }
            // to avoid the 'sticky' invlaid problem when resuming typing after getting a custom invalid message
            passwordInput.addEventListener('input', function (e) {
              e.target.setCustomValidity('')
            })
          }, false)
        })
      }
    },
    created () {
      this.activateJquery()
    },
    watch: {
      'account' () {
        this.applyImageBackgroundImage()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/index';

  #sign-up-spinkit {
    margin-bottom: 20px;
  }

  /* Small Devices */
  @media only screen and (max-width: 767px) {
    #loginButton {
      display: none;
    }
    #factoryhunt-navbar-collapse-1 {
      border-top-width: 0px;
    }
    #startButton {
      display: none;
    }
    .header-container {
      padding-top: 40px !important;
    }
    .header-btns {
      margin-top: 40px !important;
      margin-bottom: 10px !important;
    }
    .signup-form {
      display: none;
    }
  }
  /* Small Devices and Tablets */
  @media only screen and (max-width: 768px) {
    #loginButton {
      display: none;
    }
    #factoryhunt-navbar-collapse-1 {
      border-top-width: 0px;
    }
    #startButton {
      display: none;
    }
    .header-container {
      padding-top: 40px !important;
    }
    .header-btns {
      margin-top: 40px !important;
      margin-bottom: 10px !important;
    }
    .signup-form {
      display: none;
    }
  }
  /* Medium Devices and Desktop */
  @media only screen and (max-width: 992px) {
  }
  /* Large Devices and Wide Screen */
  @media only screen and (max-width: 1200px) {
  }

  /*=============== Navigation ===============*/
  .navbar-default {
    background-color: rgba(255, 255, 255, 1);
    border-color: white;
    z-index: 110;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: 0px;
    border-radius: 0px;
  }
  .navbar-default .navbar-nav > li > a {
    color: #484848;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .navbar-default .navbar-nav > li > a:hover {
    color: #F2583D;
  }
  .navbar-default .navbar-nav > li > a:focus {
    color: #484848;
  }
  .navbar-left {
    width: 250px;
  }
  .navbar-brand {
    padding: 0px 15px;
  }
  .navbar-brand img {
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
    width: 50px;
  }
  .navbar-brand-title {
    position: relative;
    top: -3px;
    color: transparent;
  }
  .navbar-brand-title > strong {
    font-size: 22px;
    color: #F2583D;
  }
  .navbar-brand-title > span {
    font-size: 16px;
    height: 10px;
    color: #484848;
    display: block;
  }
  .navbar-nav {
    font-size: 17px;
  }
  .navbar-default .navbar-nav > .active>a,
  .navbar-default .navbar-nav > .active>a:hover,
  .navbar-default .navbar-nav > .active>a:focus {
    background-color: transparent;
    color: #F2583D;
  }

  /* when logged in */
  #user-logo {
    cursor: pointer;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: 50% 50% !important;
    border-radius: 50%;
    border: 2px solid @color-light-grey;
    width: 40px;
    height: 40px;
    margin-top: 5px;
    margin-left: 10px;
  }

  .dropdown {
    position: relative;
    display: inline-block;

    .dropdown-pointer {
      border-color: transparent;
      border-bottom-color: @color-white;
      border-style: dashed dashed solid;
      border-width: 0 8.5px 8.5px;
      position: absolute;
      height: 0;
      width: 0;
      top: -9px;
      right: 10px;
      z-index: 5;
    }
    .dropdown-pointer-bg {
      border-color: transparent;
      border-bottom-color: @color-light-grey;
      border-style: dashed dashed solid;
      border-width: 0 8.5px 8.5px;
      position: absolute;
      height: 0;
      width: 0;
      top: -10px;
      right: 10px;
      z-index: 4;
    }

    .dropdown-content {
      width: 300px;
      border: 1px solid @color-light-grey;
      border-radius: @border-radius;
      display: none;
      padding: 12px 20px;
      top: 100% + 25px;
      right: 0;
      position: absolute;
      background-color: @color-white;
      min-width: 160px;
      box-shadow: 0 2px 10px rgba(0,0,0,.2);
      z-index: 1;

      .user-container {
        margin-bottom: 50px;
        text-align: right;
        .user-email {
          margin: 0;
          font-weight: 400;
        }

        .user-company-name {
          word-wrap: break-word;
          font-size: 22px;
          font-weight: 500;
        }

        .user-name {
          font-size: 18px;
          font-weight: 300;
        }
      }

      .footer-divider {
        height: 1px;
        background-color: @color-light-grey;
        position: absolute;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 60px;
      }

      .footer {
        display: table;
        width: 100%;
        margin-bottom: 5px;

        .footer-left {
          display: table-cell;
          text-align: left;

          #my-page-button {
            display: inline !important;
            margin: 0 12px;
            color: @color-orange;
            /*<!--border: 1px solid @color-deep-gray;-->*/
            /*<!--border-radius: @border-radius;-->*/
            /*<!--padding: 5px 12px;-->*/
            /*<!--background-color: @color-light-grey;-->*/

            &:hover {
              //
            }
          }
        }

        .footer-right {
          display: table-cell;
          text-align: right;

          #logout-button {
            display: inline !important;
            margin: 0 12px;
            color: @color-font-base;
            /*<!--border: 1px solid @color-deep-gray;-->*/
            /*<!--border-radius: @border-radius;-->*/
            /*<!--padding: 5px 12px;-->*/
            /*<!--background-color: @color-light-grey;-->*/
          }
        }

        a {
          text-decoration: none !important;
          display: block !important;
        }
      }
    }
  }

  /*=============== Header ===============*/
  .header-container {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .header {
    background-image: url("../../../assets/for_supplier/header-bg.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -webkit-background-size: cover;
  }
  .header-overlay {
    background-color: rgba(31, 31, 31, .75);
  }
  .logo img {
    width: 55px;
    padding-bottom: 50px;
  }
  .header-text h1 {
    color: #fff;
    font-size: 35px;
    font-weight: 300;
    line-height: 45px;
    padding-top: 30px;
    padding-bottom: 12px;
  }
  .header-text > h1 > span {
    color: #F2583D;
  }
  .header-text p {
    color: #fff;
    font-size: 20px;
    line-height: 28px;
    font-weight: 300;
    margin-bottom: 3px;
  }
  .header-btns {
    margin-top: 90px;
    margin-bottom: 50px;
  }
  .btn-check,
  .btn-check:focus,
  .btn-check:active,
  .btn-check:visited {
    color: #F2583D;
    background: transparent;
    border: 1px solid #F2583D;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 19px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .btn-check:hover {
    background-color: #F2583D;
    color: #fff;
  }
  .btn-tour,
  .btn-tour:focus,
  .btn-tour:active,
  .btn-tour:visited {
    color: #A9ADB0;
    margin-left: 20px;
    font-size: 19px;
    font-weight: 500;
    background: transparent;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .btn-tour:hover {
    color: #fff;
  }
  .btn-tour i {
    font-size: 20px;
    padding-left: 5px;
    color: #F2583D;
  }
  .signup-form .form-control {
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
  #HOME {
    outline: none !important;
  }

  /*=============== SignUp Form ===============*/
  .signup-form {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
    padding-right: 24px !important;
    padding-left: 24px !important;
    border-radius: 3px !important;
    font-size: 18px !important;
  }
  .bg-gray-light {
    background-color: #fafbfc !important;
  }
  .text-gray {
    color: #586069 !important;
  }
  .form-control-note1 {
    margin-top: 5px;
    margin-bottom: 0;
    font-size: 13px;
    color: #6a737d;
  }
  .form-control-note2 {
    margin-top: 15px;
    margin-bottom: 0;
    font-size: 12px;
    color: #6a737d;
  }
  .btn-signup {
    font-size: 16px;
    padding: 0.75em 1.25em;
    border-radius: 6px;
    color: #fff;
    background-color: #F2583D;
    background-image: linear-gradient(-180deg, #ff844a 0%, #F2583D 90%);
    border: none;
  }
  .btn-signup,
  .btn-signup:focus,
  .btn-signup:active,
  .btn-signup:visited,
  .btn-signup:hover {
    outline: none;
  }

  /* When the pattern is matched */
  input[type=text]:valid,
  input[type=email]:valid,
  input[type=password]:valid {
    border: 0.5px solid #009933;
  }

</style>
