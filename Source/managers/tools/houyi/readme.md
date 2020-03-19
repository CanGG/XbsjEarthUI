##文件说明
该目录存放自制XbsjObj插件，可用 new XE.Obj.xxxx进行实例化。

1.首先要先创建相关的JS脚本类，就放在这个目录内。（继承XE.Obj.XX模块）
2.将模块注册进XbsjObj组件内如：
````js
Link.registerType(Link, "HyLink");
````
3.如需自定义组件属性，可如下操作：
````js
/**
 * 自定义属性
 * 需要修改后才能被toJSON所识别
 */
Link.defaultOptionsAccum=undefined;
Link.defaultOptions = {
  test:'123123'
};
````
4.组件注册后引用需要先import相关JS脚本类,再将其实例化。代码如下：
````js

import HyLink from "@/managers/tools/houyi/Link";//自定义连线
```
link(){
  let that = this;      
  let czm = this.$root.$earth.czm;
  var Polyline = new HyLink(this.$root.$earth);
  Polyline.name = "轨迹线";

  Polyline.allowPicking = true;
  Polyline.isCreating = true;
  Polyline.creating = true;

  Polyline.init();
}
````

5.如果组件需要绑定特殊的属性面板，则需要在MainUIComp.vue的registerComponents属性中绑定相关的属性面板。代码如下：
````js
registerComponents: {
  // czmObject的类型和组件名称的关联表，如果为绑定，则使用TreeCommon vtxf 190629
  FlattenedPolygonCollection: "FlattenningTool",
  ······
  //绑定后羿组件的面板
  HyVehicle:'HyVehicleProperty',
  HyLink:'GeoPolyline', //将组件HyLink与属性面板GeoPolyline关联
},
````
如果关联的属性面板为自定义面板,则需要在MainUIComp.vue文件中先Import面板页面,再在components中添加相关的面板名称。代码如下：
````js
import HyVehicleProperty from "@viztools/HyVehicle"; //消防车属性框
//vue中的属性
components: {
    StatusBarControl,
    ```
    HyVehicleList,
    HyVehicleProperty,
    ```
}
````