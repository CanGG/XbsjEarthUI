import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import combatPowerData from "@tools/HyCombatPower/data";
import CombatPower from "@services/CombatPower";
import $ from "jquery"
/**
 * @author 谢灿
 * @desc 2020年1月7日
 * @description 自制Vehicle模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 * @update 调整addTask方法,增加taskData属性用于保存任务记录 谢灿 2020-10-21 08:11:13
 * @update 调整车辆的图标放大逻辑和确认移动位置的鼠标事件 谢灿 2020-11-6
 */
class Vehicle extends XE.Obj.Pin {
  constructor(earth, guid) {
    super(earth, guid);
    this.isDivImage = true; 
    //图层数组中下标
    this.treeIndex = -1;
    //图层所在组
    this.fightingGroup = false;
    this.taskData = [];
    this.combatPowerServer = new CombatPower(null);
    this.HyCustomGroundRectangleCircle = HyCustomGroundRectangleCircle;
    this.HyLabel = HyLabel;
    this._id = guid; //保存vehicle_keyid 到 model的_id属性中
    this.$= $;
    // console.log(this.combatPowerServer);
    let that = this;
    this.combatPowerServer.get(this._id).then(result=>{
      if(result.code === 200){
        let data = result.data;
        that._data = data;
        //任务内容
        that.taskText = " ";
        //任务显示label，用于更新label
        that.labelText = false;
        
        // console.log( that.combatPowerServer.planRescuePc + "icon/" +data.type_icon);
        that.svgUrl = that.combatPowerServer.planRescuePc + "icon/" +data.type_icon;
        that.code = data.equipment_id;
        that.name = data.name;
        
        that.created();
        // that.addListeners();
        that.addToSceneTree();
        // this.test();
      }
      // console.log(result); 
    })
    
    this.disposers.push(() => {
      
      
      
    });

  }

  //添加至图层管理
  addToSceneTree() {

  }

