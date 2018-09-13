<template>
    <div>
        <Card>
            庄家:
            <Input v-model="bankerCards[0]" placeholder="庄家牌1" style="width: 300px"></Input>
            <Input v-model="bankerCards[1]" placeholder="庄家牌2" style="width: 300px"></Input>
            <Input v-model="bankerCards[2]" placeholder="庄家牌3" style="width: 300px"></Input>
        </Card>
        
        <Card>
            闲家:
            <Input v-model="playerCards[0]" placeholder="闲家牌1" style="width: 300px"></Input>
            <Input v-model="playerCards[1]" placeholder="闲家牌2" style="width: 300px"></Input>
            <Input v-model="playerCards[2]" placeholder="闲家牌3" style="width: 300px"></Input>
        </Card>
        <br />
        <br />
        <div style="text-align:center">
               <Button type="primary" size="large" @click="setCards">确定</Button>
        </div>
        <br />
        <hr>
        <br />
        <div style="font-size:16px">

            <Row>
                <Col span="4">
                    <p>
黑桃A => 17<br />
红桃A => 33<br />
梅花A => 65<br />
方块A => 129<br />
黑桃2 => 18<br />
红桃2 => 34<br />
梅花2 => 66<br />
方块2 => 130<br />
黑桃3 => 19<br />
红桃3 => 35<br />
梅花3 => 67<br />
方块3 => 131<br />
黑桃4 => 20<br />
红桃4 => 36<br />
梅花4 => 68<br />
方块4 => 132<br />
黑桃5 => 21<br />
红桃5 => 37<br />
梅花5 => 69<br />
方块5 => 133<br />

                    </p>
                </Col>
                <Col span="4">
                <p>
            黑桃6 => 22<br />
红桃6 => 38<br />
梅花6 => 70<br />
方块6 => 134<br />
黑桃7 => 23<br />
红桃7 => 39<br />
梅花7 => 71<br />
方块7 => 135<br />
黑桃8 => 24<br />
红桃8 => 40<br />
梅花8 => 72<br />
方块8 => 136<br />
黑桃9 => 25<br />
红桃9 => 41<br />
梅花9 => 73<br />
方块9 => 137<br />
黑桃10 => 26<br />
红桃10 => 42<br />
梅花10 => 74<br />
方块10 => 138<br />

           
                </p>
                </Col>
                <Col span="4">
                <p>
                     黑桃J => 27<br />
红桃J => 43<br />
梅花J => 75<br />
方块J => 139<br />
黑桃Q => 28<br />
红桃Q => 44<br />
梅花Q => 76<br />
方块Q => 140<br />
黑桃K => 29<br />
红桃K => 45<br />
梅花K => 77<br />
方块K => 141<br />
红色王 => 94<br />
黑色王 => 175
                </p>
                </Col>
            </Row>
            </div>
            
    </div>
</template>
<script>
import util from '../../libs/util';
import api from '../../net/api';
export default {
     name: 'happy-30-card-control',
     data () {
         return {
             bankerCards: [0,0,0],
             playerCards: [0,0,0]
         }
     },
     methods: {
         setCards (){
             var cards = {
                 roomId: 1,
                 bankerCards: this.bankerCards,
                 playerCards: this.playerCards
             }
             api.postData(this, api.URL.H30_SetCards, cards, data => {
                util.alert(this, '设置成功')
             });
         }
     }
}
</script>
