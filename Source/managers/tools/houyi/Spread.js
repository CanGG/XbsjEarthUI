
import createArrow from "@/managers/tools/houyi/Arrow";
/**
 * @author 谢灿
 * @desc 2020年1月7日
 * @description 自制蔓延趋势模型
 * @extends XE.Obj.CustomPrimitive
 * @param earth EarthSDK的MainUI
 * @param guid guid 传入车辆id
 */
class Spread extends XE.Obj.CustomPrimitive {
  constructor(earth, guid) {
    super(earth, guid);
    console.log(this)
    this.name = "蔓延趋势";
    this.isCreating = true;
    this.init();
    let that = this;
    this.disposers.push(function(){
      that.destroyArrows();
    })
  }

  init() {
    let earth = this.earth;
    let scene = earth.czm.scene;
    // //位置数组 [经度、纬度、高度]
    this.position = [116.39, 39.9, 0].xeptr;
    this.positions = XE.Obj.CustomPrimitive.Geometry.unitSquare.positions;
    this.sts = XE.Obj.CustomPrimitive.Geometry.unitSquare.sts;
    this.indices = XE.Obj.CustomPrimitive.Geometry.unitSquare.indices;
    //缩放数组 [x向缩放、y向缩放、z向缩放]
    this.scale = [10000, 10000, 1];
    //图元背景颜色
    this.renderState = XE.Obj.CustomPrimitive.getRenderState(true, true);
    this.canvasWidth = 2048;
    this.canvasHeight = 2048;
    //在customPrimtive的normals属性中插入自定义变量.(因为vue无法动态添加根属性)
    setTimeout(() => {
      this.drawCanvas(ctx => {
        this.threeLeveltool(ctx);
      })
    }, 200);
  }

  //创建三级的蔓延趋势
  threeLeveltool(ctx) {
    console.log("绘制蔓延趋势")
    let width = this.canvasWidth;
    let height = this.canvasHeight;
    let transpOne = this.transpOne;
    let transpTwo = this.transpTwo;
    let transpThree = this.transpThree;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    let level = 4;
    //画出三级危险区域
    this.createtool(ctx, --level, "rgba(255,235,59," + transpThree + ")");
    //画出二级危险区域
    this.createtool(ctx, --level, "rgba(255,165,0," + transpTwo + ")");
    //画出一级危险区域
    this.createtool(ctx, --level, "rgba(255,0,0," + transpOne + ")");


  }

