<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <div v-if="!showPermissions">
            <Row>
                <Button type="info" @click="showNewAccount">添加</Button>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="tableColumns" :data="tableData"></Table>
            </Row>
        </div>
        <div v-else>
            <account-permission :accountId="editAccountId" :permissions="accountPermissions" @finishEditPermission="hidePermissionEditor" @cancelEditPermission="hidePermissionEditor">
            </account-permission>
        </div>
    </div>
</template>

<script>
import { accountColumns } from './define.js';
import accountPermission from './account-permission';
import permissions from '../../libs/permissions'
import stringUtil from '../../libs/string-util';
import arrayUtil from '../../libs/array-util';
import util from '../../libs/util';
import api from '../../net/api';
export default {
    name: 'account-list',
    components: { accountPermission },
    data () {
        return {
            tableColumns: [],
            tableData: [],
            newAccount: {},
            editAccount: null, //当前编辑的账号
            accountPermissions: [], //当前编辑的权限列表
            showPermissions: false, //是否显示权限列表
            editAccountId: 0
        };
    },
    methods: {
        loadAccountList () {
            api.getData(this, api.URL.Account_List, data => {
                // this.tableData = []
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    item.index = i+1
                    item.password = "******"
                    item.stateDesc = item.state == 0 ? '正常' : '封号'
                }
                this.tableData = data           
            })
        },
        hidePermissionEditor () {
            this.showPermissions = false;
        },
        showNewAccount () {
            let m = this
            this.$Modal.confirm({
                title: '新增账号',
                loading: true,
                render: (h) => {
                    return h('div', [
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '账号'
                            },
                            on: {
                                'on-blur': o => {
                                    this.newAccount.loginName = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '使用者'
                            },
                            on: {
                                'on-blur': o => {
                                    this.newAccount.name = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '密码'
                            },
                            on: {
                                'on-blur': o => {
                                    this.newAccount.password = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '备注'
                            },
                            on: {
                                'on-blur': o => {
                                    this.newAccount.remark = o.target.value
                                }
                            }
                        })
                    ]
                    )
                },
                onOk: () => {
                    console.log(this.newAccount)
                    if (stringUtil.isBlank(this.newAccount.loginName)) {
                        alert('输入账户')
                        this.$Modal.remove()
                        return
                    }
                    if (stringUtil.isBlank(this.newAccount.name)) {
                        alert('输入使用者')
                        this.$Modal.remove()
                        return
                    }
                    if (stringUtil.isBlank(this.newAccount.password)) {
                        alert('输入密码')
                        this.$Modal.remove()
                        return
                    }
                    if (stringUtil.isBlank(this.newAccount.remark)) {
                        this.newAccount.remark = ''
                    }

                    // util.showLoading(this)
                    api.postData(this, api.URL.Account_Add, this.newAccount, data => {
                        // util.hideLoading(this)
                        this.$Modal.remove()
                        this.loadAccountList()
                    })
                },
            })
        },
        showEditAccount (account) {
            let m = this
            this.editAccount = {}
            this.$Modal.confirm({
                title: '编辑账号',
                loading: true,
                render: (h) => {
                    return h('div', [
                        h('Input', {
                            props: {
                                value: account.loginName,
                                readonly: true,
                                autofocus: true,
                                placeholder: '账号'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editAccount.loginName = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                value: account.name,
                                autofocus: true,
                                placeholder: '使用者'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editAccount.name = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '密码'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editAccount.password = o.target.value
                                }
                            }
                        }),
                        h('Input', {
                            props: {
                                autofocus: true,
                                placeholder: '备注'
                            },
                            on: {
                                'on-blur': o => {
                                    this.editAccount.remark = o.target.value
                                }
                            }
                        })
                    ]
                    )
                },
                onOk: () => {
                    util.d(this.editAccount)
                    if (stringUtil.isBlank(this.editAccount.loginName)) {
                        alert('输入账户')
                        this.$Modal.remove()
                        return
                    }
                    if (stringUtil.isBlank(this.editAccount.name)) {
                        alert('输入使用者')
                        this.$Modal.remove()
                        return
                    }
                    if (stringUtil.isBlank(this.editAccount.remark)) {
                        this.editAccount.remark = ''
                    }

                    // util.showLoading(this)
                    api.postData(this, api.URL.Account_Update, this.editAccount, data => {
                        // util.hideLoading(this)
                        this.$Modal.remove()
                        this.loadAccountList()
                    })
                },
            })
        }
    },
    created () {
        var cols = []
        for (let i = 0; i < accountColumns.length; i++) {
            cols.push(accountColumns[i])
        }
        cols.splice(7, 0, {
            title: '操作',
                key: 'operation',
                render: (h, params) => {
                    return h('div', [h('a', {
                        on: {
                             click: () => {
                                 let m = this
                                 var account = this.tableData[params.index]
                                 var p = {
                                     account: account.loginName,
                                     state: account.state === 0 ? 1 : 0
                                 }
                                 util.showLoading(this)
                                 api.postData(this, api.URL.Account_UpdateState, p, data => {
                                    util.hideLoading(this)
                                    for (const i in m.tableData) {
                                        if (m.tableData[i].loginName == data.account) {
                                            m.tableData[i].state = data.state
                                            break
                                        }
                                    }
                                 })
                             }
                        }
                    }, this.tableData[params.index].state === 0 ? '封号' : '解封'),
                    h('span', {}, ' '),
                    h('a', {
                        on: {
                             click: () => {
                                 var account = this.tableData[params.index]
                                this.showEditAccount(account)                                 
                             }
                        }
                    }, '编辑')
                    ])
                }
            }
        )
        cols.splice(5, 0, {
            title: '权限',
                key: 'permission',
                render: (h, params) => {
                    return h('div', [h('a', {
                        on: {
                             click: () => {
                                let m = this
                                var account = this.tableData[params.index]
                                api.getData(this, api.URL.Account_Permission(account.id), data => {
                                    this.editAccount = account
                                    var ps = data
                                    //如果是大管理员则加入全部权限
                                    ps = {}
                                    if (permissions.hasLevel(data, permissions.all.GOD.id)){
                                        for (const x in permissions.all) {
                                            if (permissions.all.hasOwnProperty(x)) {
                                                const item = permissions.all[x];
                                                if (item.id.toString() !== permissions.all.GOD.id.toString()) {
                                                    ps[item.id.toString()] = permissions.LEVEL.Operate
                                                }
                                            }
                                        }
                                    } else {
                                        for (const x in permissions.all) {
                                            if (permissions.all.hasOwnProperty(x)) {
                                                const item = permissions.all[x];
                                                var level = permissions.getLevel(data, item.id)
                                                ps[item.id.toString()] = level
                                            }
                                        }
                                    }
                                    
                                    this.editAccountId = account.id
                                    this.accountPermissions = ps
                                    this.showPermissions = true
                                })
                             }
                        }
                    }, '修改')])
                }
            }
        )
        this.tableColumns = cols
        this.loadAccountList()
    }
};
</script>
