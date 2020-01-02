//author 谢灿
//date 2019年12月20日
//description 推演&指挥 组件
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
          <div class="xbsj-item-btn firebutton"></div>
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
      <div class="xbsj-list-item xbsj-list-lastitem">
        <span class="xbsj-list-name">{{lang.animals}}</span>
        <!-- 蔓延趋势 -->
        <div class="xbsj-item-btnbox ml20" @click="spreadBtn">
          <div class="xbsj-item-btn spread"></div>
          <span class="xbsj-item-name">{{lang.spread}}</span>
        </div>
        <span class="xbsj-list-name">{{lang.animals}}</span>
        <!-- od线 -->
        <div class="xbsj-item-btnbox ml20" @click="link">
          <div class="xbsj-item-btn odbutton"></div>
          <span class="xbsj-item-name">{{lang.link}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languagejs from "./index_locale";
export default {  
  components: {
  },
  data() {
    return {
      vehicleShow:false,
      selectlist: false,
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
     * @date 2019年12月31日
     * @description 创建模型链接 ODline
     * @ps 如果后期增加可以绑定的类型如 pin 等其他xbsjType,则将类型作为一个配置js，引入后使用。
     */
    link(){
      let that = this;      
      let czm = this.$root.$earth.czm;
      var Polyline = new XE.Obj.Polyline(this.$root.$earth);
      Polyline.name = "轨迹线";
      Polyline.allowPicking = true;
      Polyline.isCreating = true;
      Polyline.creating = true;
      Polyline.material.type = "XbsjODLineMaterial";

      let positionLength = 1;
      let watch = XE.MVVM.watch(Polyline, 'positions', (positions) => {
        //获取第一和第二个点, 当第二个点结束则闭合 
        //此处这样判断是因为positions在闭合后又会出发该监听同时会-1。可以避免误触。
        if(positionLength < positions.length){
          positionLength = positions.length;
          //获取最新添加的点并转化为屏幕坐标
          let newPointPosition = positions[positionLength-1];
          let scene = czm.scene;
          let degree = [...newPointPosition].xeptd;
          let c3 =  Cesium.Cartesian3.fromDegrees(degree[0], degree[1], degree[2]);
          let windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, c3);

          //通过scene.pick(屏幕坐标)方法获取该点是否为model,如果是则绑定坐标。
          var pick = scene.pick(windowPosition);
          //存在且仅为Model时能绑定。
          if(!!pick && pick.id.xbsjType === 'Model'){
            //绑定坐标，此处positions为数组,因此绑定的键为 '0' '1'
            //而positionLength变量比键大2，所以减去2，同时+''转化为字符串
            XE.MVVM.bind(pick.id,'xbsjPosition', Polyline.positions, (positionLength-2)+'');
          }
          //超过两个点 关闭线 并显示属性框
          if(positions.length>2){
            Polyline.creating = false;
            that.$root.$earthUI.showPropertyWindow(Polyline);
          }
        }
      });
      
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
.firebutton {
  background: url(../../../../images/fire-fighting.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.firebutton:hover {
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
</style>

