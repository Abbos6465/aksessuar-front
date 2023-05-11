<template>
    <header>
        <nav class="navbar navbar-dark bg-dark fixed-top p-3">
            <div class="container-fluid">
                <LogoHeader />
               <div class="d-flex gap-3 align-items-center">
                <span class="text-white fw-bold">{{auth_user ? auth_user.username : ''}}</span>
                <Button v-if="auth_user" class="rounded-pill px-3 py-2 btn-outline-primary" @click="logout">Chiqish</Button>
                <RouterLink v-if="auth_user" class="btn rounded-pill px-3 py-2 btn-outline-success text-white" :to="{name:'ProductCreate'}" >Mahsulot qo'shish</RouterLink>
                <BurgerHeader />
                <Menu />
               </div>
            </div>
        </nav>
    </header>
</template>
<script>
import { RouterLink } from "vue-router";
import LogoHeader from '@/components/LogoHeader.vue';
import BurgerHeader from "@/components/BurgerHeader.vue";
import Menu from "@/components/Menu.vue";
import Button from "./UI/Button.vue";
import { mapActions,mapGetters } from "vuex";

export default {
    name: "Header",
    components: {
        LogoHeader,
        BurgerHeader,
        Menu,
        Button
    },

    computed: {
    ...mapGetters({
      auth_user: 'auth/user'
    }),
  },

    methods: {
        ...mapActions({
      fetchLogout: "auth/logout",
    }),
    async logout() {
      await this.fetchLogout()
        .then(() => {
          this.$router.push({
            name: "Login",
          });
        })
        .catch(() => {
          this.visible = true;
        });
    },
    },
}
</script>
<style scoped>
header{
    min-height: 70px;
}
</style>