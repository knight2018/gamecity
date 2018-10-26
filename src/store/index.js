import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import api from '../net/api'
import market from './modules/market'
import component from './modules/component'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isStarted: false,
        userId: "",
        url:"",
        data:{
            winLossRate: "",
            winLoss: "",
            rewardRate: "",
            executeWinLoss: ""
        },
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
         },
         setData (state,winData){
             console.log(winData)
                state.data.winLossRate = winData.winLossRate||"";
                state.data.winLoss = winData.winLoss||"";
                state.data.rewardRate = winData.rewardRate||"";
                state.data.executeWinLoss = winData.executeWinLoss||"";
             }
             
         },
   
    actions: {
        test ({commit,state},params){
            console.log(params);
        }
    },
    modules: {
        app,
        user,
        market,
        component
    }
});

export default store;
