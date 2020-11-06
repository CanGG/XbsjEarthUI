//author 谢灿
//date 2020年1月14日
//description 编制 组件
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
          <div
            class="xbsj-item-btn disasterButton"
            :class="disasterManagementShow?'disasterButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.disaster}}</span>
        </div>
        <div v-show="establishmentButtonShow" class="xbsj-item-btnbox" @click="saveEstablishment">
          <div
            class="xbsj-item-btn saveEstablishmentButton"
            :class="saveEstablishmentShow?'saveEstablishmentActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.save}}</span>
        </div>
        <div v-show="establishmentButtonShow" class="xbsj-item-btnbox" @click="exitEstablishment">
          <div
            class="xbsj-item-btn exitEstablishmentButton"
            :class="exitEstablishmentShow?'exitEstablishmentActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.exit}}</span>
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
        <!-- <div class="xbsj-item-btnbox" @click="vehicleShow=!vehicleShow">
          <div class="xbsj-item-btn fireFightingTrunkbutton" :class="vehicleShow?'fireFightingTrunkbuttonActive' : ''"></div>
          <span class="xbsj-item-name">{{lang.fireFightingEngine}}</span>
        </div>-->

        <!-- 作战力量 -->
        <div class="xbsj-item-btnbox" @click="combatPowerShow=!combatPowerShow">
          <div
            class="xbsj-item-btn fireFightingTrunkbutton"
            :class="combatPowerShow?'fireFightingTrunkbuttonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.power}}</span>
        </div>
        <!-- 消防设备 -->
        <div class="xbsj-item-btnbox" @click="fireFightingShow=!fireFightingShow">
          <div
            class="xbsj-item-btn fireHydrantbutton"
            :class="fireFightingShow?'fireHydrantbuttonActive' : ''"
          ></div>
          <span class="xbsj-item-name">{{lang.fireFighting}}</span>
        </div>
        <!-- 消防人员 -->
        <div class="xbsj-item-btnbox" @click="fireManShow=!fireManShow">
          <div class="xbsj-item-btn fireman" :class="fireManShow?'firemanActive' : ''"></div>
          <span class="xbsj-item-name">{{lang.fireman}}</span>
        </div>
        <!-- <div class="xbsj-item-btnbox">
          <div class="xbsj-item-btn more"></div>
          <span class="xbsj-item-name">{{lang.more}}</span>
        </div> -->
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
import HyLink from "@/managers/tools/houyi/Link"; //自定义连线
import HySpread from "@/managers/tools/houyi/Spread"; //自定义消防车模型
import HyArrowLabel from "@hyPlugins/arrow_label";

