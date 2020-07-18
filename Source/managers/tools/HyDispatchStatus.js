/**
 * 调度-预案状态-脚本
 * @author 谢灿
 * @desc 2020年6月18日
 */
class HyDispatchStatus{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyDispatchStatus[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyDispatchStatus
       */
      show: false
    });

    let hydispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;

    // this.unbind1 = XE.MVVM.bind(hydispatch, "dispatchStatusShow", this, "show")

    // this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show")
  
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

export default HyDispatchStatus