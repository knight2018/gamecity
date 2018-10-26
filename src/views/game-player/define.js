import get_this from '../../libs/get_this';
import operationCom from './components/operation.vue';
import util from '../../libs/util';
import api from '../../net/api';


export const niu100PlayerColumns = [
    {
        'title': '玩家Id',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '昵称',
        'key': 'nickName',
        'sortable': 'custom'
    },
    {
        'title': '总充值',
        'key': 'totalCharge',
        'sortable': 'custom'
    },
    {
        'title': '总接收',
        'key': 'bankRecv',
        'sortable': 'custom'
    },
    {
        'title': '总转出',
        'key': 'bankTransfer',
        'sortable': 'custom'
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom'
    },
    {
        'title': '携带金币',
        'key': 'coin',
        'sortable': 'custom'
    },
    {
        'title': 'VIP等级',
        'key': 'vip',
        'sortable': 'custom'
    },
    {
        'title': '总输赢',
        'key': 'totalWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '当日输赢',
        'key': 'todayWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'ip'
    },
    {
        'title': '备注',
        'key': 'remark'
    },
    {
        'title': '当前状态',
        'key': 'offline',
        'sortable': 'custom'
    }
];

export const happy30PlayerColumns = [
    {
        'title': '玩家Id',
        'key': 'userId',
        'width': 180
    },
    {
        'title': '昵称',
        'key': 'userName'
    },
    {
        'title': '庄下注',
        'key': 'betBankerCoin'
    },
    {
        'title': '庄对下注',
        'key': 'betBankerPairCoin'
    },
    {
        'title': '闲下注',
        'key': 'betPlayerCoin'
    },
    {
        'title': '闲对下注',
        'key': 'betPlayerPairCoin'
    },
    {
        'title': '和下注',
        'key': 'betDrawCoin'
    },
    {
        'title': '总下注',
        'key': 'betTotalCoin',
        'sortType': 'desc'
    }
];

export const mingPaiPlayerColumns = [
    {
        'title': '玩家Id',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '总充值',
        'key': 'totalCharge',
        'sortable': 'custom'
    },
    {
        'title': '总接收',
        'key': 'bankRecv',
        'sortable': 'custom'
    },
    {
        'title': '总转出',
        'key': 'bankTransfer',
        'sortable': 'custom'
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom'
    },
    {
        'title': '携带金币',
        'key': 'coin',
        'sortable': 'custom'
    },
    {
        'title': 'VIP等级',
        'key': 'vip',
        'sortable': 'custom'
    },
    {
        'title': '总输赢',
        'key': 'totalWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '当日输赢',
        'key': 'todayWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'ip'
    },
    {
        'title': '备注',
        'key': 'remark'
    },
    {
        'title': '当前状态',
        'key': 'offline',
        'sortable': 'custom'
    },
    {
        'title': '监控状态',
        'key': 'executeState',
        'sortable': 'custom'
    },
    {
        'title': '胜率',
        'key': 'winLossRate',
        'sortable': 'custom'
    },
    {
        'title': '执行输赢',
        'key': 'executeWinLoss',
        'sortable': 'custom'
    }
];

export const douDiZhuPlayerColumns = [
    {
        'title': '玩家Id',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '总充值',
        'key': 'totalCharge',
        'sortable': 'custom'
    },
    {
        'title': '总接收',
        'key': 'bankRecv',
        'sortable': 'custom'
    },
    {
        'title': '总转出',
        'key': 'bankTransfer',
        'sortable': 'custom'
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom'
    },
    {
        'title': '携带金币',
        'key': 'coin',
        'sortable': 'custom'
    },
    {
        'title': 'VIP等级',
        'key': 'vip',
        'sortable': 'custom'
    },
    {
        'title': '总输赢',
        'key': 'totalWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '当日输赢',
        'key': 'todayWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'ip'
    },
    {
        'title': '备注',
        'key': 'remark'
    },
    {
        'title': '当前状态',
        'key': 'offline',
        'sortable': 'custom'
    },
    {
        'title': '监控状态',
        'key': 'executeState',
        'sortable': 'custom'
    },
    {
        'title': '胜率',
        'key': 'winLossRate',
        'sortable': 'custom'
    },
    {
        'title': '执行输赢',
        'key': 'executeWinLoss',
        'sortable': 'custom'
    }
];

export const fishColumns = [
    {
        'title': '昵称',
        'key': 'userName',
        'sortable': 'custom'
    },
    {
        'title': '玩家Id',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '总充值',
        'key': 'totalCharge',
        'sortable': 'custom'
    },
    {
        'title': '总接收',
        'key': 'bankRecv',
        'sortable': 'custom'
    },
    {
        'title': '总转出',
        'key': 'bankTransfer',
        'sortable': 'custom'
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom'
    },
    {
        'title': '携带金币',
        'key': 'coin',
        'sortable': 'custom'
    },
    {
        'title': 'VIP等级',
        'key': 'vip',
        'sortable': 'custom'
    },
    {
        'title': '总输赢',
        'key': 'totalWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '当日输赢',
        'key': 'todayWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'ip'
    },
    {
        'title': '当前状态',
        'key': 'offline',
        'sortable': 'custom'
    },
];

