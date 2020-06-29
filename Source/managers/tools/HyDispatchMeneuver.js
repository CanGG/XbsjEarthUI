/**
 * 调度-选择预案-脚本
 * @author 谢灿
 * @desc 2020年6月18日
 */
class HyDispatchMeneuver{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyDispatchMeneuver[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyDispatchMeneuver
       */
      show: false
    });

    let hydispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;

    this.unbind1 = XE.MVVM.bind(hydispatch, "dispatchManeuverShow", this, "show")

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show")
  
    
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

export default HyDispatchMeneuver