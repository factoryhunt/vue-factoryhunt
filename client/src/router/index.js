import Vue from 'vue'
import Router from 'vue-router'

// Client Controllers
import Home from '../controllers/Home/index'
import SearchResult from '../controllers/SearchResult/SupplierSearchResultPage.vue'
import AccountProfile from '../controllers/Account/AccountProfile'
import ProductProfile from '../controllers/ProductProfile'
import About from '../controllers/About'
import ContactUs from '../controllers/ContactUs/ContactUs.vue'
import LeadSearchDetail from '../controllers/LeadSearchDetail'
import NotFound from '../controllers/NotFound'
import Membership from '../controllers/Membership'
import Login from '../controllers/Login/Login.vue'
import SignUp from '../controllers/SignUp/SignUp.vue'
import Help from '../controllers/Help'
import FAQs from '../controllers/FAQs'
import TermsOfUse from '../controllers/TermsOfUse/TermsOfUse.vue'
import PrivacyPolicy from '../controllers/PrivacyPolicy/PrivacyPolicy.vue'
import ContactForm from '../controllers/ContactForm'
import ContactFormPremium from '../controllers/ContactFormPremium'

// Dashboard
import Dashboard from '../controllers/Dashboard/Dashboard.vue'
import DashboardHome from '../controllers/Dashboard/childrens/Home.vue'
import DashboardCompany from '../controllers/Dashboard/childrens/Company/Company.vue'
import DashboardCompanyEdit from '../controllers/Dashboard/childrens/Company/Edit.vue'
import DashboardCompanyDomain from '../controllers/Dashboard/childrens/Company/Domain.vue'
import DashboardCompanyImage from '../controllers/Dashboard/childrens/Company/ImageEdit.vue'
import DashboardCompanyCertification from '../controllers/Dashboard/childrens/Company/Certification.vue'
import DashboardProduct from '../controllers/Dashboard/childrens/Product/Product.vue'
import DashboardProductList from '../controllers/Dashboard/childrens/Product/List.vue'
import DashboardProductUpload from '../controllers/Dashboard/childrens/Product/Upload.vue'
import DashboardProductEdit from '../controllers/Dashboard/childrens/Product/Edit.vue'
import DashboardAccount from '../controllers/Dashboard/childrens/Account/Account.vue'
import DashboardAccountEdit from '../controllers/Dashboard/childrens/Account/Edit.vue'
import DashboardAccountPassword from '../controllers/Dashboard/childrens/Account/Password.vue'
import DashboardAccountManagement from '../controllers/Dashboard/childrens/Account/Management.vue'

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
      component: SearchResult
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
      path: '/signup',
      name: 'signup',
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
      component: TermsOfUse
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPolicy
    },
    {
      path: '/dashboard',
      component: Dashboard,
      // beforeEnter (to, from, next) {
      //   if (store.getters.getToken) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
      children: [
        {
          path: '',
          component: DashboardHome
        },
        {
          path: 'company',
          component: DashboardCompany,
          children: [
            {
              path: '',
              component: DashboardCompanyEdit
            },
            {
              path: 'domain',
              component: DashboardCompanyDomain
            },
            {
              path: 'image',
              component: DashboardCompanyImage
            },
            {
              path: 'certifications',
              component: DashboardCompanyCertification
            }
          ]
        },
        {
          path: 'product',
          component: DashboardProduct,
          children: [
            {
              path: '',
              component: DashboardProductList
            },
            {
              path: 'upload',
              component: DashboardProductUpload
            },
            {
              path: 'edit',
              component: DashboardProductEdit
            }
          ]
        },
        {
          path: 'account',
          component: DashboardAccount,
          children: [
            {
              path: '',
              component: DashboardAccountEdit
            },
            {
              path: 'password',
              component: DashboardAccountPassword
            },
            {
              path: 'management',
              component: DashboardAccountManagement
            }
          ]
        }
      ]
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
