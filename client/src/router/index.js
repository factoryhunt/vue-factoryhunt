import Vue from 'vue'
import Router from 'vue-router'

// Client Controllers
import Index from '../controllers/Home/index'
import Home from '../controllers/Home/home'
import SearchResult from '../controllers/SearchResult/SupplierSearchResultPage.vue'
import AccountProfile from '../controllers/Account/AccountProfile'
import ProductProfile from '../controllers/ProductProfile'
import EmailVerification from '../controllers/Verification/Email.vue'
import About from '../controllers/About'
import ContactUs from '../controllers/ContactUs/ContactUs.vue'
import LeadSearchDetail from '../controllers/LeadSearchDetail'
import NotFound from '../controllers/NotFound'
import Thanks from '../controllers/Thanks/Thanks.vue'
import Membership from '../controllers/Membership'
import Login from '../controllers/Login/Login.vue'
import SignUp from '../controllers/SignUp/SignUp.vue'
import Help from '../controllers/Help'
import ForSupplier from '../controllers/ForSupplier/Home.vue'
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
      component: Index,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'about',
          component: About
        },
        {
          path: 'contact',
          component: ContactUs
        },
        {
          path: 'help',
          component: Help
        },
        {
          path: 'terms',
          component: TermsOfUse
        },
        {
          path: 'privacy',
          component: PrivacyPolicy
        },
        {
          path: 'membership',
          component: Membership
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
          path: 'search',
          component: SearchResult
        },
        {
          path: 'search/supplier',
          component: LeadSearchDetail
        },
        {
          path: 'verification/email',
          component: EmailVerification
        }
      ]
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
      path: '/for-supplier',
      name: 'forSupplier',
      component: ForSupplier
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
      path: '/thank-you-for-sign-up',
      component: Thanks
    },
    {
      path: '/error',
      name: 'error',
      component: NotFound
    },
    {
      path: '/:company',
      component: AccountProfile
    },
    {
      path: '/:company/:name',
      component: ProductProfile
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
