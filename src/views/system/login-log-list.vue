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
                        <span slot="prepend">管理员账号</span>
                    </Input>
                    </Col>
                    <Col span="4">
                        <Col span="10">
                        <div style="margin-right:2px;margin-left:2px;margin-top:7px;text-align:center;">
                            <span>
                                                                       开始时间
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
                                                                       结束时间
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
    import {loginLogListColumns} from './define.js'
    import {recordInfoGameIdMap} from './define.js'
    import api from '../../net/api.js';
    import { pageableConst } from '../ext-components/constants.js';
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    export default {
        created(){
            this.params.pageTo= this.queryUsers;
            this.params.sortTo= this.queryUsers;
            this.params.columnList= loginLogListColumns;
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
                queryParams:{
                    "userId": null,
                    "createTimeDown": null,
                    "createTimeUp": null,
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
                this.queryParams.createTimeDown= Date.today();
                this.queryParams.createTimeUp= Date.tomorrow(); 
                this.queryParams.pageSize= pageableConst.pageSize;
                this.queryParams.pageNum= pageableConst.currentPage;
                this.queryParams.orderByDesc= true;
                this.queryParams.orderByField= 'createTime';
            },
            queryUsers(){
                let url= api.URL.SystemOperator_LoginLog_Query();
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

