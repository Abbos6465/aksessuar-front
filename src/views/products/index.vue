<template >
    <div class="album py-5 bg-body-tertiary">
        <div class="container">
            <Loader v-if="isLoading" />
                <div class="row" v-if="this.data && data.length > 0">
                    <h1 class="text-primary mb-5 fw-bold">Barcha mahsulotlar</h1>
                    <ProductCard v-for="product in data" :product="product" :key="product.id" class="col-4 d-flex mb-4" />
                    <PaginateList :meta="this.meta" />
                </div>
                <h2 v-if="this.data && data.length==0" class="text-danger not_data d-flex align-items-center justify-content-center">
                    Hozirda mahsulot mavjud emas
                </h2>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Loader from "@/components/Loader.vue";
import ProductCard from "@/components/ProductCard.vue";
import PaginateList from "@/components/PaginateList.vue";
export default {
    name: "ProductIndex",
    computed: {
        ...mapState({
            isLoading: state => state.product.isLoading,
            data: state => state.product.data,
            meta : state => state.product.meta
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

    components: { Loader, ProductCard, PaginateList }
}
</script>
<style scoped>
.not_data {
    min-height: 100px;
}
</style>