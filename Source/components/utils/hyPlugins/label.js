
/**
 * 在model附近创建文本标签
 * @author 谢灿
 * @desc 2019年12月9日
 */
class HyLabel{
    /**
     * 构造函数
     * @constructor
     * @param {Object} cnf              为参数对象, 具体参数如下
     * @param {XE.Obj} model          模型实体
     * @param {Array} offset            偏移量[x,y] 默认为0,30 在模型正下方
     * @param {Cesium.Color} color    字体颜色, 传值为Cesium.Color下的属性, 默认为white
     * @param {Stirng} fontSize         字号 默认为5px
     * @param {HorizontalOrigin} horizontalOrigin 水平对齐方式 默认为Cesium.horizontalOrigin.CENTER
     * @param {Function} textFnc        文本方法 返回本文内容 默认为模型的坐标
     * @param {Function} positionFnc    返回label坐标, 默认为模型的坐标
     */
    constructor(cnf){
        this.model = cnf.model;
        this.offset = cnf.offset || [0,30];
        this.isConstant = true;
        this.positionFnc = cnf.positionFnc;
        this.textFnc = cnf.textFnc;
        this.horizontalOrigin = cnf.horizontalOrigin || Cesium.HorizontalOrigin.CENTER;
        this.fontSize = cnf.fontSize || 5;
        this.color = cnf.color || Cesium.Color.WHITE;
        this.label = this.init();
        // console.log(this.label);
        let that = this;
        //显隐与对象绑定
        XE.MVVM.watch(this.model,'show', (show)=>{
            that.label.show = show
        })
    }

    /**
     * 初始化方法, 添加文本
     */
    init(){
        let that = this;
        let viewer = this.model.earth.czm.viewer;
        let label = viewer.entities.add({
            position :  that.getPosition(),
            label : {
                text: that.getText(),
                backgroundColor:new Cesium.Color(0.165, 0.165, 0.165, 1),
                fillColor: that.color,
                font : that.fontSize+'px sans-serif',
                horizontalOrigin: that.horizontalOrigin,
                pixelOffset : new Cesium.Cartesian2(that.offset[0],that.offset[1]),
                // 根据距离缩放pixelOffset
                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0),
                // 根据距离的透明度。
                translucencyByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0)
            }
        });
        //销毁model时 同时销毁文本
        this.model.disposers.push(()=>{
            viewer.entities.remove(label);
        })
        return label;
    }

    /**
     * 获取坐标
     */
    getPosition() {
        let Model = this.model;
        if(this.positionFnc ){
           return this.positionFnc(); 
        } else{
            return new Cesium.CallbackProperty(function(time,result){
                return Cesium.Cartesian3.fromRadians(Model.xbsjPosition[0],Model.xbsjPosition[1],Model.xbsjPosition[2]);
            }, false);
        }
    }
    /**
     * 获取文本
     * 目前默认为 坐标
     */
    getText() {
        let Model = this.model;
        if(this.textFnc){
           return this.textFnc(); 
        }  else{
            return new Cesium.CallbackProperty(function(time, result){
                let position = [...Model.xbsjPosition].xeptd;
                position[0] = position[0].toFixed(7);
                position[1] = position[1].toFixed(7);
                position[2] = position[2].toFixed(7);
                return position.join('，');
            }, false)

        }
    }
    
}

export default HyLabel;