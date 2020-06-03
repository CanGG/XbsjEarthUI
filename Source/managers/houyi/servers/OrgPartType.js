import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
* 单位部位类型
* @author 谢灿
* @time 2020年5月28日
*/
class OrgPartType extends Base{
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/org_parts_type'
     * @instance
     * @memberof OrgPartType
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/org_parts_type'
    })
  }

  /**
   * 获取单位部位类型列表信息
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
   */
  list(limit,page,keyword){
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
   * 获取单位部位类型信息
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
export default OrgPartType;