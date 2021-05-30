<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import constatns from './constants'
export default {
  methods: {
    getData(){
      axios.get(constatns.contacts).then(response => {
        this.$store.commit('setContacts', response.data.acf)
      })
      axios.get(constatns.news).then(response => {
        this.$store.commit('setNews', response.data.acf)
      })
      axios.get(constatns.portfolio).then(response => {
        this.$store.commit('setPortfolio', response.data.acf)
      })
      axios.get(constatns.about).then(response => {
        this.$store.commit('setAbout', response.data.acf)
      })
      axios.get(constatns.services).then(response => {
        this.$store.commit('setServices', response.data.acf)
      })
    }
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss">
$dark : #126B8F;
$light: #2EACDA;
*{
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}
body{
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}

</style>
