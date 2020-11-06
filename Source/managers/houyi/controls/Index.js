import Deduce from "./Deduce";
import IOV from "./IOV";
/**
 * hy控制入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Controls {
  constructor(root) {
    this._root = root;
    this.deduce = new Deduce(root);
    this.iov = new IOV(root);
    //响应式变量 sceneID  , sceneName
    XE.MVVM.extend(this, {
      basePath: "http://220.180.184.7:8711/plan",

      /**
       * 厂区ID  场景保存后才会有值
       * @type {int}
       * @default undefined 
       * @instance
       * @memberof Controls
       */
      orgID: undefined,
      /**
       * 厂区原生场景 加载厂区后才会有值
       * @type {Object}
       * @default undefined 
       * @instance
       * @memberof Controls
       */
      orgSceneJSON: undefined,
      /**
       * 场景ID  场景保存后才会有值
       * @type {string}
       * @default undefined 
       * @instance
       * @memberof Controls
       */
      sceneID: undefined,
      /**
       * 场景名称 
       * @type {string}
       * @default '新建场景' 
       * @instance
       * @memberof Controls
       */
      sceneName: "新建场景",
      /**
       * 场景缩略图地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof Controls
       */
      thumbnail: '',
      /**
       * 推演状态
       * @type {Object}
       * @default '' 
       * @instance
       * @memberof Controls
       */
      plan: {
        id: -1,
        start: 0,
      },
      /**
       * 调度状态
       * @type {Object}
       * @default '' 
       * @instance
       * @memberof Controls
       */
      fighting: {
        id: -1, // 警报id
        state: 0, // 调度状态 准备0 作战1 结束2 终止3
        maneuverId: -1 // 预案id
      }
    });
  }
  /**
   * 清除推演信息
   */
  clearPlan() {
    this.plan = {
      id: -1,
      start: 0,
    }
  }

  /**
   * 保存厂区的场景数据
   */
  saveOrgSceneJSON() {
    this.orgSceneJSON = this._root.$earth.toJSON();
  }

  /**
   * 返回厂区的场景数据(无其他数据)
   */
  loadOrgSceneJSON() {
    if (this.orgSceneJSON)
      return this.orgSceneJSON;
  }
  /**
   * 加载厂区的场景数据(无其他数据)
   */
  loadOrgScene(orgId = this.orgID) {
    this.clearSceneTree()
    let chinaTerrainLayer = this.loadGeologyTiles();
    let earth = this._root.earth;
    const tilesetGroup = new XE.SceneTree.Group(earth);
    let layerIndex = window._wait();
    let lastTileset;
    let lng,lat;
    this._root.hyServers.orgMap.list(orgId).then(result=>{
      console.log(result);
      layer.msg(result.msg);
      if(result.code === 200){
        let data = result.data;
        data.forEach((item,index)=>{
          if(index==0){
            tilesetGroup.title =  `当前单位${item.org.name}`;
            earth.sceneTree.root.children.push(tilesetGroup);
            lng = item.org.lng;
            lat = item.org.lat;
          }
          let factoryTilesetConfig = {
            "xbsjType": "Tileset",
            "xbsjGuid": "test_tileset_01",
            "name": item.name,
            "url": item.url,
            "lightColor": null,
            "specularEnvironmentMaps": null,
            maximumScreenSpaceError: 1, //默认显示精度为1
            ssePower: 1, //默认显示精度为1
            "skipLevelOfDetail": false
          };
          let factoryTileset = new XE.Obj.Tileset(earth);
          factoryTileset.xbsjFromJSON(factoryTilesetConfig);
          const leaf = new XE.SceneTree.Leaf(factoryTileset);
          leaf.title = item.name;
          tilesetGroup.children.push(leaf);
          lastTileset = factoryTileset;
          if(!!item.offSet_height){
            factoryTileset._tileset.readyPromise.then(function (tileset) {               
              var boundingSphere = tileset.boundingSphere;
              var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);//获取到倾斜数据中心点的经纬度坐标（弧度）
              // console.log(cartographic);
              var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);//倾斜数据中心点的笛卡尔坐标
              // console.log(surface);   
              var positions = [Cesium.Cartographic.fromDegrees(cartographic.longitude,cartographic.latitude)];
              // console.log(positions);
              var promise = Cesium.sampleTerrainMostDetailed(chinaTerrainLayer._terrainProvider, positions);//其中terrainProvider是当前场景使用的高程Provider
              Cesium.when(promise, function(updatedPositions) {
                //  console.log(updatedPositions);
                 var terrainHeight = updatedPositions[0].height;//高程
                //  console.log(terrainHeight);
                 var offset=Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, item.offSet_height);//带高程的新笛卡尔坐标
                 var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());//做差得到变换矩阵
                 tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
              });
            }).otherwise(function (error) {
              console.error(error);
            });
          }
          
        });
        //场景飞向目的地, 顺序为 单位坐标>最后的单位部位坐标
        if(lng && lat){
          //定位至单位坐标高空500米处
          earth.camera.flyTo([lng, lat, 800.0].xeptr)
        }else if(!!lastTileset){
          lastTileset.flyTo();
        }
      }
    })
  }

  /**
   * 清理图层
   */
  clearSceneTree(){
    let earth = this._root.earth;
    let sceneTreeRoot = earth.sceneTree.root;
    sceneTreeRoot.children = [];
  }

  /**
   * 加载地质模型
   */
  loadGeologyTiles(){
    let earth = this._root.earth;
    const g0 = new XE.SceneTree.Group(earth);
    g0.title = '地质模型'
    earth.sceneTree.root.children.push(g0);
    //添加一个谷歌在线影像 
    {
        var googleImageryLayer = new XE.Obj.Imagery(earth);
        googleImageryLayer.xbsjImageryProvider.type = 'XbsjImageryProvider';
        googleImageryLayer.xbsjImageryProvider['XbsjImageryProvider'] = {
            url: '//mt1.google.cn/vt/lyrs=s,h&gl=cn&x={x}&y={y}&z={z}&s=Gali',
            rectangle: [-Math.PI, -Math.PI * 0.5, Math.PI, Math.PI * 0.5],
            srcCoordType: 'GCJ02',
            dstCoordType: 'WGS84'
        };
        const so = new XE.SceneTree.Leaf(googleImageryLayer);
        so.title = '谷歌影像';
        g0.children.push(so);
    }

    //添加中国14级影像 
    {
        var chinaTerrainLayer = new XE.Obj.Terrain(earth);
        chinaTerrainLayer.xbsjTerrainProvider.type = 'XbsjCesiumTerrainProvider';
        chinaTerrainLayer.xbsjTerrainProvider['XbsjCesiumTerrainProvider'] = {
            url: "//lab.earthsdk.com/terrain/577fd5b0ac1f11e99dbd8fd044883638",
            requestVertexNormals: true,
            requestWaterMask: true
        }
        const so = new XE.SceneTree.Leaf(chinaTerrainLayer);
        so.title = '中国14级影像';
        g0.children.push(so);
        return chinaTerrainLayer;
    }
    
  }
}

export default Controls;