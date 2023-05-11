import { login,register, logout, me} from "@/api/auth";
import * as types from "./properties/mutation_types";
import {
    setAccessToken,
    removeAccessToken,
    getAccessToken,
    getRefreshToken,
} from "@/utils/auth";

export const actions = {
    login({ commit}, data) {
         return new Promise((resolve, reject) => {
            commit("authStart");
            login(data)
                .then((res) => {
                    if(res && res.data.access_token) {
                        commit('authSuccess');
                        commit(types.SET_AUTH_USER, res.data.user);
                        commit(types.SET_AUTH_ACCESS_TOKEN, res.data.access_token);
                        setAccessToken(res.data.access_token);
                        resolve(res);
                    }
                })
                .catch((error) => {
                    commit('loginFailure',error.data);
                    reject(error);
                });
        });
    },

    register({commit}, data) {
        return new Promise((resolve,reject)=>{
            commit("authStart")
            register(data)
            .then((res) => {
                if(res && res.data.access_token) {
                    commit("authSuccess");
                    commit(types.SET_AUTH_USER, res.data.user);
                    commit(types.SET_AUTH_ACCESS_TOKEN, res.data.access_token);
                    setAccessToken(res.data.access_token);
                    resolve(res);
                }
            })
            .catch((error) => {
                commit('registerFailure',error.data);
                reject(error);
            });
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit(types.REMOVE_AUTH_ACCESS_TOKEN);
                    commit('SET_REGESTER',{id:1});
                    localStorage.removeItem('user');
                    removeAccessToken();
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    me({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            me()
                .then((res) => {
                    commit(types.SET_AUTH_USER, res.data);
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    refresh({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            const refresh_token = getRefreshToken();
            refresh({
                    refresh: refresh_token,
                })
                .then((response) => {
                    const data = response;
                    if (data.access) {
                        commit(types.SET_AUTH_ACCESS_TOKEN, data.access_token);
                        setAccessToken(data.access_token);
                        resolve(response);
                    }
                })
                .catch((err) => {
                    reject(err);
                    dispatch("resetToken");
                });
        });
    },

    resetToken({ commit }) {
        commit(types.REMOVE_AUTH_ACCESS_TOKEN);
        removeAccessToken();
    },

    checkExperesToken({ commit, dispatch }) {
        let token = getAccessToken();
        if (!token) {
            return false;
        }
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
            .split("")
            .map(function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        if (!JSON.parse(jsonPayload).exp) {
            dispatch("resetToken");
            return false;
        }
        let time = new Date((JSON.parse(jsonPayload).exp - 1200) * 1000);
        if (time < new Date()) {
            dispatch("refresh");
        }
        // setTimeout(checkExperesToken(), 120000);
        return true;
    },


    setToken(context, token) {
        context.commit(types.SET_AUTH_ACCESS_TOKEN, token);
        setAccessToken(token);
    },
    
    loginOneId({ commit }) {
        commit(types.SET_AUTH_ACCESS_TOKEN, getAccessToken());
        setAccessToken(getAccessToken());
        return new Promise((resolve, reject) => {
            getInfo()
                .then((res) => {
                    commit(types.SET_AUTH_USER, res.data);
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    changePassword({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            changePassword(data)
                .then((response) => {
                        resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};





