<template>
    <li class="page-item"><span type="button" :class="this.total_page==this.current_page ? 'page-link active' : 'page-link' " @click="pageToHandler" >{{ this.total_page }}</span></li>
</template>
<script>
import {mapActions} from "vuex";
export default {
    name:"PaginateListItem",

    props:{
        total_page:Number,
        current_page:Number,
    },

    methods: {

        ...mapActions({
            pageHandler: 'product/pageHandler'
        }),

        pageToHandler(){
            this.pageHandler({url:this.$route.path,pageNumber:this.total_page})
            .then(res=>{
                
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
}
</script>
<style scoped>
    
</style>