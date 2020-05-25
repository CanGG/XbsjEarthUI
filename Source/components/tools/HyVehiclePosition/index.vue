// author 张杰
// date 2020年4月14日
// Vehicle Position 车辆实时位置
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show = false"
      v-show="show"
      :floatLayer="'center'"
      :width="1024"
      :minWidth="1024"
      :height="500"
      :title="lang.title"
      class="hy-mainwindow"
    >

    <iframe class="hy-vehicle-position-iframe" src="http://www.smartmgxf.com/digitalplan/plan/emergency_rescue.html">
    </iframe>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
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
      btnShow: true, //用来控制增删复制按钮的显隐
      engines: [],
      groups: [],
      models: [],
      lang: {},
      tableId: "hyVehiclePosition",
      langs: languagejs,
      query_data: null,
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    console.log(this.tableId);

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
.plan-title {
  font-size: 18px;
}
.plan-info {
  float: left;
  margin-left: 40px;
}
.layui-table,
.layui-table tr {
  background: none;
  color: white;
}
.hy-vehicle-position-iframe{
  width: 100%;
  height: 100%;
}
.submit_button {
  position: absolute;
  bottom: 5px;
  right: 20px;
  padding: 3px 10px;
  background-color: black;
  color: white;
  box-sizing: border-box;
  border: 1px solid white;
  cursor: pointer;
}
.layui-table tr th input[type="checkbox"],
.layui-table tr td input[type="checkbox"] {
  display: inline;
  vertical-align: middle;
}
</style>
