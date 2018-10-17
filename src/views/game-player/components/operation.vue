<template>
     <a @click="kickOff">踢下线</a>
</template>
<style scoped>
   
</style>
<script>
import util from '../../../libs/util';
import api from '../../../net/api';
import get_this from '../../../libs/get_this';
export default{
        name: 'operationCom',
        props:{
            userName:{
                type: String,
                default:''
            },
            userId:{
                type: Number,
                default: 0
            },
            userURL:{
                type:String,
                default: ''
            }
        },
        
         methods:{
             kickOff (){
                 console.log(this.$parent.$parent.$parent.$parent.$parent.$parent.$parent)
                 console.log(get_this.col)
                 if(get_this.col.params.data1[0].offline =="在线"){
                    util.confirm(get_this.col,`确定将<b>${this.userName}</b>踢下线？`,()=>{
                     api.postData(get_this.col,api.URL.KickUser,{userId:this.userId},//this.$parent可能出bug
                         data =>{
                             alert();
                         },error =>{
                             alert();
                        }
                        
                     )
                 })
                 }else{
                     util.confirm(get_this.col,`玩家已离线`,()=>{

                     })
                 }
               
             }
         },
     }
</script>
