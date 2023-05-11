import * as types from "./properties/mutation_types";

export const mutations = {
    [types.SET_AUTH_ACCESS_TOKEN](state, access_token) {
        state.access_token = access_token;
    },

    [types.SET_AUTH_REFRESH_TOKEN](state, refresh_token) {
        state.refresh_token = refresh_token;
    },

    [types.REMOVE_AUTH_ACCESS_TOKEN](state) {
        state.access_token = null;
    },

    [types.REMOVE_AUTH_REFRESH_TOKEN](state) {
        state.refresh_token = null;
    },
    [types.SET_AUTH_USER](state, data) {
        state.user = data;
        state.role = data.role;
        localStorage.setItem('user', JSON.stringify(data))
    },
    SET_REGESTER(state,data){
        state.user = data
    },

    authStart(state){
        state.user = null;
        state.errors = null;
        state.role = null;
        state.isLoading = true;
        state.errorPage = null;
    },

    loginFailure(state,data){
        state.errors = data;
        state.errorPage = "Login";
        state.isLoading = false;
    },

    registerFailure(state,data){
        state.errors = data;
        state.errorPage = "Register";
        state.isLoading = false;
    },

    authSuccess(state){
        state.isLoading = false;
        state.errors = null;
        state.errorPage = null;
    }
};
