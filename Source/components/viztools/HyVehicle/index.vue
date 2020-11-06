// author 谢灿
// date 2019年12月25日
// description 消防车属性面板 参考HyPropertyWindow.vue制作
// update 谢灿 2020年10月19日 通过接口连接数据库, 并调整界面和功能
<template>
  <Window
    @cancel="close"
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
      <!-- 作战任务 -->
      <input class="tabs-input" @click="checked='missionTab'" type="radio" name="tabs" id="missionTab" :checked="checked == 'missionTab'">
      <label class="tabs-label" for="missionTab">作战任务</label>
      <div class="tab">
        <div class="vehicle-task-content">
          <div class="vehicle-task-row">
            <label>操　　作</label>
            <div class="buttonGroup">
              <button
                class="attitudeEditCameraButton"
                @click="operationData.model.creating =!operationData.model.creating"
                :class="operationData.model.creating?'btncoloron':''"
              >下达指令</button>
            </div>
          </div>
          <div class="vehicle-task-row">
            <label>任务记录</label>
            <ul class="layui-timeline" >            
              <li class="layui-timeline-item" v-for="(task,index) in taskData" :key="'taskKey_'+index">
                <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                <div class="layui-timeline-content layui-text">
                  <h3 class="layui-timeline-title" style="color:white">{{task.date}}</h3>
                  <p style="color:white">
                    {{task.text}}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
      <!-- 携带装备 -->
      <input class="tabs-input" @click="checked='equipmentTab'" type="radio" name="tabs" id="equipmentTab" :checked="checked == 'equipmentTab'">
      <label class="tabs-label" for="equipmentTab">携带装备</label>
      <div class="tab">
        <div class="equipment" v-for="(equip,index) in equipments" :key="'hyvehicle_equipment'+index">
          <div class="equipment-image">
            <img :src="equip.url">
          </div>
          <div class="equipment-name">{{equip.name}}</div>
        </div>
      </div>
      <!-- 操作面板 -->
      <input class="tabs-input" @click="checked='operationTab'" type="radio" name="tabs" id="operationTab" :checked="checked == 'operationTab'">
      <label class="tabs-label" for="operationTab">操作面板</label>
      <div class="tab">
      <!--位置-->
        <div class="xbsj-flatten">
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
          <div class="flatten" v-show="false">
            <label></label>
            <div class="flatten-box">
              <XbsjLngLatHeight v-model="operationData.model.position"></XbsjLngLatHeight>
            </div>
          </div>
        
          <!--朝向-->
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
          <div class="flatten" v-show="false">
            <label></label>
            <div class="flatten-box">
              <XbsjHeadingPitchRoll v-model="operationData.model.xbsjRotation"></XbsjHeadingPitchRoll>
            </div>
          </div>
          <div class="flatten" v-show="false">
            <label>{{lang.enlargeScale}}</label>
            <div class="flatten-box">
              <input style="width:100px;" v-model.number="operationData.model.maximumScale" />
            </div>
          </div>
        </div>
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
      checked: "missionTab",//默认显示为作战任务标签
      show: true,//窗口显示
      taskData:[],
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
      vehicle:{},//车辆数据
      performanceData:[],//性能参数 ({value,name})
      lang: {},
      equipments:[],
      czmObj:{},
      langs: languagejs
    };
  },
  mounted() {
    this._disposers = this._disposers || [];
    let czmObj = this.getBind();
    if (czmObj) {
      this._czmObj = czmObj;
      this.vehicle = czmObj._data; 
      this.title = czmObj._data.equipment_name;
      this.bindOperationBind(czmObj);
      //获取车辆性能参数
      this.getAndShowVehicleParameters();
      //获取车辆携带装备
      this.getAndShowVehicleEquipments();
    }
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
    //获取并显示车辆的车型参数信息
    getAndShowVehicleParameters(){
      let fk_iri_type_id = this.vehicle.fk_iri_type_id;
      if(!!fk_iri_type_id){
        // window._wait();
        this.$root.$hyServers.iov.getPerformanceParameters(this.vehicle.fk_iri_type_id).then(result=>{
          // console.log(result);
          if(result.code === 200){
            this.performanceData = [];
            let data = result.data;
            this.performanceData.push({name:data.para_name,value:data.para_memo});
            data.child.forEach((child,index)=>{
              this.performanceData.push({name:child.para_name,value:child.para_memo});
            })
          }else{
            layer.msg(result.msg);
          }
        })
      }
    },
    //获取并显示车辆的车载装备信息
    getAndShowVehicleEquipments(){
      let fk_iri_vehicle_id = this.vehicle.fk_iri_vehicle_id;
      if(!!fk_iri_vehicle_id){
        // window._wait();
        this.$root.$hyServers.iov.getEquipmentEquipages(this.vehicle.fk_iri_vehicle_id).then(result=>{
          console.log(result);
          if(result.code === 200){
              let equips = result.data.equipage;
              equips.forEach((equip,index)=>{
                let name = equip.equipage_name;
                let url = equip.img_url;
                this.equipments.push({
                  name, url
                })
              })
              console.log(this.equipments);
          }else{
            layer.msg(result.msg);
          }
        })
      }else{

      }
    },
    //***操作面板相关方法***
    //*绑定参数*
    bindOperationBind(czmObj){
      const bindData = {
        name: "operationData.model.name",
        creating: "operationData.model.creating",
        show: "operationData.model.show",
        imageUrl: "operationData.model.url",
        position: "operationData.model.xbsjPosition",
      };
      console.log(this.taskData);
      Object.entries(bindData).forEach(([sm, vm]) => {
        if (typeof vm === "string") {
          this._disposers.push(XE.MVVM.bind(this, vm, czmObj, sm));
        } else {
          this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
        }
      });
      this._disposers.push(XE.MVVM.bind(this, "taskData", czmObj, "taskData"));
    
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
.layui-timeline-axis {
    position: absolute;
    left: -5px;
    top: 0;
    z-index: 10;
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: #524e4e;
    color: #2c2929;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
}
.equipment {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:10px;
}


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
    border: thin;
    margin: 15px;
    box-sizing: border-box;
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
  min-width:68px;
}
/* 操作面板 end */

/*任务面板 */
.vehicle-task-content{
  display:flex;
  flex-direction: column;
  margin: 10px;
}
.vehicle-task-row{
  display:flex;
  flex-direction: column;
  margin-bottom:10px;
}
.vehicle-task-row label{
  margin-bottom:10px;
}
</style>