<template>
  <Window
    :width="490"
    :minWidth="490"
    :floatright="true"
    :height="270"
    :title="lang.title"
    @cancel="cancel"
    @ok="ok"
    :footervisible="true"
    @showclick="showSelect=false"
  >
    <div class="xbsj-flatten">
      <!-- 名称 -->
      <div class="flatten">
        <label>{{lang.name}}</label>
        <input style="float:left;" type="text" v-model="model.name" />
      </div>
      <div class="flatten">
        <!-- 大小 -->
        <label>{{lang.size}}</label>
        <input
          style="float:left; width:40px"
          type="number"
          max="1000"
          min="0"
          v-model="model.size"
          @input="changeTool()"
        />
      </div>
      <div class="flatten">
        <!-- 风向 -->
        <label>{{lang.windDirection}}</label>
        <input
          style="float:left; width:40px"
          type="number"
          max="360"
          min="0"
          v-model="model.windDirection"
          @input="changeTool()"
        />
        <!-- 风力 -->
        <label>{{lang.windPower}}</label>
        <input
          style="float:left; width:40px"
          type="number"
          max="18"
          min="0"
          v-model="model.windPower"
          @input="changeTool()"
        />
      </div>
      <div class="flatten" v-show="false">
        <!-- 透明度 -->
        <label>{{lang.transpOne}}</label>
        <div class="flatten-box">
          <XbsjSlider
            style="float:left;padding-top:15px; width:330px"
            :min="0"
            :max="1"
            :step="0.1"
            showTip="always"
            v-model="model.transpOne"
          ></XbsjSlider>
        </div>
      </div>
      <div class="flatten" v-show="false">
        <!-- 透明度 -->
        <label>{{lang.transpTwo}}</label>
        <div class="flatten-box">
          <XbsjSlider
            style="float:left;padding-top:15px; width:330px"
            :min="0"
            :max="1"
            :step="0.1"
            showTip="always"
            v-model="model.transpTwo"
          ></XbsjSlider>
        </div>
      </div>
      <div class="flatten" v-show="false">
        <!-- 透明度 -->
        <label>{{lang.transpThree}}</label>
        <div class="flatten-box">
          <XbsjSlider
            style="float:left;padding-top:15px; width:330px"
            :min="0"
            :max="1"
            :step="0.1"
            showTip="always"
            v-model="model.transpThree"
          ></XbsjSlider>
        </div>
      </div>

      <!-- 当前位置 -->
      <div class="flatten" v-show="false">
        <label>{{lang.position}}</label>
        <div class="flatten-box">
          <XbsjLngLatHeight v-model="model.xbsjPosition"></XbsjLngLatHeight>
        </div>
      </div>

      <!-- 鼠标点选 -->
      <div class="flatten">
        <label>{{lang.move}}</label>
        <div class="buttonGroup">
          <button
            class="attitudeEditCameraButton"
            @click="model.freelyMove =!model.freelyMove"
            :class="model.freelyMove?'btncoloron':''"
          >{{lang.freelyMove}}</button>
          <button
            style="margin-left:20px;"
            class="attitudeEditCameraButton"
            @click="model.editing =!model.editing"
            :class="model.editing?'btncoloron':''"
          >{{lang.editing}}</button>
          <button
            style="margin-left:20px;"
            class="attitudeEditCameraButton"
            @click="flyto"
          >{{lang.flyto}}</button>
        </div>
      </div>
    </div>
  </Window>
</template>

