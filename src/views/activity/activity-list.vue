<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
       
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="tableColumns" :data="tableData"></Table>
            </Row>

             <Row>
            
                <span @click="add" style="margin: 0 10px;"><Button type="primary" icon="add">添加</Button></span>
        </Row>
       <!-- <Card>
            <p slot="title">
                <Icon type="mouse"></Icon>
                点击搜索进行搜索
            </p>
            
        </Card> -->
    </div>
</template>

<script>
import { activityColumns } from './define.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: activityColumns,
            tableData: []
        };
    },
    methods: {
        add () {
        }
    },
    created () {
        console.log('order list created')
    },
    mounted () {
        
    }
};
</script>
