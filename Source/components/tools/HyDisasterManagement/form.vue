// author 谢灿
// date 2020年6月8日
// description 灾害情景form表单面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="true"
      @cancel="cancel"
      @ok="ok"
      :floatLayer="'center'"
      v-show="show"
      :width="490"
      :minWidth="490"
      :height="500"
      :title="title"
      class="hy-majorhazard"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <label class="hy-select-label">情景名称:</label>
          <input class="hy-select-input" v-model="disasterName" />
          <!-- <button class="hy-select-button" @click="autoCreateName">自动生成</button> -->
        </div>
        <div class="hy-select column">
          <label class="hy-select-label">灾害部位:</label>
          <div id="org_parts_transfer" style="align-self: center;"></div>
        </div>

        <div class="hy-select">
          <HyDropDownSelector
            ref="orgPartLevelSelector"
            :groups="orgPartLevels"
            :showFn="listOrgPartLevels"
            :labelText="'灾害等级'"
            :defaultName="'请选择灾害等级'"
            v-on:selected="orgPartLevelSelectChange"
          ></HyDropDownSelector>
        </div>
        <div class="hy-select column">
          <label class="hy-select-label">等级说明:</label>
          <textarea
            class="hy-select-textarea"
            id="testarea"
            v-model="orgPartLevelSelected.description"
          ></textarea>
        </div>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
