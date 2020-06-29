<template>
  <Window
    :footervisible="true"
    @ok="ok"
    @cancel="show=false"
    v-show="show"
    :height="420"
    :width="500"
    :minWidth="202"
    :left="500"
    :top="250"
    :title="lang.title"
    class="xbsj-onlineModel"
  >
    <div class="onlineModelDiv">
      <label>{{lang.address}}:</label>
      <input v-model="selectedUrl" readonly/>
    </div>
    <div v-if="selected!=null">
      <div v-show="selected.requireField" class="onlineModelDiv">
        <label>{{selected.requireField }}:</label>
        <input v-model="requireValue" />
      </div>
    </div>
    <ul class="flexul" :class="showContent ? 'contentUl' : ''">
      <li v-for="s in services" @click="select(s)" @dblclick="selectAndOk(s)" :key="'org_'+s._id">
        <div :class="[s.cls,{highlight:selected == s} ]" class="backimg">
            <img style="width:64px;height:64px;" :src="s.thumbnail" alt="">
        </div>
        <!-- <span>{{s.name}}</span> -->
        <div class="onlinModelName">
          {{s.cnname}}
          <span class="onlineModelToolTip">{{s.cnname}}</span>
        </div>
      </li>
    </ul>
  </Window>
</template>

<script>
import languagejs from "./model_locale";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      show: false,
      error: "",
      selected: null,
      requireValue: "",
      selectedUrl: "",
      showContent: false,
      lang: {},
      services: [],
      langs: languagejs
    };
  },
  created() {
    this.getonlineinfo();
  },
  watch: {
    show(){
       this.getonlineinfo();
    }
  },
  methods: {
    getonlineinfo(){
      var labServer = this.$root.$labServer;
      let url = labServer.serverOnline + "api/onlineResouces/model";
      
      axios
        .get(url,{ 
              params: {  
                desc:false
              }})
        .then(res => {
          if (res.data.status === "ok") {
            res.data.result;
            let result = [{
              "_id": "121",
              "dataType": "model",
              "cnname": "121厂区",
              "enname": "xiaogongchang",
              "url": "https://lab.earthsdk.com/model/e8be1340062c11eaae02359b3e5d0653/tileset.json",
              "thumbnail": "https://lab2.cesiumlab.com/upload/e6827796-398c-4dbb-99e3-457f4953bdf2\\2019_11_13_23_51_34.png",
              "date": "2019-11-13 23:52:30"
            }];
            this.services = result;
            
          }
          console.log(this.services);
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(service) {
      this.selected = service;
      //因为界面可能修改这个值，所以需要单独一个变量
      this.selectedUrl = this.selected.cnname;
      this.requireValue = "";
      this.error = "";
      this.showContent = true;
      
    },
    selectAndOk(service){
      this.select(service);
      this.ok();
      //跳到编制
      this.$root.$refs.mainUI.$refs.mainBarControl.switchPageHy('hydeduce');
    },
    ok() {
      if (this.selectedUrl == "") {
        //提示需要弹出url
        this.error = this.lang.selectinput;
        this.$root.$earthUI.promptInfo(this.error, "error");
      } else {
        //构造 tileset
        // const tileset = new XE.Obj.Tileset(this.$root.$earth);
        this.show = false;
        this.error = "";
      }

      if(this.selected){
        this.$root.$hyControls.orgID = this.selected._id;
        this.$root.$hyControls.loadOrgScene();
      }
    }
  },
  computed: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  }
};
</script>

<style scoped>
.xbsj-onlineModel .google_image {
  background: url("../../../images/services/google_image.jpg") !important;
}
.xbsj-onlineModel .google_map {
  background: url("../../../images/services/google_map.png") !important;
}
.xbsj-onlineModel .error {
  color: red;
}
.xbsj-onlineModel .flexul {
  /* display: flex;
  flex-wrap: wrap; */
  cursor: pointer;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 48px);
}
.xbsj-onlineModel .contentUl {
  overflow-x: hidden;
  height: calc(100% - 48px);
}
.xbsj-onlineModel .flexul li {
  list-style: none;
  float: left;
  position: relative;
}
.xbsj-onlineModel .backimg {
  width: 64px;
  height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px;
}
.xbsj-onlineModel .backimg.highlight,
.xbsj-onlineModel .backimg:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.xbsj-onlineModel .onlineModelDiv {
  margin: 10px 10px;
}
.xbsj-onlineModel .onlineModelDiv > label {
  display: inline-block;
  width: 82px;
  text-align: right;
  margin-right: 15px;
}
.xbsj-onlineModel .onlineModelDiv > input {
  width: calc(100% - 111px);
  height: 28px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  border: none;
  color: #ffffff;
  padding: 0 5px;
}
.xbsj-onlineModel .flexul li .onlinModelName {
  display: inline-block;
  width: 64px;
  text-align: center;
  margin-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xbsj-onlineModel .flexul li .onlinModelName .onlineModelToolTip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  /* 定位 */
  position: absolute;
  z-index: 1;
  left: 10px;
  bottom: 30px;
}
.xbsj-onlineModel .flexul li .onlinModelName:hover .onlineModelToolTip {
  visibility: visible;
}
</style>
