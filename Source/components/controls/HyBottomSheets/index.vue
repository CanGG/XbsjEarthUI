 <template>
  <div class="foot">
    <div class="footer bor-3">
      <div class="ft-ctns">
        <ul class="ft-nav clearfix">
          <li
            v-for="(item, i) in part_types"
            @click="showBox(i, $event)"
            v-bind:class="{ bottom: show[i] }"
            v-bind:key="item.key_id"
          >
            <img :title="item.name" :src="item.icon_url" />
            <p>{{ item.name }}</p>
            <div class="ft-popup-box" v-show="show[i]">
              <div
                class="ft-nav-popup bor-3 bg-color1"
                style="background: rgba(255, 255, 255, 0.99) none repeat scroll 0% 0%;"
              >
                <p
                  class="nav-popup-title"
                  style="background: rgba(2, 10, 23, 0.99) none repeat scroll 0% 0%;"
                >
                  {{ item.name }}
                </p>
                <ul>
                  <li
                    class="nav-popup-add"
                    v-for="(value, key) in item.child"
                    @click="showPopupDetail(value.key_id)"
                    :key="'popup-' + key"
                  >
                    <span :title="value.name">{{ value.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li @click="showBox(part_types.length, $event)">
            <img
              src="http://cesium-plan-1254117419.cos.ap-shanghai.myqcloud.com/icon/%E6%98%BE%E7%A4%BA.png"
              title="显示设置"
            />
            <p>显示设置</p>
            <div class="ft-popup-box" v-show="show[part_types.length]">
              <div
                class="ft-nav-popup bor-3 bg-color1"
                style="background: rgba(255, 255, 255, 0.99) none repeat scroll 0% 0%;"
              >
                <p
                  class="nav-popup-title"
                  style="background: rgba(2, 10, 23, 0.99) none repeat scroll 0% 0%;"
                >
                  显示设置
                </p>
                <ul>
                  <li class="nav-popup-add" v-for="(item, i) in according_item" :key="'popp'+i">
                    <span :title="item.title">
                      <label class="checkBox">
                        <input
                          type="checkbox"
                          v-model="item.parent_entities"
                          @change="change_checkbox(item)"
                          style="vertical-align:middle;margin-right:5px"
                        />{{ item.title }}
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div style="clear:both"></div>
      </div>
    </div>
    <hypin ref="hyPin"></hypin>
  </div>
  
</template>

<script>
import hypin from "./hypin";
import axios from "axios";
export default {
  components: {
    hypin
  },
  data: () => {
    return {
      show: [],
      _earth: undefined,
      part_types: [],
      according_item: [
        {
          show: true,
          title: "单位部位",
          parent_entities: true
        },
        {
          show: true,
          title: "消防设施",
          parent_entities: true
        }
      ]
    };
  },
  mounted: function() {
    let that = this;
    document.onclick = () => {
      this.changeShowToFalse();
    };
    let ft_popup_box = document.getElementsByClassName("ft-popup-box");
    for (let value of ft_popup_box) {
      value.onclick = e => {
        e.stopPropagation();
      };
    }
    let earth = that.$root.$earth;

    let viewer = earth.czm.viewer;
    //单位部位，
    that.getUnitPart(viewer);

    //获取消防要素,构建图标
    that.getFireElement(viewer);

    //单位部位类型，底部导航
    that.getUnitTypeBottomNavigation();

    /*
     * 鼠标点击事件
     */
    that.clickFireProtectionEquipmentIcon(viewer);
  },
  methods: {
    showBox: function(index, event) {
      let new_data = !this.show[index];

      this.changeShowToFalse();

      this.show.splice(index, 1, new_data);
      event.stopPropagation();
    },
    //创建信息框
    showPopupDetail(value, url = false) {
      this.changeShowToFalse();

      if (!url) {
        url = "http://prescue.api.smartmgxf.com/index.php/v2/org_parts/";
      }
      axios
        .get(url + value)
        .then(response => {
          let data = response.data;
          if (data.code == 200) {
            this.$refs.hyPin.creatPin(data.data);
          }
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        })
        .finally(() => console.log("end"));
    },

    changeShowToFalse() {
      let show_index = this.show.indexOf(true);
      this.show.splice(show_index, 1, false);
    },

    //选择框事件
    change_checkbox(item) {
      window.show_icon_unit.show = this.according_item[0].parent_entities;
      window.show_icon_element.show = this.according_item[1].parent_entities;
    },

    //点击消防设施图标事件
    clickFireProtectionEquipmentIcon(viewer) {
      let that = this;
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function(click) {
        var pick = viewer.scene.pick(click.position);
        //选中某模型   pick选中的对象
        if (pick && pick.id) {
          that.showPopupDetail(
            pick.id._id,
            "http://prescue.api.smartmgxf.com/index.php/v2/plan_fire_element/"
          );
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    //获取单位类型底部导航数据
    getUnitTypeBottomNavigation() {
      let that = this;
      axios
        .get("http://prescue.api.smartmgxf.com/index.php/v2/org_part_types", {
          params: {
            is_bottom_menu: 1,
            org_id: 121
          }
        })
        .then(response => {
          let data = response.data;

          if (data.code == 200) {
            that.part_types = data.data;
            let length = data.data.length;
            let show_l = [];
            for (let i = 0; i < length; i++) {
              show_l[i] = false;
            }
            that.show = show_l;
          } else {
            console.log(data.msg);
          }
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        })
        .finally(() => console.log("end"));
    },

    //获取消防要素,构建指示图标
    getFireElement(viewer) {
      let that = this;
      axios
        .get(
          "http://prescue.api.smartmgxf.com/index.php/v2/plan_fire_element/getFireElementByUnit",
          {
            params: {
              org_id: 121
            }
          }
        )
        .then(response => {
          let data = response.data;

          if (data.code == 200) {
            let elements = data.data;
            let length = elements.length;

            let parent = viewer.entities.add(new Cesium.Entity());
            console.log(parent);
            //消防要素绑定
            //this.$set(this.according_item[1],"parent_entities",parent);
            for (let i = 0; i < length; i++) {
              let value = elements[i];
              viewer.entities.add({
                parent: parent,
                position: Cesium.Cartesian3.fromDegrees(
                  value.longitude,
                  value.latitude,
                  value.height
                ),
                billboard: {
                  //图标
                  image: value.fire_element_type_icon,
                  width: 50,
                  height: 50,
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM //垂直位置
                },
                id: value.key_id
              });
            }

            window.show_icon_element = parent;
          } else {
            console.log(data.msg);
          }
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        })
        .finally(() => console.log("end"));
    },

    //单位部位信息获取构建
    getUnitPart(viewer) {
      let that = this;
      let point_offset = 20;

      let parentLabel = viewer.entities.add(new Cesium.Entity());
      window.show_icon_unit = parentLabel;
      axios
        .get("http://prescue.api.smartmgxf.com/index.php/v2/org_parts", {
          params: {
            org_id: 121
          }
        })
        .then(response => {
          let data = response.data;

          if (data.code == 200) {
            let labels = data.data;
            // console.log("labels");
            // console.log(labels);
            for (let label of labels) {
              let entityss = viewer.entities.add({
                parent: parentLabel,
                position: Cesium.Cartesian3.fromDegrees(
                  label.longitude,
                  label.latitude,
                  label.height + point_offset
                ),
                polyline: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    label.longitude,
                    label.latitude,
                    label.height,
                    label.longitude,
                    label.latitude,
                    label.height + point_offset
                  ]),
                  width: 3,
                  material: Cesium.Color.RED,
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    400
                  ) //设置显示范围
                  //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0), //设置缩放
                },
                point: {
                  color: Cesium.Color.RED, //点位颜色
                  pixelSize: 10, //像素点大小
                  //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0), //设置缩放
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    400
                  ) //设置显示范围
                },
                label: {
                  scale: 0.8, //大小
                  text: label.name,
                  font: "14pt Source Han Sans CN", //字体样式
                  fillColor: Cesium.Color.BLACK, //字体颜色
                  backgroundColor: Cesium.Color.AQUA, //背景颜色
                  showBackground: false, //是否显示背景颜色
                  style: Cesium.LabelStyle.FILL, //label样式
                  outlineWidth: 2,
                  verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直位置
                  horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //水平位置
                  pixelOffset: new Cesium.Cartesian2(10, 0), //偏移
                  //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0), //设置缩放
                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    400
                  ) //设置显示范围
                }
              });
              viewer.zoomTo(entityss);
            }
          } else {
            console.log(data.msg);
          }
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        })
        .finally(() => console.log("end"));
    }
  }
};
</script>

