/**
 * 推演相关方法
 * @author 谢灿
 * @desc 2020年6月3日
 */
class Deduce {
  constructor(root) {
    this._root = root;
  }
  //事件点相关方法
  listMajorHazardSources(orgId = this._root.orgId) {
    return new Promise((resolve, reject) => {
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
      });
    })
  }

  listPlanDisasterGradeByOrgPart(orgPartId, orgId = this._root.orgId, ) {
    console.log(orgId, orgPartId);
    return new Promise((resolve, reject) => {
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
      });
    })
  }
}

export default Deduce;