<template>
    <div>
        <div class="clearfix">
            <Button type="primary" class="ren" :disabled="params.off" @click="handleChange">返回</Button>
        </div>
        <agencyCom v-bind="params"></agencyCom>
    </div>
</template>

<script>
import agencyCom from './components/agency-com'
import {agencyList} from './define.js'
import get_this from '../../libs/get_this.js'
import api from '../../net/api.js'
export default {
    components:{agencyCom},
    data (){
        return {
            params:{
                columnsList:agencyList(this),
                dataList:[
                    {
                        number: "1",
                        angenct: "1",
                        userId: "123",
                        userName: "good",
                        remark: 'test',
                        phone: 'test', 
                        test: "god",
                        smoke: 1,
                        smokes: 0.5,
                        money: 3000,
                        acquired: 6000,
                        subordinate: "1",
                        player: "2",
                        time: new Date()

                    }
                ],
                total: 0,
                off: true
            },
            editFrom:{
                remark:"",
                userId: "",
                phone: "",
                minimum: 10000,
                smoke:undefined,
                smokes:undefined,
                acquired: 0,
                subordinate:0
            },
            
            goldTotal:50
        } 
    },
    methods:{
        handleChange (){
            this.params.columnsList = agencyList(this);
            this.params.off = true;
        },
        showUpdataRemark(){
            
            let that = this;
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑备注</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editFrom.remark,
                                autofocus: true,
                                placeholder: '备注'
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editFrom.remark = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    
                    date = {userId : that.editFrom.userId,remark: that.editFrom.remark};
                    api.postData(that,url,date,data=>{
                        console.log(data);
                    },error=>{
                        that.editFrom.remark = "";
                    })
                },
                onCancel (){
                     console.log(that)
                     that.editFrom.remark = "";
                }
            })
        },
        showUpdataPhone (){
            let that =this;
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑电话</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editFrom.phone,
                                autofocus: true,
                                placeholder: '电话'
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editFrom.phone = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    date = {userId : that.editFrom.userId,phone: that.editFrom.phone};
                    api.postData(that,url,date,data=>{
                        console.log(data);
                    },error=>{
                        that.editFrom.phone = "";
                    })
                },
                onCancel (){
                    that.editFrom.phone = "";
                }
            })

        },
        showUpdataMinimum (){
            let that =this;
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑最低提取限制</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editFrom.minimum,
                                autofocus: true,
                                placeholder: '最低提取限制'
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editFrom.minimum = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    date = {userId : that.editFrom.userId,minimum: that.editFrom.minimum};
                    api.postData(that,url,date,data=>{
                        console.log(data);
                    },error=>{
                        that.editFrom.minimum = "";
                    })
                },
                onCancel (){
                    that.editFrom.minimum = "";
                }
            })

        },
        showUpdataSmoke (smoke){
            console.log(smoke)
            let that =this;
            let title = smoke =='smoke'?'抽水比例一级':'抽水比例二级'
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">抽水比例</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editFrom[smoke],
                                autofocus: true,
                                placeholder: title
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editFrom[smoke] = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    date = smoke =='smoke'?{userId : that.editFrom.userId,smoke: that.editFrom[smoke]}:{userId : that.editFrom.userId,smokes: that.editFrom[smoke]};
                    console.log(date)
                    api.postData(that,url,date,data=>{
                        console.log(data);
                    },error=>{
                        that.editFromp[smoke] = "";
                    })
                },
                onCancel (){
                    that.editFrom[smoke] = "";
                }
            })
        },
        showUpdataAcquired (){
            let that = this,
            data = {userId:this.editFrom.userId};
            // api.postData(that,url,date,data=>{
            //             console.log(data);
            //         },error=>{
            //             console.log(error)
            //         });
            let datas = {
                                    admin: 666666,
                                    userName: 'ershazi',
                                    gold: 102030,
                                    time: new Date()
                                },
                columnsList = [
                                    {
                                        title: "代理账号",
                                        key: "admin"
                                    },
                                    {
                                        title: "昵称",
                                        key: "userName"
                                    },
                                    {
                                        title: "获得金币",
                                        key:"gold"
                                    },
                                    {
                                        title: "发放时间",
                                        key: "time"
                                    }
                                ];
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;color:red;font-size:16px;">抽水比例</p>',
                render: h=>{
                    return h('div',[
                        h('Table',{
                                props:{
                                    columns:columnsList,
                                    data: [datas],
                                    height: "500px"
                                },  
                            }),
                        h('Page',{
                            props:{
                                total: this.goldTotal,
                                
                            },
                            on:{
                                "on-change" (index){
                                    console.log(index)
                                }
                            }
                        })
                    ])
                }
                ,
                onOk (){
                    
                },
                onCancel (){
                   
                }
            })
        },
      
    },
    created() {
        get_this.get(this,'agency');
    },
}
</script>

<style scoped>
    .ren{
        float: right;
    }
    .clearfix::after{
        content: '';
        display: block;
        clear: both;
        margin-bottom: 10px;
    }
</style>
