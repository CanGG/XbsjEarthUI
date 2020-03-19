import { deflate } from "pako"

/**
 * 推演管理脚本
 * @author 谢灿
 * @date 2020年3月7日
 */
class HyManeuverManagement{
  
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyManeuverManagement[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyManeuverManagement
       */
      show: false
    });

    let hydeduce = root._comp.$refs.mainBarControl.$refs.hydeduce;

    this.unbind1 = XE.MVVM.bind(hydeduce, "maneuverManagementShow", this, "show")

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

export default HyManeuverManagement