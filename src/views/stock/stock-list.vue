<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
       <!--  <Button @click="requestData">请求</Button> -->
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">总库存</Header>
            <Table :columns="tcTotal" :data="tdTotal"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">百人大战</Header>
            <Table :columns="tcNiu100" :data="tdNiu100"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">明牌抢庄</Header>
            <Table :columns="tcMpqz" :data="tdMpqz"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">快乐30秒</Header>
            <Table :columns="tcHappy30" :data="tdHappy30"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">深海狩猎</Header>
            <Table :columns="tcFishing" :data="tdFishing"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">二人斗地主</Header>
            <Table :columns="tcDDZ2" :data="tdDDZ2"></Table>
        </Row>
        <Row class="margin-top-0 searchable-table-con1">
            <Header style="text-align: center; font-weight: bolder; font-size:20px; background-color: #ff9900">名车汇</Header>
            <Table :columns="tcMingche" :data="tdMingche"></Table>
        </Row>
    </div>
</template>

<script>
import api from '../../net/api.js';
import { gameType, totalStockColumns, niu100StockColumns, happy30StockColumns, mingPaiQiangZhuangStockColumns, fishingStockColumns, mingcheStockColumns, DouDiZhu2Columns } from './define.js';
import { happy30PlayerColumns } from '../game-player/define.js';
export default {
    name: 'stock-list-all-category',
    beforeDestroy() {
        console.log('beforeDestroy');
        if(this.timer4syncStock!= null){
            clearInterval(this.timer4syncStock);
        }
    },
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tcTotal: totalStockColumns,
            tdTotal: [],
            tcNiu100: niu100StockColumns,
            tdNiu100: [],
            tcMpqz: mingPaiQiangZhuangStockColumns,
            tdMpqz: [],
            tcHappy30: happy30StockColumns,
            tdHappy30: [],
            tcFishing: fishingStockColumns,
            tdFishing: [],
            tcMingche: mingcheStockColumns,
            tdMingche: [],
            tcDDZ2: DouDiZhu2Columns,
            tdDDZ2: [],
            timer4syncStock: null, 
            editStockForm: {
                commonStockValue: null,
                taxStockValue: null,
                luckyStockValue: null,
                gameId: null
            },
            editRateForm: {
                outStockRate: null,
                taxStockRate: null,
                luckyStockRate: null,
                gameId: null
            }
        };
    },
    methods: {
        requestData(){
            var totalStock= {
                commonCoin: 0, 
                commonRoomCard: 0, 
                commonDiamond: 0, 
                commonTax: 0,
                commonGolden: 0,
                frozenStock: 0,
                lockStock: 0,
                gameId: null
                };
            var niu100Stock= {
                commonStock: 0,
                taxStock: 0,
                goldenStock: 0,
                outerRatio: 0,
                taxRatio: 0,
                boomNiuRatio: 0,
                color5NiuRatio: 0,
                small5NiuRatio: 0, 
                gameId: null
            };
            var mingpaiStock= {
                commonStock: 0,
                tableStock: 0,
                gameId: null
            };
            var doudizhu2Stock= {
                commonStock: 0,
                tableStock: 0,
                gameId: null
            };
            var happy30Stock= {
                commonStock: 0,
                taxStock: 0,
                outerRatio: 0,
                taxRatio: 0,
                gameId: null
            }
            var fishingStock= {
                commonCoinStock: 0,
                commonDiamondStock: 0,
                taxStock: 0,
                commonStock: 0,
                lockStock: 0,
                taxRatio: 0,
                gameId: null
            };
            var mingcheStock= {
                commonStock: 0,
                taxStock: 0,
                goldStock: 0,
                outRate: 0,
                taxRatio: 0,
                goldRatio: 0,
                gameId: null
            };
            let url= "/stock-module/query-stock";
            api.getData(this, url, (data)=>{
                console.log(data);
                let obj= JSON.parse(data.eval);
                let datas= data.datas;
                let lolcommonCoin= 0;
                let lolcommonRoomCard= 0;
                let lolcommonDiamond= 0;
                let lolcommonTax= 0;
                let lolcommonGolden= 0;
                let lolfrozenStock= 0;
                let lollockStock= 0;
                for (let index = 0; index < datas.length; index++) {
                    let stock = datas[index];
                    lolcommonCoin+=  stock.commonValue;
                    lolcommonTax+= stock.taxValue;
                    lolcommonGolden+= stock.lotteryValue;
                    if(stock.gameId== gameType.BaiRenNiuNiu){
                        niu100Stock.commonStock= stock.commonValue;
                        niu100Stock.taxStock= stock.taxValue;
                        niu100Stock.goldenStock= stock.lotteryValue;
                        niu100Stock.outerRatio= (stock.outStockRate== null ? '无': stock.outStockRate);
                        niu100Stock.taxRatio= (stock.taxStockRate == null ? '无': stock.taxStockRate);
                        niu100Stock.boomNiuRatio= '无';
                        niu100Stock.color5NiuRatio= '无';
                        niu100Stock.small5NiuRatio= '无';
                        niu100Stock.gameId= stock.gameId;
                    }else if(stock.gameId== gameType.MingPaiQiangZhuang){
                        mingpaiStock.commonStock= stock.commonValue;
                        mingpaiStock.tableStock= stock.tableValue;
                        mingpaiStock.gameId= stock.gameId;
                    }else if(stock.gameId== gameType.KuaiLe30){
                        happy30Stock.commonStock= stock.commonValue;
                        happy30Stock.taxStock= stock.taxValue;
                        happy30Stock.outerRatio= (stock.outStockRate== null ? '无': stock.outStockRate);
                        happy30Stock.taxRatio= (stock.taxStockRate == null ? '无': stock.taxStockRate);
                        happy30Stock.gameId= stock.gameId;
                    }else if(stock.gameId== gameType.DouDiZhu){
                        doudizhu2Stock.commonStock= stock.commonValue;
                        doudizhu2Stock.tableStock= stock.tableValue;
                    }else if(stock.gameId== gameType.ShuiHuZhuan){
                        
                    }else if(stock.gameId== gameType.LianHuanDuoBao){
                        
                    }else if(stock.gameId== gameType.ShenHaiBuYu){
                        fishingStock.commonCoinStock= stock.commonValue;
                        fishingStock.commonDiamondStock= 0;
                        fishingStock.taxStock= stock.taxValue;
                        fishingStock.frozenStock= 0;
                        fishingStock.lockStock= 0;
                        fishingStock.taxRatio= (stock.taxStockRate == null ? '无': stock.taxStockRate);
                        fishingStock.gameId= stock.gameId;
                    }else if(stock.gameId== gameType.MingCheHui){
                        mingcheStock.commonStock= stock.commonValue;
                        mingcheStock.taxStock= stock.taxValue;
                        mingcheStock.goldStock= stock.lotteryValue;
                        mingcheStock.outRate= (stock.outStockRate== null ? '无': stock.outStockRate);
                        mingcheStock.taxRatio= (stock.taxStockRate == null ? '无': stock.taxStockRate);
                        mingcheStock.goldRatio= (stock.lotteryStockRate == null ? '无': stock.lotteryStockRate);
                        mingcheStock.gameId= stock.gameId;
                    }
                }
                totalStock.commonCoin= lolcommonCoin;
                totalStock.commonRoomCard= lolcommonRoomCard;
                totalStock.commonDiamond= lolcommonDiamond;
                totalStock.commonTax= lolcommonTax;
                totalStock.commonGolden= lolcommonGolden;
                totalStock.frozenStock= lolfrozenStock;
                totalStock.lockStock= lollockStock;
                this.tdNiu100.splice(0, 1);
                this.tdNiu100.push(niu100Stock);
                this.tdMpqz.splice(0, 1);
                this.tdMpqz.push(mingpaiStock);
                this.tdHappy30.splice(0, 1);
                this.tdHappy30.push(happy30Stock);
                this.tdFishing.splice(0, 1);
                this.tdFishing.push(fishingStock);
                this.tdMingche.splice(0, 1);
                this.tdMingche.push(mingcheStock);
                this.tdDDZ2.splice(0, 1);
                this.tdDDZ2.push(doudizhu2Stock);
                this.tdTotal.splice(0, 1);
                this.tdTotal.push(totalStock);
            });
        },
        showChangeStock(gameId){
            this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">库存变更值</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: null,
                                autofocus: true,
                                placeholder: '公共库存变更值'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editStockForm.commonStockValue = o.target.value
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
                                placeholder: '抽水库存变更值'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editStockForm.taxStockValue = o.target.value
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
                                placeholder: '彩金库存变更值'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editStockForm.luckyStockValue = o.target.value
                                }
                            },
                             style: {
                                "margin-bottom": '10px'
                            }
                            })
                            ]);
                    },
                    onOk: ()=> {  
                        this.editStockForm.gameId= gameId;
                        let url= api.URL.Stock_Update();
                        let _this= this;
                        api.postData(this, url, this.editStockForm, function(data){
                            if(data){
                                alert("成功");
                            }else {
                                alert("失败");
                            }
                            _this.editStockForm.commonStockValue= null;
                            _this.editStockForm.taxStockValue= null;
                            _this.editStockForm.luckyStockValue= null;
                            _this.editStockForm.gameId= null;
                        }, function (error){
                            alert(error);
                           _this.editStockForm.commonStockValue= null;
                            _this.editStockForm.taxStockValue= null;
                            _this.editStockForm.luckyStockValue= null;
                            _this.editStockForm.gameId= null;
                        });
                    },
                    onCancel: ()=> {
                      _this.editStockForm.commonStockValue= null;
                            _this.editStockForm.taxStockValue= null;
                            _this.editStockForm.luckyStockValue= null;
                            _this.editStockForm.gameId= null;
                    }
                });
        },
        showChangeRate(gameId){
            this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">比例变更值</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: null,
                                autofocus: true,
                                placeholder: '出库比例变更'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editRateForm.outStockRate= o.target.value;
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
                                placeholder: '抽水比例变更'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editRateForm.taxStockRate= o.target.value;
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
                                placeholder: '彩金比例变更值'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editRateForm.luckyStockRate= o.target.value;
                                }
                            },
                             style: {
                                "margin-bottom": '10px'
                            }
                            })
                            ]);
                    },
                    onOk: ()=> {  
                        this.editRateForm.gameId= gameId;
                        let url= api.URL.Rate_Update();
                        let _this= this;
                        api.postData(this, url, this.editRateForm, function(data){
                            if(data){
                                alert("成功");
                            }else {
                                alert("失败");
                            }
                            _this.editRateForm.outStockRate= null;
                            _this.editRateForm.taxStockRate= null;
                            _this.editRateForm.luckyStockRate= null;
                            _this.editRateForm.gameId= null;
                        }, function (error){
                            alert(error);
                           _this.editRateForm.outStockRate= null;
                            _this.editRateForm.taxStockRate= null;
                            _this.editRateForm.luckyStockRate= null;
                            _this.editRateForm.gameId= null;
                        });
                    },
                    onCancel: ()=> {
                     _this.editRateForm.outStockRate= null;
                            _this.editRateForm.taxStockRate= null;
                            _this.editRateForm.luckyStockRate= null;
                            _this.editRateForm.gameId= null;
                    }
                });
        }
    },
    created () {
        console.log('stock list created')
        const niu100_cols= niu100StockColumns.forEach(item=>{
            item['render']= (h, params)=>{
                const row= params.row;
                const columnKey= params.column.key;
                const info= row[columnKey];
                if(columnKey!= 'gameId'&& (columnKey== 'commonStock'|| columnKey== 'taxStock' || columnKey== 'goldenStock')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeStock(row.gameId);
                            }
                        }
                    }, info)]);
                }else if(columnKey!= 'gameId'&& (columnKey== 'outerRatio'|| columnKey== 'taxRatio')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeRate(row.gameId);
                            }
                        }
                    }, info)]);
                }else {
                    return h('div', [h('span', info)]);
                }
            };
            return item;
        });
        const kuaile30_cols= happy30StockColumns.forEach(item=>{
            item['render']= (h, params)=>{
                const row= params.row;
                const columnKey= params.column.key;
                const info= row[columnKey];
                if(columnKey!= 'gameId'&& (columnKey== 'commonStock'|| columnKey== 'taxStock')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeStock(row.gameId);
                            }
                        }
                    }, info)]);
                }else if(columnKey!= 'gameId'&& (columnKey== 'outerRatio'|| columnKey== 'taxRatio')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeRate(row.gameId);
                            }
                        }
                    }, info)]);
                }else {
                    return h('div', [h('span', info)]);
                }
            };
            return item;
        });
        const fish_cols= fishingStockColumns.forEach(item=>{
            item['render']= (h, params)=>{
                const row= params.row;
                const columnKey= params.column.key;
                const info= row[columnKey];
               if(columnKey!= 'gameId'&& (columnKey== 'commonCoinStock')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeStock(row.gameId);
                            }
                        }
                    }, info)]);
                }else if(columnKey!= 'gameId'&& (columnKey== 'taxRatio')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeRate(row.gameId);
                            }
                        }
                    }, info)]);
                }else {
                    return h('div', [h('span', info)]);
                }
            };
            return item;
        });
        const mingche_cols= mingcheStockColumns.forEach(item=>{
            item['render']= (h, params)=>{
                const row= params.row;
                const columnKey= params.column.key;
                const info= row[columnKey];
                if(columnKey!= 'gameId'&& (columnKey== 'commonStock'|| columnKey== 'taxStock' || columnKey== 'goldStock')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeStock(row.gameId);
                            }
                        }
                    }, info)]);
                }else if(columnKey!= 'gameId'&& (columnKey== 'outRate'|| columnKey== 'taxRatio' || columnKey== 'goldRatio')){
                    return h('div', [h('a', {
                        on:{
                            click: ()=>{
                                this.showChangeRate(row.gameId);
                            }
                        }
                    }, info)]);
                }else {
                    return h('div', [h('span', info)]);
                }
            };
            return item;
        });
        this.happy30StockColumns= kuaile30_cols;
        this.niu100StockColumns= niu100_cols;
        this.fishingStockColumns= fish_cols;
        this.mingcheStockColumns= mingche_cols;
        this.requestData();
        if(this.timer4syncStock== null){
            this.timer4syncStock= setInterval(this.requestData, 3000);
        }
    }
};
</script>
