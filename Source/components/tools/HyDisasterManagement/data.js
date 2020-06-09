//author 谢灿
//date 2020年2月28日
//重大危险源的假数据
const majorHazardSources = [{
  key_id:2,
  para_name: '汽化间',
  usage_description: '内部物质具有剧毒性、自燃性、助燃性、刺激性气味等理化特性。',
  latitude: 117.2215240,
  longitude: 34.3600607,
  remark: '用于氯气，二氧化硫汽化。',
  thumb:'../assets/images/no_image.png'
},{
  key_id:3,
  para_name: '甲类仓库',
  usage_description: '内部存放物质具有剧毒性、腐蚀性、自燃性、助燃性、易爆性，刺激性气味等理化特性。',
  latitude: 117.2222680,
  longitude: 34.3593335,
  remark: '用于存放氯气，二氧化硫，氢氧化钠，环氧己烷等生产原料。',
  thumb:'../assets/images/no_image.png'
},{
  key_id:4,
  para_name: '生产车间',
  usage_description: '内部含有物质具有腐蚀性，易燃易爆性，有毒性，刺激性气味等理化特性。',
  latitude: 117.2204771,
  longitude: 34.3599562,
  remark: '主要生产：烷基磺酸钠，3-羟甲基四氢呋哺，噻呋酸。',
  thumb:'../assets/images/no_image.png'
}]
export default {
  majorHazardSources
};