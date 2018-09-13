<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row>
                <Input v-model="searchId" placeholder="请输入姓名搜搜..." style="width: 200px" />
                <span @click="search" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
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
import { orderColumns } from './define.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            searchId: '',
            searchStartDate: '',
            searchEndDate: '',
            tableColumns: orderColumns,
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
        console.log('order list created')
    },
    mounted () {
    }
};
</script>
