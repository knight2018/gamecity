<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
       
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="tableColumns" :data="tableData"></Table>
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
import { rankColumns } from './define.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: rankColumns,
            tableData: []
        };
    },
    methods: {
    },
    created () {
        console.log('order list created')
    },
    mounted () {
    }
};
</script>
