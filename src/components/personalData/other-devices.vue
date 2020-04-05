<template>
  <div class="other-devices">
    <div>
      <el-radio size="medium" text-color="#ff4400" v-model="notice" label="1">订单消息通知C1</el-radio>
      <el-radio size="medium" text-color="#ff4400" v-model="notice" label="2">订单消息通知C2</el-radio>
    </div>
    <p class="tip">
      tip:
      订单的通知是指订单的下单、修改、取消的通知，取消后将无法收到此类通知！，具体见通知代码对应关系
    </p>
    <el-divider></el-divider>
    <el-input-number
      v-model="num"
      @change="handleChange"
      :min="0"
      label="描述文字"
    ></el-input-number>
    <button class="save">保存</button>
    <p class="tip">tip: 调整共享打印机后每个被用户默认可以用总量！ 默认1000</p>
  </div>
</template>

<script>
export default {
  name: "other-devices",
  data() {
    return {
      notice: "1",
      num: "1000" //打印机默认共享总量  1000
    };
  },
  methods: {
    handleChange() {
      
    }
  }
};
</script>

<style lang="less" scoped>

@import url('../../assets/less/mixin');

.other-devices {
  padding: 80px;
  .tip {
    margin-top: 40px;
    margin-bottom: 80px;
    color: #E20000;
  }
  .save {
    .button-type120(#5ADACE,#6CE6DB);
    display: inline-block;
    margin-left: 40px;
  }
}
</style>
