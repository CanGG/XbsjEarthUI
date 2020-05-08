// author 张杰
// date 2020年4月1日
// task 作战任务下达
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show=false"
      v-show="show"
      :floatLayer="'center'"
      :width="1024"
      :minWidth="1024"
      :height="500"
      :title="lang.title"
      class="hy-mainwindow"
    >
      <div class="plan-base">
        <div class="plan-title">预案基础信息:</div>
        <div class="plan-info">
          <div>重点部位名称:</div>
          <div>预案制作人:</div>
        </div>
        <div class="plan-info">
          <div>灾害等级:</div>
          <div>预案制作时间:</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="plan-fightforce">
        <div class="plan-title">作战力量信息：</div>
      </div>
      <div class="layui-form">
        <table class="layui-table">
          <colgroup>
            <col width="150">
            <col width="150">
            <col width="200">
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>作战单元</th>
              <th><input v-on:click="choose_all" type="checkbox" value="Car" v-model="checkbox" />力量组成</th>
              <th>作战任务</th>
            </tr> 
          </thead>
            <tbody 
            v-for="(item,i) in table_data" 
            v-bind:key="item.key_id">
              <tr>
                <td v-bind:rowspan="item.carts.length">{{item.unit_name}}</td>
                <td><input v-model="checkboxs" type="checkbox" value="Car" />{{item.carts[0].cart_name}}</td>
                <td>{{item.carts[0].combat_mission}}</td>
              </tr>
              <tr v-for="(value,key) in item.carts" v-bind:key="value.key_id" v-if="key>0">
                <td><input v-model="checkboxs" type="checkbox" value="Car" />{{value.cart_name}}</td>
                <td>{{value.combat_mission}}</td>
              </tr>
            </tbody>
          
        </table>  
      </div>
      <div class="submit_button">一键下达</div>
    </Window>
    
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import "layui-src";
import "layui-src/dist/css/layui.css";

export default {

  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      key: "",
      error: "",
      selectedGroup: {
        id: "",
        name: ""
      },
      btnShow: true, //用来控制增删复制按钮的显隐
      taskShow: false,
      engines: [],
      groups: [],
      models: [],
      lang: {},
      tableId: "hyTask",
      langs: languagejs,
      query_data:null,
      checkbox:false,
      checkboxs:[],
      table_data:[{
  key_id:1,
  unit_name: '炉桥专职消防队',
  length:4,
  carts:[
    {
      key_id:1,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:2,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:3,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:4,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    }
  ]
},{
  key_id:2,
  unit_name: '定远队',
  length:4,
  carts: [
    {
      key_id:5,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:6,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:7,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:8,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    }
  ]
},{
  key_id:3,
  unit_name: '琅琊队',
  length:4,
  carts: [
    {
      key_id:9,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:10,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:11,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    },
    {
      key_id:12,
      cart_name:'LQ001',
      combat_mission:'精准打击'
    }
  ]
}]
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    console.log(this.tableId);

    // XE.MVVM.bind(this,planInfoShow, )
    this.talbeListeners();
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }

    // //绑定显隐
    // this._disposers.push(
    //   XE.MVVM.bind(this, "show", this.$parent, "vehicleShow")
    // );

    // console.log(this);
  },
  methods: {
    //全选
    choose_all(){
      let that = this;
      that.checkbox = !that.checkbox;
      let flag = that.checkbox;
      
      for(let i in that.checkboxs){
        that.checkboxs[i] = flag;
      }
    

    }
  },
  computed: {},
  filters: {},
  beforeDestroy() {
    if (this.unbind) {
      this.unbind();
      this.unbind = undefined;
    }
  },
  watch: {
    selectedGroup(v) {
      console.log(v);
    }
  }
};
</script>
<style scoped>
.hy-mainwindow {
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.plan-title{
  font-size: 18px;
}
.plan-info{
  float: left;
  margin-left: 40px;
}
.layui-table,.layui-table tr{
  background: none;
  color: white;
}
.submit_button{
  position: absolute;
  bottom: 5px;
  right: 20px;
  padding: 3px 10px;
  background-color: black;
  color: white;
  box-sizing: border-box;
  border: 1px solid white;
  cursor: pointer;
}
.layui-table tr th input[type=checkbox],.layui-table tr td input[type=checkbox]{
  display: inline;
  vertical-align:middle;
}
</style>
