<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
         <!-- <Button @click="requestData">请求</Button> -->
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-新手场</Header>
            <Table :columns="columnShare" :data="dataXinshou"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-大众场</Header>
            <Table :columns="columnShare" :data="dataDazhong"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-精英场</Header>
            <Table :columns="columnShare" :data="dataJingying"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-富豪场</Header>
            <Table :columns="columnShare" :data="dataFuhao"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-至尊场</Header>
            <Table :columns="columnShare" :data="dataZhizun"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌-贵宾场</Header>
            <Table :columns="columnShare" :data="dataGuibin"></Table>
        </Row>
    </div>
</template>

<script>
import api from '../../net/api.js';
import {shareColumns,  gameType} from './define.js';
export default {
    name: 'all-stock-list',
    beforeDestroy () {
        console.log('beforeDestroy');
        if(this.timer4syncStock!= null){
            clearInterval(this.timer4syncStock);
        }
    },
    data () {
        return {
            columnShare: shareColumns,
            dataXinshou: [],
            dataDazhong: [],
            dataJingying: [],
            dataFuhao: [],
            dataZhizun: [],
            dataGuibin: [],
            timer4syncStock: null,
            editForm: {
                commonStockValue: null,
                tableValue: null,
                tableFee: null,
                gameId: null,
                senceId: null
            }
        };
    },
    methods: {
        requestData(){
            let url= api.URL.Stock_Query_MingPaiQiangZhuang();
            const dataXinshou= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0,
                gameId: null,
                sceneId: null
            };
            const dataDazhong= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0, 
                gameId: null,
                sceneId: null
            };
            const dataFuhao= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0,
                gameId: null,
                sceneId: null
            };
            const dataGuibin= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0,
                gameId: null,
                sceneId: null
            };
            const dataJingying= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0,
                gameId: null,
                sceneId: null
            };
            const dataZhizun= {
                commonValue: 0,
                tableValue: 0,
                tableFee: 0,
                gameId: null,
                senceId: null
            };
            api.getData(this, url, (data)=>{
                console.log(data);
                let obj= JSON.parse(data.eval);
                let datas= data.datas;
                for (let index = 0; index < datas.length; index++) {
                    let onlyData= datas[index];
                    if(onlyData.sceneId== 11){
                        dataXinshou.commonValue= onlyData.commonValue;
                        dataXinshou.tableValue= onlyData.tableValue;
                        dataXinshou.gameId= onlyData.gameId;
                        dataXinshou.sceneId= onlyData.sceneId;
                    }else if(onlyData.sceneId== 12){
                        dataDazhong.commonValue= onlyData.commonValue;
                        dataDazhong.tableValue= onlyData.tableValue;
                        dataDazhong.gameId= onlyData.gameId;
                        dataDazhong.sceneId= onlyData.sceneId;
                    }else if(onlyData.sceneId== 13){
                        dataJingying.commonValue= onlyData.commonValue;
                        dataJingying.tableValue= onlyData.tableValue;
                        dataJingying.gameId= onlyData.gameId;
                        dataJingying.sceneId= onlyData.sceneId;
                    }else if(onlyData.sceneId== 14){
                        dataFuhao.commonValue= onlyData.commonValue;
                        dataFuhao.tableValue= onlyData.tableValue;
                        dataFuhao.gameId= onlyData.gameId;
                        dataFuhao.sceneId= onlyData.sceneId;
                    }else if(onlyData.sceneId== 15){
                        dataZhizun.commonValue= onlyData.commonValue;
                        dataZhizun.tableValue= onlyData.tableValue;
                        dataZhizun.gameId= onlyData.gameId;
                        dataZhizun.sceneId= onlyData.sceneId;
                    }else if(onlyData.sceneId== 16){
                        dataGuibin.commonValue= onlyData.commonValue;
                        dataGuibin.tableValue= onlyData.tableValue;
                        dataGuibin.gameId= onlyData.gameId;
                        dataGuibin.sceneId= onlyData.sceneId;
                    }
                }
                    this.dataXinshou.splice(0, 1);
                    this.dataXinshou.push(dataXinshou);
                    this.dataDazhong.splice(0, 1);
                    this.dataDazhong.push(dataDazhong);
                    this.dataJingying.splice(0, 1);
                    this.dataJingying.push(dataJingying);
                    this.dataFuhao.splice(0, 1);
                    this.dataFuhao.push(dataFuhao);
                    this.dataZhizun.splice(0, 1);
                    this.dataZhizun.push(dataZhizun);
                    this.dataGuibin.splice(0, 1);
                    this.dataGuibin.push(dataGuibin);
            });
        },

        showChangeStock(gameId, senceId){
            this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">变更值</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: null,
                                autofocus: true,
                                placeholder: '公共库变更值'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editForm.commonStockValue = o.target.value
                                }
                            },
                            style: {
                                "margin-bottom": '10px'
                            }
                            }),
                            h('Input', {
                                props: {
                                value: null,
                                autofocus: true,
                                placeholder: '台费库变更值'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editForm.tableValue = o.target.value
                                }
                            },
                             style: {
                                "margin-bottom": '10px'
                            }
                            }),
                            h('Input', {
                                props: {
                                value: null,
                                autofocus: true,
                                placeholder: '每局台费变更值'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editForm.tableFee = o.target.value
                                }
                            },
                             style: {
                                "margin-bottom": '10px'
                            }
                            })
                            ]);
                    },
                    onOk: ()=> {  
                        this.editForm.gameId= gameId;
                        this.editForm.senceId= senceId;
                        let url= api.URL.Stock_Update_MingPaiQiangZhuang();
                        let _this= this;
                        api.postData(this, url, this.editForm, function(data){
                            if(data){
                                alert("成功");
                            }else {
                                alert("失败");
                            }
                            _this.editForm.tableValue= null;
                            _this.editForm.tableFee= null;
                            _this.editForm.commonStockValue= null;
                            _this.editForm.gameId= null;
                            _this.editForm.sceneId= null;
                        }, function (error){
                            alert(error);
                           _this.editForm.tableValue= null;
                            _this.editForm.tableFee= null;
                            _this.editForm.commonStockValue= null;
                            _this.editForm.gameId= null;
                            _this.editForm.sceneId= null;
                        });
                    },
                    onCancel: ()=> {
                       this.editForm.tableValue= null;
                            this.editForm.tableFee= null;
                            this.editForm.commonStockValue= null;
                            this.editForm.gameId= null;
                            this.editForm.sceneId= null; 
                    }
                });
        }
    },
    created () {
        const cols= shareColumns.forEach(item=>{
            item['render']= (h, params)=>{
                const row= params.row;
                const columnKey= params.column.key;
                const info= row[columnKey];
                if(columnKey!= 'gameId'&& columnKey!= 'sceneId'){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeStock(row.gameId, row.sceneId);
                            }
                        }
                    }, info)]);
                }else {
                    return h('div', [h('span', info)]);
                }
            };
            return item;
        })
        this.shareColumns= cols;
        console.log('stock list created')
        this.requestData();
        if(this.timer4syncStock== null){
            this.timer4syncStock= setInterval(this.requestData, 3000);
        }
    }
};
</script>
