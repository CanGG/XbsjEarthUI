//author 谢灿
//date 2019年12月24日
//用于返回模拟的消防车面板数据
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
const vehicles = [
  {
    name: "战斗员",
    code: "A",
    vehicles: [
      {
        name: "战斗员001",
        code: "fire_man1",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.glb",
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
        name: "战斗员002",
        code: "fire_man2",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.glb",
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
        name: "战斗员003",
        code: "fire_man3",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_man.glb",
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
    name: "供水员",
    code: "B",
    vehicles: []
  },
  {
    name: "通信员",
    code: "C",
    vehicles: []
  },
  {
    name: "指挥员",
    code: "D",
    vehicles: []
  },
  {
    name: "安全员",
    code: "E",
    vehicles: []
  }
];

const groups = [{
  id:'1',
  name:'作战力量测试1'
},{
  id:'2',
  name:'作战力量测试2'
},{
  id:'3',
  name:'作战力量测试3'
},{
  id:'4',
  name:'作战力量测试4'
},{
  id:'5',
  name:'作战力量测试5'
},{
  id:'6',
  name:'作战力量测试6'
}]


export default {
  vehicles,groups
};