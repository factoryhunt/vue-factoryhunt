<template>
  <section class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div id="copyright">
            <p>Copyright &copy; 2017 <a href="/"> - Factory Hunt</a> All Rights Reserved.</p>
            <p id="legal-info">주식회사 제로베이스소프트웨어 · 대표: 정연호, 김동현 · 사업자등록번호: 642-87-00765</p>
          </div>
        </div>
        <div class="col-md-2">
          <div class="policy-container">
            <a href="//www.factoryhunt.com/terms?lang=kor"><span>이용약관</span></a>
            <a href="//www.factoryhunt.com/privacy?lang=kor"><span>개인정보취급방침</span></a>
          </div>
        </div>
        <div class="col-md-1">
          <div class="scroll-top">
            <a href="#HOME" id="scroll-to-top"><i class="fa fa-angle-up"></i></a>
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

<style lang="less" scoped>
  @import '../../../assets/css/index';
  /*=============== Footer ===============*/
  .footer {
    background-color: rgba(41, 41, 41, 1);
    padding-bottom: 35px;
    padding-top: 35px;
    border-top: 1px solid #484848;
  }
  .policy-container {
    padding-top: 10px;
    a {
      white-space: nowrap;
      color: #8C8B8A;
      margin-right: 5px;
    }
  }
  #copyright p {
    color: #8C8B8A;
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
  }
  #copyright p a {
    text-decoration: none;
    color: #F2583D;
  }
  #legal-info {
    font-weight: 300 !important;
    font-size: 12px !important;
    margin-bottom: 0px !important;
  }
  .scroll-top {
    text-align: right;
  }
  .scroll-top a {
    background-color: #F2583D;
    padding: 15px;
  }
  .scroll-top a i {
    color: #fff;
    font-size: 25px;
    margin-top: 9px;
  }
</style>
