import HyCustomGroundRectangle from './custom_ground_rectangle'

/**
 * 以实体为中心创建一个自定义贴地图元, HyCustomGroundRectangle
 * 用于绘制各种自定义贴地图元-圆
 * @author 谢灿
 * @desc 2020年5月21日
 */
class HyCustomGroundRectangleCircle extends HyCustomGroundRectangle{

    /**
     * 在画板上绘制圆
     * @param {Double} radius 圆的半径
     * @param {Bollean} isFill 是否为填充 true/false
     * @param {String} rgba 颜色和透明度 rgba(r,g,b,a)
     */
    draw(radius,isFill,rgba){
      rgba = rgba || 'rgba(255,255,0,1)'
      this.czmObj.drawCanvas(ctx=>{
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.arc(256,256, radius, 0, 2*Math.PI);
          if(isFill){
              ctx.fillStyle = rgba;
              ctx.fill();
          }else{
              ctx.strokeStyle = rgba;
              ctx.stroke();
          }
          ctx.restore();
      });
  }

    /**
     * 在画板上绘制半径
     * @param {Double} radius 半径
     * @param {Bollean} isFill 是否为填充 true/false
     * @param {String} rgba 颜色和透明度 rgba(r,g,b,a)
     */
    drawRadius(radius,rgba){
        rgba = rgba || 'rgba(255,70,0,1)'
        this.czmObj.drawCanvas(ctx=>{
            ctx.save();
            ctx.moveTo(256,256);
            ctx.lineTo(256+radius,256);
            ctx.strokeStyle = rgba;
            ctx.stroke();
            ctx.restore();
        });
    }
  
  /**
   * 在画板上绘制动画扫描圆
   * @author 谢灿
   * @desc 2020年5月21日
   * @param {Double} radius 圆的半径
   * @param {String} rgba 颜色和透明度 rgba(r,g,b,a)
   */
  drawScan(radius, rgba){
      let that = this;
      //1将参数放入model,用于3的刷新事件
      that.czmObj.radius = radius;
      that.czmObj.rgba = rgba;
      
      //2创建扫描图像
      Cesium.Resource.createIfNeeded('../assets/images/circle.png').fetchImage().then(function(image) {
          console.log('image loaded!');
          that.czmObj._ctx_image = image;
      });

      //3在model的刷新事件中添加画圆图片
      that.czmObj.preUpdateEvalString += `
      //3.1初始化图片旋转角度
      if (typeof p.dAngle === 'undefined'){
          p.dAngle = 360.0
      };
      //3.2每次刷新角度-1
      p.dAngle -= 1.0;
      if (p.dAngle < 0.0) {
          p.dAngle = 360.0;
      }
      //3.3旋转角度
      const rotation = p.dAngle / 180.0 * Math.PI;

      //3.4获取边缘颜色
      let rgba = p.rgba || 'rgba(255,255,0,1)';

      //3.5开始画圆
      p.drawCanvas(ctx=>{

          //3.6清除画板
          ctx.clearRect(0,0,512,512);
          ctx.save();
          ctx.beginPath();

          //3.7绘制边缘
          ctx.lineWidth = 1;
          ctx.arc(256,256, p.radius, 0, 2*Math.PI);
          ctx.strokeStyle = rgba;
          ctx.stroke();
          ctx.restore();

          //3.8绘制图片
          if (p._ctx_image) {
              ctx.save();
              //3.9将画板绘制点移动到中心点 256,256
              ctx.translate(256, 256); 
              //3.10旋转图片
              ctx.rotate(rotation);

              // 3.11
              // 此处比较特殊
              // 在3.9 3.10把画板绘制点移动到中心后直接画出来的东西的实际坐标为 256+image.height/2, 256+image.width/2
              // 因此需要把便宜的坐标 减去图片的高宽的半即 image.width/2, image.height/2
              // 此处图片大小在3.12中设置为了圆的直径, 因此此处减去的是圆的半径
              ctx.translate(-p.radius, -p.radius);

              // 3.12绘制图片, 缩放图片高宽为p.raidus*2 即圆直径
              ctx.drawImage(p._ctx_image, 0, 0 , p.radius*2, p.radius*2);
              ctx.restore();
          }
      });
      `
  }
}
export default HyCustomGroundRectangleCircle;