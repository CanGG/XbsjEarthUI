// author 谢灿
// date 2020年6月8日
// description 预案编制面板
<template>
  <div style="width:100%;height:100%">
    <Window
      ref="maneuverWindow"
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :width="790"
      :height="500"
      :top="240"
      :left="450"
      :title="'预案编制-事故情景('+this.disaster.name+')-预案管理'"
      class="hy-mainwindow"
    >
      <div class="hy-btnbar">
        <!--<div class="hy-btn-date">
           <HyDatePicker :doneFunc="datePickerDone" ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
        </div>-->
        <input type="text" placeholder="模糊查询关键字" v-model="keyword" />
        <div>
          <button class="hy-btnbar-button" @click="search">查询</button>
        </div>
      </div>
      <div class="hy-btnbar" v-if="btnShow">
        <div>
          <button class="hy-btnbar-button" @click="addDeduce">
            <i class="layui-icon">&#xe654;</i>新建
          </button>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="delDeduce">
            <i class="layui-icon">&#xe640;</i>删除
          </button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" :id="dataTable.id" lay-filter="maneuverTable"></table>
      </div>
    </Window>
    <script type="text/html" id="maneuverBar">
  <a
    class="layui-btn layui-btn-primary layui-btn-xs"
    lay-event="maneuver_edit"
  >进行编制</a>
  <a
    class="layui-btn layui-btn-xs"
    lay-event="maneuver_approval"
  >审批</a>
  <a
    class="layui-btn layui-btn-danger layui-btn-xs"
    lay-event="maneuver_copy"
  >复制</a>
    </script>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import Deduce from "@controls/Deduce";

export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      title:undefined,
      disaster: {
        id: undefined,
        name: "",
        parts:"",
        level:"",
        levelInfo:"",
      },
      keyword: "",
      btnShow: true, //用来控制增删复制按钮的显隐
      lang: {},
      dataTable: {
        id: "hyManeuverTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "disaster_name", title: "事故情景", width:  90 },
          { field: "name", edit: "text", title: "预案名称", width: 100 },
          { field: "plan_author", title: "制作人", width: 83 },
          { field: "create_time", title: "创建时间", width: 95, sort: true },
          { field: "update_time", title: "修改时间", width: 95, sort: true },
          {
            title: "操作",
            width: 190,
            align: "center",
            toolbar: "#maneuverBar"
          }
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
  created() {
    let that = this;
    this.deduce = this.$root.$hyControls.deduce;
  },
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //监听行工具事件
    this.tableListeners();
    this.disaster.name = this.lang.title;
    this._disposers = this._disposers || [];
  },
  methods: {
    init(data){
      console.log(data);
      this.disaster = data;
    },
    //////table's func
    //表格初始化
    tableInit() {
      let that = this;
      this.dataTable.ins = layui.table.render({
        elem: "#" + that.dataTable.id,
        page: { theme: "#2A2A2A" }, //改page的样式
        // method: "get",
        where: that.searchParams,
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 330,
        cols: [that.dataTable.columns],
        data: that.dataTable.data,
        even: true
      });
    },
    //表格的各种监听
    tableListeners() {
      let that = this;
      //表头工具栏
      layui.table.on("tool(maneuverTable)", function(obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        console.log(layEvent);
        switch (layEvent) {
          case "maneuver_approval":
            layui.layer.confirm(
              "是否将本次推演设置为预案?",
              {
                title: "提示"
              },
              i => {
                layui.layer.msg("操作成功", {
                  time: 2000
                });
                that.dataTable.data[1] = that.dataTable.data[0];
                that.tableInit();
                layui.layer.close(i);
              }
            );
            break;
          case "maneuver_copy":
            layui.layer.confirm(
              "是否复制本预案?",
              {
                title: "提示"
              },
              i => {
                layui.layer.msg("操作成功", {
                  time: 2000
                });
                layui.layer.close(i);
              }
            );
            break;

          case "maneuver_edit":
            let maneuverStatusPanel = that.$root.$refs.mainUI.$refs.HyManeuverStatus[0];
            let disasterManagement = that.$root.$refs.mainUI.$refs.hyDisasterManagement[0];
            maneuverStatusPanel.show=true;
            let statusData = {
              maneuver:{
                id: data.key_id,
                name: data.name
              },
              disaster:{
                id: that.disaster.key_id,
                name: that.disaster.name,
                parts: that.disaster.fk_org_part_name,
                level: that.disaster.fk_disaster_grade_name,
                levelInfo: "",
              }
            }
            maneuverStatusPanel.init(statusData);
            that.show = false;
            disasterManagement.show = false;
            break;

          default:
            break;
        }
      });
      //单元格编辑
      //监听行单击事件
      layui.table.on("edit(test)", function(obj) {
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据  
        layui.layer.confirm(
          "是否将修改预案编制的名称?",
          {
            title: "提示"
          },
          i => {
            layui.layer.msg("操作成功", {
              time: 2000
            });
            layui.layer.close(i);
          }
        );
      });
    },
    //////button bar search start
    //搜索按钮事件
    search() {
      console.log(this.searchParams);
      let that = this;
      this.dataTable.ins.reload({
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
            that.dataTable.data.push({
              key_id: that.dataTable.data.length + 1,
              name: name,
              disaster_name: "油管失火",
              plan_author: "admin",
              create_time: new Date().Format("yyyy-MM-dd")
            });
            let json = that.$root.$earth.toJSON()
            window.localStorage.setItem(that.$root.$hyControls.orgID+'|'+that.disaster.id+'|'+that.dataTable.data.length, json);
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
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      if(checkStatus.data.length<1){
        layer.msg("请先选择一个预案!");
        return;
      }
      checkStatus.data.forEach(row => {
        layer.confirm("确定删除吗?", function(index) {
          let li = window._wait();
          setTimeout(() => {
            layer.msg("删除成功");
            that.dataTable.data.splice(
              that.dataTable.data.findIndex(item => item.key_id === row.key_id),
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
    }
    // buttonbar btn's event end
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
          disaster_name: this.disaster.name,
          keyword: this.keyword,
          is_formal_plan: "0" //查的是推演0 不是 预案1
        };
        return params;
      }
    }
  },
  watch: {
    show(v){
      if(v){
        console.log(1)
        console.log(this)
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

input::-webkit-input-placeholder {
  color: #ddd;
}
</style>
