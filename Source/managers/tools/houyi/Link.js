/**
 * @author 谢灿
 * @date 2020年1月8日
 * @description 车辆连线工具
 * @extends XE.Obj.Polyline
 * 
 */
class Link extends XE.Obj.Polyline {
  constructor(earth, guid) {
    super(earth, guid);
    this.test = 'test';
  }
  /**
   * 初始化
   */
  init(){
    let that = this;
    let czm = this.earth.czm;
    let positionLength = 1;
    this.test = "test2";
    XE.MVVM.watch(this, 'positions', (positions) => {
      //获取第一和第二个点, 当第二个点结束则闭合 
      //此处这样判断是因为positions在闭合后又会出发该监听同时会-1。可以避免误触。
      if (positionLength < positions.length) {
        positionLength = positions.length;
        //获取最新添加的点并转化为屏幕坐标
        let newPointPosition = positions[positionLength - 1];
        let scene = czm.scene;
        let degree = [...newPointPosition].xeptd;
        let c3 = Cesium.Cartesian3.fromDegrees(degree[0], degree[1], degree[2]);
        let windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, c3);

        //通过scene.pick(屏幕坐标)方法获取该点是否为model,如果是则绑定坐标。
        var pick = scene.pick(windowPosition);
        //存在且仅为HyVehicle时能绑定。
        if (!!pick && pick.id.xbsjType === 'HyVehicle') {
          //绑定坐标，此处positions为数组,因此绑定的键为 '0' '1'
          //而positionLength变量比键大2，所以减去2，同时+''转化为字符串
          console.log(pick.id.xbsjPosition);
          console.log(that.positions[positionLength - 2])
          //(key1,value1,key2,value2)将key1[value1]的值等于key2[value2]的值;
          XE.MVVM.bind(that.positions, (positionLength - 2) + '', pick.id, 'xbsjPosition');

        } else {

        }
        //超过两个点 关闭线 并显示属性框
        if (positions.length > 2) {
          that.creating = false;
          window.uia.showPropertyWindow(that);
        }
      }
    });
  }
}
/**
 * 自定义属性
 * 需要修改后才能被toJSON所识别
 */
Link.defaultOptionsAccum=undefined;
Link.defaultOptions = {
  test:'123123'
};

Link.registerType(Link, "HyLink");
export default Link;