  //创建危险区域
  createtool(ctx, level, color) {
    ctx.save();
    let x = this.canvasWidth / 2 + this.xOffset(level),
      y = this.canvasHeight / 2 + this.yOffset(level);
    this.bezierEllipse(ctx, x, y, this.spreadX(level), this.spreadY(level), this.windDirection, color);
  }
  //在canvas中创建椭圆
  bezierEllipse(ctx, x, y, width, height, angle, color) {
    ctx.save();
    //关键是bezierCurveTo中两个控制点的设置
    //0.5和0.6是两个关键系数（在本函数中为试验而得）
    var ox = 0.5 * width,
      oy = 0.6 * height;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    //从椭圆纵轴下端开始逆时针方向绘制
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, height);
    ctx.bezierCurveTo(ox, height, width, oy, width, 0);
    ctx.bezierCurveTo(width, -oy, ox, -height, 0, -height);
    ctx.bezierCurveTo(-ox, -height, -width, -oy, -width, 0);
    ctx.bezierCurveTo(-width, oy, -ox, height, 0, height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  //获取椭圆的短半径
  spreadY(level) {
    return this.size * this.diffusivity * level / 10;
  }

  //获取椭圆的长半径
  spreadX(level) {
    let windPower = this.windPower / 10 +1;
    return this.size * windPower * this.diffusivity * level / 10;
  }
  
  //获取椭圆的偏移角度(根据风向)
  spreadAngle() {                   
    return Math.sin(this.windDirection * Math.PI / 180);
  }
  //椭圆心偏移距离
  rOffset(level) {
    return this.spreadX(level) / 8 * level;
  }
  //x轴偏移距离
  xOffset(level) {
    if (this.windPower === 0) {
      return 0;
    }
    let r = this.rOffset(level);
    let xoffset = Math.sqrt(this.rOffset(level) * this.rOffset(level) - this.yOffset(level) * this.yOffset(level))
    if (this.windDirection > 90 && this.windDirection <= 270) {
      xoffset = -xoffset;
    }
    return xoffset;
  }
  //y轴偏移距离
  yOffset(level) {
    if (this.windPower === 0) {
      return 0;
    }
    return this.spreadAngle() * this.rOffset(level)
  }

  //设置箭头(通过创建arrow)
  setArrows() {
    let czm = this.earth.czm;
    let startPosition = this.position;
    //求x和y变化的比例. 
    // this.spreadX(3)为长半轴原始的长度
    // /1000/111 为将米转化为经度
    // /1000/111 * cos 纬度 为将米转化为纬度
    // this.xXffset 场半轴偏移量(m)
    //  13.2为canvas画板长半轴和地球的像素转化比例
    // this.spreadX(3)*13.2/1000/111 * this.xOffset(3) / this.spreadX(3);
    // 缩略一下变为 经度偏移量为 10 /1000 /111 * this.yOffset(3)
    let xPosition = [...startPosition];
    //长半轴的纬度长度 后面是经度每米的度数
    let xR = this.spreadX(3) * 13 / 111111;
    //未偏移的长半轴末端坐标
    xPosition[0] += xR;
    let xPositionYoffset = this.spreadAngle() * xR;
    if (this.windDirection > 0 && this.windDirection <= 180) {
      xPositionYoffset = -xPositionYoffset;
    }
    let xPositionXoffset = xR - Math.sqrt(Math.pow(xR, 2) - Math.pow(xPositionYoffset, 2));
    xPosition[0] += xPositionXoffset;
    xPosition[1] += xPositionYoffset;
    //已创建箭头则进行修改 未创建则进行创建
    if (this.xArrow) {
      this.xArrow.refresh(startPosition, xPosition, this.name + '长半轴');
    } else {
      this.xArrow = new createArrow(czm, 'xArrow' + this.guid, this.name + '长半轴', startPosition, xPosition);
    }

    let yPosition = [...startPosition];
    //后面是纬度每米的度数
    let yR = this.spreadY(3) * 10 / 111111;
    yPosition[1] += yR;
    let yPositionXoffset = this.spreadAngle() * yR;
    let yPositionYoffset = yR - Math.sqrt(Math.pow(yR, 2) - Math.pow(yPositionXoffset, 2));
    yPosition[0] += yPositionXoffset;
    yPosition[1] += yPositionYoffset;
    // let yLength = 10 /1000 /111 * this.yOffset(3);
    // yPosition[0] += xLength;
    // yPosition[1] += yLength;
    if (this.yArrow) {
      this.yArrow.refresh(startPosition, yPosition, this.name + '短半轴');
    } else {
      this.yArrow = new createArrow(czm, 'yArrow' + this.guid, this.name + '短半轴', startPosition, yPosition);
    }

    let zPosition = [...startPosition];
    zPosition[2] += this.size * (this.diffusivity + 1);
    if (this.zArrow) {
      this.zArrow.refresh(startPosition, zPosition, this.name + '高度');
    } else {
      this.zArrow = new createArrow(czm, 'zArrow' + this.guid, this.name + '高度', startPosition, zPosition);
    }
  }
  
  //销毁箭头
  destroyArrows() {
    this.xArrow.destroy();
    this.yArrow.destroy();
    this.zArrow.destroy();
  }
}

Spread.defaultOptions = {
  freelyMove: true,
  size: 10,
  windDirection: 30,
  windPower: 4,
  transpOne: 0.6,
  transpTwo: 0.6,
  transpThree: 0.6,
  canvasWidth: 2048,
  canvasHeight: 2048,
  diffusivity: 1,
};

Spread.registerType(Spread, "HySpread");

export default Spread;