// author 谢灿
// date 2020年2月28日
// description 演练面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatLayer="'center'"
      :width="1024"
      :minWidth="1024"
      :height="500"
      :title="lang.title"
      class="hy-mainwindow"
    >
      <div class="hy-btnbar">
        <!--<div class="hy-btn-date">
           <HyDatePicker :doneFunc="datePickerDone" ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
        </div>-->
        <input type="text" placeholder="请输入关键字" v-model="keyword" />
        <div style>
          <HyDropDownSelector
            ref="orgSelector"
            :groups="orgs"
            :showFn="listOrgs"
            :defaultName="'请选择查看单位'"
            v-on:selected="orgSelectChange"
          ></HyDropDownSelector>
        </div>
        <div style>
          <HyDropDownSelector
            ref="orgPartSelector"
            :groups="orgParts"
            :showFn="listOrgParts"
            :defaultName="'请选择单位部位'"
            v-on:selected="orgPartSelectChange"
          ></HyDropDownSelector>
        </div>
        <div style>
          <HyDropDownSelector
            ref="orgPartLevelSelector"
            :groups="orgPartLevels"
            :showFn="listOrgPartLevels"
            :defaultName="'请选择灾害等级'"
            v-on:selected="orgPartLevelSelectChange"
          ></HyDropDownSelector>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="search">查询</button>
        </div>
      </div>
      <div class="hy-btnbar" v-if="btnShow">
        <div>
          <button class="hy-btnbar-button" @click="addExercise">
            <i class="layui-icon">&#xe654;</i>新建
          </button>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="delExercise">
            <i class="layui-icon">&#xe640;</i>删除
          </button>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="copyExercise">
            <i class="layui-icon">&#xe630;</i>复制
          </button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" :id="dataTable.id" lay-filter="test"></table>
      </div>
    </Window>
    <script type="text/html" id="barDemo">
      <a
        class="layui-btn layui-btn-primary layui-btn-xs"
        lay-event="maneuverDetail"
      >查看</a>
      <a
        class="layui-btn layui-btn-xs"
        lay-event="maneuveEdit"
      >更新</a>
      <a
        class="layui-btn layui-btn-danger layui-btn-xs"
        lay-event="maneuveDel"
      >删除</a>
      <a
        class="layui-btn layui-btn-orange layui-btn-xs"
        lay-event="maneuvePlan"
      >设为预案</a>
    </script>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import Deduce from "@controls/Deduce";
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
      orgSelected: { id: "", name: "" },
      orgPartSelected: { id: "", name: "" },
      orgPartLevelSelected: { id: "", name: "" },
      keyword: "",
      orgPartLevels: [],
      orgParts: [],
      orgs: [],
      btnShow: true, //用来控制增删复制按钮的显隐
      engines: [],
      groups: [],
      models: [],
      lang: {},
      dataTable: {
        id: "hyManeuverTable",
        ins: {},
        columns: [
          { type: "checkbox", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "演练名称", width: 100 },
          { field: "fk_org_part_name", title: "重点部位", width: 120 },
          { field: "fk_disaster_grade_name", title: "灾害等级", width: 90 },
          { field: "plan_author", title: "制作人", width: 80 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true },
          { fixed: "right", align: "center", width: 225, toolbar: "#barDemo" }
        ]
      },
      langs: languagejs
    };
  },
  created() {
    //日期选择器初始化
    //监听行工具事件
    let that = this;
    this.deduce = new Deduce(this.$root);
    layui.table.on("tool(test)", function(obj) {
      //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data, //获得当前行数据
        layEvent = obj.event; //获得 lay-event 对应的值
      switch (layEvent) {
        case "maneuvePlan":
          layui.layer.confirm(
            "是否将本次推演设置为预案?",
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
        case "maneuverDetail":
          let hydeduceDetail =
            that.$root.$earthUI._comp.$refs.mainBarControl.$refs.hydeduce;
          hydeduceDetail.majorHazardSourceStatusShow = true;
          break;

        case "maneuverEdit":
          let hydeduceEdit =
            that.$root.$earthUI._comp.$refs.mainBarControl.$refs.hydeduce;
          hydeduceEdit.majorHazardSourceStatusShow = true;
          break;

        case "maneuverDel":
          layui.layer.confirm(
            "是否确认删除该推演信息?",
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

        default:
          break;
      }
      if (layEvent === "detail") {
        layer.msg("查看操作");
      } else if (layEvent === "del") {
        layer.confirm("真的删除行么", function(index) {
          obj.del(); //删除对应行（tr）的DOM结构
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if (layEvent === "edit") {
        layer.msg("编辑操作");
      }
    });
  },
  mounted() {
    let that = this;
    let planBasicInfo = new PlanBasicInfo(this.$root);
    //表格初始化
    this.dataTable.ins = layui.table.render({
      elem: "#" + that.dataTable.id,
      page: { theme: "#2A2A2A" }, //改page的样式
      url: planBasicInfo.server + planBasicInfo.path,
      method: "get",
      where: that.searchParams,
      response: {
        statusCode: 200 //规定成功的状态码，默认：0
      },
      // contentType: "application/json",
      // headers: {token: 'sasasas'},
      height: 330,
      cols: [that.dataTable.columns],
      data: [],
      even: true
    });

    this._disposers = this._disposers || [];
    //绑定显隐
    this._disposers.push(
      XE.MVVM.bind(
        this,
        "orgSelected.id",
        this.$refs.orgSelector,
        "selectedGroup.id"
      ),
      XE.MVVM.bind(
        this,
        "orgSelected.name",
        this.$refs.orgSelector,
        "selectedGroup.name"
      ),
      XE.MVVM.bind(
        this,
        "orgPartSelected.id",
        this.$refs.orgPartSelector,
        "selectedGroup.id"
      ),
      XE.MVVM.bind(
        this,
        "orgPartSelected.name",
        this.$refs.orgPartSelector,
        "selectedGroup.name"
      ),
      XE.MVVM.bind(
        this,
        "orgPartLevelSelected.id",
        this.$refs.orgPartLevelSelector,
        "selectedGroup.id"
      ),
      XE.MVVM.bind(
        this,
        "orgPartLevelSelected.name",
        this.$refs.orgPartLevelSelector,
        "selectedGroup.name"
      )
    );
  },
  methods: {
    //button bar search start
    search() {
      console.log(this.searchParams);
      let that = this;
      this.dataTable.ins.reload({
        where: that.searchParams
      });
      //获取参数
    },
    listOrgs() {
      let that = this;
      if (that.orgs.length === 0) {
        let lIndex = this.deduce._wait("正在加载单位...");
        setTimeout(() => {
          that.orgs = [
            {
              id: 121,
              name: "测试单位"
            }
          ];
          layer.close(lIndex);
        }, 1000);
      }
    },
    listOrgParts() {
      let that = this;
      let orgSelectedId = this.orgSelected.id;
      if (that.orgParts.length === 0) {
        if (!!orgSelectedId) {
          this.deduce
            .listMajorHazardSources(this.orgSelected.id, "正在加载单位部位")
            .then(value => {
              that.orgParts = value;
            });
        } else {
          layer.msg("请先选择单位!");
        }
      }
    },
    listOrgPartLevels() {
      let that = this;
      let orgPartSelectedId = this.orgPartSelected.id;
      if (that.orgPartLevels.length === 0) {
        if (!!orgPartSelectedId) {
          this.deduce
            .listPlanDisasterGradeByOrgPart(this.orgPartSelected.id)
            .then(value => {
              that.orgPartLevels = value;
            });
        } else {
          layer.msg("请先选择单位部位!");
        }
      }
    },
    orgSelectChange(group) {
      this.orgSelected = group;
      this.orgParts = [];
      this.orgPartSelected = { id: "", name: "" };
      this.orgPartLevels = [];
      this.orgPartLevelSelected = { id: "", name: "" };
    },
    orgPartSelectChange(group) {
      this.orgPartSelected = group;
      this.orgPartLevels = [];
      this.orgPartLevelSelected = { id: "", name: "" };
    },
    orgPartLevelSelectChange(group) {
      this.orgPartLevelSelected = group;
    },
    //button bar search end

    //buttonbar btn's event start
    addExercise(){
      console.log('新建事件点!');
      console.log(this);
      //关闭本面板
      this.show = false;
      //弹出事件点面板
      this.$root.$earthUI._hyMajorHazardSource.show=true;
      // this.unbind1 = XE.MVVM.bind(hydeduce, "majorHazardSourceShow", this, "show")
    },
    delExercise(){

    },
    copyExercise(){

    }
    // buttonbar btn's event end
  },
  filters: {},
  beforeDestroy() {
    this._disposers.forEach(e => e());
    this._disposers.length = 0;
  },
  computed: {
    searchParams: {
      get() {
        let params = {
          fk_org_id: this.orgSelected.id,
          fk_org_part_id: this.orgPartSelected.id,
          fk_disaster_grade_id: this.orgPartLevelSelected.id,
          keyword: this.keyword,
          is_formal_plan: "0" //查的是推演0 不是 预案1
        };
        return params;
      }
    }
  },
  watch: {}
};
</script>
<style scoped>
.hy-mainwindow {
  z-index: 10;
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
