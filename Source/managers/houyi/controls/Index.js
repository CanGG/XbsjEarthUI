import Deduce from "./Deduce";
/**
 * hy控制入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Controls {
  constructor(root) {
    this._root = root;
    console.log(this);
    this.deduce = new Deduce(root);
    //响应式变量 sceneID  , sceneName
    XE.MVVM.extend(this, {
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
      console.log(`加载${orgId}`);
      // if (orgId) {
      this.clearSceneTree()
      this.loadGeologyTiles();
      let earth = this._root.earth;
      const tilesetGroup = new XE.SceneTree.Group(earth);
      tilesetGroup.title = "当前单位";
      earth.sceneTree.root.children.push(tilesetGroup);
      let factoryTilesetConfig = {
          "xbsjType": "Tileset",
          "xbsjGuid": "test_tileset_01",
          "name": "厂区瓦片",
          "url": "https://dingyuan01-1254117419.cos.ap-shanghai.myqcloud.com/3dtiles/Production_4/Scene/Production_4.json",
          "lightColor": null,
          "specularEnvironmentMaps": null,
          maximumScreenSpaceError: 1, //默认显示精度为1
          ssePower: 1, //默认显示精度为1
          "skipLevelOfDetail": false
      };
      let factoryTileset = new XE.Obj.Tileset(earth);
      factoryTileset.xbsjFromJSON(factoryTilesetConfig);
      const leaf = new XE.SceneTree.Leaf(factoryTileset);
      leaf.title = '厂区瓦片';
      tilesetGroup.children.push(leaf);
      factoryTileset.flyTo();

      // let singleTilesetConfig = {
      //     "xbsjType": "Tileset",
      //     "xbsjGuid": "test_tileset_02",
      //     "name": "厂区单体化瓦片",
      //     "url": "https://dingyuan01-1254117419.cos.ap-shanghai.myqcloud.com/3dtiles/xz5/tileset.json",
      //     "lightColor": null,
      //     "specularEnvironmentMaps": null,
      //     "skipLevelOfDetail": false,
      //     classificationType: "ClassificationType.CESIUM_3D_TILE", //分类瓦片
      //     // classificationType: "ClassificationType.TERRAIN",//分类地形
      // };
      // let singleTileset = new XE.Obj.Tileset(earth);
      // singleTileset.xbsjFromJSON(singleTilesetConfig);
      // const singleTilesetLeft = new XE.SceneTree.Leaf(singleTileset);
      // singleTilesetLeft.title = '厂区单体化瓦片';
      // tilesetGroup.children.push(singleTilesetLeft);


      // }else if (this._root.hyControls.orgSceneJSON) {
      //     this._root.$earth.xbsjFromJSON(this._root.hyControls.orgSceneJSON)
      // }
  }

  /**
   * 清理图层
   */
  clearSceneTree(){
    let earth = this._root.earth;
    let sceneTreeRoot = earth.sceneTree.root;
    sceneTreeRoot.children = [];
    // childrens.splice(childrens.findIndex((v)=>v.title=="地质模型")+1,);
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
    }
    
  }
}

export default Controls;