// author 谢灿
// date 2020年6月16日
// description 调度-选择预案面板
<template>
  <div style="width:100%;height:100%">
    <Window
      ref="dispatchManeuverWindow"
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :width="1010"
      :minWidth="1010"
      :height="460"
      :floatLayer="'center'"
      :top="240"
      :left="450"
      :title="'调度-选择预案'"
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
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" :id="dataTable.id" lay-filter="dispatchManeuverTable"></table>
      </div>
    </Window>
    <script type="text/html" id="dispatchManeuverBar">
  <a
    class="layui-btn layui-btn-xs"
    lay-event="maneuver_choice"
  >选择</a>

  <a
    class="layui-btn layui-btn-xs"
    lay-event="view_task"
  >查看任务</a>
    </script>
  </div>
</template>

<script>
import languagejs from "./index_locale";
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
        id: "hyDispatchManeuverTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "disaster_name", title: "事故情景", width: 160 },
          { field: "name", edit: "text", title: "预案名称", width: 160 },
          { field: "plan_author", title: "制作人", width: 83 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true },
          {
            title: "操作",
            width: 200,
            align: "center",
            toolbar: "#dispatchManeuverBar"
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
            key_id: 1,
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
      layui.table.on("tool(dispatchManeuverTable)", function(obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        
        switch (layEvent) {
          case "maneuver_choice":
            let json = window.localStorage.getItem('121|1|1');
            if(json){
              var jc = JSON.parse(json);
              that.$root.$hyControls.fighting.maneuverId = 1;
              that.$root.$earth.xbsjFromJSON(jc);
              that.show = false;
            }
            that.showDisasterAreas();
            //下达作战任务
            that.$root.$hyControls.iov
              .assignCombatMissions()
              .then((data) => {
                let clientIds = data.client_ids;
                let ws = new WebSocket("ws://106.55.252.159:8888");
                ws.onopen = () => {
                  console.log("webSocket连接成功");
                  console.log(data);
                  for (let i = 0; i < clientIds.length; i++) {
                    if (clientIds[i]) {
                      let message = {
                        type: "combat_mission",
                        data: {
                          client_id: clientIds[i],
                        },
                      };
                      ws.send(JSON.stringify(message));
                    }
                  }
                };
              });
            break;
          case "view_task":
            window.open(this.$root.$hyControls.basePath + "/earthui_h5/pages/task.html", "_blank", "left=262,top=250,height=300,width=500,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
            break;
          default:
            break;
        }
      });
      //单元格编辑
      //监听行单击事件
      layui.table.on("edit(test)", function(obj) {
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
    //显示灾害部位
    showDisasterAreas(){
      if(window.disasterAreas){
        window.disasterAreas.show = true;
        return false;
      }      
      let viewer = this.$root.$earth.czm.viewer;
            //显示灾害部位
            let elements = [{
              "key_id":1,
              "longitude":117.219364,
              "latitude":34.360066,
              "height":27
            },
            {
              "key_id":2,
              "longitude":117.219673,
              "latitude":34.360037,
              "height":27
            }];
            let length = elements.length;

            let parent = viewer.entities.add(new Cesium.Entity());
            
            for (let i = 0; i < length; i++) {
              let value = elements[i];
              viewer.entities.add({
                parent: parent,
                position: Cesium.Cartesian3.fromDegrees(
                  value.longitude,
                  value.latitude,
                  value.height
                ),
                billboard: {
                  //图标
                  image: "https://cesium-plan-1254117419.cos.ap-shanghai.myqcloud.com/image/disaster_areas/fire_point.png",
                  width: 50,
                  height: 50,
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直位置
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    1000
                  ) //设置显示范围
                },
                id: value.key_id
              });
            }
            window.disasterAreas = parent;
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
