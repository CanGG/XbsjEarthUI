<template>
  <div class="xbsj-nav" @click="hidePopup" v-show="show" @mouseleave="leavePageHy()">
    <ul class="xbsj-title-ul">
      <!-- Hy菜单 
      <li
        @click="switchPageHy('hytileset')"
        :class="{'xbsj-title-item-on':page=='hytileset'}"
      >{{lang.hytileset}}      
      </li>-->
      <li v-show="false"
        @mouseenter="enterPageHy('hydeduce')"
        @click="switchPageHy('hydeduce')"
        :class="{'xbsj-title-item-on':page=='hydeduce'}"
      >{{lang.hydeduce}}</li>
      <!-- <li
        @mouseenter="enterPageHy('hyplan')"
        @click="switchPageHy('hyplan')"
        :class="{'xbsj-title-item-on':page=='hyplan'}"
      >{{lang.hyplan}}</li> -->
      <li
        @mouseenter="enterPageHy('hydispatch')"
        @click="switchPageHy('hydispatch')"
        :class="{'xbsj-title-item-on':page=='hydispatch'}"
      >{{lang.hydispatch}}</li> 

      <!-- Xbsj菜单 -->
      <li
      v-show="false"
        @mouseenter="enterPageHy('navigate')"
        @click="switchPageHy('navigate')"
        :class="{'xbsj-title-item-on':page=='navigate'}"
      >{{lang.roam}}</li>
      <li 
     
        @mouseenter="enterPageHy('view')"
        @click="switchPageHy('view')" 
        :class="{'xbsj-title-item-on':page=='view'}"
        >{{lang.view}}</li>
      <li
      v-show="false"
        @mouseenter="enterPageHy('imagery')"
        @click="switchPageHy('imagery')"
        :class="{'xbsj-title-item-on':page=='imagery'}"
      >{{lang.images}}</li>
      <li 
      v-show="false"
      @mouseenter="enterPageHy('model')"
        @click="switchPageHy('model')" 
        :class="{'xbsj-title-item-on':page=='model'}"
        >{{lang.model}}</li>
      <li
      @mouseenter="enterPageHy('terrain')"
        @click="switchPageHy('terrain')"
        :class="{'xbsj-title-item-on':page=='terrain'}"
      >{{lang.terrain}}</li>
      <li
      @mouseenter="enterPageHy('analysis')"
        @click="switchPageHy('analysis')"
        :class="{'xbsj-title-item-on':page=='analysis'}"
      >{{lang.analysis}}</li>
      <li
      @mouseenter="enterPageHy('effect')"
        @click="switchPageHy('effect')"
        :class="{'xbsj-title-item-on':page=='effect'}"
      >{{lang.effect}}</li>

      <li
      @mouseenter="enterPageHy('entity')"
        @click="switchPageHy('entity')"
        :class="{'xbsj-title-item-on':page=='entity'}"
      >{{lang.plotting}}</li>

      <li v-show="false" @mouseenter="enterPageHy('other')" @click="switchPageHy('other')" :class="{'xbsj-title-item-on':page=='other'}">{{lang.other}}</li>
      <!-- <li @click="openmodel">测试model对话框</li> -->
    </ul>

    <!-- <Modal :visible="visible" @cancel="cancelmodal" @confirm="confirm">
      <p>我是想要提示的内容</p>
        <p>我是想要提示的内容</p>
          <p>我是想要提示的内容</p>  
    </Modal>-->
    <!-- 七大组件部分 -->
    <div >
      <NavigateComp ref="navigate" v-show="page=='navigate'" :labServiceUI="labServiceUI"></NavigateComp>
      <XbsjViewComp ref="view" v-show="page=='view'"></XbsjViewComp>
      <ImageryComp
        ref="imagery"
        v-show="page=='imagery'"
        :cloudServiceUI="cloudServiceUI"
        :labServiceUI="labServiceUI"
      ></ImageryComp>
      <TilesetComp
        ref="model"
        v-show="page=='model'"
        :cloudServiceUI="cloudServiceUI"
        :labServiceUI="labServiceUI"
      ></TilesetComp>
      <TerrainComp
        ref="terrain"
        v-show="page=='terrain'"
        :cloudServiceUI="cloudServiceUI"
        :labServiceUI="labServiceUI"
      ></TerrainComp>
      <AnalysisComp ref="analysis" v-show="page=='analysis'"></AnalysisComp>
      <EffectComp ref="effect" v-show="page=='effect'"></EffectComp>
      <EntityComp ref="entity" v-show="page=='entity'"></EntityComp>
      <OtherComp ref="other" v-show="page=='other'"></OtherComp>
      <!-- 自定义组件 -->
      <HyTileset ref="hytileset" v-show="page=='hytileset'"></HyTileset>
      <HyDeduceComp ref="hydeduce" v-show="page=='hydeduce'"></HyDeduceComp>
      <HyPlanComp ref="hyplan" v-show="page=='hyplan'"></HyPlanComp>
      <HyDispatchComp ref="hydispatch" v-show="page=='hydispatch'"></HyDispatchComp>
    </div>
  </div>
