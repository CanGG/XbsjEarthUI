/**
 * Author 谢灿
 * Date 2019年12月27日
 * Description 用于消防车辆列表面板
 */
class HyVehicleList{
  constructor(root) {
    // console.log(root)
    this._root = root;
    this._comp = root._comp.$refs.hyVehicle[0];
    XE.MVVM.extend(this, {
        /**
        * 默认是否显示
        * @type {boolean}
        * @default false 
        * @instance
        * @memberof HyVehicleList
        */
        show: false,
    });
    
    var hyfight = root._comp.$refs.mainBarControl.$refs.hyfight;

    this.unbind1 = XE.MVVM.bind(
      hyfight,
      "vehicleShow",
      this,
      "show"
    );
    // console.log(this._comp)
    this.unbind2 = XE.MVVM.bind(
        this._comp,
        "show",
        this,
        "show"
    );

  }
  isDestroyed() {
      return false;
  }

  destroy() {
      this._showListenerDisposer = this._showListenerDisposer && this._showListenerDisposer();

      this.unbind1 = this.unbind1 && this.unbind1();
      this.unbind2 = this.unbind2 && this.unbind2();

  }

}
export default HyVehicleList;