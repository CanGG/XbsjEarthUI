<template>
  <Window
    :width="490"
    :minWidth="490"
    :height="370"
    :floatright="true"
    :title="lang.title"
    @cancel="cancel"
    @ok="ok"
    :footervisible="true"
    @showclick="showSelect=false"
  >
    <div class="xbsj-flatten">

    <ul class="flexul" :class="showContent ? 'contentUl' : ''">
      <li >
        <div class="backimg highlight">
          <img style="width:64;height:64px" src="" alt />
        </div>
        <div class="onlinTerrainName">
          测试1
          <span class="onlineTerrainToolTip">测试1Tip</span>
        </div>
      </li>
      <li >
        <div class="backimg">
          <img style="width:64;height:64px" src="" alt />
        </div>
        <div class="onlinTerrainName">
          测试2
          <span class="onlineTerrainToolTip">测试2Tip</span>
        </div>
      </li>
      <!-- <li v-for="s in services" @click="select(s)" :key="s.url">
        <div :class="[{highlight:selected == s} ]" class="backimg">
          <img style="width:64px;height:64px;" :src="s.thumbnail" alt />
        </div>-->
        <!-- <span>{{s.name}}</span> -->
        <!--<div class="onlinTerrainName">
          {{s.cnname}}
          <span class="onlineTerrainToolTip">{{s.cnname}}</span>
        </div>
      </li> -->
    </ul>
    </div>
  </Window>
</template>

<script>
import { copyobj } from "../../utils/tools";
import languagejs from "./index_locale";

export default {
  props: {
    getBind: Function
  },
  data() {
    return {
      lang: {},
      showContent:true,
      isCreating:false,
      makiIconObj: {},
      model: {
        name: "",
        show: true,
        editing: false,
        creating: false,
        enabled: true,
      },
      pinstyletype: true,
      langs: languagejs,
    };
  },
  created() {},
  mounted() {
    // 数据关联
    this._disposers = this._disposers || [];
    var czmObj = this.getBind();
    console.log(czmObj);

    if (czmObj) {
      this._czmObj = czmObj;
      //数据关联, key为传参, value 为本模板 data
      const bindData = {
        name: "model.name",
        show: "model.show",
        enabled: "model.enabled"
      };

      Object.entries(bindData).forEach(([sm, vm]) => {
        if (typeof vm === "string") {
          this._disposers.push(XE.MVVM.bind(this, vm, czmObj, sm));
        } else {
          this._disposers.push(vm.handler(this, vm.prop, czmObj, sm));
        }
      });
    }
  },
  beforeDestroy() {
    this._polygonDisposers = this._polygonDisposers && this._polygonDisposers();
    this._disposers = this._disposers && this._disposers();
  },
  computed: {
    name() {
      return this.model.name;
    },
    guid() {
      return this.getBind().guid;
    },
    maxcurrentTime() {
      return Number(this.model.timeDuration);
    }
  },
  watch: {
  },
  methods: {
    select(model) {
      // this.selected = service;
      // // console.log(service);
      // //因为界面可能修改这个值，所以需要单独一个变量
      // this.selectedUrl = this.selected.url;
      // this.requireValue = "";
      // this.error = "";
      // this.showContent = false;
      // if (service.supportNormal === true) {
      //   this.showContent = true;
      // }
    },
    close() {
      this.$parent.destroyTool(this);
    },
    cancel() {
      this.close();
      const modelToolObj = this._czmObj;
      if (!modelToolObj) {
        return;
      }
      modelToolObj.positionEditing = false;
      if (modelToolObj.isCreating) {
        modelToolObj.isCreating = false;
        modelToolObj.destroy();
      }
    },
    ok() {
      this.close();
      const modelToolObj = this._czmObj;
      modelToolObj.editing = false;
      if (!modelToolObj) {
        return;
      }
      modelToolObj.positionEditing = false;
      if (modelToolObj.isCreating) {
        modelToolObj.isCreating = false;
        const sceneObject = new XE.SceneTree.Leaf(modelToolObj);
        this.$root.$earth.sceneTree.addSceneObject(sceneObject);
      }
    },

    flyto() {
      this._czmObj.flyTo();
    },
    reset() {
      this.model.xbsjRotation = [0, 0, 0];
    }
  },
  beforeDestroy() {
    //销毁监控
    // this.disAutorun();
  }
};
</script>

<style scoped>
.xbsj-onlineTerrain .google_image {
  background: url("../../../images/services/google_image.jpg") !important;
}
.xbsj-onlineTerrain .google_map {
  background: url("../../../images/services/google_map.png") !important;
}
.xbsj-onlineTerrain .error {
  color: red;
}
.xbsj-onlineTerrain .flexul {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 48px);
}
.xbsj-onlineTerrain .contentUl {
  overflow-x: hidden;
  height: calc(100% - 104px);
}
.xbsj-onlineTerrain .flexul li {
  list-style: none;
  /* float: left; */
  position: relative;
  height: 102px;
}
.xbsj-onlineTerrain .backimg {
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px;
}
.xbsj-onlineTerrain .backimg.highlight,
.xbsj-onlineTerrain .backimg:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.xbsj-onlineTerrain .onlineTerrainDiv {
  margin: 10px 10px;
}
.xbsj-onlineTerrain .onlineTerrainDiv > label {
  display: inline-block;
  width: 52px;
  text-align: right;
  margin-right: 15px;
}
.xbsj-onlineTerrain .onlineTerrainDiv > input {
  width: calc(100% - 81px);
  height: 28px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  border: none;
  color: #ffffff;
  padding: 0 5px;
}
.xbsj-onlineTerrain .flexul li .onlinTerrainName {
  display: inline-block;
  width: 64px;
  text-align: center;
  margin-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xbsj-onlineTerrain .flexul li .onlinTerrainName .onlineTerrainToolTip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  /* 定位 */
  position: absolute;
  z-index: 1;
  left: 11px;
  bottom: 30px;
}
.xbsj-onlineTerrain .flexul li .onlinTerrainName:hover .onlineTerrainToolTip {
  visibility: visible;
}
.xbsj-onlineTerrain .onlineTerrainDiv .inputcheck {
  display: inline-block;
  width: 15px;
  height: 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  background: url(../../../images/check.png) no-repeat top center;
  background-size: 100% 100%;
  cursor: pointer;
  vertical-align: middle;
  border-radius: 0%;
}
.xbsj-onlineTerrain .onlineTerrainDiv input:checked {
  position: relative;
  background: url(../../../images/check_on.png) no-repeat top center;
  background-size: 100% 100%;
}
</style>