import Vue from 'vue';
import iView from 'iview';
import { sync } from 'vuex-router-sync';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';

Vue.use(VueI18n);
Vue.use(iView);
const unsync = sync(store, router)

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    watch: {
        '$store.getters.isLogin': function () {
            var isLogin = this.$store.getters.isLogin
            console.log('登录状态变化: ' + isLogin)
            if (!isLogin) {
                this.$router.push('/login')
            }
        }
    },
    mounted () {
        console.log('app mount')

        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        console.log('app created')

        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
        this.$store.commit('start')
        this.$router.push('/auth')
    },
    destroyed () {
        console.log('app destroyed')

        unsync()
    }
});
