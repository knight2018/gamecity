<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10 searchable-table-con1">
            <Table :columns="tableColumns" :data="tableData"></Table>
        </Row>
    </div>
</template>

<script>
import { marketColumns } from './define.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: marketColumns,
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
