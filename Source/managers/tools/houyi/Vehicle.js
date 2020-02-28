import HyCustomPrimitiveCircle from "@hyPlugins/custom_primitive_circle";
import HyLabel from "@hyPlugins/label";

/**
 * @author 谢灿
 * @date 2020年1月7日
 * @description 自制Vehicle模型类
 * @extends XE.Obj.Model
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 */
class Vehicle extends XE.Obj.Model {
  constructor(earth, guid) {
    super(earth, guid);
    this.test123 = '123';
    const vehicles = [
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
    let that = this;
    // console.log(this.guid);
    for(let i = 0; i<vehicles.length; i++){
      if(vehicles[i]==[])continue;
      for(let j = 0; j< vehicles[i].vehicles.length;j++){
        // console.log(vehicles[i]['vehicles'][j])
        if(vehicles[i]['vehicles'][j].code == that.guid){
          this._data = vehicles[i]['vehicles'][j];
          break;
        }
      }
    }
    
    console.log(this._data);
    this.url = this._data.glbSrc;
    this.code = this._data.code;
    this.name = this._data.name;

    this.HyCustomPrimitiveCircle = HyCustomPrimitiveCircle;
    this.HyLabel = HyLabel;
    
    this.created()
    this.addListeners();
    this.addToSceneTree();
    this.test();
    
    this.disposers.push(() => {
      console.log(3);
    });
  }
  //添加至图层管理
  addToSceneTree(){
    // console.log(1);
    // let earth = this.earth;
    // this.editing = false;
    // this.positionEditing = false;
    // // if (this.isCreating) {
    //   console.log(2);
    //   this.isCreating = false;
    //   let fightingGroup = earth.sceneTree.root.children.find((scene)=>{
    //     console.log(scene.title); 
    //     return scene.title === '作战力量';
    //   })
    //   //判断是否存在作战力量分组
    //   if(!fightingGroup){
    //     console.log(3);
    //     //不存在则创建
    //     fightingGroup = new XE.SceneTree.Group(earth);
    //     fightingGroup.title = '作战力量'
    //     earth.sceneTree.root.children.push(fightingGroup);
    //   }
    //   console.log(4);
    //   const sceneLeaf = new XE.SceneTree.Leaf(this);
    //   let exis = fightingGroup.children.find(leaf=>{ 
    //     console.log(leaf);
    //     return leaf == sceneLeaf;
    //   })
    //   console.log(exis);
      
    //   fightingGroup.children.push(sceneLeaf);
    // // }
  }
  /**
   * 增加模型的监听
   */
  addListeners(){
      //添加模型的点击事件
      this.onclick = e => {
        console.log('model was clicked');
        console.log(this);
        window.uia.showPropertyWindow(this);
        // let model = that.models.find(model=>{return model.guid === Model.guid});
        //判断是否存在属性面板, 不存在则创建
        // if(model){
        //   try{
        //     let HyVehicle = that.$refs[Model.guid][0];
        //     if(HyVehicle){
        //       HyVehicle.show = true;
        //     }
        //   }catch(e){
        //     layer.alert('获取窗口失败,请刷新重试');
        //   }
        // }else{
        //   //添加模型的属性框
        //   this.models.push({
        //       component: "HyVehicleProperty",
        //       ref: Model.guid,
        //       guid: Model.guid,
        //       item: () => Model,
        //   })
        // }
      };
  }

  /**
   * @description 模型创建完毕后执行
   */
  created() {
    //this.evalString = '';
    let vehicle = this._data;
    if(!vehicle) return;
    let driverMsg =
      vehicle.name +
      "\\n驾驶员名:" +
      vehicle.driver.name +
      "\\n联系方式:" +
      vehicle.driver.phone +
      "\\n编号:" +
      vehicle.driver.code;

    let agentiaMsg =
      "容量:" +
      vehicle.driver.name +
      "\\n剩余量:" +
      vehicle.driver.phone +
      "\\n:" +
      vehicle.driver.code;
    //Model初始化时执行的js代码

    this.evalString =
      `
      //实例一个自定义图元-圆为作战半径
      let scopeCircle = new p.HyCustomPrimitiveCircle(p,'作战半径动画');
      setTimeout(function(){
        let viewer = p._earth.czm.viewer;
        //画出作战范围
        scopeCircle.drawScan(` +
          vehicle.scope +
          `);
        //显示坐标信息
        let positionLabelConfig = {
          model: p
        };
        let positionLabel = new p.HyLabel(positionLabelConfig);
        //显示驾驶员信息
        let driverLabelConfig = {
          model: p,
          offset:[0,-75],
          textFnc:()=> {return '` +
          driverMsg +
          `';}
        }
        let driverLabel = new p.HyLabel(driverLabelConfig);
        
        //显示药剂剩余量
      },0);
    `;
  }

  /**
   * @description 用于蓝立方测试
   */
  test(){
    let vehicle = this._data;
    if(vehicle.code === 'blue1'){
      this.preUpdateEvalString = 
      ` 
        if(!p.creating && !p.positionEditing && !p.rotationEditing){
          let xOffset = Math.random()*0.000001;
          let yOffset = Math.random()*0.000001;
          let position = [...p.xbsjPosition];
          position.xeptd;
          position[0]+=xOffset;
          position[1]+=yOffset;
          p.xbsjPosition = position.xeptr;
        }
      `
    }


  }
}
Vehicle.registerType(Vehicle, 'HyVehicle');

Vehicle.defaultOptionsAccum=undefined;
Vehicle.defaultOptions = {
  test123:'123123'
};

export default Vehicle;