  /**
   * @description 模型创建完毕后执行
   */
  created() {
    //this.evalString = '';
    let vehicle = this._data;
    if (!vehicle) return;
    this.title = vehicle.equipment_name;
    let driverMsg =
      vehicle.equipment_name +
      "\\n编号:" +
      vehicle. equipment_id + 
      "\\n药剂量:100/100";
    let currentPosition = [...this.position];
    // this.taskData.unshift({
    //   text:"模型创建",date:new Date().format('yyyy-MM-dd hh:mm:ss'),x:currentPosition[0],y:currentPosition[1],z:currentPosition[2]
    // });
    //Model初始化时执行的js代码
    this.evalString = `
                if (p._div) {
                    return;
                }

                const earth = p.earth;
                let layer = layui.layer;
                // 创建div
                const div = document.createElement('div');
                div.style.cssText = \`
                    position: absolute;
                    width: 50px;
                    min-height: 50px;
                    color: white;
                    
                    padding: 0px;
                    border-radius: 0px;
                    cursor: pointer;
                \`;
                div.classList.add("rescueForceIconControl");
                console.log(p);
                setTimeout(()=>{div.innerHTML = '<img class="rescueForceIconControlImg" style="height: 50px;width: 50px;margin: 0" src="'+p.svgUrl+'">';}, 100);
                
                //引入jquery 获得 图标div的jquery对象$div
                let $div = p.$(div);
                //监听$div的hover事件,用于判断是否放大图标.
                $div.hover(function(e){
                  //当鼠标移入图标且图标不处于位置编辑(位置移动)状态时,放大图标
                  if(e.type === "mouseenter" && !p.creating){
                    $div.css("transform","scale(2)")
                  }else{
                    $div.css("transform","unset")
                  }
                })
                div.onclick = () => {
                  //2020年11月6日 谢灿调整 将p.creating = true 改为切换
                  p.creating = !p.creating;
                };
                document.oncontextmenu = function(e){
                    e.preventDefault();
                };
                let pass = true;
                div.onmousewheel=function(evt){
                  evt=evt?evt:event;
                  if(!pass){
                    return;
                  }
                  pass = false;
                  setTimeout(()=>{
                    pass = true;
                  },400)
                  console.log(event.wheelDelta);

                  let viewer = p.earth.czm.viewer;
                  // 获取当前镜头位置的笛卡尔坐标
                  let cameraPos = viewer.camera.position;

                  // 获取当前坐标系标准
                  let ellipsoid = viewer.scene.globe.ellipsoid;

                  // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
                  let cartographic = ellipsoid.cartesianToCartographic(cameraPos);

                  // 获取镜头的高度
                  let height = cartographic.height;
                  let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
                  let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));

                  let h = 0;
                  if(event.wheelDelta>0){
                    h = height/1.3;
                    viewer.camera.zoomIn(h);
                  }else{
                    h = height*1.3;
                    viewer.camera.zoomOut(h);
                  }

                    // // 镜头拉近
                    // viewer.camera.flyTo({
                    //     destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, h),
                    //     rotation: viewer.rotation,
                    //     duration: 1.0
                    // });
                }
                div.onmousedown = function(e){
                    if(e.button ==2){
                      p.showTaskPrompt();
                    }
                }
                const container = earth.czm.viewer.container;
                container.appendChild(div); 
                p._div = div;

                // 自动删除div
                // disposers数组会在p销毁时执行，从而销毁Pin所附带的资源，避免内存泄露
                p.disposers.push(() => {
                    container.removeChild(div);
                    p._div = undefined;
                });
                window.onresize = function(){
                  let currentP = [...p.position];
                  p.position = [0,0,0];
                  p.position = currentP;
                }
                // 动态修改div的位置
                p.disposers.push(XE.MVVM.watch(() => [...p.winPos], () => {
                    div.style.left = (p.winPos[0] - 25) + 'px';
                    div.style.bottom = (p.winPos[3]) + 'px';
                }));

                // pin距离相机太近则隐藏
                p.disposers.push(XE.MVVM.watch(earth.camera, 'position', () => {
                    // xepd: xepositionDistance的缩写
                    // pin1.position.xepd(earth.camera.position): 计算相机和pin之间的距离
                    const d = p.position.xepd(earth.camera.position);
                    if (d > 2000) {
                        div.style.display = 'none';
                    } else {
                        div.style.display = 'block';
                    }
                }));

                //实例一个自定义图元-圆为作战半径
                let scopeCircle = new p.HyCustomGroundRectangleCircle(p,'作战半径动画');
                setTimeout(function(){
                  let viewer = p._earth.czm.viewer;
                  //画出作战范围
                  scopeCircle.draw(` +
                    vehicle.combat_radius +
                  `);
                  
                  //显示驾驶员信息
                  let driverLabelConfig = {
                    model: p,
                    offset:[-30,-85],
                    textFnc:()=> {return '` +
                driverMsg +
                `';}
                  }
                  let driverLabel = new p.HyLabel(driverLabelConfig);
                  
                  if(p.taskText){
                    let driverLabelConfig2 = {
                      model: p,
                      offset:[-30,-120],
                      textFnc:()=> {return "当前任务："+p.taskText;}
                    }
                    let driverLabel2 = new p.HyLabel(driverLabelConfig2);
                  }

                  console.log(p);

                },0);
            `;
  }

  /**
   * 添加任务
   * 
   */
  addTask(text,date,x,y,z){
    console.log(text,date,x,y,z);

    if(text.trim()==""){
      return false;
    }
    //添加任务时增加相关taskData数据, taskData即车辆任务记录. unshift是在头部插入
    this.taskData.unshift({
      text,date,x,y,z
    });
    console.log(this);
    if(this.labelText){
      this.earth.czm.viewer.entities.remove(this.labelText);      
    }

    let driverLabelConfig = {
      model: this,
      offset:[-30,-120],
      textFnc:()=> {return "当前任务："+text;}
    }
    let driverLabel = new this.HyLabel(driverLabelConfig);

    this.labelText = driverLabel.label;
    this.taskText = text;

  }

  //显示任务输入框
  showTaskPrompt(){
    let that = this;

    let prompt = false;

    layer.prompt({ title: "任务设定",value:that.taskText, formType: 2, end:function(){
      if(!prompt) {
        
        //删除视图层
        if(that.fightingGroup){
          that.fightingGroup.splice(that.treeIndex,1);
          that.fightingGroup = false;
        }

        that.destroy();
      }
    } }, function (
      text,
      index
    ) {
      layer.close(index);
      let currentP = [...that.position];
      that.addTask(text,new Date().format('yyyy-MM-dd hh:mm:ss'),currentP[0],currentP[1],currentP[2]);
      prompt = true;
    });
  }
}
Vehicle.registerType(Vehicle, 'HyVehicle');

Vehicle.defaultOptionsAccum = undefined;

Vehicle.defaultOptions = {
  labelText: "",
  _id:"",
  $:{},// jquery
  svgUrl:'',
  taskText:'',
  taskData:[],
  HyCustomGroundRectangleCircle:{},
  HyLabel:{},
  czmObjDeleteFn() {
    console.log(Vehicle);
  }
};

export default Vehicle;