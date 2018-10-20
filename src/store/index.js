import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import api from '../net/api'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isStarted: false,
        userId: "",
        url:"",
    },
    mutations: {
        start (state) {
            state.isStarted = true
        },
        apiError (state, errorCode, error) {
            console.log('errorCode: ' + errorCode)
            console.log(error)
            this._vm.$Modal.error({
                title: '出错啦',
                content: api.errorText(errorCode)
            })
        },
         setId (state,userId){
             state.userId = userId;
         },
         setURL (state,url){
             state.url = url;
         }
    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;
