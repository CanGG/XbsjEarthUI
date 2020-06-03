// author 谢灿
// date 2020年5月19日
// description 车辆出动情况即作战力量列表
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatright="true"
      :width="463"
      :minWidth="202"
      :height="500"
      :left="5"
      :top="140"
      :title="lang.title"
      class="hy-vehicle-movement"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-vehicle-movement-accordian">
          <ul>
            <li
              v-for="(team,i) in data"
              :key="'vehicle-movement-team-'+i"
              :class="{'active':team.choice}"
            >
              <h3 @click="choice(team)">
                {{team.name}}
                <!--<span class="xbsj-model-arrow"></span>-->
              </h3>
              <div class="hy-vehicle-movement-item" >
                <div v-for="(vehicle,j) in team.vehicles" :key="'vehicle-movement-team-vehicle-'+j" :class="clsState[vehicle.state]">
                  <!-- 缩略图 大小为64*64px 存放在apps/assets/3d/中-->
                  <div class="hy-list-content-img">
                    <img style="width:64px;height:64px;" :src="vehicle.thumb" alt />
                  </div>
                  <!-- 模型的文字说明 -->
                  <div class="hy-list-content-text">{{vehicle.name}}</div>
                  <!-- 模型的文字说明 -->
                  <div class="hy-list-content-text">{{stateCN[vehicle.state]}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
<<<<<<< HEAD
import "layui-src";
import "layui-src/dist/css/layui.css";
=======
>>>>>>> SafeChina

export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      stateCN: {},
      clsState:{
        '0':'normal',
        '1':'offline',
        '2':'deplay',
      },
      data: [],
      lang: {},
      langs: languagejs
    };
  },
  created() {
    var element = layui.element;
    var layer = layui.layer;

    //监听折叠
    element.on("collapse(test)", function(data) {
      layer.msg("展开状态：" + data.show);
    });
  },
  mounted() {
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    //绑定显隐
    this._disposers.push(
      XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
    );

    //获取车辆出动状态
    this.stateCN = this.getStateCn();

    //获取各单位车辆列表
    {
      this.data = this.getData();
    }
  },
  methods: {
    getStateCn() {
      return FakeData.stateCN;
    },
    getData() {
      return FakeData.data;
    },
    choice(team) {
      console.log(team.choice);
      if (team.choice === undefined) {
        console.log(1);
        this.$set(team, "choice", true);
      } else {
        console.log(2);
        team.choice = !team.choice;
      }

      // vehicle.choice = true;
    }
  },
  computed: {},
  filters: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  },
  watch: {
    selectedGroup(v) {
      console.log(v);
    }
  }
};
</script>

<style scoped>
.hy-vehicle_movement {
  min-width: 462px;
  z-index: 10;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.hy-list {
  padding: 5px 5px 0 5px;
}
.hy-content{
  height:100%
}
.hy-list:after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: rgba(158, 158, 158, 0.5);
  z-index: 1;
  left: 0;
  margin-top: 3px;
  display: block;
}
.hy-list-title {
  margin-bottom: 3px;
}
.hy-list-contents {
}
.hy-list-contents li {
  display: inline-block;
  padding: 8px 8px 0 8px;
  position: relative;
}
.hy-list-content-img {
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px;
}
.hy-list-content-img.highlight,
.hy-list-content-img:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.hy-list-content-text {
  display: inline-block;
  width: 78px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hy-list-content-text .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  /* 定位 */
  position: absolute;
  z-index: 1;
  left: 6px;
  bottom: 30px;
}
.hy-list-content-text:hover .hy-list-content-tip {
  visibility: visible;
}

.hy-vehicle-movement-accordian {
  width: auto;
  margin: 0 auto;
}
.hy-vehicle-movement-accordian ul {
  width: 100%;
  margin: 0;
  padding: 0;
  height:100%
}

.hy-vehicle-movement-accordian li {
  list-style: none outside none;
  display: block;
  margin: 0;
  padding: 0;
  height: 40px;
  width: 100%;
  overflow: hidden;
}

.hy-vehicle-movement-accordian li h3 {
  margin: 0;
  padding: 10px;
  height: 19px;
  color: #ddd;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  position: relative;
}

.hy-vehicle-movement-accordian li h3:before {
  content: "";
  border: 5px solid #000;
  border-color: transparent transparent transparent #ddd;
  position: absolute;
  right: 10px;
  top: 15px;
  width: 0;
  height: 0;
}

.hy-vehicle-movement-accordian .hy-vehicle-movement-item {
  display: flex;
  margin: 0;
  overflow: auto;
  padding: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.hy-vehicle-movement-accordian .hy-vehicle-movement-item > div {
  padding: 4px 14px;
  display: flex;
  flex-direction: column;
}

.hy-vehicle-movement-accordian li.active {
  height: 100%;
}
 
.hy-vehicle-movement-accordian li.active h3 {
  color: #1fffff;
}

.hy-vehicle-movement-accordian li.active h3:before {
  border-color: #ddd transparent transparent;
}
.hy-vehicle-movement-accordian li {
  -moz-transition: height 0.3s ease-in-out;
  -webkit-transition: height 0.3s ease-in-out;
  -o-transition: height 0.3s ease-in-out;
  transition: height 0.3s ease-in-out;
}

.hy-vehicle-movement-accordian .hy-vehicle-movement-item .offline{
  color:rgba(255,255,255,0.4);
}

.hy-vehicle-movement-accordian .hy-vehicle-movement-item .offline img{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}

.hy-vehicle-movement-accordian .hy-vehicle-movement-item .deplay{
  color:rgba(255,255,255,0.8);
}

.hy-vehicle-movement-accordian .hy-vehicle-movement-item .deplay img{
  opacity: 0.5;
}
.hy-vehicle-movement-accordian li h3 {
}

.hy-vehicle-movement-accordian li:hover h3 {
}
</style>
