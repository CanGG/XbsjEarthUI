import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 事故情景
 * @author 谢灿
 * @desc 2020-9-23 14:37:12
 */
class PlanBasicInfo extends Base {
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/disasters'
     * @instance
     * @memberof PlanBasicInfo
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/plan/disasters'
    })
  }

  /**
   * 获取单位的事故列表
   * @param {int}    fk_org_id       *单位id 
   * @param {int}    fk_org_part_id  单位部位id
   * @param {string} keyword               模糊查询关键字
   * @param {int}    limit                 分页参数：每页显示几条内容
   * @param {int}    page                  分页参数：当前页
   */
  list(fk_org_id, fk_org_part_id, keyword, limit, page) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          fk_org_id, fk_org_part_id, keyword, limit, page, keyword
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
   * 获取单条事故情景接口
   * @param {int} id 主键id
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
   * 事故情景保存接口
   * @param {Object} obj 
   * fk_equipment_id	是	int	单位id
   * fk_equipment_part_ids	是	string	部位id,用’,’隔开
   * name	是	string	部位名称
   * author	是	int	作者,当面登录的用户
   * disaster_level	是	string	灾害等级
   * disaster_explain	是	string	灾害等级说明
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
   * id	是	int	单位部位id
   * fk_equipment_id	否	int	单位id
   * fk_equipment_part_ids	否	string	部位id,用’,’隔开
   * name	否	string	部位名称
   * author	否	int	作者,当面登录的用户
   * disaster_level	否	string	灾害等级
   * disaster_explain	否	string	灾害等级说明
   */
  update(id, obj) {
    return new Promise((resolve, reject) => {
      axios
        .put(this.server + this.path + '/'+id, obj)
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
   * 事故删除接口
   * @param {int} id 主键id
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.server + this.path + '/' + id, {})
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