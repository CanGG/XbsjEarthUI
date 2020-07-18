//author 谢灿
//date 2020年1月14日
//description 调度 组件
<template>
  <!-- box -->
  <div class="xbsj-template">
    <div
      class="xbsj-list"
      ref="container"
      @mousedown="startMove($event)"
      @mousemove="onMoving($event)"
      @mouseup="endMove($event)"
    >
      <!-- 调度 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.dispatch}}</span>
        <!-- 选择预案 -->
        <div class="xbsj-item-btnbox" @click="dispatchManeuverShow=!dispatchManeuverShow">
          <div
            class="xbsj-item-btn disasterButton"
            :class="dispatchManeuverShow?'disasterButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.disaster}}</span>
        </div>
        <!-- 调度记录 -->
        <div class="xbsj-item-btnbox" @click="showDispatchRecord()">
          <div
            class="xbsj-item-btn dispatchRecordButton"
            :class="dispatchRecordShow?'dispatchRecordButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.dispatch_record}}</span>
        </div>
        <!-- 调度状态 -->
        <!-- <div class="xbsj-item-btnbox" @click="dispatchStatusShow = !dispatchStatusShow">
          <div
            class="xbsj-item-btn statusWatchButton"
            :class="dispatchStatusShow?'statusWatchButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.dispatchStatus}}</span>
        </div> -->
        <!-- 作战任务一键下达 -->
        <!-- <div class="xbsj-item-btnbox" @click="taskShow =! taskShow">
          <div class="xbsj-item-btn assignmentButton" :class="taskShow?'assignmentButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.assignment}}</span>
        </div> -->
      </div>

      <!-- 战斗 -->
      <div class="xbsj-list-item xbsj-list-lastitem">
        <span class="xbsj-list-name">{{lang.fighting}}</span>
        <!-- 车辆位置跟踪 -->
        <div class="xbsj-item-btnbox"  @click="showVehiclePosition">
          <div
            class="xbsj-item-btn vehiclePositionButton"
            :class="vehiclePositionShow?'vehiclePositionButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehiclePosition}}</span>
        </div>
        <!-- 车辆视频跟踪 -->
        <div class="xbsj-item-btnbox" @click="showVehicleVideo">
          <div
            class="xbsj-item-btn vehicleVideoButton"
            :class="vehicleVideoShow?'vehicleVideoButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehicleVideo}}</span>
        </div>
        <!-- 车辆出动情况 -->
        <div class="xbsj-item-btnbox" @click="showVehicleMovement">
          <div
            class="xbsj-item-btn vehicleMovementButton"
            :class="vehicleMovementShow?'vehicleMovementButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehicleMovement}}</span>
        </div>
        <!-- 灭火药剂查询 -->
        <div class="xbsj-item-btnbox"  @click="showPotionQuery">
          <div
            class="xbsj-item-btn potionQueryButton"
            :class="potionQueryShow?'potionQueryButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.potionQuery}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languagejs from "./index_locale";
