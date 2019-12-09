<template>
  <Window
    :footervisible="true"
    @cancel="cancel"
    @ok="ok"
    v-show="show"
    :floatright="true"
    :width="463"
    :minWidth="202"
    :height="500"
    :left="5"
    :top="138"
    title="测试圆"
    class="hy-firefightingengine"
  >
    <XbsjSlider style="float:left;padding-top:25px; width:330px" :min="0" :max="100" :step="1" showTip="always" v-model="model.r" > 
    </XbsjSlider>
  </Window>
</template>

<script>
import languagejs from "./index_locale";
export default {
  props: {
    getBind: Function
  },
  components: {},
  data() {
    return {
      show: false,
      key: "",
      error: "",
      model:{
        r:10
      },
      lang: {},
      langs: languagejs
    };
  },
  created() {},
  mounted() {
    this._disposers = this._disposers || [];
    var czmObj = this.getBind();
    if (czmObj) {
      this._czmObj = czmObj;
    }else{
      return;
    }

    let that = this;
    Object.entries(bindData).forEach(([sm, vm]) => {
      if (typeof vm === "string") {
        this._disposers.push(XE.MVVM.bind(this, vm, czmObj, sm));
      } else {
        this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
      }
    });
    //显示窗体
    this.show = true;
  },
  methods: {
    //关闭事件
    close() {
      this.$parent.destroyTool(this);
    },
    cancel(){
      this._czmObj.destroy();
    },
    //确定事件
    ok() {
      this.close();
      const testCircle = this._czmObj;
      if (!testCircle) {
        return;
      }
      const sceneObject = new XE.SceneTree.Leaf(testCircle);
      this.$root.$earth.sceneTree.addSceneObject(sceneObject);
    },
    redraw(){
      let testCircle = this._czmObj;
      let that = this;
      console.log(testCircle)
      let width = this._czmObj.canvasWidth;
      let height = this._czmObj.canvasHeight;
      testCircle.drawCanvas(ctx => {
          ctx.clearRect(0, 0, width, height);
          ctx.save()
          ctx.beginPath();
          ctx.arc(128,128,that.model.r,0,2*Math.PI);
          ctx.fill();
          ctx.restore();
      });
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
.hy-firefightingengine {
  min-width: 462px;
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
}
.hy-list-contents li {
  display: inline-block;
  padding: 8px 8px 0 8px;
  position: relative;
}
.hy-list-content-img {
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px;
}
.hy-list-content-img.highlight,
.hy-list-content-img:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.hy-list-content-text {
  display: inline-block;
  width: 64px;
  text-align: center;
  white-space: nowrap;
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
  left: 6px;
  bottom: 30px;
}
.hy-list-content-text:hover .hy-list-content-tip {
  visibility: visible;
}
</style>
