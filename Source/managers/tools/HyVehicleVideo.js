/**
 * Author 谢灿
 * Date 2020年5月19日
 * Description 用于作战力量列表(车辆出动情况)面板
 */
class HyVehicleVideo{
  constructor(root) {
    // console.log(root)
    this._root = root;
    this._comp = root._comp.$refs.hyVehicleVideo[0];
    XE.MVVM.extend(this, {
        /**
        * 默认是否显示
        * @type {boolean}
        * @default false 
        * @instance
        * @memberof HyVehicleVideo
        */
        show: false,
    });
    
    var hydispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;

    this.unbind1 = XE.MVVM.bind(
      hydispatch,
      "vehicleVideoShow",
      this,
      "show"
    );
    
    this.unbind2 = XE.MVVM.bind(
        this._comp,
        "show",
        this,
        "show"
    );

    let hyPlan = root._comp.$refs.mainBarControl.$refs.hyplan;

    this.unbind3 = XE.MVVM.bind(hyPlan, "vehicleVideoShow", this, "show");
  }
  isDestroyed() {
      return false;
  }

  destroy() {
      this._showListenerDisposer = this._showListenerDisposer && this._showListenerDisposer();

      this.unbind1 = this.unbind1 && this.unbind1();
      this.unbind2 = this.unbind2 && this.unbind2();
      this.unbind3 = this.unbind3 && this.unbind3();

  }

}
export default HyVehicleVideo;