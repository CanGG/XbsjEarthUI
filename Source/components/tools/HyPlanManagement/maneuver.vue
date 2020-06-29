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
          <button class="hy-btnbar-button" @click="search">查询</button>
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
      dataTableDisaster: {
        id: "hySearchDisasterTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "情景名称", width: 160 },
          { field: "fk_org_part_name", title: "灾害部位", width: 160 },
          { field: "fk_disaster_grade_name", title: "灾害等级", width: 100 },
          { field: "plan_author", title: "制作人", width: 83 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true }
        ],
        data: [
          {
            key_id: 9,
            fk_org_id: 121,
            name: "油罐起火",
            fk_org_part_id: 5,
            fk_org_part_name: "甲类仓库11,甲类油罐A",
            fk_disaster_grade_name: 9,
            create_time: null,
            operator_id: null,
            plan_author: "admin",
            remark: null,
            update_time: null
          }
        ]
      },
      dataTableManeuver: {
        id: "hySearchManeuverTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "预案名称", width: 430 },
          { field: "plan_author", title: "制作人", width: 83 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true }
        ],
        data: [
          {
            content: null,
            create_time: null,
            fk_disaster_grade_name: 9,
            fk_disaster_id: null,
            fk_org_id: 121,
            fk_org_part_id: 5,
            fk_org_part_name: "甲类仓库11",
            disaster_name: "油罐起火",
            is_formal_plan: 0,
            key_id: 9,
            name: "区域-灾害等级-推演",
            operator_id: null,
            plan_author: "admin",
            remark: null,
            thumbnail_url: null,
            update_time: null
          }
        ]
      },
      langs: languagejs
    };
  },
  created() {},
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //监听行工具事件
    this._disposers = this._disposers || [];
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
      this.dataTableManeuver.ins = layui.table.render({
        elem: "#" + that.dataTableManeuver.id,
        page: { theme: "#2A2A2A" }, //改page的样式
        // url: planBasicInfo.server + planBasicInfo.path,
        // method: "get",
        where: that.searchParams,
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 200,
        cols: [that.dataTableManeuver.columns],
        data: that.dataTableManeuver.data,
        even: true
      });
      this.dataTableDisaster.ins = layui.table.render({
        elem: "#" + that.dataTableDisaster.id,
        page: { theme: "#2A2A2A" }, //改page的样式
        // url: planBasicInfo.server + planBasicInfo.path,
        // method: "get",
        where: that.searchParams,
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 200,
        cols: [that.dataTableDisaster.columns],
        data: that.dataTableDisaster.data,
        even: true
      });
    },
    //////button bar search start
    //搜索按钮事件
    search() {
      console.log(this.searchParams);
      let that = this;
      this.dataTableManeuver.ins.reload({
        where: that.searchParams
      });
      //获取参数
    },
    //添加按钮事件
    addDeduce() {
      console.log("预案编制!");
      console.log(this);
      let that = this;
      layer.prompt(
        {
          title: "请输入预案编制名称"
        },
        function(name, index) {
          layer.close(index);
          let li = window._wait();
          setTimeout(() => {
            //隐藏参数: 当前场景json(包含单位瓦片 地形 等)
            layer.msg("添加成功");
            that.dataTableManeuver.data.push({
              key_id: that.dataTableManeuver.data.length + 1,
              name: name,
              disaster_name: "油管失火",
              plan_author: "admin",
              create_time: new Date().Format("yyyy-MM-dd")
            });
            let json = that.$root.$earth.toJSON();
            window.localStorage.setItem(
              that.$root.$hyControls.orgID +
                "|" +
                that.disaster.id +
                "|" +
                that.dataTableManeuver.data.length,
              json
            );
            that.tableInit();
          }, 500);
        }
      );
      //关闭本面板
      // this.show = false;
      //弹出事件点面板
      // this.$root.$earthUI._hyMajorHazardSource.show = true;
      // this.unbind1 = XE.MVVM.bind(hydeduce, "majorHazardSourceShow", this, "show")
    },
    //删除按钮事件
    delDeduce() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTableManeuver.id);
      checkStatus.data.forEach(row => {
        layer.confirm("确定删除吗?", function(index) {
          let li = window._wait();
          setTimeout(() => {
            layer.msg("删除成功");
            that.dataTableManeuver.data.splice(
              that.dataTableManeuver.data.findIndex(
                item => item.key_id === row.key_id
              ),
              1
            );
            that.tableInit();
          }, 500);
          // that.deduce
          //   .delDeduce(row.key_id)
          //   .then(value => {
          //     layer.msg(value.msg);
          //     that.search();
          //   })
          //   .catch(err => {
          //     layer.msg(value.msg);
          //   });
        });
      });
    },
    // buttonbar btn's event end
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
      this.$parent.maneuverName = "预案1";
      this.$parent.maneuverId = 1;
      
      this.close();
    },
    clear() {}
  },
  filters: {},
  beforeDestroy() {
    this._disposers.forEach(e => e());
    this._disposers.length = 0;
  },
  computed: {
    //获取查询参数
    searchParams: {
      get() {
        let params = {
          // fk_org_id: this.orgSelected.id,
          // fk_org_part_id: this.orgPartSelected.id,
          // disaster_name: this.disaster.name,
          keyword: this.keyword,
          is_formal_plan: "0" //查的是推演0 不是 预案1
        };
        return params;
      }
    }
  },
  watch: {
    show(v) {
      if (v) {
        console.log(1);
        console.log(this);
        // this.$root.$refs.mainUI.topWindow(this.$refs.maneuverWindow);
      }
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
