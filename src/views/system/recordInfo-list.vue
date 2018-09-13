<template>
    <div>
                <div>

                <Row>
                    <Col span="4">
                    <Input placeholder="输入玩家ID" v-model="userId" type="text">
                       <span slot="append" style="cursor:pointer;" @click="filterRecordInfo">查询</span>       
                    </Input>
                    </Col>
                    <Col span="4" offset="1">
                 <Select placeholder="选择游戏" v-model="uploadGameIds" multiple style="width:260px">
                    <Option v-for="item in downloadGameIdMap" :value="item.gameId" :key="item.gameId">{{ item.label }}</Option>
                </Select>
                    </Col>
                    <Col span="4" offset="1">
                        <DatePicker :value="startTime" @on-change="setStartTime" type="datetime" placeholder="开始时间" style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="4">
                        <DatePicker :value="endTime" @on-change="setEndTime" type="datetime" placeholder="结束时间" style="width: 200px"></DatePicker>
                    </Col>
                </Row>
                </div>
                <PageablePlayerList :params="params"></PageablePlayerList>
    </div>
</template>
<script>
    const dateUtils= require('date-utils');
    import {recordInfoColumns} from './define.js'
    import {recordInfoGameIdMap} from './define.js'
    import api from '../../net/api.js';
    import { pageableConst } from '../ext-components/constants.js';
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    export default {
        created(){
            this.params.pageTo= this.getRecordInfos;
            this.params.columnList= recordInfoColumns;
            this.downloadGameIdMap= recordInfoGameIdMap;
            let today= Date.today();
            let tomorrow= Date.tomorrow();
            this.startTime= today.toFormat("YYYY-MM-DD")+ ' 00:00:00';
            this.endTime= tomorrow.toFormat("YYYY-MM-DD")+ ' 00:00:00';
            this.getRecordInfos();
            // this.timer4syncRecordInfo=  setInterval(this.getRecordInfos, 10000);
        },
        beforeDestroy(){
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
                    pageTo: function(){
                        alert("已覆盖的方法");
                    },
                    sortTo: function(){
                        alert("已覆盖的方法");
                    }
                 },
                timer4syncRecordInfo: null,
                userId: '',
                uploadGameIds: [],
                downloadGameIdMap:[],
                startTime: '',
                endTime: ''
            };
        },
        components: {
            PageablePlayerList
        },
        methods: {
            setStartTime(format){
                console.log(format);
                this.startTime= format;
            },
            setEndTime(format){
                this.endTime= format;
            },
            filterRecordInfo(){
                console.log(Date);
                this.getRecordInfos();
            },
            getRecordInfos(){
                let ids= '';
                this.uploadGameIds.forEach(item => {
                    ids+= ('&gameIds='+ item);
                });
                let url= api.URL.SystemOperator_RecordInfo_Query(this.params.currentPage, this.params.pageSize, this.userId, this.startTime, this.endTime, ids);
                const _this= this;
                api.getData(this, url, function (data){
                    let datas= data.datas
                    _this.params.dataList= datas.map(item=>{
                        let _createTime= item.createTime;
                        item.createTime= new Date(_createTime).toFormat("YYYY-MM-DD HH24:MI:SS");
                        return item;
                    });
                        _this.params.currentPage= data.pageNum;
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

