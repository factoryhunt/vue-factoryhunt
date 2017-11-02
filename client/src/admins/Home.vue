<template>
  <div class="admin-container">

    <navigation-bar></navigation-bar>

    <div class="contents-admin">

      <div v-if="signed">

        <side-bar></side-bar>

      </div>

      <div v-else>
        <h3>
          <div class="row">
            <div class="form-container">
              <div class="col-md-12">
                You have to enter your identification
              </div>
              <div class="col-md-12">
                Email <input :value="email" v-model="email" title="email" type="text">
              </div>
              <div class="col-md-12">
                Password <input :value="password" v-model="password" title="password" type="password">
              </div>
              <div @click="onLogin" class="btn btn-primary">
                Log in
              </div>
              <div @click="onLogout" class="btn btn-primary">
                Log out
              </div>
              <div @click="onCall" class="btn btn-primary">
                Session Call
              </div>
            </div>
          </div>

        </h3>
      </div>
    </div>



  </div>
</template>

<script>
  import NavigationBar from './NavigationBar'
  import SideBar from './SideBar'

  export default {
    components: {
      NavigationBar,
      SideBar
    },
    data () {
      return {
        signed: false,
        email: '',
        password: '',
        input: ''
      }
    },
    methods: {
      onLogin: function () {
        const data = {
          email: this.email,
          password: this.password
        }
        this.$http.post('/api/auth/login', data)
          .then(res => {
//            const result =
            const msg = res.data.msg

            if (msg) return alert(msg)

            const user = res.data
            this.signed = true
            console.log(user)
//            const user = response.data.passport.user
//            this.email = user.first_name_english
//            this.password = ''
          })
      },
      onLogout: function () {
        this.$http.post('api/auth/logout')
          .then(response => {
            console.log(response)
            this.signed = false
          })
      },
      onCall: function () {
        this.$http.get('/api/auth/session')
          .then(res => {
            const user = res.data.passport.user
            console.log(user)
            if (user) this.signed = true
            else this.signed = false
          })
      }
    },
    created () {
      this.onCall()
    },
    watch: {
      '$route.params.input' (newInput, oldInput) {
        console.log('params.input changed')
        this.input = newInput
      }
    }
  }
</script>

<style scoped>
  .contents-dashboard {
  }
</style>
