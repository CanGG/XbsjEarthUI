//author 谢灿
//date 2019年12月24日
//用于返回模拟的消防车面板数据      
// const basePath = "../../../../";
const basePath = "http://www.smartmgxf.com/houyi2019/houyi2019_pc_build/";
const vehicles = [
  {
    name: "消防栓",
    code: "A",
    vehicles: [
      {
        name: "消防栓1",
        code: "fire_hydrant1",
        imgSrc: basePath + "Apps/assets/3d/fire_hydrant.png",
        glbSrc: basePath + "Apps/assets/3d/fire_hydrant.glb",
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
        imgSrc: basePath + "Apps/assets/3d/fire_hydrant.png",
        glbSrc: basePath + "Apps/assets/3d/fire_hydrant.glb",
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
        imgSrc: basePath + "Apps/assets/3d/fire_hydrant.png",
        glbSrc: basePath + "Apps/assets/3d/fire_hydrant.glb",
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