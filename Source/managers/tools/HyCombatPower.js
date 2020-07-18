/**
 * Author 张杰
 * Date 2019年7月10日
 * Description 用于消防人员列表面板
 */
class HyCombatPower{
    constructor(root) {
      // console.log(root)
      this._root = root;
      this._comp = root._comp.$refs.hyCombatPower[0];
      XE.MVVM.extend(this, {
          /**
          * 默认是否显示
          * @type {boolean}
          * @default false 
          * @instance
          * @memberof HyFireMan
          */
          show: false,
      });
      
      var hydeduce = root._comp.$refs.mainBarControl.$refs.hydeduce;
  
      this.unbind1 = XE.MVVM.bind(
        hydeduce,
        "combatPowerShow",
        this,
        "show"
      );
      this.unbind2 = XE.MVVM.bind(
          this._comp,
          "show",
          this,
          "show"
      );
  
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
  export default HyCombatPower;