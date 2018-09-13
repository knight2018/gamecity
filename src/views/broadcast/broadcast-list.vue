<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
            
                <span @click="search" style="margin: 0 10px;"><Button type="primary" icon="add">添加</Button></span>
                <Button @click="cancel" type="ghost" >取消</Button>
        </Row>
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
import { broadcastColumns } from './define.js';
export default {
    name: 'broadcast-list',
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: broadcastColumns,
            tableData: []
        };
    },
    methods: {
        search () {
        },
        cancel () {
        }
    },
    created () {
        console.log('broadcast list created')
    },
    mounted () {
    }
};
</script>
