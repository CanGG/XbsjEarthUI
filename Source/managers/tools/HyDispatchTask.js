/**
 * 调度 作战任务一键下达脚本
 * @author 谢灿
 * 2020年6月18日 
 */
class HyDispatchTask{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyDispatchTask[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyDispatchTask
       */
      show: false
    });

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");
    let hydispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;
    this.unbind3 = XE.MVVM.bind(hydispatch, "taskShow", this, "show");
  }
  isDestroyed() {
    return false;
  }

  destroy() {
    this._showListenerDisposer = this._showListenerDisposer && this._showListenerDisposer();
    this.unbind2 = this.unbind2 && this.unbind2();
    this.unbind3 = this.unbind3 && this.unbind3();
  }

}

export default HyDispatchTask