import HyArrowLabel from "@hyPlugins/arrow_label";
/**
 * @author 张杰
 * @desc 2020年8月12日
 * @description 自制双箭头标绘效果
 * @extends XE.Obj.Plots.GeoDoubleArrow
 * @param earth EarthSDK的MainUI
 * @param guid guid 
 */
class HyDoubleArrow extends XE.Obj.Plots.GeoDoubleArrow{
  constructor(earth) {
    super(earth);
    let that = this;
    this.HyLabel = HyArrowLabel;
    
  }
  /**
   * 增加双箭头的监听
   */
  addListeners() {
    console.log(this);
    //添加模型的点击事件
    this.onclick = e => {
      console.log("creating");
      this.creating = true;// window.uia.showPropertyWindow(this);
    };
  }
  
  /**
   * 添加文字
   * @param {*} text 
   */
  addText(text){

    if(this.labelText){
      this.earth.czm.viewer.entities.remove(this.labelText);      
    }

    let driverLabelConfig = {
      model: this,
      offset:[0,-120],
      textFnc:()=> {return text;}
    }
    let driverLabel = new this.HyLabel(driverLabelConfig);

    this.labelText = driverLabel.label;

  }
  
}
HyDoubleArrow.registerType(HyDoubleArrow, 'HyDoubleArrow');

export default HyDoubleArrow;