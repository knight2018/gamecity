<template>
    <div>
        <Row class="good">
            <Col span="8" class="col-list" :class="{background:mingpai}" @click.native="handleMingPai">明牌抢庄</Col>
            <Col span="8" class="col-list" :class="{background:doudizhu}" @click.native="handleDouDiZhu">二人斗地主</Col>
            <Col span="8" class="col-list" :class="{background:fish}" @click.native="handleFish">深海狩猎</Col>
        </Row>
        <div class="relative">
            <div class="win">
                个人胜率：
                <InputNumber
                :max="100"
                :min="0"
                v-model="win"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                @on-blur="handleWin"></InputNumber>
                1%~100%
            </div>
            <div class="win">
                执行输赢：
                <InputNumber :step="100" v-model="execute" @on-blur="handleExecute"> </InputNumber>
                输的前面加“-”
            </div>
        </div>
    </div>
</template>
<style scoped>
    .good{
        border-bottom: 1px solid #959595;
    }
    .col-list{
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        border-right: 1px solid #6a6a6a;
    }
    .col-list:last-child{
        border: none;
    }
    .background{
        background-color: #666666;
        color: white;
    }
    .relative{
        position: relative;
        height: 50px
    }
    .win{
        position: absolute;
        left: 50%;
        margin-left: -100px;
    }
    .win:first-child{
        top: 10px;
    }
   .win:last-child{
       top: 50px;
   }
</style>
<script>
import get_this from '../../../libs/get_this';
import api from '../../../net/api.js'
    export default{
        name: 'searchMonitor',
        data () {
            return {
                mingpai: true,
                doudizhu: false,
                fish: false,
                win: 0,
                execute: 0,
            }
        },
        methods: {
            handleMingPai (){
                console.log(1)
                this.mingpai = true;
                this.doudizhu = false;
                this.fish  = false;
                this.win = get_this.col.params.data1[0].winLossRate;
                this.execute = get_this.col.params.data1[0].executeWinLoss;
                get_this.col.url = api.URL.MingPai_Update_Player_Winloss;
            },
            handleDouDiZhu (){
                console.log(2)
                this.doudizhu = true;
                this.fish  = false;
                this.mingpai = false;
                this.win = get_this.col.params.data1[0].winLossRate;
                this.execute = get_this.col.params.data1[0].executeWinLoss;
                get_this.col.url = api.URL.DouDiZhu_Update_Player_Winloss;
            },
            handleFish(){
                console.log(3)
                let g = get_this.col;
                this.doudizhu = false;
                this.fish  = true;
                this.mingpai = false;
                get_this.col.url = api.URL.Fishing_Update_Monitor(g.userId,g.executeWinLoss,g.rewardRate)
            },
            handleWin(val){
                if(this.fish){
                    get_this.col.rewardRate = val;
                }else{
                    get_this.col.winLossRate = val;
                }
                
            },
            handleExecute (val){
                if(this.fish){
                    get_this.col.executeWinLoss = val
                }else{
                    get_this.col.winLoss = val
                }
                
            }
        }
    }
</script>