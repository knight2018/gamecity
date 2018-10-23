<template>
    <PageablePlayerList v-bind="params">
        
    </PageablePlayerList>
</template>
<script>
    import PageablePlayerList from './components/search-com.vue';
    import {searchGame} from '../../libs/gameId.js';
    import get_this from '../../libs/get_this';
    import {searchColumns} from './define.js';
    import util from '../../libs/util';
    import api from '../../net/api.js';
    import monitorCom from '../../../src/template/monitor/monitor-com.vue'
    export default {
        components:{PageablePlayerList},
        name:'player-control-search',
        data (){
            return {
                params: {
                    columns1:searchColumns,
                    data1:[]    
                },
                btn: false,
                editForm: {
                    userId: null,
                    rewardRate: null,
                    executeWinLoss: null,
                    remark: null,       
                },
                proMonitor:[
                    {
                         id:"mingpai",
                         name:"明牌抢庄",
                         boolean: true,
                         url:{
                             get: "post",
                             location:api.URL.MingPai_Update_Player_Winloss,
                             params:{
                                 winLossRate:null,
                                 winLoss:null
                             }
                         }

                     },
                     {
                         id:"doudizhu",
                         name:"斗地主",
                         boolean: false,
                         url:{
                             get: "post",
                             location:api.URL.DouDiZhu_Update_Player_Winloss,
                             params:{
                                 winLossRate:null,
                                 winLoss:null
                             }
                         }
                     },
                     {
                         id:"fish",
                         name:"深海捕鱼",
                         boolean: false,
                         url:{
                             get: "post",
                             location:api.URL.Fishing_Update_Monitor(),
                             params:{
                                 rewardRate:null,
                                 executeWinLoss:null
                             }
                         }
                     }
                ],
                val:{
                    win:0,
                    execute: 0,
                    setValueMap: null
                },
                url: null,
                winLossRate:null,
                winLoss:null,
                userId: null,
                rewardRate:null, //捕鱼接口参数
                executeWinLoss:null,
                timer4syncTableInfo: null //4秒刷新一次数据
            }
        },
    
        methods:{
            getTableInfo (){
                let _this = this,
                    url = api.URL.Search_Player_Id(this.editForm.userId);
                    console.log(url);
                api.getData(this,url,function(data){
                    if(data.data){
                        let datas = data.data;
                           if(datas.isOnline == false){
                               datas['isOnline'] = '离线';
                           }else{
                               datas['isOnline'] = '在线';
                           }
                           datas.gameId = searchGame(datas.gameId)
                          _this.params.data1 = [datas];
                          _this.val.setValueMap = datas.setValueMap;           
                        console.log(_this)
                    }
                }
                )

            },
            showUpdataRemark (){
                this.$Modal.confirm({
                    title:'<p style="font-weight:bolder;font-color:red;font-size:16px">编辑备注</p><br/>',
                    render: (h)=>{
                        return h('div',[
                            h('Input',{
                                props:{
                                    value:this.editForm.remark,
                                    autofocus: true,
                                    placeholder:'备注'
                                },
                                on: {
                                    'on-blur': o=>{
                                        this.editForm.remark = o.target.value;
                                    }
                                }
                            })
                        ]);
                    },
                     onOk: ()=>{
                         let url=api.URL.Fishing_Update_Remark(),
                         _this = this;
                         api.postData(this,url,{userId:_this.editForm.userId,remark:_this.editForm.remark},function(data){
                            console.log(data);
                            
                         },function(error){
                            
                             _this.editForm.remark = null;
                         }
                         )   
                    },
                    onCancel: ()=>{
                        this.editForm.remark = null;
                    }
                })
            },
            showMonitor (){
                let that = this;
                if(this.val.setValueMap['30001']){
                    that.val.win = this.val.setValueMap['30001'].winLossRate;
                    that.val.execute = this.val.setValueMap['30001'].executeWinLoss
                }
                this.$Modal.confirm({
                    render: (h,params) =>{
                        console.log(params)
                        return h('div',[
                            h('p',{
                                style:{
                                    height: "30px",
                                    textAlign: 'center',
                                    borderBottom: '1px solid #9a9a9a',
                                    fontSize: '16px'
                                }
                            },'监控中心'),
                            h('p',{
                                style:{
                                    height:'25px',
                                    borderBottom: '1px solid #9a9a9a',
                                    lineHeight:'25px'
                                }
                            },`备注：${that.params.data1.remark||''}`),
                            h(monitorCom,{
                                props:{
                                    goodluck:this.proMonitor,
                                    val:this.val
                                }
                            })
                            // h('Input',{
                            //     props:{
                            //         value:this.value,
                            //         autofocus:true,
                            //         placeholder: '个人胜率'
                            //     },
                            //     on:{
                            //         'on-blur': inp => {
                            //             this.winLossRate = inp.target.value
                            //         }
                            //     }
                            // }),
                            //  h('span',{},'1-100%'),
                            //  h('Input',{
                            //      props: {
                            //          value:this.value,
                            //          autofocus: true,
                            //          placeholder:'执行输赢'
                            //      },
                            //      on: {
                            //          'on-blur': inp=>{
                            //              this.winLoss = inp.target.value
                            //              console.log(this.winLoss);
                            //          }
                            //      }
                            //  })
                        ])
                    },
                     onOk: ()=>{
                        let data = this.$store.state.data,
                            arr = Object.keys(data);
                        let params = {};
                        if(arr.length !== 0){
                            params.userId = this.$store.state.userId;
                            for (const key in data) {
                                if (data.hasOwnProperty(key)) {
                                    if(data[key]){
                                        params[key] = data[key];
                                    }
                                }
                            }
                        } //vuex里面不支持结构赋值，bug原因babel转换器为es2015，头铁可以试下解决方法；安装stage2 or babel-plugin-transform-object-rest-spread
                         console.log(this.$store.state.url)
                         console.log(params);
                         api.postData(this,this.$store.state.url,params,data =>{
                             console.log(this.params.data1);
                         })
                     },
                     onCancel: ()=>{
                         this.val.win = 0;
                         this.val.execute = 0;
                         this.$store.commit('setURL','');
                         this.$store.commit('setData',{});
                         //取消之后将之前所做全部操作归0
                     }
                })
            }

            
        },
        created() {
            // let columnsList = [...searchColumns];
            // console.log(columnsList)
            // columnsList.splice(11,0)
            // this.params.columns1 = columnsList;
             get_this.get(this,"col") 
            console.log(navigator); 
        },
        beforeDestroy() {

            if(this.timer4syncTableInfo !==null){
                clearInterval(this.timer4syncTableInfo)
            }
        },
            
    }
    
</script>
<style scoped>
</style>
