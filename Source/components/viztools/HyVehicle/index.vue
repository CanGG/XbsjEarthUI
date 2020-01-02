// author 谢灿
// date 2019年12月25日
// description 消防车属性面板 参考HyPropertyWindow.vue制作
<template>
  <Window
    @cancel="show=false"
    @ok="ok"
    v-show="show"
    :width="476"
    :minWidth="476"
    :height="500"
    :title="title"
    class="property-window"
  >
    <!-- 标签列表 -->
    <div class="tabs">
      <!-- 操作面板 -->
      <input class="tabs-input" @click="checked='operationTab'" type="radio" name="tabs" id="operationTab" :checked="checked == 'operationTab'">
      <label class="tabs-label" for="operationTab">操作面板</label>
      <div class="tab">
        <div class="xbsj-flatten">
          <!-- 名称 -->
          <div class="flatten">
            <label>{{lang.name}}</label>
            <input style="float:left;" type="text" v-model="operationData.model.name" />
          </div>
          <!-- 模型url -->
          <div class="flatten">
            <label>{{lang.url}}</label>
            <input style="float:left;" type="text" v-model="operationData.model.url" />
          </div>
          <!-- 环境贴图 -->
          <div class="flatten">
            <label>{{lang.environmentmaps}}</label>
            <input style="float:left;" type="text" v-model="operationData.model.specularEnvironmentMaps" />
          </div>
          <div class="flatten-flex">
            <!-- 鼠标点选 -->
            <div class="flatten">
              <label>{{lang.weizhi}}</label>
              <div class="buttonGroup">
                <button
                  class="attitudeEditCameraButton"
                  @click="operationData.model.creating =!operationData.model.creating"
                  :class="operationData.model.creating?'btncoloron':''"
                >{{lang.creating}}</button>
                <button
                  style="margin-left:20px;"
                  class="attitudeEditCameraButton"
                  @click="operationData.model.positionEditing =!operationData.model.positionEditing"
                  :class="operationData.model.positionEditing?'btncoloron':''"
                >{{lang.positionEditing}}</button>
                <button
                  style="margin-left:20px;"
                  class="attitudeEditCameraButton"
                  @click="flyto"
                >{{lang.flyto}}</button>
              </div>
            </div>
          </div>
          <!-- 当前位置 -->
          <div class="flatten">
            <label></label>
            <div class="flatten-box">
              <XbsjLngLatHeight v-model="operationData.model.xbsjPosition"></XbsjLngLatHeight>
            </div>
          </div>

          <div class="flatten-flex">
            <!-- rotation -->
            <div class="flatten">
              <label>{{lang.cx}}</label>
              <div class="buttonGroup">
                <button
                  class="attitudeEditCameraButton"
                  @click="operationData.model.rotationEditing =!operationData.model.rotationEditing"
                  :class="operationData.model.rotationEditing?'btncoloron':''"
                >{{lang.rotationEditing}}</button>
                <button
                  @click="reset"
                  style="margin-left:20px;"
                  class="attitudeEditCameraButton"
                >{{lang.reset}}</button>
              </div>
            </div>
          </div>
          <div class="flatten">
            <label></label>
            <div class="flatten-box">
              <XbsjHeadingPitchRoll v-model="operationData.model.xbsjRotation"></XbsjHeadingPitchRoll>
            </div>
          </div>
          <div class="flatten">
            <label>{{lang.enlargeScale}}</label>
            <div class="flatten-box">
              <input style="width:100px;" v-model.number="operationData.model.maximumScale" />
            </div>
          </div>
          <div class="flatten">
            <label>{{lang.minpx}}</label>
            <!-- <input style="width:100px;" v-model="operationData.model.minimumPixelSize" /> -->
            <div class="field">
              <XbsjSlider :min="0" :max="256" :step="1" v-model.number="operationData.model.minimumPixelSize"></XbsjSlider>
            </div>
          </div>
          <div class="flatten">
            <div style="position: relative;">
              <label>{{lang.pathAnimation}}</label>
              <input
                type="text"
                v-model="operationData.model.attachedPathGuid"
                @click="selectinput"
                readonly
                style="cursor: pointer;"
              />
              <button class="selectButton"></button>
              <div class="cutselectbox" v-show="operationData.showPinSelect" style="overflow:scroll;height:100px;">
                <div @click="optionssure(c)" v-for="(c,index) in operationData.pathGuidarr" :key="index">
                  <span>{{c.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 当前位置 -->
          <div class="flatten">
            <label @click="operationData.model.luminanceAtZenith=0.2">{{lang.material}}</label>
            <div class="field">
              <XbsjSlider :min="0" :max="5.0" :step="0.02" v-model.number="operationData.model.luminanceAtZenith"></XbsjSlider>
            </div>
          </div>
          <!-- 颜色 -->
          <div class="flatten">
            <label>{{lang.color}}</label>
            <XbsjColorButton v-model="operationData.bgbaseColorUI" ref="bgbaseColor"></XbsjColorButton>
          </div>
        </div>
      </div>
      <!-- 携带装备 -->
      <input class="tabs-input" @click="checked='equipmentTab'" type="radio" name="tabs" id="equipmentTab" :checked="checked == 'equipmentTab'">
      <label class="tabs-label" for="equipmentTab">携带装备</label>
      <div class="tab">
        暂无
      </div>
      <!-- 作战任务 -->
      <input class="tabs-input" @click="checked='missionTab'" type="radio" name="tabs" id="missionTab" :checked="checked == 'missionTab'">
      <label class="tabs-label" for="missionTab">作战任务</label>
      <div class="tab">
        暂无
      </div>
      <!-- 性能参数 -->
      <input class="tabs-input" @click="checked='performanceTab'" type="radio" name="tabs" id="performanceTab" :checked="checked == 'performanceTab'">
      <label class="tabs-label" for="performanceTab">性能参数</label>
      <div class="tab">
        <table border="1" cellspacing="0">
          <tr><td>项目名称</td><td>性能参数</td></tr>
          <tr v-for="(item,index) in performanceData" :key="index+'_performanceData'">
            <td v-html="item.name"></td><td v-html="item.value"></td>
          </tr>
        </table>
      </div>
    </div>
  </Window>
</template>

<script>
import languagejs from "./index_locale";
export default {
  props: {
    getBind: Function
  },
  data() {
    return {
      title: "属性框",
      checked: "operationTab",
      show: true,//窗口显示
      operationData:{
        showPinSelect: false,
        pathGuidarr: [],
        pinstyletype: true,
        model: {
          name: "",
          show: true,
          creating: true,
          url: "",
          specularEnvironmentMaps: undefined,
          positionEditing: false,
          rotationEditing: false,
          xbsjPosition: [0, 0, 0],
          xbsjRotation: [0, 0, 0],
          maximumScale: 0,
          minimumPixelSize: 0,
          attachedPathGuid: "",
          luminanceAtZenith: 0.2
        },
        bgbaseColorUI: {
          rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
          }
        },
        bgbaseColor: [1, 1, 1, 1]
      },
      performanceData:[
        {
          name:'底盘',
          value:'德国原装进口奔驰'
        },
        {
          name:'外形尺寸</br>(长×宽×高)(mm)',
          value:'≤12000×2500×4000'
        },
        {
          name:'发动机额定功率(kW)',
          value:'≥420'
        },
        {
          name:'满载总质量(kg)',
          value:'≤40000'
        },
        {
          name:'消防炮流量</br>(L/s/MPa)',
          value:'150/1.0'
        },
        {
          name:'消防炮射程',
          value:'水≥70 两项≥65（水与抗复燃灭火剂或水与超细粉）三项≥65（水、抗复燃灭火剂、超细粉）'
        },
        {
          name:'额定工作高度',
          value:'≥18'
        },
        {
          name:'灭火剂额定装载量',
          value:'水：10000；抗复燃灭火剂：2100；干粉：3000'
        }
      ],
      lang: {},
      langs: languagejs
    };
  },
  mounted() {
    this._disposers = this._disposers || [];
    let czmObj = this.getBind();
    if (czmObj) {
      this._czmObj = czmObj;
      this.bindOperationBind(czmObj);
    }
    console.log(this._czmObj);
    this.title =  czmObj.name + "的属性框";
  },
  computed:{
    //***操作面板相关***
    name() {
      return this.operationData.model.name;
    },
    guid() {
      return this.getBind().guid;
    }
  },
  watch:{
    //***操作面板相关***
    "operationData.bgbaseColorUI"(color) {
      let v = color.rgba;

      var cc = [v.r / 255.0, v.g / 255.0, v.b / 255.0, v.a];
      if (!this.operationData.bgbaseColor.every((c, index) => c === cc[index])) {
        this.operationData.bgbaseColor = cc;
      }
    },
    "operationData.bgbaseColor"(c) {
      this.operationData.bgbaseColorUI = {
        rgba: {
          r: c[0] * 255,
          g: c[1] * 255,
          b: c[2] * 255,
          a: c[3]
        }
      };
    }
  },
  methods: {
    //***操作面板相关方法***
    //*绑定参数*
    bindOperationBind(czmObj){
      const bindData = {
        name: "operationData.model.name",
        creating: "operationData.model.creating",
        show: "operationData.model.show",
        url: "operationData.model.url",
        specularEnvironmentMaps: "operationData.model.specularEnvironmentMaps",
        positionEditing: "operationData.model.positionEditing",
        rotationEditing: "operationData.model.rotationEditing",
        xbsjRotation: "operationData.model.xbsjRotation",
        xbsjPosition: "operationData.model.xbsjPosition",
        maximumScale: "operationData.model.maximumScale",
        minimumPixelSize: "operationData.model.minimumPixelSize",
        attachedPathGuid: "operationData.model.attachedPathGuid",
        luminanceAtZenith: "operationData.model.luminanceAtZenith"
      };

      Object.entries(bindData).forEach(([sm, vm]) => {
        if (typeof vm === "string") {
          this._disposers.push(XE.MVVM.bind(this, vm, czmObj, sm));
        } else {
          this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
        }
      });
      this._disposers.push(XE.MVVM.bind(this, "operationData.bgbaseColor", czmObj, "color"));
    
    },
    reset() {
      this.operationData.model.xbsjRotation = [0, 0, 0];
    },

    optionssure(c) {
      this.operationData.model.attachedPathGuid = c.guid;
      this.operationData.showPinSelect = !this.operationData.showPinSelect;
    },
    selectinput() {
      this.operationData.pathGuidarr = [];
      let guidobj = {};
      this.operationData.pathGuidarr.push({ name: "空", guid: "" });
      this.$root.$earth.pathCollection.forEach(e => {
        guidobj.name = e.name;
        guidobj.guid = e.guid;
        this.operationData.pathGuidarr.push(guidobj);
      });
      if (this.operationData.pathGuidarr.length < 2) {
        this.$root.$earthUI.promptInfo(
          "There is no path in the current scenario",
          "warning"
        );
        return;
      }
      this.operationData.showPinSelect = !this.operationData.showPinSelect;
    },
    //***公共方法***
    //*关闭事件*
    flyto() {
      this._czmObj.flyTo();
    },
    close() {
      this.$parent.destroyTool(this);
    },
    //*确定事件*
    ok() {
      this.close();

      const modelToolObj = this._czmObj;
      if (!modelToolObj) {
        return;
      }
      modelToolObj.positionEditing = false;
      if (modelToolObj.isCreating) {
        modelToolObj.isCreating = false;
        const sceneObject = new XE.SceneTree.Leaf(modelToolObj);
        this.$root.$earthUI.addSceneObject(sceneObject);
      }
    },
    beforeDestroy() {
      // 解绑数据关联
      this._polygonDisposers = this._polygonDisposers && this._polygonDisposers();
      this._disposers.forEach(e => e());
      this._disposers.length = 0;
    }
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
}

.tabs-label {
  order: 1;
  display: block;
  padding: 0.5rem 1rem;
  margin-right: 0.2rem;
  cursor: pointer;
  background: #fff;
  color: #404040;
  font-weight: bold;
  transition: background ease 0.5s;
}

.tabs .tab {
  order: 99;
  flex-grow: 1;
  width: 100%;
  display: none;
  /* padding: 11px; */
  box-sizing: border-box;
}

.tabs-input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.tabs-input[type="radio"]:checked + label {
  background: #404040;
  color: #ddd;
}

.tabs-input[type="radio"]:checked + label + .tab {
  display: block;
}

table{
  border-color: #474747;
  min-width: 402px;
  width: 100%;

}
td{
  min-width: 50px;
  padding: 4px;
}
@media (max-width: 300px) {
  .tabs .tab,
  .tabs-label {
    order: initial;
  }

  .tabs-label {
    width: 100%;
    margin-right: 0;
    margin-top: 0.2rem;
  }

  .property-window {
    position: absolute;
  }
}

/* 操作面板 start */
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
  left: 85px;
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
  width: 62px;
  height: 25px;
  margin-left: 18px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: #dddddd;
  padding: 0 4px;
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
  height: 25px;
  margin-left: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  color: #dddddd;
}
/* 操作面板 end */


</style>