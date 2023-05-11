<template>
    <ul class="list-group">
        <li v-for="errorMessage in errorMessages" :key="errorMessage" class="text-danger list-group-item list-group-item-danger  ">
            {{ errorMessage }}
        </li>
    </ul>
</template>
<script>


export default {
    
    props: {
        errors: {
            type: Object,
            required: true,
        }
    },

    // mounted(){
    //     console.log(errors);
    // }

    computed: {
        errorMessages(){
            return Object.keys(this.errors.errors).map(name=>{
                const msg = this.errors.errors[name].join(', ');
                return `${name}: ${msg}`;
            }); 
        }
    }
}
</script>
<style>
    
</style>