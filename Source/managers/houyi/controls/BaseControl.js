/** 基础控制器 用来存放通用方法 
 * @author can
 * @desc 2020年6月3日
 */
class BaseControl {
  
  constructor(root) {
    this._root = root;
    
  }
  
  /**
   * 弹出等待窗口
   */
  _wait(msg){
    return layer.msg(msg, {
      icon: 16,
      shade: 0.01,
      time:0,
    });
  }
}

export default BaseControl;