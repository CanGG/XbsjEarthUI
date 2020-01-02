后羿更新日志
===========

### 0.0.3 - 

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
