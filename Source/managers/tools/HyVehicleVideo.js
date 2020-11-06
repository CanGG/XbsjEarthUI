/**
 * Author 谢灿
 * Date 2020年5月19日
 * Description 用于作战力量列表(车辆出动情况)面板
 */
class HyVehicleVideo{
  constructor(root) {
    let that = this;
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

    // this.unbind1 = XE.MVVM.bind(
    //   hydispatch,
    //   "vehicleVideoShow",
    //   this,
    //   "show"
    // );
    
    // this.unbind2 = XE.MVVM.bind(
    //     this._comp,
    //     "show",
    //     this,
    //     "show"
    // );

    let hyPlan = root._comp.$refs.mainBarControl.$refs.hyplan;

    this.unbind3 = XE.MVVM.bind(hyPlan, "vehicleVideoShow", this, "show");



    let unbind1 = XE.MVVM.watch(() => this.show, (show) => {
      if (show) {
        that.winObj = window.open(this.$root.$hyControls.basePath + "/plan_rescue_pc/earthui_h5/pages/video_tracking.html", "_blank", "left=262,top=250,height=300,width=500,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
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