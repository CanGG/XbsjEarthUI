const vehicles = [
  {
    name: "三项射流类",
    code: "A",
    vehicles: [
      {
        name: "消防车001",
        code: "fire_trunk",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk.glb",
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
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk2.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk2.glb",
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
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk_base.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_trunk_base.glb",
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
const fireFighting = [
  {
    name: "消防栓",
    code: "A",
    vehicles: [
      {
        name: "消防栓1",
        code: "fire_hydrant1",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.glb",
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
        name: "消防栓2",
        code: "fire_hydrant2",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.glb",
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
        name: "消防栓3",
        code: "fire_hydrant3",
        imgSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.png",
        glbSrc: "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/Apps/assets/3d/fire_hydrant.glb",
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
    name: "消防水炮",
    code: "B",
    vehicles: []
  },
  {
    name: "消防池",
    code: "C",
    vehicles: []
  },
  {
    name: "灭火器",
    code: "D",
    vehicles: []
  },
  {
    name: "水带",
    code: "E",
    vehicles: []
  },
  {
    name: "水枪",
    code: "F",
    vehicles: []
  }
];
const fireMan = [
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
export default {
  "vehicles":vehicles,
  "fireFighting":fireFighting,
  "fireMan":fireMan
};