<template>
    <div class="col" v-if="!isLoading">
        <div class="card shadow">
            <img :src="this.product.photo" class="card-img-top index-img" alt="product photo" width="200" height="150">
            <div class="card-body position-relative">
                <div class="d-flex align-items-center justify-content-between">
                    <h5 class="text-warning">{{ product.brand.name }}</h5>
                    <h5 class="text-warning">{{ product.category.name }}</h5>
                </div>
                <h5 class="card-title mt-3">{{ product.title }}</h5>
                <h5 class="card-text position-absolute bottom-1 mt-5">{{ product.price }} y.e</h5>
                <h5 class="card-text position-absolute bottom-1 mt-5">{{ product.price }} y.e</h5>
                <div class="btn-group position-absolute bottom-0 mb-3 mt-5">
                    <RouterLink class="btn btn-outline-success" :to="`/products/${this.product.id}`">Ko'rish</RouterLink>
                    <div class="btn-group" v-if="this.user && (this.user.id == this.product.user_id || this.user.role == 'super_admin')">
                        <RouterLink class="btn btn-outline-warning" :to="`/products/${this.product.id}/update`">O'zgartirish</RouterLink>
                        <Button class="btn-outline-danger" @click="productDeleteHandler">O'chirish</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapActions } from 'vuex';
import Button from './UI/Button.vue';
export default {

    data() {
        return {
            imageUrl:import.meta.env.VITE_APP_BASE_API,
            // url:asset(`storage/${this.product.photo}`)
        }
    },

    props: {
        product: {
            type: Object,
            required: true,
        }
    },

    components: { Button },

    computed: {
        ...mapState({
            user: state => state.auth.user,
            isLoading: state => state.product.isLoading,
        })
    },

    methods:{

        ...mapActions({
            productDelete: "product/productDelete",
            products: "product/products"
        }),

        productDeleteHandler(){
            this.productDelete(this.product.id)
            .then(res=>{
                console.log(res);
                this.$router.push({name:"Home"});
            })
            .catch(err=>{
                console.log(err);
            })

            this.products()
            .then(res => {
        })
            .catch(err => {
        });
        }
    },
}
</script>
<style scoped>
.card {
    width: 350px;
    min-height: 400px;
}

</style>