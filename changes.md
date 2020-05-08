后羿更新日志
===========
### 0.0.5 - 2020年5月8日

##### Additions :tada:
* 完成推演中的添加事件点按钮功能
* 在Source/managers/tools/houyi文件夹中添加了自定义组件的说明文件readme.md
* 增加laydate组件, 用于创建日期组件(layui.laydate,要在vue的mounted钩子中初始化。),使用方法参考[laydate](https://www.layui.com/laydate/)
* 增加了HyDatePicker日期选取组件
* 新增了调度的三个组件

##### Fixes :wrench:
* layui组件调整,不再使用在MainUi.js中import的方式进行引用，直接在需要用的vue页面通过import layui-src 和 layui.css使用。
* 修改后羿Vue组件的注册方式，改为在MainUI.js中全局注册使用。现在不需要在vue页面中注册相关的组件了。
* 优化了DropDownSelector组件
* 调整了推演功能栏中的事件点面板
--------

### 0.0.4 - 2020-2-28
##### Additions :tada:
* 场景保存和加载
1)在Managers中增加HyScene.js(后羿场景控制类)和HyServer.js(后羿服务控制类)两个js类,用于实现场景相关和服务相关方法。
2)在一级菜单中增加后羿场景保存按钮（Hy保存)，用于实现后羿场景保存功能。
3)车模型保存与加载。
##### Fixes :wrench:
*图层管理中的消防车属性不是其正确的属性框
*修复模型隐藏时其作战半径和参数不会同时隐藏的BUG.

--------
### 0.0.3 - 2020-1-2

##### Additions :tada:
*增加消防车模型的属性窗口,目前完成操作面板标签和性能参数标签。
*消防车模型添加后能在图层管理和消防车列表中看到
*模型之间连线(可以设置颜色,粗细)

##### Fixes :wrench:
*修复下拉框组件在滚动窗口时，下拉面板位置出错。
*修复推演&指挥标签未被选中时,消防车辆列表面板和消防车属性面板隐藏。

--------
### 0.0.2 - 2019-12-24

##### Additions :tada:
*增加下拉框组件,地址:Source/components/common/HouYi/DropDownSelector.vue
*更新EarthSDK至1.2.22 2019-12-23 github版本，详见 CHANGLES.md
*增加弹窗组件layui-layer，并修改样式符合EarthSDK，调用方法直接使用layer即可,如:layer.msg('文字')。具体参考[layui](http://layer.layui.com/)官网
##### Fixes :wrench:


--------
### 0.0.1 - 2019-12-20

##### Additions :tada:
*新增作战指挥组件。包含车联网和蔓延趋势。
*增加路径别名映射。@->Source/,具体查看webpack.config.js->resolve.alias
##### Fixes :wrench:
*还原的预案为之前的标绘，后续更改在新增的作战指挥组件中进行。
*修改蔓延趋势的长宽高箭头的数字位置，从中间改到末端。
*修改蔓延趋势的透明度功能，原先是统一调整3层趋势的透明度，现在可以单独设置每一次层的透明度了。
