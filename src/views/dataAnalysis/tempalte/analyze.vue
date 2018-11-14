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
    name: "anaiyze",
    props: {
        url:{
            type: String,
            default: ""
        }
    },
    data (){
        return {
            columns1:[
                {
                    title: '日期',
                    key: 'date'
                },
                {
                    title: '新增玩家数',
                    key: "add"
                },
                {
                    title: '次日留存',
                    key: 'keep'
                },
                {
                    title: '3日留存',
                    key: 'three'
                },
                {
                    title: '4日留存',
                    key: 'four'
                },
                {
                    title: '5日留存',
                    key: 'five'
                },
                {
                    title: '6日留存',
                    key: 'six'
                },
                {
                    title: '7日留存',
                    key: 'seven'
                },
                {
                    title: '14日留存',
                    key: 'fourteen'
                },
                {
                    title: '30日留存',
                    key: 'thirty'
                }
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
