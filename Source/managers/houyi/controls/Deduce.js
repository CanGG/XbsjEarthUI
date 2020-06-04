import BaseControl from "./BaseControl";
/**
 * 推演相关方法
 * @author 谢灿
 * @extends BaseControl
 * @desc 2020年6月3日
 */
class Deduce extends BaseControl {
  /**
   * 
   * @param {Class} root 其实就是MainUI
   */
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
  listMajorHazardSources(orgId = this._root.hyControls.orgID, msg = "正在加载事件点...") {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait(msg);
      let root = this._root;
      root.hyServers.orgPart.list(orgId, null, null, null, 1).then(res => {
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
  listPlanDisasterGradeByOrgPart(orgPartId, orgId = this._root.hyControls.orgID, ) {
    console.log(orgId, orgPartId);
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载灾害等级...');
      let root = this._root;
      root.hyServers.planDisasterGrade.list(orgId, orgPartId, 999, 1).then(res => {
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
  listDeduces(fk_org_id, fk_org_part_id, fk_disaster_grade_id, keyword, limit, page) {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在加载推演预案信息...');
      let root = this._root;
      root.hyServers.planBasicInfo.list(fk_org_id, fk_org_part_id, fk_disaster_grade_id, '0', keyword, limit, page).then(res => {
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
   * 新增推演
   * @param {int} fk_org_id 单位id
   * @param {int} fk_org_part_id 单位部位id
   * @param {int} fk_disaster_grade_id 灾害等级id
   * @param {string} name 推演名称
   */
  addDeduce(fk_org_id, fk_org_part_id, fk_disaster_grade_id, name, ) {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在保存推演信息...');
      let root = this._root;
      let params = {
        fk_org_id,
        fk_org_part_id,
        fk_disaster_grade_id,
        name,
        plan_author: 'admin',
        is_formal_plan: '0'
      }
      root.hyServers.planBasicInfo.save(params).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            resolve(res);
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
   * 删除推演
   * @param {int} fk_org_id 单位id
   */
  delDeduce(fk_org_id){
    return new Promise((resolve, reject) => {
      let lIndex = this._wait('正在删除推演信息...');
      let root = this._root;
      root.hyServers.planBasicInfo.delete(fk_org_id).then(res => {
          console.log(res);
          if (res.code === 200) {
            //成功
            resolve(res);
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