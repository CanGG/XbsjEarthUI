import BaseControl from "./BaseControl";
/**
 * 车辆网相关方法
 * @author 谢灿
 * @extends BaseControl
 * @desc 2020年7月24日
 */
class IOV extends BaseControl {
  /**
   *
   * @param {Class} root 其实就是MainUI
   */
  constructor(root) {
    super(root);
  }

  /**
   * 通过市级code获取相应单位及车辆信息
   * @param {int} cityCode 必填 行政区域-市的code码
   */
  infoByCity(cityCode = 341103, msg) {
    return new Promise((resolve, reject) => {
      let lIndex = this._wait(msg);
      let root = this._root;
      root.hyServers.iov
        .infoByCity(cityCode)
        .then(
          (res) => {
            if (res.code === 200) {
              //成功
              let data = res.data;
              resolve(data);
            } else {
              reject(res);
            }
          },
          (err) => {
            reject(err);
          }
        )
        .finally(() => {
          layer.close(lIndex);
        });
    });
  }

  assignCombatMissions() {
    return new Promise((resolve, reject) => {
      let root = this._root;
      root.hyServers.iov
        .assignCombatMissions()
        .then(
          (res) => {
            if (res.code === 200) {
              //成功
              let data = res.data;
              resolve(data);
            } else {
              reject(res);
            }
          },
          (err) => {
            reject(err);
          }
        )
        .finally(() => {
        });
    });
  }
}

export default IOV;
