import util from '../libs/util';
// import store from '../store/index';

const PF_ACCOUNT = '/account';
const PF_GAME = '/game';
const PF_GAME_CONTROL_NIU_100 = '/game-control/niu100';
const PF_GAME_CONTROL_H30 = '/game-control/h30';
const PF_GAME_CONTROL_MING_PAI = '/player-control/mpqz';
const PF_GAME_CONTROL_DOU_DI_ZHU = '/player-control/tddz';
const PF_GAME_CONTROL_MINGCHE = '/game-control/car';
const PF_GAME_CONTROL_FISHING = '/game-control/fishing';
const PF_GAME_CONTROL_SEARCH = '/game/query-online-user-by-id'
let api = {}

api.URL = {
    Auth: '/auth',
    Login: '/login',
    Logout: '/logout',

    Account_List: PF_ACCOUNT + '/list',
    Account_UpdateState: PF_ACCOUNT + '/update-state',
    Account_Add: PF_ACCOUNT + '/add',
    Account_Update: PF_ACCOUNT + '/update',
    Account_Permission: function (accountId) { return String.format('{0}/permission/{1}', PF_ACCOUNT, accountId) },

    KickUser: PF_GAME + '/kick-user',
    Niu100_TableList: PF_GAME_CONTROL_NIU_100 + '/tables',
    // Niu100_TableInfo: function (sceneId, roomId, tableId) { return String.format('{0}/table-info/{1}/{2}/{3}', PF_GAME_CONTROL_NIU_100, sceneId, roomId, tableId) },
    Niu100_TableInfo: function (sceneId, roomId, tableId, currentPage, pageSize) { return String.format('{0}/table-info?sceneId={1}&roomId={2}&tableId={3}&gameId={4}&pageNum={5}&pageSize={6}', PF_GAME_CONTROL_NIU_100, sceneId, roomId, tableId, 30000, currentPage, pageSize) },
    Niu100_Result: PF_GAME_CONTROL_NIU_100 + '/table-result',
    Niu100_PlayerList: function (currentPage, pageSize, orderByDesc, orderByField) {
        return String.format('{0}/playerInfos?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_CONTROL_NIU_100, currentPage, pageSize, orderByDesc, orderByField);
    },
    // PF_GAME_ONLINE_NIU_100_PlayerList: function (currentPage, pageSize, orderByDesc, orderByField) {
    //     return String.format('{0}/playerInfos?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_ONLINE_NIU_100, currentPage, pageSize, orderByDesc, orderByField);
    // },
    H30_TableList: PF_GAME_CONTROL_H30 + '/tables',
    H30_TableInfo: function (roomId) { return String.format('{0}/table-info/{1}', PF_GAME_CONTROL_H30, roomId) },
    H30_Result: PF_GAME_CONTROL_H30 + '/table-result',
    H30_SetCards: PF_GAME_CONTROL_H30 + '/table-cards',

    MingPai_PlayerList: function (currentPage, pageSize, orderByDesc, orderByField) {
        return String.format('{0}/playerInfos?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_CONTROL_MING_PAI, currentPage, pageSize, orderByDesc, orderByField);
    },
    MingPai_Update_Player_Winloss: PF_GAME_CONTROL_MING_PAI + '/update_player_winloss',

    DouDiZhu_PlayerList: function (currentPage, pageSize, orderByDesc, orderByField) {
        return String.format('{0}/playerInfos?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_CONTROL_DOU_DI_ZHU, currentPage, pageSize, orderByDesc, orderByField);
    },

    DouDiZhu_Update_Player_Winloss: PF_GAME_CONTROL_DOU_DI_ZHU + '/update_player_winloss',
    Mingche_OnlineUser_List: function (pageNum, pageSize, orderByDesc, orderByField) {
        return String.format('{0}/query-online-users?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_CONTROL_MINGCHE, pageNum, pageSize, orderByDesc, orderByField);
    },
    Mingche_Online_Table_List: function (pageNum, pageSize) {
        return String.format('{0}/query-online-tables?pageNum={1}&pageSize={2}', PF_GAME_CONTROL_MINGCHE, pageNum, pageSize);
    },
    Mingche_Single_Talbe: function (gameId, sceneId, roomId, tableId) {
        return String.format('{0}/query-single-talbe?gameId={1}&sceneId={2}&roomId={3}&tableId={4}', PF_GAME_CONTROL_MINGCHE, gameId, sceneId, roomId, tableId);
    },
    Mingche_Set_Prize: function () {
        return String.format('{0}/set-prize', PF_GAME_CONTROL_MINGCHE);
    },

    SystemOperator_RecordInfo_Query: function (pageNum, pageSize, userId, startTime, endTime, ids) {
        return String.format('/query/user-module/query-user-play-info?pageNum={0}&pageSize={1}&userId={2}&createTimeDown={3}&createTimeUp={4}{5}', pageNum, pageSize, userId, startTime, endTime, ids);
    },

    SystemOperator_User_Query: function () {
        return String.format('/user-module/query-users-in-rank-post');
    },
    SystemOperator_LoginLog_Query: function () {
        return String.format('/player-login-module/query-player-logins-post');
    },
    SystemOperator_Feedback_Query: function () {
        return String.format('/feedback-module/query-feedbacks-post');
    },
    SystemOperator_OpsLog_Query: function () {
        return String.format('/operation-module/query-operation-post');
    },
    Fishing_Update_Remark: function (userId,remark) {
        return `/game-control/fishing/update-remark?userId=${userId}&remark=${remark}`
    },
    Fishing_Update_Monitor: function () {
        return `/game-control/fishing/update-monitor`
    },
    Fishing_Player_List: function (currentPage, pageSize, orderByDesc, orderByField) {
        return `${PF_GAME_CONTROL_FISHING}/query-online-users?pageNum=${currentPage}&pageSize=${pageSize}&orderByDesc=${orderByDesc}&orderByField=${orderByField}`
        //String.format('{0}/query-online-users?pageNum={1}&pageSize={2}&orderByDesc={3}&orderByField={4}', PF_GAME_CONTROL_FISHING, currentPage, pageSize, orderByDesc, orderByField);
    },
    Search_Player_Id: function(userId){
        return `${PF_GAME_CONTROL_SEARCH}?userId=${userId}`
    },
    Stock_Query_MingPaiQiangZhuang: function () {
        return String.format('/stock-module/query-mpqz-stock');
    },
    Stock_Query_DDZ2: function () {
        return String.format('/stock-module/query-ddz2-stock');
    },
    Stock_Update_MingPaiQiangZhuang: function () {
        return String.format('/stock-module/update-mpqz-stock');
    },
    Stock_Update_DouDiZhu2: function () {
        return String.format('/stock-module/update-ddz2-stock');
    },
    Stock_Update: function () {
        return String.format('/stock-module/update-stock');
    },
    Rate_Update: function () {
        return String.format('/stock-module/update-rate');
    }
};

api.ErrorCode = {
    OK: 0,
    ParameterError: 104,
    OperationError: 106,
    AccountDisabled: 205,
    GetDataFail: 1,
    PostDataFail: 2,
    AuthFail: 60000,
    PermissionError: 60001
};

api.errorText = function (errorCode) {
    switch (errorCode) {
        case this.ErrorCode.ParameterError: return '参数错误，请检查输入'
        case this.ErrorCode.OperationError: return '操作异常'
        case this.ErrorCode.PermissionError: return '权限错误'
        case this.ErrorCode.AccountDisabled: return '账号冻结'
        case this.ErrorCode.AuthFail:
            return '登录超时';
        case this.ErrorCode.GetDataFail:
            return '加载失败，请重试';
        case this.ErrorCode.PostDataFail:
            return '操作失败，请重试';
        default:
            return '出了一点问题，错误码: ' + errorCode
    }
}

api.getData = function (vm, url, onSuccess, onFailure) {
    util.ajax.get(url).then(
        resp => {
            if (util.isDebug) {
                util.d('getData From: ' + url);
                util.d(resp.data);
            }
            var ret = resp.data.ret
            if (ret !== undefined && ret !== this.ErrorCode.OK) {
                if (url !== this.URL.Auth && ret === this.ErrorCode.AuthFail) {
                    util.d('auth fail')
                    util.d(vm.$store)
                    vm.$store.commit('expired', vm)
                    // vm.$router.push({name: 'login'})
                    return
                }
                if (onFailure !== undefined) {
                    onFailure(this.errorText(ret))
                } else {
                    vm.$store.commit('apiError', ret)
                }
            } else {
                if (onSuccess !== undefined) {
                    onSuccess(resp.data)
                } else {
                    if (util.isDebug) {
                        util.d('get data no handler: ' + url)
                    }
                }
            }
        }).catch(
        error => {
            util.d('@error: ' + url)
            if (onFailure !== undefined) {
                onFailure(this.errorText(error.response))
            } else {
                // 通知Vue组件
                vm.$store.commit('apiError', this.ErrorCode.GetDataFail, error)
            }
        }
    )
};

api.postData = function (vm, url, param, onSuccess, onFailure) {
    util.ajax.post(url, param).then(
        resp => {
            if (util.isDebug) {
                util.d('postData to: ' + url);
                util.d(resp.data);
            }
            var ret = resp.data.ret
            if (ret !== undefined && ret !== this.ErrorCode.OK) {
                if (ret === this.ErrorCode.AuthFail) {
                    util.d('auth fail')
                    util.d(vm.$store)
                    vm.$store.commit('expired', vm)
                    // vm.$router.push({name: 'login'})
                    return
                }
                if (onFailure !== undefined) {
                    onFailure(this.errorText(ret))
                } else {
                    vm.$store.commit('apiError', ret)
                }
            } else {
                if (onSuccess !== undefined) {
                    if (resp.data !== undefined) {
                        onSuccess(resp.data)
                    } else {
                        onSuccess()
                    }
                } else {
                    if (util.isDebug) {
                        util.d('post data no handler: ' + url)
                    }
                }
            }
        }).catch(
        error => {
            if (onFailure !== undefined) {
                onFailure(this.errorText(error.response))
            } else {
                // 通知Vue组件
                vm.$store.commit('apiError', this.ErrorCode.PostDataFail, error)
            }
        }
    )
};

export default api;
