//author 张杰
//date 2020年7月3日
//description 状态 组件
<template>
  <!-- box -->
  <div class="hyStatusDisplay noselect" v-show="show">
        <p class="hyStatusContent" v-for="(item,index) in hyStatusDisplayData" :key="index+'_hyStatusDisplayData'">
            <span class="title">
                {{item.title}}：
            </span>
            {{item.content}}
        </p>
        
      </div>
</template>

<script>

export default {
  
  data() {
    return {
      hyStatusDisplayData:[
          {
              title:"调度状态",
              content:"进行中"
          },
          {
              title:"预案名称",
              content:"预案1"
          }, 
          {
              title:"灾害部位",
              content:"罐区"
          },
      ],
      show: false,
    };
  },
  created() {},
  mounted() {
    let that = this;
  },
  methods: {
    
  }
};
</script>

<style>
.hyStatusDisplay{      
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  
}
.hyStatusDisplay .hyStatusContent{
  float: left;
  margin: 2px 10px;
}

.hyStatusDisplay .hyStatusContent .title{
  font-size: 14px;
}

.noselect {

  -webkit-touch-callout: none; /* iOS Safari */

  -webkit-user-select: none; /* Chrome/Safari/Opera */

  -khtml-user-select: none; /* Konqueror */

  -moz-user-select: none; /* Firefox */

  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none; /* Non-prefixed version, currently

  not supported by any browser */

}
</style>

