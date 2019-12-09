
/**
 * 在model附近创建文本标签
 * @author 谢灿
 * @date 2019年12月9日
 */
class HyLabel{
    /**
     * 构造函数
     * @param {XE.Obj.*} model 模型实体
     * @param {Array} offset 偏移量[x,y] 默认为0,25 在模型正下方
     */
    constructor(model,offset){
        this.model = model;
        this.offset = offset || [0,25];
        this.isConstant = true;
        this.label = this.init();
    }

    /**
     * 初始化方法, 添加文本
     */
    init(){
        let that = this;
        let viewer = this.model.earth.czm.viewer;
        let label = viewer.entities.add({
            position :  new Cesium.CallbackProperty(function(time,result){
              return that.getPosition();
            }, false),
            label : {
                text: new Cesium.CallbackProperty(function(time, result){
                    return that.getText();
                }, false),
                font : '5px sans-serif',
                pixelOffset : new Cesium.Cartesian2(that.offset[0],that.offset[1]),
                // 根据距离缩放pixelOffset
                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0),
                // 根据距离的透明度。
                translucencyByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0)
            }
        });
        return label;
    }

    /**
     * 获取坐标
     */
    getPosition() {
        let Model = this.model;
        return Cesium.Cartesian3.fromRadians(Model.xbsjPosition[0],Model.xbsjPosition[1],Model.xbsjPosition[2]);
    }
    /**
     * 获取文本
     * 目前默认为 坐标
     */
    getText() {
        let Model = this.model;
        return [...Model.xbsjPosition].xeptd.join('\n\r');

    }
}

export default HyLabel;