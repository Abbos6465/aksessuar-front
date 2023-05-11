<template>
    <Loader v-if="!product"/>
    <div class="container pt-5" v-else>
        <div>
            <img src="" alt="product img" width="1000">
            <div class="mt-5 d-flex align-items-center justify-content-between">
                <h2>{{ this.product.title }}</h2>
                <h2 class="text-secondary">{{product.brand.name}}</h2>
            </div>
            <h4 class="mt-3">{{product.price}} y.e</h4>
                <p class="mt-3">
                    {{product.content}}
                </p>
        </div>
    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';
import Loader from "@/components/Loader.vue"

export default {

    components:{
        Loader
    },

        computed:{
            ...mapState({
                product: state => state.product.productDetail,
                categories: state => state.product.categories,
                brands: state => state.product.brands,
            })
        },

    methods: {
        ...mapActions({
            productShow: 'product/productShow',
        })
    },

    mounted(){
        this.productShow(this.$route.params.id)
        .then(res=>{
            
        })
        .catch(err=>{
            console.log(err);
        });
    }
}
</script>
<style>
    
</style>