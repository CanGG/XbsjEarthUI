<template>
    <div
      v-show="showInfo"
      class="dialog"
      :style="{ left: winPos[0] - 62 + 'px', bottom: winPos[3] + 'px' }"
    >
      <div class="closeBox" title="关闭" @click="closeBoxBtn"></div>
      <div class="building_title">
        {{content.name}}
      </div>
      <div class="dialog-box1">
        <div class="dialog-top1">
          <div class="top1-left">
            <p @click="amplification('abstract')" class="top1-abstract">
              简介：<span>{{content.part_instructions}}{{content.position_des}}</span>
            </p>
            <div v-show="chemistry" class="top1-indoor">
              <span style="float:left">内有：</span>
              <span v-for="(item,i) in chemistry" @click="amplification('chemistry',i)" :key="'iiiii-'+i"  class="dialog-btn1">
                {{item.chemical_name}}
              </span>
            </div>
          </div>
          <div class="top1-right">
            <a @click="amplification('img')" title="点击查看大图">
              <img :src="content.part_img_url">
            </a>
          </div>
        </div>
      </div>

      <div v-show="content.panorama_url" class="dialog-btn">
        <div @click="amplification('live-action')" class="dialog-btn2">
          实景展示
        </div>
      </div>
      <!-- <span>{{content}}</span> -->

      <div v-show="ft_roam_show" class="ft_roam">
        <i @click="ft_roam_close" class="ft_roam_show"></i>
        <div class="fancybox-skin" v-html="ft_roam_html">

        </div>
      </div>
    </div>
</template>
<script>
export default {
  name:'hyPin',
  data() {
    return {
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      showInfo: false,
      winPos: [200, 200, 200, 200], // left top right bottom
      content: {
        name:"",
        part_instructions:"",
        position_des:"",
        part_img_url:"",
        position:[0,0,0],
        panorama_url:"",
      },
      chemistry:false,
      _pin: undefined,
      ft_roam_show: false,
      ft_roam_html: "",
      uw: undefined
    };
  },
  // 1.1 资源创建
  mounted() {
    var earth = this.$root.$earth;
    this._earth = earth;
  },
  methods: {
    fly(position) {
      const rotation = [
        5.538756509291041,
        -0.5562768563795704,
        6.280692859184528
      ];
      this._earth.camera.flyTo(position, 150, rotation);
    },

    closeBoxBtn(){
      this.destroyPin();
    },

    creatPin(content){
      
      this.content = content;
      if(content.chemistry){
        this.chemistry = content.chemistry;
      }else{
        this.chemistry = false;
      }

      if(!content.panorama_url){
        this.content["panorama_url"] = false;
      }
      
      if(content.fire_property){
        this.content["part_instructions"] = content.fire_property;
        this.content["part_img_url"] = content.img_url;
      }

      // this.content[""]
      
      let position = [content.longitude,content.latitude,content.height+5].xeptr;
    
      let earth = this._earth;
      if(this._pin!=undefined){
        this.destroyPin();
      }
      var objConfig = {
          "name": 'Pin1',
          "xbsjType": "Pin",
          "position": position,
          "show": false,
          //evalString,
      };
      var pin1 = new XE.Obj.Pin(earth);  
      pin1.xbsjFromJSON(objConfig);
      // 1.1.5 数据绑定
      XE.MVVM.track(this, "winPos", pin1, "winPos");
      // XE.MVVM.bindPosition(this, "content.position", pin1, "position");
      // 监控数据
      this.uw = XE.MVVM.watch(earth.camera, "position", () => {
        // xepd: xepositionDistance的缩写
        // pin1.position.xepd(earth.camera.position): 计算相机和pin之间的距离
        const d = pin1.position.xepd(earth.camera.position);
        if(this._pin){
          if (d < 10||d > 500) {
            this.showInfo = false;
          } else {
            this.showInfo = true;
          }
        }
        
      });

      pin1.disposers.push(() => {
            XE.MVVM.track(this, "winPos", pin1, "winPos");
      });
      // pin1.disposers.push(() => {
      //       XE.MVVM.bindPosition(this, "content.position", pin1, "position");
      // });
      pin1.disposers.push(() => {
            this.uw;
      });

      this._pin = pin1;
      
      this.showInfo = true;

      this.fly(position);
      
    },

    //清除信息框
    destroyPin(){
      this.showInfo = false;
      this._pin = this._pin && this._pin.destroy();
    },

    amplification(kind,i=0){
      let content = this.content;
      this.ft_roam_show = true;
      switch(kind){
        case "img":
          this.ft_roam_html = `<img src="${content.part_img_url}">`; 
          break;
        case "abstract":
          this.ft_roam_html = `
          <h2 style="text-align:center;margin-bottom:15px">${content.name}</h2>
          <p>简介：${content.part_instructions}</p>
          <p style="margin-top:10px">消防描述：${content.position_des}</p>
          `;
          break;
        case "live-action":
          this.ft_roam_html = `<iframe allowtransparency="true" width="100%" height="618px" frameborder="no" scrolling="no" src="${content.panorama_url}"></iframe>`;
          break;
        case "chemistry":
          this.ft_roam_html = this.chemistry[i].html
          break;
      }
    },

    ft_roam_close(){
      this.ft_roam_show = false;
      this.ft_roam_html = ``;
    }
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    }
  },
  // 1.2 资源销毁
  beforeDestroy() {
    // vue程序销毁时，需要清理相关资源
    this._earth = this._earth && this._earth.destroy();
  }
};
</script>

