// const basePath = "../../../";
const basePath = "http://220.180.184.7:8711/plan/earthUI/";
const fireFighting_path = "Apps/assets/icons/消防设施/";
const fireMan_path = "Apps/assets/icons/消防人员/";
const other_path = "otherApps/assets/icons/其他/";

const fireFighting = [
  {
    name: "机动水枪",
    code: "A",
    vehicles: [
      {
        name: "机动水枪1",
        code: "fire_hydrant1-1",
        imgSrc: basePath + fireFighting_path + "机动水枪.svg",
      },
      {
        name: "机动水枪2",
        code: "fire_hydrant1-2",
        imgSrc: basePath + fireFighting_path + "机动水枪.svg",
      },
      {
        name: "机动水枪3",
        code: "fire_hydrant1-3",
        imgSrc: basePath + fireFighting_path + "机动水枪.svg",
      },
    ]
  },
  {
    name: "带架水枪",
    code: "B",
    vehicles: [
        {
            name: "带架水枪1",
            code: "fire_hydrant2-1",
            imgSrc: basePath + fireFighting_path + "带架水枪.svg",
        },
        {
          name: "带架水枪2",
          code: "fire_hydrant2-2",
          imgSrc: basePath + fireFighting_path + "带架水枪.svg",
      },
      {
        name: "带架水枪3",
        code: "fire_hydrant2-3",
        imgSrc: basePath + fireFighting_path + "带架水枪.svg",
    },
    ]
  },
  {
    name: "泡沫枪",
    code: "C",
    vehicles: [
        {
            name: "泡沫枪1",
            code: "fire_hydrant3-1",
            imgSrc: basePath + fireFighting_path + "泡沫枪.svg",
        },
        {
          name: "泡沫枪2",
          code: "fire_hydrant3-2",
          imgSrc: basePath + fireFighting_path + "泡沫枪.svg",
      },
      {
        name: "泡沫枪3",
        code: "fire_hydrant3-3",
        imgSrc: basePath + fireFighting_path + "泡沫枪.svg",
    },
    ]
  },
  {
    name: "喷雾水枪",
    code: "D",
    vehicles: [
        {
            name: "喷雾水枪1",
            code: "fire_hydrant4-1",
            imgSrc: basePath + fireFighting_path + "喷雾水枪.svg",
        },
        {
          name: "喷雾水枪2",
          code: "fire_hydrant4-2",
          imgSrc: basePath + fireFighting_path + "喷雾水枪.svg",
      },
      {
        name: "喷雾水枪3",
        code: "fire_hydrant4-3",
        imgSrc: basePath + fireFighting_path + "喷雾水枪.svg",
    },
    ]
  },
  {
    name: "三节拉梯",
    code: "E",
    vehicles: [
        {
            name: "三节拉梯1",
            code: "fire_hydrant5-1",
            imgSrc: basePath + fireFighting_path + "三节拉梯.svg",
        },
        {
          name: "三节拉梯2",
          code: "fire_hydrant5-2",
          imgSrc: basePath + fireFighting_path + "三节拉梯.svg",
      },
      {
        name: "三节拉梯3",
        code: "fire_hydrant5-3",
        imgSrc: basePath + fireFighting_path + "三节拉梯.svg",
    },
    ]
  },
  {
    name: "三分水器",
    code: "F",
    vehicles: [
        {
            name: "三分水器",
            code: "fire_hydrant6",
            imgSrc: basePath + fireFighting_path + "三分水器.svg",
        },
    ]
  },
  {
    name: "二分水器",
    code: "G",
    vehicles: [
        {
            name: "二分水器",
            code: "fire_hydrant7",
            imgSrc: basePath + fireFighting_path + "二分水器.svg",
        },
    ]
  },
  {
    name: "单杠梯",
    code: "H",
    vehicles: [
        {
            name: "单杠梯",
            code: "fire_hydrant8",
            imgSrc: basePath + fireFighting_path + "单杠梯.svg",
        },
    ]
  },
  {
    name: "救援三脚架",
    code: "I",
    vehicles: [
        {
            name: "救援三脚架",
            code: "fire_hydrant9",
            imgSrc: basePath + fireFighting_path + "救援三脚架.svg",
        },
    ]
  },
  {
    name: "移动水炮",
    code: "J",
    vehicles: [
        {
            name: "移动水炮",
            code: "fire_hydrant10",
            imgSrc: basePath + fireFighting_path + "移动水炮.svg",
        },
    ]
  },
];
const fireMan = [
  {
    name: "战斗员",
    code: "A",
    vehicles: [
      {
        name: "战斗员1",
        code: "fire_man1",
        imgSrc: basePath + fireMan_path + "战斗员1.svg",
      },
      {
        name: "战斗员2",
        code: "fire_man2",
        imgSrc: basePath + fireMan_path + "战斗员2.svg",
      },
      {
        name: "战斗员3",
        code: "fire_man3",
        imgSrc: basePath + fireMan_path + "战斗员3.svg",
      }
    ]
  },
  {
    name: "驾驶员",
    code: "B",
    vehicles: [
      {
        name: "驾驶员1",
        code: "fire_man4-1",
        imgSrc: basePath + fireMan_path + "驾驶员.svg",
      },
      {
        name: "驾驶员2",
        code: "fire_man4-2",
        imgSrc: basePath + fireMan_path + "驾驶员.svg",
      },
      {
        name: "驾驶员3",
        code: "fire_man4-3",
        imgSrc: basePath + fireMan_path + "驾驶员.svg",
      },
      
    ]
  },
  {
    name: "火场指挥",
    code: "C",
    vehicles: [
      {
        name: "火场指挥1",
        code: "fire_man5-1",
        imgSrc: basePath + fireMan_path + "火场指挥.svg",
      },
      {
        name: "火场指挥2",
        code: "fire_man5-2",
        imgSrc: basePath + fireMan_path + "火场指挥.svg",
      },
      {
        name: "火场指挥3",
        code: "fire_man5-3",
        imgSrc: basePath + fireMan_path + "火场指挥.svg",
      },
    ]
  },
  {
    name: "通讯员",
    code: "D",
    vehicles: [
      {
        name: "通讯员1",
        code: "fire_man6-1",
        imgSrc: basePath + fireMan_path + "通讯员.svg",
      },
      {
        name: "通讯员2",
        code: "fire_man6-2",
        imgSrc: basePath + fireMan_path + "通讯员.svg",
      },
      {
        name: "通讯员3",
        code: "fire_man6-3",
        imgSrc: basePath + fireMan_path + "通讯员.svg",
      }
    ]
  },
  {
    name: "卫生员",
    code: "E",
    vehicles: [
      {
        name: "卫生员1",
        code: "fire_man7-1",
        imgSrc: basePath + fireMan_path + "卫生员.svg",
      },
      {
        name: "卫生员2",
        code: "fire_man7-2",
        imgSrc: basePath + fireMan_path + "卫生员.svg",
      },
      {
        name: "卫生员3",
        code: "fire_man7-3",
        imgSrc: basePath + fireMan_path + "卫生员.svg",
      }
    ]
  },
  {
    name: "战斗班长",
    code: "F",
    vehicles: [
      {
        name: "战斗班长",
        code: "fire_man8",
        imgSrc: basePath + fireMan_path + "战斗班长.svg",
      }
    ]
  },
];
const other = [
    {
        name: "爆炸点",
        code: "A",
        vehicles: [
          {
            name: "爆炸点",
            code: "other",
            imgSrc: basePath + other_path + "爆炸点.svg",
          },
        ]
      },
      {
        name: "被困人员",
        code: "A",
        vehicles: [
          {
            name: "被困人员",
            code: "other",
            imgSrc: basePath + other_path + "被困人员.svg",
          },
        ]
      },
      {
        name: "出口",
        code: "A",
        vehicles: [
          {
            name: "出口",
            code: "other",
            imgSrc: basePath + other_path + "出口.svg",
          },
        ]
      },
      {
        name: "飞火",
        code: "A",
        vehicles: [
          {
            name: "飞火",
            code: "other",
            imgSrc: basePath + other_path + "飞火.svg",
          },
        ]
      },
      {
        name: "燃烧蔓延方向",
        code: "A",
        vehicles: [
          {
            name: "燃烧蔓延方向",
            code: "other",
            imgSrc: basePath + other_path + "燃烧蔓延方向.svg",
          },
        ]
      },
      {
        name: "死亡人员",
        code: "A",
        vehicles: [
          {
            name: "死亡人员",
            code: "other",
            imgSrc: basePath + other_path + "死亡人员.svg",
          },
        ]
      },
      {
        name: "烟",
        code: "A",
        vehicles: [
          {
            name: "烟",
            code: "other",
            imgSrc: basePath + other_path + "烟.svg",
          },
        ]
      },
      {
        name: "着火点",
        code: "A",
        vehicles: [
          {
            name: "着火点",
            code: "other",
            imgSrc: basePath + other_path + "着火点.svg",
          },
        ]
      },
      {
        name: "水带过路保护",
        code: "A",
        vehicles: [
          {
            name: "水带过路保护",
            code: "other",
            imgSrc: basePath + other_path + "水带过路保护.svg",
          },
        ]
      },
      {
        name: "风力和风向",
        code: "A",
        vehicles: [
          {
            name: "风力和风向",
            code: "other",
            imgSrc: basePath + other_path + "风力和风向.svg",
          },
        ]
      },
];

export default {
  "fireFighting":fireFighting,
  "fireMan":fireMan,
  "other":other,
};