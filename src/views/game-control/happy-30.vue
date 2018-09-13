<template>
    <div>
        <div v-if="!isShowTableInfo">
            <game-control-table-list @enterTable="showTableInfo" :table-list="this.tableList"></game-control-table-list>
        </div>
        <div v-else>
            <Row>
                <Col span="24">
                 房间玩家: {{ this.tablePlayerCount }}  下注玩家:{{ this.betPlayerCount }} 
                 <div style="float:right"> 
                    <Button type="info" @click="showTableList">返回</Button>
                 </div>
                </Col>
            </Row>
            <Row>
                <game-control-player-list :column-list="columns" :data-list="playerList"></game-control-player-list>
            </Row>
            <br/>
            <br/>
            <Row :gutter="40">
                <Col span="4">
                  <Card>
                    下注: {{ this.betCoinBanker }} <br />
                    庄区域 <br />
                    <Checkbox v-model="isBankerWin" @on-change="onBankerWin">赢</Checkbox> <br />
                  </Card>
                </Col>
                <Col span="4">
                 <Card>
                    下注: {{ this.betCoinBankerPair }} <br />
                    庄对区域 <br />
                    <Checkbox v-model="isBankerPair">庄对子</Checkbox> <br />
                  </Card>
                </Col>
                <Col span="4">
                  <Card>
                    下注: {{ this.betCoinPlayer }} <br />
                    闲区域 <br />
                    <Checkbox v-model="isPlayerWin" @on-change="onPlayerWin">赢</Checkbox> <br />
                  </Card>
                </Col>
                <Col span="4">
                  <Card>
                    下注: {{ this.betCoinPlayerPair }} <br />
                    闲对区域 <br />
                    <Checkbox v-model="isPlayerPair">闲对子</Checkbox> <br />
                  </Card>
                </Col>
                <Col span="4">
                 <Card>
                    下注: {{ this.betCoinDraw }} <br />
                    和区域 <br />
                    <Checkbox v-model="isDraw" @on-change="onDraw">赢</Checkbox> <br />
                  </Card>
                </Col>
                
            </Row>
            <br />
            <hr />
            <Row>
                <Col>
                    <span style="float:right">
                    总下注: {{ this.betCoinAll }} <br />
                    </span>
                </Col>
            </Row>
              <br/>
              <br/>
            <Row>
              <Col>
              <div style="text-align:center" >
               <Button type="warning" size="large" @click="setResult" v-bind:disabled="this.tableStatus === 3" >确定</Button>
              </div>
              </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <Row>
                 <div style="text-align:center" >
                     当前状态: {{ tableStatusDesc }} <br />
                    <div v-if="this.tableStatus == 2">
                     下注结束倒计时<br />
                    </div><br /><br />
                  <i-circle :percent="countdownPercent" v-bind:stroke-color="getTableColor()">
                    <span style="font-size:24px"> {{ countdownS }}</span>
                  </i-circle>
                </div>
            </Row>
            
        </div>
    </div>
