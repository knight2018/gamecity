<template>
    <Row>
        <Col class="float">
            <span>多日期选择器：</span>
            <DatePicker 
            :value="dateVal.vals"
            type="daterange" 
            placement="bottom-end" 
            :options="option" 
            placeholder="日期多项选择器"
            format="yyyy-MM-dd"
            @on-change="handleDates"></DatePicker>
        </Col>
        <Col class="float">
            <span>单日期选择器：</span>
            <DatePicker
            :value="dateVal.val" 
            type="date" 
            placement="bottom-end" 
            :options="option" 
            placeholder="日期单项选择器"
            format="yyyy-MM-dd"
            @on-change="handleDate"></DatePicker>
        </Col>
        
    </Row>
</template>

<script>
import {mapActions} from "vuex";
export default {
    name: "dataOption",
    props:{
        dateVal:{
            type: Object,
            default: ()=>{}
        }
    },
    data (){
        return {
            option: {
                shortcuts:[
                    {
                        text: "Today",
                        value(){
                            return new Date();
                        }
                    }
                ],
                disabledDate (date){
                    return date&&date.valueOf() > Date.now();
                }
            }
        }
    },
    created() {
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        this.dateVal.val = `${year}-${month}-${day}`
        console.log(this.dateVal.val)
    },
    methods:{
        handleDates (date){
            setTimeout(()=>{this.dateVal.vals = date;},100);
            console.log(this.dateVal.vals)
            console.log(this.dateVal.val)
            this.dateVal.val = "";
        },
        handleDate (date){
            this.dateVal.vals = [];
            setTimeout(()=>{this.dateVal.val = date;},100)   
            console.log(this.dateVal.val)
            console.log(this.dateVal.vals)
           
        },
        ...mapActions("market",['userLogin'])
    }
}
</script>

<style>
    .float{
        float: right;
        margin-right: 100px;
    }
</style>
