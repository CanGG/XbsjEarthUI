// author 谢灿
// date 2020年6月8日
// description 事故情景-预案编制联动选择框
<template>
  <div style="width:100%;height:100%">
    <Window
      ref="maneuverWindow"
      :footervisible="true"
      @cancel="close"
      @ok="ok"
      v-show="show"
      :width="910"
      :minWidth="910"
      :height="640"
      :top="240"
      :left="450"
      :title="'事故情景-预案编制选择框'"
      class="hy-mainwindow"
    >
      <div class="hy-btnbar">
        <input type="text" placeholder="模糊查询关键字" v-model="keyword" />
        <div>
          <button class="hy-btnbar-button" @click="reloadDisaster">查询</button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-content-label">事故情景</div>
        <table class="layui-hide" :id="dataTableDisaster.id" lay-filter="searchDisasterTable"></table>
        <div style="width:100%;border-bottom: 2px solid rgba(0, 0, 0, 0.4);"></div>
        <div class="hy-content-label">预案</div>
        <table class="layui-hide" :id="dataTableManeuver.id" lay-filter="searchManeuverTable"></table>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import PlanBasicInfo from "@services/PlanBasicInfo";
export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      keyword: "",
      lang: {},
      //选中的情景id
      disaster_id: 0,
      dataTableDisaster: {
        id: "hySearchDisasterTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left", title:"选择" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "情景名称", width: 160 },
          { field: "fk_org_part_name", title: "灾害部位", width: 160 },
          { field: "disaster_level", title: "灾害等级", width: 100 },
          { field: "operate_date", title: "创建时间", width: 140, sort: true },
        ],
      },
      dataTableManeuver: {
        id: "hySearchManeuverTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left", title:"选择" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "预案名称", width: 430 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true }
        ],
      },
      langs: languagejs,
      //选中的预案名称和id
      maneuverName: "",
      maneuverId: "0",
    };
  },
  created() {},
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //监听行工具事件
    this._disposers = this._disposers || [];

    that.tableListeners();
  },
  methods: {
    init(data) {
      console.log(data);
      this.disaster = data;
    },
    //////table's func
    //表格初始化
    tableInit() {
      let that = this;
      let planBasicInfo = new PlanBasicInfo(this.$root);
      //预案
      this.dataTableManeuver.ins = layui.table.render({
        elem: "#" + that.dataTableManeuver.id,
        url: planBasicInfo.server + "v2/plan/basicInfos",
        page: { theme: "#2A2A2A" }, //改page的样式
        // url: planBasicInfo.server + planBasicInfo.path,
        // method: "get",
        where: {keyword:that.keyword},
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 200,
        cols: [that.dataTableManeuver.columns],
        data: that.dataTableManeuver.data,
        even: true
      });
      
      //事故情景
      this.dataTableDisaster.ins = layui.table.render({
        elem: "#" + that.dataTableDisaster.id,
        url: planBasicInfo.server + "v2/plan/disasters",
        page: { theme: "#2A2A2A" }, //改page的样式
        // url: planBasicInfo.server + planBasicInfo.path,
        // method: "get",
        where:{fk_org_id:121},
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 200,
        cols: [that.dataTableDisaster.columns],
        data: that.dataTableDisaster.data,
        even: true
      });
    },
    
    //表格的所有监听事件
    tableListeners() {
      let that = this;
      //监听事故情景单选事件
      layui.table.on('radio(searchDisasterTable)', function(obj){
        that.disaster_id = obj.data.key_id;
      });

      //监听预案单选事件
      layui.table.on('radio(searchManeuverTable)', function(obj){
        that.maneuverName = obj.data.name;
        that.maneuverId = obj.data.key_id;
      });
    },
    //重载预案表格
    reloadManeuver(){
      let that = this;
      this.dataTableManeuver.ins.reload({
        where: {
          keyword:that.keyword,
          fk_disaster_id:that.disaster_id,
          },
      });
    },
    //重载事故情景表格
    reloadDisaster(){
      let that = this;
      this.dataTableDisaster.ins.reload({
        where: {
          fk_org_id:that.fk_org_id,
          },
      });
    },

    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      this.close();
    },
    ok() {
      //保存演练
      let that = this;
      this.$parent.maneuverName = that.maneuverName;
      this.$parent.maneuverId = that.maneuverId;
      
      this.close();
    },
    clear() {}
  },
  filters: {},
  beforeDestroy() {
    this._disposers.forEach(e => e());
    this._disposers.length = 0;
  },
  
  watch: {
    disaster_id(v){
      this.reloadManeuver();
    }
  }
};
</script>
<style scoped>
.hy-mainwindow {
  display: flex;
  flex-direction: column;
}
.hy-btnbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
}

.hy-btnbar > * {
  margin-right: 15px;
}
.hy-btnbar input {
  width: 120px;
  padding: 5px;
  color: white;
  line-height: inherit;
  background: rgba(0, 0, 0, 0.4);
  border: 0 solid #aaa;
}
.hy-btnbar .hy-btnbar-button {
  min-width: 80px;
  height: 100%;
  min-height: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid gray;
  cursor: pointer;
}
.hy-btnbar .hy-btnbar-button:hover {
  color: #1fffff;
  border: 1px solid #1fffff;
  cursor: pointer;
}
.hy-select-div {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 28px;
  padding-left: 13px;
  line-height: 28px;
  text-align: left;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  cursor: pointer;
}
.hy-content-label {
  width: 100%;
  border-bottom: 1px solid;
  color: #ddd;
  padding-top: 5px;
  padding-left: 5px;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  color: #ddd;
}
</style>
