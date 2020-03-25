// author 谢灿
// date 2020年2月28日
// description 预案详情
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :left="300"
      :top="150"
      :width="1024"
      :minWidth="1024"
      :height="500"
      :title="lang.planInfoTitle"
      class="hy-mainwindow"
    >
      <div class="plan-base">
        <div class="plan-title">预案基础信息:</div>
        <div class>
          <div>重点部位名称:</div>
          <div>预案制作人:</div>
        </div>
        <div class>
          <div>灾害等级:</div>
          <div>预案制作时间:</div>
        </div>
      </div>
      <div class="plan-fightforce">
        <div class="plan-title">作战力量信息：</div>
        <table>
          <thead>
            <td>出动作战力量</td>
            <td>出动作战力量</td>
            <td>出动作战力量</td>
            <td>出动作战力量</td>
          </thead>
          <tbody></tbody>
        </table>
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
      lang: {},
      langs: languagejs
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }
  },
  methods: {},
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
</style>
