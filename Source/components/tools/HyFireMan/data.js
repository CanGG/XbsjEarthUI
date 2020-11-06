//author 谢灿
//date 2019年12月24日
//用于返回模拟的消防车面板数据
// const basePath = "../../../../";
const basePath = "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/";
      
const vehicles = [
  {
    name: "战斗员",
    code: "A",
    vehicles: [
      {
        name: "战斗员001",
        code: "fire_man1",
        imgSrc: basePath + "Apps/assets/3d/fire_man.png",
        glbSrc: basePath + "Apps/assets/3d/fire_man.glb",
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
        imgSrc: basePath + "Apps/assets/3d/fire_man.png",
        glbSrc: basePath + "Apps/assets/3d/fire_man.glb",
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
        imgSrc: basePath + "Apps/assets/3d/fire_man.png",
        glbSrc: basePath + "Apps/assets/3d/fire_man.glb",
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