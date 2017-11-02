<template>
  <div class="admin-container">

    <navigation-bar></navigation-bar>

    <div class="row text-center">
      <input v-model="password" type="text">
    </div>

  </div>
</template>

<script>
  import NavigationBar from './NavigationBar'

  export default {
    components: {
      NavigationBar
    },
    data () {
      return {
        password: ''
      }
    }
  }
</script>

<style scoped>

</style>
