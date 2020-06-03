import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 消防要素数据
 * @author 谢灿
<<<<<<< HEAD
 * @time 2020-5-28 17:19:14
=======
 * @desc 2020-5-28 17:19:14
>>>>>>> SafeChina
 */
class PlanFireElement extends Base{
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/plan_fire_element'
     * @instance
     * @memberof PlanFireElement
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/plan_fire_element'
    })
  }

  /**
   * 获取消防要素列表
   * @param {int} fkFireEleTypeId 要素类型id，传入此参数则获取某个类型下的数据，否则获取所有数据
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
   */
  list(fkFireEleTypeId,limit,page,keyword){
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          fk_fire_ele_type_id:fkFireEleTypeId,limit,page,keyword
        }))
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
   * 获取单条消防要素信息
   * @param {int} id 单位部位类型id
   */
  get(id){
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          id
        }))
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
export default PlanFireElement;