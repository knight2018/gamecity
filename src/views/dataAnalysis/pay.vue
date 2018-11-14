<template>
    <div>
         <DatePicker type="daterange" 
         placement="bottom-start" 
         placeholder="Select date" 
         style="width: 200px; "
         :options="options1"
         @on-change="handleDate"></DatePicker>
         <Table 
         :columns="columns1" 
         :data="data1"></Table>
         <Page 
         :total="total" 
         @on-change="handlePage"></Page>
    </div>
</template>

<script>
export default {
    data (){
        return {
            columns1:[
                {
                    title: '日期',
                    key: 'date'
                },
                {
                    title: '新增用户数',
                    key: "add"
                },
                {
                    title: '充值人数',
                    key: 'keep'
                },
                {
                    title: '充值订单数',
                    key: 'three'
                },
                {
                    title: '充值总额',
                    key: 'four'
                },
                {
                    title: '活跃付费率',
                    key: 'five'
                },
                {
                    title: 'ARPU',
                    key: 'six'
                },
                {
                    title: 'ARPPU',
                    key: 'seven'
                },
            ],
            data1:[],
            total: 0,
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
            }
        }
    },
    methods: {
        handlePage (index){
            console.log(index)
        },
        handleDate (date){
            
            console.log(date)
        }
    }
}
</script>

<style scoped>

</style>
