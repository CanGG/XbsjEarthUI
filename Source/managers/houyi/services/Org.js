import Base from "./Base";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 单位接口
 * @author 谢灿
 * @desc 2020-9-28 09:29:13
 */
class Org extends Base {
  constructor(root) {
    //调用Base的构造函数
    super(root);

    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/orgs'
     * @instance
     * @memberof Org
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/orgs'
    })
  }

  /**
   * 获取单位模型列表信息
   * @param {int} FK_Company_Id  传入此参数则获取某个单位的数据，否则获取所有数据
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   */
  list(FK_Company_Id, limit, page) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, {
          params: {
            FK_Company_Id,
            limit,
            page
          }
        })
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 获取单位信息
   * @param {int} id 单位部位id
   */
  get(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path + '/' + id, {})
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * 修改单位信息
   * @param {int} id 单位模型id
   * @param {Object} obj 
   */
  update(id, obj) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this.path + "/" + id, obj)
        .then(res => {
          if (res.status == 200 && res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}

export default Org;