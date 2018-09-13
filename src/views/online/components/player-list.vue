<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Table :columns="columnList"  :data="dataList" size="small" ></Table>
        </Row>

    </div>
</template>

<script>
export default {
    name: 'player-list',
    props: {
        columnList: {
            type: Array
        },
        dataList: {
            type: Array,
            default: []
        }
    },

    created () {
        console.log('player list created')
    },

    methods: {
    }
};
</script>
