//author 谢灿
//date 2020年1月14日
//description 推演 组件
<template>
  <!-- box -->
  <div class="xbsj-template">
    <div
      class="xbsj-list"
      ref="container"
      @mousedown="startMove($event)"
      @mousemove="onMoving($event)"
      @mouseup="endMove($event)"
    >
      <div class="xbsj-list-item">
        <!-- 编制 -->
        <span class="xbsj-list-name">{{lang.deduce}}</span>
        <!-- 预案编制 -->
        <div class="xbsj-item-btnbox" @click="disasterManagementShow = !disasterManagementShow">
          <div class="xbsj-item-btn disasterButton" :class="disasterManagementShow?'disasterButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.disaster}}</span>
        </div>
        <!-- 预案编制 
        <div class="xbsj-item-btnbox" @click="maneuverManagementShow = !maneuverManagementShow">
          <div class="xbsj-item-btn maneuverButton" :class="maneuverManagementShow?'maneuverButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.maneuver}}</span>
        </div>
         
        <div class="xbsj-item-btnbox" @click="majorHazardSourceShow=!majorHazardSourceShow">
          <div class="xbsj-item-btn firePointButton" :class="majorHazardSourceShow?'firePointButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.kindlingPoint}}</span>
        </div>-->
      </div>
        <!-- 车联网 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.model}}</span>
        <!-- 消防车 -->
        <div class="xbsj-item-btnbox" @click="vehicleShow=!vehicleShow">
          <div class="xbsj-item-btn fireFightingTrunkbutton" :class="vehicleShow?'fireFightingTrunkbuttonActive' : ''"></div>
          <span class="xbsj-item-name">{{lang.fireFightingEngine}}</span>
        </div>
        <!-- 消防设备 -->
        <div class="xbsj-item-btnbox" @click="fireFighting">
          <div class="xbsj-item-btn fireHydrantbutton"></div>
          <span class="xbsj-item-name">{{lang.fireFighting}}</span>
        </div>
        <!-- 消防人员 -->
        <div class="xbsj-item-btnbox" @click="fireman">
          <div class="xbsj-item-btn fireman"></div>
          <span class="xbsj-item-name">{{lang.fireman}}</span>
        </div>
        <div class="xbsj-item-btnbox">
          <div class="xbsj-item-btn more"></div>
          <span class="xbsj-item-name">{{lang.more}}</span>
        </div>
      </div>
      
        <!-- 疏散 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.evacuate}}</span>
        <!-- 疏散方向 -->
        <div class="xbsj-item-btnbox" @click="DoubleArrow">
          <div class="xbsj-item-btn DoubleArrow" :class="vehicleShow?'DoubleArrowActive' : ''"></div>
          <span class="xbsj-item-name">{{lang.doubleArrow}}</span>
        </div>
      </div>
        <!-- 分析 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.analysis}}</span>
        <!-- 蔓延趋势 -->
        <div class="xbsj-item-btnbox ml20" @click="spreadBtn">
          <div class="xbsj-item-btn spread"></div>
          <span class="xbsj-item-name">{{lang.spread}}</span>
        </div>
      </div>
      <!-- 链接 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.link}}</span>
        <!-- 链接消防栓 -->
        <div class="xbsj-item-btnbox ml20" @click="link([1,0,0.1,1], '链接消防栓')">
          <div class="xbsj-item-btn fireHydrantbutton"></div>
          <span class="xbsj-item-name">{{lang.linkHydrant}}</span>
        </div>
        <!-- 链接水源 -->
        <div class="xbsj-item-btnbox ml20" @click="link([0,0.576,1,1], '链接水源')">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.linkWater}}</span>
        </div>
        <!-- 链接供水车 -->
        <div class="xbsj-item-btnbox ml20" @click="link([0,1,0.88,1], '链接供水车')">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.linkWaterVehicle}}</span>
        </div>
        <!-- 链接供液车 -->
        <div class="xbsj-item-btnbox ml20" @click="link([0.88,1,0,1], '链接供液车')">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.linkLiquidVehicle}}</span>
        </div>
        <!-- 链接供粉车 -->
        <div class="xbsj-item-btnbox ml20" @click="link([0,0.88,1,1], '链接供粉车')">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.linkPowderVehicle}}</span>
        </div>
      </div>
      <!-- 作战目标 -->
      <div class="xbsj-list-item xbsj-list-lastitem">
        <span class="xbsj-list-name">{{lang.target}}</span>
        <!-- 链接作战目标 -->
        <div class="xbsj-item-btnbox ml20" @click="link([1,0,0.1,1], '链接作战目标')">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.linkTarget}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import HyLink from "@/managers/tools/houyi/Link";//自定义连线

