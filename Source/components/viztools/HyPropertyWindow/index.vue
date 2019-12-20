// author 谢灿
// date 2019年12月11日
// description 自定义属性框 带tab
<template>
  <Window
    @cancel="show=false"
    @ok="ok"
    v-show="show"
    :width="462"
    :minWidth="450"
    :height="500"
    :title="title"
    class="property-window"
  >
    <div class="tabs">
      <template v-for="tab in wind.tabs">
        <input
          @click="checked = tab.id"
          type="radio"
          name="tabs"
          :id="tab.id"
          :key="tab.id"
          :checked="checked == tab.id"
        />
        <label :for="tab.id" :key="tab.id">{{tab.name}}</label>
        <div class="tab" v-if="tab.type === 'textarea'" :key="tab.id">{{tab.data}}</div>
        <div class="tab" v-if="tab.type === 'html'" v-html="tab.data" :key="tab.id"></div>
        <div class="tab" v-if="tab.type === 'table'" :key="tab.id">
          <table border="1" cellspacing="0">
            <tr v-for="item in tab.data" :key="item.name">
              <td>{{item.name}}</td>
              <td>{{item.value}}</td>
            </tr>
          </table>
        </div>
      </template>
    </div>
  </Window>
</template>

<script>
export default {
  props: {
    getBind: Function
  },
  data() {
    return {
      title: "-属性框",
      checked: "",
      show: true,//窗口显示
      wind: {
        tabs: []
      }
    };
  },
  mounted() {
    let cnf = this.getBind();
    if (cnf) {
      this._cnf = cnf;
    }
    console.log(this._cnf);

    this.initData();
  },
  methods: {
    //关闭事件
    close() {
      this.$parent.destroyTool(this);
    },
    //确定事件
    ok() {
      
      this.close();
    },
    initData() {
      let tabs = [
        {
          name: "lab one",
          id: "labone",
          checked: true,
          type: "textarea",
          data: "测试测试测试"
        },
        {
          name: "lab two",
          id: "labtwo",
          checked: false,
          type: "html",
          data: "<h1>HTML</h1>测试<br/>测试"
        },
        {
          name: "lab three",
          id: "labthree",
          type: "table",
          checked: false,
          data: [
            {
              name: "键1",
              value: "值1"
            },
            {
              name: "键2",
              value: "值2"
            },
            {
              name: "键3",
              value: "值3"
            },
            {
              name: "键4",
              value: "值4"
            },
            {
              name: "键5",
              value: "值5"
            }
          ]
        }
      ];
      tabs = tabs;
      this.$set(this.wind, "tabs", tabs);
    }
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
}

.tabs label {
  order: 1;
  display: block;
  padding: 0.5rem 1rem;
  margin-right: 0.2rem;
  cursor: pointer;
  background: #fff;
  color: #404040;
  font-weight: bold;
  transition: background ease 0.5s;
}

.tabs .tab {
  order: 99;
  flex-grow: 1;
  width: 100%;
  display: none;
  padding: 16px;
  box-sizing: border-box;
}

.tabs input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.tabs input[type="radio"]:checked + label {
  background: #404040;
  color: #ddd;
}

.tabs input[type="radio"]:checked + label + .tab {
  display: block;
}

table{
  border-color: #474747;
  min-width: 402px;
  width: 100%;

}
td{
  min-width: 50px;
  padding: 4px;
}
@media (max-width: 300px) {
  .tabs .tab,
  .tabs label {
    order: initial;
  }

  .tabs label {
    width: 100%;
    margin-right: 0;
    margin-top: 0.2rem;
  }

  .property-window {
    position: absolute;
  }
}
</style>