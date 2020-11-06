import Base from "./Base";
import axios from "axios";
import QS from "qs";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
/**
 * 车联网
 * @author 谢灿
 * @desc 2020年7月24日
 */
class IOV extends Base {
  constructor(root) {
    super(root);
  }
  /**
   * 通过市级code获取相应单位及车辆信息
   * @param {int} city_code 必填 行政区域-市的code码
   * Route::get(':version/infoByCity','api/:version.Region/vehicleByCity');
   */
  infoByCity(city_code) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.iri + "v1/infoByCity?" + QS.stringify({ city_code }))
        .then((res) => {
          if (res.status == 200) {
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
   * 下达作战任务
   */
  assignCombatMissions() {
    return new Promise((resolve, reject) => {
      axios
        .post(this.server + "v1/operate_task", {
          fk_equ_id: 125, //园区单位
          fire_alarm_id: 248,
          alarm_man_name: "周新国",
          alarm_man_phone: "15755082350",
          is_single: 1,
          car_id:144
        })
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
   * 获取指定车型参数信息
   * @param {int} fk_iri_type_id 车联网中的车辆类型id
   * @author 谢灿2020-10-16
   */
  getPerformanceParameters(fk_iri_type_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.iri + "v1/performance_parameters/" + fk_iri_type_id, {})
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
   * 查询指定车辆车载装备信息
   * @param {int} fk_iri_vehicle_id 车联网中的车辆id
   * @author 谢灿 2020-10-16
   */
  getEquipmentEquipages(fk_iri_vehicle_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.iri + "v1/equipmentEquipage?equipment_id="+fk_iri_vehicle_id, {})
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


}
export default IOV;