<script>
import { copyobj } from "../../utils/tools";
import languagejs from "./index_locale";
import createArrow from "@/managers/tools/houyi/Arrow";
export default {
  props: {
    getBind: Function
  },
  data() {
    return {
      lang: {},
      showPinSelect: false,
      makiIconObj: {},
      model: {
        name: "",
        show: true,
        editing: false,
        freelyMove: false,
        enabled: true,
        transpOne: 0.6,
        transpTwo: 0.6,
        transpThree: 0.6,
        size: 10,
        windDirection: 30,
        windPower: 4,
        xbsjPosition: [0, 0, 0],
        diffusivity: 1
      },
      pinstyletype: true,
      langs: languagejs
    };
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    // 数据关联
    this._disposers = this._disposers || [];
    //Spread 自定义图元
    var czmObj = this.getBind();
    let that = this;
    if (czmObj) {
      this._czmObj = czmObj;
      // console.log(czmObj);
    } else {
      return;
    }

    //数据关联, key为传参, value 为本模板 data
    const bindData = {
      name: "model.name",
      show: "model.show",
      freelyMove: "model.freelyMove",
      size: "model.size",
      windDirection: "model.windDirection",
      windPower: "model.windPower",
      transpOne: "model.transpOne",
      transpTwo: "model.transpTwo",
      transpThree: "model.transpThree",
      position: "model.xbsjPosition",
      enabled: "model.enabled"
    };
    
    Object.entries(bindData).forEach(([key, value]) => {
      console.log(key, value);
      if (typeof value === "string") {
        this._disposers.push(XE.MVVM.bind(this, value, czmObj, key));
      } else {
        this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
      }
    });

    this._disposers.push(function(){
        let earth = czmObj.earth;
        let viewer = earth.czm.viewer;
        let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
    })
  },
  beforeDestroy() {
    // this._polygonDisposers = this._polygonDisposers && this._polygonDisposers();
    // this._disposers = this._disposers && this._disposers();
  },
  computed: {
    name() {
      return this.model.name;
    },
    guid() {
      return this.getBind().guid;
    },
    maxcurrentTime() {
      return Number(this.model.timeDuration);
    },
    //获取加工过后的风力
    windPower() {
      return this.model.windPower / 10 + 1;
    }
  },
  watch: {
    //监听自由移动按钮,激活时增加鼠标监听 关闭后移除鼠标监听
    "model.freelyMove"(newV, oldV) {
      let that = this;
      let earth = this._czmObj.earth;
      let viewer = earth.czm.viewer;
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      if (newV) {
        handler.setInputAction(event => {
          var cartographic = earth.pickPosition(event.endPosition);
          if (!!cartographic) {
            that._czmObj.position = cartographic;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        let startTime;
        handler.setInputAction(event => {
          startTime = new Date();
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        let endTime;
        handler.setInputAction(event => {
          endTime = new Date();
          if (endTime - startTime < 200) {
            that._czmObj.freelyMove = false;
            //创建Arrows 需要先转坐标为Degrees
            // this._czmObj.position.xePositionToDegrees;
            this._czmObj.setArrows();
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
          }
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      } else {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
      }
    },
    //位置 编辑 监听
    "model.editing"(newV, oldV) {
      if (newV) {
        let pin = new XE.Obj.Pin(this._czmObj.earth);
        this._pin = pin;
        pin.position = [...this.model.xbsjPosition];
        pin.show = false;
        var ub = XE.MVVM.bind(pin, "position", this._czmObj, "position");
        pin.editing = true;
      } else {
        this._pin.editing = false;
        //创建Arrows 需要先转坐标为Degrees
        // this._czmObj.position.xePositionToDegrees;
        this._czmObj.setArrows();
      }
    },
    "model.isCreating"(newV, oldV) {
      if(!newV){
        //保存了
      }
    },
    //透明度监听
    "model.transpOne"(n, o) {
      this.changeTool();
    },
    //透明度监听
    "model.transpTwo"(n, o) {
      this.changeTool();
    },
    //透明度监听
    "model.transpThree"(n, o) {
      this.changeTool();
    }
  },
  methods: {
    //关闭窗口
    close() {
      this.$parent.destroyTool(this);
    },
    //取消窗口
    cancel() {
      this.close();
      const modelToolObj = this._czmObj;
      if (!modelToolObj) {
        return;
      }
      modelToolObj.positionEditing = false;
      //如果是第一次打开的窗口,取消后移除图元
      if (modelToolObj.isCreating) {
        modelToolObj.isCreating = false;
        modelToolObj.destroyArrows();
        modelToolObj.destroy();
        let viewer = modelToolObj.earth.czm.viewer;
      }
    },
    ok() {
      //保存
      this.close();
      const modelToolObj = this._czmObj;
      modelToolObj.editing = false;
      if (!modelToolObj) {
        return;
      }
      modelToolObj.positionEditing = false;
      if (modelToolObj.isCreating) {
        modelToolObj.isCreating = false;
        // modelToolObj.position = modelToolObj.position.xeptr;
        const sceneObject = new XE.SceneTree.Leaf(modelToolObj);
        this.$root.$earth.sceneTree.addSceneObject(sceneObject);
      }
    },
    flyto() {
      this._czmObj.flyTo();
    },
    reset() {
      this.model.xbsjRotation = [0, 0, 0];
    },
    //改变属性框中的值时 触发, 刷新图元
    changeTool() {
      let that = this;
      let tool = this._czmObj;
      clearTimeout(this.delayFlag);
      this.delayFlag = setTimeout(function() {
        tool.drawCanvas(ctx => {
          tool.threeLeveltool(ctx);
        });
        tool.setArrows();
      }, 200);
    },
  }
};
</script>

<style scoped>
.flatten-flex {
  display: flex;
}
.field {
  padding-left: 4px;
  display: inline-block;
  width: 220px;
}
.header-add .add {
  background: url(../../../images/flatten/add.png) no-repeat;
  background-position: center;
  border-left: none !important;
}
.header-add .add:focus {
  outline: none;
}

.item-btn-box input {
  float: left;
}
.item-btn-box .del {
  background: url(../../../images/flatten/del.png) no-repeat !important;
  background-position: center !important;
}
.item-btn-box .edit {
  background: url(../../../images/flatten/edit.png) no-repeat !important;
  background-position: center !important;
}
.item-btn-box .edit-on {
  background: url(../../../images/flatten/edit_on.png) no-repeat !important;
  background-position: center !important;
}
.item-btn-box .position {
  background: url(../../../images/flatten/position.png) no-repeat !important;
  background-position: center !important;
}
.item-btn-box .autoheight {
  background: url(../../../images/flatten/autoheight.png) no-repeat !important;
  background-position: center !important;
}
.flatten-btn {
  background: none;
  border: none;
  width: 100%;
  height: 34px;
  /* border-left: 1px solid black; */
  margin-top: -1px;
  cursor: pointer;
}
.flatten-btn:focus {
  outline: none;
}
.item-btn-box {
  width: 100%;
  padding-top: 1px;
  border: 1px solid #000;
  border-collapse: collapse;
}
.item-btn-box thead tr {
  border-bottom: 1px solid #000;
}

.item-btn-box thead tr th {
  width: 16.66%;
  text-align: center;
  border-right: 1px solid #000;
}
.item-btn-box tbody tr td {
  border-right: 1px solid #000;
  text-align: center;
}
.item-btn-box tbody tr {
  border-top: 1px solid #000;
}

.iteminput {
  width: 72px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  color: #dddddd;
  padding-left: 10px;
  margin: 2px;
}
.item-order {
  width: 51px;
  height: 34px;
  text-align: center;
  line-height: 30px;
  border-right: none !important;
  border-top: none !important;
}
button {
  background: none;
  border: none;
  margin: 0 auto;
  display: block;
  line-height: 25px;
}
.header-add {
  width: 61px;
  height: 30px;
  /* border-bottom: none !important; */
}
.falatten-body-item div {
  float: left;
}
.header-content {
  width: 264px;
  height: 30px;
  border-left: none !important;
  border-right: none !important;
}
.flatten-table-header {
  width: 100%;
  height: 30px;
}
.flatten-table-header .border {
  float: left;
}
.flatten-table-order {
  width: 51px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  /* border-bottom: none !important; */
}
.xbsj-flatten {
  min-width: 462px;
}
.xbsj-flatten > div {
  width: 100%;
  height: 28px;
  margin-top: 10px;
}
.xbsj-flatten label {
  float: left;
  min-width: 60px;
  height: 28px;
  line-height: 28px;
  text-align: right;
  margin-left: 8px;
  margin-right: 15px;
}
.xbsj-flatten .flatten input,
.xbsj-flatten .attributePath input {
  width: calc(100% - 100px);
  height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  color: #dddddd;
  padding-left: 10px;
}
.xbsj-flatten .attributePlay button {
  width: 99px;
  height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  cursor: pointer;
}
.xbsj-flatten .attributePlay .playspan {
  display: inline-block;
  width: 17px;
  height: 20px;
  background: url(../../../images/play.png) no-repeat;
  background-size: contain;
  margin-top: 4px;
}
.xbsj-flatten .attributePlay .suspendspan {
  display: inline-block;
  width: 15px;
  height: 20px;
  background: url(../../../images/suspend.png) no-repeat;
  background-size: contain;
  margin-top: 4px;
}
.xbsj-flatten .attributeLocation input,
.xbsj-flatten .attributeAttitude input {
  width: 66px;
  height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  color: #dddddd;
  padding-left: 10px;
  margin-right: 6px;
}
input[type="text"]:focus,
button:focus {
  outline: 1px solid rgba(31, 255, 255, 1);
}
.flatten-table {
  display: inline-block;
  width: 80%;
}
.border {
  border: 1px solid black;
}
.select-ul {
  width: 80%;
  padding-left: 8px;
  margin-left: calc(10% + 23px);
  background: rgba(138, 138, 138, 1);
  z-index: 9999;
  position: relative;
}

.cutselectbox {
  width: calc(100% - 102px);
  background: rgba(138, 138, 138, 1);
  position: absolute;
  left: 78px;
  border-radius: 0px 0px 4px 4px;
  overflow: auto;
  z-index: 999;
}
.cutselectbox div {
  width: 100%;
  height: 28px;
  font-size: 14px;
  color: rgba(221, 221, 221, 1);
  cursor: pointer;
  line-height: 28px;
}

.cutselectbox div:hover {
  background: rgba(107, 107, 107, 1);
}

.cutselectbox span {
  display: inline-block;
  /* width: 72px; */
  text-align: left;
  margin-left: 10px;
}

.selectButton {
  width: 12px;
  height: 10px;
  border: none;
  background: url(../../../images/titles-select.png) no-repeat;
  background-size: contain;
  cursor: pointer;
  float: right;
  margin-right: 15px;
  /* margin-top: 10px; */
  outline: none;
  position: absolute;
  right: 15px;
  top: 11px;
}

.buttonGroup {
  display: flex;
}
.buttonGroup div {
  display: inline-block;
  height: 25px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: #dddddd;
}
.attitudeEditCameraButton {
  color: #dddddd;
}
.btncoloron {
  color: #1fffff !important;
}
button {
  background: none;
  border: none;
  margin: 0 auto;
  display: block;
  line-height: 25px;
  outline: none;
}
button:focus {
  outline: none !important;
}
.attitudeEditCameraButton {
  display: block;
  float: left;
  height: 30px;
  min-width: 100px;
  margin-left: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: #dddddd;
}
.xbsj-videoAttribute .attributePlay button {
  width: 99px;
  height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  border: none;
  cursor: pointer;
}
.buttonGroup div .playButton {
  background: url(../../../images/play.png) no-repeat !important;
  background-size: contain;
  height: 30px;
  width: 100px;
}
.buttonGroup div .suspendButton {
  background: url(../../../images/suspend.png) no-repeat !important;
  background-size: contain;
  height: 30px;
  width: 100px;
}
</style>