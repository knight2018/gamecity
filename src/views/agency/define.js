
export const agencyList = vm=>{return [
    {
        title: "编号",
        key: "number"
    },
    {
        title: "代理等级",
        key: "angenct"
    },
    {
        title: "代理账号",
        key: "userId"
    },
    {
        title: "昵称",
        key: "userName"
    },
    {
        title: "备注",
        key: "remark",
        align: "center",
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on:{
                    click (){
                        vm.editFrom.remark = row.remark;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataRemark();
                    }
                },
            },vm.editFrom.remark||'备注')
        }
    },
    {
        title: "手机号码",
        key: "phone",
        align:"center",
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on:{
                    click (){
                        vm.editFrom.phone = row.phone;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataPhone();
                    }
                }
            },vm.editFrom.phone||'电话')
        }
    },
    {
        title: "抽水比例",
        key: "scale",
        children:[
            {
                title:'一级',
                key:"one",
                align:"center",
                width: 200
            },
            {
                title: "二级",
                key: "two",
                aglin:"center",
                width: 200
            }
        ]
    },
    {
        title: "可提取金币",
        key: "money",
        'sortable': 'custom'
    },
    {
        title: "最低提取限制",
        key: "minimum",
        'sortable': 'custom'
    },
    {
        title: "已获得金币",
        key: "acquired",
        sortable: 'custom'
    },
    {
        title: "下级代理",
        key: "subordinate",
        sortable: 'custom'
    },
    {
        title: "绑定玩家",
        key: "player",
        sortable: 'custom'
    },
    {
        title: "注册时间",
        key: "time"
    }
]
}