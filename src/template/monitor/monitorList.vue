<template>
    <p  @click="getUrl">{{gameList.name}}</p>
</template>

<script>
import {searchGame} from '../../libs/gameId.js';
import get_this from '../../libs/get_this.js'
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
        get_this.get(this,"monitor")
    },
    methods:{
        getUrl (){
             setTimeout(()=>this.gameList.boolean = true,0)//iview上绑定原生事件监听有bug，所以用定时器凑合下
            //this.gameList.boolean = true;
            let map = this.val.setValueMap
            let off;
            this.val.win = 0;
            this.val.executeWinLoss = 0;
           
            if(map){
                for (const name in map) {
                    if (map.hasOwnProperty(name)) {
                         off = searchGame( parseInt(name));
                         if(this.gameList.name == off){
                            this.val.win = map[name].winLossRate;
                            this.val.execute = map[name].executeWinLoss;
                         }
                    }
                }
            }
            console.log(this.val.win)
        },
        setUrl (){
            let game = this.gameList.url;
            if(game){
                let url = game.location;
                if(game.params){
                    if(this.gameList.id = "fish"){
                        game.params.rewardRate = this.val.win;
                        game.params.executeWinLoss = this.val.execute;
                    }else{
                        game.params.winLossRate = this.val.win;
                        game.params.winLoss = this.val.execute;
                    }
                    url = `${url}?userId=${this.$store.state.userId}`;
                    for (const key in game.params) {
                        if (game.params.hasOwnProperty(key)) {
                            if(!game.params[key]){
                                game.params[key] = undefined;
                            }
                            url+=`&${key}=${game.params[key]}`;
                        }
                    }
                    this.$store.commit('setURL',url)
                }
            }
        }
    }
}
</script>

<style scoped>
 p{
     height: 100%;
     width: 100%;
 }
</style>
