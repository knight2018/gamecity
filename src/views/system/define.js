
export const userColumns = [
    {
        'title': '昵称',
        'key': 'userName',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '玩家Id',
        'key': 'userId',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '携带金币',
        'key': 'coin',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '赠送金币',
        'key': 'totalTransCoin',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '接收金币',
        'key': 'totalRecvCoin',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '注册',
        'key': 'createTime',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '最后登录',
        'key': 'loginTime',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '累计充值(元)',
        'key': 'totalCharge',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': '登录地址',
        'key': 'loginAddress',
        'sortable': 'custom',
        'width': 105
    },
    {
        'title': 'IP',
        'key': 'ip',
        'sortable': false,
        'width': 105
    },
    {
        'title': '手机',
        'key': 'phone',
        'sortable': false,
        'width': 105
    },
    {
        'title': '在线状态',
        'key': 'onlineState',
        'sortable': false
    },
    {
        'title': '渠道',
        'key': 'channel',
        'sortable': false
    },
    {
        'title': '备注',
        'key': 'remark',
        'sortable': false
    },
    {
        'title': '账号状态',
        'key': 'state',
        'sortable': false
    },
    {
        'title': '操作',
        'key': 'operate',
        'sortable': false
    }
];

export const mailColumns = [
    {
        'title': '编号',
        'key': 'id',
        'sortable': true
    },
    {
        'title': '发送对象',
        'key': 'target',
        'sortable': true
    },
    {
        'title': '发放物品',
        'key': 'items',
        'sortable': true
    },
    {
        'title': '操作员',
        'key': 'operator',
        'sortable': true
    },
    {
        'title': '状态',
        'key': 'state',
        'sortable': true
    },
    {
        'title': '邮件描述',
        'key': 'content',
        'sortable': true
    },
    {
        'title': '备注',
        'key': 'remark',
        'sortable': true
    },
    {
        'title': '发放时间',
        'key': 'time',
        'sortable': true
    },
    {
        'title': '操作',
        'key': 'operate',
        'sortable': true
    }
]

export const opsLogColumns = [
    {
        'title': '操作员',
        'key': 'operateName',
        'sortable': 'custom'
    },
    {
        'title': '玩家ID',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '玩家昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '操作记录',
        'key': 'record',
        'sortable': 'custom'
    },
    {
        'title': '游戏',
        'key': 'recordType',
        'sortable': 'custom'
    },
    {
        'title': '时间',
        'key': 'createTime',
        'sortable': 'custom'
    }
];

export const feedbackColumns = [
    {
        'title': '编号',
        'key': 'id',
        'sortable': 'custom'
    },
    {
        'title': '玩家ID',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '玩家昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '反馈信息',
        'key': 'content',
        'sortable': 'custom'
    },
    {
        'title': '操作',
        'key': 'state',
        'sortable': 'custom'
    },
    {
        'title': '时间',
        'key': 'createTime',
        'sortable': 'custom'
    }
];

export const recordInfoColumns = [
    {
        'title': '玩家ID',
        'key': 'userId'
    },
    {
        'title': '玩家昵称',
        'key': 'nickName'
    },
    {
        'title': '游戏名称',
        'key': 'gameDesc'
    },
    {
        'title': '对战信息',
        'key': 'msg'
    },
    {
        'title': '时间',
        'key': 'createTime'
    }
];

export const loginLogListColumns = [
    {
        'title': '玩家ID/管理员账号',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'gameDesc'
    },
    {
        'title': '登录IP',
        'key': 'ip'
    },
    {
        'title': '登录时间',
        'key': 'createTime',
        'sortable': 'custom'
    }
];

export const recordInfoGameIdMap = [
    {
        'gameId': 30000,
        'label': '百人牛牛'
    },
    {
        'gameId': 30001,
        'label': '明牌抢庄'
    },
    {
        'gameId': 30002,
        'label': '快乐30秒'
    },
    {
        'gameId': 30003,
        'label': '斗地主'
    },
    {
        'gameId': 30004,
        'label': '水浒传'
    },
    {
        'gameId': 30005,
        'label': '连环夺宝'
    },
    {
        'gameId': 30006,
        'label': '深海捕鱼'
    },
    {
        'gameId': 30007,
        'label': '名车汇'
    }
];
