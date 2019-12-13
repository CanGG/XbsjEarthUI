// author 谢灿
// date 2019年12月9日
// description 消防车模型列表弹窗
<template>
  <Window
    :footervisible="true"
    @cancel="show=false"
    @ok="ok"
    v-show="show"
    :floatright="true"
    :width="463"
    :minWidth="202"
    :height="500"
    :left="5"
    :top="138"
    :title="lang.title"
    class="hy-firefightingengine"
  >
    <!-- 窗体内容区域 -->
    <div class="hy-content">
      <!-- 车辆类型列表 -->
      <div class="hy-list" v-for="(engine) in engines" :key="engine.code">
        <!-- 车辆类型名称 -->
        <div class="hy-list-title">{{engine.name}}</div>
        <!-- 车辆类型下的车辆列表 -->
        <ul class="hy-list-contents">
          <!-- 一个车辆 单击后进行模型创建操作 -->
          <li
            v-for="vehicle in engine.vehicles"
            :key="vehicle.code"
            @click="createVehicle(vehicle)"
          >
            <!-- 模型的缩略图 大小为64*64px 存放在apps/assets/3d/中-->
            <div class="hy-list-content-img">
              <img style="width:64px;height:64px;" :src="vehicle.imgSrc" alt />
            </div>
            <!-- 模型的文字说明 -->
            <div class="hy-list-content-text">
              <!-- 模型的文字说明, 超过长度隐藏 -->
              {{vehicle.name}}
              <!-- 模型的文字说明(tip) 选中文字时弹出的部分 -->
              <span class="hy-list-content-tip">{{vehicle.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Window>
</template>

<script>
import languagejs from "./index_locale";
import HyCustomPrimitiveCircle from "../../utils/hyPlugins/custom_primitive_circle";
import HyLabel from "../../utils/hyPlugins/label";
export default {
  props: {
    getBind: Function
  },
  components: {
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      //存放消防车数据 格式如下:[{
      // name: "分类名称",
      // code: "分类编号",
      // vehicles: [//车辆列表
      //   {
      //     name: "车辆名称",
      //     code: "车辆编码",
      //     scope: "作战范围",
      //     coord: "坐标",
      //     parameters:{//作战参数
      //        agentia:[{
      //          capacity: "容量",
      //          surplus: "剩余量",
      //          type: "类型",
      //        }]
      //     },
      //     driver:{//驾驶员信息
      //        name:驾驶员名称,
      //        phone:驾驶员联系方式,
      //        code:驾驶员编码,
      //     },
      //     imgSrc: "缩略图地址",
      //     glbSrc: "模型地址"
      //   }]
      // }]
      engines: [],
      lang: {},
      langs: languagejs
    };
  },
  created() {},
  mounted() {
    this._disposers = this._disposers || [];
    var czmObj = this.getBind();
    if (czmObj) {
      this._czmObj = czmObj;
    }else{
      return;
    }

    //页面加载完成后获取车辆数据
    {
      this.engines = this.getEngines();
    }
    //显示窗体
    this.show = true;
  },
  methods: {
    //关闭事件
    close() {
      this.$parent.destroyTool(this);
    },
    //确定事件
    ok() {
      
      this.close();
    },
    //获取模型
    //author 谢灿
    createVehicle(vehicle) {
      let Model = vehicle.czmObj;
      if(Model){
        Model.flyTo();
        // Model.positionEditing = true;
      }else{
        this.createModel(vehicle);
      }
    },
    //创建模型本体
    createModel(vehicle){
      var Model = new XE.Obj.Model(this._czmObj.earth);
      console.log(Model.guid);
      Model.url = vehicle.glbSrc;
      Model.code = vehicle.code;
      Model.creating = true;
      Model.isCreating = true;
      Model.name = vehicle.name;  

      Model.HyCustomPrimitiveCircle = HyCustomPrimitiveCircle;
      Model.HyLabel = HyLabel;


      let driverMsg = vehicle.name+'\\n驾驶员名:'+vehicle.driver.name+'\\n联系方式:'+vehicle.driver.phone+'\\n编号:'+vehicle.driver.code;
      let agentiaMsg = '容量:'+vehicle.driver.name+'\\n剩余量:'+vehicle.driver.phone+'\\n:'+vehicle.driver.code;
      //Model初始化时执行的js代码
      Model.evalString = `
      //实例一个自定义图元-圆为作战半径
      let scopeCircle = new p.HyCustomPrimitiveCircle(p,'作战半径动画');

      setTimeout(function(){
        let viewer = p._earth.czm.viewer;
        //画出作战范围
        scopeCircle.drawScan(`+vehicle.scope+`);

        //显示坐标信息
        let positionLabelConfig = {
          model: p
        };
        let positionLabel = new p.HyLabel(positionLabelConfig);

        //显示驾驶员信息
        let driverLabelConfig = {
          model: p,
          offset:[0,-75],
          textFnc:()=> {return '`+driverMsg+`';}
        }
        let driverLabel = new p.HyLabel(driverLabelConfig);
        
        //显示药剂剩余量
        // let 
      },0);
      `;
      Model.disposers.push(() => { 
        console.log(3);
      });
      console.log(Model);
      Model.onclick = (e)=>{
        this.$root.$earthUI.showPropertyWindow({name:vehicle.name+'的属性'},{component:'HyPropertyWindow'});
      }
      vehicle.czmObj = Model;
    },
    testset(){
     console.log("测试") 
    },
    //获取消防车列表 目前返回的是测试数据后期需要对接数据库
    getEngines() {
      //车辆列表
      //   {
      //     name: "车辆名称",
      //     code: "车辆编码",
      //     scope: "作战范围(米)",
      //     coord: "坐标",
      //     parameters:{//作战参数
      //        agentia:[{//药剂
      //          capacity: "容量",
      //          surplus: "剩余量",
      //          type: "类型",
      //        }]
      //     },
      //     driver:{//驾驶员信息
      //        name:驾驶员名称,
      //        phone:驾驶员联系方式,
      //        code:驾驶员编码,
      //     },
      //     imgSrc: "缩略图地址",
      //     glbSrc: "模型地址"
      //   }]
      return [
        {
          name: "三项射流类",
          code: "A",
          vehicles: [
            {
              name: "蓝立方",
              code: "blue1",
              imgSrc: "../assets/3d/blue.png",
              glbSrc: "../assets/3d/blue.glb",
              scope: 100,
              coord:[0,0,0],
              parameters:{
                agentia:[{
                  capacity:1000,
                  surplus: 800,
                  type: '水'
                }]
              },
              driver: {
                name:'王强',
                phone: '13578787878',
                code: '0000001'
              }
            },
            {
              name: "消防车",
              code: "fire_trunk",
              imgSrc: "../assets/3d/fire_trunk.png",
              glbSrc: "../assets/3d/fire_trunk.glb",
              scope: 50,
              coord:[0,0,0],
              parameters:{
                agentia:[{
                  capacity:1000,
                  surplus: 800,
                  type: '水'
                }]
              },
              driver: {
                name:'王强',
                phone: '13578787878',
                code: '0000001'
              }
            },
            {
              name: "消防车简",
              code: "fire_trunk_base",
              imgSrc: "../assets/3d/fire_trunk_base.png",
              glbSrc: "../assets/3d/fire_trunk_base.glb",
              scope: 200,
              coord:[0,0,0],
              parameters:{
                agentia:[{
                  capacity:1000,
                  surplus: 800,
                  type: '水'
                }]
              },
              driver: {
                name:'王强',
                phone: '13578787878',
                code: '0000001'
              }
            }
          ]
        },
        {
          name: "大流量供水灭火系统",
          code: "B",
          vehicles: []
        },
        {
          name: "涡喷消防车类",
          code: "C",
          vehicles: []
        },
        {
          name: "水罐泡沫消防车",
          code: "D",
          vehicles: []
        },
        {
          name: "洗消消防车类",
          code: "E",
          vehicles: []
        },
        {
          name: "氮气消防车",
          code: "F",
          vehicles: []
        },
        {
          name: "供液车类",
          code: "G",
          vehicles: []
        },
        {
          name: "干粉消防车类",
          code: "H",
          vehicles: []
        },
        {
          name: "干粉泡沫联用车",
          code: "I",
          vehicles: []
        },
        {
          name: "居高类消防车类",
          code: "J",
          vehicles: []
        },
        {
          name: "排烟车类",
          code: "K",
          vehicles: []
        },
        {
          name: "抢险救援类",
          code: "L",
          vehicles: []
        },
        {
          name: "宣传消防车类",
          code: "M",
          vehicles: []
        },
        {
          name: "通信消防车类",
          code: "N",
          vehicles: []
        },
        {
          name: "压缩空气泡沫车类",
          code: "O",
          vehicles: []
        },
        {
          name: "曼模块消防车累",
          code: "P",
          vehicles: []
        },
        {
          name: "照明消防车类",
          code: "Q",
          vehicles: []
        }
      ];
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
  watch: {}
};
</script>

<style scoped>
.hy-firefightingengine {
  min-width: 462px;
}
.hy-list {
  padding: 5px 5px 0 5px;
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
  width: 64px;
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
</style>
