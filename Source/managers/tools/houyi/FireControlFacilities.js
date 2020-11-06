import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyCustomGroundRectangleCircle from "@hyPlugins/custom_ground_rectangle_circle";
import HyLabel from "@hyPlugins/label";
import combatPowerData from "@tools/HyCombatPower/data"
/**
 * @author 张杰
 * @desc 2020年7月10日
 * @description 自制消防设施模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 */
class FireControlFacilities extends XE.Obj.Pin {
  constructor(earth, guid) {
    super(earth, guid);
    this.isDivImage = true;
    const vehicles = combatPowerData.fireFighting;
    let that = this;
    let key_id = that.guid.split("|")[1];
    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i] == []) continue;
      for (let j = 0; j < vehicles[i].vehicles.length; j++) {
        if (vehicles[i]['vehicles'][j].code == key_id) {
          this._data = vehicles[i]['vehicles'][j];
          break;
        }
      }
    }
    if(!this._data){
      return false;
    } 
    this.isDivImage = true;
    this.code = this._data.code;
    this.name = this._data.name;
    //可视高度 200-3000米内
    // this.distanceDisplayCondition = [200,3000];
    //this.position = [2.045911117399894, 0.5997232679950419, 3.089560352829208];
    this.svgUrl = this._data.imgSrc;
    
    this.HyLabel = HyLabel;
    this.created();
    this.addListeners();
    this.disposers.push(() => {

      
      console.log(that);
      // let fightingGroup = that._earth.sceneTree.root.children.find((scene) => {
      //   return scene.title === "救援力量";
      // });

      // if (!!fightingGroup) {
      //   let exisModel = fightingGroup.children.find((child) => {
      //     return child.czmObject.xbsjGuid === that.code;
      //   });
      //   if (exisModel != null) {
      //     console.log(exisModel);
      //     exisModel.destroy();
      //   } 
      // }
      console.log(3);
    });
  }
  
  /**
   * 增加模型的监听
   */
  addListeners() {
    //添加模型的点击事件
    this.onclick = e => {
      this.creating = true;
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
                div.classList.add("rescueForceIconControl");
                
                div.innerHTML = '<img class="rescueForceIconControlImg" style="height: 24px;width: 24px;margin: 5px 13px" src="'+p.svgUrl+'">';
                
                div.onclick = () => {
                  p.creating = true;
                };

                ////右键点击事件
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
                      h = height/1.8;
                      viewer.camera.zoomIn(h);
                    }else{
                      h = height*1.8;
                      viewer.camera.zoomOut(h);
                    }
                      // 镜头拉近
                      // viewer.camera.flyTo({
                      //     destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, h),
                      //     duration: 1.0
                      // });
                    }
                div.onmousedown = function(e){
                  if(e.button ==2){
                    
                    window.uia.showPropertyWindow(p);
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
                      offset:[0,-68],
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

FireControlFacilities.registerType(FireControlFacilities, 'FireControlFacilities');

FireControlFacilities.defaultOptionsAccum = undefined;
FireControlFacilities.defaultOptions = {
  test123: '123123',
  czmObjDeleteFn() {
    console.log(FireControlFacilities);
  }
};
export default FireControlFacilities;
// class FireControlFacilities extends XE.Obj.Model {
//   constructor(earth, guid) {
//     super(earth, guid);
//     this.test123 = '123';
//     const vehicles = combatPowerData.fireFighting;
//     let that = this;
//     // console.log(this.guid);
//     for (let i = 0; i < vehicles.length; i++) {
//       if (vehicles[i] == []) continue;
//       for (let j = 0; j < vehicles[i].vehicles.length; j++) {
//         if (vehicles[i]['vehicles'][j].code == that.guid) {
//           this._data = vehicles[i]['vehicles'][j];
//           break;
//         }
//       }
//     }
//     if(!this._data){
//       return false;
//     }

//     this.url = this._data.glbSrc;
//     this.code = this._data.code;
//     this.name = this._data.name;
//     //可视高度 200-3000米内
//     // this.distanceDisplayCondition = [200,3000];
//     this.minimumPixelSize = 64;
//     this.HyCustomGroundRectangleCircle = HyCustomGroundRectangleCircle;
//     this.HyLabel = HyLabel;

//     this.created();
//     this.addListeners();
    
//     this.disposers.push(() => {
//       console.log(3);
//     });
//   }
  
//   /**
//    * 增加模型的监听
//    */
//   addListeners() {
//     //添加模型的点击事件
//     this.onclick = e => {
//       window.uia.showPropertyWindow(this);
//     };
//   }

//   /**
//    * @description 模型创建完毕后执行
//    */
//   created() {
//     //this.evalString = '';
//     let vehicle = this._data;
//     if (!vehicle) return;
//     let driverMsg =
//       vehicle.name;

//     //Model初始化时执行的js代码

//     this.evalString =
//       `
//       setTimeout(function(){
//         let viewer = p._earth.czm.viewer;
        
//         //显示消防装备信息
//         let driverLabelConfig = {
//           model: p,
//           offset:[0,-55],
//           textFnc:()=> {return '` +
//       driverMsg +
//       `';}
//         }
//         let driverLabel = new p.HyLabel(driverLabelConfig);
        
//       },0);
//     `;
//   }
// }

// FireControlFacilities.registerType(FireControlFacilities, 'FireControlFacilities');

// FireControlFacilities.defaultOptionsAccum = undefined;
// FireControlFacilities.defaultOptions = {
//   test123: '123123',
//   czmObjDeleteFn() {
//     console.log(FireControlFacilities);
//   }
// };
// export default FireControlFacilities;