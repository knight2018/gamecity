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
                总人数:    {{playerList.length}}
                <PageablePlayerList :column-list="columns" :data-list="playerList" :totalSize="totalSize" :currentPage="currentPage" :pageSize="pageSize" :currentSize="currentSize" @pageTo="pageTo"></PageablePlayerList>
            </Row>
            <br/>
            <br/>
            <Row :gutter="40">
                <Col span="4">
                  <Card>
                    天区域 <br />
                    下注: {{ this.betCoinTian }} <br />
                    <RadioGroup v-model="resultTian" @on-change="onItemChange">
                        <Radio label="随机"></Radio> <br />
                        <Radio label="赢"></Radio><br />
                        <Radio label="输"></Radio><br />
                    </RadioGroup>
                  </Card>
                </Col>
                <Col span="4">
                  <Card>

                  地区域 <br />
                  下注: {{ this.betCoinDi }} <br />
                   <RadioGroup v-model="resultDi" @on-change="onItemChange">
                      <Radio label="随机"></Radio> <br />
                      <Radio label="赢"></Radio><br />
                      <Radio label="输"></Radio><br />
                  </RadioGroup>
                  </Card>

                </Col>
                <Col span="4">
                  <Card>
                  玄区域 <br />
                  下注: {{ this.betCoinXuan }} <br />
                   <RadioGroup v-model="resultXuan" @on-change="onItemChange">
                      <Radio label="随机"></Radio> <br />
                      <Radio label="赢"></Radio><br />
                      <Radio label="输"></Radio><br />
                  </RadioGroup>
                  </Card>

                </Col>
                <Col span="4">
                  <Card>
                  黄区域 <br />
                  下注: {{ this.betCoinHuang }} <br />
                   <RadioGroup v-model="resultHuang" @on-change="onItemChange">
                      <Radio label="随机"></Radio> <br />
                      <Radio label="赢"></Radio><br />
                      <Radio label="输"></Radio><br />
                  </RadioGroup>
                  </Card>

                </Col>
                <Col span="4">
                  <Card>
                  总下注: {{ this.betCoinAll }} <br />
                  <br/>
                  <Checkbox v-model="bankerWin" @on-change="onBankerWin">庄家通杀</Checkbox> <br />
                  <Checkbox v-model="bankerLose" @on-change="onBankerLose">庄家通赔</Checkbox> <br />
                  </Card>

                </Col>
            </Row>
              <br/>
              <br/>
            <Row>
              <Col>
              <div style="text-align:center">
               <Button type="warning" size="large" @click="setResult" v-bind:disabled="this.tableStatus === 4" >确定</Button>
              </div>
              </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <Row>
                 <div style="text-align:center">
                     当前状态: {{ tableStatusDesc }} <br />
                    <div v-if="this.tableStatus == 3">
                     下注结束倒计时<br />
                    </div>
                    <br />
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
    import { niu100PlayerColumns } from './define'
    import PageablePlayerList from '../ext-components/pageable-player-list.vue'

    export default {
        components: { gameControlTableList, gameControlPlayerList, PageablePlayerList },
        name: 'niuniu-100-game-control',
        data () {
            return {
                columns: niu100PlayerColumns,
                isShowTableInfo: false,
                resultTian: '随机',
                resultDi: '随机',
                resultXuan: '随机',
                resultHuang: '随机',
                bankerWin: false,
                bankerLose: false,
                betCoinTian: 0,
                betCoinDi: 0,
                betCoinXuan: 0,
                betCoinHuang: 0,
                betCoinAll: 0,
                playerList: [],
                tableList: [],
                tablePlayerCount:0,
                betPlayerCount: 0,
                countdownSeconds: -1,
                selectTableInfo: null,
                syncTableInfoTimer: null,
                lastTableStatus: -1,
                tableStatus: -1,
                timerTick: 0,
                currentPage: 1,//当前页码
                pageSize: 5,//每页数目
                totalSize: 0,//总数据
                currentSize: 0//当期页个数
            };
        },
        computed: {
            countdownPercent () {
                if(this.countdownSeconds <= 0)return 100;
                return (global.niu100MaxBetSeconds - this.countdownSeconds) * 1.0 / global.niu100MaxBetSeconds * 100;
            },
            countdownS () {
                return Math.max(0, this.countdownSeconds)
            },
            tableStatusDesc () {
                switch(this.tableStatus) {
                    case -1: return ''
                    case 0: return '空闲时间'
                    case 1: return '游戏开始'
                    case 2: return '投骰子'
                    case 3: return '开始下注'
                    case 4: return '结算'
                    default: return this.tableStatus
                }
            }
        },
        created () {
            let m = this
            api.getData(this, api.URL.Niu100_TableList, function (data) {
                m.tableList = data.datas;
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
            pageTo(params){
                console.log("niuniu-vue, pageTo............");
                this.currentPage= params.currentPage;
                this.updateTableInfo();
            },
            getTableColor() {
                switch(this.tableStatus){
                    case 0: return '#2db7f5' //空闲
                    case 1: return '#5cb85c' //开始
                    case 2: return '#5cb85c' //骰子
                    case 3: return '#ff5500' //下注
                    case 4: return '#A3A3A3' //结算
                }
            },
            //下一页
            pagePlayerList(page){
                console.log(page);
                this.currentPage= page;
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
                var url = api.URL.Niu100_TableInfo(tableInfo.sceneId,tableInfo.roomId,tableInfo.tableId, this.currentPage, this.pageSize)
                api.getData(this, url, data => {
                    this.isShowTableInfo = true
                    this.betCoinTian = data.bets[0]
                    this.betCoinDi = data.bets[1]
                    this.betCoinXuan = data.bets[2]
                    this.betCoinHuang = data.bets[3]
                    this.betCoinAll = 0
                    for(var i in data.bets) { this.betCoinAll += data.bets[i]; }

                    this.tablePlayerCount = data.playerNum
                    this.betPlayerCount = data.betPlayerNum
                    this.countdownSeconds = data.betLeftTime
                    this.tableStatus = data.tableStatus
                    //console.log(String.format('桌子状态: {0}, 剩余时间 {1}',data.tableStatus, data.betLeftTime))

                    if(this.tableStatus == 0 && this.tableStatus != this.lastTableStatus){
                        //开局重置为随机
                        this.resultTian = '随机'
                        this.resultDi = '随机'
                        this.resultXuan = '随机'
                        this.resultHuang = '随机'
                        this.bankerWin = false
                        this.bankerLose = false
                    }
                    var players = []
                    for (let i = 0; i < data.datas.length; i++) {
                        const p = data.datas[i];
                        var player = {
                            userId: p.userId,
                            userName: p.nickName,
                            betTianCoin: p.bets[0],
                            betDiCoin: p.bets[1],
                            betXuanCoin: p.bets[2],
                            betHuangCoin: p.bets[3],
                            betTotalCoin: p.sumBet
                        }
                        players.push(player)
                    }
                    this.playerList = players
                    this.lastTableStatus = this.tableStatus
                    //分页数据
                    this.totalPage= data.pages;
                    this.totalSize= data.total;
                    this.currentSize= data.size;
                })  
            },
            // 获取桌子详细数据并显示
            showTableInfo(tableInfo) {
                this.selectTableInfo = tableInfo
                this.updateTableInfo();

            },
            syncTableInfo() {
                this.timerTick++
                if (this.isShowTableInfo) {
                    // this.countdownSeconds--
                
                    if(!this.isShowTableInfo){
                        return
                    }
                    if(this.selectTableInfo === null){
                        return
                    }

                    // if(this.countdownSeconds %  === 0){
                    //     this.updateTableInfo()
                    // }
                    this.updateTableInfo()
                } else {
                    if(this.timerTick % 3 == 0) {
                        let m = this
                        api.getData(this, api.URL.Niu100_TableList, function (data) {
                            m.tableList = data.datas;
                            m.showTableList()
                        })
                    }
                }
            },
            //设置牌局结果
            setResult() {
                var result = {
                    sceneId: this.selectTableInfo.sceneId,
                    roomId: this.selectTableInfo.roomId,
                    tableId: this.selectTableInfo.tableId,
                    tian: this.getResultType(this.resultTian),
                    di: this.getResultType(this.resultDi),
                    xuan: this.getResultType(this.resultXuan),
                    huang: this.getResultType(this.resultHuang)
                }
                api.postData(this, api.URL.Niu100_Result, result, () => util.alert(this, '设置成功'))
            },
            getResultType(choose){
                switch(choose){
                    case '赢': return 1;
                    case '输': return -1;
                    default: return 0;
                }
            },
            onBankerWin(){
                if(this.bankerWin){
                    this.bankerLose = false
                    this.resultTian = '输'
                    this.resultDi = '输'
                    this.resultXuan = '输'
                    this.resultHuang = '输'
                }
            },
            onBankerLose(){
                if(this.bankerLose){
                    this.bankerWin = false
                    this.resultTian = '赢'
                    this.resultDi = '赢'
                    this.resultXuan = '赢'
                    this.resultHuang = '赢'
                }
            },
            onItemChange(){
                this.bankerWin = this.resultTian === '输' && this.resultDi === '输' && this.resultXuan === '输' && this.resultHuang === '输'
                this.bankerLose = this.resultTian === '赢' && this.resultDi === '赢' && this.resultXuan === '赢' && this.resultHuang === '赢'
            }
        }
    };
</script>
