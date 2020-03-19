// author 谢灿
// date 2020年2月28日
// description 重大危险源面板
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
          <HyDatePicker :doneFunc='datePickerDone' ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
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
      <div class="hy-btnbar">
        <div>
          <button class="hy-btnbar-button">新建</button>
        </div>
        <div>
          <button class="hy-btnbar-button">删除</button>
        </div>
        <div>
          <button class="hy-btnbar-button">复制</button>
        </div>
      </div>
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <table class="layui-hide" id="demo" lay-filter="test"></table>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import "layui-src";
import "layui-src/dist/css/layui.css";

export default {
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
      engines: [],
      groups: [],
      models: [],
      lang: {},
      langs: languagejs
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    layui.table.render({
      elem: "#demo",
      page: true,
      height: 330,
      cols: [
        [
          //标题栏
          { type: "checkbox", fixed: "left" },
          { field: "sort", title: "序号", width: 60 },
          { field: "name", title: "演练名称", width: 100 },
          { field: "part", title: "重点部位", width: 120 },
          { field: "level", title: "灾害等级", width: 90 },
          { field: "creater", title: "制作人", width: 80 },
          { field: "createTime", title: "创建时间", width: 140, sort: true  },
          { field: "modifyTime", title: "修改时间", width: 140, sort: true },
          { fixed: "right", align: "center",width: 225 , toolbar: "#barDemo" }
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
          modifyTime: "2020-3-17 12:39",
        },
      ],
      //,skin: 'line' //表格风格
      //,page: true //是否显示分页
      //,limits: [5, 7, 10]
      //,limit: 5 //每页默认显示的数量
      even: true
    });
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
    datePickerDone(date){
      layer.msg(date);
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
  background:rgba(0,0,0,0.4);
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
