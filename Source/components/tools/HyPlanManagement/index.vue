// author 谢灿
// date 2020年6月11日
// description 演练管理面板
<template>
<div style="width:100%;height:100%">
  <Window :footervisible="false" @cancel="show=false" v-show="show" :width="908" :top="190" :left="400" :height="500" :floatLayer="'center'" :title="lang.title" class="hy-mainwindow">
    <div class="hy-btnbar">
      <input type="text" placeholder="请输入情景名称" v-model="searchDisasterName" />
      <input type="text" placeholder="请输入预案名称" v-model="searchBasicInfoName" />
      <input type="text" placeholder="请输入演练名称" v-model="searchPlanName" />
      <div>
        <button class="hy-btnbar-button" @click="tableReload">查询</button>
      </div>
    </div>
    <div class="hy-btnbar">
      <div>
        <button class="hy-btnbar-button" @click="addPlan">
          <i class="layui-icon">&#xe654;</i>新建
        </button>
      </div>
      <div>
        <button class="hy-btnbar-button" @click="editPlan">
          <i class="layui-icon">&#xe640;</i>修改
        </button>
      </div>
      <div>
        <button class="hy-btnbar-button" @click="delPlan">
          <i class="layui-icon">&#xe640;</i>删除
        </button>
      </div>
    </div>
    <!-- 窗体内容区域 -->
    <div class="hy-content">
      <table class="layui-hide" :id="dataTable.id" lay-filter="planTable"></table>
    </div>
  </Window>
  <!-- 表单 -->
  <PlanForm ref="planForm"></PlanForm>
  <PlanTaskInfo ref="planTaskInfo"></PlanTaskInfo>
  <PlanAssess ref="planAssess"></PlanAssess>
  <script type="text/html" id="planBar">
    <!-- <a
    class="layui-btn layui-btn-normal layui-btn-xs"
    lay-event="showMeneuver"
  >查看预案</a>-->
  <a class="layui-btn layui-btn-xs" lay-event="startPlan">开始演练</a>
  <!-- <a
    class="layui-btn layui-btn-warm layui-btn-xs"
    lay-event="showPlanTask"
  >查看任务</a>
  <a
    class="layui-btn layui-btn-danger layui-btn-xs"
    lay-event="showAssess"
  >查看评估</a> -->
  </script>
</div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import PlanBasicInfo from "@services/PlanBasicInfo";
import PlanForm from "./form";
import PlanTaskInfo from "./taskInfo";
import PlanAssess from "./assess";

