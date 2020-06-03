// author 谢灿
// date 2020年2月28日
// description 预案查询面板
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
        <div class="hy-btn-date">
          <HyDatePicker :doneFunc="datePickerDone" ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
        </div>
        <input type="text" id="btn_keyword" placeholder="输入关键字" />
        <div style>
          <HyDropDownSelector
            id="btn_type_selector"
            :defaultName="'请选择查看类型'"
            :changeHandler="typeSelectChange"
          ></HyDropDownSelector>
        </div>
        <div style>
          <HyDropDownSelector
            id="btn_part_selector"
            :defaultName="'请选择重点部位'"
            :changeHandler="partSelectChange"
          ></HyDropDownSelector>
        </div>
        <div style>
          <HyDropDownSelector
            id="btn_level_selector"
            :defaultName="'请选择灾害等级'"
            :changeHandler="levelSelectChange"
          ></HyDropDownSelector>
        </div>
        <div>
          <button class="hy-btnbar-button">查询</button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" :id="tableId" lay-filter="hyPlanTableFilter"></table>
      </div>
    </Window>
    <script type="text/html" id="hyPlanTableBtnbar">
  <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
    </script>
    <planInfo ref="planInfo"></planInfo>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
<<<<<<< HEAD
import "layui-src";
import "layui-src/dist/css/layui.css";
=======
>>>>>>> SafeChina
import planInfo from "./planInfo";

export default {
  components: {
    planInfo
  },
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      selectedGroup: {
        id: "",
        name: ""
      },
      btnShow: true, //用来控制增删复制按钮的显隐
      planinfoShow: false,
      engines: [],
      groups: [],
      models: [],
      lang: {},
      tableId: "hyPlanManagement",
      langs: languagejs,
      query_data: null
    };
  },
  created() {
    //日期选择器初始化
    // console.log("??????");
  },
  mounted() {
    //第一个实例
    // console.log(this.tableId);
    layui.table.render({
      elem: "#" + this.tableId,
      page: true,
      height: 360,
      cols: [
        [
          //标题栏
          { type: "checkbox", fixed: "left" },
          { field: "sort", title: "序号", width: 60 },
          { field: "name", title: "演练名称", width: 100 },
          { field: "part", title: "重点部位", width: 120 },
          { field: "level", title: "灾害等级", width: 90 },
          { field: "creater", title: "制作人", width: 80 },
          { field: "createTime", title: "创建时间", width: 140, sort: true },
          { field: "modifyTime", title: "修改时间", width: 140, sort: true },
          { fixed: "right", align: "center", width: 225, toolbar: "#hyPlanTableBtnbar" }
        ]
      ],
      data: [
        {
          id: "1",
          sort: "1",
          name: "演练名称",
          part: "甲类仓库",
          level: "I类",
          creater: "张三",
          createTime: "2020-3-07 12:39",
          modifyTime: "2020-3-17 12:39"
        }
      ],
      //,skin: 'line' //表格风格
      //,page: true //是否显示分页
      //,limits: [5, 7, 10]
      //,limit: 5 //每页默认显示的数量
      even: true
    });

    // XE.MVVM.bind(this,planInfoShow, )
    this.tableListeners();
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    // //绑定显隐
    // this._disposers.push(
    //   XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
    // );

    // console.log(this);
  },
  methods: {
    typeSelectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
    },
    partSelectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
    },
    levelSelectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
    },
    datePickerDone(date) {
      layer.msg(date);
    },
    tableListeners() {
      let that = this;
      //监听行工具事件
      layui.table.on("tool(hyPlanTableFilter)", function(obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        console.log(obj);
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === "detail") {
          that.query_data = data;
          layer.msg("查看操作");
          that.$refs.planInfo.show = true;
          that.$refs.planInfo.update();
        }
      });
    }
  },
  computed: {},
  filters: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  },
  watch: {
    selectedGroup(v) {
      console.log(v);
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
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
}

.hy-content {
}
.hy-btnbar > * {
  margin-right: 15px;
}
.hy-btnbar input {
  background: rgba(0, 0, 0, 0.4);
  border: 0px solid #aaa;
  padding: 5px;
  color: white;
  width: 120px;
  line-height: inherit;
}
.hy-btnbar .hy-btnbar-button {
  min-height: 30px;
  min-width: 80px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid gray;
  color: white;
  cursor: pointer;
}
.hy-btnbar .hy-btnbar-button:hover {
  border: 1px solid #1fffff;
  color: #1fffff;
  cursor: pointer;
}
.hy-select-div {
  display: inline-block;
  background: rgba(0, 0, 0, 0.4);
  height: 28px;
  position: relative;
  text-align: left;
  line-height: 28px;
  cursor: pointer;
  padding-left: 13px;
  border-radius: 3px;
  width: 120px;
}

input::-webkit-input-placeholder {
  color: #ddd;
}
</style>