export default {  
  components: {
  },
  data() {
    return {
      vehicleShow:false,
      selectlist: false,
      disasterManagementShow: false, //事故灾害场景管理面板显示控制
      majorHazardSourceShow:false,//事件点的重大危险源显示控制
      maneuverManagementShow: false,//演练管理显示控制
      maneuverSatatusShow: true, //
      lang: {},
      langs: languagejs,
      SpreadShow:false,
      EntityMoreShow: false,
      show: true
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    fireFighting(){
      alert('消防设备')
    },
    fireFightingEngine(){
      // alert('消防车辆')
      var earth = this.$root.$earth;
      var fireFightingEngine = {
        name: '消防车辆',
        earth: earth,
      };
      // this.$root.$earthUI.showPropertyWindow(fireFightingEngine, {component:'HyFireFightingEngine'});

    },
    fireman(){
      alert('消防人员')
    },
    
    //双箭头
    DoubleArrow() {
      var DoubleArrow = new XE.Obj.Plots.GeoDoubleArrow(this.$root.$earth);
      // console.log(DoubleArrow);
      DoubleArrow.creating = true;
      DoubleArrow.isCreating = true;
      DoubleArrow.name = "疏散方向";
      this.$root.$earthUI.showPropertyWindow(DoubleArrow);
    },
    //蔓延趋势按钮
    spreadBtn(){
      let that = this;
      let earth = this.$root.$earth;
      let scene = earth.czm.scene;
      //创建一个自定义图元
      let Spread = new XE.Obj.CustomPrimitive(earth);
      Spread.name = "蔓延趋势";
      Spread.isCreating = true; //是否是初始化
      Spread.component = 'spreadTool';
      //创建
      Spread.evalString = `
        console.log('创建蔓延趋势');
      `
      //每帧刷新时
      Spread.preUpdateEvalString=`
        // console.log(p.position);
      `
      //销毁时
      Spread.disposers.push(function(){
        console.log('蔓延趋势销毁');
      })
      this.$root.$earthUI.showPropertyWindow(Spread, {component:'HySpreadTool'});

    },
    /**
     * @author 谢灿
     * @desc 2019年12月31日
     * @description 创建模型链接 ODline 如果后期增加可以绑定的类型如 pin 等其他xbsjType,则将类型作为一个配置js，引入后使用。
     * @param {Array} rgba OD线颜色 元素最大值为1
     * @param {String} name OD线名称 
     */
    link(rgba,name){
      let that = this;      
      let czm = this.$root.$earth.czm;
      var link = new HyLink(this.$root.$earth);
      link.material.type = "XbsjODLineMaterial";
      link.material.XbsjODLineMaterial.color= rgba||[1,0.5,0,1];
      link.name = name||"链接线";
      link.allowPicking = true;
      link.isCreating = true;
      link.creating = true;
      link.init();
    },
    startMove(event) {
      if (
        event.target.parentElement !== this.$refs.container &&
        event.target.parentElement.parentElement !== this.$refs.container
      ) {
        this.moving = false;
        return;
      }
      this.moving = true;
    },
    onMoving(event) {
      //获取鼠标和为开始位置的插值，滚动滚动条
      if (!this.moving) return;
      var dom = this.$refs.container;
      var wleft = dom.scrollLeft - event.movementX;
      if (wleft >= 0 && wleft <= dom.scrollWidth - dom.clientWidth) {
        dom.scrollLeft = wleft;
      }
    },
    endMove(envent) {
      this.moving = false;
    }
  },
  watch:{
  }
};
</script>

<style>
.modelbutton {
  background: url(../../../../images/createmodel.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.modelbutton:hover {
  background: url(../../../../images/createmodel_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.more {
  background: url(../../../../images/more.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.more:hover {
  background: url(../../../../images/more_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireHydrantbutton {
  background: url(../../../../images/fire-fighting.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireHydrantbutton:hover {
  background: url(../../../../images/fire-fighting_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireFightingTrunkbutton {
  background: url(../../../../images/fire-fighting-trunk.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireFightingTrunkbutton:hover {
  background: url(../../../../images/fire-fighting-trunk_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireFightingTrunkbuttonActive {
  background: url(../../../../images/fire-fighting-trunk_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireman {
  background: url(../../../../images/fireman.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireman:hover {
  background: url(../../../../images/fireman_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.spread {
  background: url(../../../../images/spread.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.spread:hover {
  background: url(../../../../images/spread_on.png) no-repeat;
}


.odbutton {
  background: url(../../../../images/path.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.odbutton:hover {
  background: url(../../../../images/path_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firePointButton{

  background: url(../../../../images/fire.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firePointButton:hover{
  background: url(../../../../images/fire_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firePointButtonActive{
  background: url(../../../../images/fire_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButton{

  background: url(../../../../images/disaster.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButtonActive{
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.disasterButtonButton:hover{
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.maneuverButton{

  background: url(../../../../images/maneuver.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.maneuverButtonActive{
  background: url(../../../../images/maneuver_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.maneuverButton:hover{
  background: url(../../../../images/maneuver_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.DoubleArrow {
  background: url(../../../../images/doublearrow.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.DoubleArrowActive {
  background: url(../../../../images/doublearrow.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.DoubleArrow:hover {
  background: url(../../../../images/doublearrow_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>

