// author 谢灿
// date 2019年12月9日
// description 消防车模型列表弹窗
<template>
  <Window
    :footervisible="false"
    @cancel="show=false"
    v-show="show"
    :floatright="true"
    :width="463"
    :minWidth="202"
    :height="500"
    :left="5"
    :top="138"
    :title="lang.title"
    class="hy-firefightingengine"
  >
    <!-- 窗体内容区域 -->
    <div class="hy-content">
      <div class="hy-select">
        <DropDownSelector :changeHandler="selectChange" :groups="groups"></DropDownSelector>
      </div>
      
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
</template>

<script>
import languagejs from "./index_locale";
import vehicleData from "./data";
import DropDownSelector from '@components/common/HouYi/DropDownSelector';
import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyLabel from "@hyPlugins/label";
export default {
  props: {
    // getBind: Function
  },
  components: {
    DropDownSelector
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      selectedGroup:{
        id:'',
        name:''
      },
      engines: [],
      groups: [],
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

    //显示窗体
    // this.show = true;
  },
  methods: {
    //获取模型
    //author 谢灿
    createVehicle(vehicle) {
      console.log(this.earth);
      let Model = this.earth.getObject(vehicle.guid);
      if (Model) {
        Model.flyTo();
      } else {
        this.createModel(vehicle);
      }
    },
    //创建模型本体
    createModel(vehicle) {
      var Model = new XE.Obj.Model(this.earth);
      Model.url = vehicle.glbSrc;
      Model.code = vehicle.code;
      Model.creating = true;
      Model.isCreating = true;
      Model.name = vehicle.name;
      vehicle.guid = Model.guid;

      Model.HyCustomPrimitiveCircle = HyCustomPrimitiveCircle;
      Model.HyLabel = HyLabel;

      let driverMsg =
        vehicle.name +
        "\\n驾驶员名:" +
        vehicle.driver.name +
        "\\n联系方式:" +
        vehicle.driver.phone +
        "\\n编号:" +
        vehicle.driver.code;
      let agentiaMsg =
        "容量:" +
        vehicle.driver.name +
        "\\n剩余量:" +
        vehicle.driver.phone +
        "\\n:" +
        vehicle.driver.code;
      //Model初始化时执行的js代码
      Model.evalString =
        `
      //实例一个自定义图元-圆为作战半径
      let scopeCircle = new p.HyCustomPrimitiveCircle(p,'作战半径动画');

      setTimeout(function(){
        let viewer = p._earth.czm.viewer;
        //画出作战范围
        scopeCircle.drawScan(` +
        vehicle.scope +
        `);

        //显示坐标信息
        let positionLabelConfig = {
          model: p
        };
        let positionLabel = new p.HyLabel(positionLabelConfig);

        //显示驾驶员信息
        let driverLabelConfig = {
          model: p,
          offset:[0,-75],
          textFnc:()=> {return '` +
        driverMsg +
        `';}
        }
        let driverLabel = new p.HyLabel(driverLabelConfig);
        
        //显示药剂剩余量
        // let 
      },0);
      `;
      Model.disposers.push(() => {
        console.log(3);
      });
      console.log(Model);
      Model.onclick = e => {
        this.$root.$earthUI.showPropertyWindow(
          {
            name: vehicle.name + "的属性",
            czmObj: Model
          },
          {
            component: "HyPropertyWindow"
          }
        );
      };
      // vehicle.czmObj = Model;
    },
    //获取消防车列表 目前返回的是测试数据后期需要对接数据库
    getEngines() {
      return vehicleData.vehicles;
    },
    getGroups() {
      return vehicleData.groups;
    },
    selectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
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
    "selectedGroup"(v){
      console.log(v)
    }
  }
};
</script>

<style scoped>
.hy-firefightingengine {
  min-width: 462px;
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
