// @author 谢灿
// @date 2020年6月5日
// @update 2020年9月24日 完成接口功能
// @description 灾害情景面板
<template>
<div style="width:100%;height:100%">
  <Window :footervisible="false" @cancel="show=false" v-show="show" :width="790" :top="190" :left="400" :height="500" :title="lang.title" :floatLayer="'center'" class="hy-mainwindow">
    <div class="hy-btnbar">
      <!--<div class="hy-btn-date">
           <HyDatePicker :doneFunc="datePickerDone" ref="datePicker" :defaultText="'选择日期'"></HyDatePicker>
        </div>-->
      <input type="text" placeholder="模糊查询关键字" v-model="keyword" />
      <div style>
        <HyDropDownSelector ref="orgPartSelector" :groups="orgParts" :showFn="listOrgParts" :defaultName="'请选择单位部位'" v-on:selected="orgPartSelectChange"></HyDropDownSelector>
      </div>
      <div>
        <button class="hy-btnbar-button" @click="search">查询</button>
      </div>
    </div>
    <div class="hy-btnbar" v-if="btnShow">
      <div>
        <button class="hy-btnbar-button" @click="addDisaster">
          <i class="layui-icon">&#xe654;</i>新建
        </button>
      </div>
      <div>
        <button class="hy-btnbar-button" @click="editDisaster">
          <i class="layui-icon">&#xe640;</i>修改
        </button>
      </div>
      <div>
        <button class="hy-btnbar-button" @click="delDisaster">
          <i class="layui-icon">&#xe640;</i>删除
        </button>
      </div>
    </div>
    <!-- 窗体内容区域 -->
    <div class="hy-content">
      <table class="layui-hide" :id="dataTable.id" lay-filter="disasterTable"></table>
    </div>
  
  </Window>
  <!-- 表单 -->
  <DisasterForm ref="disasterForm"></DisasterForm>
  <script type="text/html" id="disasterBar">
    <a class="layui-btn layui-btn-orange layui-btn-xs" lay-event="maneuverPlan" >预案编制</a>
  </script>
