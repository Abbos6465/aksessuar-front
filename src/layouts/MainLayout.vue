<template>
    <div class="layout-main">
      <Header/>
      <main>
        <RouterView />
      </main>
  
      <!-- <Footer /> -->
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import {mapActions} from "vuex";
//   import Footer from "@/components/AppFooter.vue";

  export default {
    name: "MainLayout",
    components: { Header },

    methods: {
        ...mapActions({
            me: "auth/me",
        })
    },

    mounted() {
      this.me()
            .then(res => {
        })
            .catch(error => {
            console.log("ERROR", error);
        });
    },

  }
  </script>
  
<style lang="scss">
    
</style>
  