<template>
    <RouterLink :active="isActive" class="navbar-brand" :class="this.$route.name == 'Home' ? 'text-info fw-bolder' : 'text-white'" :to="{name:'Home'}" >olma.uz</RouterLink>
</template>
<script>
export default {
    name:"LogoHeader",
}
</script>
<style scoped>
    
</style>