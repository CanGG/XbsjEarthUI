import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 灾害等级
 * @author 谢灿
 * @desc 2020-5-28 17:27:14
 */
class PlanDisasterGrade extends Base {
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/plan_disaster_grade'
     * @instance
     * @memberof PlanDisasterGrade
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/plan_disaster_grade'
    })
  }

  /**
   * 根据单位部位获取灾害等级
   * @param {int} fkOrgId  所属单位id
   * @param {int} fkOrgPartId  传所属单位部位id，如果传入该参数，则表示获取该部位下的所有灾害等级，否则获取所有部位的灾害等级
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
   */
  list(fkOrgId, fkOrgPartId, limit, page, keyword) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, {
          params: {
            fk_org_id: fkOrgId,
            fk_org_part_id: fkOrgPartId,
            limit,
            page,
            keyword
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
   * 获取指定单个灾害等级信息
   * @param {int} id 记录id
   */
  get(id) {
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
export default PlanDisasterGrade;