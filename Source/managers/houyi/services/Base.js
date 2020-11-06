/**
 * API脚本配置文件
 * @author 谢灿 2020-9-23 14:47:40
 */
class Base{
  
  constructor(root) {
    this._root = root;

    //定义一个响应式变量 server
    XE.MVVM.extend(this, {
      /**
       * 本地接口服务地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Base
       */
      server: 'http://220.180.184.7:8711/plan/plan_rescue_api/public/index.php/',
      planRescuePc: 'http://220.180.184.7:8711/plan/plan_rescue_pc/',
      server: 'http://220.180.184.7:8711/plan/plan_rescue_api/public/index.php/',
      /**
       * 本地前端项目地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Base
       */
      planRescuePc: 'http://220.180.184.7:8711/plan/plan_rescue_pc/',
      /**
       * 车联网正式环境接口地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Base
       */
      iri: 'https://www.smartmgxf.com/iri/public/index.php/', 
      /**
       * 车联网测试环境接口地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Base
       */
      iritest: 'https://www.smartmgxf.com/iritest/public/index.php/',
      /**
       * 后羿在线服务器地址
       * @type {string}
       * @default '//lab2.cesiumlab.com/' 
       * @instance
       * @memberof Base
       */
      serverOnline: '//prescue.api.smartmgxf.com/',

      /**
       * 后羿云服务器地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Base
       */
      cloudServiceUrl: '',

      /**
       * 自定义标绘库id
       * @type {string}
       * @default '' 
       * @instance
       * @memberof HyServer
       */
      symbolGroupId: 'custom_symbols',
    });

  }
}


export default Base;