import Base from "./Base";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 作战力量接口
 * @author 谢灿 2020-9-28 15:58:35
 */
class CombatPower extends Base {
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
     * @memberof CombatPower
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/combatPower'
    })
  }

  /**
   * 获取单位部位信息
   * @param {int} id 单位部位id
   */
  get(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path + "s/" + id, {})
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
   * 获取作战单位列表信息
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   */
  listUnits(limit, page) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path + '/listUnits', {
          params: {
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
   * 获取车辆列表
   * @param {int} fk_unit 所属作战单位id
   * @param {int} fk_iri_type_id  车联网中的车辆类型id
   * @param {string} keyword  模糊查询车辆名车个
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   */
  listVehicles(fk_unit,  keyword,fk_iri_type_id, limit, page) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path + '/listVehicles', {
          params: {fk_unit, fk_iri_type_id, keyword, limit, page,}
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

}

export default CombatPower;