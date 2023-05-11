<template>
    <button :disabled="isLoading" class="btn btn-outline-primary">
        <slot/>
    </button>
</template>
<script>
export default {
    name:"Button",
    
    props:{
        isLoading:{
            type:Boolean,
            required:true,
        }
    }
}
</script>
<style scoped>
    button{
        /* min-width: 100px; */
    }
</style>