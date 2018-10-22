<template>
    <div>
        <Row class="border-btm">
            <Col :span="24/goodluck.length" 
                class="col-list"
                v-for="item in goodluck" 
                :key="item.id"
                :class="{background:item.boolean}"
                @click.native="handleRemove()">
                <monitorList :gameList="item" :val="val"></monitorList>
            </Col>
            
        </Row>
        <div class="relative">
            <div class="win">
                个人胜率：
                <InputNumber
                :max="100"
                :min="0"
                v-model="val.win"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                @on-blur="handleWin"></InputNumber>
                1%~100%
            </div>
            <div class="win">
                执行输赢：
                <InputNumber :step="100" v-model="val.execute" @on-blur="handleExecute"> </InputNumber>
                输的前面加“-”
            </div>
        </div>
    </div>
</template>

<script>
import monitorList from '../../../src/template/monitor/monitorList';
import get_this from '../../libs/get_this.js'
export default {
    name: "monitor-com",
    components:{
        monitorList
    },
    props: {
        goodluck:{
            type: Array,
            default: ()=>[] 
        },
        val:{
            type:Object,
            default: ()=>{
                return {
                    win: 0,
                    execute: 0,
                    setValueMap: null
                }
            }
        } 
    },
    
   created() {
       console.log(this)
   },
    methods: {
        handleRemove (){
            for(let i=0;i<=this.goodluck.length-1;i++){
                this.goodluck[i].boolean = false;
                
            }
            //事件捕获bug等待解决
            // let that = this;
            // function addHandle (el,type,handler){
            //     el.addEventListener(type,handler,true)
            //     console.log(2)
            // }
            // addHandle(e.target,'click',function(e){
            //     for(let i=0;i<=that.goodluck.length-1;i++){
            //         that.goodluck[i].boolean = false;
            //         console.log(e.target)
            //         }
            // })
        },
        handleWin (value){
            get_this.monitor.setUrl();
        },
        handleExecute (value){
            get_this.monitor.setUrl();
        },
    },
 
}
</script>

<style scoped>
    .border-btm{
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
        border-right: none;
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
