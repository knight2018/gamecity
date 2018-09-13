<template>
    <div>
        <div style="text-align: center" @click="enterTable">
            <Card  >
                <br />
                <p>
                    房间玩家 : {{ tableInfo.playerNum }}
                </p>
                <br />
                <p>
                    {{ getTableName() }}
                </p>
            </Card>
        </div>
        
    </div>
</template>
<script>
    import playerList from './player-list.vue'

export default {
    name: 'tableInfoView',
    components: { playerList },
    props: {
        tableInfo: Object,
    },
    data () {
        return {
        }
    },
    methods: {
        getTableName () {
            return this.tableInfo.tableId + "号桌"
        },
        enterTable () {
            this.$emit('enterTable', this.tableInfo)
        }
    }
}
</script>