</div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import DisasterForm from "./form";
export default {
  props: {
    // getBind: Function
  },
  components: {
    DisasterForm
  },
  data() {
    return {
      show: false,
      orgPartSelected: {
        id: "",
        name: ""
      },
      keyword: "",
      orgParts: [],
      btnShow: true, //用来控制增删复制按钮的显隐
      lang: {},
      dataTable: {
        id: "hyDisasterTable",
        ins: {},
        columns: [{
            type: "radio",
            fixed: "left"
          },
          {
            field: "key_id",
            title: "编号",
            width: 60
          },
          {
            field: "name",
            title: "情景名称",
            width: 120
          },
          {
            field: "fk_org_part_name",
            title: "灾害部位",
            width: 120
          },
          {
            field: "disaster_level",
            title: "灾害等级",
            width: 90
          },
          {
            field: "author",
            title: "制作人",
            width: 83
          },
          {
            field: "operate_date",
            title: "操作时间",
            width: 95,
            sort: true
          },
          {
            title: "操作",
            width: 90,
            align: "center",
            toolbar: "#disasterBar"
          }
        ],
        data: []
      },
      langs: languagejs
    };
  },
  created() {
    let that = this;
  },
  mounted() {
    let that = this;
    //表格初始化
    this.tableInit();

    //表格监听初始化
    this.tableListeners();

    //表单
    this.disasterForm = this.$refs.disasterForm;
    this._disposers = this._disposers || [];
    //绑定显隐
    this._disposers.push(
      XE.MVVM.bind(
        this,
        "orgPartSelected.id",
        this.$refs.orgPartSelector,
        "selectedGroup.id"
      ),
      XE.MVVM.bind(
        this,
        "orgPartSelected.name",
        this.$refs.orgPartSelector,
        "selectedGroup.name"
      ),
    );
  },
  methods: {
    resetTableSize() {
      layui.table.resize('hyDisasterTable');
    },
    //表格的初始化事件
    tableInit() {
      let that = this;
      //表格初始化
      this.dataTable.ins = layui.table.render({
        elem: "#" + that.dataTable.id,
        id: that.dataTable.id,
        page: {
          theme: "#2A2A2A",
          limit:10,
          curr:1,
        }, //改page的样式
        method: "get",
        response: {
          statusCode: 200 //规定成功的状态码，默认：0
        },
        // contentType: "application/json",
        // headers: {token: 'sasasas'},
        height: 330,
        cols: [that.dataTable.columns],
        // data: that.dataTable.data,
        even: true
      });
    },
    //表格的所有监听事件
    tableListeners() {
      let that = this;
      //监听行工具事件
      layui.table.on("tool(disasterTable)", function (obj) {
        //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data, //获得当前行数据
          layEvent = obj.event; //获得 lay-event 对应的值
        switch (layEvent) {
          case "maneuverPlan":
            that.showManeuverManagement(data);
            // that.show=false;
            break;

          default:
            break;
        }
      });
    },
    showManeuverManagement(row) {
      let hyManeuverManagement = this.$root.$refs.mainUI.$refs.hyManeuverManagement[0];
      hyManeuverManagement.init(row);
      this.$root.$refs.mainUI.topWindow(hyManeuverManagement.$refs.maneuverWindow);
      hyManeuverManagement.show = true;
    },
    //button bar search start
    search() {
      let that = this;
      console.log()
      let where = {};
      where.fk_org_id = that.config.org.key_id;
      where.fk_org_part_id = that.orgPartSelected.id;
      where.keyword = that.keyword;
      // where.limit =
      this.dataTable.ins.reload({
        url: that.$root.$hyServers.planDisaster.server + that.$root.$hyServers.planDisaster.path,
        where: where,
      });
      //获取参数
    },
    listOrgParts() {
      let that = this;
      // let orgSelectedId = this.orgSelected.id;
      if (that.orgParts.length === 0) {
        let i = window._wait("正在加载单位部位");
        this.$root.$hyServers.orgPart.list(this.config.org.key_id,999,1,"",1).then(result=>{
          layer.close(i);
          layer.msg(result.msg);
          console.log(result);
          if(result.code === 200){
            result.data.forEach(part=>{
              that.orgParts.push({id:part.key_id,name:part.name});
            })
          }
        })
      }
    },
    orgPartSelectChange(group) {
      this.orgPartSelected = group;
    },
    //button bar search end

    //buttonbar btn's event start
    addDisaster() {
      console.log("新建事件点!");
      if (this.disasterForm.show) this.disasterForm.show = false;
      this.disasterForm.show = true;
    },
    editDisaster() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      if (checkStatus.data.length === 0) {
        layer.msg("请先选中一个事故情景!");
        return;
      }
      if (this.disasterForm.show) this.disasterForm.show = false;
      checkStatus.data.forEach(row => {
        //其实应该只要传id就够了
        //传了ID后在form中做id的监听,假如disasterId改变则调用API加载数据并显示
        that.disasterForm.disasterId = row.key_id;
        that.disasterForm.disasterName = row.name;
        //选择part方法 传入 id 数组
        that.disasterForm.selectParts([]);
      })
      this.disasterForm.show = true;
    },
    delDisaster() {
      let that = this;
      let checkStatus = layui.table.checkStatus(this.dataTable.id);
      if (checkStatus.data.length < 1) {
        layer.msg("请先选择一个场景!");
        return;
      }
      checkStatus.data.forEach(row => {
        layer.confirm("确定删除吗?", function (index) {
          let li = window._wait();
          that.$root.$hyServers.planDisaster.delete(row.key_id).then(result => {
            if(result.code === 200){
              layer.msg(result.msg);
              that.search();
            }
          }).catch(err => {
            layer.msg(err.msg);
          });
        });
      });
    },
    copyDisaster() {},
    // buttonbar btn's event end
  },
  filters: {},
  beforeDestroy() {
    this._disposers.forEach(e => e());
    this._disposers.length = 0;
  },
  computed: {
  },
  watch: {
    show(v) {
      if (v) this.search();
    }
  }
};
</script>

<style scoped>
.hy-mainwindow {
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.hy-btnbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
}

.hy-btnbar>* {
  margin-right: 15px;
}

.hy-btnbar input {
  width: 120px;
  padding: 5px;
  color: white;
  line-height: inherit;
  background: rgba(0, 0, 0, 0.4);
  border: 0 solid #aaa;
}

.hy-btnbar .hy-btnbar-button {
  min-width: 80px;
  height: 100%;
  min-height: 30px;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid gray;
  cursor: pointer;
}

.hy-btnbar .hy-btnbar-button:hover {
  color: #1fffff;
  border: 1px solid #1fffff;
  cursor: pointer;
}

.hy-select-div {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 28px;
  padding-left: 13px;
  line-height: 28px;
  text-align: left;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  cursor: pointer;
}

input::-webkit-input-placeholder {
  color: #ddd;
}
</style>
