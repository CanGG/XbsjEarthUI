import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import vehicleData from "@tools/HyVehicleList/data"
/**
 * @author 谢灿
 * @desc 2020年1月7日
 * @description 自制Vehicle模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 */
class Vehicle extends XE.Obj.Model {
  constructor(earth, guid) {
    super(earth, guid);
    this.test123 = '123';
    const vehicles = vehicleData.vehicles;
    let that = this;
    // console.log(this.guid);
    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i] == []) continue;
      for (let j = 0; j < vehicles[i].vehicles.length; j++) {
        if (vehicles[i]['vehicles'][j].code == that.guid) {
          this._data = vehicles[i]['vehicles'][j];
          break;
        }
      }
    }

    if(!this._data){
      return false;
    }
    this.url = this._data.glbSrc;
    this.code = this._data.code;
    this.name = this._data.name;
    //可视高度 200-3000米内
    // this.distanceDisplayCondition = [200,3000];
    this.minimumPixelSize = 64;
    this.HyCustomGroundRectangleCircle = HyCustomGroundRectangleCircle;
    this.HyLabel = HyLabel;

    this.created()
    this.addListeners();
    this.addToSceneTree();
    this.test();

    this.disposers.push(() => {
      console.log(3);
    });
  }
  //添加至图层管理
  addToSceneTree() {
    // console.log(1);
    // let earth = this.earth;
    // this.editing = false;
    // this.positionEditing = false;
    // // if (this.isCreating) {
    //   console.log(2);
    //   this.isCreating = false;
    //   let fightingGroup = earth.sceneTree.root.children.find((scene)=>{
    //     console.log(scene.title); 
    //     return scene.title === '作战力量';
    //   })
    //   //判断是否存在作战力量分组
    //   if(!fightingGroup){
    //     console.log(3);
    //     //不存在则创建
    //     fightingGroup = new XE.SceneTree.Group(earth);
    //     fightingGroup.title = '作战力量'
    //     earth.sceneTree.root.children.push(fightingGroup);
    //   }
    //   console.log(4);
    //   const sceneLeaf = new XE.SceneTree.Leaf(this);
    //   let exis = fightingGroup.children.find(leaf=>{ 
    //     console.log(leaf);
    //     return leaf == sceneLeaf;
    //   })
    //   console.log(exis);

    //   fightingGroup.children.push(sceneLeaf);
    // // }
  }
  /**
   * 增加模型的监听
   */
  addListeners() {
    //添加模型的点击事件
    this.onclick = e => {
      window.uia.showPropertyWindow(this);
    };
  }

  /**
   * @description 模型创建完毕后执行
   */
  created() {
    //this.evalString = '';
    let vehicle = this._data;
    if (!vehicle) return;
    let driverMsg =
      vehicle.name +
      "\\n驾驶员名:" +
      vehicle.driver.name +
      "\\n联系方式:" +
      vehicle.driver.phone +
      "\\n编号:" +
      vehicle.driver.code + 
      "\\n药剂量:100/100";

    //Model初始化时执行的js代码

    this.evalString = 
      `
      //实例一个自定义图元-圆为作战半径
      let scopeCircle = new p.HyCustomGroundRectangleCircle(p,'作战半径动画');
      setTimeout(function(){
        let viewer = p._earth.czm.viewer;
        //画出作战范围
        scopeCircle.draw(` +
          vehicle.scope +
        `);
        //画出作战半径
        //scopeCircle.drawRadius(` +vehicle.scope +`);

        //显示坐标信息
        // let positionLabelConfig = {
        //   model: p
        // };
        // let positionLabel = new p.HyLabel(positionLabelConfig);
        //显示驾驶员信息
        let driverLabelConfig = {
          model: p,
          offset:[0,-75],
          textFnc:()=> {return '` +
      driverMsg +
      `';}
        }
        let driverLabel = new p.HyLabel(driverLabelConfig);
        
      },0);
    `;
  }

  /**
   * @description 用于蓝立方测试
   */
  test() {
    let vehicle = this._data;
    if (vehicle.code === 'blue1') {
      this.preUpdateEvalString =
        ` 
        if(!p.creating && !p.positionEditing && !p.rotationEditing){
          let xOffset = Math.random()*0.000001;
          let yOffset = Math.random()*0.000001;
          let position = [...p.xbsjPosition];
          position.xeptd;
          position[0]+=xOffset;
          position[1]+=yOffset;
          p.xbsjPosition = position.xeptr;
        }
      `
    }


  }
}
Vehicle.registerType(Vehicle, 'HyVehicle');

Vehicle.defaultOptionsAccum = undefined;
Vehicle.defaultOptions = {
  test123: '123123',
  czmObjDeleteFn() {
    console.log(Vehicle);
  }
};

export default Vehicle;