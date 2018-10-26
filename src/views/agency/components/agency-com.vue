<template>
    <Table 
    :columns="columnsList"
    :data="dataList"></Table>
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
        }
    },
}
</script>

<style>

</style>
