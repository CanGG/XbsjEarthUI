// author 谢灿
// date 2020年2月28日
// description 重大危险源面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="true"
      @cancel="cancel"
      @ok="ok"
      :floatLayer="'center'"
      v-show="show"
      :width="463"
      :minWidth="202"
      :height="500"
      :title="lang.title"
      class="hy-majorhazard"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
        <div class="hy-select">
          <HyDropDownSelector 
            :labelText="'所属区域'" :changeHandler="selectChange"></HyDropDownSelector>
        </div>
        <!-- 危险源列表 -->
        <ul class="hy-list-contents">
          <!-- 一个危险源后在地图上危险源的位置生成一个事件点图标 -->
          <li v-for="content in contents" :key="content.id">
            <!-- 缩略图 大小为64*64px 存放在apps/assets/3d/中-->
            <div class="hy-list-content-img" @click="addPoint(content)">
              <img style="width:64px;height:64px;" :src="content.thumb" alt />
              <span class="hy-list-content-tip">
                {{content.remark}}
                <br />
                {{content.usage_description}}
              </span>
            </div>
            <!-- 模型的文字说明 -->
            <div class="hy-list-content-text">
              {{content.para_name}}
              <!-- 模型的文字说明, 超过长度隐藏 -->
              <!-- 模型的文字说明(tip) 选中文字时弹出的部分 -->
              <span class="hy-list-content-tip">{{content.remark}}</span>
            </div>
          </li>
        </ul>
        <div class="hy-select">
          <HyDropDownSelector
            :labelText="'灾害等级'"
            :defaultText="'请选择灾害等级'"
            :changeHandler="selectChange"
          ></HyDropDownSelector>
        </div>
        <div class="hy-select" style="flex-direction: column;">
          <label class="hy-select-label">灾害等级说明：</label>
          <textarea class="hy-select-textarea" id="testarea"></textarea>
        </div>
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
      contents: FakeData.majorHazardSources,
      groups: [],
      models: [],
      lang: {},
      langs: languagejs
    };
  },
  created() {
    this.contents = FakeData.majorHazardSources;
  },
  mounted() {
    this._disposers = this._disposers || [];
    let earth = this.$root.$earth;
    if (earth) {
      this.earth = earth;
    } else {
      return;
    }
  },
  methods: {
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
    selectChange(group) {
      this.selectedGroup = group;
      this.selectShow = false;
    },
    close() {
      this.show=false;
    },
    cancel() {
      this.close();
    },
    ok() {
      this.close();
    },
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
.hy-majorhazard {
  min-width: 462px;
  z-index: 10;
}
.hy-select {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.hy-select-label {
  text-align: left;
  padding-left: 18px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 2;
}
.hy-select-textarea {
  width: 90%;
  height: 80px;
  align-self: center;
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
  max-height:225px
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
