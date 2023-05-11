<template>
    <li><span type="button" class="dropdown-item" @click="navigateHandler">{{ this.brand.name }}</span></li>
</template>
<script>
import {mapActions} from "vuex";
export default {
    name:"MenuListItem",
    props:{
        brand:{
            type:String,
            required:true
        }
    },

    methods: {
       ...mapActions({
        getProductsByBrand: "product/getProductsByBrand",
       }),

       navigateHandler(){
        this.getProductsByBrand(this.brand.id)
            .then(res => {
                this.$router.push(`/products/brand/${this.brand.id}`);
        })
            .catch(err => {
                console.log(err);
        });
       }
    },
}
</script>
<style scoped>
    
</style>