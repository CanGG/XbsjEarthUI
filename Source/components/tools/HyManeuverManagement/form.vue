// author 谢灿
// date 2020-10-12 10:06:17
// description 预案form表单面板
<template>
  <div style="width:100%;height:100%">
    <Window
      :footervisible="true"
      @cancel="cancel"
      @ok="ok"
      :floatLayer="'center'"
      v-show="show"
      :width="350"
      :minWidth="350"
      :height="290"
      :top="365"
      :title="title"
      class="hy-plan-basic-info"
    >
      <!-- 窗体内容区域 -->
      <div class="hy-content">
      
        <form class="layui-form" id="deduceForm" lay-filter="example">
          <div class="layui-form-item">
            <label class="layui-form-label">预案名称</label>
            <div class="layui-input-block">
              <input
                v-model="plan.name"
                type="text"
                name="name"
                required
                lay-verify="required"
                placeholder="请输入预案名称"
                autocomplete="off"
                class="layui-input"
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">预案类型</label>
            <div class="layui-input-block">
              <input type="radio" name="plan_type" value="0" title="综合预案" :checked="plan.plan_type == '综合预案'" >
              <input type="radio" name="plan_type" value="1" title="专项预案" :checked="plan.plan_type == '专项预案'">
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">优先级</label>
            <div class="layui-input-block">
              <input type="radio" name="priority" value="1" title="I级" :checked="plan.priority == 'I级'">
              <input type="radio" name="priority" value="2" title="II级" :checked="plan.priority == 'II级'">
              <input type="radio" name="priority" value="3" title="III级" :checked="plan.priority == 'III级'">
            </div>
          </div>
        </form>
      </div>
    </Window>
  </div>
</template>

<script>
import languagejs from "./index_locale";
export default {
  props: {
    // getBind: Function
  },
  data() {
    return {
      show: false,
      title:"",
      disasterId: -1,
      plan:{
        key_id:-1,
        name:'',
        plan_type:"综合预案",
        priority:"I级",
      },
      lang: {},
      langs: languagejs
    };
  },
  created() {
    
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
    getFormData(){
      var data = layui.form.val('example');
      console.log(this);
      // console.log(this.getCookie('username'));
      if(data){
        data['fk_disaster_id'] = this.$parent.disaster.key_id;
        data['plan_author'] = 'admin';
      }
      return data;
    },
    close() {
      this.show = false;
      this.clear();
    },
    cancel() {
      this.close();
    },
    ok() {
      //保存演练
      let that = this;
      let data = this.getFormData();
      if(!data) return;
      window._wait();
      if (this.plan.key_id === -1 || this.plan.key_id === undefined) {
        // 新增
        this.$root.$hyServers.planBasicInfo.save(data).then(result=>{
          console.log(result);
          layer.msg(result.msg);
          if(result.code === 200){
            that.$parent.search();
            that.close();
          }
        });
      } else {
        // 修改
        this.$root.$hyServers.planBasicInfo.update(this.plan.key_id, data).then(result=>{
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
      this.plan = {
        key_id:-1,
        name:'',
        plan_type:"综合预案",
        priority:"I级"
      }
    }
  },
  watch: {
    show(v) {
      if(v){
        if(this.plan.key_id!==undefined && this.plan.key_id !== -1){
          this.title = "预案管理-修改预案-"+ this.plan.name;
        }else{
          this.title = "预案管理-新建预案";
        }
      }
      //layui 不是双向绑定的, 每次都需要执行刷新.
      setTimeout(function(){layui.form.render("radio");},200);
      // if(v)this.transferInit();
    },
    plan(v){
      console.log(v);
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
.hy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>