// author 张杰
// date 2020年7月13日
// description 作战力量弹窗
// @date 2020-8-18 谢灿 调整面板样式
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="cancel()"
      v-show="show"
      :floatright="true"
      :width="380"
      :height="537"
      :top="121"
      :right="0"
      :nopadding="true"
      :title="lang.title"
      class="hy-hyCombatPower"
    >
      <!-- 窗体内容区域 -->
      <div style="width: 100%;height:100%;">
        <div class="layui-tab layui-tab-brief" lay-filter="hyCombatPowerTab">
          <ul class="layui-tab-title">
            <li class="layui-this" lay-id="11">车联网</li>
            <li lay-id="22">车载装备</li>
            <li lay-id="33">消防人员</li>
          </ul>
          <div class="layui-tab-content">
            <!-- 车联网 -->
   
            <div class="layui-tab-item layui-show">
              <div class="hy-content">
                <div class="hy-content-left">
                  <div class="hy-header">
                    <span>作战单位</span>
                  </div>
                  <div class="hy-content-left-units">
                    <span
                      v-for="unitTab in unitTabs"
                      @click="toggle(unitTab.key_id,'vehicle')"
                      :val="unitTab.key_id"
                      :class="{active:unitTabsActive.vehicle==unitTab.key_id}"
                      :key="'vehicleunitTabs_'+unitTab.key_id"
                    >{{unitTab.name}}</span>
                  </div>
                </div>
                <div class="hy-content-center">
                  <div class="hy-header">
                    <input type="text" v-model="search_keyword" @input="changeVehicles" placeholder="请输入车辆名称" />
                  </div>
                  <div class="hy-content-center-rows">
                    <div class="hy-list" v-for="(engine) in vehicleData" :key="engine.code">
                      <!-- 车辆类型名称 -->
                      <div class="hy-list-title">{{engine.name}}</div>
                      <!-- 车辆类型下的车辆列表 -->
                      <ul class="hy-list-contents">
                        <!-- 一个车辆 单击后进行模型创建操作 -->
                        <li
                          v-for="vehicle in engine.vehicles"
                          :key="vehicle.code"
                          @click="modelClick(vehicle,'vehicle')"
                          @dblclick="flyToModel(vehicle)"
                        >
                          <!-- 模型的缩略图 大小为64*64px 存放在apps/assets/3d/中-->
                          <div class="hy-list-content-img">
                            <img style="width:64px;height:64px;" :src="vehicle.imgSrc" alt />
                          </div>
                          <!-- 模型的文字说明 -->
                          <div class="hy-list-content-text">
                            <!-- 模型的文字说明, 超过长度隐藏 -->
                            {{vehicle.name}}
                            <!-- 模型的文字说明(tip) 选中文字时弹出的部分 -->
                            <span class="hy-list-content-tip">{{vehicle.name}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 消防设备 -->
            <div class="layui-tab-item">
              <div class="hy-content">
                <!-- 车辆类型列表 -->
                
                <div class="hy-content-center">
                  <div class="hy-header">
                    <input type="text" placeholder="请输入消防设施名称" />
                  </div>
                  <div class="hy-content-center-rows">
                    <div class="hy-list" v-for="(engine) in fireFightingData" :key="engine.code">
                      <!-- 车辆类型名称 -->
                      <div class="hy-list-title">{{engine.name}}</div>
                      <!-- 车辆类型下的车辆列表 -->
                      <ul class="hy-list-contents">
                        <!-- 一个车辆 单击后进行模型创建操作 -->
                        <li
                          v-for="vehicle in engine.vehicles"
                          :key="vehicle.code"
                          @click="modelClick(vehicle,'fireFighting')"
                          @dblclick="flyToModel(vehicle)"
                        >
                          <!-- 模型的缩略图 大小为64*64px 存放在apps/assets/3d/中-->
                          <div class="hy-list-content-img">
                            <img style="width:64px;height:64px;" :src="vehicle.imgSrc" alt />
                          </div>
                          <!-- 模型的文字说明 -->
                          <div class="hy-list-content-text">
                            <!-- 模型的文字说明, 超过长度隐藏 -->
                            {{vehicle.name}}
                            <!-- 模型的文字说明(tip) 选中文字时弹出的部分 -->
                            <span class="hy-list-content-tip">{{vehicle.name}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 消防人员 -->
            <div class="layui-tab-item">
              <div class="hy-content">
                <!-- 车辆类型列表 -->
                
                <div class="hy-content-center">
                  <div class="hy-header">
                    <input type="text" placeholder="请输入消防人员名称" />
                  </div>
                  <div class="hy-content-center-rows">
                    <div class="hy-list" v-for="(engine) in fireManData" :key="engine.code">
                      <!-- 车辆类型名称 -->
                      <div class="hy-list-title">{{engine.name}}</div>
                      <!-- 车辆类型下的车辆列表 -->
                      <ul class="hy-list-contents">
                        <!-- 一个车辆 单击后进行模型创建操作 -->
                        <li
                          v-for="vehicle in engine.vehicles"
                          :key="vehicle.code"
                          @click="modelClick(vehicle,'fireMan')"
                          @dblclick="flyToModel(vehicle)"
                        >
                          <!-- 模型的缩略图 大小为64*64px 存放在apps/assets/3d/中-->
                          <div class="hy-list-content-img">
                            <img style="width:64px;height:64px;" :src="vehicle.imgSrc" alt />
                          </div>
                          <!-- 模型的文字说明 -->
                          <div class="hy-list-content-text">
                            <!-- 模型的文字说明, 超过长度隐藏 -->
                            {{vehicle.name}}
                            <!-- 模型的文字说明(tip) 选中文字时弹出的部分 -->
                            <span class="hy-list-content-tip">{{vehicle.name}}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>

    <component
      v-for="(model,index) in models"
      :is="model.component"
      :ref="model.ref"
      :_toolIndex="index"
      :key="model.item.guid"
      :getBind="model.item"
    ></component>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import combatPowerData from "./data";
//import HyCombatPower from "@/managers/tools/houyi/HyCombatPower"; //模型
import FireControlFacilities from "@/managers/tools/houyi/FireControlFacilities"; //自定义消防设备模型
import FireMen from "@/managers/tools/houyi/FireMen"; //自定义消防人员模型
import HyVehicle from "@/managers/tools/houyi/Vehicle"; //自定义消防车模型

//初始化区域编码->中国
const INIT_AREA_CODE = 100000;
let time = null;

export default {
  data() {
    return {
      combatPowerShow: false,
      fireManShow: false,
      fireFightingShow: false,
      show: false,
      key: "",
      error: "",
      models: [],
      lang: {},
      langs: languagejs,
      //车辆相关
      provinces: [],
      cities: [],
      areas: [],
      counties: [],
      organisations: [],
      vehicleData: {},
      //消防设备相关
      fireFightingData: combatPowerData.fireFighting,
      //消防人员相关
      fireManData: combatPowerData.fireMan,
      //单位列表
      unitTabs: [{
        key_id: -1,
        name: "全部单位",
      }],
      //当前tab
      unitTabsActive: {
        vehicle:undefined
      },
      //搜索内容
      search_keyword:""
    };
  },
  created() {
    let form = layui.form;
  },
  mounted() {
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }
    //加载作战单位
    this.loadCombatPowerUnits();
    this.formListeners();
    this.listeningTabChange();
  },
  methods: {
    //切换tab
    toggle(key_id, tabName) {
      this.$set(this.unitTabsActive,tabName, key_id);
    },
    //模型图标点击事件
    //存在则打开属性框,不存在则创建
    modelClick(combatPower, type = "") {
      console.log(combatPower);
      clearTimeout(time);
      time = setTimeout(() => {
        //查找当前已添加的模型列表, 查看vehicle是否存在模型
        let fightingGroup = this.earth.sceneTree.root.children.find((scene) => {
          return scene.title === "救援力量";
        });
        console.log(fightingGroup);
        //是否存在
        if (!!fightingGroup) {
          let exisModel = fightingGroup.children.find((child) => {
            return child.czmObject.xbsjGuid === combatPower.keyId;
          });
          console.log(exisModel);
          if (exisModel != null) {               
            let czmObj = exisModel.czmObject;
            window.uia.showPropertyWindow(czmObj);
          }else{
            let Model = combatPower.model;
            this.createModel(combatPower, type);
          }
        }else{
          let Model = combatPower.model;
          this.createModel(combatPower, type);
        }
      }, 200);
    },
    //双击飞向模型
    flyToModel(combatPower) {
      console.log("flyToModel");
      clearTimeout(time);
      let fightingGroup = this.earth.sceneTree.root.children.find((scene) => {
        return scene.title === "救援力量";
      });
      console.log(fightingGroup);
      if (!!fightingGroup) {
        let exisModel = fightingGroup.children.find((child) => {
          return child.czmObject.xbsjGuid === combatPower.keyId;
        });
        console.log(exisModel);
        if (exisModel != null) {
          let czmObj = exisModel.czmObject;
          //飞到坐标上空100米高度, 不带角度
          this.$root.$earth.camera.flyTo(
            [czmObj.position[0], czmObj.position[1], czmObj.position[2]],
            200
          );
          return;
        }
      }
    },
    //创建模型本体
    createModel(combatPower, type) {
      console.log("createModel");
      console.log(combatPower,type);
      let layer = layui.layer;
      let that = this;
      var Model;
      switch (type) {
        case "vehicle":
          Model = new HyVehicle(this.earth, combatPower.keyId);
          break;
        case "fireMan":
          Model = new FireMen(this.earth, (new Date()).valueOf() + "|" + combatPower.keyId);
          break;
        case "fireFighting":
          Model = new FireControlFacilities(this.earth, (new Date()).valueOf() + "|" + combatPower.keyId);
          break;
      }
      // var Model = new HyCombatPower(this.earth, combatPower.code);
      Model.creating = true;
      Model.isCreating = true;

      combatPower.model = Model;
      let earth = this.earth;
      this.isCreating = false;
      Model.currentPostion = [...Model.position];
      Model.firstCreating = true;
      console.log(Model);
      XE.MVVM.watch(Model, "creating", (c) => {
        if (c == false && Model.firstCreating) {
          console.log(Model);
          if (
            Model.currentPostion[0] == Model.position[0] &&
            Model.currentPostion[1] == Model.position[1] &&
            Model.currentPostion[2] == Model.position[2]
          ) {
            console.log("右键");
            if (Model.firstCreating) {
              Model.destroy();
            }
          } else {
            console.log("左键");

            Model.currentPostion = [...Model.position];
            let nameGroup = earth.sceneTree.root.children.find((scene) => {
              return scene.title === combatPower.name;
            });
            if (Model.firstCreating) {
              Model.firstCreating = false;
              let fightingGroup = earth.sceneTree.root.children.find(
                (scene) => {
                  return scene.title === "救援力量";
                }
              );
              //判断是否存在救援力量分组
              if (!fightingGroup) {
                //不存在则创建
                fightingGroup = new XE.SceneTree.Group(earth);
                fightingGroup.title = "救援力量";
                earth.sceneTree.root.children.push(fightingGroup);
              }
              const sceneLeaf = new XE.SceneTree.Leaf(Model);
              console.log(Model);
              // sceneLeaf.title = Model._data.equipment_name;
              let index = fightingGroup.children.push(sceneLeaf);
              Model.treeIndex = index-1;
              Model.fightingGroup = fightingGroup.children;
              
              if (type == "vehicle") {
                Model.showTaskPrompt();
                // layer.prompt({ title: "任务设定", value:' ', btn:['确认'], formType: 2,}, 
                // function (
                //   text,
                //   index
                // ) {
                //   layer.close(index);
                //   if(text!=" "){
                //     let nowPosition = [...Model.position];
                //     Model.addTask(text.trim(), new Date().format('yyyy-MM-dd hh:mm:ss'),nowPosition[0],nowPosition[1],nowPosition[2],);
                //     console.log("任务内容：" + text);
                //   }
                  
                // });
              }
            }
          }
          // if(JSON.stringify(Model.xbsjPosition)==JSON.stringify(currentPostion)){
          //   alert(1);
          // }else{
          //   alert(0);
          // }
        }
      });
    },

    //表单下拉框初始化
    formListeners() {
      let form = layui.form;
      form.render();
      let that = this;
      form.on("select(combat_county)", function (option) {
        console.log(option);
        let county = that.counties.find((obj) => (obj.code = option.value));
        console.log(county);
        let organisations = county.organise || [];
        that.organisations = [];
        console.log(that.organistations);
        organisations.forEach((organisation) => {
          that.organisations.push({
            name: organisation.dept_name,
            key_id: organisation.keyid,
            equipments: organisation.equipment,
            typeCode: organisation.fk_organise_type_code,
          });
        });
        console.log(that.organisations);
      });

      form.on("select(combat_organisation)", function (option) {
        console.log(option);
        let equipments = that.organisations.find((obj) => (obj.keyid = option));
        console.log(equipments);
      });
    },
    //表单下拉框初始化
    getAreasByCode(code) {
      return new Promise((resolve, reject) => {
        this.$root.$hyControls.iov
          .infoByCity(code, "正在读取数据,请稍后")
          .then((data) => {
            let optionData = [];
            data.forEach((item) => {
              console.log(item.organise);
              optionData.push({
                key_id: item.code,
                name: item.name,
                organise: item.organise,
              });
            });
            console.log(optionData);
            resolve(optionData);
          });
      });
    },
    //监听tab切换
    listeningTabChange() {
      let element = layui.element;
      let that = this;
      element.on("tab(hyCombatPowerTab)", function (data) {
        switch (data.index) {
          case 0:
            that.combatPowerShow = true;
            break;
          case 1:
            that.fireFightingShow = true;
            break;
          case 2:
            that.fireManShow = true;
            break;
        }
      });
    },
    cancel(){
      this.show = false;
      this.combatPowerShow = false;
      this.fireManShow = false;
      this.fireFightingShow = false;
        
      console.log(this);
    },
    //从数据库中加载作战单位列表
    loadCombatPowerUnits(){
      let that = this;
      window._wait("正在获取作战单位列表...")
      this.$root.$hyServers.combatPower.listUnits().then(result=>{
        console.log(result);
        if(result.code === 200){
            that.unitTabs = [{
              name: "全部单位",
              key_id: -1,
            }];
            result.data.forEach((unit)=>{
              that.unitTabs.push({
                name: unit.Equipment_Name,
                key_id:unit.Key_Id
              })
            })
            //修改当前选择的单位,激活watch进行获取车辆.
            console.log(that.unitTabs);
            that.unitTabsActive.vehicle = -1;
        }
        layer.msg(result.msg);
      })
    },

    //刷新车辆列表
    changeVehicles(){
      var value = this.search_keyword;
      let unit = this.unitTabsActive.vehicle;
      if(unit == -1){
        unit = undefined;
      }
      this.$root.$hyServers.combatPower.listVehicles(unit,value).then(result=>{
        if(result.code === 200){
          this.vehicleData = {};
          result.data.forEach((vehicle)=>{
            if(!this.vehicleData[vehicle.fk_iri_type_id]){
              this.$set(this.vehicleData, vehicle.fk_iri_type_id,{
                name : vehicle.type_name,
                code : vehicle.fk_iri_type_id,
                vehicles: [],
              });
            }
          });
          
          result.data.forEach((vehicle)=>{
            this.vehicleData[vehicle.fk_iri_type_id].vehicles.push({
              keyId: vehicle.key_id,
              name: vehicle.equipment_name,
              code: vehicle.equipment_id,
              imgSrc: this.config.path.planRescuePc +'icon/'+ vehicle.type_icon,
              scope: vehicle.combat_radius,
              coord:[0,0,0],
              parameters:{
              },
              driver: { 
              }
            }) 
          });
        }
        
      })
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
    "unitTabsActive.vehicle"(v){
      this.changeVehicles();
    },
    show(v) {
      if (v) {
        let urlOptions = Cesium.queryToObject(
          window.location.search.substring(1)
        );
      }
    },
    fireFightingShow(val) {
      if (val) {
        this.show = true;
        let element = layui.element;
        element.tabChange("hyCombatPowerTab", "22");
        this.combatPowerShow = false;
        this.fireManShow = false;
      } else if (
        !this.combatPowerShow &&
        !this.fireManShow &&
        !this.fireFightingShow
      ) {
        this.show = false;
      }
    },
    combatPowerShow(val) {
      if (val) {
        this.show = true;
        let element = layui.element;
        element.tabChange("hyCombatPowerTab", "11");
        this.fireManShow = false;
        this.fireFightingShow = false;
      } else if (
        !this.combatPowerShow &&
        !this.fireManShow &&
        !this.fireFightingShow
      ) {
        this.show = false;
      }
    },
    fireManShow(val) {
      if (val) {
        this.show = true;
        let element = layui.element;
        element.tabChange("hyCombatPowerTab", "33");
        this.combatPowerShow = false;
        this.fireFightingShow = false;
      } else if (
        !this.combatPowerShow &&
        !this.fireManShow &&
        !this.fireFightingShow
      ) {
        this.show = false;
      }
    },
  },
  updated: () => {
    layui.form.render();
  },
};
</script>
<style scoped>
.xbsj-model-content {
  padding: unset !important;
  width: 100%;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.hy-content {
  display: flex;
  height: 100%;
  flex-direction: row;
}
.hy-content-left {
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid #2d2d2d;
}
.hy-content-left-units {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hy-content-left-units span {
  padding: 5px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}
.hy-content-left-units span.active {
  animation:myfirst 0.618s;background-color: rgba(0, 0, 0, 0.3);
}
@keyframes myfirst
{
from {background-color:unset;}
to {background-color: rgba(0, 0, 0, 0.3);}
}

@-moz-keyframes myfirst /* Firefox */
{
from {background-color:unset;}
to {background-color: rgba(0, 0, 0, 0.3);}
}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
from {background-color:unset;}
to {background-color: rgba(0, 0, 0, 0.3);}
}

@-o-keyframes myfirst /* Opera */
{
from {background-color:unset;}
to {background-color: rgba(0, 0, 0, 0.3);}
}
.hy-content-center {
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 4;
}
.hy-header {
  border-bottom: 1px solid #2d2d2d;
  text-align: center;
  font-size: 16px;
  padding: 5px;
}
.hy-list {
  font-size: 14px;
  width: 100%;
}
.org-select {
  height: 30px;
  font-size: 12px;
}
.hy-list:after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: #2d2d2d;
  z-index: 1;
  left: 0;
  margin-top: 3px;
  display: block;
}
.hy-list-title {
  padding: 4px;
  box-sizing: border-box;
  border-bottom: 1px solid #2d2d2d;
}
.hy-list-contents {
}
.hy-list-contents li {
  display: inline-block;
  padding: 8px 8px 0 8px;

}
.hy-list-content-img {
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: white;
  margin: 5px;
}
.hy-list-content-img.highlight,
.hy-list-content-img:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.hy-list-content-text {
  display: inline-block;
  width: 78px;
  text-align: center;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
}
.hy-list-content-text .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-height: 400px;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  position: absolute;
  z-index: 1;
  left: 6px;
  bottom: 30px;
  max-width: 200px;
  white-space: break-spaces;
}
.hy-list-content-text:hover .hy-list-content-tip {
  visibility: visible;
}
.layui-form-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.layui-form-item .layui-input-inline {
  width: 46%;
  margin: unset;
}
.layui-tab-content {
  padding: unset;
  height: calc(100% - 42px);
}
.layui-tab {
  height: 100%;
  margin: 0px 0 0px 0;
}
.layui-tab-title {
  background-color: rgb(82, 78, 78);
  display: flex;
  border-bottom: 2px solid #2d2d2d;
}
.layui-tab-title li {
  flex: 4;
}
.layui-tab-title .layui-this {
  color: #fff;
  background-color: rgb(44, 41, 41);
  flex: 5;
}
.layui-tab-item {
  height: 100%;
}
.layui-tab-brief > .layui-tab-more li.layui-this:after,
.layui-tab-brief > .layui-tab-title .layui-this:after {
  border: none;
}
</style>
<style>
.hy-firefightingengine .layui-form-select dl dd {
  color: black;
}

.hy-firefightingengine .layui-input,
.layui-select,
.layui-textarea {
  height: 25px;
  background-color: #474747;
  color: white;
}
.hy-firefightingengine .layui-input::placeholder {
  color: rgb(212, 205, 205);
}
.hy-firefightingengine .layui-form-select dl {
  top: 25px;
}
.layui-form-select dl dd,
.layui-form-select dl dt {
  color: #474747;
}
</style>