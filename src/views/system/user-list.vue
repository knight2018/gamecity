<template>
    <div>
                <div>

                <Row>
                    <Col span="3">
                    <Input v-model="queryParams.userId">
                        <span slot="prepend">玩家ID</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.ip">
                        <span slot="prepend">登录IP</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.ip">
                        <span slot="prepend">备注</span>
                    </Input>
                    </Col>
                    <!-- <Col span="3">
                    <Input v-model="queryParams.vipLevelDown">
                        <span slot="prepend">VIP(最低)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.vipLevelUp">
                        <span slot="prepend">VIP(最高)</span>
                    </Input>
                    </Col> -->
                    <Col span="3">
                    <Input v-model="queryParams.coinDown">
                        <span slot="prepend">携带金币(最低)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.coinUp">
                        <span slot="prepend">携带金币(最高)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.bankCoinDown">
                        <span slot="prepend">银行金币(最低)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.bankCoinUp">
                        <span slot="prepend">银行金币(最高)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.transCoinDown">
                        <span slot="prepend">赠送金币(最低)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.transCoinUp">
                        <span slot="prepend">赠送金币(最高)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.totalChargeDown">
                        <span slot="prepend">充值金币(最低)</span>
                    </Input>
                    </Col>
                    <Col span="3">
                    <Input v-model="queryParams.totalChargeUp">
                        <span slot="prepend">充值金币(最高)</span>
                    </Input>
                    </Col>
                    <Col span="4">
                    <Col span="4">
                        <div style="margin-right:2px;margin-left:2px;margin-top:7px;text-align:center;">
                            <span>渠道</span>
                        </div>
                        </Col>
                        <Col span="20">
                        <Select v-model="uploadGameIds">
                            <Option v-for="item in downloadGameIdMap" :value="item.gameId" :key="item.gameId">{{ item.label }}</Option>
                        </Select>
                        </Col>
                    </Col>
                    <Col span="4">
                        <Col span="6">
                        <div style="margin-right:2px;margin-left:2px;margin-top:7px;text-align:center;">
                            <span>
                                                                        解封状态
                            </span>
                        </div>
                        </Col>
                        <Col span="18">
                        <Select v-model="uploadGam">
                            <Option v-for="item in downloadGameIdMap" :value="item.gameId" :key="item.gameId">{{ item.label }}</Option>
                        </Select>
                        </Col>
                    </Col>
                    <Col span="4">
                        <Col span="10">
                        <div style="margin-right:2px;margin-left:2px;margin-top:7px;text-align:center;">
                            <span>
                                                                       注册时间（最早）
                            </span>
                        </div>
                        </Col>
                        <Col span="14">
                        <DatePicker v-model="queryParams.createTimeDown" format="yyyy-MM-dd HH:mm:ss" type="datetime" ></DatePicker>
                        </Col>
                    </Col>
                    <Col span="4">
                        <Col span="10">
                        <div style="margin-right:2px;margin-left:2px;margin-top:7px;text-align:center;">
                            <span>
                                                                       注册时间（最晚）
                            </span>
                        </div>
                        </Col>
                        <Col span="14">
                        <DatePicker v-model="queryParams.createTimeUp" format="yyyy-MM-dd HH:mm:ss" type="datetime" ></DatePicker>
                        </Col>
                    </Col>
                    <Col span="1" offset="1">
                    <Button type="primary" @click="queryUsers">查询</Button>
                    </Col>
                    <Col span="1">
                    <Button type="primary" @click="cleanQuery">清空</Button>
                    </Col>
                </Row>
                </div>
                <PageablePlayerList :params="params"></PageablePlayerList>
    </div>
