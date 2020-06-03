// author 张杰
// date 2020年4月14日
// Potion query 灭火药剂查询
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="false"
      @cancel="show = false"
      v-show="show"
      :floatLayer="'center'"
      :width="1024"
      :minWidth="1024"
      :height="500"
      :title="lang.title"
      class="hy-mainwindow"
    >
      <div class="potion-query-search">
        <input class="potion-query-search-input" type="text" placeholder="请输入关键字" v-model="search_world">
        <button @click="clickEvent" class="potion-query-search-button">搜索</button>
        <div style="clear:both"></div>
      </div>
      <div class="layui-form">
        <table class="layui-table">
          <colgroup>
            <col width="150" />
            <col width="150" />
            <col width="200" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>序号</th>
              <th>
                药剂名称
              </th>
              <th>分布单位</th>
              <th>容量</th>
              <th>责任人</th>
              <th>联系电话</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="item in table_data"  :key="'potion-query-'+item.key_id">
              <td>{{ item.key_id }}</td>
              <td>{{ item.drug_name }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.capacity }}</td>
              <td>{{ item.responsible }}</td>
              <td>{{ item.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";

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
      tableId: "hyPotionQuery",
      langs: languagejs,
      query_data: null,
      checkbox: false,
      checkboxs: [],
      table_data: FakeData.majorHazardSources,
      base_data: FakeData.majorHazardSources,
      search_world: "",
    };
  },
  created() {
    //日期选择器初始化
  },
  mounted() {
    //第一个实例
    // console.log("这个table_data");
    // console.log(this.table_data);

    // XE.MVVM.bind(this,planInfoShow, )
    // this.tableListeners();
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
    //点击事件
    clickEvent(){
      let base_data = this.base_data;
      let key_world = this.search_world;
      let new_table = [];
      for(let value of base_data){
        if(value.drug_name.indexOf(key_world)>=0){
          new_table.push(value);
        }
      }
      this.table_data = new_table;
    },
    tableListeners() {
      let that = this;
      //监听行工具事件
      layui.table.on("tool(hyPlanTableFilter)", function(obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        console.log(obj);
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === "detail") {
          that.query_data = data;
          console.log(that.query_data);
          layer.msg("查看操作");
          that.$refs.planInfo.show = true;
          that.$refs.planInfo.update();
        }
      });
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
.potion-query-search{
  padding: 10px;
  margin: 0 -5px;
  background-color: rgba(255, 255, 255, 0.2);
}
.potion-query-search-input{
  float: left;
  height: 28px;
  box-sizing: border-box;
  border: 1px solid rgb(209, 200, 200,1);
  width: 200px;
  background-color: #474747;
  padding: 3px;
  color: white;
  border-radius: 5px;
}

::-webkit-input-placeholder { color:rgb(255, 250, 250); }
::-moz-placeholder { color:rgb(255, 250, 250); }
:-ms-input-placeholder { color:rgb(255, 250, 250); }
input:-moz-placeholder { color:rgb(255, 250, 250); }

.potion-query-search-button{
  float: left;
  margin-left: 10px;
  height: 28px;
  box-sizing: border-box;
  border: 1px solid rgb(209, 200, 200,1);
  width: 60px;
  text-align: center;
  line-height: 28px;
  background-color: #474747;
  color: white;
  border-radius: 5px;
}
.layui-table,
.layui-table tr {
  background: none;
  color: white;
}
.layui-table tbody tr:hover{
  color: #000;
}

</style>