import FakeData from "./data";
import Deduce from "@controls/Deduce";
import PlanDisaster from "@services/PlanDisaster";
export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      title:"",
      key: "",
      error: "",
      disasterId: -1,
      orgPartLevels: [],
      orgPartLevelSelected: { id: "", name: "", description: "" },
      levelSelected: {},
      disasterName: "",
      groups: [],
      models: [],
      description: "",
      lang: {},
      langs: languagejs
    };
  },
  created() {
    this.deduce = this.$root.$hyControls.deduce;
  },
  mounted() {
    this._disposers = this._disposers || [];

    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }


    this._disposers.push(
      XE.MVVM.bind(
        this,
        "orgPartLevelSelected.id",
        this.$refs.orgPartLevelSelector,
        "selectedGroup.id"
      ),
      XE.MVVM.bind(
        this,
        "orgPartLevelSelected.name",
        this.$refs.orgPartLevelSelector,
        "selectedGroup.name"
      )
    );
  },
  methods: {
    /**
     * 加载单位部位的穿梭框组件
     * @author 谢灿 2020-9-23 17:49:57
     */
    transferInit() {
      let layerIndex = window._wait();
      this.$root.$hyServers.orgPart.list(this.config.org.key_id, 999, 1, "", "1").then(result=>{
        console.log(result);
        layer.msg(result.msg)
        if(result.code === 200){
          let transferData = [];
          let transferDataSeleted = [];
          result.data.forEach((item,index)=>{
            if(index === 0){
              transferDataSeleted.push(item.key_id);
            }
            transferData.push({
              value:item.key_id,
              title:item.name,
              disabled: '',
              checked: ''
            });
          })
          let transfer = layui.transfer;
          transfer.render({
            elem: "#org_parts_transfer",
            title: ["可选择", "已选择"],
            // showSearch: true,
            height: 270,
            width: 170,
            data: transferData,
            value: transferDataSeleted,
            id: "org_parts_transfer"
          });
        }
      });
      
      this.listOrgPartLevels();
    },
    /**
     * 添加事件点至桌面
     * @param content 重大危险源对象, 可查看同目录下data.js中的majorHazardSources
     */
    addPoint(content) {
      let that = this;
      let confirmLayer = layer.confirm(
        "是否添加" + content.para_name + "危险源?",
        {
          btn: ["是", "否"]
        },
        function() {
          var Pin = new XE.Obj.Pin(that.$root.$earth);
          Pin.name = "图标点";
          Pin.isCreating = true;
          let degree = [content.latitude, content.longitude, 0];
          let radians = degree.xeptr;
          Pin.pinBuilder.extText = content.para_name;
          Pin.imageUrl = "../assets/images/fire_point.png";
          Pin.position = radians;
          Pin.name = content.para_name;
          that.$root.$earthUI.showPropertyWindow(Pin);
          layer.close(confirmLayer);
          that.show = false;
        }
      );
    },
    listOrgPartLevels() {
      let that = this;
      // let orgPartSelectedId = this.orgPartSelected.id;
      if (that.orgPartLevels.length === 0) {
          that.orgPartLevels = [
            {
              id: 1,
              name: "I级"
            },
            {
              id: 2,
              name: "II级"
            },
            {
              id: 3,
              name: "III级"
            },
            {
              id: 4,
              name: "IV级"
            }
          ];
          that.orgPartLevelSelectChange(that.orgPartLevels[0]);
        // }
      }
    },
    orgPartLevelSelectChange(group) {
      this.orgPartLevelSelected = group;
    },
    listOrgParts() {
      let that = this;
      this.deduce
        .listMajorHazardSources(
          this.config.org.key_id,
          "正在加载单位部位"
        )
        .then(value => {
          that.majorHazards = value;
        });
    },
    //未完成
    selectParts(ids) {
      ids.forEach(id => {});
    },
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      this.close();
    },
    getFormData(){
      let that = this;
      let data = {};
      //情景
      data['name'] = this.disasterName;
      data['disaster_level'] = this.orgPartLevelSelected.name;
      data['disaster_explain'] = this.orgPartLevelSelected.description;
      data['author'] = 'admin',
      data['fk_org_id'] = this.config.org.key_id;
      //灾害部位
      let partData = layui.transfer.getData("org_parts_transfer");
      console.log(partData);
      if (
        partData.length === 0 ||
        this.orgPartLevelSelected.id == "" ||
        this.disasterName == ""
      ) {
        layer.msg("信息不全,请检查");
        return false;
      }
      let partIds = [];
      partData.forEach(row => {
        partIds.push(row.value);
      });
       data['fk_org_part_ids'] = partIds.join(",");
      console.log(data);return data;
    },
    ok() {
      //保存演练
      let that = this;
      let data = this.getFormData();
      if(!data) return;
      window._wait();
      if (this.disasterId === -1) {
        //新增
        this.$root.$hyServers.planDisaster.save(data).then(result=>{
          console.log(result);
          layer.msg(result.msg);
          if(result.code === 200){
            that.$parent.search();
            that.close();
          }
        });
      } else {
        //修改
        this.$root.$hyServers.planDisaster.update(this.disasterId, data).then(result=>{
          console.log(result);
          layer.msg(result.msg);
          if(result.code === 200){
            that.$parent.search();
            that.close();
          }
        });
      }
    },
    clear() {
      this.disasterId = -1;
      this.disasterName = "";
      this.orgPartLevelSelected = { id: "", name: "", description: "" };
      this.orgPartLevels = [];
      // this.transferInit();
    }
  },
  watch: {
    show(v) {
      if(v)this.transferInit();
      if(this.disasterId!==-1){
        this.title = "预案编制-修改事故情景-"+ this.disasterName;
      }else{
        this.title = "预案编制-新建事故情景"
        this.disasterName = "事故情景"+ new Date().Format("yyyyMMdd");
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
  }
};
</script>

<style scoped>
.hy-majorhazard {
  min-width: 462px;
}
.hy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-bottom: 8px;
}
.hy-select.column {
  flex-direction: column;
}
.hy-select-label {
  text-align: left;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70px;
}
.hy-select-textarea {
  width: 95%;
  height: 80px;
  align-self: center;
  border: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border-radius: 4px;
}
.hy-select-input {
  background: rgba(0, 0, 0, 0.4);
  border: 0px;
  padding-left: 13px;
  color: white;
  flex: 1;
  border-radius: 4px;
}
.hy-select-button {
  width: 70px;
  margin-left: 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid grey;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.hy-list {
  padding: 5px 5px 0 5px;
}

.hy-list:after {
  content: "";
  width: 100%;
  height: 1px;
  background-color: rgba(158, 158, 158, 0.5);
  z-index: 1;
  left: 0;
  margin-top: 3px;
  display: block;
}
.hy-list-title {
  margin-bottom: 3px;
}
.hy-list-contents {
  max-height: 225px;
}
.hy-list-contents li {
  display: inline-block;
  padding: 8px 8px 0 8px;
  position: relative;
}
.hy-list-content-img {
  width: 64px;
  height: 64px;
  max-width: 64px;
  max-height: 64px;
  border: 2px solid;
  border-radius: 4px;
  background: gray;
  margin: 5px 3px;
}
.hy-list-content-img.highlight,
.hy-list-content-img:hover {
  border: 2px solid rgba(31, 255, 255, 1);
}
.hy-list-content-img .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  position: absolute;
  z-index: 1;
  left: 0px;
  right: 0px;
}
.hy-list-content-img:hover .hy-list-content-tip {
  visibility: visible;
}
.hy-list-content-text {
  display: inline-block;
  width: 74px;
  text-align: center;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.hy-list-content-text .hy-list-content-tip {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 3px;
  /* 定位 */
  position: absolute;
  z-index: 1;
  left: 0px;
  right: 0px;
  bottom: 30px;
}
.hy-list-content-text:hover .hy-list-content-tip {
  visibility: visible;
}
</style>