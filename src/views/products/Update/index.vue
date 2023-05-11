<template>
    <div>
       <EditProduct v-if="this.product" :product="product" />
       <Loader v-else />
    </div>
</template>
<script>
import EditProduct from "@/components/EditProduct.vue";
import Loader from "@/components/Loader.vue";
import { mapState,mapActions } from "vuex";
export default {
    name:"UpdateProductView",
    components:{EditProduct,Loader},
    computed:{
        ...mapState({
            product: state => state.product.productDetail
        })
    },

    methods: {
        ...mapActions({
            productShow: 'product/productShow'
        }), 
    },

    mounted() {
        this.productShow(this.$route.params.id)
        .then(res=>{
            
        })
        .catch(err=>{
            console.log(err);
        });
        },
}
</script>
<style scoped>
    
</style>