//author 谢灿
//data 2019年12月24日
// 下拉框组件，传参见props属性
<template>
  <div class="hy-select">
    <label v-if="labelText!=''" class="hy-select-label">{{labelText}}:</label>
    <!-- <label class="datazbLabel"></label> -->
    <div class="hy-select-div" @click="selectShow=!selectShow">
      <span class="hy-select-div-text">{{selectedGroup.name||defaultName||'全部'}}</span>
      <button class="hy-select-div-btn"></button>
    </div>
    <ul class="hy-select-option" v-show="selectShow">
      <li v-for="group in groups" @click="selectChange(group)" :key="group.id">
        <span :id="group.id">{{group.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    changeHandler: Function,  //改变选项后触发的回调函数 带参为当前选中的group
    groups:Array,             //选项数组,格式为[{id,name}]
    defaultName:{
      type: String,
      default: "全部"
    },
    //标签, 默认不显示,当不为""时显示
    labelText:{
      type:String,
      default: "",
    }
  },
  data(){
    return {
      selectedGroup: {
        id: "",
        name: ""
      },
      selectShow: false,
    }
  },
  mounted(){
    
  },
  methods:{
    selectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
      layer.msg('成果获取'+group.name+'数据',{
        offset: ['200px'],
        anim:5,
        time:2000
      });
      this.changeHandler(group);
    }
  }
}
</script>

<style scoped>
.hy-select{
  width:100%;
  position: relative;
}
.hy-select-label{
  text-align: center;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 2;
}
.hy-select-div {
  display: table-cell;
  background: rgba(0, 0, 0, 0.4);
  height: 28px;
  position: relative;
  text-align: left;
  line-height: 28px;
  cursor: pointer;
  padding-left: 13px;
  border-radius: 3px;
  flex: 8;
  min-width: 120px;
}

.hy-select-div-text {
  font-size: 12px;
}
.hy-select-div-btn {
  width: 12px;
  height: 10px;
  border: none;
  background: url(../../../images/titles-select.png) no-repeat;
  background-size: contain;
  cursor: pointer;
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  outline: none;
}
.hy-select-option {
  height: auto;
  max-height: 100px;
  background: rgba(138, 138, 138, 1);
  border-radius: 0px 0px 4px 4px;
  list-style: none;
  overflow: auto;
  z-index: 1;
  position: absolute;
  width: 100%;
  margin-top: 30px;
}
.hy-select-option .li {
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: rgba(221, 221, 221, 1);
  line-height: 20px;
  cursor: pointer;
}
.hy-select-option li:hover {
  background: rgb(49, 41, 41);
  cursor: pointer;
}

.hy-select-option li span {
  display: inline-block;
  height: 20px;
  margin: 0px 0px 0px 11px;
}
</style>