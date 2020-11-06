// author 谢灿
// date 2020年6月17日
// description 调度状态面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="cancel"
      @ok="ok"
      v-show="show"
      :width="340"
      :height="352"
      :top="138"
      :left="0"
      :title="'当前调度状态-'+stateCN"
      :canceltext="'关闭'"
      :confirmtext="'保存'"
      class="hy-majorhazard-status"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <label class="hy-select-label">调度状态:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">预案名称:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">灾害部位:</label>
          <input class="hy-select-input" readonly="true" style="cursor: auto;" />
        </div>
        <div class="hy-select">
          <label class="hy-select-label">操作</label>
          <input type="button" v-show="assign_mission_show" @click="assign_mission" value="任务下达" />
          <input type="button" @click="end_drill" value="结束调度" />
        </div>
      </div>
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
      lang: {},
      stateCN: "准备中",
      assign_mission_show: true,
      langs: languagejs,
    };
  },
  created() {},
  mounted() {
    let that = this;
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    // //绑定显隐
    this._disposers
      .push
      // XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
      ();

    XE.MVVM.watch(
      () => this.$root.$hyControls.fighting.status,
      (v) => {
        if (v !== undefined && v !== 0) {
          console.log(`监听到调度状态变化${v}`);
          that.stateCN = ["准备中", "开始作战", "作战结束", "作战终止"][v];
        }
      }
    );
  },
  methods: {
    assign_mission() {
      this.$root.$refs.mainUI.$refs.mainBarControl.$refs.hydispatch.taskShow = true;

      
    },
    end_drill() {
      let that = this;
      layui.layer.confirm(
        "是否结束调度?",
        {
          title: "提示",
        },
        (i) => {
          layui.layer.msg("操作成功", {
            time: 2000,
          });
          //重置演练状态和id
          that.$root.$hyControls.fighting.status = 0;
          // that.$root.$hyControls.figintg.id = -1;
          layui.layer.close(i);
        }
      );
    },
    init(data) {
      this.loadScene();
    },
    clear() {},
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      let that = this;
      that.close();
    },
    ok() {
      // layui.layer.msg("保存推演");
      // this.saveScene();
    },
    saveScene() {},
    loadScene() {},
  },
  computed: {},
  filters: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  },
  watch: {},
};
</script>

<style scoped>
.hy-majorhazard-status {
  min-width: 300;
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
