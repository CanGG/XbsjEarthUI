/**
 * 配置存储位置
 */
class Config{

  constructor(mainUI){
    this.mainUI = mainUI;

    XE.MVVM.extend(this,{
      path:{
        planRescuePc: 'http://220.180.184.7:8711/plan/plan_rescue_pc/',
      },
      //当前单位信息
      org:{
        key_id: -1,
        name:'',
        address:'',
        lat:0,
        lng:0,
        photo_url:'',
      },
      //当前预案
      scene:{
        key_id : -1,
        type: -1,
        mode:'All',//打开模式 预案Deduce/演练Plan/调度Dispatch/全部 MainUI中设置和MainUIComp中都有用到mode
      },
    });
    this.watch();
  }

  track(){ 
    
  }

  watch(){
    // console.log(this.org.key_id)
    let that = this;
    var orgId = XE.MVVM.watch(this.org,"key_id", ()=>{
      console.log(`单位切换${this.org.key_id}`);
      window._wait("正在获取单位信息...");
      this.mainUI.hyServers.org.get(this.org.key_id).then(result=>{
        console.log(result);
        layer.msg(result.msg);
        if(result.code === 200){
          that.org.name = result.data.Equipment_Name;
          that.org.address = result.data.Equipment_Address;
          that.org.lat = result.data.Global_Positioning_latitude;
          that.org.lng = result.data.Global_Positioning_longitude;
          that.org.photo_url = result.data.Photo_Url;
        }else{

        }
        console.log(this);
        console.log(that);
      })
      this.mainUI.hyControls.loadOrgScene(this.org.key_id);
    })

    var sceneId = XE.MVVM.watch(this.scene, "key_id", () => {
      console.log(`场景切换${this.scene.key_id}`)
    });
  }

}



export default Config;