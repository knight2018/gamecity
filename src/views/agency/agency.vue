<template>
    <div>
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
                dataList:[]
            },
            editForm:{
                remark:"",
                userId: "",
                phone: ""
            }
        } 
    },
    methods:{
        showUpdataRemark(){
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑备注</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editForm.remark,
                                autofocus: true,
                                placeholder: '备注'
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editForm.remark = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    that,
                    data = {userId : this.editForm.userId,remark: this.editForm.remark};
                    api.postData(this,url,data,data=>{
                        console.log(data);
                    },error=>{
                        this.editForm.remark = "";
                    })
                },
                onCancel (){
                    this.editForm.remark = "";
                }
            })
        },
        showUpdataPhone (){
            this.$Modal.confirm({
                title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑电话</p>',
                render: h=>{
                    return h('div',[
                        h('Input',{
                            props:{
                                value:this.editForm.remark,
                                autofocus: true,
                                placeholder: '电话'
                            },
                            on:{
                                'on-blur':o=>{
                                    this.editForm.remark = o.target.value;
                                }
                            }
                        })
                    ]);
                },
                onOk (){
                    let url,
                    that,
                    data = {userId : this.editForm.userId,phone: this.editForm.phone};
                    api.postData(this,url,data,data=>{
                        console.log(data);
                    },error=>{
                        this.editForm.phone = "";
                    })
                },
                onCancel (){
                    this.editForm.phone = "";
                }
            })

        }
    },
    created() {
        get_this.get(this,'agency');
    },
}
</script>

<style>

</style>
