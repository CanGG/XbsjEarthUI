import Deduce from "./Deduce";
/**
 * hy控制入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Controls{
  constructor(root){
    this.deduce = new Deduce(root);
      //响应式变量 sceneID  , sceneName
      XE.MVVM.extend(this, {
            
        /**
        * 厂区ID  场景保存后才会有值
        * @type {int}
        * @default undefined 
        * @instance
        * @memberof Controls
        */
        orgID: 121,

        /**
        * 场景ID  场景保存后才会有值
        * @type {string}
        * @default undefined 
        * @instance
        * @memberof Controls
        */
        sceneID: 121,
        /**
       * 场景名称 
       * @type {string}
       * @default '新建场景' 
        * @instance
        * @memberof Controls
        */
        sceneName: "新建场景",
        /**
       * 场景缩略图地址
       * @type {string}
       * @default '' 
        * @instance
        * @memberof Controls
        */
        thumbnail: ''
    });
  }
}

export default Controls;