// author 谢灿
// date 2020年6月18日
// task 作战任务下达 复制了 HyTask/index.vue
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
      :title="'调度-作战任务下达'"
      class="hy-mainwindow"
    >
      <div class="plan-base">
        <div class="plan-title">预案基础信息：</div>
        <div class="plan-info">
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
      <button type="button"	class="layui-btn layui-btn-lg layui-btn-danger submit_button"  @click="sendTask">一键下达</button>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";

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
      taskShow: false,
      engines: [],
      groups: [],
      models: [],
      lang: {},
      langs: languagejs,
      query_data: null,
      checkbox: false,
      checkboxs: [],
      table_data: [
      ]
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    // console.log(this.tableId);

    // XE.MVVM.bind(this,planInfoShow, )
    // this.tableListeners();
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
    //全选
    choose_all() {
      let that = this;
      that.checkbox = !that.checkbox;
      let flag = that.checkbox;

      for (let i in that.checkboxs) {
        that.checkboxs[i] = flag;
      }
    },
    sendTask(){
      let that = this;
      let index = window._wait("正在下达任务中...");
      setTimeout(()=>{
        layer.close(index);
        layer.alert("任务下达成功!",(i)=>{
          //设置演练为开始
          layer.close(i);
          that.show = false;
          //演练状态更新为已完成
          that.$root.$hyControls.fighting.status = 1;
        });
      },1000)
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
.submit_button {
  position: absolute;
  top: 16px;
  right: 20px;
}
.xbsj-model-content-box {
    height: calc(100% - 40px);
}

</style>
