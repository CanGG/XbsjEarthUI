import BaseControl from "./BaseControl";
/**
 * 推演相关方法
 * @author 谢灿
 * @extends BaseControl
 * @desc 2020年6月3日
 */
class Deduce extends BaseControl {
  constructor(root) {
    super(root);
    console.log(this._root)
  }

  /**
   * 获取单位列表
   */
  listOrgs() {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载单位...');
      let root = this._root;
      // root.$hyServers.orgPart.list(orgId, null, null, null, 1).then(res => {
      //   console.log(res);
      //   if (res.code === 200) {
      //     //成功
      //     let data = res.data;
      //     let result = [];
      //     data.forEach((orgPart, index) => {
      //       result.push({
      //         id: orgPart.key_id,
      //         name: orgPart.fk_org_type_name
      //       })
      //     });
      //     resolve(result);
      //   } else {
      //     reject(res);
      //   }
      // }, err => {
      //   reject(err);
      // })
      // .finally(()=>{
      //   layer.close(lIndex);
      // });
    })
  }

  /**
   * 获取单位的事件点列表(重大危险源)
   * @param {int} orgId 
   */
  listMajorHazardSources(orgId = this._root.orgId, msg = "正在加载事件点...") {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait(msg);
      let root = this._root;
      root.$hyServers.orgPart.list(orgId, null, null, null, 1).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            let data = res.data;
            let result = [];
            data.forEach((orgPart, index) => {
              result.push({
                id: orgPart.key_id,
                name: orgPart.fk_org_type_name
              })
            });
            resolve(result);
          } else {
            reject(res);
          }
        }, err => {
          reject(err);
        })
        .finally(() => {
          layer.close(lIndex);
        });
    })
  }

  /**
   * 获取单位事件点下的所有灾害等级
   * @param {int} orgPartId 
   * @param {int} orgId 
   */
  listPlanDisasterGradeByOrgPart(orgPartId, orgId = this._root.orgId, ) {
    console.log(orgId, orgPartId);
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载灾害等级...');
      let root = this._root;
      root.$hyServers.planDisasterGrade.list(orgId, orgPartId, 999, 1).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            let data = res.data;
            let result = [];
            data.forEach((grade, index) => {
              result.push({
                id: grade.key_id,
                name: grade.name,
                description: grade.description,
              })
            });
            resolve(result);
          } else {
            reject(res);
          }
        }, err => {
          reject(err);
        })
        .finally(() => {
          layer.close(lIndex);
        });
    })
  }

  /**
   * 获取推演预案列表
   * @param {int} fk_org_id 单位id
   * @param {int} fk_org_part_id 单位部位id
   * @param {int} fk_disaster_grade_id 灾害等级id
   * @param {string} keyword 名称关键字
   * @param {int} limit 分页每页数据条数
   * @param {int} page 分页页数
   */
  listPlans(fk_org_id, fk_org_part_id, fk_disaster_grade_id, keyword, limit, page) {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载推演预案信息...');
      let root = this._root;
      root.$hyServers.planBasicInfo.list(fk_org_id, fk_org_part_id, fk_disaster_grade_id, '0', keyword, limit, page).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            let data = res.data;
            let result = [];
            data.forEach((plan, index) => {
              result.push({
                id: plan.key_id,
                name: plan.name,
                partName: plan.fk_org_part_name,
                gradeName: plan.fk_disaster_grade_name,
                author: plan.plan_author,
                createTime: plan.create_time,
                updateTime: plan.update_time,
              })
            });
            resolve(result);
          } else {
            reject(res);
          }
        }, err => {
          reject(err);
        })
        .finally(() => {
          layer.close(lIndex);
        });

    })
  }
  /**
   * 保存推演预案
   * @param {int} fk_org_id 单位id
   * @param {int} fk_org_part_id 单位部位id
   * @param {int} fk_disaster_grade_id 灾害等级id
   * @param {string} keyword 名称关键字
   * @param {int} limit 分页每页数据条数
   * @param {int} page 分页页数
   * fk_org_id	否	int	单位id
   * fk_org_part_id	否	int	单位部位id
   * fk_disaster_grade_id	否	int	灾害等级id
   * name	否	string	名称
   * content	否	string	场景内容
   * thumbnail_url	否	string	场景缩略图
   * plan_author	否	string	场景制作人
   * is_formal_plan	否	int	是否为正式预案（1是2否）
   */
  
  savePlan(fk_org_id, fk_org_part_id, fk_disaster_grade_id, name, content, thumbnail_url) {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载推演预案信息...');
      let root = this._root;
      root.$hyServers.planBasicInfo.list(fk_org_id, fk_org_part_id, fk_disaster_grade_id, '0', keyword, limit, page).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            let data = res.data;
            let result = [];
            data.forEach((plan, index) => {
              result.push({
                id: plan.key_id,
                name: plan.name,
                partName: plan.fk_org_part_name,
                gradeName: plan.fk_disaster_grade_name,
                author: plan.plan_author,
                createTime: plan.create_time,
                updateTime: plan.update_time,
              })
            });
            resolve(result);
          } else {
            reject(res);
          }
        }, err => {
          reject(err);
        })
        .finally(() => {
          layer.close(lIndex);
        });

    })
  }

}

export default Deduce;