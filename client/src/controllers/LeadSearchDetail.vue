<template>
  <div class="page-container">

    <nav-bar :inputData="input"></nav-bar>

    <div class="contents">

      <div class="leads-container">
        <h2>Suppliers <small>({{ addComma(lead_count) }})</small> </h2>
        <hr>
        <div class="row">

          <div v-for="(lead, index) in leads">
            <div class="col-md-9 directory-content">
              <h3 id="company" v-if="lead.company_english" @click="routeLeadContactForm(index)">{{ lead.company_english }} <small v-show="getYear(lead.established_date) !== '0000'">({{ getYear(lead.established_date) }})</small></h3>
              <h3 id="company" v-else @click="routeLeadContactForm(index)">{{ lead.company }} <small v-show="getYear(lead.established_date) !== '0000'">({{ getYear(lead.established_date) }})</small></h3>
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

      <nav aria-label="pagination-container">
        <ul class="pagination">
          <li>
            <a @click="routePrevPage" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(lead, index) in Math.ceil(lead_count/10)" v-if="index < 10" :class="(page * 10) + index === select ? 'active' : '' " @click="requestDatas((page * 10) + index)"><a>{{(page * 10) + index+1}}</a></li>
          <li>
            <a @click="routeNextPage" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar.vue'
  export default {
    metaInfo: {
      title: 'Factory Hunt - Search result in Lead'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        input: this.$route.query.input,
        select: 0,
        page: 0,
        leads: [],
        lead_result: '',
        lead_count: 0,
        pagination: Math.ceil((this.lead_count / 10) / 10)
      }
    },
    methods: {
      requestLeadCount: function () {
        this.$http.get(`/api/data/lead/${this.input}/count`)
          .then(response => {
            this.lead_count = response.data.count
          })
      },
      requestDatas: function (index) {
        window.scrollTo(0, 0)
        this.select = index
        this.leads = []
        console.log(this.select)
        // Get leads filtered by input
        this.$http.get(`/api/data/lead/${this.input}/${this.select}`)
          .then((leadResponse) => {
            this.leads = leadResponse.data
          })
      },
      getYear: function (year) {
        year = year.split('-')
        console.log(year)
        console.log(typeof year)
        return year[0]
      },
      routeLeadContactForm: function (index) {
        const company = this.leads[index].company
        const id = this.leads[index].lead_id
        this.$router.push({
          path: '/contact/lead',
          query: {
            company: company,
            id: id
          }
        })
      },
      checkWebsiteLinkHasHttp: function (url) {
        if (url.indexOf('http') === -1) {
          url = ('http://' + url).toLowerCase()
          return url
        }
      },
      routeNextPage: function () {
        const pagination = Math.ceil((this.lead_count / 10) / 10)
        console.log('this.pagination: ' + pagination)
        if (this.page < pagination - 1) {
          this.page += 1
          this.requestDatas(this.page * 10)
        }
      },
      routePrevPage: function () {
        if (this.page > 0) {
          this.page -= 1
          this.requestDatas(this.page * 10)
        }
      },
      addComma: function (str) {
        str = String(str)
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
      }
    },
    created () {
      this.requestLeadCount()
      this.requestDatas(0)
    }
  }
</script>

<style scoped>
  #company {
    font-weight:300;
    margin-bottom: 6px;
    cursor: pointer;
    display: inline;
  }

  #products {
    font-weight:500;
    font-size:16px;
  }
  a {
    font-weight:500;
  }

  /*Leads section*/
  .leads-container h3 {
    line-height:1.4;
    font-size: 20px;
  }
  .directory-content {
    margin-bottom: 15px;
  }

  .lead-ul {
    line-height:1.7;
  }
</style>
