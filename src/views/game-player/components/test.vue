<template>
    <monitorCom :params="params">
        <gameList :params="params" slot="mingpai"> </gameList>
    </monitorCom>
</template>

<script>
import monitorCom from "../../../template/monitor/monitor-com";
import gameList from "../../../template/monitor/mingpai";
export default {

    data (){
        return {
            params:[
                {
                    id:"mingpai",
                    name:"明牌抢庄",
                    boolean: "true"
                }
            ]
        }
    }
}
</script>

<style>

</style>
