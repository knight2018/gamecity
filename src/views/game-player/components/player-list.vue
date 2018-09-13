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
    name: 'game-control-player-list',
    props: {
        columnList: Array,
        dataList: {
            type: Array,
            default: []
        }
    },

    created () {
        console.log('game-control-player-list created')
    },

    methods: {
    }
};
</script>
