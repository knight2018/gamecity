import Cookies from 'js-cookie';
import permissions from '../../libs/permissions'
const user = {
    state: {
        accountInfo: null,
        isAuth: false
    },
    getters: {
        isLogin: state => {
            return state.accountInfo !== null
        }
    },
    mutations: {
        auth (state, accountInfo) {
            state.isAuth = true
            if (accountInfo !== null && accountInfo !== undefined) {
                this.commit('login', accountInfo)
            }
        },
        login (state, accountInfo) {
            console.log('用户登录')
            console.log(accountInfo)
            this.commit('setAvator', accountInfo.header);
            Cookies.set('user', accountInfo.name);
            Cookies.set('password', 'this.form.password');
            if (accountInfo.role === 0) {
                Cookies.set('access', 0);
            } else {
                Cookies.set('access', 1);
            }
            if (accountInfo.permissions !== undefined && accountInfo.permissions !== null) {
                var ps = {}
                if (permissions.hasLevel(accountInfo.permissions, permissions.all.GOD.id)) {
                    for (const key in permissions.all) {
                        if (permissions.all.hasOwnProperty(key)) {
                            const p = permissions.all[key];
                            ps[p.id.toString()] = permissions.LEVEL.Operate
                        }
                    }
                    accountInfo.permissions = ps
                } else {
                    for (const x in permissions.all) {
                        if (permissions.all.hasOwnProperty(x)) {
                            const item = permissions.all[x];
                            var level = permissions.getLevel(accountInfo.permissions, item.id)
                            ps[item.id.toString()] = level
                        }
                    }
                }
            }
            state.accountInfo = accountInfo
            
            // this._vm.$router.push({
            //     name: '/home'
            // });
        },
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }

            state.accountInfo = null
            // this._vm.$router.push({
            //     name: '/login'
            // });
        },
        expired (state, vm) {
            console.log('登录超时')
            // 会话超时
            this.commit('logout', vm)
        }
    }
};

export default user;
