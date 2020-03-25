//author 谢灿
//date 2020年1月14日
//description 预案 组件
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
        <!-- 预案 -->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.plan}}</span>
        <!-- 预案查询 -->
        <div class="xbsj-item-btnbox"  @click="planManagementShow = !planManagementShow">
          <div class="xbsj-item-btn planSearchButton" :class="planManagementShow?'planSearchButtonActive':''"></div>
          <span class="xbsj-item-name">{{lang.planSearch}}</span>
        </div>
        <!-- 作战任务一键下达 -->
        <div class="xbsj-item-btnbox">
          <div class="xbsj-item-btn assignmentButton"></div>
          <span class="xbsj-item-name">{{lang.assignment}}</span>
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
      vehicleShow:false,
      selectlist: false,
      planManagementShow: false,
      lang: {},
      langs: languagejs,
      SpreadShow:false,
      EntityMoreShow: false,
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
.assignmentButton {
  background: url(../../../../images/assignment.png) no-repeat;
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
</style>

