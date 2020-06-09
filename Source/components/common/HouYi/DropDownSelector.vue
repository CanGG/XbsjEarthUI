//author 谢灿
//data 2019年12月24日
// 下拉框组件，传参见props属性
// update 2020年5月8日 修改了样式 增加了点击控件外关闭下拉框功能
<template>
  <!-- v-click-outside 为自定义指令 保存在MainUI.js Vue初始化代码附近, 当点击本控件外的时候触发相应方法 -->
  <div v-click-outside="hide" class="hy-dropdownselector-select">
    <label v-if="labelText!=''" class="hy-dropdownselector-select-label">{{labelText}}:</label>
    <!-- <label class="datazbLabel"></label> -->
    <div class="hy-dropdownselector-select-div">
      <div @click="selectShow=!selectShow">
        <span class="hy-dropdownselector-select-div-text" >{{selectedGroup.name||defaultName||'全部'}}</span>
        <button class="hy-dropdownselector-select-div-btn"></button>
      </div>
      <ul  class="hy-dropdownselector-select-option" v-show="selectShow">
        <li v-for="group in groups" @click="selectChange(group)" :key="group.id">
          <span :id="group.id">{{group.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    groups:Array,             //选项数组,格式为[{id,name}]
    msg: {
      type: Boolean,
      default: false
    },
    defaultName:{
      type: String,
      default: "全部"
    },
    //标签, 默认不显示,当不为""时显示
    labelText:{
      type:String,
      default: "",
    },
    //显示事件
    showFn:{
      type:Function,
      default:()=>{}
    },
    //隐藏事件
    hideFn:{
      type:Function,
      default:()=>{}
    },
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
  watch: {
    selectShow(v){
      if(v){
        this.showFn(this);
      }else{
        this.hideFn(this);
      }
    }
  },
  methods:{
    //改变选项后触发事件selected 带参为当前选中的group
    selectChange(group) {
      this.selectedGroup = group;
      this.hide();
      if(this.msg!==false){
        layer.msg(this.msg===true?'成功获取'+group.name+'数据':this.msg,{
          offset: ['200px'],
          anim:5,
          time:2000
        });
      }
      this.$emit("selected", group);
    },
    hide(){
      this.selectShow= false;
    }
  }
}
</script>

<style scoped>
.hy-dropdownselector-select{
  display: flex;
  flex-direction: row;
  width: 100%;    
}
.hy-dropdownselector-select-label{
  text-align: left;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;    
  width: 70px;
}
.hy-dropdownselector-select-div {
  display: table-cell;
  background: rgba(0, 0, 0, 0.4);
  height: 28px;
  position: relative;
  text-align: left;
  line-height: 28px;
  cursor: pointer;
  border-radius: 3px;
  flex: 8;
  min-width: 120px;
}

.hy-dropdownselector-select-div-text {
  font-size: 12px;
  padding-left: 13px;
}
.hy-dropdownselector-select-div-btn {
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
.hy-dropdownselector-select-option {
    height: auto;
    max-height: 100px;
    background: rgba(0,0,0,1);
    border-radius: 0px 0px 4px 4px;
    list-style: none;
    border: 1px solid gray;
    overflow: auto;
    z-index: 1;
    position: absolute;
    width: calc(100% - 2px);
}
.hy-dropdownselector-select-option .li {
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: rgba(221, 221, 221, 1);
  line-height: 20px;
  border-bottom: 1px solid  gray;
  cursor: pointer;
}
.hy-dropdownselector-select-option li:hover {
  background: rgb(49, 41, 41);
  cursor: pointer;
}

.hy-dropdownselector-select-option li span {
  display: inline-block;
  height: 20px;
  margin: 0px 0px 0px 11px;
}
</style>