<style>

.dialog {
  position: fixed;
  width: 305px;
  height: auto;
  color: white;
  background-color: black;
  /* background-image: url("./dialog.png");
  background-size: 100% 100%; */
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  text-align: left;
}

.dialog::after{
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  bottom: -26px;
  left: 40px;
  border-top: 13px solid black;
  border-left: 13px solid rgba(1, 1, 1, 0);
  border-right: 13px solid rgba(1, 1, 1, 0);
  border-bottom: 13px solid rgba(1, 1, 1, 0);
}

.closeBox{
  cursor: pointer;
  background: url("close-btn-popup.png") no-repeat;
  background-size: 100% 100%;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 13px;
  width: 15px;
}

.building_title{
  width: 295px;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.dialog-box1{
  width: 305px;
  overflow: hidden;
  position: relative;
}

.dialog-top1{
  overflow: hidden;
  border-bottom: 1px solid white;
}

.top1-left{
  float: left;
  width: 190px;
  min-height: 90px;
}

.dialog .top1-abstract{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 10px;
  height: 32px;
  line-height: 32px;
  margin: 0;
}

.top1-indoor{
  padding: 3px 10px;
  line-height: 24px;

}

.top1-right{
  width: 114px;
  top: 0;
  right: 0;
  bottom: 0;
  
  border-left: 1px solid white;
  position: absolute;
  height: 100%;
}

.top1-right>a{
  display: block;
  width: 86px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -40px 0 0 -43px;
  text-decoration: none;
}

.top1-right>a img{
  width: 100%;
  height: 100%;
}

.dialog-btn{
  height: 31px;
  overflow: hidden;
  margin: 10px 0;
}
.dialog-btn2{
  width: 110px;
  height: 100%;
  float: left;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 27px;
  letter-spacing: 1px;
  cursor: pointer;
  background: url("dialog-btn.png");
  background-position: 0 -55px;
}
.dialog-btn1{
  padding: 0 7px;
  float: left;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 27px;
  letter-spacing: 1px;
  border: white solid 1px;
  cursor: pointer;
  background-image: radial-gradient(#feac3c, #fec177);
  border-radius: 5px;
  margin-right: 6px;
  margin-bottom: 6px;
}
.ft_roam{ 
    width: 920px;
    /* height: 578.4px; */
    min-height: 618px;
    height: auto;
    position: fixed;
    top: calc(50% - 309px);
    left: calc(50% - 460px);
    border: 3px solid rgb(253, 249, 249);
    background: rgb(255, 255, 255);
    z-index: 9999;
    
}
.ft_roam_show{
    display: block;
    width: 35px;
    height: 35px;
    background: url(gb.png) no-repeat;
    position: absolute;
    right: -15px;
    top: -15px;
    cursor: pointer;
}
.fancybox-skin{
  padding: 15px;
  width: auto;
  height: 618px;
  color: black;
  font-size: 15px;
  overflow-y: auto;
}
.fancybox-skin>img,.fancybox-skin>iframe{
  width: 100%;
  height: 100%;
  min-width: 100%;
  max-height: 100%;
}
</style>