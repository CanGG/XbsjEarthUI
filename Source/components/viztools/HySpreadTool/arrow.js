/**
 * author 谢灿
 * date 2019年12月20日
 * description 创建箭头(后续应作为utils 插件)
 * update 2019年12月20日 修改箭头的距离文字位置为末端
 */
class Arrow {

    constructor(czm, id, name, startPosition, endPosition) {
        this.czm = czm;
        this.id = id;
        this.name = name;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.init();
    }
    getPosition(){
        let cnf = this;
        return [...cnf.startPosition, ...cnf.endPosition]
    }
    getMidPosition(){
        let x = (this.endPosition[0] + this.startPosition[0]) / 2;
        let y = (this.endPosition[1] + this.startPosition[1]) / 2;
        let z = (this.endPosition[2] + this.startPosition[2]) / 2;
        return [x,y,z];
    }
    init() {
        let cnf = this;
        
        cnf.entity = cnf.czm.viewer.entities.add({
            id: cnf.id,
            name: cnf.name,
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(cnf.getPosition()),
                width: 10,
                arcType: Cesium.ArcType.GEODESIC,
                material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.WHITE)
            }
        })

        let endPosition = this.endPosition;
        cnf.label = cnf.czm.viewer.entities.add({
            position : Cesium.Cartesian3.fromDegrees(endPosition[0],endPosition[1],endPosition[2]),
            label : {
                text: cnf.getSpaceDistance([this.startPosition,this.endPosition]) + "m",
                font : '20px sans-serif',
                pixelOffset : new Cesium.Cartesian2(0.0, -20),
                // 根据距离缩放pixelOffset
                pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0),
                // 根据距离的透明度。
                translucencyByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e5, 0)
            }
        });
    }
    //空间两点距离计算函数
    getSpaceDistance(positions) {
        var distance = 0;
        for (var i = 0; i < positions.length - 1; i++) {

            var point1cartographic = Cesium.Cartographic.fromDegrees(positions[i][0],positions[i][1],positions[i][2]);
            var point2cartographic = Cesium.Cartographic.fromDegrees(positions[i + 1][0],positions[i + 1][1],positions[i + 1][2]);

            /**根据经纬度计算出距离**/
            var geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            distance = distance + s;
        }
        return distance.toFixed(2);
    }

    refresh(startPosition, endPosition, name){
        let cnf = this;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.name = name;

        if(!!name) {
            this.entity.name = name;
        }

        cnf.label.position = Cesium.Cartesian3.fromDegrees(endPosition[0],endPosition[1],endPosition[2]);
        cnf.entity.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(cnf.getPosition());
    
        return true;
    }
    destroy() {
        this.czm.viewer.entities.remove( this.label);
        this.czm.viewer.entities.remove( this.entity);
    }

    getEntity() {
        return this.entity;
    }
}
export default Arrow;