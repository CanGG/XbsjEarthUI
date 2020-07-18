import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import vehicleData from "@tools/HyFireMan/data"
/**
 * @author 张杰
 * @desc 2020年7月10日
 * @description 自制消防人员模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 */
class FireMen extends XE.Obj.Model {
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


    this.disposers.push(() => {
      console.log(3);
    });
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
      vehicle.name;

    //Model初始化时执行的js代码

    this.evalString =
      `
      setTimeout(function(){
        let viewer = p._earth.czm.viewer;
        
        //显示消防员信息
        let driverLabelConfig = {
          model: p,
          offset:[0,-55],
          textFnc:()=> {return '` +
      driverMsg +
      `';}
        }
        let driverLabel = new p.HyLabel(driverLabelConfig);
        
      },0);
    `;
  }
}
FireMen.registerType(FireMen, 'FireMen');

FireMen.defaultOptionsAccum = undefined;
FireMen.defaultOptions = {
  test123: '123123',
  czmObjDeleteFn() {
    console.log(FireMen);
  }
};
export default FireMen;