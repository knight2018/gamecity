<template>
    <div>
        <Row>
            <Col span="8">
                <Input class="search" v-model="value" placeholder="请输入要查询的用户备注" @on-enter="handleSearch"></Input>
                <Button type="primary" @click="handleSearch" icon="ios-search">搜索</Button>
            </Col>
            <Col span="3" disabled="!params.dataList.length">
                <Button type="primary" @click="handleMonitor" :disabled="bolean">监控</Button>
            </Col>
           
        </Row>
        <gameContorPlayList v-bind="params"></gameContorPlayList>
    </div>
</template>

<script>
import gameContorPlayList from './components/player-list';
import remark from "../../template/remark/remark";
import {remarkColumnsList} from './define.js';
import util from '../../libs/util';
import api from '../../net/api.js';
export default {
    components: {gameContorPlayList},
    name: "player-control-remark",
   data (){
       return {
           params:{
               columnList:remarkColumnsList,
               dataList:[
                //    {
                //        userName: "test",
                //        userId: 100449,
                //        totalCharge: 100,
                //        office: "在线",
                //        remark: 1,
                //    }
               ]
           },
           value:"",
           remark:"",
           bolean: true,
           goodluck:[
               {
                   gameId:"30001",
                   gameName:"明牌抢庄",
                   boolean: true,
               },
               {
                   gameId:"30003",
                   gameName:"斗地主",
                   boolean: false,
               },
               {
                   gameId:"30006",
                   gameName:"深海捕鱼",
                   boolean: false,
               }
           ],
           val:{
               win: 0,
               execute:0,
               gameId:""
           }
       }
   },
   methods:{
       handleSearch (){
           let val = this.value;
           let url = `/game/query-user-by-mark-type?markType=${val}`;
           api.getData(this,url,function(data){
               console.log(data);
           })
          this.params.dataList = [{
    userName: "test",
    userId: 100449,
    totalCharge: 100,
    office: "在线",
    remark: 1,
}]
       },
       handleMonitor(){
           this.$Modal.confirm({
               render: (h)=>{
                   return h('div',[
                       h('p',{
                         style:{
                                 height: "30px",
                                 textAlign: 'center',
                                 borderBottom: '1px solid #9a9a9a',
                                 fontSize: '16px'
                             }
                       },'监控中心'),
                       h(remark,{
                           props:{
                               goodluck:this.goodluck,
                               val: this.val
                           }
                       })
                   ])
               },
               onOk:()=>{
                   console.log(`gameid=${this.val.gameId}win=${this.val.win}execute=${this.val.execute}`)
               },
               onCancel:()=>{
                   this.val.win = 0;
                   this.val.execute = 0;
               }
           })
       },
      
   },
   computed:{
       newName (){
           return this.params.dataList;
       }
   },
   watch :{
       newName(val){
           this.bolean = val.length?false:true;
       }
       },
   
}
</script>

<style>
    .search{
        width: 200px;
    }
</style>