export default {
  components: {},
  data() {
    return {
      vehicleOutShow: false,
      selectlist: false,
      lang: {},
      langs: languagejs,
      vehiclePositionShow: false,
      vehicleMovementShow: false,
      vehicleVehicleShow: false,
      vehicleVideoShow: false,
      potionQueryShow: false,
      dispatchManeuverShow: false,
      dispatchStatusShow: false,
      taskShow: false,
      dispatchRecordShow: false,
      show: true,
    };
  },
  created() {},
  mounted() {
    let that = this;
  },
  methods: {
    startMove(event) {
      if (
        event.target.parentElement !== this.$refs.container &&
        event.target.parentElement.parentElement !== this.$refs.container
      ) {
        this.moving = false;
        return;
      }
      this.moving = true;
    },
    onMoving(event) {
      //获取鼠标和为开始位置的插值，滚动滚动条
      if (!this.moving) return;
      var dom = this.$refs.container;
      var wleft = dom.scrollLeft - event.movementX;
      if (wleft >= 0 && wleft <= dom.scrollWidth - dom.clientWidth) {
        dom.scrollLeft = wleft;
      }
    },
    endMove(envent) {
      this.moving = false;
    },
    /**
     * 显示位置跟踪面板 面板通过打开新页面的形式展现
     * 展现的面板保存在当前vue模板的data中, 监听新窗口关闭事件,关闭时设置按钮显示为false; 
     * 同时也监听按钮点击事件 当触发关闭事件时 关闭弹出的窗口
     */
    showVehiclePosition() {
      let that = this;
      if (!this.vehiclePositionShow) {
          this.vehiclePositionShow = true;
          that.vehiclePositionWinObj = window.open("http://www.smartmgxf.com/digitalplan/plan/emergency_rescue.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
          var loop = setInterval(function() {   
            if(that.vehiclePositionWinObj.closed) {  
                clearInterval(loop);  
                that.vehiclePositionShow = false;
            }  
          }, 1000);
      } else {
        that.vehiclePositionWinObj.close();
        this.vehiclePositionShow = false;
      }
    },
    /**
     * 显示调度记录
     */
    showPotionQuery(){
      let that = this;
      if (!this.potionQueryShow) {
          this.potionQueryShow = true;
          that.potionQueryWinObj = window.open("http://www.smartmgxf.com/earthui_h5/pages/index.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
          var loop = setInterval(function() {   
            if(that.potionQueryWinObj.closed) { 
                clearInterval(loop);  
                that.potionQueryShow = false;
            }  
          }, 1000);
      } else {
        that.potionQueryWinObj.close();
        this.potionQueryShow = false;
      }
    },
    //显示视频跟踪面板
    showVehicleVideo(){
      let that = this;
      if (!this.vehicleVideoShow) {
          this.vehicleVideoShow = true;
          that.vehicleVideoWinObj = window.open("http://www.smartmgxf.com/earthui_h5/pages/video_tracking.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
          var loop = setInterval(function() {   
            if(that.vehicleVideoWinObj.closed) { 
                clearInterval(loop);  
                that.vehicleVideoShow = false;
            }  
          }, 1000);
      } else {
        that.vehicleVideoWinObj.close();
        this.vehicleVideoShow = false;
      }
    },
    //显示出动情况
    showVehicleMovement(){
      let that = this;
      if (!this.vehicleMovementShow) {
          this.vehicleMovementShow = true;
          that.vehicleMovementWinObj = window.open("http://www.smartmgxf.com/earthui_h5/pages/assessment.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
          var loop = setInterval(function() {   
            if(that.vehicleMovementWinObj.closed) { 
                clearInterval(loop);  
                that.vehicleMovementShow = false;
            }  
          }, 1000);
      } else {
        that.vehicleMovementWinObj.close();
        this.vehicleMovementShow = false;
      }
    },
    //调度记录
    showDispatchRecord(){
      let that = this;
      if (!this.dispatchRecordShow) {
          this.dispatchRecordShow = true;
          that.dispatchRecordWinObj = window.open("http://www.smartmgxf.com/earthui_h5/pages/dispatch_record.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
          var loop = setInterval(function() {   
            if(that.dispatchRecordWinObj.closed) { 
                clearInterval(loop);  
                that.dispatchRecordShow = false;
            }  
          }, 1000);
      } else {
        that.dispatchRecordWinObj.close();
        this.dispatchRecordShow = false;
      }
    }
    
  }
};
</script>

<style>
.assignmentButton {
  background: url(../../../../images/assignment.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.assignmentButtonActive {
  background: url(../../../../images/assignment_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.assignmentButton:hover {
  background: url(../../../../images/assignment_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.statusWatchButton {
  background: url(../../../../images/status_watch.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.statusWatchButtonActive {
  background: url(../../../../images/status_watch_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.statusWatchButton:hover {
  background: url(../../../../images/status_watch_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButton {
  background: url(../../../../images/disaster.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.disasterButtonActive {
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.disasterButtonButton:hover {
  background: url(../../../../images/disaster_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehiclePositionButton {
  background: url(../../../../images/vehicle_position.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehiclePositionButton:hover {
  background: url(../../../../images/vehicle_position_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehiclePositionButtonActive {
  background: url(../../../../images/vehicle_position_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.vehicleMovementButton {
  background: url(../../../../images/vehicle_movement.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehicleMovementButton:hover {
  background: url(../../../../images/vehicle_movement_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehicleMovementButtonActive {
  background: url(../../../../images/vehicle_movement_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.vehicleVideoButton {
  background: url(../../../../images/vehicle_video.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehicleVideoButton:hover {
  background: url(../../../../images/vehicle_video_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.vehicleVideoButtonActive {
  background: url(../../../../images/vehicle_video_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.potionQueryButton {
  background: url(../../../../images/potion_query.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.potionQueryButton:hover {
  background: url(../../../../images/potion_query_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.potionQueryButtonActive {
  background: url(../../../../images/potion_query_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

.dispatchRecordButton{
  background: url(../../../../images/plan_search.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.dispatchRecordButton:hover{
  background: url(../../../../images/plan_search_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.dispatchRecordButtonActive{
  background: url(../../../../images/plan_search_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}

</style>

