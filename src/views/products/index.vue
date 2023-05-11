<template >
    <div class="album py-5 bg-body-tertiary">
        <div class="container">
            <Loader v-if="isLoading" />
            <div class="row" v-else>
                    <ProductCard v-if="this.data && data.length>0" v-for="product in data" :product="product" :key="product.id" class="col-4 d-flex mb-4" />
                <h2 v-else class="text-danger not_data d-flex align-items-center justify-content-center">
                    Hozirda mahsulot mavjud emas
                </h2>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import Loader from "@/components/Loader.vue";
import ProductCard from "@/components/ProductCard.vue";
export default {
    
    computed:{
        ...mapState({
            isLoading: state => state.product.isLoading,
            data: state => state.product.data,
        })
    },

    data() {
        return {
            
        }
    },
    
    methods: {
            ...mapActions({
                products: "product/products"
            })
    },
    mounted() {
        this.products()
            .then(res => {
        })
            .catch(err => {
        });
    },

    components: { Loader,ProductCard }
}
</script>
<style scoped>
    .not_data{
        min-height: 100px;
    }
</style>