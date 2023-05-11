<template>
    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ category.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><span type="button" @click="navigateHandler" class="dropdown-item">Barchasi</span></li>
                <MenuListItem v-for="brand in brands" :brand="brand" :key="brand.id" />
            </ul>
        </li>
    </ul>
</template>
<script>
import MenuListItem from './MenuListItem.vue';
import {mapActions} from "vuex";
export default {
    components: {
        MenuListItem
    },

    data() {
        return {
         
        }
    },

    props: {
        category: {
            type: String,
            required: true,
        },
        brands:{
            type:Array,
            required:true
        }
    },

    methods: {

        navigateHandler(){
            this.getProductsByCategory(this.category.id)
            .then(res => {
                this.$router.push(`/products/category/${this.category.id}`);
        })
            .catch(err => {
                console.log(err);
        });
        },

        ...mapActions({
            getProductsByCategory: "product/getProductsByCategory",
        }),
    },
}
</script>
<style scoped></style>