export default {
  props: {
    // getBind: Function
  },
  components: {
    PlanForm,
    PlanTaskInfo,
    PlanAssess,
  },
  data() {
    return {
      show: false,
      keyword: "",
      searchDisasterName: "",
      searchBasicInfoName: "",
      searchPlanName: "",
      btnShow: true, //用来控制增删复制按钮的显隐
      lang: {},
      dataTable: {
        id: "hyPlanTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "disaster_name", title: "情景名称", width: 90 },
          { field: "basic_info_name", title: "预案名称", width: 90 },
          { field: "name", title: "演练名称", width: 90 },
          { field: "author", title: "制作人", width: 83 },
          { field: "group", title: "演练小组", width: 150, sort: true },
          { field: "create_date", title: "创建时间", width: 155, sort: true },
          {
            title: "操作",
            width: 120,
            align: "center",
            toolbar: "#planBar",
          },
        ],
        data: [
          {
            key_id: 1,
            fk_org_id: 121,
            disasterName: "情景名称1",
            maneuverName: "预案名称1",
            name: "演练1",
            plan_author: "admin",
            create_time: null,
            update_time: null,
          },
        ],

      },
      langs: languagejs,
    };
  },
  created() {
    let that = this;
  },
  mounted() {
    console.log(this);
    let that = this;
    //表格初始化
    this.tableInit();

    //表格监听初始化
    this.tableListeners();

    //表单
    this.planForm = this.$refs.planForm;
    //任务面板
    // this.planTaskInfo = this.$refs.planTaskInfo;
    //评分面板
    this.planAssess = this.$refs.planAssess;

    this._disposers = this._disposers || [];
  },
  methods: {   
    //表格的初始化事件
    tableInit() {
      let that = this;
      let planBasicInfo = new PlanBasicInfo(this.$root);
      //表格初始化
      this.dataTable.ins = layui.table.render({
        elem: "#" + that.dataTable.id,
        page: { theme: "#2A2A2A" }, //改page的样式
        url: planBasicInfo.server + "v2/plan/exercises",
        // method: "get",
        // where: that.searchParams,
        response: {
          statusCode: 200, //规定成功的状态码，默认：0
        },
        // contentType: "application/json",
        // headers: {token: 'sasasas'},
        height: 330,
        cols: [that.dataTable.columns],
        data: that.dataTable.data,
        even: true,
      });
    },

    //表格重载
    tableReload(){
      let that = this;
      let param = {
          basic_info_name:that.searchBasicInfoName,
          plan_disaster_name:that.searchDisasterName,
          keyword:that.searchPlanName
        };
      console.log(param);
      that.dataTable.ins.reload({
        where: {
          basic_info_name:that.searchBasicInfoName,
          plan_disaster_name:that.searchDisasterName,
          keyword:that.searchPlanName
        } //设定异步数据接口的额外参数
        //,height: 300
      });
    },


    //表格的所有监听事件
    tableListeners() {
      let that = this;
      //监听行工具事件
      layui.table.on("tool(planTable)", function (obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        switch (layEvent) {
          case "startPlan":
            //开始推演

            //设置演练全局配置
            that.$root.$hyControls.plan.id = 1;  
            //初始状态0
            that.$root.$hyControls.plan.status = 0;

            //加载场景
            let json = window.localStorage.getItem("121|1|1");
            if (json) {
              var jc = JSON.parse(json);
              that.$root.$earth.xbsjFromJSON(jc);
            }
            that.show = false;

            //显示灾害部位
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

          case "showPlanTask":
            //显示预案任务

            //获取当前行id传入planTaskInfo, planTaskInfo根据id进行初始化
            // that.planTaskInfo.show = true;
            window.open(this.$root.$hyControls.basePath + "/plan_rescue_pc/earthui_h5/pages/task.html",
              "_blank",
              "left=262,top=250,height=300,width=500,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes"
            );
            break;

          case "showAssess":
            //显示评估
            // that.planAssess.show = true;
            window.open(this.$root.$hyControls.basePath + "/plan_rescue_pc/earthui_h5/pages/assessment.html",
              "_blank",
              "left=262,top=250,height=300,width=500,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes"
            );

            break;

          default:
            break;
        }
      });
    },
    showManeuverManagement(row) {
      let hyManeuverManagement = this.$root.$refs.mainUI.$refs
        .hyManeuverManagement[0];
      hyManeuverManagement.init(row);
      hyManeuverManagement.show = true;
    },
    //button bar search start
    search() {
      console.log(this.searchParams);
      let that = this;
      this.dataTable.ins.reload({
        where: that.searchParams,
      });
      //获取参数
    },
    //显示灾害部位
    showDisasterAreas() {
      if (window.disasterAreas) {
        window.disasterAreas.show = true;
        return false;
      }
      let viewer = this.$root.$earth.czm.viewer;
      //显示灾害部位
      let elements = [
        {
          key_id: 1,
          longitude: 117.219364,
          latitude: 34.360066,
          height: 27,
        },
        {
          key_id: 2,
          longitude: 117.219673,
          latitude: 34.360037,
          height: 27,
        },
      ];
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
            image:
              "https://cesium-plan-1254117419.cos.ap-shanghai.myqcloud.com/image/disaster_areas/fire_point.png",
            width: 50,
            height: 50,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直位置
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              1000
            ), //设置显示范围
          },
          id: value.key_id,
        });
      }
      window.disasterAreas = parent;
    },
    //buttonbar btn's event start
    addPlan() {
      console.log("新建事件点!");
      console.log(this);
      if (this.planForm.show) this.planForm.show = false;
      this.planForm.show = true;
      //关闭本面板
      // this.show = false;
      //弹出事件点面板
      // this.$root.$earthUI._hyMajorHazardSource.show = true;
      // this.unbind1 = XE.MVVM.bind(hydeduce, "majorHazardSourceShow", this, "show")
    },
    editPlan() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      if (checkStatus.data.length === 0) {
        layer.msg("请先选中一个事故情景!");
        return;
      }
      checkStatus.data.forEach((row) => {
        //其实应该只要传id就够了
        //传了ID后在form中做id的监听,假如PlanId改变则调用API加载数据并显示
        console.log(row);
        that.planForm.planId = row.key_id;
        that.planForm.planName = row.name;
        that.planForm.maneuverName = row.maneuverName;
        that.planForm.maneuverId = row.maneuverId || 1;
        that.planForm.leadingGroup = row.group;
        //选择part方法 传入 id 数组
      });
      if (this.planForm.show) this.planForm.show = false;
      this.planForm.show = true;
    },

    //删除演练
    delPlan() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      checkStatus.data.forEach((row) => {
        layer.confirm("确定删除吗?", function (index) {
          let li = window._wait();

          this.$root.$hyServers.PlanManagement.del(row.key_id).then(result=>{
            console.log(result);
            if(result.code === 200){
                layer.msg("删除成功");

                that.tableReload();
            }
            layer.msg(result.msg);
          })
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
  },
  filters: {},
  beforeDestroy() {
    this._disposers.forEach((e) => e());
    this._disposers.length = 0;
  },
  computed: {
    searchParams: {
      get() {
        let params = {
          disasterName: this.searchPlanName,
          maneuverName: this.searchManeuverName,
          planName: this.searchPlanName,
          is_formal_plan: "1", //查的是推演0 不是 预案1
        };
        return params;
      },
    },
  },
  watch: {
    show(v) {
      if (v) console.log(this);
    },
  },
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

.hy-btnbar>* {
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
