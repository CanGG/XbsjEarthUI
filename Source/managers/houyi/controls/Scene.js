/**
 * @author 谢灿
<<<<<<< HEAD
 * @date 2020-1-2
=======
 * @desc 2020-1-2
>>>>>>> SafeChina
 * @description 后羿场景保存和打开功能的类.
 * @class
 */
class HyScene {
  constructor(root) {
    this._root = root;

    //定义响应式变量sceneID、sceneName
    XE.MVVM.extend(this, {
      /**
       * 场景ID  场景保存后才会有值
       * @type {string}
       * @default undefined 
       * @instance
       * @memberof HyScene
       */
      sceneID: undefined,
      /**
       * 场景名称 
       * @type {string}
       * @default '新建场景' 
       * @instance
       * @memberof HyScene
       */
      sceneName: "新建场景",
      /**
       * 场景缩略图地址
       * @type {string}
       * @default '' 
       * @instance
       * @memberof HyScene
       */
      thumbnail: ''
    });

    //绑定到vue组件上
    this._comp = root._comp.$refs.mainBarControl.$refs.navigate.$refs.hySceneView;

    this.unbinds = [];
    this.unbinds.push(XE.MVVM.bind(
      this._comp,
      "sceneID",
      this,
      "sceneID"
    ));
    this.unbinds.push(XE.MVVM.bind(
      this._comp,
      "sceneName",
      this,
      "sceneName"
    ));
    this.unbinds.push(XE.MVVM.bind(
      this._comp,
      "thumbnail",
      this,
      "thumbnail"
    ));

    //更新标题
    this.unbinds.push(XE.MVVM.watch(() => {
      document.title = this.sceneName;
    }));

    //更新url参数
    this.unbinds.push(XE.MVVM.watch(() => {
      if (this.sceneID) {
        history.pushState(
          "Houyi",
          document.title,
          "./index.html?hyScene=" + this.sceneID
        );
      }
    }));

  }

  destroy() {
    this._unbinds.forEach(e => e());
    this._unbinds.length = 0;
  }

  saveScene() {
    console.log('保存hy场景')
    //如果当前全局内没有场景，那么 向服务器新建场景
    if (!this.sceneID) {
      //新建场景
      this.newScene();
    } else {
      //更新场景
      this.updateScene();
    }
  }

  /**
   * 新建场景
   */
  newScene() {
    console.log('未发现场景id, 新建场景');
    if (this.sceneID) return;
    var earthJson = this._root.earth.toJSON();
    var hyServer = this._root.hyServer;
    console.log(hyServer);
    hyServer
      .addScene(this.sceneName, JSON.stringify(earthJson))
      .then(id => {
        this.sceneID = id;
        this._root.promptInfo('创建场景成功:' + id);
      })
      .catch(ex => {
        console.log("new scene failed " + ex.message || ex);
        this._root.promptInfo('创建场景失败:' + ex.message || ex, 'error');
      });

  }

  /**
   * 更新场景
   */
  updateScene() {
    console.log('发现场景id, 更新场景');
    if (!this.sceneID) return;
    var jc = this._root.earth.toJSON();
    var hyServer = this._root.hyServer;
    hyServer
      .updateScene(this.sceneID, JSON.stringify(jc))
      .then(id => {
        this._root.promptInfo('更新场景成功:' + this.sceneID);
      })
      .catch(ex => {
        console.log("update scene failed " + ex.message || ex);
        this._root.promptInfo('更新场景失败:' + ex.message || ex, 'error');
      });
  }


  /**
   * 加载场景
   * @param {String} id  场景id  
   */
  loadScene(id) {
    //场景加载
    var hyServer = this._root.hyServer;
    hyServer
      .queryScene(id)
      .then(scene => {
        //解析场景内容
        var jc = JSON.parse(scene.content);
        this._root.earth.xbsjFromJSON(jc);
        console.log(jc);
        this.sceneName = scene.name;
        this.sceneID = id;
        this.thumbnail = scene.thumbnail;
        this._root.promptInfo('加载场景成功:' + id);
      })
      .catch(ex => {
        console.log("query scene failed " + ex.message || ex);
        console.log(this._root);
        this._root.promptInfo('加载场景失败:' + ex.message || ex, 'error');
      });
  }

  /**
   * 更新场景名称
   */
  updateName() {
    if (!this.sceneID) return;
    var hyServer = this._root.hyServer;
    hyServer
      .rename("scenes", this.sceneID, this.sceneName)
      .then(id => {
        console.log("update scene name success", id);
        this._root.promptInfo('场景改名成功:' + this.sceneID);
      })
      .catch(ex => {
        console.log("update scene name failed " + ex.message || ex);
        this._root.promptInfo('场景改名失败:' + ex.message || ex, 'error');
      });
  }

  /**
   * 更新缩略图
   * @param {string} img 需要保存的缩略图地址
   */
  updateThumbNail(img) {
    //更新场景名称
    if (!this.sceneID) return;

    var hyServer = this._root.hyServer;
    hyServer
      .updateLayerThumbnail("scenes", this.sceneID, img)
      .then(id => {
        console.log("update scene thumbnail success");

        this.thumbnail = img;
        this._root.promptInfo('更新场景缩略图成功:' + this.sceneID);
      })
      .catch(ex => {
        console.log("update scene thumbnail failed " + ex.message || ex);
      });
  }
}

export default HyScene;