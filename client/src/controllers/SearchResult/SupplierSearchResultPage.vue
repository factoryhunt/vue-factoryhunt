<template>
  <div class="page-container">

    <div class="products-contents">
      <h2 v-lang.verifiedProducts="{count: checkResultCount(product_result, product_count)}"></h2>
      <div class="divider"></div>
      <div class="row">
        <div v-if="products.length === 0">
          <div style="padding: 0" class="col-md-12 col-sm-12 col-xs-12">
            <h5>{{ product_result }}</h5>
          </div>
        </div>
        <div v-else>

          <div v-for="(product, productIndex) in products" v-if="productIndex < 9" class="products-container">
            <div style="padding: 0" v-if="product.product_status" class="col-md-3 col-sm-6 col-xs-12">
              <div class="product-each-container">
                <a @click="routeProductProfilePage(productIndex)"><img class="product-preview-image" :src="product.product_image_url_1" alt="logo"></a>
                <p>{{ product.product_name }}</p>
                <div class="star-container" v-for="index in 5">
                  <i class="fa fa-star-o" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="accounts-contents">
      <h2 v-lang.verifiedSuppliers="{count: checkResultCount(account_result, account_count)}"></h2>
      <div class="divider"></div>
      <div class="row">
        <div style="padding: 0" class="col-md-9 col-sm-9">

          <div v-if="accounts.length === 0">
            <h5 style="margin-bottom: 35px">{{ account_result }}</h5>
          </div>
          <div v-else>
            <div v-for="(account, i) in accounts" v-if="i < 7">
              <div class="account-container">
                <h3 class="company" v-if="account.account_name_english" @click="routeAccountProfilePage(i)">{{account.account_name_english}} <small>{{ getYear(account.established_date) }}</small></h3>
                <h3 class="company" v-else @click="routeAccountProfilePage(i)">{{account.account_name}} <small>{{ getYear(account.established_date) }}</small></h3>
                <ul class="list-unstyled account-ul">
                  <li id="products">{{ account.products_english }}</li>
                  <li><a :href="checkWebsiteLinkHasHttp(account.website)" target="_blank">{{ account.website }}</a></li>
                  <li>{{ account.email }}</li>
                  <li>{{ account.phone }}</li>
                  <li>{{ account.mailing_city_english ? account.mailing_city_english + ',' : '' }} {{account.mailing_state_english ? account.mailing_state_english + ',' : ''}} {{ account.mailing_country_english }}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="leads-contents">

      <h2 v-lang.suppliers="{count: checkResultCount(lead_result, lead_count)}"></h2>
      <div class="divider"></div>
      <div class="row">

        <div style="padding: 0" class="col-md-9" v-if="leads.length === 0">
          <h5>{{ lead_result }}</h5>
        </div>

        <div v-else>
          <div v-for="(lead, index2) in leads" v-if="index2 < 7">
            <div style="padding: 0" class="col-md-9">
              <div class="directory-content">
                <h4 class="company" v-if="lead.company_english" @click="routeLeadContactForm(index2)">{{ lead.company_english }} <small v-show="getYear(lead.established_date) !== '0000'">{{ getYear(lead.established_date) }}</small></h4>
                <h4 class="company" v-else @click="routeLeadContactForm(index2)">{{ lead.company }} <small v-show="getYear(lead.established_date) !== '0000'">{{ getYear(lead.established_date) }}</small></h4>
                <ul class="list-unstyled lead-ul">
                  <li id="products">{{ lead.products_english }}</li>
                  <li><a :href="checkWebsiteLinkHasHttp(lead.website)" target="_blank">{{ lead.website }}</a></li>
                  <li>{{ lead.email }}</li>
                  <li>{{ lead.phone }}</li>
                  <li>{{ lead.mailing_city_english ? lead.mailing_city_english + ',' : '' }} {{lead.mailing_state_english ? lead.mailing_state_english + ',' : ''}} {{ lead.mailing_country_english }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="leads.length >= 7">
        <h4 class="text-left"><a @click="onLeadReadMore" v-lang.readMore></a></h4>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import FooterBar from '../../components/FooterBar'
  import Contact from '../ContactForm'

  export default {
    metaInfo: {
      title: 'Factory Hunt - Search Result'
    },
    components: {
      NavBar,
      FooterBar,
      Contact
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
      requestDatas: function () {
        this.leads = []
        this.accounts = []
        this.products = []
        this.product_result = 'Loading..'
        this.account_result = 'Loading..'
        this.lead_result = 'Loading..'
        this.product_count = 0
        this.account_count = 0
        this.lead_count = 0

        // Get products filtered by input
        this.$http.get(`/api/data/product/keyword/${this.input}`)
          .then((res) => {
            console.log(res.data.result)
            this.product_count = res.data.result.count
            this.products = res.data.result.products
            this.product_result = ''
            if (this.products.length < 1) {
              this.product_result = 'No result.'
            }
          })
        // Get accounts filtered by input
        this.$http.get(`api/data/account/keyword/${this.input}`)
          .then(res => {
            this.account_count = res.data.result.count
            this.accounts = res.data.result.accounts
            this.account_result = ''
            if (this.accounts.length < 1) {
              this.account_result = 'No result.'
            }
          })
        // Get leads filtered by input
        this.$http.get(`/api/data/lead/keyword/${this.input}`)
          .then((res) => {
            console.log(res.data)
            this.lead_count = res.data.result.count
            this.leads = res.data.result.leads
            this.lead_result = ''
            if (this.leads.length < 1) {
              this.lead_result = 'No result.'
            }
          })
      },
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
      },
      highlightTextOfSearchResultText () {
      }
    },
    created () {
      window.scrollTo(0, 0)
      this.requestDatas()
    },
    watch: {
      '$route.query.input' (newInput, oldInput) {
        this.input = newInput
        this.requestDatas()
      }
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

    /*Products section*/
    .products-contents {
      margin-bottom: 40px;
    }
    .products-contents .product-preview-image {
      width:100%;
    }
    .products-contents p {
      margin: 0;
      font-size:17px;
    }
    .products-contents .star-container {
      display: inline;
    }
    .products-contents .star-container i {
      color: #317fa9;
    }
    .product-each-container {
      padding: 10px;
      min-height:380px;
    }
    .products-contents .product-preview-image {
      box-shadow: 1px 1px 10px 1px #e4e4e4;
    }
    .products-contents .product-each-container p {
      margin-top: 7px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 라인수 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }

    /*Accounts section*/
    .accounts-contents {
      margin-bottom: 0px;
    }
    .accounts-contents h3 {
      line-height:1.4;
      font-size:20px;
    }
    .account-container {
      margin-bottom:25px;
    }

    /*Leads section*/
    .leads-contents {

    }
    .leads-contents .directory-content {
      margin-bottom:25px;
    }
    .leads-contents h4  {
      line-height:1.4;
      font-size:20px;
    }
    .leads-contents small {
      font-size: 65%;
    }
    .lead-ul, .account-ul {
      line-height:1.7;
    }
  }
</style>
