import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * @author 谢灿
 * @desc 2020-1-2
 * @description 后羿服务访问控制。
 * @class
 */
class HyServer {
  constructor(root) {
    this._root = root;

    /**
     * 后羿场景控制器路径
     * @type {string}
     * @readonly
     * @default 'iaip/public/v1/earth/scenes/'
     * @instance
     * @memberof HyServer
     */
    Object.defineProperty(this, 'scenes', {
      get: () => 'iaip/public/v1/earth/scenes/'
    })

    //定义一个响应式变量 server
    XE.MVVM.extend(this, {
      /**
       * 后羿本地服务器地址
       * @type {string}
       * @default 'http://220.180.184.7:8711/plan/' 
       * @instance
       * @memberof HyServer
       */
      server: 'http://220.180.184.7:8711/plan_rescue_api/public/index.php/',
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

    // this.getSymbol(this.symbolGroupId);
  }

  test(name){
    console.log('测试servers->scene===>'+ name);
  }

  /**
   * 添加一个场景
   * @param {String} name  场景名称
   * @param {String} content  场景内容
   * @returns {Promise}  
   */
  addScene(name, content) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.server + this.scenes, QS.stringify({
          name: name,
          content: content
        }))
        .then(res => {
          if (res.status == 200 && res.data.code == "200") {
            resolve(res.data.data.key_id);
          } else {
            reject(res.data.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  /**
   * 更新场景内容
   * @param {String} id  场景id 
   * @param {String} content  场景内容
   * @returns {Promise}  
   */
  updateScene(id, content) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this.scenes + id, QS.stringify({
          content: content
        }))
        .then(res => {
          if (res.status == 200 && res.data.code == "200") {
            resolve(true);
          } else {
            reject(res.data.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  /**
   * 获取一个场景的内容 
   * @param {String} id  场景id 
   * @returns {Promise}  
   */
  queryScene(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.scenes + id)
        .then(res => {
          if (res.status == 200 && res.data.code == "200") {
            resolve(res.data.data);
          } else {
            reject(res.data.status);
          }
        })
        .catch(error => {
          reject(error);
        });

    });
  }


  /**
   * 更新数据库对象的名称
   * @param {String} type 服务类型 terrain,image,model,style,scene
   * @param {String} id  对象id
   * @param {String} name  对象新名称
   * @returns {Promise}  
   */
  rename(type, id, name) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this[type] + id, QS.stringify({
          name: name
        }))
        .then(res => {
          if (res.status == 200 && res.data.code == "200") {
            resolve(res.data.result);
          } else {
            reject(res.data.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 更新数据库对象的缩略图
   * @param {String} type 服务类型 terrain,image,model,style,scenes
   * @param {String} id  对象id
   * @param {String} img 缩略图地址
   * @returns {Promise}  
   */
  updateLayerThumbnail(type, id, img) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this[type] + id, QS.stringify({
          thumbnail: img
        }))
        .then(res => {
          if (res.status == 200 && res.data.code == "200") {
            resolve(res.data.result);
          } else {
            reject(res.data.status);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  
}

export default HyServer;