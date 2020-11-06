import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import combatPowerData from "@tools/HyCombatPower/data";

/**
 * @author 张杰
 * @desc 2020年7月14日
 * @description 自制作战力量模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id加模型类型，用|分割
 */
class HyCombatPower extends XE.Obj.Pin {
  constructor(earth, guid) {
    super(earth, guid);
    const vehicles = combatPowerData.fireFighting;
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
    this.isDivImage = true;
    //this.imageUrl = "http://cesium-plan-1254117419.cos.ap-shanghai.myqcloud.com//image/facilities_type/2020-05-14/1589441579730消防栓.png";//this._data.glbSrc;
    this.code = this._data.code;
    this.name = this._data.name;
    //可视高度 200-3000米内
    // this.distanceDisplayCondition = [200,3000];
    // this.minimumPixelSize = 64;
    this.position = [2.045911117399894, 0.5997232679950419, 3.089560352829208];
    //this.scale = 0.1;
    this.creating = true;
    this.HyLabel = HyLabel;
    this.createdFireFighting();
    this.addListeners();
    


    this.disposers.push(() => {

      
      console.log(that);
      console.log(3);
    });
  }
  /**
   * 增加模型的监听
   */
  addListeners() {
    console.log(this);
    //添加模型的点击事件
    this.onclick = (e) => {
      console.log("creating");
      this.creating = true; // window.uia.showPropertyWindow(this);
    };
  }
  //消防设备模型
  createdFireFighting() {
    let combatPower = this._data;
    if (!combatPower) return;
    let driverMsg = combatPower.name;

    //Model初始化时执行的js代码
    this.evalString = `
                if (p._div) {
                    return;
                }

                const earth = p.earth;

                // 创建div
                const div = document.createElement('div');
                div.style.cssText = \`
                    position: absolute;
                    width: 50px;
                    min-height: 50px;
                    color: white;
                    background-image: url("../../Apps/assets/images/border.png");
                    background-size: 100% 100%;
                    padding: 0px;
                    border-radius: 0px;
                    cursor: pointer;
                \`;
                div.innerHTML = '<img style="height: 24px;width: 24px;margin: 5px 13px" src=".http://220.180.184.7:8711/plan/earthUI/Apps/assets/images/15米拉梯.svg">';
                div.onclick = () => {
                  p.creating = true;
              };
                const container = earth.czm.viewer.container;
                container.appendChild(div);
                p._div = div;

                // 自动删除div
                // disposers数组会在p销毁时执行，从而销毁Pin所附带的资源，避免内存泄露
                p.disposers.push(() => {
                    container.removeChild(div);
                    p._div = undefined;
                });

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
                    if (d < 100) {
                        div.style.display = 'none';
                    } else {
                        div.style.display = 'block';
                    }
                }));

                setTimeout(function(){
                  let viewer = p._earth.czm.viewer;
        
                  let driverLabelConfig = {
                      model: p, 
                      offset:[0,-65],
                      horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
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
HyCombatPower.registerType(HyCombatPower, "HyCombatPower");

export default HyCombatPower;
