<template>
    <Loader v-if="this.isLoading"/>
    <div v-if="this.auth_user && this.product">
        <div v-if="this.auth_user.id==this.product.user_id || this.auth_user.role=='super_admin'">
            <EditProduct :product="product" />
        </div>
        <div class="not_permission mx-auto container" v-else>
            <h1 class="text-center text-warning w-75 px-3 mx-auto">Siz bu mahsulotni o'zgartirish huquqiga ega emassiz</h1>
            <!-- <div class="bg-warning"> -->
                <RouterLink  :to="{name:'Home'}">Bosh sahifa</RouterLink>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import EditProduct from "@/components/EditProduct.vue";
import Loader from "@/components/Loader.vue";
import { mapState, mapActions,mapGetters } from "vuex";
export default {
    name: "UpdateProductView",
    components: { EditProduct, Loader },
    computed: {
        ...mapState({
            product: state => state.product.productDetail,
            isLoading: state => state.product.isLoading
        }),


    ...mapGetters({
            auth_user: 'auth/user'
        }),
    },

    methods: {
        ...mapActions({
            productShow: 'product/productShow',

        }),
    },

    mounted() {
        this.productShow(this.$route.params.id)
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            });
    },
}
</script>
<style scoped>

    .not_permission{
        min-height: 80vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
    }

</style>