export default {
  components: {},
  data() {
    return {
      vehicleShow: false,
      selectlist: false,
      disasterManagementShow: false, //事故灾害场景管理面板显示控制
      majorHazardSourceShow: false, //事件点的重大危险源显示控制
      maneuverManagementShow: false, //演练管理显示控制
      combatPowerShow: false, //作战力量
      maneuverSatatusShow: true, //
      saveEstablishmentShow: false,
      exitEstablishmentShow: false,
      fireFightingShow: false,
      fireManShow: false,
      lang: {},
      langs: languagejs,
      SpreadShow: false,
      EntityMoreShow: false,
      show: true,
      establishmentButtonShow: false, //保存退出按钮显隐
      maneuver: {
        id: -1,
        name: "预案编制状态",
      },
      disaster: {
        id: -1,
        name: "",
        parts: "",
        level: "",
        levelInfo: "",
      },
    };
  },
  created() {},
  mounted() {
    this.earth = this.$root.$earth;
    console.log(this);
  },
  methods: {
    fireFighting() {
      alert("消防设备");
    },
    fireFightingEngine() {
      // alert('消防车辆')
      var earth = this.$root.$earth;
      var fireFightingEngine = {
        name: "消防车辆",
        earth: earth,
      };
      // this.$root.$earthUI.showPropertyWindow(fireFightingEngine, {component:'HyFireFightingEngine'});
    },
    fireman() {
      alert("消防人员");
    },

    //双箭头
    DoubleArrow() {
      var earth = this.$root.$earth;
      var DoubleArrow = new XE.Obj.Plots.GeoDoubleArrow(this.$root.$earth);
      //let DoubleArrow = new HyDoubleArrow(this.$root.$earth);
      // console.log(DoubleArrow);
      DoubleArrow.creating = true;
      DoubleArrow.isCreating = true;
      DoubleArrow.name = "疏散方向";
      DoubleArrow.label = HyArrowLabel;
      console.log(DoubleArrow);
      DoubleArrow.firstCreating = true;

      let layer = layui.layer;
      
      DoubleArrow.onclick = (e) => {
        DoubleArrow.creating = true;
        //window.uia.showPropertyWindow(this);
      };
      XE.MVVM.watch(DoubleArrow, "creating", (c) => {
        if (c == false) {
          console.log(DoubleArrow);
          if (DoubleArrow.firstCreating) {
            const sceneLeaf = new XE.SceneTree.Leaf(DoubleArrow);
            earth.sceneTree.root.children.push(sceneLeaf);
            DoubleArrow.firstCreating = false;
          }
          console.log(DoubleArrow);
          layer.prompt({ title: "文字内容",value:"", formType: 2 }, function (
            text,
            index
          ) {
            layer.close(index);
            DoubleArrow.evalString = `
            
            setTimeout(function(){
              let driverLabelConfig = {
                model: p,
                offset: [0, -20],
                textFnc: () => {
                  return '`+text+`';
                },
              };
              let driverLabel = new p.label(driverLabelConfig);
            },0)`;
            // if (DoubleArrow.labelText) {
            //   DoubleArrow.earth.czm.viewer.entities.remove(
            //     DoubleArrow.labelText
            //   );
            // }

            // let driverLabelConfig = {
            //   model: DoubleArrow,
            //   offset: [0, -20],
            //   textFnc: () => {
            //     return text;
            //   },
            // };
            // let driverLabel = new HyArrowLabel(driverLabelConfig);

            // DoubleArrow.labelText = driverLabel.label;
          });
        }
      });
      // var DoubleArrow = new XE.Obj.Plots.GeoDoubleArrow(this.$root.$earth);
      // // console.log(DoubleArrow);
      // DoubleArrow.creating = true;
      // DoubleArrow.isCreating = true;
      // DoubleArrow.name = "疏散方向";
      // this.$root.$earthUI.showPropertyWindow(DoubleArrow);
    },
    //蔓延趋势按钮
    spreadBtn() {
      let that = this;
      console.log(1);
      let Spread = new HySpread(this.earth);
      let component = 'HySpreadTool';
      let guid =  Spread.guid + "_" + component
      //新建窗口   
      let test = this.$root.$earthUI.showPropertyWindow(Spread);
    },
    /**
     * @author 谢灿
     * @desc 2019年12月31日
     * @description 创建模型链接 ODline 如果后期增加可以绑定的类型如 pin 等其他xbsjType,则将类型作为一个配置js，引入后使用。
     * @param {Array} rgba OD线颜色 元素最大值为1
     * @param {String} name OD线名称
     */
    link(rgba, name) {
      let that = this;
      let czm = this.$root.$earth.czm;
      var link = new HyLink(this.$root.$earth);
      link.material.type = "XbsjODLineMaterial";
      link.material.XbsjODLineMaterial.color = rgba || [1, 0.5, 0, 1];  
      link.name = name || "链接线";
      link.allowPicking = true;
      link.isCreating = true;
      link.creating = true;
      let rescueForceIconControl = document.getElementsByClassName("rescueForceIconControl");
      for(let i=0;i<rescueForceIconControl.length;i++){
        rescueForceIconControl[i].classList.add("pointerEventsNone");
      }
      XE.MVVM.watch(link, "creating", (c) => {
        if(c==false){
          for(let i=0;i<rescueForceIconControl.length;i++){
            rescueForceIconControl[i].classList.remove("pointerEventsNone");
          }
        }
      })
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
    },
    //保存场景
    saveEstablishment() {
      layui.layer.msg("保存推演");
      this.saveScene();
    },
    saveScene() {
      console.log(this);
      let jsonObj = this.$root.$earth.toJSON();
      let json = JSON.stringify(jsonObj);
      window._wait();
      this.$root.$hyServers.planBasicInfo.update(this.config.scene.key_id,{content: json}).then((result) => {
        layer.msg(result.msg);
        console.log(result)
      }).catch((err) => {
        
      });

    },
    //退出
    exitEstablishment() {
      let that = this;
      let viewer = this.$root.$earth.czm.viewer;
      layer.confirm("是否退出编制?(请确认是否保存!)", (index) => {
        layer.close(index);
        layer.msg("退出成功");
        that.$root.$hyControls.loadOrgScene(that.config.org.key_id);
        that.establishmentButtonShow = false;
        that.$parent.$parent.$refs["hyStatusDisplay"].show = false;
        window.disasterAreas.show = false;
      });
    },
  },
  watch: {},
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
.exitEstablishmentButton {
  background: url(../../../../images/exit.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.exitEstablishmentButton:hover {
  background: url(../../../../images/exit_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.exitEstablishmentActive {
  background: url(../../../../images/exit_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.saveEstablishmentButton {
  background: url(../../../../images/savecj.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.saveEstablishmentButton:hover {
  background: url(../../../../images/savecj_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.saveEstablishmentActive {
  background: url(../../../../images/savecj_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireHydrantbutton {
  background: url(../../../../images/fire-fighting.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireHydrantbuttonActive {
  background: url(../../../../images/fire-fighting_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fireHydrantbutton:hover {
  background: url(../../../../images/fire-fighting_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.combatPowerButton {
  background: url(../../../../images/fire-fighting.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.combatPowerButtonActive {
  background: url(../../../../images/fire-fighting_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.combatPowerButton:hover {
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
.firemanActive {
  background: url(../../../../images/fireman_on.png) no-repeat;
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
.firePointButton {
  background: url(../../../../images/fire.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firePointButton:hover {
  background: url(../../../../images/fire_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firePointButtonActive {
  background: url(../../../../images/fire_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButton {
  background: url(../../../../images/disaster.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButtonActive {
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.disasterButtonButton:hover {
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.maneuverButton {
  background: url(../../../../images/maneuver.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.maneuverButtonActive {
  background: url(../../../../images/maneuver_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.maneuverButton:hover {
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

