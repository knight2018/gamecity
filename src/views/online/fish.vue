<template>
    <PageablePlayerList :params="params"></PageablePlayerList>
</template>

<script>
    import global from '../../app/global';
    import util from '../../libs/util';
    import arrayUtil from '../../libs/array-util';
    import api from '../../net/api';
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    import {pageableConst} from  '../ext-components/constants.js'
    import { fishColumns} from './data/define.js';

    export default {
       components: { PageablePlayerList },
        name: 'online-fish-player-list',
        data () {
            return {
                params: {
                    columnList: [],
                    dataList: [],
                    totalSize: pageableConst.totalSize,
                    currentPage: pageableConst.currentPage,
                    pageSize: pageableConst.pageSize,
                    currentSize: pageableConst.currentSize, 
                    orderByDesc: true,
                    orderByField: 'coin',//需要覆盖
                    pageTo: function(){
                        alert("已覆盖的方法");
                    },
                    sortTo: function(){
                        alert("已覆盖的方法");
                    }
                 },
                timer4syncPlayerList: null,
            };
        },
        created () {
            var cols = []
            for (let i = 0; i < fishColumns.length; i++) {
                cols.push(fishColumns[i])
            }
            this.params.columnList= cols;
            this.params.pageTo= this.getPlayerList;
            this.params.sortTo= this.getPlayerList;
            this.getPlayerList();
            if(this.timer4syncPlayerList== null){
                let timer4syncPlayerList= setInterval(this.getPlayerList, 2000);
                this.timer4syncPlayerList= timer4syncPlayerList;
            }
        },
        beforeDestroy(){
             if(this.timer4syncPlayerList!= null){
                clearInterval(this.timer4syncPlayerList);
            }
        },
        methods: {
                getPlayerList(){
                let _this = this;
                let url= api.URL.Fishing_Player_List(this.params.currentPage, this.params.pageSize, this.params.orderByDesc, this.params.orderByField);
                api.getData(this, url, function (data) {
                    let datas= data.datas;
                    for (let index = 0; index < datas.length; index++) {
                            // let playerInfo= datas[index];
                            // let offline= playerInfo['offline'];
                            // if(offline== false){
                            //     datas[index]['offline']= '在线';
                            // }else {
                            //     datas[index]['offline']= '离线';
                            // }
                    }
                _this.params.dataList = datas;
                _this.params.currentPage= data.pageNum;
                _this.params.totalSize= data.total;
                _this.params.currentSize= data.size;
                if(data.size== 0&& _this.params.currentPage!= 1){
                    _this.params.currentPage= 1;
                            // m.getTableInfo();
                    }
                });
            }
        }

    }
</script>