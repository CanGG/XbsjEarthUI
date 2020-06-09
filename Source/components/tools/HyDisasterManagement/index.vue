// author 谢灿
// date 2020年6月5日
// description 灾害情景面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatLayer="'center'"
      :width="1020"
      :minWidth="1020"
      :height="500"
      :title="lang.title"
      class="hy-mainwindow"
    >
      <div class="hy-btnbar">
        <!--<div class="hy-btn-date">
           <HyDatePicker :doneFunc="datePickerDone" ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
        </div>-->
        <input type="text" placeholder="模糊查询关键字" v-model="keyword" />
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
          <button class="hy-btnbar-button" @click="addDisaster">
            <i class="layui-icon">&#xe654;</i>新建
          </button>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="editDisaster">
            <i class="layui-icon">&#xe640;</i>修改
          </button>
        </div>
        <div>
          <button class="hy-btnbar-button" @click="delDisaster">
            <i class="layui-icon">&#xe640;</i>删除
          </button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" :id="dataTable.id" lay-filter="disasterTable"></table>
      </div>
    </Window>
      <!-- 表单 -->
    <DisasterForm ref="disasterForm"></DisasterForm>
    <script type="text/html" id="disasterBar">
    <a
      class="layui-btn layui-btn-orange layui-btn-xs"
      lay-event="maneuverPlan"
    >预案编制</a>
    </script>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import PlanBasicInfo from "@services/PlanBasicInfo";
import DisasterForm from "./form";
export default {
  props: {
    // getBind: Function
  },
  components:{
    DisasterForm
  },
  data() {
    return {
      show: false,
      orgPartSelected: { id: "", name: "" },
      orgPartLevelSelected: { id: "", name: "" },
      keyword: "",
      orgPartLevels: [],
      orgParts: [],
      btnShow: true, //用来控制增删复制按钮的显隐
      lang: {},
      dataTable: {
        id: "hyDisasterTable",
        ins: {},
        columns: [
          { type: "radio", fixed: "left" },
          { field: "key_id", title: "序号", width: 60 },
          { field: "name", title: "情景名称", width: 160 },
          { field: "fk_org_part_name", title: "灾害部位", width: 160 },
          { field: "fk_disaster_grade_name", title: "灾害等级", width: 100 },
          { field: "plan_author", title: "制作人", width: 83 },
          { field: "create_time", title: "创建时间", width: 140, sort: true },
          { field: "update_time", title: "修改时间", width: 140, sort: true },
          {
            title: "操作",
            width: 110,
            align: "center",
            toolbar: "#disasterBar"
          }
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
      langs: languagejs
    };
  },
  created() {
    let that = this;
  },
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //表格监听初始化
    this.tableListeners();

    //表单
    this.disasterForm = this.$refs.disasterForm;
    this._disposers = this._disposers || [];
    //绑定显隐
    this._disposers.push(
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
    //表格的初始化事件
    tableInit() {
      let that = this;
      let planBasicInfo = new PlanBasicInfo(this.$root);
      //表格初始化
      this.dataTable.ins = layui.table.render({
        elem: "#" + that.dataTable.id,
        page: { theme: "#2A2A2A" }, //改page的样式
        // url: planBasicInfo.server + planBasicInfo.path,
        // method: "get",
        where: that.searchParams,
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        // contentType: "application/json",
        // headers: {token: 'sasasas'},
        height: 330,
        cols: [that.dataTable.columns],
        data: that.dataTable.data,
        even: true
      });
    },
    //表格的所有监听事件
    tableListeners() {
      let that = this;
      //监听行工具事件
      layui.table.on("tool(disasterTable)", function(obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        switch (layEvent) {
          case "maneuverPlan":
            that.showManeuverManagement(data);
            that.show=false;
            break;

          default:
            break;
        }
      });
    },
    showManeuverManagement(row){
      let hyManeuverManagement = this.$root.$refs.mainUI.$refs.hyManeuverManagement[0];
      hyManeuverManagement.init(row);
      hyManeuverManagement.show=true;
    },
    //button bar search start
    search() {
      console.log(this.searchParams);
      let that = this;
      this.dataTable.ins.reload({
        where: that.searchParams
      });
      //获取参数
    },
    listOrgParts() {
      let that = this;
      // let orgSelectedId = this.orgSelected.id;
      if (that.orgParts.length === 0) {
        let i = window._wait("正在加载单位部位");
        setTimeout(() => {
          layer.close(i);
          that.orgParts = [
            {
              id: 1,
              name: "甲类油罐A"
            },
            {
              id: 2,
              name: "甲类仓库11"
            }
          ];
        }, 500);
        // if (!!orgSelectedId) {
        //   this.deduce
        //     .listMajorHazardSources(this.orgSelected.id, "正在加载单位部位")
        //     .then(value => {
        //       that.orgParts = value;
        //     });
        // } else {
        //   layer.msg("请先选择单位!");
        // }
      }
    },
    listOrgPartLevels() {
      let that = this;
      // let orgPartSelectedId = this.orgPartSelected.id;
      if (that.orgPartLevels.length === 0) {
        let i = window._wait("正在加载灾害等级");
        setTimeout(() => {
          layer.close(i);
          that.orgPartLevels = [
            {
              id: 1,
              name: "一级"
            },
            {
              id: 2,
              name: "二级"
            }
          ];
        }, 500);
        // if (!!orgPartSelectedId) {
        //   this.deduce
        //     .listPlanDisasterGradeByOrgPart(this.orgPartSelected.id)
        //     .then(value => {
        //       that.orgPartLevels = value;
        //     });
        // } else {
        //   layer.msg("请先选择单位部位!");
        // }
      }
    },
    orgPartSelectChange(group) {
      this.orgPartSelected = group;
      // this.orgPartLevels = [];
      // this.orgPartLevelSelected = { id: "", name: "" };
    },
    orgPartLevelSelectChange(group) {
      this.orgPartLevelSelected = group;
    },
    //button bar search end

    //buttonbar btn's event start
    addDisaster() {
      console.log("新建事件点!");
      console.log(this);
      this.disasterForm.show = true;
      //关闭本面板
      // this.show = false;
      //弹出事件点面板
      // this.$root.$earthUI._hyMajorHazardSource.show = true;
      // this.unbind1 = XE.MVVM.bind(hydeduce, "majorHazardSourceShow", this, "show")
    },
    editDisaster(){
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      checkStatus.data.forEach(row => {
        //其实应该只要传id就够了
        //传了ID后在form中做id的监听,假如disasterId改变则调用API加载数据并显示
        console.log(row);
        that.disasterForm.disasterId = row.key_id;
        that.disasterForm.disasterName = row.name;
        that.disasterForm.orgPartLevelSelected = {id: row.fk_disaster_grade_id||123, name:row.fk_disaster_grade_name,description:""}
        //选择part方法 传入 id 数组
        that.disasterForm.selectParts([]);
      })
      this.disasterForm.show = true;
    },
    delDisaster() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
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
    },
    copyDisaster() {}
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
          fk_org_id: this.$root.$hyControls.orgID,
          fk_org_part_id: this.orgPartSelected.id,
          fk_disaster_grade_id: this.orgPartLevelSelected.id,
          keyword: this.keyword,
          is_formal_plan: "0" //查的是推演0 不是 预案1
        };
        return params;
      }
    }
  },
  watch: {
    show(v){
      if(v)console.log(this);
    }
  }
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
