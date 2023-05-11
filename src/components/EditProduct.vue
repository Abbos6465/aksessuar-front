<template>
    <div class="container mt-5 w-50 shadow-lg p-5 rounded-2">
        <label for="" class="mt-4">Kategoriyani tanlang</label>
        <select @change="getBrands" v-model="this.category_id" class="form-select mt-2 p-2" aria-label="Default select example">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name
            }}</option>
        </select>
        <label for="" class="mt-4">Brandni tanlang</label>
        <select v-model="this.brand_id" class="form-select mt-2 p-2" aria-label="Default select example">
            <option v-if="category_id != null" v-for="brand in updatedBrands" :key="brand.id" :value="brand.id">{{ brand.name
            }}</option>
            <option v-else value=""><span class="text-danger">Iltimos kategoriyani kiriting</span></option>
        </select>
        <Input :type="'text'" :label="'Sarlavha'" v-model="this.title" />
        <Input :type="'number'" :label="'Narxi y.e'" v-model="this.price" />
        <Input :type="'text'" :label="'Tavsif'" v-model="this.content" />
        <input v-modal="this.photo" :value="this.photo" type="file" class="form-control p-2 mt-4" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
        <button class="btn btn-primary mt-4 w-75 d-block mx-auto" @click="updateProduct">Qo'shish</button>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
export default {
    name:"UpdateProduct",
    props:{
        product:{
            type:Object,
            required:true
        }
    },

    computed: {
        ...mapState({
            categories: state => state.product.categories,
            brands: state => state.product.brands,
        })
    },

    components: {
        Input,
        Button,
    },

    data() {
        return {
            category_id: this.product.category.id,
            brand_id: this.product.brand.id,
            updatedBrands: '',
            title: this.product.title,
            price: this.product.price,
            content: this.product.content,
            photo: this.product.photo
        }
    },

    methods: {

        ...mapActions({
            productUpdate: 'product/productUpdate'
        }),

        getBrands() {
            if (this.category_id != null) {
                return this.updatedBrands = this.brands.filter(brand => {
                    if (brand.category_id == this.category_id) {
                        return brand;
                    }
                })
            }
        },

        updateProduct(){
            let data={
                category_id:this.category_id,
                brand_id:this.brand_id,
                title:this.title,
                price:this.price,
                content:this.content,
                photo:this.photo,
            }

            this.productUpdate({id:this.$route.params.id,product:data})  
            .then(res=>{
                this.$router.push({name:'Home'})
            })
            .catch(err=>{
                console.log("ERROR",err);
            })
        }
    },

    mounted(){
                return this.updatedBrands = this.brands.filter(brand => {
                    if (brand.category_id == this.category_id) {
                        return brand;
                    }
                })
    }
}
</script>
<style scoped>
    
</style>