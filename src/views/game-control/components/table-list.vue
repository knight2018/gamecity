<template>
    <div>
        <div :key="idx" v-for="(tableArray, idx) in tableArrayList">
            <Row :gutter="40">
                <Col span="8">
                <table-info-view @enterTable="enterTable" v-if="tableArray.length > 0" :tableInfo="tableArray[0]"></table-info-view>
                </Col>
                <Col span="8">
                <table-info-view @enterTable="enterTable" v-if="tableArray.length > 1" :tableInfo="tableArray[1]"></table-info-view>
                </Col>
                <Col span="8">
                <table-info-view @enterTable="enterTable" v-if="tableArray.length > 2" :tableInfo="tableArray[2]"></table-info-view>
                </Col>
            </Row>
            <br/>
            <br/>
        </div>
    </div>
</template>

<script>
import tableInfoView from "./table-info.vue";


export default {
  name: "gameControlTableList",
  components: { tableInfoView },

  props: {
    tableList: Array,
  },
  watch: {
    tableList(val) {
      this.showTableList();
    }
  },
  data() {
    return {
      tableArrayList: []
    };
  },
  created() {
    this.showTableList();
  },
  methods: {
    showTableList() {
      this.tableArrayList = [];
      for (var i = 0; i < this.tableList.length; ) {
        var array = [];
        for (var n = 0; n < 3; n++) {
          if (i + n < this.tableList.length) {
            array.push(this.tableList[i + n]);
          }
        }
        i += array.length;
        this.tableArrayList.push(array);
      }
    },
    enterTable(tableInfo) {
        this.$emit('enterTable', tableInfo)
    }
  }
};
</script>