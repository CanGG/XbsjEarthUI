/**
 * Author 谢灿
 * Date 2020年6月15日
 * Description 预案演练状态面板
 */
class HyPlanStatus {
  constructor(root) {
    this._root = root;
    this._comp = root._comp.$refs.hyPlanStatus[0];
    XE.MVVM.extend(this, {
      /**
       * 默认不显示
       * @type {boolean}
       * @default false
       * @instance 
       * @memberof HyPlanStatus
       */
      show: false
    });

    let hyplan = root._comp.$refs.mainBarControl.$refs.hyplan;
    this.unbind1 = XE.MVVM.bind(hyplan, "planStatusShow", this, "show")

    this.unbind2 = XE.MVVM.bind(this._comp, "show", this, "show")

    //演练id
    XE.MVVM.watch(() => this._root.hyControls.plan.id, (v) => {
      let plan_id = this._root.hyControls.plan.id;
      if(plan_id==-1){
        this.show = false;
      }else{
        // this.show = true;
        // this._root._hyVehicleMovement.show = true;
        // this._root._hyVehicleVideo.show = true;
        // this._root._hyVehiclePosition.show = true;

      }
    
    });

    //演练状态
    XE.MVVM.watch(() => this._root.hyControls.plan.status, (v) => {
      let plan_status = this._root.hyControls.plan.status;
      switch(plan_status){
        case 0:
          this._comp.plan_status = "准备中";  
          break;
        case 1:
          this._comp.plan_status = "推演中";
          break;
        case 2:
          this._comp.plan_status = "推演结束";
          break;
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

    

  }
}

export default HyPlanStatus