// author 谢灿
// date 2020年6月13日
// description 车辆视频跟踪
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatright="true"
      :width="360"
      :height="325"
      :top="138"
      :title="'演练-演练评估-车辆视频跟踪'"
      class="hy-mainwindow"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-vehicle-control">
          <!--
          <div class="hy-camera-control">
            <p class="hy-title">镜头控制</p>
            <img src="../../../images/anniu.png"> 
          </div>
          -->
          <div class="hy-vehicle-networking">
            <p class="hy-title">车辆列表</p>
            <div id="vehicle-tree" class="demo-tree"></div>
          </div>
        </div>
        <div class="hy-vehicle">
          <p class="hy-title">车辆视频</p>
          <div class="hy-vehicle-win-4">视频1</div>
          <div class="hy-vehicle-win-4">视频2</div>
          <div class="hy-vehicle-win-4">视频3</div>
          <div class="hy-vehicle-win-4">视频4</div>
        </div>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";

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
      clsState: {
        "0": "normal",
        "1": "offline",
        "2": "deplay"
      },
      data: [],
      lang: {},
      langs: languagejs
    };
  },
  created() {
    var element = layui.element;
    var layer = layui.layer;
    var tree = layui.tree;
    //监听折叠
    element.on("collapse(test)", function(data) {
      layer.msg("展开状态：" + data.show);
    });

    tree.render({
      elem: "#vehicle-tree", //绑定元素
      data: [
        {
          title: "江西", //一级菜单
          children: [
            {
              title: "南昌", //二级菜单
              children: [
                {
                  title: "高新区" //三级菜单
                  //…… //以此类推，可无限层级
                }
              ]
            }
          ]
        },
        {
          title: "陕西", //一级菜单
          children: [
            {
              title: "西安" //二级菜单
            }
          ]
        }
      ]
    });
    //树
    //   tree.render({
    //   elem: '#vehicle-tree'
    //   ,data: [{
    //     title: '优秀'
    //     ,children: [{
    //       title: '80 ~ 90'
    //     },{
    //       title: '90 ~ 100'
    //     }]
    //   },{
    //     title: '良好'
    //     ,children: [{
    //       title: '70 ~ 80'
    //     },{
    //       title: '60 ~ 70'
    //     }]
    //   },{
    //     title: '要努力奥'
    //     ,children: [{
    //       title: '0 ~ 60'
    //     }]
    //   }]
    //   ,accordion: true
    // });
  },
  mounted() {
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    this.treeInit();
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
    treeInit() {
      var tree = layui.tree;
      //渲染
      var inst1 = tree.render({
        elem: "#vehicle-tree", //绑定元素 
        showLine: false,  //是否开启连接线
        data: [
          {
            title: "滁州市", //一级菜单
            children: [
              {
                title: "定远县", //二级菜单
                children: [
                  {
                    title: "定远路桥专职消防队", //三级菜单
                    //…… //以此类推，可无限层级
                    children: [
                      {
                        title: "消防车1" //三级菜单
                        //…… //以此类推，可无限层级
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "滁州市消防支队", //一级菜单
            children: [
              {
                title: "琅琊中队" //二级菜单
              }
            ]
          }
        ]
      });
    },
    getStateCn() {
      return FakeData.stateCN;
    },
    getData() {
      return FakeData.data;
    },
    choice(team) {
      // console.log(team.choice);
      if (team.choice === undefined) {
        // console.log(1);
        this.$set(team, "choice", true);
      } else {
        // console.log(2);
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
      // console.log(v);
    }
  }
};
</script>

<style scoped>
.hy-mainwindow {
  display: flex;
  flex-direction: column;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.hy-content {
  height: 100%;
  display: flex;
}
.hy-vehicle {
  float: left;
  display: flex;
  border: 1px solid;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  height: 100%;
  flex: 1;
}
.hy-vehicle-win-4 {
  width: 50%;
  border-top: 1px solid;
  border-left: 1px solid;
  box-sizing: border-box;
}
.hy-vehicle-control {
  min-width: 150px;
  max-width:150px;
  overflow: auto;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
  border-right: 0px;
}
.hy-camera-control {
  min-width: 150px;
  overflow: auto;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
  border-right: 0px;
}
.hy-camera-control img {
  width: 100%;
}
.hy-vehicle-networking {
  width: 100%;
}
.hy-title {
  color: white;
  border-bottom: 1px solid white;
  width: 100%;
  /* height: 19px; */
  box-sizing: border-box;
  /* line-height: 19px; */
  height: 20px;
}
#vehicle-tree {
  width: 100%;
  height: 100%;
}
</style>
