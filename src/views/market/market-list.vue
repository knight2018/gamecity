<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
    .colorRed{
        color: red
    }
    #myChart{
        width: 400px;
        height: 400px;
    }
</style>

<template>
    <div>
        <Row class="margin-top-10 searchable-table-con1">
            <dateOption :dateVal="dateVal"></dateOption>
            <Table :columns="tableColumns" :data="tableData" :footer="10"></Table>
            <Page :total="dataTotal" :page-size="20" show-elevator @on-change="handlePage"></Page>
            <div id="myChart" ref="myChart"></div>
        </Row>
    </div>
</template>

<script>
import { marketColumns } from './define.js';
import api from "../../net/api.js"
import dateOption from "../../template/dateOption/dateOption"
import {mapActions} from 'vuex';
import echarts from 'echarts';



export default {
    name: 'searchable-table',
    components: {dateOption},
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: marketColumns,
            tableData: [],
            postInterval: null,
            dataTotal: 0,
            dateVal:{
                val: "",
                vals: []
            },
            option:{
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        }
    },
    methods: {
        changePage (index){
            if(index == 2){
                this.tableData = [];
            }
        },
        handlePage(index){
            console.log(index)
            this.changePage(index)
        },
        postData (){
            let url,data;
            console.log(1);
        // api.postData(this,url,data,(data)=>{
        //     console.log(data);
        // })
        },
        ...mapActions(['test']),
        initEcharts (){
            let dom = this.$refs.myChart;
            this.chart = echarts.init(dom);
        },
        drawEcharts (){
            this.chart.setOption(this.option);
        }
    },
    created () {
        
        this.test('传值成功')
        this.postData();
        this.postInterval = setInterval(this.postData,60000)
    },
    mounted () {
        this.initEcharts();
        this.drawEcharts();
    },
    beforeDestroy() {
        console.log('beforeDestroy')
        console.log(this.postInterval)
        if(this.postInterval !== null){
            clearInterval(this.postInterval);
            console.log('zhixingle');
        }
    },
};
</script>
