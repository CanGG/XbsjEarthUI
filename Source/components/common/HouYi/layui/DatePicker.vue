//author 谢灿
//data 2020年3月16日
// layui日期组件，传参见props属性
<template>
  <div class="hy-datepicker" @click="showLaydate">
    <button id="dataPicker_icon" class="hy-btn-data-icon"></button>
    <input type="text" id="datePicker" :placeholder="defaultText" />
  </div>
</template>

<script>
import "layui-src";
import "layui-src/dist/css/layui.css";

export default {
  props: {
    doneFunc: Function,
    defaultText: {
      type: String,
      default: "选择日期"
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    showLaydate() {
      let that = this;
      layui.laydate.render({
        elem: "#datePicker",
        show: true, //直接显示
        done: that.doneFunc,
        closeStop: "#dataPicker_icon" //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
      });
    }
  }
};
</script>

<style scoped>
.hy-datepicker {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.hy-datepicker input {
  box-sizing: border-box;
  padding-left: 13px;
  display: table-cell;
  background-color: transparent;
  height: 100%;
  position: relative;
  text-align: left;
  cursor: pointer;
  border: 0px;
  border-radius: 3px;
  min-width: 120px;
  color: white;
}
.hy-btn-data-icon {
  width: 20px;
  height: 100%;
  background-color: transparent;
  border: none;
  margin-right: 5px;
  background: url(../../../../images/houyi/calendar.png) no-repeat;
  background-size: contain;
  cursor: pointer;
  float: right;
  margin-top: 4px;
  outline: none;
}

input::-webkit-input-placeholder {
  color: #ddd;
}
</style>