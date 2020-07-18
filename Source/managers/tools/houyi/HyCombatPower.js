import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import combatPowerData from "@tools/HyCombatPower/data"
/**
 * @author 张杰
 * @desc 2020年7月14日
 * @description 自制作战力量模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id加模型类型，用|分割
 */
class HyCombatPower extends XE.Obj.Model {
  constructor(earth, guid) {
    super(earth, guid);
    this.test123 = '123'; 
    let customProp = guid.split("|")[1];
    let gid = guid.split("|")[0];
    let combatPowerDatas=[];
    
    switch(customProp){
        case "vehicle":
            combatPowerDatas=combatPowerData.vehicles;
            break;
        case "fireMan":
            combatPowerDatas=combatPowerData.fireMan;
            break;
        case "fireFighting":
            combatPowerDatas=combatPowerData.fireFighting;
            break;
    }

    for (let i = 0; i < combatPowerDatas.length; i++) {
        if (combatPowerDatas[i] == []) continue;
        for (let j = 0; j < combatPowerDatas[i].vehicles.length; j++) {
          if (combatPowerDatas[i]['vehicles'][j].code == gid) {
            this._data = combatPowerDatas[i]['vehicles'][j];
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
    
    switch(customProp){
        case "vehicle":
            this.createdVehicle();
            break;
        case "fireMan":
            this.createdFireMen();
            break;
        case "fireFighting":
            this.createdFireFighting();
            break;
    }

    
    this.addListeners();
    this.disposers.push(() => {
      console.log(3);
    });
  }
  /**
   * 增加模型的监听
   */
  addListeners() {
    console.log(this);
    //添加模型的点击事件
    this.onclick = e => {
      window.uia.showPropertyWindow(this);
    };
  }

  //消防员模型
  createdFireMen(){
    let combatPower = this._data;
    if (!combatPower) return;
    let driverMsg = combatPower.name;
    //Model初始化时执行的js代码
    this.evalString = 
      `
        
        setTimeout(function(){
            let viewer = p._earth.czm.viewer;
            
            //显示消防人员信息
            let driverLabelConfig = {
                model: p, 
                offset:[0,-55],
                textFnc:()=> {return '` +
                    driverMsg +
                    `';
                }
            }
            let driverLabel = new p.HyLabel(driverLabelConfig);
        },0);
    `;
  }

  //消防设备模型
  createdFireFighting(){
    let combatPower = this._data;
    if (!combatPower) return;
    let driverMsg = combatPower.name;

    //Model初始化时执行的js代码
    this.evalString = 
      `
        setTimeout(function(){
            let viewer = p._earth.czm.viewer;
            
            //显示消防设备信息
            let driverLabelConfig = {
                model: p, 
                offset:[0,-55],
                textFnc:()=> {return '` +
                    driverMsg +
                    `';
                }
            }
            let driverLabel = new p.HyLabel(driverLabelConfig);
        },0);
    `;
  }

  /**
   * @description 模型创建完毕后执行
   */
  createdVehicle() {
    
    let combatPower = this._data;
    if (!combatPower) return;
    let driverMsg =
    combatPower.name +
      "\\n驾驶员名:" +
      combatPower.driver.name +
      "\\n联系方式:" +
      combatPower.driver.phone +
      "\\n编号:" +
      combatPower.driver.code + 
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
            combatPower.scope +
            `);

            //显示驾驶员信息
            let driverLabelConfig = {
                model: p, 
                offset:[0,-75],
                textFnc:()=> {return '` +
                    driverMsg +
                    `';
                }
            }
            let driverLabel = new p.HyLabel(driverLabelConfig);
        },0);
    `;
  }
  
}
HyCombatPower.registerType(HyCombatPower, 'HyVehicle');

HyCombatPower.defaultOptionsAccum = undefined;
HyCombatPower.defaultOptions = {
  test123: '123123',
  czmObjDeleteFn() {
    console.log(HyCombatPower);
  }
};

export default HyCombatPower;