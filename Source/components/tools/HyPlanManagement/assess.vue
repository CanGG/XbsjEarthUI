// author 谢灿
// date 2020年6月12日
// description 推演评估表
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
      :title="'演练-演练评估（演练1）'"
      class="hy-mainwindow"
    >
      <div class="plan-base">
        <div class="plan-title">推演基础信息：</div>
        <div class="plan-info">
          <div>推演名 ：推演1</div>
          <div>预案名 ：预案1</div>
          <div>事故情景：事故1</div>
          <div>灾害部位：甲类油罐</div>
          <div>灾害等级：一级</div>
        </div>
      </div>
      <div class="plan-base">
        <div class="plan-title">推演评估信息：</div>
        <!-- 演练得分 -->
        <div class="plan-assess">
          <div class="plan-assess-title">演练评估得分情况</div>
          <div class="plan-assess-content">
            <div class="plan-assess-score-item">
              <div class="plan-assess-score-head">
                车联网
                <br />(8)
              </div>
              <div class="plan-assess-score-column">
                <div>接警时间</div>
                <div>1</div>
              </div>
              <div class="plan-assess-score-column">
                <div>出警时间</div>
                <div>2.0</div>
              </div>
              <div class="plan-assess-score-column">
                <div>到达时间</div>
                <div>2.0</div>
              </div>
            </div>
            <!-- -->
            <div class="plan-assess-score-item">
              <div class="plan-assess-score-head">
                人员安全
                <br />(6.8)
              </div>
              <div class="plan-assess-score-column">
                <div>警戒隔离</div>
                <div>0.6</div>
              </div>
              <div class="plan-assess-score-column">
                <div>监测气体浓度</div>
                <div>1.0</div>
              </div>
              <div class="plan-assess-score-column">
                <div>救治伤员</div>
                <div>2.3</div>
              </div>
              <div class="plan-assess-score-column">
                <div>搜救落水</div>
                <div>2.7</div>
              </div>
              <div class="plan-assess-score-column">
                <div>人员撤离</div>
                <div>2.7</div>
              </div>
            </div>
            <div class="plan-assess-score-item">
              <div class="plan-assess-score-head">
                资产保护
                <br />(7.6)
              </div>
              <div class="plan-assess-score-column">
                <div>储罐降温保护</div>
                <div>0.6</div>
              </div>
              <div class="plan-assess-score-column">
                <div>停止外输作业</div>
                <div>0.6</div>
              </div>
              <div class="plan-assess-score-column">
                <div>消防灭火</div>
                <div>0.6</div>
              </div>
              <div class="plan-assess-score-column">
                <div>平台生产关停</div>
                <div>0.6</div>
              </div>
            </div>
            <div class="plan-assess-score-item">
              <div class="plan-assess-score-head">
                环境保护
                <br />(8.2)
              </div>
              <div class="plan-assess-score-column">
                <div>控制泄漏源</div>
                <div>2.4</div>
              </div>
              <div class="plan-assess-score-column">
                <div>清理泄露</div>
                <div>0.8</div>
              </div>
              <div class="plan-assess-score-column">
                <div>泄露围控及回收</div>
                <div>4.2</div>
              </div>
              <div class="plan-assess-score-column">
                <div>泄露飘逸预测</div>
                <div>0.8</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 演练评估表 -->
        <div class="plan-assess">
          <div class="plan-assess-title">演练评估表</div>
          <div class="plan-assess-content">
            <div class="plan-assess-table-header">
              <div class="plan-assess-table-assessitem">评估项/分</div>
              <div class="plan-assess-table-assesstarget">评估目标/分</div>
              <div class="plan-assess-table-assessability">所需能力</div>
              <div class="plan-assess-table-assessstandard">评估标准/分</div>
            </div>
            <div class="plan-assess-table-content">
              <div
                class="plan-assess-table-item plan-assess-table-assessitem"
                style="border-bottom:1px solid"
              >车联网(5分)</div>
              <div class="plan-assess-table-item" style="flex:1;">
                <div class="plan-assess-table-target">
                  <div class="plan-assess-table-assesstarget">接警时间(1分)</div>
                  <div class="plan-assess-table-assessability">1.快速准确受理报警;</div>
                  <div class="plan-assess-table-assessstandard">
                    1.超过10秒(响铃三声)未接听,扣0.8分;
                    <br />2.未问清详细地址,扣1分;
                  </div>
                </div>
                <div class="plan-assess-table-target">
                  <div class="plan-assess-table-assesstarget">出警时间(2分)</div>
                  <div class="plan-assess-table-assessability">1.1分钟内出警;</div>
                  <div class="plan-assess-table-assessstandard">1.超过1分钟未出警,扣2分;</div>
                </div>
                <div class="plan-assess-table-target">
                  <div class="plan-assess-table-assesstarget">到达时间(2分)</div>
                  <div class="plan-assess-table-assessability">1.出警后5分钟内到达;</div>
                  <div class="plan-assess-table-assessstandard">1.超过5分钟未到达,扣2分;</div>
                </div>
              </div>
            </div>
          </div>
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
  flex-wrap: wrap;
}
.plan-base {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 10px;
}
.plan-info div {
  width: 33%;
}

.plan-assess {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  color: #ddd;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid;
  margin-bottom: 20px;
}
.plan-assess-title {
  font-weight: bold;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.plan-assess-content {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.plan-assess-score-item {
  display: flex;
  flex-direction: row;
  border-top: 1px solid;
  border-bottom: 1px solid;
  margin: 2px;
  text-align: center;
  padding: 5px;
}
.plan-assess-score-head {
  padding-right: 10px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plan-assess-score-column {
  padding-right: 10px;
  padding-left: 10px;
  width: 80px;
}
.plan-assess-score-column > div:first-of-type {
  border-bottom: 1px solid;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plan-assess-content.row {
  flex-direction: row;
}
.plan-assess-table-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.plan-assess-table-header div {
  display: flex;
  justify-content: center;
}
.plan-assess-table-content {
  display: flex;
  flex-direction: row;
}
.plan-assess-table-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.plan-assess-table-target {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
  width: 100%;
}
.plan-assess-table-target div {
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.plan-assess-table-assessitem {
  width: 150px;
}
.plan-assess-table-assesstarget {
  width: 150px;
  justify-content: center;
}
.plan-assess-table-assessability {
  width: 200px;
}
.plan-assess-table-assessstandard {
  flex: 1;
}
</style>
