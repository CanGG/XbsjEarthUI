后羿更新日志
===========

### 0.0.2 - 2019-12-24

##### Additions :tada:
*增加下拉框组件,地址:Source/components/common/HouYi/DropDownSelector.vue
*更新EarthSDK至1.2.22 2019-12-23 github版本 详见CHANGLES.md
##### Fixes :wrench:




### 0.0.1 - 2019-12-20

##### Additions :tada:
*新增作战指挥组件。包含车联网和蔓延趋势。
*增加路径别名映射。@->Source/,具体查看webpack.config.js->resolve.alias
##### Fixes :wrench:
*还原的预案为之前的标绘，后续更改在新增的作战指挥组件中进行。
*修改蔓延趋势的长宽高箭头的数字位置，从中间改到末端。
*修改蔓延趋势的透明度功能，原先是统一调整3层趋势的透明度，现在可以单独设置每一次层的透明度了。
