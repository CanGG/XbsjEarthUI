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
      <div class="xbsj-list-item xbsj-list-lastitem">
        <span class="xbsj-list-name">{{lang.dispatch}}</span>
        <!-- 车辆实时位置 -->
        <div class="xbsj-item-btnbox"  @click="vehiclePositionShow = !vehiclePositionShow">
          <div class="xbsj-item-btn vehiclePositionButton" :class="vehiclePositionShow?'vehiclePositionButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.vehiclePosition}}</span>
        </div>
        <!-- 车辆出动情况 -->
        <div class="xbsj-item-btnbox" @click="vehicleMovementShow = !vehicleMovementShow">
          <div class="xbsj-item-btn vehicleMovementButton" :class="vehicleMovementShow?'vehicleMovementButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.vehicleMovement}}</span>
        </div>
        <!-- 灭火药剂查询 -->
        <div class="xbsj-item-btnbox" @click="potionQueryShow = !potionQueryShow">
          <div class="xbsj-item-btn potionQueryButton" :class="potionQueryShow?'potionQueryButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.potionQuery}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languagejs from "./index_locale";

export default {  
  components: {
  },
  data() {
    return {
      vehicleOutShow:false,
      selectlist: false,
      lang: {},
      langs: languagejs,
      vehiclePositionShow:false,
      vehicleMovementShow: false,
      potionQueryShow: false,
      show: true
    };
  },
  created() {},
  mounted() {
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
    }
  }
};
</script>

<style>
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

