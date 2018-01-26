<template>
  <div class="page-container">

  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: `${this.input} | Factory Hunt`
    },
    data () {
      return {
        input: this.$route.query.input,
        products: [],
        accounts: [],
        leads: [],
        product_result: '',
        account_result: '',
        lead_result: '',
        product_count: 0,
        account_count: 0,
        lead_count: 0
      }
    },
    messages: {
      eng: {
        readMore: 'Read more',
        verifiedProducts: 'Verified products <small>{count}</small>',
        verifiedSuppliers: 'Verified suppliers <small>{count}</small>',
        suppliers: 'Suppliers <small>{count}</small>'
      },
      kor: {
        readMore: '더 보기',
        verifiedProducts: '추천 제품 <small>{count}</small>',
        verifiedSuppliers: '추천 제조업체 <small>{count}</small>',
        suppliers: '제조업체 <small>{count}</small>'
      }
    },
    methods: {
      getYear (year) {
        if (year) {
          year = year.split('-')

          if (year[0] === '0000') {
            return ''
          }
          return `(${year[0]})`
        }
      },
      routeLeadContactForm: function (index) {
        const id = this.leads[index].lead_id
        location.href = `/contact/lead?id=${id}`
      },
      routeAccountProfilePage: function (index) {
        const domain = this.accounts[index].domain
        location.href = `/${domain}?input=${this.input}`
      },
      routeProductProfilePage: function (index) {
        const productDomain = this.products[index].product_domain
        const accountId = this.products[index].account_id
        this.$http.get(`/api/data/account/${accountId}`)
          .then(res => {
            const domain = res.data.domain
            location.href = `/${domain}/${productDomain}?input=${this.input}`
          })
      },
      checkWebsiteLinkHasHttp: function (url) {
        if (url.indexOf('http') === -1) {
          url = ('http://' + url).toLowerCase()
          return url
        }
        return url
      },
      onLeadReadMore: function () {
        location.href = `/search/supplier?input=${this.input}`
      },
      checkResultCount: function (result, count) {
        var resultCount = '(' + count + ')'
        return result === 'Loading..' ? '' : this.addComma(resultCount)
      },
      addComma: function (str) {
        str = String(str)
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/index';

  .body-container {
    margin-top: 50px;

    .company {
      font-weight:300;
      cursor: pointer;
      display: inline;
    }

    #products {
      font-weight:500;
      font-size:16px;
    }

  }
</style>
