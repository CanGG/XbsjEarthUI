import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 应急力量调节
 * @author 谢灿
<<<<<<< HEAD
 * @time 2020-5-28 17:48:45
=======
 * @desc 2020-5-28 17:48:45
>>>>>>> SafeChina
 */
class EmergencyForceMobilize extends Base{
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/emergency_force_mobilize'
     * @instance
     * @memberof EmergencyForceMobilize
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/emergency_force_mobilize'
    })
  }


  /**
   * 保存应急力量数据接口
   * @param {Object} obj 
   * fk_plan_id	是	int	推演id
   * fk_rescue_unit_id	是	int	救援单位id
   * fk_rescue_vehicle_id	是	int	救援车辆id
   * vehicle_rescue_mission	是	string	车辆救援任务
   * combat_longitude	是	string	车辆作战位置经度
   * combat_latitude	是	string	车辆作战位置纬度
   * vehicle_equipment_ids	是	string	调用的车载装备
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
   * 更新应急力量数据接口
   * @param {Object} obj 
   * 参数名	                必选	            类型	              说明
   * id	                    是	              int 	            主键id
   * fk_plan_id	            是	              int	              推演id
   * fk_rescue_unit_id	    是	              int	              救援单位id
   * fk_rescue_vehicle_id	  是	              int	              救援车辆id
   * vehicle_rescue_mission	是	              string	          车辆救援任务
   * combat_longitude	      是	              string	          车辆作战位置经度
   * combat_latitude	      是	              string	          车辆作战位置纬度
   * vehicle_equipment_ids	是	              string	          调用的车载装备
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
   * 删除应急力量数据接口
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
export default EmergencyForceMobilize;