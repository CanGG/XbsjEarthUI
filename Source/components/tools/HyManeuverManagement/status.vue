// author 谢灿
// date 2020年6月9日
// description 预案编制状态面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="true"
      @cancel="cancel"
      @ok="ok"
      v-show="show"
      :width="280"
      :height="316"
      :top="138"
      :left="0"
      :title="'当前预案：'+maneuver.name+''"
      :canceltext="'关闭'"
      :confirmtext="'保存'"
      class="hy-majorhazard-status"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <label class="hy-select-label">灾害名称:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" v-model="disaster.name"  />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">灾害部位:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" v-model="disaster.parts"  />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">灾害等级:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" v-model="disaster.level"  />
        </div>
        <div class="hy-select" style="flex-direction: column;">
          <label class="hy-select-label">等级说明:</label>
          <textarea class="hy-select-textarea" id="testarea" readonly="true" v-model="disaster.levelInfo" ></textarea>
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
      maneuver:{
        id:-1,
        name:'预案编制状态'
      },
      disaster:{
        id:-1,
        name:'',
        parts:'',
        level:'',
        levelInfo:'',
      },
      lang: {},
      langs: languagejs
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

      this.maneuver={
        id:data.maneuver.id,
        name:data.maneuver.name,
      };
      this.disaster=data.disaster;

      this.loadScene();
    },
    clear(){
      this.maneuver={
        id:-1,
        name:'预案编制状态'
      };
      this.disaster={
        id:-1,
        name:'',
        parts:'',
        level:'',
        levelInfo:'',
      };

    },
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      let that = this;
      layer.confirm("是否退出编制?(请确认是否保存!)",index=>{
        layer.close(index);
        layer.msg("退出成功");
        that.$root.$hyControls.loadOrgScene();
        that.close();
      });
    },
    ok() {
      layui.layer.msg("保存推演");
      this.saveScene();
    },
    saveScene(){
      let jsonObj = this.$root.$earth.toJSON()
      let json = JSON.stringify(jsonObj);
      window.localStorage.setItem(this.$root.$hyControls.orgID+'|'+this.disaster.id+'|'+this.maneuver.id, json);
    },
    loadScene(){
      console.log(`加载场景${this.$root.$hyControls.orgID+'|'+this.disaster.id+'|'+this.maneuver.id}`);
      let json = window.localStorage.getItem(this.$root.$hyControls.orgID+'|'+this.disaster.id+'|'+this.maneuver.id);
      if(json){
        var jc = JSON.parse(json);
        this.$root.$earth.xbsjFromJSON(jc);
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
  },
  watch: {

  }
};
</script>

<style scoped>
.hy-majorhazard-status {
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
