<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
    .search{
        position: fixed;
        width: 100%;
        top: 50%;
        left: 50%;
        margin-left: -50px;
    }
    .border-blue {
        border: 1px solid #57a3f3;
        border-radius: 4px;
    }
    .border{
        border: 1px solid #57a3f3;
    }
</style>
<template>
    <Row>
        <div>
            <Table :columns="columns1" :data="data1" :no-data-text="dataText"></Table>
        </div>
        <div class="search">
            <Input  class="border-blue" type="text" icon="ios-search" v-model="value" placeholder="请输入7位ID" style="width:200px" @on-click="handleSearch" @on-change="judge" size="large"></Input>
            <Button class="border" :disabled="btn" @click="handleSearch" size="large">搜索</Button>
        </div>
    </Row>
</template>
<script>
import get_this from '../../../libs/get_this';
    export default{
        name: 'pageable-control-search',
        props:{
           columns1:{
               type: Array,
               default: []
           },
           data1:{
               type: Array,
                default: []
           }
        },
        data (){
            return {
                
                value :"",
                btn: true,
                dataText:""
               
            }
        },
        methods :{
            handleSearch (){
                let that = get_this.col;
              
                if(this.value.length>=6){
                    if(this.value.length===6){
                        
                        that.editForm.userId = this.value;
                        
                        if(that.timer4syncTableInfo !==null){
                            clearInterval(that.timer4syncTableInfo);
                            
                        }
                    }
                    that.getTableInfo();
                    that.timer4syncTableInfo = setInterval(that.getTableInfo,4000); 
                  
                }
                
            },
            judge (){
               
                if(this.value.length>5){
                    if(this.value.length>6){
                        this.dataText = "id位数超过7位";
                    }else{
                        this.btn = false;
                        this.dataText = "";
                    }   
                }else{
                    this.btn = true;
                    this.dataText = "";
                }
                
            },
            
        }
    }
</script>