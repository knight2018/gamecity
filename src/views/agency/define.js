
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
             },row.remark|| '备注')
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
            },row.phone||'电话')
        }
    },
    // {
    //     title: "抽水比例",
    //     aglin:'center',
    //     children:[
    //         {
    //             title:'一级',
    //             key:"one",
    //             align:"center",
    //             width: 50
    //         },
    //         {
    //             title: "二级",
    //             key: "two",
    //             aglin:"center",
    //             width: 50
    //         }
    //     ]
    // },
    {
        title: "抽水比例一级",
        key: "smoke",
        aglin: "center",
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on: {
                    click (){
                        vm.editFrom.smoke = row.smoke;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataSmoke('smoke');
                    }
                }
            },row.smoke||1)
        }
    },
    {
        title: "抽水比例二级",
        key: "smokes",
        aglin:"center",
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on: {
                    click (){
                        vm.editFrom.smokes = row.smokes;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataSmoke('smokes');
                    }
                }
            },row.smokes||0.5)
        }
    },
    {
        title: "可提取金币",
        key: "money",
        'sortable': 'custom'
    },
    {
        title: "最低提取限制",
        key: "minimum",
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on: {
                    click (){
                        vm.editFrom.minimum = row.minimum;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataMinimum();
                    }
                }
            },row.minimum||10000)
        }
    },
    {
        title: "已获得金币",
        key: "acquired",
        sortable: 'custom',
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on: {
                    click (){
                        vm.editFrom.acquired = row.acquired;
                        vm.editFrom.userId = row.userId;
                        vm.showUpdataAcquired();
                    }
                }
            },row.acquired||0)
        }
    },
    {
        title: "下级代理",
        key: "subordinate",
        sortable: 'custom',
        render: (h,params)=>{
            let row = params.row;
            return h('a',{
                on: {
                    click (){
                        vm.editFrom.subordinate = row.subordinate;
                        vm.editFrom.userId = row.userId;
                        let that = vm,
                        date = {userId:vm.editFrom.userId};
                        // api.postData(that,url,date,data=>{
                        //             console.log(data);
                        //         },error=>{
                        //             console.log(error)
                        //         });
                        vm.params.off = false;
                        vm.params = {
                            columnsList:[
                                {
                                    title: "编号",
                                    key: "number"
                                },
                                {
                                    title: "代理关系",
                                    key: "userName"
                                },
                                {
                                    title: "代理账号",
                                    key:"gold"
                                },
                                {
                                    title: "昵称",
                                    key: "time"
                                },
                                {
                                    title: "备注",
                                    key:"gold"
                                },
                                {
                                    title: "手机号码",
                                    key:"gold"
                                },
                                {
                                    title: "抽水比例",
                                    key:"gold"
                                },
                                {
                                    title: "可提取金币",
                                    key:"gold"
                                },
                                {
                                    title: "已获得金币",
                                    key:"gold"
                                },
                                {
                                    title: "绑定玩家",
                                    key:"gold"
                                },
                                {
                                    title: "注册时间",
                                    key:"gold"
                                },
                                
                            ],
                            dataList:[],
                            total: 50
                        }
                    }
                }
            },row.subordinate||0)
        }
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