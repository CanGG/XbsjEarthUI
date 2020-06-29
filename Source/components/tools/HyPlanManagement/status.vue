// author 谢灿
// date 2020年6月9日
// description 演练状态面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="cancel"
      @ok="ok"
      v-show="show"
      :width="255"
      :height="162"
      :top="138"
      :left="0"
      :title="'当前演练：'+data.name+''"
      class="hy-majorhazard-status"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <label class="hy-select-label">演练名称:</label>
          <input class="hy-select-input" v-model="data.name" readonly="true" style="cursor: auto;" />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">演练状态:</label>
          <input class="hy-select-input" v-model="plan_status" readonly="true" style="cursor: auto;" />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">操作</label>
          <input type="button" v-show="assign_mission_show" @click="assign_mission" value="任务下达"/>
          <input type="button" @click="end_drill" value="演练结束"/>
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
      show: true,
      lang: {},
      langs: languagejs,
      data:{
            key_id: 1,
            fk_org_id: 121,
            disasterName: "情景名称1",
            maneuverName: "预案名称1",
            name: "演练1",
            plan_author: "admin",
            create_time: null,
            update_time: null
          },
      plan_status:'准备中',
      assign_mission_show:true
    };
  },
  created() {},
  mounted() {

    

    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    
    // //绑定显隐
    this._disposers.push(
      // XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
    );

  },
  methods: {
    init(data){
      
    },
    clear(){
      
    },
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      let that = this;
      this.close();
    },
    ok() {
      this.close();
    },
    //任务下达
    assign_mission(){
      //显示任务下达面板
      this.$root.$refs.mainUI.$refs.hyTask[0].show = true;
    },
    //演练结束
    end_drill(){
      let that = this;
      
        layui.layer.confirm(
          "是否结束演练?",
          {
            title: "提示"
          },
          i => {
            layui.layer.msg("操作成功", {
              time: 2000
            });
            //重置演练状态和id
            that.$root.$hyControls.plan.status = 0;
            that.$root.$hyControls.plan.id = -1;
            //显示任务下达按钮
            that.assign_mission_show = true;
            //打开演练任务详情面板
            that.$root.$refs.mainUI.$refs.hyPlanManagement[0].planAssess.show = true;
            // that.$root.$hyControls.figintg.id = -1;
            that.$root.$hyControls.loadOrgScene();
            layui.layer.close(i);

            if(this._root.hyControls.plan.status == 2){
              this._comp.assign_mission_show = false;
            }
          }
        );
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

  }
};
</script>

<style scoped>
.hy-majorhazard-status {
  min-width: 300;
  z-index: 5000;
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
.hy-select-label {
  text-align: left;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
}
.hy-select-textarea {
  width: 100%;
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
