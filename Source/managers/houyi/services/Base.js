
class Base{
  
  constructor(root) {
    this._root = root;

    //定义一个响应式变量 server
    XE.MVVM.extend(this, {
      /**
       * 后羿本地服务器地址
       * @type {string}
       * @default '//localhost:8888/' 
       * @instance
       * @memberof HyServer
       */
      server: '//localhost:8888/plan_rescue_api/public/index.php/',
      /**
       * 后羿在线服务器地址
       * @type {string}
       * @default '//lab2.cesiumlab.com/' 
       * @instance
       * @memberof HyServer
       */
      serverOnline: '//prescue.api.smartmgxf.com/',

      /**
       * 后羿云服务器地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof HyServer
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