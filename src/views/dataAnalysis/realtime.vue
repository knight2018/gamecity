<template>
    <div>
        <Table 
        :columns="columns"
        :data="data"></Table>
        <DatePicker 
        type="date" 
        placeholder="请选择日期" 
        style="width: 200px"
        :options="dateOption"></DatePicker>
         <Button>清空</Button>
        <div ref="dom" style="width:100%;height:600px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    data (){
        return {
            columns:[
                {
                    title: '当前时间',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '今日',
                    align: 'center',
                    children: [
                        {
                            title: '新增用户',
                            key: 'added',
                            align: 'center',
                        },
                        {
                            title: '活跃用户',
                            key: 'active',
                            align: 'center',
                        },
                        {
                            title: '充值总额',
                            key: 'total',
                            align: 'center',
                        }
                    ]
                },
                {
                    title: '本周',
                    align: 'center',
                    children: [
                        {
                            title: '新增用户',
                            key: 'added',
                            align: 'center',
                        },
                        {
                            title: '活跃用户',
                            key: 'active',
                            align: 'center',
                        },
                        {
                            title: '充值总额',
                            key: 'total',
                            align: 'center',
                        }
                    ]
                },
                {
                    title: '本月',
                    align: 'center',
                    children: [
                        {
                            title: '新增用户',
                            key: 'added',
                            align: 'center',
                        },
                        {
                            title: '活跃用户',
                            key: 'active',
                            align: 'center',
                        },
                        {
                            title: '充值总额',
                            key: 'total',
                            align: 'center',
                        }
                    ]
                }
                
            ],
            data: [],
            options: {
                title: {
                    text: '实时在线'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['昨日','今日']
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
                        name:'昨日',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210,20,2000]
                    },
                    {
                        name:'今日',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310,500,1000]
                    },
                    
                ]
                },
                dateOption: {
                    disabledDate (date) {
                        return date && date.valueOf() >= Date.now();
                    }
                }
            }
            
    },
    methods: {
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
    created() {
        
    },
    beforeCreate () {
        
    }
}
</script>

<style>

</style>
