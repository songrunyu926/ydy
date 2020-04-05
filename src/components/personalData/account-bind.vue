<template>
  <div class="bind">
    <el-row class="mobile" :gutter="20">
      <el-col :span="5">
        <span>您绑定的手机号:</span>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input placeholder="未绑定手机" v-model="mobile" :disabled="true">
        </el-input>
      </el-col>
      <el-col :span="3" :offset="2">
        <button>换绑</button>
      </el-col>
    </el-row>
    <el-row class="wechat" :gutter="20">
     <el-col :span="5">
        <span>您绑定的微信号:</span>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input placeholder="未绑定微信" v-model="wechatAccount" :disabled="true">
        </el-input>
      </el-col>
      <el-col :span="3" :offset="2">
        <button>去绑定</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "account-bind",
  data() {
    return {
      mobile: '',
      wechatAccount: ''
    }
  }
};
</script>

<style lang="less" scoped>

@import url('../../assets/less/mixin');

.bind {
  padding: 200px;
  .mobile {
    margin-bottom: 150px;
    span {
      line-height: 40px;
      margin-left: 20px;
    }
    button {
      .button-type120(#5ADACE,#6CE6DB)
    }
  }
  .wechat {
    span {
      line-height: 40px;
      margin-left: 20px;
    }
    button {
      .button-type120(#5ADACE,#6CE6DB)
    }
  }
}
</style>
