<template>
  <Window
    :width="490"
    :minWidth="490"
    :height="370"
    :floatright="true"
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
        <input style="float:left; width:40px" type="number" max="1000" min="0" v-model="model.size" @input="changeTool()"/>
        <!-- 风向 -->
        <label>{{lang.windDirection}}</label>
        <input style="float:left; width:40px" type="number" max="360" min="0" v-model="model.windDirection" @input="changeTool()"/>
         <!-- 风力 -->
        <label>{{lang.windPower}}</label>
        <input style="float:left; width:40px" type="number" max="18" min="0" v-model="model.windPower" @input="changeTool()"/>
      </div>
      <div class="flatten">
         <!-- 透明度 -->
        <label>{{lang.transp}}</label>
        <div class="flatten-box">
          <XbsjSlider style="float:left;padding-top:15px; width:330px" :min="0" :max="1" :step="0.1" showTip="always" v-model="model.transp" > 
          </XbsjSlider>
        </div>
      </div>
        
      <!-- 当前位置 -->
      <div class="flatten">
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
//创建箭头的脚本
import createArrow from "./arrow";
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
        transp:0.6,
        size: 40,
        windDirection: 30,
        windPower: 4,
        xbsjPosition:[0, 0, 0],
        diffusivity: 1,
      },
      pinstyletype: true,
      langs: languagejs,
    };
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    // 数据关联
    this._disposers = this._disposers || [];
    //Spread 自定义图元
    var czmObj = this.getBind();
    let that = this;
    if (czmObj) {
      this._czmObj = czmObj;
    // console.log(czmObj);
    }else{
      return;
    }
    //创建属性面板的元素
    if(czmObj.isCreating){
      this.createTool();
    }

    //数据关联, key为传参, value 为本模板 data
    const bindData = {
      name: "model.name",
      show: "model.show",
      "normals.freelyMove": "model.freelyMove",
      "normals.size":"model.size",
      "normals.windDirection":"model.windDirection",
      "normals.windPower":"model.windPower",
      "normals.transp": 'model.transp',
      position: "model.xbsjPosition",
      enabled: "model.enabled"
    };

    Object.entries(bindData).forEach(([sm, vm]) => {
      if (typeof vm === "string") {
        this._disposers.push(XE.MVVM.bind(this, vm, czmObj, sm));
      } else {
        this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
      }
    });
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
    startDegree(){
      return this.model.xbsjPosition.xePositionToDegrees;
    },
    //获取加工过后的风力
    windPower(){
      return this.model.windPower / 10 +1;
    }
  },
  watch: {
    //监听自由移动按钮,激活时增加鼠标监听 关闭后移除鼠标监听
    "model.freelyMove"(newV,oldV){
        let that = this;
        let earth = this._czmObj.earth;
        let viewer = earth.czm.viewer;
        let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        if(newV){
          handler.setInputAction(event => {
            var cartographic = earth.pickPosition(event.endPosition);
            if(!!cartographic){
              that.model.xbsjPosition = cartographic;
            }
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          let startTime;
          handler.setInputAction(event => {
            startTime = new Date();
          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
          let endTime;
          handler.setInputAction(event => {
            endTime = new Date();
            if(endTime - startTime < 200){
              that.model.freelyMove = false;
              //创建Arrows 需要先转坐标为Degrees
              this.model.xbsjPosition.xePositionToDegrees;
              that.setArrows();
              handler.removeInputAction( Cesium.ScreenSpaceEventType.MOUSE_MOVE)
              handler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_DOWN)
              handler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_UP)
            }
          }, Cesium.ScreenSpaceEventType.LEFT_UP);
        }else{
          handler.removeInputAction( Cesium.ScreenSpaceEventType.MOUSE_MOVE)
          handler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_DOWN)
          handler.removeInputAction( Cesium.ScreenSpaceEventType.LEFT_UP)
        }
    },
    //位置 编辑 监听
    "model.editing"(newV,oldV){
      if(newV){
          let pin = new XE.Obj.Pin(this._czmObj.earth);
          this._pin = pin;
          pin.position = [...this.model.xbsjPosition];
          pin.show = false;
          var ub = XE.MVVM.bind(pin, 'position', this._czmObj, 'position');
          pin.editing = true;
      }else{
          this._pin.editing = false;
          //创建Arrows 需要先转坐标为Degrees
          this.model.xbsjPosition.xePositionToDegrees;
          this.setArrows();
      }
    },
    "model.isCreating"(newV,oldV){

    },
    //透明度监听
    "model.transp"(n,o){
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
        this.destroyArrows();
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
    changeTool(){
      let that = this;
      let tool = this._czmObj;
      clearTimeout(this.delayFlag);
      this.delayFlag = setTimeout(function(){
        tool.drawCanvas(ctx => {
          that.threeLeveltool(ctx);
        })
        that.setArrows();
      },200);
    },
    //第一次创建图元
    createTool(){
      let that = this;
      let tool = this._czmObj;
      let earth = tool.earth;
      let scene = earth.czm.scene;
      // //位置数组 [经度、纬度、高度]
      tool.position = [116.39, 39.9, 0].xeptr;
      tool.positions = XE.Obj.CustomPrimitive.Geometry.unitSquare.positions;
      tool.sts = XE.Obj.CustomPrimitive.Geometry.unitSquare.sts;
      tool.indices = XE.Obj.CustomPrimitive.Geometry.unitSquare.indices;
      //缩放数组 [x向缩放、y向缩放、z向缩放]
      tool.scale = [10000, 10000, 1];
      //图元背景颜色
      tool.renderState = XE.Obj.CustomPrimitive.getRenderState(true,true);
      tool.canvasWidth = 2048;
      tool.canvasHeight = 2048;

      //normals vue 添加一些自定义动态属性
      tool.normals = {};
      //在customPrimtive的normals属性中插入自定义变量.(因为vue无法动态添加根属性)
      //
      this.$set(tool.normals, 'freelyMove', true);
      this.$set(tool.normals, 'size', 10);
      this.$set(tool.normals, 'windDirection', 30);
      this.$set(tool.normals, 'windPower', 4);
      this.$set(tool.normals, "transp", 0.6);
      let ctxHeight = tool.canvasHeight;
      let ctxWidth = tool.canvasWidth;
      setTimeout(() => {
        tool.drawCanvas(ctx => {
          that.threeLeveltool(ctx);
        })
      }, 200);
    },
    //设置箭头(通过创建arrow)
    setArrows(){
      let czm = this._czmObj.earth.czm;
      let startPosition = this.model.xbsjPosition;
      //求x和y变化的比例. 
      // this.spreadX(3)为长半轴原始的长度
      // /1000/111 为将米转化为经度
      // /1000/111 * cos 纬度 为将米转化为纬度
      // this.xXffset 场半轴偏移量(m)
      //  13.2为canvas画板长半轴和地球的像素转化比例
      // this.spreadX(3)*13.2/1000/111 * this.xOffset(3) / this.spreadX(3);
      // 缩略一下变为 经度偏移量为 10 /1000 /111 * this.yOffset(3)
      let xPosition = [...startPosition];
      //长半轴的纬度长度 后面是经度每米的度数
      let xR =  this.spreadX(3) * 13 / 111111;
      //未偏移的长半轴末端坐标
      xPosition[0] += xR;
      let xPositionYoffset = this.spreadAngle() * xR;
      if(this.model.windDirection > 0 && this.model.windDirection <= 180){
        xPositionYoffset  = -xPositionYoffset;
      }
      let xPositionXoffset = xR - Math.sqrt(Math.pow(xR,2) - Math.pow(xPositionYoffset,2));
      xPosition[0] += xPositionXoffset;
      xPosition[1] += xPositionYoffset;
      //已创建箭头则进行修改 未创建则进行创建
      if(this._czmObj.xArrow){
        this._czmObj.xArrow.refresh(startPosition,xPosition, this.model.name +'长半轴');
      }else{
        this._czmObj.xArrow = new createArrow(czm, 'xArrow'+this.guid, this.model.name +'长半轴',startPosition,xPosition);
      }
      
      let yPosition = [...startPosition];
      //后面是纬度每米的度数
      let yR = this.spreadY(3) *  10 / 111111;
      yPosition[1] += yR;
      let yPositionXoffset = this.spreadAngle() * yR;
      let yPositionYoffset = yR - Math.sqrt(Math.pow(yR,2) - Math.pow(yPositionXoffset,2));
      yPosition[0] += yPositionXoffset;
      yPosition[1] += yPositionYoffset;
      // let yLength = 10 /1000 /111 * this.yOffset(3);
      // yPosition[0] += xLength;
      // yPosition[1] += yLength;
      if(this._czmObj.yArrow){
        this._czmObj.yArrow.refresh(startPosition,yPosition, this.model.name +'短半轴');
      }else{
        this._czmObj.yArrow = new createArrow(czm, 'yArrow'+this.guid, this.model.name +'短半轴',startPosition,yPosition);
     }

      let zPosition = [...startPosition];
      zPosition[2] += this.model.size * (this.model.diffusivity+1);
      if(this._czmObj.zArrow){
        this._czmObj.zArrow.refresh(startPosition,zPosition, this.model.name +'高度');
      }else{
      this._czmObj.zArrow = new createArrow(czm, 'zArrow'+this.guid, this.model.name +'高度',startPosition,zPosition);
       }
    },
    //销毁箭头
    destroyArrows(){
        this._czmObj.xArrow.destroy();
        this._czmObj.yArrow.destroy();
        this._czmObj.zArrow.destroy();
    },
    //创建三级的蔓延趋势
    threeLeveltool(ctx) {
      let that = this;
      let width = this._czmObj.canvasWidth;
      let height = this._czmObj.canvasHeight;
      let transp = this._czmObj.normals.transp;
      
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      let level = 4;
      //画出三级危险区域
      this.createtool(ctx, --level,"rgba(255,235,59,"+transp+")");
      //画出二级危险区域
      this.createtool(ctx, --level,"rgba(255,165,0,"+transp+")");
      //画出一级危险区域
      this.createtool(ctx, --level,"rgba(255,0,0,"+transp+")"); 
      
      
    },
    //创建危险区域
    createtool(ctx, level, color){
      ctx.save();
      let x = this._czmObj.canvasWidth/2 + this.xOffset(level),
          y = this._czmObj.canvasHeight/2 + this.yOffset(level);
      this.bezierEllipse(ctx,x,y, this.spreadX(level), this.spreadY(level), this.model.windDirection, color);
    },
    //在canvas中创建椭圆
    bezierEllipse(ctx, x, y, width, height, angle, color) {
      ctx.save();
      //关键是bezierCurveTo中两个控制点的设置
      //0.5和0.6是两个关键系数（在本函数中为试验而得）
      var ox = 0.5 * width,
          oy = 0.6 * height;
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      //从椭圆纵轴下端开始逆时针方向绘制
      ctx.rotate(angle*Math.PI/180);
      ctx.moveTo(0, height);
      ctx.bezierCurveTo(ox, height, width, oy, width, 0);
      ctx.bezierCurveTo(width, -oy, ox, -height, 0, -height);
      ctx.bezierCurveTo(-ox, -height, -width, -oy, -width, 0);
      ctx.bezierCurveTo(-width, oy, -ox, height, 0, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    },
    //获取椭圆的短半径
    spreadY(level){
      return this.model.size * this.model.diffusivity * level /10;
    },
    //获取椭圆的长半径
    spreadX(level){
      return this.model.size * this.windPower * this.model.diffusivity * level /10; 
    },
    //获取椭圆的偏移角度(根据风向)
    spreadAngle(){
      return  Math.sin(this.model.windDirection*Math.PI/180);
    },
    //椭圆心偏移距离
    rOffset(level){
      return this.spreadX(level) / 8 *level;
    },
    //x轴偏移距离
    xOffset(level){
      if(this.windPower === 0){
        return 0;
      }
      let r = this.rOffset(level);
      let xoffset =  Math.sqrt(this.rOffset(level)*this.rOffset(level) - this.yOffset(level)*this.yOffset(level))
      if(this.model.windDirection > 90 && this.model.windDirection <= 270){
        xoffset  = -xoffset;
      }
      return xoffset;
    },
    //y轴偏移距离
    yOffset(level){
      if(this.windPower === 0){
        return 0;
      }
      return  this.spreadAngle() * this.rOffset(level)
    }
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