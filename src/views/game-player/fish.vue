<template>
    <div>
        <div >
            <PageablePlayerList :params="pageParams"></PageablePlayerList>
        </div>
    </div>
</template>
<script>
    import global from '../../app/global';
    import util from '../../libs/util';
    import arrayUtil from '../../libs/array-util';
    import api from '../../net/api';
    import { fishColumns } from './define'
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'
    import {pageableConst} from  '../ext-components/constants.js'

    export default {
        components: { PageablePlayerList},
        name: 'player-control-fish',
        data () {
            return {
                pageParams: {
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
                editForm: {
                    userId: null,
                    rewardRate: null,
                    executeWinLoss: null,
                    remark: null
  
                },
                timer4syncTableInfo: null,
            };
        },
        created () {
            var cols = []
            for (let i = 0; i < fishColumns.length; i++) {
                cols.push(fishColumns[i])
            }
            
            cols.splice(11, 0, {
                title: '备注',
                key: 'remark',
                render: (h, params) => {
                    console.log(params);
                    let index= params.index;
                    let row= params.row;
                    return  h('a', {
                        on: {
                            click: ()=>{
                                // this.editForm.userId= row.userId;
                                // this.editForm.rewardRate= row.rewardRate;
                                // this.editForm.executeWinLoss= row.executeWinLoss;
                                this.editForm.remark= row.remark;
                                this.editForm.userId= row.userId;
                                this.showUpdateRemark();
                            }
                        }
                    }, row.remark);
                }
            });
            cols.splice( 13, 0,{
                title: '操作',
                key: 'operation',
                render: (h, params) => {
                     console.log(params);
                        let index= params.index;
                            return  h('a', {
                                    on: {
                                        click: () => {
                                            let p = this.pageParams.dataList[index];
                                            console.log(p);
                                            let _this= this;
                                            util.confirm(this, '确定将 <b>' + p.userName + '</b> 踢下线?', () => {
                                                api.postData(_this, api.URL.KickUser, {userId: p.userId},
                                                data => {
                                                    alert('踢人成功')
                                                }, error=> {
                                                    alert('踢人失败');
                                                })
                                            });
                                        }
                                    }
                                }, '踢下线');       
                        }
            });
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
            });
            cols.splice(15, 0, {
                title: '监控状态',
                key: 'isMoniting',
                render: (h, params) => {
                    console.log(params);
                    let index= params.index;
                    let row= params.row;
                    let info= row.isMoniting? '执行':'未执行';
                    return  h('span', {
                        on: {
                            click: ()=>{
                                this.editForm.userId= row.userId;
                                this.editForm.rewardRate= row.rewardRate;
                                this.editForm.executeWinLoss= row.executeWinLoss;
                                this.showUpdateRewardRate();
                            }
                        }
                    }, info);
                }
            });
            cols.splice(16, 0, {
                title: '返奖率',
                key: 'rewardRate',
                render: (h, params) => {
                    console.log(params);
                    let index= params.index;
                    let row= params.row;
                    return  h('a', {
                        on: {
                            click: ()=>{
                                this.editForm.userId= row.userId;
                                this.editForm.rewardRate= row.rewardRate;
                                this.editForm.executeWinLoss= row.executeWinLoss;
                                this.showUpdateRewardRate();
                            }
                        }
                    }, row.rewardRate);
                }
            });
            cols.splice(17, 0, {
                title: '执行输赢',
                key: 'executeWinLoss',
                render: (h, params) => {
                    console.log(params);
                    let index= params.index;
                    let row= params.row;
                    return  h('a', {
                        on: {
                            click: ()=>{
                                this.editForm.userId= row.userId;
                                this.editForm.rewardRate= row.rewardRate;
                                this.editForm.executeWinLoss= row.executeWinLoss;
                                this.showUpdateExecuteWinLoss();
                            }
                        }
                    }, row.executeWinLoss);
                }
            });
            this.pageParams.columnList= cols;
            this.pageParams.pageTo= this.getPlayerInfo;
            this.pageParams.sortTo= this.getPlayerInfo;
            
            this.getPlayerInfo();
             if(this.timer4syncTableInfo== null){
                  let timer4syncTableInfo= setInterval(this.getPlayerInfo, 1500); 
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
            showUpdateRemark(){
                this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑备注</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: this.editForm.remark,
                                autofocus: true,
                                placeholder: '备注'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editForm.remark = o.target.value
                                }
                            }
                            })
                        ]);
                    },
                    onOk: ()=> {  
                        let url= api.URL.Fishing_Update_Remark();
                        let _this= this;
                        api.postData(this, url, this.editForm, function(data){
                            alert(data);
                            _this.editForm.remark= null;
                        }, function (error){
                            alert(error);
                            _this.editForm.remark= null;
                        });
                    },
                    onCancel: ()=> {
                        this.editForm.remark= null
                    }
                });
            },
            showUpdateRewardRate(){
                this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑返奖率</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: this.editForm.rewardRate,
                                autofocus: true,
                                placeholder: '返奖率'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editForm.rewardRate = o.target.value
                                }
                            }
                            })
                        ]);
                    },
                    onOk: ()=> {  
                        let url= api.URL.Fishing_Update_Monitor();
                        let _this= this;
                        api.postData(this, url, this.editForm, function(data){
                            if(data){
                                alert("成功");
                            }else {
                                alert("失败");
                            }
                            _this.editForm.rewardRate= null;
                            _this.editForm.executeWinLoss= null;
                        }, function (error){
                            alert(error);
                           _this.editForm.rewardRate= null;
                           _this.editForm.executeWinLoss= null;
                        });
                    },
                    onCancel: ()=> {
                       _this.editForm.rewardRate= null;
                       _this.editForm.executeWinLoss= null; 
                    }
                });
            },
            showUpdateExecuteWinLoss(){
                this.$Modal.confirm({
                    title: '<p style="font-weight:bolder;font-color:red;font-size:16px">编辑执行输赢</p><br/>',
                    render: (h)=>{
                        return h('div', [
                            h('Input', {
                                props: {
                                value: this.editForm.executeWinLoss,
                                autofocus: true,
                                placeholder: '执行输赢'
                            }, 
                            on: {
                                'on-blur': o => {
                                    this.editForm.executeWinLoss = o.target.value
                                }
                            }
                            })
                        ]);
                    },
                    onOk: ()=> {  
                        let url= api.URL.Fishing_Update_Monitor();
                        let _this= this;
                        api.postData(this, url, this.editForm, function(data){
                            console.log(data);
                            if(data){
                                alert("成功");
                            }else {
                                alert("失败");
                            }
                            _this.editForm.rewardRate= null;
                            _this.editForm.executeWinLoss= null;
                        }, function (error){
                            alert(error);
                           _this.editForm.rewardRate= null;
                           _this.editForm.executeWinLoss= null;
                        });
                    },
                    onCancel: ()=> {
                       _this.editForm.rewardRate= null;
                       _this.editForm.executeWinLoss= null; 
                    }
                });
            },
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
                }
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
            getPlayerInfo(){
                let _this = this
                    let url= api.URL.Fishing_Player_List(this.pageParams.currentPage, this.pageParams.pageSize, this.pageParams.orderByDesc, this.pageParams.orderByField);
                    api.getData(_this, url, function (data) {
                        
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
                        //TODO palmava:测试
                       _this.pageParams.dataList = datas;
                        _this.pageParams.currentPage= data.pageNum;
                        _this.pageParams.totalSize= data.total;
                        _this.pageParams.currentSize= data.size;
                        if(data.size== 0&& _this.pageParams.currentPage!= 1){
                            _this.pageParams.currentPage= 1;
                            // m.getPlayerInfo();
                            
                        }
                        // _this.pageParams.dataList = [{
                        //     userName:"test",
                        //     userId:"20"
                        // }]
                    });
            }
        }
    };
</script>
