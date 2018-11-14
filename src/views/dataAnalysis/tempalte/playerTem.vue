<template>
    <div>
        <DatePicker type="daterange" 
         placement="bottom-start" 
         placeholder="Select date" 
         style="width: 200px; "
         :options="options1"
         @on-change="handleDate"></DatePicker>
         <div ref="dom" style="width:100%;height:500px;"></div>
         <Table
         :columns="columns"
         :data="data"
         style="width:500px;"></Table>
         <Page :total="total"
         :page-size='5' />
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: "playerTem",
    data (){
        return {
            date: "",
            options:{
                title: {
                    text: '新增玩家情况'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:'今天'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['0:00','3:00','6:00','9:00','12:00','15:00','18:00',"21:00","24:00"]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'今天',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,20,2000]
                    },       
                ]
                
            },
            options1: {
                disabledDate (date) {
                    return date&&date.valueOf()>=Date.now();
                },
                shortcuts :[
                    {
                        text : '今天',
                        value () {
                            const start = new Date();
                            const end = new Date();
                            return [start,end]
                        }
                    },
                    {
                        text : '昨天',
                        value () {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime()-3600*1000*24)
                            return [start,end]
                        }
                    },
                    {
                        text : '近7日',
                        value () {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime()-3600*1000*24*7)
                            return [start,end]
                        }
                    },
                    {
                        text : '近30日',
                        value () {
                            const start = new Date();
                            const end = new Date();
                            start.setTime(start.getTime()-3600*1000*24*30)
                            return [start,end]
                        }
                    }
                ]
            },
            columns:[
                {
                    title: '日期',
                    key: 'date',
                    align: 'center'
                },
                {
                    title: '活跃用户',
                    key: 'activePlayer',
                    align: 'center'
                }
            ],
            data: [
                {
                    date: 1111,
                    activePlayer:2222
                },
                {
                    
                },
                {
                    
                },
                {
                    
                },
                {
                    
                }
            ],
            total: 0,
        }
    },
    methods: {
        handleDate(date){
            let setDate = "";
            date.forEach(element => {
                if(setDate){
                    if(setDate!==element){
                        setDate+='~'+element;
                    }
                }else{
                    setDate=element;
                }
            });
            console.log(setDate)
            this.options.legend.data = setDate;
            this.options.series[0].name = setDate;
            this.dom.setOption(this.options);
            
        },
        resize () {
            let dom = this.$refs.dom;
            this.dom = echarts.init(dom);
        },
        drawEcharts (){
            this.dom.setOption(this.options);
        }
    },
    mounted () {
      this.resize();
      this.drawEcharts();
      console.log(this.$refs.dom)
    },
}
</script>

<style>

</style>
