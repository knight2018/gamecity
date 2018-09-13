<template>
    <div>
        <div >
            <PageablePlayerList :params="params"></PageablePlayerList>
        </div>
    </div>
</template>
<script>
    import global from '../../app/global';
    import util from '../../libs/util';
    import arrayUtil from '../../libs/array-util';
    import api from '../../net/api';
    import { douDiZhuPlayerColumns } from './define'
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    import {pageableConst} from  '../ext-components/constants.js'

    export default {
        components: { PageablePlayerList},
        name: 'ddz-player-control',
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
                timer4syncTableInfo: null,
                userId: null,//用户修改需要的id
                winLossRate: 0.0,//胜率
                winLoss:0//分数
            };
        },
        created () {
            var cols = []
            for (let i = 0; i < douDiZhuPlayerColumns.length; i++) {
                cols.push(douDiZhuPlayerColumns[i])
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
                                            var p = this.params.dataList[params.index]
                                            util.confirm(this, '确定将 <b>' + p.userName + '</b> 踢下线?', () => {
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
            cols.splice( 14, 0, {
                title: '监控中心',
                key: 'monitor',
                render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let m = this
                                            let p= this.params.dataList[params.index];
                                            this.userId= p.userId;
                                            console.log(p);
                                            m.showMonitor()
                                        }
                                    }
                                }, '监控')                                
                            ]);
                        }
            })
            this.params.columnList= cols;
            this.params.pageTo= this.getTableInfo;
            this.params.sortTo= this.getTableInfo;
            
            if(this.timer4syncTableInfo== null){
                let timer4syncTableInfo= setInterval(this.getTableInfo, 1500); 
                this.timer4syncTableInfo= timer4syncTableInfo;
            }
        },
        beforeDestroy() {
            console.log('beforeDestroy')
            if(this.timer4syncTableInfo !== null) {
                clearInterval(this.timer4syncTableInfo)
            }
        },
        methods: {
            showMonitor () {
                this.$Modal.confirm({
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '个人胜率'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.winLossRate = o.target.value
                                }
                            }
                            }),
                            h('span', {},'1%-100%'),
                            h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '执行输赢'
                            },
                            on: {
                                'on-blur': o => {
                                    this.winLoss = o.target.value
                                }
                            }})
                        ]
                        )
                    },
                onOk: () => {
                    api.postData(this, api.URL.DouDiZhu_Update_Player_Winloss, {userId: this.userId, winLossRate: this.winLossRate, winLoss: this.winLoss}, data => {
                        // util.hideLoading(this)
                        // this.$Modal.remove()
                        console.log(data);
                    })
                },
                })
            },
            getMonitorState(state) {
                switch(state){
                    case 0: return '#2db7f5' //空闲
                    case 1: return '#5cb85c' //开始
                    case 2: return '#5cb85c' //骰子
                    case 3: return '#ff5500' //下注
                    case 4: return '#A3A3A3' //结算
                }
            },
            getTableInfo(){
                let _this = this
                    let url= api.URL.DouDiZhu_PlayerList(this.params.currentPage, this.params.pageSize, this.params.orderByDesc, this.params.orderByField);
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
    };
</script>
