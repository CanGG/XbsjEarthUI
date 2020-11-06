// author 谢灿
// date 2020年6月8日
// update 2020年9月24日 完成接口功能 谢灿
// description 预案编制面板
<template>
  <div style="width:100%;height:100%">
    <Window
      ref="maneuverWindow"
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :width="880"
      :height="500"
      :top="190"
      :left="450"
      :floatLayer="'center'"
      :offset="40"
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
          <button class="hy-btnbar-button" @click="editDeduce">
            <i class="layui-icon">&#xe654;</i>修改
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
    
    <PlanForm ref='planForm'></PlanForm>
    <script type="text/html" id="maneuverBar">
      <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="maneuver_edit">进行编制</a>
      <a class="layui-btn layui-btn-xs" lay-event="maneuver_approval">审批</a>
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="maneuver_copy">复制</a>
    </script>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import Deduce from "@controls/Deduce";
import PlanForm from "./form";
export default {
  props: {
    // getBind: Function
  },
  components:{
    PlanForm
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      title: undefined,
      disaster: {
      },
      keyword: "",
      btnShow: true, //用来控制增删复制按钮的显隐
      lang: {},
      dataTable: {
        id: "hyManeuverTable",
        ins: {},
        columns: [
          { type: "radio"},
          { field: "key_id", title: "编号", width: 60 },
          { field: "name", edit: "text", title: "预案名称", width: 100 },
          { field: "plan_type",  title: "预案类型", width: 90},
          { field: "plan_status", title: "预案状态", width: 90},
          { field: "priority",  title: "优先级", width: 90},
          { field: "plan_author", title: "制作人", width: 83 },
          // { field: "create_time", title: "创建时间", width: 95, sort: true },
          // { field: "update_time", title: "修改时间", width: 95, sort: true },
          { title: "操作", width: 190, align: "center", toolbar: "#maneuverBar" }
        ],
      },
      langs: languagejs,
      maneuver_id:-1
    };
  },
  created() {
    let that = this;
    console.log(that);
    this.deduce = this.$root.$hyControls.deduce;
  },
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //获取表单
    this.planForm = this.$refs.planForm;
    //监听行工具事件
    this.tableListeners();
    this._disposers = this._disposers || [];

    layui.form.render();
  },
  methods: {
    init(data){
      this.$set(this,'disaster',data);
    },
    //////table's func
    //表格初始化
    tableInit() {
      let that = this;
      this.dataTable.ins = layui.table.render({
        elem: "#" + that.dataTable.id,
        id: that.dataTable.id,
        page: {
          theme: "#2A2A2A",
          limit:10,
          curr:1,
        }, //改page的样式
        method: "get",
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        height: 330,
        cols: [that.dataTable.columns],
        // data: that.dataTable.data,
        even: true
      });
    },
    //表格的各种监听
    tableListeners() {
      let that = this;
      //单元格编辑
      //监听行单击事件
      layui.table.on("edit(maneuverTable)", function(obj) {
        var value = obj.value //得到修改后的值
        ,data = obj.data //得到所在行所有键值
        ,field = obj.field; //得到字段
        layer.confirm("是否将修改预案编制的名称?", {title: "提示"},
          i => {
            that.$root.$hyServers.planBasicInfo.update(data.key_id,{name:value}).then(result=>{
              layer.msg(result.msg);
              layer.close(i);
            })
          }
        );
      });
      //表头工具栏
      layui.table.on("tool(maneuverTable)", function(obj) {
        console.log(obj);
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        switch (layEvent) {
          case "maneuver_approval":
            layui.layer.confirm(
              `是否审核预案"${data.name}"?`,
              {
                title: "提示"
              },
              i => {
                window._wait();
                that.$root.$hyServers.planBasicInfo.update(data.key_id,{plan_status:1}).then(result=>{
                  layer.msg(result.msg);
                  if(result.code === 200){
                    that.search();
                  }
                })
                layer.close(i);
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
                window._wait();
                that.$root.$hyServers.planBasicInfo.copy(data.key_id).then(result=>{
                  console.log(result);
                  layer.msg(result.msg);
                  if(result.code === 200){
                    that.search();
                  }
                })
                layui.layer.close(i);
              }
            );
            break;

          case "maneuver_edit":
            ////显示预案状态
            that.config.scene.key_id = data.key_id;
            that.maneuver_id = data.key_id;
            let statusData = [
              {
                title: "当前单位",
                content: that.config.org.name
              }, 
              {
                title: "灾害名称",
                content: that.disaster.name,
              }, 
              {
                title: "灾害部位",
                content: that.disaster.fk_org_part_name,
              }, 
              {
                title: "灾害等级",
                content: that.disaster.disaster_level
              },
              {
                title: "当前预案",
                content: data.name
              }, 
            ];
            let hyStatusDisplay = that.$parent.$refs["hyStatusDisplay"];
                hyStatusDisplay.hyStatusDisplayData = statusData;
                hyStatusDisplay.show = true;

            ////隐藏预案管理
            that.show = false;

            ////隐藏事故管理
            let disasterManagement = that.$root.$refs.mainUI.$refs.hyDisasterManagement[0];
            disasterManagement.show = false;

            ////显示保存/退出按钮
            let hyDeduce = that.$parent.$refs["mainBarControl"].$refs["hydeduce"];
            hyDeduce.establishmentButtonShow = true;
            // this.$root.$hyControls

            //从数据库中加载场景
            window._wait();
            that.$root.$hyServers.planBasicInfo.get(data.key_id).then(result=>{
              layer.msg(result.msg);
              if(result.code === 200 && !!result.data.content){
                that.$root.$earth.xbsjFromJSON(JSON.parse(result.data.content));
              }
            })
            ////显示灾害部位
            that.showDisasterAreas(that.disaster.key_id);

            //显示救援力量面板
            that.$root.$refs.mainUI.$refs.hyCombatPower[0].show =true

            break;
          default:
            break;
        }
      });
    },
    //显示灾害部位
    //@param int id 传入事故情景id
    showDisasterAreas(id){
      console.log(`事故id${id}`);
      if(window.disasterAreas){
        window.disasterAreas.show = true;
        return false;
      }
      window._wait("正在获取灾害部位...")
      let viewer = this.$root.$earth.czm.viewer;
      this.$root.$hyServers.planDisaster.get(id).then(result=>{
        layer.msg(result.msg);
        if(result.code === 200){
          let parts = result.data.orgParts;
          let length = parts.length;

          let parent = viewer.entities.add(new Cesium.Entity());
          
          for (let i = 0; i < length; i++) {
            let value = parts[i];
            viewer.entities.add({
              parent: parent,
              position: Cesium.Cartesian3.fromDegrees(
                value.longitude,
                value.latitude,
                value.height+ 30,
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
        }
      })
    },
    //////button bar search start
    //搜索按钮事件
    search() {
      let that = this;
      let where = {};
      where.fk_disaster_id = that.disaster.key_id;
      // where.is_formal_plan = 0;
      where.keyword = that.keyword;
      this.dataTable.ins.reload({
        url: that.$root.$hyServers.planBasicInfo.server + that.$root.$hyServers.planBasicInfo.path,
        where: where,
      });
      //获取参数
    },
    //添加按钮事件
    addDeduce() {
      let that = this;
      if (this.planForm.show) this.planForm.show = false;
      this.planForm.show = true;
    },
    //修改按钮事件
    editDeduce(){
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      if (checkStatus.data.length === 0) {
        layer.msg("请先选中一个预案!");
        return;
      }
      if (this.planForm.show) this.planForm.show = false;
      checkStatus.data.forEach(row => {
        //其实应该只要传id就够了
        //传了ID后在form中做id的监听,假如disasterId改变则调用API加载数据并显示
        console.log(row);
        // that.planForm.plan.key_id = row.key_id;
        // that.planForm.plan.priority = row.priority;
        // that.planForm.plan
        this.$set(that.planForm, "plan", row);
        console.log(that.planForm);
        // that.planForm.plan= row;
      })
      this.planForm.show = true;
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
          that.$root.$hyServers.planBasicInfo.delete(row.key_id).then(result=>{
            layer.msg(result.msg);
            if(result.code === 200){
              that.search();
            }
          });
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
  },
  watch: {
    show(v){
      if(v){
        this.search();
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