</template>
<script>
    const dateUtils= require('date-utils');
    import {userColumns} from './define.js'
    import {recordInfoGameIdMap} from './define.js'
    import api from '../../net/api.js';
    import { pageableConst } from '../ext-components/constants.js';
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    export default {
        created(){
            this.params.pageTo= this.queryUsers;
            this.params.sortTo= this.queryUsers;
            this.params.columnList= userColumns;
            this.downloadGameIdMap= recordInfoGameIdMap;
            this.queryParams.createTimeDown= Date.today();
            this.queryParams.createTimeUp= Date.tomorrow();
            this.queryParams.orderByDesc= this.params.orderByDesc;
            this.queryParams.orderByField= this.params.orderByField;
            this.queryParams.pageSize= this.params.pageSize;
            this.queryParams.pageNum= this.params.currentPage;
            this.queryUsers();
            // this.timer4syncRecordInfo=  setInterval(this.getRecordInfos, 10000);
        },
        beforeDestroy(){
            console.log('beforeDestroy');
            if(this.timer4syncRecordInfo!= null){
                clearInterval(this.timer4syncRecordInfo);
            }
        },
        data() {
            return {
                 params: {
                    columnList: [],
                    dataList: [],
                    totalSize: pageableConst.totalSize,
                    currentPage: pageableConst.currentPage,
                    pageSize: pageableConst.pageSize,
                    currentSize: pageableConst.currentSize, 
                    orderByDesc: true,
                    orderByField: 'createTime',
                    pageTo: function(){
                        alert("已覆盖的方法");
                    },
                    sortTo: function(){
                        alert("已覆盖的方法");
                    }
                 },
                timer4syncRecordInfo: null,
                uploadGameIds: [],
                downloadGameIdMap:[],
                queryParams:{
                    "userId": null,
                    "ip": null,
                    "channel": null,
                    "state": null,
                    "vipLevelDown": null,
                    "vipLevelUp": null,
                    "createTimeDown": null,
                    "createTimeUp": null,
                    "coinDown": null,
                    "coinUp": null,
                    "totalChargeDown": null,
                    "totalChargeUp": null,
                    "bankCoinDown": null,
                    "bankCoinUp": null,
                    "transCoinDown": null,
                    "transCoinUp": null,
                    orderByDesc: null,
                    orderByField: null,
                    pageNum: null,
                    pageSize: null
                }
            };
        },
        components: {
            PageablePlayerList
        },
        methods: {
            cleanQuery(){
                this.queryParams.userId= null;
                this.queryParams.ip= null;
                this.queryParams.channel= null;
                this.queryParams.state= null,
                this.queryParams.vipLevelDown= null;
                this.queryParams.vipLevelUp= null;
                this.queryParams.createTimeDown= Date.today();
                this.queryParams.createTimeUp= Date.tomorrow(); 
                this.queryParams.coinDown= null;
                this.queryParams.coinUp= null;
                this.queryParams.totalChargeDown= null;
                this.queryParams.totalChargeUp= null;
                this.queryParams.bankCoinDown= null;
                this.queryParams.bankCoinUp= null;
                this.queryParams.transCoinDown= null;
                this.queryParams.transCoinUp= null;
                this.queryParams.pageSize= pageableConst.pageSize;
                this.queryParams.pageNum= pageableConst.currentPage;
                this.queryParams.orderByDesc= true;
                this.queryParams.orderByField= 'createTime';
            },
            queryUsers(){
                let url= api.URL.SystemOperator_User_Query();
                const _this= this;
                let params= this.queryParams;
                params.orderByDesc= this.params.orderByDesc;
                params.orderByField= this.params.orderByField;
                params.pageNum= this.params.currentPage;
                params.pageSize= this.params.pageSize;
                api.postData(this, url, params, function (data){
                    console.log(data);
                     let datas= data.datas
                    _this.params.dataList= datas.map(item=>{
                        let _createTime= item.createTime;
                        item.createTime= new Date(_createTime).toFormat("YYYY-MM-DD HH24:MI:SS");
                        return item;
                    });
                        _this.params.currentPage= data.pageNum;
                        _this.queryParams.pageNum= data.pageNum;
                        _this.params.totalSize= data.total;
                        _this.params.currentSize= data.size;
                        if(data.size== 0&& _this.params.currentPage!= 1){
                            _this.params.currentPage= 1;
                            // _this.getPlayerList();
                        }
                });
            }
        }
    }
</script>

