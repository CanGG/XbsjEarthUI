/**
 * 以实体为中心创建一个贴地矩形
 * @author 谢灿
 */
class HyCustomGroundRectangle {

  /**
   * 构造函数
   * @author 谢灿
   * @desc 2020年5月21日
   * @param {XE.Obj} model 实体 XE.Obj
   * @param {String} name 图元名称
   */
  constructor(model, name) {
    this.model = model;
    this.name = name;
    //画板高宽
    this.canvasWidth = 512;
    this.canvasHeight = 512;
    //图元本体
    this.czmObj = this.init();
    XE.MVVM.bind(model, 'show', this.czmObj, 'show');
  }


  /**
   * 图元初始化
   * @author 谢灿
   * @desc 2019年12月9日
   */
  init() {
    let that = this;
    let model = this.model;
    let earth = model.earth;
    const czmObjConfig = {
      // scale: [1, 1, 1],
      // positions: XE.Obj.CustomPrimitive.Geometry.unitSquare.positions,
      // sts: XE.Obj.CustomPrimitive.Geometry.unitSquare.sts,
      // indices: XE.Obj.CustomPrimitive.Geometry.unitSquare.indices,
      // renderState: XE.Obj.CustomPrimitive.getRenderState(true, true),
      position:[2.02729390339372, 0.6980810742548738, 755.036813823199],
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    }
    let czmObj = new XE.Obj.CustomGroundRectangle(earth);    

    czmObj.xbsjFromJSON(czmObjConfig);
    czmObj.name = this.name;
    czmObj.isCreating = true; //是否是初始化
    XE.MVVM.bind(model, 'position', czmObj, 'position');
    model.disposers.push(() => {
      czmObj.destroy();
    })
    return czmObj;

  }
  /**
   * 在画板上绘制
   * @author 谢灿
   * @desc 2020年5月21日
   * @param {Function} fnc 绘制方法 会传参 ctx
   */
  draw(fnc){
      this.czmObj.drawCanvas(ctx=>{
          ctx.save();
          fnc(ctx);
          ctx.restore();
      });
  }
  /**
   * 清除画板内容
   * @author 谢灿
   * @desc 2020年5月21日
   */
  clearCanvas(){
      let that = this;
      this.draw(function(ctx){
          ctx.clearRect(0,0,that.canvasWidth,that.canvasHeight);
      })
  }

}


export default HyCustomGroundRectangle;