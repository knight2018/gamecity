import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    // console.log('beforeEach: ' + to.path)
    // console.log(to)
    // console.log(router)

    if (router.app.$store !== undefined) {
        var isAuth = router.app.$store.state.user.isAuth
        if (!isAuth) {
            if (to.path !== '/auth') {
                next('/auth')
                return
            }
            next()
            return
        }
        // next('/login')
        // console.log(router.app.$store)
        
        var isLogin = router.app.$store.getters.isLogin
        if (!isLogin) {
            console.log('未验证')
            if (to.path === '/login') {
                next()
                return
            }
            next('/login')
            return
        } else {
            if (to.path === '/login') {
                next('/home')
                return
            }
            next()
        }
    } else {
        console.log('第一次加载 ')
        return
        if (to.path !== '/auth') {
            next('/auth')
            return
        }

        // if (to.path === '/login') {
        //     next()
        //     return
        // }
        // next('/login')
        next()
    }
    // if (!to.meta.auth) {
    //     next()
    //     return
    // }
    // /**  是否验证过 */
    // if (!session.isAuth) {
    //     next('/')
    //     return
    // }
    // if (!session.isLogined) {
    //     next('/login')
    // } else {
    //     next()
    // }

    // if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
    //     next({
    //         replace: true,
    //         name: 'locking'
    //     });
    // } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    //     next(false);
    // } else {
    //     if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    //         next({
    //             name: 'login'
    //         });
    //     } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    //         Util.title();
    //         next({
    //             name: 'home_index'
    //         });
    //     } else {
    //         const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
    //         if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
    //             if (curRouterObj.access === parseInt(Cookies.get('access'))) {
    //                 Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
    //             } else {
    //                 next({
    //                     replace: true,
    //                     name: 'error-403'
    //                 });
    //             }
    //         } else { // 没有配置权限的路由, 直接通过
    //             Util.toDefaultPage([...routers], to.name, router, next);
    //         }
    //     }
    // }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
