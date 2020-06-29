/**
 * 作战任务一键下达脚本
 * @author 张杰
 * 2020年4月1日
 */
class HyTask{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyTask[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyTask
       */
      show: false
    });

    let hyplan = root._comp.$refs.mainBarControl.$refs.hyplan;

    this.unbind1 = XE.MVVM.bind(hyplan, "taskShow", this, "show");

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");

    this._comp.btnShow = false;
    this._comp.lang.title = "作战任务下达";
    this._comp.tableId = "hyTaskTable";
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

export default HyTask