<template>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Kategoriya</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <MenuList v-for="category in categories" :category="category" :brands="filterBrands(category,this.brands)" :key="category.id" />
      </div>
    </div>
</template>
<script>
    import MenuList from "@/components/MenuList.vue";
    import {mapState} from "vuex";
export default {
    components:{
        MenuList,
    },
    name:"Menu",
    data() {
        return {
            
        }
    },

    computed: {
        ...mapState({
            categories: state => state.product.categories,
            brands: state => state.product.brands,
        })
    },

    methods: {
        filterBrands(category,brands){
          return brands = brands.filter(brand => {
            if(brand.category_id == category.id){
                return brand;
            }  
        });
        }
    },
}
</script>
<style scoped>
    
</style>