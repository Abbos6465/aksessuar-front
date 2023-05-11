export const mutations = {
    getProductsStart(state){
        state.isLoading = true;
        state.data = null,
        state.error = null,
        state.productDetail = null
    },

    getProductsSuccess(state,payload){
        state.isLoading = false;
        state.data = payload;
    },

    getProductsFailure(state){
        state.isLoading = false;
    },

    getProductDetailStart(state){
        state.isLoading = true;
        state.data = null;
        state.error = null;
        state.productDetail = null;
    },

    getProductDetailSuccess(state,payload){
        state.isLoading = false;
        state.productDetail = payload;
    },

    getProductDetailFailure(state){
        state.isLoading = false;
    },

    createProductStart(state){
        state.errors = null;
        state.validationPage = null;
        state.isLoading = true;
    },
    createProductSuccess(state){
        state.isLoading = false;
        state.validationPage = null;
    },
    createProductFailure(state,payload){
        state.isLoading = false;
        state.errors = payload;
        state.validationPage = "ProductCreate";
    },

    deleteProductStart(state){
        state.isLoading = true;
        state.error = null;
    },
    deleteProductSuccess(state){
        state.isLoading = false;
    },
    deleteProductFailure(state,payload){
        state.isLoading = false;
        state.error = payload;
    },

    updateProductStart(state){
        state.errors = null;
        state.validationPage = null;
        state.isLoading = true;
    },
    updateProductSuccess(state){
        state.isLoading = false;
        state.validationPage = null;
    },
    updateProductFailure(state,payload){
        state.isLoading = false;
        state.errors = payload;
        state.validationPage = "ProductUpdate";
    },
}