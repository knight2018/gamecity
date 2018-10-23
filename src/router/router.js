import Main from '@/views/Main.vue';
import permissions from '../libs/permissions';

// 不作为Main组件的子页面展示的页面单独写，如下
export const authRouter = {
    path: '/auth',
    name: 'auth',
    meta: {
        title: '自动登录'
    },
    component: () => import('@/views/auth.vue')
};
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/online',
        name: 'online',
        icon: 'social-buffer',
        title: '在线玩家',
        permissionId: permissions.all.ONLINE.id,
        component: Main,
        children: [
            {
                title: '百人大战',
                path: 'niuniu-100',
                name: 'online-niuniu-100',
                icon: 'compose',
                permissionId: permissions.all.ONLINE_NIU100.id,
                component: () => import('@/views/online/niuniu-100.vue')
            },
            {
                title: '明牌抢庄',
                path: 'ming-pai-qz',
                name: 'online-ming-pai-qz',
                icon: 'pound',
                permissionId: permissions.all.ONLINE_MPQZ.id,
                component: () => import('@/views/online/ming-pai-qz.vue')
            },
            {
                title: '快乐30秒',
                path: 'happy-30',
                name: 'online-happy-30',
                icon: 'crop',
                permissionId: permissions.all.ONLINE_H30.id,
                component: () => import('@/views/online/happy-30.vue')
            },
            {
                title: '深海狩猎',
                path: 'fishing',
                name: 'online-fishing',
                icon: 'arrow-move',
                permissionId: permissions.all.ONLINE_FISH.id,
                component: () => import('@/views/online/fish.vue')
            },
            {
                title: '名车汇',
                path: 'car',
                name: 'online-car',
                icon: 'arrow-move',
                permissionId: permissions.all.ONLINE_CAR.id,
                component: () => import('@/views/online/car.vue')
            },
            {
                title: '斗地主',
                path: 'dou-di-zhu',
                name: 'online-dou-di-zhu',
                icon: 'arrow-move',
                permissionId: permissions.all.ONLINE_DDZ.id,
                component: () => import('@/views/online/dou-di-zhu.vue')
            },
            // {
            //     title: '连环夺宝',
            //     path: 'duo-bao',
            //     name: 'online-duo-bao',
            //     icon: 'arrow-move',
            //     permissionId: permissions.all.ONLINE_DDZ.id,
            //     component: () => import('@/views/online/happy-30.vue')
            // },
            // {
            //     title: '水浒传',
            //     path: 'shui-hu-zhuan',
            //     name: 'shui-hu-zhuan',
            //     icon: 'arrow-move',
            //     permissionId: permissions.all.ONLINE_DDZ.id,
            //     component: () => import('@/views/online/happy-30.vue')
            // },
            {
                title: '备注分类',
                path: 'remark',
                name: 'remark',
                icon: 'ios-pause',
                permissionId: permissions.all.ONLINE_REMARK.id,
                component: () => import('@/views/online/happy-30.vue')
            }
        ]
    },
    {
        title: '游戏控制',
        path: '/game-control',
        name: 'game-control',
        icon: 'social-buffer',
        permissionId: permissions.all.GAME_CONTROL.id,
        component: Main,
        children: [
            {
                title: '百人大战',
                path: 'niuniu-100',
                name: 'game-control-niuniu-100',
                icon: 'compose',
                permissionId: permissions.all.GAME_CONTROL_NIU100.id,
                component: () => import('@/views/game-control/niuniu-100.vue')
            },
            {
                title: '快乐30秒',
                path: 'happy-30',
                name: 'game-control-happy-30',
                icon: 'crop',
                permissionId: permissions.all.GAME_CONTROL_H30.id,
                component: () => import('@/views/game-control/happy-30.vue')
            },
            {
                title: '名车汇',
                path: 'mingche-game-control',
                name: 'game-control-mingche',
                icon: 'crop',
                permissionId: permissions.all.GAME_CONTROL_Mingche.id,
                component: () => import('@/views/game-control/mingche.vue')
            }
        ]
    },
    {
        title: '个人控制',
        path: '/player-control',
        name: 'player-control',
        icon: 'social-buffer',
        permissionId: permissions.all.PLAYER_CONTROL.id,
        component: Main,
        children: [
            {
                title: '名牌抢庄',
                path: 'player-control-ming-pai-qz',
                name: 'player-control-ming-pai-qz',
                icon: 'compose',
                permissionId: permissions.all.PLAYER_CONTROL_MPQZ.id,
                component: () => import('@/views/game-player/ming-pai-qz.vue')
            },
             {
                title: '二人斗地主',
                path: 'player-control-2ddz',
                name: 'player-control-2ddz',
                icon: 'crop',
                permissionId: permissions.all.PLAYER_CONTROL_DDZ.id,
                component: () => import('@/views/game-player/dou-di-zhu.vue')
            },
             {
                title: '百人牛牛',
                path: 'niuniu100',
                name: 'game-control-niuniu100',
                icon: 'crop',
                permissionId: permissions.all.PLAYER_CONTROL_NIUNIU100.id,
                component: () => import('@/views/game-player/niuniu100.vue')
            },
             {
                title: '名车汇',
                path: 'player-control-mingche',
                name: 'player-control-mingche',
                icon: 'crop',
                permissionId: permissions.all.PLAYER_CONTROL_MINGCHE.id,
                component: () => import('@/views/game-player/mingche.vue')
            },
             {
                title: '深海狩猎',
                path: 'player-control-fishing',
                name: 'player-control-fishing',
                icon: 'crop',
                permissionId: permissions.all.PLAYER_CONTROL_FISH.id,
                component: () => import('@/views/game-player/fish.vue')
            },
             {
                title: '快乐30',
                path: 'kuaile30',
                name: 'game-control-kuaile30',
                icon: 'crop',
                permissionId: permissions.all.PLAYER_CONTROL_KUAILE30.id,
                component: () => import('@/views/game-player/kuaile30.vue')
            },
            {
                title: '搜索玩家',
                path: 'player-control-search',
                name: 'player-control-search',
                icon: 'crop',
                //permissionId: permissions.all.PLAYER_CONTROL_SEARCH.id,
                component: ()=> import('@/views/game-player/search.vue')
            },
            {
                title: '备注分类',
                path: 'player-control-remark',
                name: 'player-control-remark',
                icon: 'crop',
                //permissionId: permissions.all.PLAYER_CONTROL_REMARK.id,
                component: ()=> import('@/views/game-player/remark.vue')
            }
        ]
    },
    {
        title: '牌型配置',
        path: '/card-control',
        name: 'card-control',
        icon: 'social-buffer',
        component: Main,
        children: [
            {
                title: '快乐30秒',
                path: 'happy-30',
                name: 'card-control-happy-30',
                icon: 'crop',
                component: () => import('@/views/card-control/happy-30.vue')
            },
            {
                title: '名车汇',
                path: 'car-game',
                name: 'card-control-car-game',
                icon: 'crop',
                component: () => import('@/views/card-control/car-game.vue')
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        icon: 'earth',
        title: '订单详情',
        permissionId: permissions.all.ORDER.id,
        component: Main,
        children: [
            { path: 'list', title: '订单详情', name: 'order-list', component: () => import('@/views/order/order-list.vue') }
        ]
    },
    {
        path: '/asset',
        name: 'asset',
        icon: 'earth',
        title: '财富日志',
        permissionId: permissions.all.FORTUNE.id,
        component: Main,
        children: [
            { path: 'list', title: '财富日志', name: 'asset-list', component: () => import('@/views/asset/asset-list.vue') }
        ]
    },
    {
        path: '/system',
        name: 'system',
        icon: 'social-buffer',
        title: '系统操作',
        permissionId: permissions.all.SYSTEM.id,
        component: Main,
        children: [
             {
                title: '战绩查询 ',
                path: 'recordInfo-list',
                name: 'recordInfo-list',
                icon: 'pound',
                permissionId: permissions.all.SYSTEM_GAME_RECORD.id,
                component: () => import('@/views/system/recordInfo-list.vue')
            },
            {
                title: '玩家查询',
                path: 'user-list',
                name: 'user-list',
                icon: 'compose',
                permissionId: permissions.all.SYSTEM_USER_LIST.id,
                component: () => import('@/views/system/user-list.vue')
            },
            {
                title: '登录查询',
                path: 'login-log-list',
                name: 'login-log-list',
                icon: 'compose',
                permissionId: permissions.all.SYSTEM_LOGIN_LOG.id,
                component: () => import('@/views/system/login-log-list.vue')
            },
            {
                title: '发送邮件',
                path: 'mail-list',
                name: 'mail-list',
                icon: 'pound',
                permissionId: permissions.all.SYSTEM_SEND_MAIL.id,
                component: () => import('@/views/system/mail-list.vue')
            },
            {
                title: '操作记录',
                path: 'ops-log-list',
                name: 'ops-log-list',
                icon: 'crop',
                permissionId: permissions.all.SYSTEM_OPERATION_LOG.id,
                component: () => import('@/views/system/ops-log-list.vue')
            },
            {
                title: '玩家反馈',
                path: 'feedback-list',
                name: 'feedback-list',
                icon: 'arrow-move',
                permissionId: permissions.all.SYSTEM_FEEDBACK.id,
                component: () => import('@/views/system/feedback-list.vue')
            }
        ]
    },
    {
        title: '广播管理',
        path: '/broadcast',
        name: 'broadcast',
        icon: 'earth',
        permissionId: permissions.all.BROADCAST.id,
        component: Main,
        children: [
            { path: 'list', title: '广播管理', name: 'broadcast-list', component: () => import('@/views/broadcast/broadcast-list.vue') }
        ]
    },
    {
        title: '活动管理',
        path: '/activity',
        name: 'activity',
        icon: 'social-buffer',
        permissionId: permissions.all.ACTIVITY.id,
        component: Main,
        children: [
            {
                title: '精彩活动',
                path: 'activity-list',
                name: 'activity-list',
                icon: 'compose',
                permissionId: permissions.all.ACTIVITY_POP.id,
                component: () => import('@/views/activity/activity-list.vue')
            },
            {
                title: '游戏公告',
                path: 'notice-edit',
                name: 'notice-edit',
                icon: 'pound',
                permissionId: permissions.all.ACTIVITY_NOTICE.id,
                component: () => import('@/views/activity/notice-edit.vue')
            }
        ]
    },
    {
        title: '排行总表',
        path: '/rank',
        name: 'rank',
        icon: 'android-sad',
        permissionId: permissions.all.RANK.id,
        component: Main,
        children: [
            { path: 'list', title: '排行总表', name: 'rank-list', component: () => import('@/views/rank/rank-list.vue') }
        ]
    },
    {
        title: '库存查询',
        path: '/stock',
        name: 'stock',
        icon: 'android-sad',
        permissionId: permissions.all.STOCK.id,
        component: Main,
        children: [
            { path: 'all-stock-list', title: '库存详情', name: 'all-stock-list', component: () => import('@/views/stock/stock-list.vue') },
            { path: 'mpqz-stock-list', title: '明牌抢庄', name: 'mpqz-stock-list', component: () => import('@/views/stock/mpqz-stock-list.vue') },
            { path: 'ddz2-stock-list', title: '二人斗地主', name: 'ddz2-stock-list', component: () => import('@/views/stock/ddz2-stock-list.vue') }
        ]
    },
    {
        title: '推广渠道',
        path: '/market',
        name: 'market',
        icon: 'android-sad',
        permissionId: permissions.all.MARKET.id,
        component: Main,
        children: [
            { path: 'list', title: '推广渠道', name: 'market-list', component: () => import('@/views/market/market-list.vue') }
        ]
    },
    {
        title: '账号管理',
        path: '/account',
        name: 'account',
        icon: 'android-checkbox',
        permissionId: permissions.all.ACCOUNT.id,
        component: Main,
        children: [
            { path: 'list', title: '账号管理', name: 'account-list', icon: 'compose', component: () => import('@/views/account/account-list.vue') },
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    authRouter,
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
