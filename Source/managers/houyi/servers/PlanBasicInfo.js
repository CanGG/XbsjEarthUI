import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 推演预案
 * @author 谢灿
 * @desc 2020-5-28 17:39:39
 */
class PlanBasicInfo extends Base {
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/plan_basic_info'
     * @instance
     * @memberof PlanBasicInfo
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/plan_basic_info'
    })
  }

  /**
   * 获取单位部位列表信息
   * @param {int} fkOrgId  	单位id
   * @param {int} fkOrgPartId  单位部位id
   * @param {int} fkDisasterGradeId  	灾害等级id
   * @param {string} isFormalPlan  是否为正式预案（1是/2否）
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
   */
  list(fkOrgId, fkOrgPartId, fkDisasterGradeId, isFormalPlan, limit, page, keyword) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          fk_org_id: fkOrgId,
          fk_org_part_id: fkOrgPartId,
          fk_disaster_grade_id: fkDisasterGradeId,
          is_formal_plan: isFormalPlan,
          limit,
          page,
          keyword
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
   * 获取单条预案信息接口
   * @param {int} id 主键id
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

  /**
   * 预案保存接口
   * @param {Object} obj 
   * fk_org_id	否	int	单位id
   * fk_org_part_id	否	int	单位部位id
   * fk_disaster_grade_id	否	int	灾害等级id
   * name	否	string	名称
   * content	否	string	场景内容
   * thumbnail_url	否	string	场景缩略图
   * plan_author	否	string	场景制作人
   * is_formal_plan	否	int	是否为正式预案（1是2否）
   */
  save(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.server + this.path, obj)
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
   * 预案更新接口
   * @param {Object} obj 
   * 参数名	                必选	                类型	              说明
   * id	                    是	                  int 	            主键id
   * fk_org_id	            否	                  int	              单位id
   * fk_org_part_id	        否	                  int	              单位部位id
   * fk_disaster_grade_id	  否	                  int	              灾害等级id
   * name	                  否	                  string  	        名称
   * content	              否	                  string  	        场景内容
   * thumbnail_url	        否	                  string  	        场景缩略图
   * plan_author	          否	                  string  	        场景制作人
   * is_formal_plan	        否	                  int	              是否为正式预案（1是2否）
   */
  update(obj) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this.path, obj)
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
   * 预案删除接口
   * @param {int} id 主键id
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.server + this.path, QS.stringify({
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
export default PlanBasicInfo;