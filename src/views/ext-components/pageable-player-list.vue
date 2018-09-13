<style lang="less" scoped>
    @import '../../styles/table.less';
    @import url('../../styles/common.less');
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Table :columns="cpColumnList"  :data="cpDataList" size="small" @on-sort-change="sortTo"></Table>
            <Page :total="cpTotalSize" :current="cpCurrentPage" :page-size="cpPageSize" @on-change="pageTo"></Page>
        </Row>
    </div>
</template>

<script>
import { pageableConst } from '../ext-components/constants.js';
export default {
    name: 'pageable-table-list',
    props: {
        params: {
            type: Object,
            default(){
                return {
                    columnList: [],
                    dataList: [],
                    totalSize: pageableConst.totalSize,
                    currentPage: pageableConst.currentPage,
                    pageSize: pageableConst.pageSize,
                    currentSize: pageableConst.currentSize,
                    orderByDesc: true,
                    orderByField: null,//需要覆盖
                    pageTo: function(){
                        alert("需要覆盖的方法");
                    },
                    sortTo: function(){
                        alert("需要覆盖的方法");
                    }
                };
            }
        }
    },

    created () {
        console.log('player-control-pageable-player-list')
    },
    computed:{
        cpTotalSize(){
            return this.params.totalSize;
        },
        cpCurrentPage(){
            return this.params.currentPage;
        },
        cpPageSize(){
            return this.params.pageSize;
        },
        cpColumnList(){
            return this.params.columnList; 
        },
        cpDataList(){
            return this.params.dataList;
        }
    },
    methods: {
        pageTo(currentPage){
            this.params.currentPage= currentPage;
            this.params.pageTo();
        },
        sortTo(params){
            if(params.order=== 'desc'){
                this.params.orderByDesc= true;
            }else {
                this.params.orderByDesc= false;
            }
            this.params.orderByField= params.key;
            this.params.sortTo();
        }
    }
};
</script>
