import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 力量集结圈
 * @author 谢灿
 * @time 2020-5-28 17:37:03
 */
class Circles extends Base{
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/circles'
     * @instance
     * @memberof Circles
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/circles'
    })
  }

  /**
   * 力量集结圈分页数据获取接口
   * @param {int} fkOrgId 单位id
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
   */
  list(fkOrgId,limit,page,keyword){
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          fk_org_id:fkOrgId,limit,page,keyword
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
   * 获取单位部位信息
   * @param {int} id 单位部位id
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
export default Circles;