<style>
ol,
ul,
li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}

body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 隐藏cesium ino */
.cesium-viewer-bottom {
  display: none;
}
#cesiumContainer {
  background: #0086b3;
  text-align: center;
}

.foot {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  /* text-align: center; */
  z-index: 99999;
}
/* footer */
/* style="width: 470.4px; margin-left: -235.2px;" */
.footer {
  height: 51px;

  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background: #545454;
  border: 1px solid #7d7d7d;
  border-bottom: 0;

  display: inline-block;
  padding: 0 25px;
}

ul.ft-nav {
  height: 80px;
  margin: 0 auto;
  /* left: 40px; */
  margin-top: -30px;
  padding-left: 30px;
  display: inline-block;
}

.ft-nav > li {
  width: 80px;
  /* height: 80px; */
  float: left;
  margin-right: 30px;
  cursor: pointer;
  position: relative;
}

.ft-nav > li img {
  display: block;
  margin: 0 auto;
  height: 66px;
  background-color: white;
  border-radius: 66px;
}

.ft-nav > li > p {
  text-align: center;
  color: #fff;
}

.ft-popup-box {
  width: 220px;
  height: 349px;
  position: absolute;
  top: -389px;
  left: -65px;
  /* display: none; */
}

.ft-popup-box::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  border-left: 20px solid rgba(255, 255, 255, 0);
  border-right: 10px solid rgba(255, 255, 255, 0);
  border-bottom: 20px solid rgba(255, 255, 255, 0);
  border-top: 20px solid white;
  bottom: -36px;
  left: calc(50% - 25px);
  z-index: 999;
}

