// author 谢灿
// date 2020年6月12日
// description 推演任务清单
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
      :title="'演练-任务清单（演练1）'"
      class="hy-mainwindow"
    >
      <div class="plan-base">
        <div class="plan-title">推演基础信息：</div>
        <div class="plan-info">
          <div>推演名　：推演1</div>
          <div>预案名　：预案1</div>
          <div>事故情景：事故1</div>
          <div>灾害部位：甲类油罐</div>
          <div>灾害等级：一级</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="plan-fightforce">
        <div class="plan-title">作战力量信息：</div>
        <div class="layui-form">
          <table class="layui-table">
            <colgroup>
              <col width="150" />
              <col width="150" />
              <col width="200" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>出动力量批次</th>
                <th>作战单元</th>
                <th>力量组成</th>
                <th>作战任务</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="4">第一批次</td>
                <td rowspan="4">炉桥专职消防队</td>
                <td>LQ001</td>
                <td>精准打击</td>
              </tr>
              <tr>
                <td>LQ001</td>
                <td>精准打击</td>
              </tr>
              <tr>
                <td>LQ001</td>
                <td>精准打击</td>
              </tr>
              <tr>
                <td>LQ001</td>
                <td>精准打击</td>
              </tr>
              <tr>
                <td rowspan="6">第二批次</td>
                <td rowspan="3">定远队</td>
                <td>DY001</td>
                <td>保护</td>
              </tr>
              <tr>
                <td>DY001</td>
                <td>保护</td>
              </tr>
              <tr>
                <td>DY001</td>
                <td>保护</td>
              </tr>
              <tr>
                <td rowspan="3">琅琊队</td>
                <td>DY001</td>
                <td>保护</td>
              </tr>
              <tr>
                <td>DY001</td>
                <td>保护</td>
              </tr>
              <tr>
                <td>DY001</td>
                <td>保护</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";

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
      langs: languagejs,
      query_data: {}
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
  methods: {
    update() {
      this.query_data = this.$parent.query_data;
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
  display: flex;
  flex-direction: column;
}
.plan-title {
  font-size: 18px;
}
.plan-info {
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
}
.plan-info div{
  width:33%;
}
</style>
