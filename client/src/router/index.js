import Vue from 'vue'
import Router from 'vue-router'

// Client Controllers
import Home from '../controllers/Home'
import SupplierSearchResultPage from '../controllers/SupplierSearchResultPage'
import AccountProfile from '../controllers/AccountProfile'
import ProductProfile from '../controllers/ProductProfile'
import About from '../controllers/About'
import ContactUs from '../controllers/ContactUs'
import LeadSearchDetail from '../controllers/LeadSearchDetail'
import NotFound from '../controllers/NotFound'
import Membership from '../controllers/Membership'
import Login from '../controllers/Login/Login.vue'
import SignUp from '../controllers/SignUp/SignUp.vue'
import Help from '../controllers/Help'
import FAQs from '../controllers/FAQs'
import Terms from '../controllers/Terms'
import Korean from '../controllers/Korean'
import API from '../controllers/API'
import ContactForm from '../controllers/ContactForm'
import ContactFormPremium from '../controllers/ContactFormPremium'

// import robots from '../../static/robots.txt'

// Admin Components
import Admin from '../admins/Home'
// import Auth from '../components/admins/Auth'
import Contents from '../admins/Contents'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactUs
    },
    {
      path: '/search',
      name: 'search',
      component: SupplierSearchResultPage
    },
    {
      path: '/membership',
      name: 'membership',
      component: Membership
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: SignUp
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: FAQs
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/korean',
      name: 'korean',
      component: Korean
    },
    {
      path: '/openapi',
      name: 'openapi',
      component: API
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/error',
      name: 'error',
      component: NotFound
    },
    {
      path: '/:company',
      name: 'company',
      component: AccountProfile
    },
    {
      path: '/admin/:status',
      name: 'admin-contents',
      component: Contents
    },
    {
      path: '/contact/lead',
      name: 'contact-lead',
      component: ContactForm
    },
    {
      path: '/contact/premium',
      name: 'contact-premium',
      component: ContactFormPremium
    },
    {
      path: '/account/profile',
      name: 'account-profile',
      component: AccountProfile
    },
    {
      path: '/product/profile',
      name: 'product-profile',
      component: ProductProfile
    },
    {
      path: '/supplier/result',
      name: 'supplier-result',
      component: LeadSearchDetail
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
