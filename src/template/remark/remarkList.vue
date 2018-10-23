<template>
    <p  @click="getUrl">{{gameList.gameName}}</p>
</template>

<script>
import {searchGame} from '../../libs/gameId.js';
import get_this from '../../libs/get_this.js'
import store from "../../store/index.js";
export default {
    name : "remarkList",
    props:{
        gameList:{
            type: Object,
            default: () =>{}
                  // id: "30001",
                    // name: "明牌抢庄",
                    // boolean: true,
        },
        val:{
            type: Object,
            default:()=>{
                return { 
                    win: 0,
                    execute: 0,
                    gameId: null
                }
            }
        }
    },
    created() {
        if(this.gameList.id==get_this.monitorCom.goodluck[0].id){
            get_this.get(this,"monitor");
        }
    },
    methods:{
        getUrl (){
            //用来标记那个显示
             setTimeout(()=>this.gameList.boolean = true,0)//iview上绑定原生事件监听有bug，所以用定时器凑合下
            //this.gameList.boolean = true;
            get_this.get(this,"monitor");
            this.val.win = 0;
            this.val.execute = 0;
        },
        setUrl (){ 
            console.log(this.gameList.gameId)
            this.val.gameId = this.gameList.gameId;
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