export const mingchePlayerColumns = [
    {
        'title': '玩家昵称',
        'key': 'nickName'
    },
    {
        'title': '玩家ID',
        'key': 'userId',
        'sortable': 'custom'
    },
    {
        'title': '总充值',
        'key': 'totalCharge',
        'sortable': 'custom'
    },
    {
        'title': '总接收',
        'key': 'recvCoin',
        'sortable': 'custom'
    },
    {
        'title': '总转出',
        'key': 'transCoin',
        'sortable': 'custom'
    },
    {
        'title': '银行金币',
        'key': 'bankCoin',
        'sortable': 'custom'
    },
    {
        'title': '携带金币',
        'key': 'selfCoin',
        'sortable': 'custom'
    },
    {
        'title': 'VIP等级',
        'key': 'vipLevel'
    },
    {
        'title': '当日输赢',
        'key': 'todayWinCoin',
        'sortable': 'custom'
    },
    {
        'title': '登录地址',
        'key': 'ipAddress'
    },
    {
        'title': '备注',
        'key': 'remark'
    },
    {
        'title': '当前状态',
        'key': 'offline'
    }
];
export const searchColumns =[
    {
        title: '玩家昵称',
        key: 'userName',
        align:'center',
    },
    {
        title: '玩家ID',
        key: 'userId',
        align:'center',
    },
    {
        title: '总充值',
        key: 'totalCharge',
        align:'center',
    },
    {
        title: '总接收',
        key: 'bankRecv',
        align:'center',
    },
    {
        title: '总转出',
        key: 'bankTransfer',
        align:'center',
    },
    {
        title: '银行金币',
        key: 'bankCoin',
        align:'center',
    },
    {
        title: '携带金币',
        key: 'coin',
        align:'center',
    },
    {
        title: 'VIP等级',
        key: 'vip',
        align:'center',
    },
    {
        title: '总输赢',
        key: 'totalWinCoin',
        align:'center',
    },
    {
        title: '当日输赢',
        key: 'todayWinCoin',
        align:'center',
    },
    {
        title: '登陆地址',
        key: 'ip',
        align:'center',
    },
    {
        title: '备注',
        key: 'remark',
        align: 'center',
         render: (h,params) =>{
             let row = params.row;
             console.log(get_this.col);
             return h('a',{
                 on:{
                     click: ()=>{
                        console.log(get_this.col)
                        get_this.col.editForm.remark= row.remark;
                        get_this.col.editForm.userId= row.userId;
                        get_this.col.showUpdataRemark();
                     }
                }
             },row.remark||'备注')
         }
    },
    {
        title: '当前状态',
        key: 'isOnline',
        align:'center',
    },
    {
        title: '当前游戏',
        key: 'gameId',
        align: 'center'
    },
    {
        title: '操作',
        key: 'operation',
        align: 'center',
        render:(h,params) =>{
            // return h('a',{
            //     on: {
            //         click: ()=> {
            //             console.log(get_this.col)
            //             let p = params.row
            //              util.confirm(get_this.col,`确定将 <b> ${p.userName} </b> 踢下线?`,()=>{
            //                  api.postData(get_this.col,api.URL.searchColumns,{userId:p.userId},
            //                     data =>{
            //                         alter('踢人成功');
            //                     },error=>{
            //                         alter('踢人失败');
            //                     }
            //                     )
            //              },)
                        
            //          }
            //      }
            //  },"踢下线")
            console.log(params)
            return h('div',[
                h(operationCom,{
                    props:{
                        userName: params.row.userName,
                        userId:params.row.userId,
                        userURL:''
                    }
                })
            ])
        }
    },
    {
        title: '监控中心',
        key: 'monitor',
        align:'center',
        render: (h,params) =>{
            return h('div',[
                h('Button',{
                    props:{
                        type: 'primary',
                        size: 'small'
                    },
                    style:{
                        
                    },
                    on: {
                        click: ()=>{
                            console.log(params);
                            get_this.col.userId = params.row.userId;
                            get_this.col.$store.commit('setId',params.row.userId)
                             console.log(get_this.col.$store.state.userId)
                            get_this.col.showMonitor();
                        }
                    }
                },'监控')
            ])
        }
    },
    {
        title: '监控状态',
        key: 'cState'
    },
    {
        title: '胜率',
        key: 'winLossRate'
    },
    {
        title: '执行输赢',
        key: 'executeWinLoss'
    },

];
export const remarkColumnsList =[
    {
        title: "玩家昵称",
        key: "userName",
        align: "center"
    },
    {
        title: "玩家ID",
        key: "userId",
        align: "center"
    },
    {
        title: "总充值",
        key: "totalCharge",
        align: "center"
    },
    {
        title: "玩家状态",
        key: "office",
        align: "center"
    },
    {
        title: "备注分类",
        key: "remark",
        align: "center",
        filters: [
            {
                label: "label1",
                value: 1
            },
            {
                label: "label2",
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value,row){
            console.log(value,row)
            if(value===1){
                return row.remark = value;
                
            }
        }
    },
    
]
