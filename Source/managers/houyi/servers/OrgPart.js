import Base from "./Base";
import axios from "axios";
import QS from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/**
 * 单位部位接口
 * @author 谢灿
<<<<<<< HEAD
 * @time 2020年5月28日
 */
class OrgPart extends Base{
  constructor(root){
=======
 * @desc 2020年5月28日
 */
class OrgPart extends Base {
  constructor(root) {
>>>>>>> SafeChina
    //调用Base的构造函数
    super(root);

    //需要扩展的代码
    /**
     * API地址
     * @type {string}
     * @readonly
     * @default 'v2/org_parts'
     * @instance
     * @memberof OrgPart
     */
    Object.defineProperty(this, 'path', {
      get: () => 'v2/org_parts'
    })
  }

  /**
   * 获取单位部位列表信息
   * @param {int} fkOrgId  传入此参数则获取某个单位的数据，否则获取所有数据
   * @param {int} limit 分页参数：每页显示几条内容
   * @param {int} page 分页参数：当前页
   * @param {string} keyword 模糊查询关键字
<<<<<<< HEAD
   */
  list(fkOrgId,limit,page,keyword){
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, QS.stringify({
          fk_org_id:fkOrgId,limit,page,keyword
        }))
=======
   * @param {int} isMajorHazards 是否为重点消防部位
   */
  list(fkOrgId, limit, page, keyword, isMajorHazards) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.server + this.path, {
          params: {
            fk_org_id: fkOrgId,
            limit,
            page,
            keyword,
            is_major_hazards: isMajorHazards
          }
        })
>>>>>>> SafeChina
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
<<<<<<< HEAD
    
=======

>>>>>>> SafeChina
  }
  /**
   * 获取单位部位信息
   * @param {int} id 单位部位id
   */
<<<<<<< HEAD
  get(id){
=======
  get(id) {
>>>>>>> SafeChina
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
<<<<<<< HEAD
    
=======

>>>>>>> SafeChina
  }
  /**
   * 修改单位部位信息
   * @param {Object} obj 
   *  id	是	int	单位部位id
   *  fk_org_id	否	int	单位id
   *  fk_type_id	否	int	部位类型id
   *  name	否	string	部位名称
   *  is_major_hazards	否	int	是否为重大危险源，1是，0不是
   *  longitude	否	string	经度
   *  latitude	否	string	维度
   *  part_img_url	否	string	部位照片
   *  panorama_url	否	string	全景url
   *  fire_department_description	否	string	部位消防描述
   *  part_instructions	否	string	部位使用说明
<<<<<<< HEAD
   */ 
  update(obj){
        return new Promise((resolve, reject) => {
=======
   */
  update(obj) {
    return new Promise((resolve, reject) => {
>>>>>>> SafeChina
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

}

export default OrgPart;