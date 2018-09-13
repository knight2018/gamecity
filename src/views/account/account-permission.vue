<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>

    <Row>
        <Col span="12">
            <Row>
                <Col span="6">权限列表
                </Col>
                <Col  span="6">显示
                </Col>
                <Col  span="6">操作
                </Col>
            </Row>


            <Row v-for="permission in allPermissions">
                <Col span="6"> {{ permission.desc }}
                </Col>
                <Col span="6">
                <Checkbox v-bind:value="hasViewPermission(permission.id)" @on-change="onViewPermissionChanged(permission)">&nbsp;</Checkbox>
                </Col>
                <Col span="6">
                <Checkbox v-bind:disabled="!hasViewPermission(permission.id)" v-bind:value="hasOperatePermission(permission.id)" @on-change="onOperatePermissionChanged(permission)">&nbsp;</Checkbox>
                </Col>
            </Row>

            
            <div>

            </div>
        </Col>
        
        <Col span="12">
        </Col>

    </Row>
    <br />

     <Button type="primary" @click="doChangePermission">确定</Button>
     <Button type="ghost" @click="cancelChangePermission">取消</Button>
    </div>
</template>

<script>
import permissions from '../../libs/permissions'
import util from '../../libs/util'
import api from '../../net/api';

export default {
    name: 'account-permission',
    data () {
        return {
            systemPermissions: [],
            accountPermissions: permissions,
            allPermissions: this.getAllPermissions()
        };
    },
    methods: {
        getAllPermissions () {
            var all = []
            for (const key in permissions.all) {
                if (permissions.all.hasOwnProperty(key)) {
                    const permission = permissions.all[key];
                    if (permission.id !== permissions.all.GOD.id)
                        all.push(permission)
                }
            }
            all.sort((a, b) => {return a.id - b.id })
            return all
        },
        onViewPermissionChanged (permission) {
            var key = permission.id.toString()
            var group = parseInt(permission.id / 100)
            var parentId = parseInt(permission.id / 100) * 100;
            var p = this.getPermissionLevel(key)
            if (p === 1 || p === 2) {
                //是否全部取消选中
                if (permission.id == parentId) {
                    this.setGroupPermissionLevel(group, 0)
                } else {
                    this.setPermissionLevel(key, 0)
                    if (this.groupPermissionLevelEquals(group, 0)) {
                    }
                    this.setPermissionLevel(parentId, 0)
                }
            }
            else {
                //是否全部选中
                if (permission.id == parentId) {
                    this.setGroupPermissionLevel(group, 1)
                } else {
                    this.setPermissionLevel(key, 1)
                    if (this.groupHasPermissionLevel(group)) {
                        this.setPermissionLevel(parentId, 1)
                    }
                    else {
                        this.setPermissionLevel(parentId, 0)
                    }
                }
                
            }
        },
        onOperatePermissionChanged (permission) {
            var key = permission.id.toString()
            var group = parseInt(permission.id / 100)
            var parentId = parseInt(permission.id / 100) * 100;
            var p = this.getPermissionLevel(key)
            if (p === 1) {
                if (permission.id == parentId) {
                    this.setGroupPermissionLevel(group, 2)
                } else {
                    this.setPermissionLevel(key, 2)
                    //是否全部选中
                    if (this.groupPermissionLevelEquals(group, 2)) {
                        this.setPermissionLevel(parentId, 2)
                    }
                }
            }
            else if (p === 2) {
                if (permission.id == parentId) {
                    this.setGroupPermissionLevel(group, 1)
                } else {
                    this.setPermissionLevel(key, 1)
                    //是否全部取消选中
                    if (this.groupHasPermissionLevel(group)) {
                        this.setPermissionLevel(parentId, 1)
                    }
                    else {
                        this.setPermissionLevel(parentId, 0)
                    }
                }
            }
        },
        setGroupPermissionLevel (groupId, level) {
            for (const key in permissions.all) {
                if (permissions.all.hasOwnProperty(key)) {
                    const p = permissions.all[key];
                    if (parseInt(p.id / 100) === groupId) {
                        if (this.getPermissionLevel(p.id) === 2 && level === 1){
                            //忽略高级权限
                        }else {
                            this.setPermissionLevel(p.id, level)
                        }
                    }
                }
            }
        },
        groupHasPermissionLevel(groupId) {
            for (const key in permissions.all) {
                if (permissions.all.hasOwnProperty(key)) {
                    const p = permissions.all[key];
                    if (p.id % 100 !== 0 && parseInt(p.id / 100) === groupId) {
                        var level = this.getPermissionLevel(p.id)
                        if (level !== 0) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        groupPermissionLevelEquals(groupId, permissionLevel) {
            for (const key in permissions.all) {
                if (permissions.all.hasOwnProperty(key)) {
                    const p = permissions.all[key];
                    if (p.id % 100 !== 0 && parseInt(p.id / 100) === groupId) {
                        var level = this.getPermissionLevel(p.id)
                        if (level !== permissionLevel) {
                            return false
                        }
                    }
                }
            }
            return true
        },
        getPermissionLevel (permissionId) {
            var level = this.permissions[permissionId.toString()]
            if (level === undefined) return 0
            return level
        },
        setPermissionLevel (permissionId, level) {
            this.permissions[permissionId.toString()] = level
        },
        hasViewPermission (permissionId) {
            var p = this.permissions[permissionId.toString()]
            return p === 1 || p === 2
        },
        hasOperatePermission (permissionId) {
            var p = this.permissions[permissionId.toString()]
            return p === 2
        },
        doChangePermission () {
            util.showLoading(this)
            for (const permissionId in this.permissions) {
                if (this.permissions.hasOwnProperty(permissionId)) {
                    const level = this.permissions[permissionId];
                    if (permissionId % 100 === 0) {
                        var groupId = parseInt(permissionId / 100)
                        if(this.groupHasPermissionLevel(groupId)) {
                            if(this.groupPermissionLevelEquals(groupId, 2)){
                                this.setPermissionLevel(permissionId, 2)
                            } else {
                                this.setPermissionLevel(permissionId, 1)
                            }
                        }
                    }
                }
            }
            api.postData(this, api.URL.Account_Permission(this.accountId), this.permissions, result => {
                util.hideLoading(this)
                this.$emit('finishEditPermission')
            })
        },
        cancelChangePermission () {
            this.$emit('cancelEditPermission')
        }
    },
    props: {
        accountId: Number,
        permissions: {
            type: Object,
            default: []
        }
    },
    created () {
        
    },
    mounted () {
    }
};
</script>
