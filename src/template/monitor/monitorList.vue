<template>
    <p  @click="getUrl">{{gameList.name}}</p>
</template>

<script>
import {searchGame} from '../../libs/gameId.js';
import get_this from '../../libs/get_this.js'
import store from "../../store/index.js";
export default {
    name : "monitorList",
    props:{
        gameList:{
            type: Object,
            default: () =>{}
                  // id: "mingpai",
                    // name: "明牌抢庄",
                    // boolean: true,
        },
        val:{
            type: Object,
            default:()=>{
                return { 
                    win: 0,
                    execute: 0,
                    setValueMap: null
                }
            }
        }
    },
    created() {
        if(this.gameList.id==get_this.col.proMonitor[0].id){
            get_this.get(this,"monitor");
        }
    },
    methods:{
        getUrl (){
            //用来标记那个显示
             setTimeout(()=>this.gameList.boolean = true,0)//iview上绑定原生事件监听有bug，所以用定时器凑合下
            //this.gameList.boolean = true;
            get_this.get(this,"monitor");
            let map = this.val.setValueMap
            let off;
            this.val.win = 0;
            this.val.executeWinLoss = 0;
           console.log(store);
            if(map){
                for (const name in map) {
                    if (map.hasOwnProperty(name)) {
                         off = searchGame( parseInt(name));
                         if(this.gameList.name == off){
                            this.val.win = map[name].winLossRate;
                           //给inputnumber赋值
                            this.val.execute = map[name].executeWinLoss;
                         }
                    }
                }
            }
           
        },
        setUrl (){ 
            console.log(this);     
            let gameData = this.gameList.url;
           //因为fish与斗地主等参数不同，用来判断参数
            if(gameData){
                let url = gameData.location;
                store.commit('setURL',url)
                if(gameData.params){
                    console.log(gameData.params)
                    if(this.gameList.id == "fish"){
                        gameData.params.rewardRate = this.val.win;
                        gameData.params.executeWinLoss = this.val.execute;
                        // for (const key in game.params) {
                        //     if (game.params.hasOwnProperty(key)) {
                        //         if(!game.params[key]){
                        //             game.params[key] = 'undefined';
                        //         } 
                        //     }
                        // }
                        let rewardRate = gameData.params.rewardRate;
                        let executeWinLoss = gameData.params.executeWinLoss;
                        console.log(gameData.params.rewardRate,gameData.params.executeWinLoss)
                         store.commit('setData',{rewardRate,executeWinLoss})
                    }else{
                      
                        gameData.params.winLossRate = this.val.win;
                        gameData.params.winLoss = this.val.execute;
                        // for (const key in game.params) {
                        //     if (game.params.hasOwnProperty(key)) {
                        //         if(!game.params[key]){
                        //             game.params[key] = undefined;
                        //         }
                                
                        //     }
                        // }
                        let win = gameData.params.winLossRate;
                        let execute = gameData.params.winLoss;
                        console.log(`win=${win},execute=${execute}`);
                        store.commit('setData',{winLossRate:win,winLoss:execute})
                    }
                    
                    
                }
            }
        }
    },
    beforeDestroy() {
        this.gameList.boolean = false;
        get_this.monitorCom.goodluck[0].boolean = true;//确保重新打开，选择项在第一个
        console.log(get_this.monitorCom)
    },
}
</script>

<style scoped>
 p{
     height: 100%;
     width: 100%;
 }
</style>
