import { products,productShow,productCreate,productDelete,productUpdate,getProductsByCategory,getProductsByBrand } from "@/api/products"

export const actions = {
     products({commit},data){
         return new Promise((resolve,reject)=>{
            commit("getProductsStart");
            products()
            .then((res)=>{
                commit('getProductsSuccess',res.data);
                resolve(res.data);
            })
            .catch(error=>{
                commit("getProductsFailure");
                console.log("Error",error);
            })
        })
    },

    getProductsByCategory({commit},id){
        commit("getProductsStart");
        getProductsByCategory(id)
        .then((res)=>{
            commit('getProductsSuccess',res.data);
            resolve(res.data);
        })
        .catch(error=>{
            commit("getProductsFailure");
            console.log("Error",error);
        })
    },

    async getProductsByBrand({commit},id){
        commit("getProductsStart");
        await getProductsByBrand(id)
        .then((res)=>{
            commit('getProductsSuccess',res.data);
            resolve(res.data);
        })
        .catch(error=>{
            commit("getProductsFailure");
            console.log("Error",error);
        })
    },

   async productShow({commit},id){
        return await new Promise((resolve,reject)=>{
            commit('getProductDetailStart');
            productShow(id)
            .then(res=>{
                commit('getProductDetailSuccess',res.data);
                resolve(res.data);
            })
            .catch(error=>{
                commit("getProductDetailFailure");
                reject(error);
            })
        })
    },

    productDelete({commit},id){
        return new Promise((resolve,reject)=>{
            commit('deleteProductStart');
            productDelete(id)
            .then(res=>{
                commit('deleteProductSuccess');

                resolve(res);
            })
            .catch(err=>{
                commit('deleteProductFailure',err.data);
                reject(err)
            })
        })
    },

    productCreate({commit},data){
        return new Promise((resolve,reject)=>{
            commit("createProductStart");
            productCreate(data)
            .then(res=>{
                console.log(res.data);
                commit("createProductSuccess");
                resolve(res.data);
            })
            .catch(err=>{
                commit("createProductFailure");
                reject(err)
            })
        })
    },

    productUpdate({commit},{id,product}){
        return new Promise((resolve,reject)=>{
            console.log(product);
            commit('updateProductStart');
            productUpdate(id,product)
            .then(res=>{
                console.log(res);
                commit("updateProductSuccess");
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
}