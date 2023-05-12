<template>
    <nav aria-label="Page navigation example">
  <ul class="pagination d-flex justify-content-center">
    <PaginateListItem v-for="total_page in total_pages" :total_page="total_page" :key="total_page" :current_page="current_page" />
  </ul>
</nav>
</template>
<script>
import PaginateListItem from './PaginateListItem.vue';
import {mapState} from "vuex";
export default {
  name:"PaginateList",
  components:{PaginateListItem},

  props:{
    meta:Object
  },

  data() {
    return {
        current_page:this.meta.current_page,
        total_pages: Math.ceil(this.meta.total/9),
    }
  },

  computed: {
    ...mapState({
       
    })
  }
  
}
</script>
<style scoped>
    
</style>