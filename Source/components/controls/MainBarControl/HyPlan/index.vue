//author 谢灿
//date 2020年1月14日
//description 演练 组件
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
      <!-- 演练 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.plan}}</span>
        <!-- 演练管理 -->
        <div class="xbsj-item-btnbox" @click="planManagementShow = !planManagementShow">
          <div
            class="xbsj-item-btn planSearchButton"
            :class="planManagementShow?'planSearchButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.planSearch}}</span>
        </div>
        <!-- 演练状态 -->
        <div class="xbsj-item-btnbox" @click="showPlanStatus">
          <div
            class="xbsj-item-btn statusWatchButton"
            :class="planStatusShow?'statusWatchButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.planStatus}}</span>
        </div>
        <!-- 作战任务一键下达 -->
        <div class="xbsj-item-btnbox" @click="showTask">
          <div class="xbsj-item-btn assignmentButton" :class="taskShow?'assignmentButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.assignment}}</span>
        </div>
      </div>

      <!-- 演练评估 -->
      <div class="xbsj-list-item xbsj-list-lastitem">
        <span class="xbsj-list-name">{{lang.planAssess}}</span>
        <!-- 实时跟踪 -->
        <div class="xbsj-item-btnbox" @click="showVehiclePosition">
          <div
            class="xbsj-item-btn vehiclePositionButton" :class="vehiclePositionShow?'vehiclePositionButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehiclePosition}}</span>
        </div>
        <!-- 视频跟踪 -->
        <div class="xbsj-item-btnbox" @click="showVehicleVideo">
          <div
            class="xbsj-item-btn vehicleVideoButton"
            :class="vehicleVideoShow?'vehicleVideoButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehicleVideo}}</span>
        </div>
        <!-- 出动情况 -->
        <div class="xbsj-item-btnbox" @click="showVehicleMovement">
          <div
            class="xbsj-item-btn vehicleMovementButton"
            :class="vehicleMovementShow?'vehicleMovementButtonActive':''"
          ></div>
          <span class="xbsj-item-name">{{lang.vehicleMovement}}</span>
        </div>
        
        <!-- 灭火药剂查询 -->
        <div class="xbsj-item-btnbox" @click="showPotionQuery">
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
      vehicleShow: false,
      selectlist: false,
      planManagementShow: false,
      vehiclePositionShow:false,
      vehicleVideoShow:false,
      vehicleMovementShow: false,
      planStatusShow: false,
      potionQueryShow:false,
      taskShow: false,
      lang: {},
      langs: languagejs,
      SpreadShow: false,
      EntityMoreShow: false,
      show: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 显示位置跟踪面板 面板通过打开新页面的形式展现
     * 功能全在HyVehiclePosition.js中 通过监听show来实现,具体看Source\managers\tools\HyVehiclePosition.js
     */
    showVehiclePosition() {
      let that = this;
      if (!this.vehiclePositionShow) {
          this.vehiclePositionShow = true;
      } else {
        this.vehiclePositionShow = false;
      }
    },
    showVehicleVideo() {
      if (!this.vehicleVideoShow) {
        // if (this.$root.$hyControls.plan.id !== -1) {
          this.vehicleVideoShow = true;
        // } else {
        //   layer.msg("请先在演练管理中开始一场演练!");
        // }
      } else {
        this.vehicleVideoShow = false;
      }
    },
    showVehicleMovement() {
      if (!this.vehicleMovementShow) {
        // if (this.$root.$hyControls.plan.id !== -1) {
          this.vehicleMovementShow = true;
        // } else {
        //   layer.msg("请先在演练管理中开始一场演练!");
        // }
      } else {
        this.vehicleMovementShow = false;
      }},
    showTask() {
      if (!this.taskShow) {
        // if (this.$root.$hyControls.plan.id !== -1) {
          this.taskShow = true;
        // } else {
        //   layer.msg("请先在演练管理中开始一场演练!");
        // }
      } else {
        this.taskShow = false;
      }
    },
    showPlanStatus(){
      if (!this.planStatusShow) {
        // if (this.$root.$hyControls.plan.id !== -1) {
          this.planStatusShow = true;
          // window.open("http://www.smartmgxf.com/digitalplan/plan/emergency_rescue.html", "_blank", "left=262,top=250,heigh=582,width=385,scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
        // } else {
        //   layer.msg("请先在演练管理中开始一场演练!");
        // }
      } else {
        this.planStatusShow = false;
      }
    },
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
.planSearchButton {
  background: url(../../../../images/plan_search.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.planSearchButtonActive {
  background: url(../../../../images/plan_search_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.planSearchButton:hover {
  background: url(../../../../images/plan_search_on.png) no-repeat;
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
</style>

