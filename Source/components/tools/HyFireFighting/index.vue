// author 张杰
// date 2020年7月10日
// description 消防设施模型列表弹窗
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatright="true"
      :width="310"
      :height="300"
      :top="148"
      :right = "0"
      :title="lang.title"
      class="hy-firefightingengine"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <!-- <div class="hy-select">
          <form class="layui-form">
            <div class="layui-form-item">
              
              <div class="layui-input-inline">
              <select id="province" lay-filter="province" lay-verify="required" lay-search="">
                
                <option v-for="city in citys" :value="city.key_id" :key="'hyvehiclelist'+city.key_id">{{city.name}}</option>
              </select>
              </div>
              <div class="layui-input-inline">
              <select id="city" lay-filter="city" lay-verify="required" lay-search="">
                <option value="">请选择或搜索区/县</option>
                <option v-for="area in areas" :value="area.key_id" :key="'hyvehiclelist'+area.key_id">{{area.name}}</option>
              </select>
              </div>
              <div class="layui-input-inline">
              <select id="area" lay-filter="area" lay-verify="required" lay-search="">
                <option value="">请选择或搜索单位</option>
                <option v-for="unit in units" :value="unit.key_id" :key="'hyvehiclelist'+unit.key_id">{{unit.name}}</option>
              </select>
              </div>
            </div>
          </form>
          
          
        </div> -->

        <!-- 车辆类型列表 -->
        <div class="hy-list" v-for="(engine) in engines" :key="engine.code">
          <!-- 车辆类型名称 -->
          <div class="hy-list-title">{{engine.name}}</div>
          <!-- 车辆类型下的车辆列表 -->
          <ul class="hy-list-contents">
            <!-- 一个车辆 单击后进行模型创建操作 -->
            <li
              v-for="vehicle in engine.vehicles"
              :key="vehicle.code"
              @click="createVehicle(vehicle)"
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
import vehicleData from "./data"; 
import HyVehicle from "@/managers/tools/houyi/FireControlFacilities"; //自定义消防车模型

export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      selectedGroup: {
        id: "",
        name: ""
      },
      engines: [],
      groups: [],
      models: [],
      lang: {},
      langs: languagejs,
      citys:[{
        key_id:2,
        parent_id:1,
        name:"滁州",
        code: 341100,
      }],
      areas:[],
      units:[]
    };
  },
  created() {
    let form = layui.form;
    form.render();
  },
  mounted() {
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    //绑定显隐
    this._disposers.push(
      XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
    );

    //获取作战力量分组
    this.groups = this.getGroups();

    //页面加载完成后获取车辆数据
    {
      this.engines = this.getEngines();
    }
    // console.log(this);

    //显示窗体
    // this.show = true;

    

  },
  methods: {
    //获取模型
    //author 谢灿
    createVehicle(vehicle) {
      //查找当前已添加的模型列表, 查看vehicle是否存在模型
      //如果存在则飞到模型, 不存在则创建

      let fightingGroup = this.earth.sceneTree.root.children.find(scene => {
        return scene.title === "作战力量";
      });

      if (!!fightingGroup) {
        let exisModel = fightingGroup.children.find(child=>{
          return child.czmObject.xbsjGuid === vehicle.code
        })
        if(exisModel!=null){
          let czmObj = exisModel.czmObject;
          //飞到坐标上空100米高度, 不带角度
          this.$root.$earth.camera.flyTo([czmObj.xbsjPosition[0],czmObj.xbsjPosition[1],czmObj.xbsjPosition[2]], 200);
          return;
        }
      }
      let Model = vehicle.model;
      this.createModel(vehicle);
      // console.log(vehicle)
      // if (Model) {
      //   Model.flyTo();
      // } else {
      //   this.createModel(vehicle);
      // }
    },
    //创建模型本体
    createModel(vehicle) {
      console.log(vehicle);
      let that = this;
      var Model = new HyVehicle(this.earth, vehicle.code);
      Model.creating = true;
      Model.isCreating = true;
      vehicle.model = Model;
      let earth = this.earth;
      this.isCreating = false;
      let fightingGroup = earth.sceneTree.root.children.find(scene => {
        return scene.title === "作战力量";
      });
      //判断是否存在作战力量分组
      if (!fightingGroup) {
        //不存在则创建
        fightingGroup = new XE.SceneTree.Group(earth);
        fightingGroup.title = "作战力量";
        earth.sceneTree.root.children.push(fightingGroup);
      }
      const sceneLeaf = new XE.SceneTree.Leaf(Model);
      fightingGroup.children.push(sceneLeaf);
    },

    //获取消防栓列表 目前返回的是测试数据后期需要对接数据库
    getEngines() {
      return vehicleData.vehicles;
    },
    getGroups() {
      return vehicleData.groups;                                                                 
    },
    selectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
    },
    //根据市级code获取区县
    getAreas(code){
      
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
  },
  updated:()=>{
    layui.form.render();
  }
};
</script>

<style scoped>
.hy-firefightingengine {
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 100%;
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
  width: 78px;
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
.layui-form-item .layui-input-inline{
  width: 29%;
}
</style>
<style>
.hy-firefightingengine .layui-form-select dl dd{
  color: black;
}

.hy-firefightingengine .layui-input, .layui-select, .layui-textarea{
  height: 25px;
  background-color: #474747;
  color: white;
}
.hy-firefightingengine .layui-input::placeholder{
  color: rgb(212, 205, 205);
}
.hy-firefightingengine .layui-form-select dl{
  top: 25px;
}
</style>