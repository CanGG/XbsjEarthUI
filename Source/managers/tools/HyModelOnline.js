/**
 * Hy厂区选择面板脚本
 * @class
 * @author 谢灿
 * @desc 2020-6-1 15:39:06
 */
class HyModelOnline {
    constructor(root) {
        this._root = root;
        this._comp = root._comp.$refs.hyModelOnline[0];
        XE.MVVM.extend(this, {
            /**
             * 是否可见
             * @type {boolean}
             * @default false 
             * @instance
             * @memberof ModelOnline
             */
            show: false,
        });
        var tool = root._comp.$refs.mainBarControl.$refs.hytileset;
        this.unbind = XE.MVVM.bind(
            tool,
            "modelOnline",
            this,
            "show"
        );

        this.unbind2 = XE.MVVM.bind(
            this._comp,
            "show",
            this,
            "show"
        );
        console.log("看一下root是啥");
        console.log(root);
        XE.MVVM.watch(() => this._root.hyControls.orgID, (v) => {
            if(v===undefined || v === -1) return;
            let earth = root.earth;
            const tilesetGroup = new XE.SceneTree.Group(earth);
            tilesetGroup.title = "当前单位";
            earth.sceneTree.root.children.push(tilesetGroup);
            //添加单体化模型
            {
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
                factoryTileset.flyTo();
                const leaf = new XE.SceneTree.Leaf(factoryTileset);
                leaf.title = '厂区瓦片';
                tilesetGroup.children.push(leaf);
                factoryTileset.flyTo();


                let singleTilesetConfig = {
                    "xbsjType": "Tileset",
                    "xbsjGuid": "test_tileset_02",
                    "name": "厂区单体化瓦片",
                    "url": "https://dingyuan01-1254117419.cos.ap-shanghai.myqcloud.com/3dtiles/xz5/tileset.json",
                    "lightColor": null,
                    "specularEnvironmentMaps": null,
                    "skipLevelOfDetail": false,
                    classificationType: "ClassificationType.CESIUM_3D_TILE", //分类瓦片
                    // classificationType: "ClassificationType.TERRAIN",//分类地形
                };
                let singleTileset = new XE.Obj.Tileset(earth);
                singleTileset.xbsjFromJSON(singleTilesetConfig);
                const singleTilesetLeft = new XE.SceneTree.Leaf(singleTileset);
                singleTilesetLeft.title = '厂区单体化瓦片';
                tilesetGroup.children.push(singleTilesetLeft);

            }
        });
    }

    isDestroyed() {
        return false;
    }

    destroy() {

        this.unbind1 = this.unbind1 && this.unbind1();
        this.unbind2 = this.unbind2 && this.unbind2();

    }
}

export default HyModelOnline;