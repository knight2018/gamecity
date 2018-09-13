<template>
    <div>
        <div v-if="isShowTables">
            <Card v-for="tableInfo in tableInfos" style="width:350px;cursor:pointer;" @click.native="changeTableInfo(tableInfo)">
                <p slot="title">
                    <Icon type="cash" size="36" color="#19be6b"></Icon>
                    Classic film

                    
                </p>
                <p>游戏号: {{tableInfo.gameId}}</p>
                <p>场景号: {{tableInfo.sceneId}}</p>
                <p>房间号: {{tableInfo.roomId}}</p>
                <p>桌子号: {{tableInfo.tableId}}</p>
                <p>在线人数: {{tableInfo.playerNum}}</p>
            </Card>
        </div>
        <div v-if="!isShowTables">
            <Layout>
                <Header style="background:none;">
                    <Row>
                        <Col span="4">
                        <span style="font-weight: bold;color:#464c5b; font-size:16px"> 房间玩家: {{playerNum}}</span>
                        </Col>
                        <Col span="4">
                        <span style="font-weight: bold;color:#464c5b; font-size:16px">下注玩家: {{betPlayerNum}}</span>
                        </Col>
                        <Col span="8" style="text-align: center;">
                        <i-circle :percent="restPercent" :stroke-color="restClass" :size="50">
                            <span class="demo-Circle-inner" style="font-size:16px">{{restTime}}秒</span>
                        </i-circle>
                        </Col>
                        <Col span="8" style="text-align: right;">
                        <div style="cursor:pointer;" @click="backTo">
                            <Icon type="ios-undo" size="24" color="#19be6b" title="返回"></Icon>
                            <span style="margin-left:10px; font-weight: bold;color:#464c5b; font-size:16px">返回</span>
                        </div>
                        </Col>
                    </Row>
                    <span>
                    </span>
                </Header>
                <Content>
                    <Table :columns="columnList" :data="betPlayerInfos" size="small" height="400"></Table>
                </Content>
                <Footer>
                    <Row>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.redBenz['checked']" @on-change="changePrizeSelect($event, 'redBenz')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">红奔驰: {{prizeSelector.redBenz['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.greenBenz['checked']" @on-change="changePrizeSelect($event, 'greenBenz')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">绿奔驰: {{prizeSelector.greenBenz['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.yellowBenz['checked']" @on-change="changePrizeSelect($event, 'yellowBenz')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">黄奔驰: {{prizeSelector.yellowBenz['bet']}}</span>
                        </Checkbox>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.redBmw['checked']" @on-change="changePrizeSelect($event, 'redBmw')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">红宝马: {{prizeSelector.redBmw['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.greenBmw['checked']" @on-change="changePrizeSelect($event, 'greenBmw')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">绿宝马: {{prizeSelector.greenBmw['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.yellowBmw['checked']" @on-change="changePrizeSelect($event, 'yellowBmw')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">黄宝马: {{prizeSelector.yellowBmw['bet']}}</span>
                        </Checkbox>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.redAudi['checked']" @on-change="changePrizeSelect($event, 'redAudi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">红奥迪: {{prizeSelector.redAudi['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.greenAudi['checked']" @on-change="changePrizeSelect($event, 'greenAudi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">绿奥迪: {{prizeSelector.greenAudi['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.yellowAudi['checked']" @on-change="changePrizeSelect($event, 'yellowAudi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">黄奥迪: {{prizeSelector.yellowAudi['bet']}}</span>
                        </Checkbox>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.redVm['checked']" @on-change="changePrizeSelect($event, 'redVm')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">红大众: {{prizeSelector.redVm['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.greenVm['checked']" @on-change="changePrizeSelect($event, 'greenVm')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">绿大众: {{prizeSelector.greenVm['bet']}}</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.yellowVm['checked']" @on-change="changePrizeSelect($event, 'yellowVm')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">黄大众: {{prizeSelector.yellowVm['bet']}}</span>
                        </Checkbox>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.xiaoSanyuan['checked']" @on-change="changePrizeSelect($event, 'xiaoSanyuan')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">小三元</span>
                        </Checkbox>
                        <br>
                        <Radio :disabled="disabledObj.xiaoSanyuan" v-model="xiaoSanyuanSelector.audi['checked']" @on-change="changeXiaoSanyuanSelect($event, 'audi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">奥迪</span>
                        </Radio>
                        <br>
                        <Radio :disabled="disabledObj.xiaoSanyuan" v-model="xiaoSanyuanSelector.vm['checked']" @on-change="changeXiaoSanyuanSelect($event, 'vm')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">大众</span>
                        </Radio>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.daSanyuan['checked']" @on-change="changePrizeSelect($event, 'daSanyuan')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">大三元</span>
                        </Checkbox>
                        <br>
                        <Radio :disabled="disabledObj.daSanyuan" v-model="daSanyuanSelector.benz['checked']" @on-change="changeDaSanyuanSelect($event, 'benz')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">奔驰</span>
                        </Radio>
                        <br>
                        <Radio :disabled="disabledObj.daSanyuan" v-model="daSanyuanSelector.bmw['checked']" @on-change="changeDaSanyuanSelect($event, 'bmw')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">宝马</span>
                        </Radio>
                        <br>
                        </Col>
                        <Col span="3">
                        <Checkbox v-model="prizeSelector.xiaoSixi['checked']" @on-change="changePrizeSelect($event, 'xiaoSixi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">小四喜</span>
                        </Checkbox>
                        <br>
                        <Radio :disabled="disabledObj.xiaoSixi" v-model="xiaoSixiSelector.red['checked']" @on-change="changeXiaoSixiSelect($event, 'red')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">红</span>
                        </Radio>
                        <br>
                        <Radio :disabled="disabledObj.xiaoSixi" v-model="xiaoSixiSelector.green['checked']" @on-change="changeXiaoSixiSelect($event, 'green')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">绿</span>
                        </Radio>
                        <br>
                        <Radio :disabled="disabledObj.xiaoSixi" v-model="xiaoSixiSelector.yellow['checked']" @on-change="changeXiaoSixiSelect($event, 'yellow')">
                            <span style="font-weight: bold;color:#464c5b; font-size:12px">黄</span>
                        </Radio>
                        <br>
                        </Col>
                        <Col span="3">
                        <span style="font-weight: bold;color:#464c5b; font-size:16px">本轮总下注: {{totalBet}}</span>
                        <br/>
                        <br/>
                        <Checkbox v-model="prizeSelector.daManguan['checked']" @on-change="changePrizeSelect($event, 'daManguan')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">大满贯</span>
                        </Checkbox>
                        <br>
                        <Checkbox v-model="prizeSelector.zhuangChi['checked']" @on-change="changePrizeSelect($event, 'zhuangChi')">
                            <span style="font-weight: bold;color:#464c5b; font-size:16px">庄家通吃</span>
                        </Checkbox>
                        <br>
                        </Col>
                    </Row>
                </Footer>
                <Footer>
                    <Row>
                        <Col span="2" offset="20">
                        <Button type="error" :loading="loading" @click.native="setPrize">
                            <span v-if="loading">通讯中...</span>
                            <span v-if="!loading">提交</span>
                        </Button>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </div>
    </div>
</template>
<script>
    import { mingCheGameControlColumns } from './define.js';
    import {Prize} from './mingche.js'
    import api from '../../net/api.js';
    import { pageableConst } from '../ext-components/constants.js';
    import PagealbePlayerList from '../ext-components/pageable-player-list.vue'
    export default {
        created() {
            this.getTableInfo();
        },
        beforeDestroy() {
            clearInterval(this.timer4enterTable);
            this.timer4enterTable = null;
        },
        watch: {
            isShowTables() {
                if (this.isShowTables) {
                    clearInterval(this.timer4enterTable);
                    this.timer4enterTable = null;
                }
            }
        },
        data() {
            return {
                timer4enterTable: null,
                pageNum: pageableConst.currentPage,
                pageSize: 1000,//写死
                tableInfos: [],
                isShowTables: true,
                countdown: 0,//倒计时
                playerNum: 0,//在房间的人数
                betPlayerNum: 0,//投注的人数
                betPlayerInfos: [],//下注玩家信息
                columnList: mingCheGameControlColumns,
                tableInfo: null,//点击进入的房间
                restTime: 0,//剩余倒计时
                restPercent: 0,//剩余百分比
                restClass: '#2d8cf0',//样式
                loading: false,//设置请求
                requestInBetStateCount: 0,//请求次数, 如果为0,那么就清空某些数据
                prizeSelector: {//奖项选择列表
                    redBenz: {checked: false, flag: Prize.redBenz, bet: 0},
                    greenBenz: {checked: false, flag: Prize.greenBenz, bet: 0},
                    yellowBenz: {checked: false, flag: Prize.yellowBenz, bet:0},
                    redBmw: {checked: false, flag: Prize.redBmw, bet:0},
                    greenBmw: {checked: false, flag: Prize.greenBmw, bet:0},
                    yellowBmw: {checked: false, flag: Prize.yellowBmw, bet:0},
                    redAudi: {checked: false, flag: Prize.redAudi, bet:0},
                    greenAudi: {checked: false, flag: Prize.greenAudi, bet:0},
                    yellowAudi: {checked: false, flag: Prize.yellowAudi, bet:0},
                    redVm: {checked: false, flag: Prize.redVm, bet:0},
                    greenVm: {checked: false, flag: Prize.greenVm, bet:0},
                    yellowVm: {checked: false, flag: Prize.yellowVm, bet:0},
                    daSanyuan: {checked: false, flag: Prize.daSanyuan},
                    xiaoSanyuan: {checked: false, flag: Prize.xiaoSanyuan},
                    xiaoSixi: {checked: false, flag: Prize.xiaoSixi},
                    daManguan: {checked: false, flag: Prize.daManguan},
                    zhuangChi: {checked: false, flag: Prize.zhuangChi},
                },
                xiaoSanyuanSelector: {
                    audi: {checked: false, flag: Prize.sanyuanAudi},
                    vm: {checked: false, flag: Prize.sanyuanVm},
                },
                daSanyuanSelector: {
                    benz: {checked: false, flag: Prize.sanyuanBenz},
                    bmw: {checked: false, flag: Prize.sanyuanBmw},
                },
                xiaoSixiSelector: {
                    red: {checked: false, flag: Prize.siXiRed},
                    green: {checked: false, flag: Prize.siXiGreen},
                    yellow: {checked: false, flag: Prize.siXiYellow},
                },
                disabledObj: {
                  xiaoSanyuan: true,
                  daSanyuan: true,
                  xiaoSixi: true  
                },
                prizeFlag: 0,//选择的奖项
                prizeKey: null,//选中奖项的key
                totalBet: 0,//桌子上的总投注
            }
        },
        methods: {
            backTo(){
                this.getTableInfo();
                this.isShowTables= true;
            },
            setPrize(){
                if(this.prizeFlag=== 0){
                    this.$Notice.warning({
                        title: '设置提示',
                        desc: '没有勾选中奖选项, 请勾选'
                    });
                    return;
                }
                let url= api.URL.Mingche_Set_Prize();
                let params= {
                    gameId: this.tableInfo.gameId,
                    sceneId: this.tableInfo.sceneId,
                    roomId: this.tableInfo.roomId,
                    tableId: this.tableInfo.tableId,
                    flag: this.prizeFlag
                };
                const _this= this;
                api.postData(this, url, params, function(data){
                    if(data== 0){
                         _this.$Notice.success({
                            title: '奖项设置成功',
                            desc: false ? '' : '设置时, 如果当局已开奖, 那么会在下一局生效'
                        });
                    }else {
                        _this.$Notice.error({
                            title: '奖项设置失败'
                        });
                    }
                });
            },
            changeXiaoSanyuanSelect(isSelected, key){
                console.log(isSelected+'---------------'+ key);
                Object.getOwnPropertyNames(this.xiaoSanyuanSelector).forEach(item=>{
                    if(item=== key){
                        this.xiaoSanyuanSelector[item]['checked']= true;
                        this.prizeFlag= this.xiaoSanyuanSelector[item]['flag'];
                    }else {
                        this.xiaoSanyuanSelector[item]['checked']= false;
                    }
                });
            },
            changeDaSanyuanSelect(isSelected, key){
                console.log(isSelected+'---------------'+ key);
                 Object.getOwnPropertyNames(this.daSanyuanSelector).forEach(item=>{
                    if(item=== key){
                        this.daSanyuanSelector[item]['checked']= true;
                        this.prizeFlag= this.daSanyuanSelector[item]['flag'];
                    }else {
                        this.daSanyuanSelector[item]['checked']= false;
                    }
                });
            },
            changeXiaoSixiSelect(isSelected, key){
                console.log(isSelected+'---------------'+ key);
                 Object.getOwnPropertyNames(this.xiaoSixiSelector).forEach(item=>{
                    if(item=== key){
                        this.xiaoSixiSelector[item]['checked']= true;
                        this.prizeFlag= this.xiaoSixiSelector[item]['flag'];
                    }else {
                        this.xiaoSixiSelector[item]['checked']= false;
                    }
                });

            },
            changePrizeSelect(isSelected, key) {
                console.log(isSelected + '----' + key);
                    //清空
                    Object.getOwnPropertyNames(this.xiaoSanyuanSelector).forEach(item => {
                        this.xiaoSanyuanSelector[item]['checked'] = false;
                    });
                    Object.getOwnPropertyNames(this.prizeSelector).forEach(item => {
                        this.prizeSelector[item]['checked'] = false;
                    });
                    Object.getOwnPropertyNames(this.daSanyuanSelector).forEach(item => {
                        this.daSanyuanSelector[item]['checked'] = false;
                    });
                    Object.getOwnPropertyNames(this.xiaoSixiSelector).forEach(item => {
                        this.xiaoSixiSelector[item]['checked'] = false;
                    });
                    Object.getOwnPropertyNames(this.disabledObj).forEach(item => {
                        this.disabledObj[item] = true;
                    });
                    this.prizeFlag= 0;
                if (isSelected) {
                    this.prizeKey= key;
                    this.prizeSelector[key]['checked'] = true;
                    //子选项
                    if (key === 'xiaoSanyuan') {
                        this.xiaoSanyuanSelector.audi['checked'] = true;
                        this.disabledObj.xiaoSanyuan= false;
                        this.prizeFlag= this.xiaoSanyuanSelector.audi['flag'];
                    } else if (key === 'daSanyuan') {
                        this.daSanyuanSelector.benz['checked'] = true;
                        this.disabledObj.daSanyuan= false;
                        this.prizeFlag= this.daSanyuanSelector.benz['flag'];
                    } else if (key === 'xiaoSixi') {
                        this.xiaoSixiSelector.red['checked'] = true;
                        this.disabledObj.xiaoSixi= false;
                        this.prizeFlag= this.xiaoSixiSelector.red['flag'];
                    }else {
                        this.prizeFlag= this.prizeSelector[key]['flag'];
                    }
                } else {
                    this.prizeSelector[key]['checked'] = false;
                    this.prizeFlag= 0;
                    this.prizeKey= null;
                }
            },
            changeTableInfo(tableInfo) {
                this.isShowTables = false;
                this.tableInfo = tableInfo;
                this.enterTable();
            },
            enterTable() {
                var url = api.URL.Mingche_Single_Talbe(this.tableInfo.gameId, this.tableInfo.sceneId, this.tableInfo.roomId, this.tableInfo.tableId);
                api.getData(this, url, (data) => {
                    if (data.datas.length > 0) {
                        this.restTime = 0;
                        this.restPercent = 100;
                        this.restClass = '#ff5500';
                        let tableInfo = data.datas[0];
                        if(tableInfo.state==1){//准备状态清空

                        }else if(tableInfo.state== 2|| tableInfo.state== 3) {
                             this.betPlayerInfos.length= 0;
                                this.betPlayerInfos= [];//清空
                                this.prizeSelector.redBenz['bet']= 0;
                                this.prizeSelector.greenBenz['bet']= 0;
                                this.prizeSelector.yellowBenz['bet']= 0;
                                this.prizeSelector.redBmw['bet']= 0;
                                this.prizeSelector.greenBmw['bet']= 0;
                                this.prizeSelector.yellowBmw['bet']= 0;
                                this.prizeSelector.redAudi['bet']= 0;
                                this.prizeSelector.greenAudi['bet']= 0;
                                this.prizeSelector.yellowAudi['bet']= 0;
                                this.prizeSelector.redVm['bet']= 0;
                                this.prizeSelector.greenVm['bet']= 0;
                                this.prizeSelector.yellowVm['bet']= 0;
                                this.totalBet= 0;
                                if(tableInfo.state== 2){
                                    let restTime = tableInfo.betCountdownSeconds;
                                let totalTime = tableInfo.betCountdownSecondsTotal;
                                let restPercent = restTime * 100.00 / totalTime;
                                restPercent = parseInt(restPercent);
                                restPercent = 100 - restPercent;
                                this.restTime = restTime;
                                this.restPercent = restPercent;
                                this.restClass = '#2d8cf0'
                                }
                                if(tableInfo.state== 3){
                                    this.requestInBetStateCount= 0;//清空
                                }
                                if(tableInfo.state== 2&& this.requestInBetStateCount== 0){
                                    this.requestInBetStateCount++;
                                     this.prizeFlag= 0
                                    if(this.prizeKey!= null){
                                        this.changePrizeSelect(false, this.prizeKey);
                                    }
                                    this.prizeKey= null;
                                }
                        this.playerNum= tableInfo.playCount;
                        this.betPlayerNum= tableInfo.betPlayerCount;
                        let players = tableInfo.players;
                        for (let index = 0; index < players.length; index++) {
                            let player = players[index];
                            let playerInfo = {};
                            let totalBet = player.bets[0] + player.bets[1] + player.bets[2] + player.bets[3] + player.bets[4]
                                + player.bets[5] + player.bets[6] + player.bets[7] + player.bets[8] +
                                player.bets[9] + player.bets[10] + player.bets[11];
                            playerInfo['userId'] = player.userId;
                            playerInfo['userName'] = player.userName;
                            playerInfo['red-benz'] = player.bets[0];
                            this.prizeSelector.redBenz['bet']+= player.bets[0];
                            playerInfo['green-benz'] = player.bets[1];
                            this.prizeSelector.greenBenz['bet']+= player.bets[1];
                            playerInfo['yellow-benz'] = player.bets[2];
                            this.prizeSelector.yellowBenz['bet']+= player.bets[2];
                            playerInfo['red-bmw'] = player.bets[3];
                            this.prizeSelector.redBmw['bet']+= player.bets[3];
                            playerInfo['green-bmw'] = player.bets[4];
                            this.prizeSelector.greenBmw['bet']+= player.bets[4];
                            playerInfo['yellow-bmw'] = player.bets[5];
                            this.prizeSelector.yellowBmw['bet']+= player.bets[5];
                            playerInfo['red-audi'] = player.bets[6];
                            this.prizeSelector.redAudi['bet']+= player.bets[6];
                            playerInfo['green-audi'] = player.bets[7];
                            this.prizeSelector.greenAudi['bet']+= player.bets[7];
                            playerInfo['yellow-audi'] = player.bets[8];
                            this.prizeSelector.yellowAudi['bet']+= player.bets[8];
                            playerInfo['red-vm'] = player.bets[9];
                            this.prizeSelector.redVm['bet']+= player.bets[9];
                            playerInfo['green-vm'] = player.bets[10];
                            this.prizeSelector.greenVm['bet']+= player.bets[10];
                            playerInfo['yellow-vm'] = player.bets[11];
                            this.prizeSelector.yellowVm['bet']+= player.bets[11];
                            playerInfo['totalBet'] = totalBet;
                            this.totalBet+= totalBet;
                            this.betPlayerInfos.push(playerInfo);
                         }
                        }else {
                               
                        }
                    } 
                });
                if (this.timer4enterTable == null) {
                    let timer4enterTable = setInterval(this.enterTable, 1000);
                    this.timer4enterTable = timer4enterTable;
                }
            },
            getTableInfo() {
                this.tableInfos.length = 0;
                var url = api.URL.Mingche_Online_Table_List(this.pageNum, this.pageSize);
                api.getData(this, url, (data) => {
                    let datas = data.datas;
                    for (let index = 0; index < datas.length; index++) {
                        let tableInfo = datas[index];
                        this.tableInfos.push(tableInfo);
                    }
                });
            }
        },
        mounted() {
        }
    }
</script>
