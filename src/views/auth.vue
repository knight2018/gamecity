<template>
    
</template>
<script>
import api from '../net/api';

export default {

    created() {
        api.getData(this, api.URL.Auth, (loginInfo) => {
            this.$store.commit('auth', loginInfo)
            this.$router.push('/')
        }, (error) => {
            this.$store.commit('auth')
            this.$router.push('/login')
        })
    }
}
</script>
