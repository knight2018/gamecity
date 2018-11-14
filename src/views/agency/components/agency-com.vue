<template>
    <div>
        <Table 
        :columns="columnsList"
        :data="dataList"
        @on-sort-change='sortTo'></Table>
        <Page :total='total' @on-change="pageTo"></Page>
    </div>
</template>

<script>
export default {
    name:"agencyCom",
    props:{
        columnsList:{
            type: Array,
            default: ()=>[]
        },
        dataList:{
            type: Array,
            default: ()=>[]
        },
        total:{
            type: Number,
            default: 0
        },
        off:{
            type: Boolean,
            default: true
        }
    },
    methods :{
        sortTo (params){
            console.log(params)
        },
        pageTo (index){
            console.log(index)
        }
    }
}
</script>

<style>

</style>
