import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 组织相关
 * @author 谢灿
 * @desc 2020-5-28 17:30:55
 */
class RpUnits extends Base{
  constructor(root) {
    super(root);
    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/rp_units'
     * @instance
     * @memberof RpUnits
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/rp_units'
    })
  }

  /**
   * 根据类型获得单位列表接口
   * @param {string} unitTypeCode  要获得的组织类型   
   * gongAn	公安消防;yuanQuUnit	园区单位;unitedServiceLinkage	联勤联动;operationalReserve	作战储备
   * @param {int} orgId 组织id ，0或者不传:表示获取所有，其他表示:某个单位
   */
  list(unitTypeCode,orgId){
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          unit_type_code:unitTypeCode,org_id:orgId
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
export default RpUnits;