/**
 * 灭火药剂查询脚本
 * @author 张杰
 * @desc 2020年4月14日
 */
class HyPotionQuery{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyPotionQuery[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyPotionQuery
       */
      show: false
    });

    let HyDispatch = root._comp.$refs.mainBarControl.$refs.hydispatch;

    this.unbind1 = XE.MVVM.bind(HyDispatch, "potionQueryShow", this, "show");

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show");
    this._comp.btnShow = false;
    this._comp.lang.title = "灭火药剂查询";
    this._comp.tableId = "hyPotionQueryTable";
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

export default HyPotionQuery 