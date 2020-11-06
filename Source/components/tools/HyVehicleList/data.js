//author 谢灿
//date 2019年12月24日
//用于返回模拟的消防车面板数据
// const basePath = "../../../../";
const basePath = "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/";
const vehicles = [
  {
    name: "三项射流类",
    code: "A",
    vehicles: [
      {
        name: "消防车001",
        code: "fire_trunk",
        imgSrc: basePath + "Apps/assets/3d/fire_trunk.png",
        glbSrc: basePath + "Apps/assets/3d/fire_trunk.glb",
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
        name: "消防车002",
        code: "fire_trunk2",
        imgSrc: basePath + "Apps/assets/3d/fire_trunk2.png",
        glbSrc: basePath + "Apps/assets/3d/fire_trunk2.glb",
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
        code: "fire_trunk_base",
        imgSrc: basePath + "Apps/assets/3d/fire_trunk_base.png",
        glbSrc: basePath + "Apps/assets/3d/fire_trunk_base.glb",
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