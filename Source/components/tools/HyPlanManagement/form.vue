// author 谢灿
// date 2020年6月8日
// update 2020-9-24 增加接口功能
// description 演练form表单面板
<template>
  <div style="width:100%;height:100%">
    <Window

      :footervisible="true"
      @cancel="cancel"
      @ok="ok"
      :floatLayer="'center'"
      v-show="show"
      :width="490"
      :minWidth="490"
      :height="500"
      :title="title"
      class="hy-majorhazard"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <label class="hy-select-label">演练名称:</label>
          <input class="hy-select-input" v-model="planName" />
          <!-- <button class="hy-select-button" @click="autoCreateName">自动生成</button> -->
        </div>
        <div class="hy-select column">
          <label class="hy-select-label">演练小组:</label>
          <textarea class="hy-select-textarea" id="testarea" v-model="leadingGroup"></textarea>
        </div>
        <div class="hy-select">
          <label class="hy-select-label">演练预案:</label>
          <input class="hy-select-input" placeholder="点击右侧按钮获取" v-model="maneuverName" readonly />
          <button class="hy-select-button" @click="searchManeuver">选择预案</button>
        </div>
        <!-- <div class="hy-select column">
          <label class="hy-select-label">演练说明:</label>
          <textarea class="hy-select-textarea" id="testarea" v-model="description"></textarea>
        </div> -->
      </div>
    </Window>
    <planManeuverSearchWin ref="maneuverWin"></planManeuverSearchWin>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import Deduce from "@controls/Deduce";
import planManeuverSearchWin from "./maneuver";
import data from '../HyCombatPower/data';
import PlanBasicInfo from "@services/PlanBasicInfo";
export default {
  components: {
    planManeuverSearchWin
  },
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      title: "",
      planId: -1,
      planName: "",
      maneuverId: -1,
      maneuverName: "",
      leadingGroup: "",
      description: "",
      lang: {},
      langs: languagejs
    };
  },
  created() {
    this.deduce = this.$root.$hyControls.deduce;
  },
  mounted() {
    this._disposers = this._disposers || [];

    this.maneuverWin = this.$refs.maneuverWin;
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    // this._disposers.push();
  },
  methods: {
    //查询正式预案
    searchManeuver() {
      this.maneuverWin.show = true;
    },
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      this.close();
    },
    ok() {
      //保存演练
      let that = this;
      if (this.planName === "" || this.maneuverId === -1) {
        layer.msg("信息不全,请检查");
        return;
      }
      window._wait();
      let data = {
          fk_basic_info_id: that.maneuverId,
          group: that.leadingGroup,
          name: that.planName,
          author: "admin"
      };
      console.log(data);
      if(that.planId = -1){
          this.$root.$hyServers.planManagement.save(data).then(result=>{
            console.log(result);
            if(result.code === 200){
                layer.msg("添加成功");

                that.$parent.tableReload();
            } 
            layer.msg(result.msg);
          })
      }else{
        this.$root.$hyServers.planManagement.update(that.planId,data).then(result=>{
            console.log(result);
            if(result.code === 200){
                layer.msg("修改成功");

                that.$parent.tableReload();
            }
            layer.msg(result.msg);
          })
      }
      


      // setTimeout(() => {
      //   let ndata = {
      //     key_id: 2,
      //     fk_org_id: 121,
      //     disasterName: "情景名称2",
      //     maneuverName: "预案名称2",
      //     name: "演练2",
      //     plan_author: "admin",
      //     create_time: null,
      //     update_time: null
      //   };
      //   if (that.planId === -1) {
      //     that.$parent.dataTable.data.push(ndata);
      //     layer.msg("新建成功");
      //   } else {
      //     let rowIndex = that.$parent.dataTable.data.findIndex(
      //       row => row.key_id === that.planId
      //     );
      //     ndata.key_id = that.planId;
      //     that.$parent.dataTable.data[rowIndex] = ndata;
      //     layer.msg("修改成功。");
      //   }
      //   that.$parent.tableInit();
      //   that.show = false;
      //   that.close();
      // }, 500);
    },
    clear() {
      this.title = "";
      this.planId = -1;
      this.planName = "";
      this.maneuverId = -1;
      this.maneuverName = "";
      this.leadingGroup = "";
      this.description = "";
    }
  },
  watch: {
    show(v) {
      console.log(this);
      if (this.planId !== -1) {
        this.title = "推演-推演管理-修改-" + this.planName;
      } else {
        this.title = "推演-推演管理-新建";
        this.planName = "推演" + new Date().Format("yyyyMMdd");
        this.maneuverId = 2;
        this.maneuverName = "预案2";
      }
    }
  },
  computed: {},
  filters: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  }
};
</script>

<style scoped>
.hy-majorhazard {
  min-width: 462px;
}
.hy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-bottom: 8px;
}
.hy-select.column {
  flex-direction: column;
}
.hy-select-label {
  text-align: left;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
}
.hy-select-textarea {
  width: 95%;
  height: 80px;
  align-self: center;
  border: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border-radius: 4px;
}
.hy-select-input {
  background: rgba(0, 0, 0, 0.4);
  border: 0px;
  padding-left: 13px;
  color: white;
  flex: 1;
  border-radius: 4px;
}
.hy-select-button {
  width: 70px;
  margin-left: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid grey;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.hy-list {
  padding: 5px 5px 0 5px;
}

.hy-list:after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: rgba(158, 158, 158, 0.5);
  z-index: 1;
  left: 0;
  margin-top: 3px;
  display: block;
}
.hy-list-title {
  margin-bottom: 3px;
}
.hy-list-contents {
  max-height: 225px;
}
.hy-list-contents li {
  display: inline-block;
  padding: 8px 8px 0 8px;
  position: relative;
}
.hy-list-content-img {
  width: 64px;
  height: 64px;
  max-width: 64px;
  max-height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px 3px;
}
.hy-list-content-img.highlight,
.hy-list-content-img:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.hy-list-content-img .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  position: absolute;
  z-index: 1;
  left: 0px;
  right: 0px;
}
.hy-list-content-img:hover .hy-list-content-tip {
  visibility: visible;
}
.hy-list-content-text {
  display: inline-block;
  width: 74px;
  text-align: center;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.hy-list-content-text .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  /* 定位 */
  position: absolute;
  z-index: 1;
  left: 0px;
  right: 0px;
  bottom: 30px;
}
.hy-list-content-text:hover .hy-list-content-tip {
  visibility: visible;
}
</style>