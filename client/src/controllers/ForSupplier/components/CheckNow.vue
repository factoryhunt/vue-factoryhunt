<template>
  <section class="check-now" id="CHECK">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="section-title">
            <h2>전 세계 바이어를 위한 검색엔진</h2>
            <p>factoryhunt.com은 글로벌 제조업체 전문 검색엔진 입니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="link-btn">
            <!-- Link button -->
            <a href="https://www.factoryhunt.com" target="_blank" class="btn btn-large scrollUpDelay">검색엔진 링크</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1 scrollUpDelay">
          <img class="img-responsive" src="../../../assets/for_supplier/about-macbook.png" alt="check screen">
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

<style scoped>
  /*=============== Check Now ===============*/
  #CHECK {
    outline: none;
  }
  .check-now img {
    width: 100%;
  }
  .link-btn {
    margin-top: -20px;
    margin-bottom: 50px;
    text-align: center;
  }
  .btn-large,
  .btn-large:focus,
  .btn-large:active,
  .btn-large:visited {
    color: #F2583D;
    background: transparent;
    border: 1px solid rgba(27,31,35,0.2);
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 25px;
    font-weight: 600;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    -webkit-transition: all 500ms;
    -moz-transition: all 500ms;
    -ms-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
  }
  .btn-large:hover {
    background-color: #F2583D;
    color: #fff;
  }
</style>
