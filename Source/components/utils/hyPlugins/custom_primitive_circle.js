import HyCustomPrimitive from './custom_primitive'

/**
 * 以实体为中心创建一个自定义图元, 且可用draw方法画出圆. 继承了HyCustomPrimitive
 * @author 谢灿
 * @date 2019年12月9日
 */
class HyCustomPrimitiveCircle extends HyCustomPrimitive{

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
            ctx.clearRect(0, 0, 512, 512);
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(256,256, radius, 0, 2*Math.PI);
            if(isFill){
                ctx.fillStyle = 'rgba(255,255,0,1)';
                ctx.fill();
            }else{
                ctx.strokeStyle = 'rgba(255,255,0,1)';
                ctx.stroke();
            }
            ctx.restore();
        });
    }
}

export default HyCustomPrimitiveCircle;