.ft-nav-popup {
  width: 218px;
  height: 345px;
  border: 1px solid #e0e0de;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  -ms-box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  position: relative;
  background: #fff;
  border-radius: 8px;
}

.nav-popup-title {
  height: 46px;
  line-height: 46px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  background: #1e8ec7;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #bfbdbd;
}

.ft-nav-popup > ul {
  height: 270px;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-popup-add {
  height: 36px;
  line-height: 36px;
  color: #444744;
  padding-left: 10px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
}

.nav-popup-add > span {
  display: block;
  width: 180px;
  height: 36px;
  text-indent: 15px;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 16px;
  /* background: url(../img/basics/white-cir.png) no-repeat left; */
}

.jianjiao {
  display: block;
  width: 24px;
  height: 16px;
  position: absolute;
  left: 50%;
  margin-left: -12px;
  bottom: -16px;
  /* background: url(../img/jt.png) no-repeat; */
}

#labelform {
  display: block;
  padding: 5px 0 0 23px;
  overflow-y: auto;
  height: 270px;
}

.labelbox {
  width: 150px;
  height: 30px;
  float: left;
  overflow: hidden;
  line-height: 30px;
  margin: 6px 15px 0 0;
  color: #555555;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chebox-bg {
  display: block;
  width: 16px;
  height: 11px;
  /* background: url(../img/checkbox.png) no-repeat; */
  background-position: 0 0;
  float: left;
  margin: 10px 9px 0 0;
}
.labelbox input {
  visibility: hidden;
}

/* 全景弹窗 */
.ft-roam-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr=#000000,endColorstr=#000000);
  z-index: 9999;
  display: none;
}
.ft-roam-close {
  display: block;
  width: 35px;
  height: 35px;
  /* background: url(../img/gb.png) no-repeat; */
  position: absolute;
  right: -15px;
  top: -15px;
  cursor: pointer;
}

/*leaflet风格气泡窗口样式模板*/
.leaflet-popup {
  position: absolute;
  text-align: center;
}
.leaflet-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
}
.leaflet-popup-content-wrapper {
  text-align: center;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 1px;
  text-align: left;
  border-radius: 12px;
}
.leaflet-popup-content {
  margin: 13px 19px;
  line-height: 1.4;
}
.leaflet-popup-tip-container {
  margin: 0 auto;
  width: 200px;
  height: 100px;
  position: relative;
  overflow: hidden;
}
.leaflet-popup-tip {
  background: white;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  width: 17px;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.bottom {
  bottom: 10px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  outline: none;
}
.checkBox input[type="checkbox"]:checked {
  background: url("hypin/checkbox.png") no-repeat center;
}
</style>