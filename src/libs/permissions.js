let permissions = {}

// 权限等级
permissions.LEVEL = {
    None: 0,
    View: 1,
    Operate: 2
}

permissions.getLevel = function (permissionLevels, permissionId) {
    if (permissionLevels === undefined || permissionLevels === null) {
        return false
    }
    var level = permissionLevels[permissionId.toString()]
    if (level === undefined || level === null) {
        return this.LEVEL.None
    }
    return level
}

// 是否拥有权限
permissions.hasLevel = function (permissionLevels, permissionId) {
    var level = this.getLevel(permissionLevels, permissionId)
    return level === this.LEVEL.View || level === this.LEVEL.Operate
}

// 是否拥有查看权限
permissions.canView = function (permissionLevels, permissionId) {
    return this.hasLevel(permissionLevels, permissionId)
}

// 是否拥有操作权限
permissions.canOperate = function (permissionLevels, permissionId) {
    var level = this.getLevel(permissionLevels, permissionId)
    return level === this.LEVEL.Operate
}

permissions.all = {
    GOD: { id: 2147483647, desc: '所有权限' },
    ONLINE: { id: 1100, desc: '在线玩家' },
    GAME_CONTROL: { id: 1200, desc: '游戏控制' },
    ORDER: { id: 1300, desc: '订单详情' },
    FORTUNE: { id: 1400, desc: '财富日志' },
    SYSTEM: { id: 1500, desc: '系统操作' },
    BROADCAST: { id: 1600, desc: '广播管理' },
    ACTIVITY: { id: 1700, desc: '活动管理' },
    RANK: { id: 1800, desc: '排行总表' },
    STOCK: { id: 1900, desc: '库存查询' },
    MARKET: { id: 2000, desc: '推广渠道' },
    ACCOUNT: { id: 2100, desc: '账号管理' },
    AGENT: { id: 2200, desc: '代理管理' },
    ANALYSIS: { id: 2300, desc: '数据分析' },
    PLAYER_CONTROL: { id: 2400, desc: '个人控制' },

    // -------------------- 在线玩家 -----------------------
    ONLINE_NIU100: { id: 1101, desc: '百人牛牛' },
    ONLINE_MPQZ: { id: 1102, desc: '名牌抢庄' },
    ONLINE_H30: { id: 1103, desc: '快乐30' },
    ONLINE_CAR: { id: 1104, desc: '名车汇' },
    ONLINE_DDZ: { id: 1105, desc: '二人斗地主' },
    ONLINE_FISH: { id: 1106, desc: '深海狩猎' },
    ONLINE_REMARK: { id: 1107, desc: '备注' },

    // -------------------- 游戏 -----------------------
    GAME_CONTROL_NIU100: { id: 1201, desc: '百人牛牛' },
    GAME_CONTROL_H30: { id: 1202, desc: '快乐30' },
    GAME_CONTROL_CAR: { id: 1203, desc: '名车汇' },
    GAME_CONTROL_Dou2: { id: 1204, desc: '二人斗地主' },
    GAME_CONTROL_Mingche: { id: 1205, desc: '名车汇' },

    // -------------------- 个人 -----------------------
    PLAYER_CONTROL_MPQZ: { id: 2401, desc: '名牌抢庄' },
    PLAYER_CONTROL_DDZ: { id: 2402, desc: '二人斗地主' },
    PLAYER_CONTROL_FISH: { id: 2403, desc: '深海狩猎' },
    PLAYER_CONTROL_REMARK: { id: 2404, desc: '备注' },
    PLAYER_CONTROL_SEARCH: { id: 2405, desc: '搜索' },
    PLAYER_CONTROL_NIUNIU100: { id: 2406, desc: '百人牛牛' },
    PLAYER_CONTROL_KUAILE30: { id: 2407, desc: '快乐30' },
    PLAYER_CONTROL_MINGCHE: { id: 2408, desc: '名车汇' },

    // -------------------- 订单 -----------------------

    // -------------------- 财富 -----------------------
    // -------------------- 系统 -----------------------
    SYSTEM_USER_LIST: { id: 1501, desc: '在线玩家' },
    SYSTEM_SEND_MAIL: { id: 1502, desc: '发送邮件' },
    SYSTEM_OPERATION_LOG: { id: 1503, desc: '操作记录' },
    SYSTEM_GAME_RECORD: { id: 1504, desc: '战绩查询' },
    SYSTEM_LOGIN_LOG: { id: 1505, desc: '登录查询' },
    SYSTEM_FEEDBACK: { id: 1506, desc: '玩家反馈' },

    // -------------------- 广播 -----------------------

    // -------------------- 活动 -----------------------
    ACTIVITY_POP: { id: 1701, desc: '精彩活动' },
    ACTIVITY_NOTICE: { id: 1702, desc: '游戏公告' },

    // -------------------- 排行 -----------------------

    // -------------------- 库存 -----------------------
    STOCK_INFO: { id: 1901, desc: '库存详情' },
    STOCK_MPQZ: { id: 1902, desc: '名牌抢庄' },
    STOCK_DOUDIZHU: { id: 1903, desc: '二人斗地主' },

    // -------------------- 渠道 -----------------------

    // -------------------- 账号 -----------------------

    // -------------------- 代理 -----------------------

    // -------------------- 数据分析 -----------------------
    ANALYSIS_REALTIME: { id: 2301, desc: '实时数据' },
    ANALYSIS_NEW_USER: { id: 2302, desc: '新增玩家' },
    ANALYSIS_ACTIVE_USER: { id: 2303, desc: '活跃玩家' },
    ANALYSIS_PAY_INFO: { id: 2304, desc: '付费分析' },
    ANALYSIS_STAY_INFO: { id: 2305, desc: '留存分析(总)' },
    ANALYSIS_STAY_INFO_NIU100: { id: 2306, desc: '百人大战留存分析' },
    ANALYSIS_STAY_INFO_MPQZ: { id: 2307, desc: '名牌抢庄留存分析' },
    ANALYSIS_STAY_INFO_H30: { id: 2308, desc: '快乐30留存分析' },
    ANALYSIS_STAY_INFO_DOUDIZHU: { id: 2309, desc: '斗地主留存分析' },
    ANALYSIS_STAY_INFO_CAR: { id: 2310, desc: '名车汇留存分析' },
    ANALYSIS_STAY_INFO_FISH: { id: 2311, desc: '深海狩猎留存分析' }
}

export default permissions;
