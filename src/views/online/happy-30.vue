<template>
    <player-list :columnList="columns" :dataList="players"></player-list>
</template>

<script>
    import { columnsPlayer, playerInfoList } from './data/define.js';

    import playerList from './components/player-list.vue'
    export default {
        components: {
            playerList
        },
        data () {
            return {
                columns: columnsPlayer,
                players: []
            }
        },

        created () {
            this.getPlayers()
        },

        methods: {
            getPlayers () {
                this.players = playerInfoList
            }
        }
    }
</script>