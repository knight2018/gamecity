<template>
    <div>
        <div >
            <game-control-player-list :column-list="columns" :data-list="playerList"></game-control-player-list>
        </div>
    </div>
</template>
<script>
    import global from '../../app/global';
    import util from '../../libs/util';
    import arrayUtil from '../../libs/array-util';
    import api from '../../net/api';
    import gameControlPlayerList from './components/player-list.vue'
    import { douDiZhuPlayerColumns } from './define'

    export default {
        components: { gameControlPlayerList },
        name: 'kuaile30-player-control',
        data () {
            return {
                columns: [],
                playerList: [],
                tableList: [],
                onlineCount: 0,
                syncTableInfoTimer: null,
                timerTick: 0,
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
            // cols.push({
            //     title: '监控中心2',
            //     key: 'monitor'
            // })
            cols.splice( 13, 0,{
                title: '操作',
                key: 'operation',
                render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            let m = this
                                            var p = this.playerList[params.index]
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
                                            let p= this.playerList[params.index];
                                            this.userId= p.userId;
                                            console.log(p);
                                            m.showMonitor()
                                        }
                                    }
                                }, '监控')                                
                            ]);
                        }
            })
            this.columns = cols
            let m = this
            api.getData(this, api.URL.DouDiZhu_PlayerList, function (data) {
                for (let index = 0; index < data.length; index++) {
                            let playerInfo= data[index];
                            let offline= playerInfo['offline'];
                            if(offline== false){
                                data[index]['offline']= '在线';
                            }else {
                                data[index]['offline']= '离线';
                            }
                        }
                m.playerList = data;
                m.syncTableInfoTimer = setInterval(m.syncTableInfo, 1000)
            })
        },
        beforeDestroy() {
            console.log('beforeDestroy')
            if(this.syncTableInfoTimer !== null) {
                clearInterval(this.syncTableInfoTimer)
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
                    // util.d(this.editAccount)
                    // if (stringUtil.isBlank(this.editAccount.loginName)) {
                    //     alert('输入账户')
                    //     this.$Modal.remove()
                    //     return
                    // }
                    // if (stringUtil.isBlank(this.editAccount.name)) {
                    //     alert('输入使用者')
                    //     this.$Modal.remove()
                    //     return
                    // }
                    // if (stringUtil.isBlank(this.editAccount.remark)) {
                    //     this.editAccount.remark = ''
                    // }

                    // util.showLoading(this)
                    api.postData(this, api.URL.DouDiZhu_Update_Player_Winloss, {userId: this.userId, winLossRate: this.winLossRate, winLoss: this.winLoss}, data => {
                        // util.hideLoading(this)
                        // this.$Modal.remove()
                        console.log(data);
                    })
                },
                 onCancel:()=>{
                    this.winLossRate = null;
                    this.winLoss = null;
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
            syncTableInfo() {
                this.timerTick++
                if(this.timerTick % 5 == 0) {
                    let m = this
                    api.getData(this, api.URL.DouDiZhu_PlayerList, function (data) {
                        for (let index = 0; index < data.length; index++) {
                            let playerInfo= data[index];
                            let offline= playerInfo['offline'];
                            if(offline== false){
                                data[index]['offline']= '在线';
                            }else {
                                data[index]['offline']= '离线';
                            }
                        }
                        m.playerList = data
                    })
                }
            }
        }
    };
</script>
