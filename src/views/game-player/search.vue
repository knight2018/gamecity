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
    import searchMonitor from './components/monitor.vue'
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
                    remark: null
  
                },
                winLossRate:null,
                winLoss:null,
                userId: null,
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
                           if(datas.offline !== false){
                               datas['offline'] = '离线';
                           }else{
                               datas['offline'] = '在线';
                           }
                           datas.gameId = searchGame(datas.gameId)
                          _this.params.data1 = [datas];
                        console.log(_this.$children.dataList)
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
                         api.postData(this,url,this.editForm,function(data){
                             alter(data);
                             _this.editForm.remark = null;
                         },function(error){
                             alter(error);
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
                            h(searchMonitor,{})
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
                         api.postData(this,api.URL.DouDiZhu_Update_Player_Winloss,{userId:this.userId,winLossRate:this.winLossRate,winLoss:this.winLoss},data =>{
                             console.log(data);
                         })
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