</template>

<script>
import NavigateComp from "./Navigate";
import XbsjViewComp from "./View";
import ImageryComp from "./Imagery";
import TilesetComp from "./Tileset";
import TerrainComp from "./Terrain";
import AnalysisComp from "./Analysis";
import EffectComp from "./Effect";
import EntityComp from "./Entity";
import OtherComp from "./Other";
import languagejs from "./index_locale";

//后羿tab页
import HyTileset from "./HyTileset"; //厂区
import HyDeduceComp from "./HyDeduce"; //推演
import HyPlanComp from "./HyPlan"; //预案
import HyDispatchComp from "./HyDispatch"; //调度

export default {
  components: {
    NavigateComp,
    XbsjViewComp,
    ImageryComp,
    TilesetComp,
    TerrainComp,
    AnalysisComp,
    EffectComp,
    EntityComp,
    OtherComp,
    HyTileset,
    HyDeduceComp,
    HyPlanComp,
    HyDispatchComp
  },
  data: function() {
    return {
      show: true,
      page: "hydispatch", //当前显示的页面
      lastPage: "hydispatch",
      lang: {},
      visible: false,
      labServiceUI: true,
      cloudServiceUI: false,
      langs: languagejs
    };
  },
  created() {},
  mounted() {
    var search = window.location.search;
    var labserver = this.getSearchString("labserver", search);
    if (labserver !== undefined) {
      this.$root.$labServer.server = labserver;
    }

    this.page = "hydispatch";
  },
  methods: {
    //key(需要检索的键） url(传入的需要分割的url地址)
    getSearchString(key, Url) {
      var str = Url;
      str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
      // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
      var arr = str.split("&");
      var obj = new Object();
      // 将每一个数组元素以=分隔并赋给obj对象
      for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
      }
      return obj[key];
    },
    openmodel() {
      this.$root.$earthUI.confirm(
        "xxxx",
        () => {},
        () => {}
      );
    },
    cancelmodal() {
      this.visible = false;
    },
    confirm() {
      alert("我点击了确定");
      this.visible = false;
    },
    hidePopup(event) {},
    //鼠标移入菜单按钮, 显示该菜单, 并且记录当前菜单
    enterPageHy(page) {
      // console.log('enter')
      this.page = page;
    },
    //鼠标移除菜单按钮, 显示原来的菜单
    //如果移除时的page 和 this.lastpage 相同则
    leavePageHy(page) {
      // console.log('leave')
      this.page = this.lastPage;
    },
    switchPageHy(page) {
      // this.$emit("hidePopup");
      //控制组件显示隐藏
      //当点击时 lastPage 存在, 则切换 lastPage为点击的page
      //当lastPage 等于 点击的page时,隐藏该page
      if (this.lastPage == this.page) {
        if (this.lastPage == "") {
          this.lastPage = page;
          this.page = this.lastPage;
        } else {
          this.lastPage = "";
          this.page = "";
        }
      } else {
        this.lastPage = page;
      }
    },
    switchPage(page) {
      // this.$emit("hidePopup");
      //控制组件显示隐藏
      if (this.page == page) {
        this.page = "";
      } else {
        this.page = page;
      }
    },
    showPage(page) {
      // this.$emit("hidePopup");
      this.page = page;
    },
    getSize() {
      //获取当前组件的大小
      return {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };
    }
  }
};
</script>

<style>
.xbsj-nav {
  z-index: 9999;
  position: relative;
}
/* .xbsj-template {
  width: 100%;
  height: 96px;
  background: rgba(107, 107, 107, 1);
} */
.xbsj-title-ul {
  margin: 0;
  padding: 0;
  width: 100%;
  background: #474747;
  height: 41px;
  min-width: 656px;
}
.xbsj-title-ul li {
  float: left;
  padding: 10px 20px;
  list-style: none;
  font-size: 14px;
  /* border: 1px solid; */
  cursor: pointer;
}
.xbsj-title-ul li:hover {
  background: #6b6b6b;
}
.xbsj-title-item-on {
  background: #6b6b6b;
}
</style>

