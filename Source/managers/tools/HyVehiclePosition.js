/**
 * 车辆实时位置
 * @author 张杰
 * 2020年4月14日
 */
class HyVehiclePosition {

  constructor(root) {
    let that = this;
    this._root = root;
    // this._comp = root._comp.$refs.hyVehiclePosition[0];
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

    // this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");

    let unbind1 = XE.MVVM.watch(() => this.show, (show) => {
      console.log(show)
      if (show) {
        that.winObj = window.open("http://www.smartmgxf.com/digitalplan/plan/emergency_rescue.html", "_blank", "left=262,top=250,height=300,width=500,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
        var loop = setInterval(function () {
          if (that.winObj.closed) {
            clearInterval(loop);
            that.show = false;
          }
        }, 1000);
      } else {
        if (that.winObj) {
          that.winObj.close();
        }
      }
    });
    console.log(unbind1);

    let hyPlan = root._comp.$refs.mainBarControl.$refs.hyplan;

    this.unbind3 = XE.MVVM.bind(hyPlan, "vehiclePositionShow", this, "show");



    // this._comp.btnShow = false;
    // this._comp.lang.title = "车辆实时位置";
    // this._comp.tableId = "hyVehiclePositionTable";
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

export default HyVehiclePosition