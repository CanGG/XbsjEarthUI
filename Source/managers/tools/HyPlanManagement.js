/**
 * 预案查询脚本
 * @author 谢灿
 * @desc 2020年3月20日12:59:18
 */
class HyPlanManagement{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyPlanManagement[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyPlanManagement
       */
      show: false
    });

    let hyplan = root._comp.$refs.mainBarControl.$refs.hyplan;

    this.unbind1 = XE.MVVM.bind(hyplan, "planManagementShow", this, "show");

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");
    this._comp.btnShow = false;
    this._comp.lang.title = "预案查询";
    this._comp.tableId = "hyPlanManagementTable";
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

export default HyPlanManagement