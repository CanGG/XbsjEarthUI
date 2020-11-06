import Base from "./Base";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 演练管理接口
 * @author 张杰 2020-10-20 15:58:35
 */
class PlanManagement extends Base {
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
     * @memberof PlanManagement
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/plan/exercises/'
    })
  }

  /**
   * 删除演练
   * @param {int} id 演练id
   */
  del(id){
    return new Promise((resolve, reject) => {
        axios
          .delete(this.server + this.path + "/" + id, {})
          .then((res) => {
            if (res.status == 200 && res.data.code == 200) {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
  }
  /**
   * 保存演练
   * @param {json} data 演练信息
   */
  save(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.server + this.path, data)
        .then((res) => {
          if (res.status == 200 && res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * 修改演练
   * @param {int} id 演练id
   * @param {json} data 修改内容
   */
  update(id, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this.path + '/' + id, data)
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

export default PlanManagement;