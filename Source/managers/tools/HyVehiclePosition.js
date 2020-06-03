/**
 * 车辆实时位置
 * @author 张杰
 * 2020年4月14日
 */
class HyVehiclePosition{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyVehiclePosition[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyVehiclePosition
       */
      show: false
    });

    let HyDispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;

    this.unbind1 = XE.MVVM.bind(HyDispatch, "vehiclePositionShow", this, "show");

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");
    
    this._comp.btnShow = false;
    this._comp.lang.title = "车辆实时位置";
    this._comp.tableId = "hyVehiclePositionTable";
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

export default HyVehiclePosition