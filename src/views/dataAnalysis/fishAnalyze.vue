<template>
    <analyze v-bind="url"></analyze>
</template>

<script>
import analyze from './tempalte/analyze'
export default {
    components: {analyze},
    data (){
        return {
            url: ""
        }
    }
}
</script>

<style>

</style>
