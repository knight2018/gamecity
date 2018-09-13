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
    import { niu100PlayerColumns} from './data/define.js';

    export default {
       components: { PageablePlayerList },
        name: 'online-niuniu-player-list',
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
                userId: null,//用户修改需要的id
            };
        },
        created () {
            var cols = []
            for (let i = 0; i < niu100PlayerColumns.length; i++) {
                cols.push(niu100PlayerColumns[i])
            }
            cols.splice( 13, 0,{
                title: '操作',
                key: 'operation',
                render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            let m = this
                                            var p = this.params.dataList[params.index];
                                            util.confirm(this, '确定将 <b>' + p.nickName + '</b> 踢下线?', () => {
                                                api.postData(m, api.URL.KickUser, {userId: p.userId},
                                                data => {
                                                    alert('踢人成功')
                                                    // util.alert(m, '踢人成功')
                                                })
                                            });
                                        }
                                    }
                                }, '踢下线')                                
                            ]);
                        }

            })
            this.params.columnList= cols;
            this.params.pageTo= this.getPlayerList;
            this.params.sortTo= this.getPlayerList;
            this.getPlayerList();
            if(this.timer4syncPlayerList== null){
                let timer4syncPlayerList= setInterval(this.getPlayerList, 1500);
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
                    let url= api.URL.Niu100_PlayerList(this.params.currentPage, this.params.pageSize, this.params.orderByDesc, this.params.orderByField);
                    api.getData(this, url, function (data) {
                        let datas= data.datas;
                        for (let index = 0; index < datas.length; index++) {
                            let playerInfo= datas[index];
                            let offline= playerInfo['offline'];
                            if(offline== false){
                                datas[index]['offline']= '在线';
                            }else {
                                datas[index]['offline']= '离线';
                            }
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