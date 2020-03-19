/**
 * Author 谢灿
 * Date 2020年2月28日
 * Description 重大危险源面板
 */
class HyMajorHazardSource {
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyMajorHazardSource[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyMajorHazardSource
       */
      show: false
    });

    let hydeduce = root._comp.$refs.mainBarControl.$refs.hydeduce;

    this.unbind1 = XE.MVVM.bind(hydeduce, "majorHazardSourceShow", this, "show")

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

export default HyMajorHazardSource