</template>
<script>
    import global from '../../app/global';
    import util from '../../libs/util';
    import arrayUtil from '../../libs/array-util';
    import api from '../../net/api';
    import gameControlTableList from './components/table-list.vue';
    import gameControlPlayerList from './components/player-list.vue'
    import { happy30PlayerColumns } from './define'

    export default {
        components: { gameControlTableList, gameControlPlayerList },
        name: 'niuniu-100-game-control',
        data () {
            return {
                columns: happy30PlayerColumns,
                isShowTableInfo: false,
                isBankerWin: false,
                isPlayerWin: false,
                isBankerPair: false,
                isPlayerPair: false,
                isDraw: false,
                betCoinBanker: 0,
                betCoinBankerPair: 0,
                betCoinPlayer: 0,
                betCoinPlayerPair: 0,
                betCoinDraw: 0,
                betCoinAll: 0,
                playerList: [],
                tableList: [],
                tablePlayerCount:0,
                betPlayerCount: 0,
                countdownSeconds: -1,
                tableStatus: -1,
                lastTableStatus: -1,
                selectTableInfo: null,
                syncTableInfoTimer: null,
                timerTick: 0
            };
        },
        computed: {
            countdownPercent () {
                switch(this.tableStatus) {
                    case 0: return (global.h30MaxIdleSeconds - this.countdownSeconds) * 1.0 / global.h30MaxIdleSeconds * 100;
                    case 2: return (global.h30MaxBetSeconds - this.countdownSeconds) * 1.0 / global.h30MaxBetSeconds * 100;
                    default: return 100
                }
            },
            countdownS () {
                return Math.max(0, this.countdownSeconds)
            },
            tableStatusDesc () {
                switch(this.tableStatus) {
                    case -1: return ''
                    case 0: return '空闲时间'
                    case 1: return '游戏开始'
                    case 2: return '开始下注'
                    case 3: return '结算'
                    default: return this.tableStatus
                }
            }
        },
        created () {
            let m = this
            api.getData(this, api.URL.H30_TableList, function (data) {
                var list = []
                for (let i = 0; i < data.length; i++) {
                    const room = data[i];
                    var tableInfo = {
                        tableId: room.roomId,
                        playerNum: room.playerCount
                    }
                    list.push(tableInfo)
                }
                m.tableList = list
                m.showTableList()
                m.syncTableInfoTimer = setInterval(m.syncTableInfo, 1000)
            })
            console.log(this.syncTableInfoTimer)
        },
        beforeDestroy() {
            console.log('beforeDestroy')
            if(this.syncTableInfoTimer !== null) {
                clearInterval(this.syncTableInfoTimer)
            }
        },
        methods: {
             getTableColor() {
                switch(this.tableStatus){
                    case 0: return '#2db7f5' //空闲
                    case 1: return '#5cb85c' //开始
                    case 2: return '#ff5500' //下注
                    case 3: return '#A3A3A3' //结算
                }
            },
            // 显示桌子列表
            showTableList() {
                this.isShowTableInfo = false;
            },
            updateTableInfo() {
                if(this.selectTableInfo === null){
                    return
                }
                var tableInfo = this.selectTableInfo
                var url = api.URL.H30_TableInfo(tableInfo.tableId)
                api.getData(this, url, data => {
                    this.isShowTableInfo = true
                    this.betCoinDraw = data.totalBets[0]
                    this.betCoinBanker = data.totalBets[1]
                    this.betCoinPlayer = data.totalBets[2]
                    this.betCoinBankerPair = data.totalBets[3]
                    this.betCoinPlayerPair = data.totalBets[4]
                    this.betCoinAll = arrayUtil.sum(data.totalBets)

                    this.tablePlayerCount = data.playerCount
                    this.betPlayerCount = data.betPlayerCount
                    this.countdownSeconds = data.countdownSeconds
                    
                    this.tableStatus = data.tableStatus
                    if(this.tableStatus === 0 && this.lastTableStatus !== this.tableStatus){
                        //重置选项
                        this.isBankerWin = this.isPlayerWin = this.isBankerPair = this.isPlayerPair = this.isDraw = false
                    }

                    this.lastTableStatus = this.tableStatus
                    var players = []
                    for (let i = 0; i < data.players.length; i++) {
                        const p = data.players[i];
                        var player = {
                            userId: p.userId,
                            userName: p.userName,
                            betDrawCoin: p.betCoins[0],
                            betBankerCoin: p.betCoins[1],
                            betPlayerCoin: p.betCoins[2],
                            betBankerPairCoin: p.betCoins[3],
                            betPlayerPairCoin: p.betCoins[4],
                            betTotalCoin: p.totalBetCoins
                        }
                        // if(player.betTotalCoin > 0){
                            players.push(player)
                        // }
                    }
                    this.playerList = players
                })  
            },
            // 获取桌子详细数据并显示
            showTableInfo(tableInfo) {
                this.selectTableInfo = tableInfo
                this.updateTableInfo()
            },
            syncTableInfo() {
                this.timerTick++
                if (this.isShowTableInfo) {
                    // this.countdownSeconds--
                    
                    if(this.selectTableInfo === null){
                        return
                    }
                    this.updateTableInfo()
                } else {
                    if(this.timerTick % 3 == 0) {
                        let m = this
                        api.getData(this, api.URL.H30_TableList, function (data) {
                            var list = []
                            for (let i = 0; i < data.length; i++) {
                                const room = data[i];
                                var tableInfo = {
                                    tableId: room.roomId,
                                    playerNum: room.playerCount
                                }
                                list.push(tableInfo)
                            }
                            m.tableList = list
                            m.showTableList()
                        })
                    }
                }
            },
            //设置牌局结果
            setResult() {
                var win = -1
                
                if(this.isBankerWin) win = 1
                else if(this.isPlayerWin) win = 2
                else if(this.isDraw) win = 0

                var result = {
                    roomId: this.selectTableInfo.tableId,
                    result: win,
                    isBankerPair: this.isBankerPair,
                    isPlayerPair: this.isPlayerPair
                }
                api.postData(this, api.URL.H30_Result, result, () => util.alert(this, '设置成功'))
            },
            onBankerWin() {
                if(this.isBankerWin){
                    this.isDraw = false
                    this.isPlayerWin = false
                }
            },
            onPlayerWin() {
                if(this.isPlayerWin){
                    this.isDraw = false
                    this.isBankerWin = false
                }
            },
            onDraw() {
                if(this.isDraw){
                    this.isPlayerWin = false
                    this.isBankerWin = false
                }
            }
        }
    };
</script>
