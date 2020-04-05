<template>
  <el-card style="padding: 0 !important;position: relative;">
    <el-menu
      :default-active="sendIndex"
      class="el-menu-user"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#5ADACE"
      active-text-color="#5c5c5c"
      actice-background-color="#5ADACE"
      :router="true"
    >
      <el-menu-item index="/ydy/send/single">单个订单</el-menu-item>
      <el-menu-item index="/ydy/send/batch">批量订单</el-menu-item>
      <el-menu-item index="/ydy/send/scancode">扫码寄件</el-menu-item>
      <el-menu-item index="/ydy/send/ecode">E邮码订单</el-menu-item>
      <el-menu-item index="/ydy/send/fastprint">快速打印</el-menu-item>
    </el-menu>
    <router-view></router-view>
    <div class="order-list">
      <el-badge :value="200" :max="99">
        <span>管理订单</span>
      </el-badge>
    </div>
    <div class="print-list">
      <el-badge :value="200" :max="99">
        <span>管理打印任务</span>
      </el-badge>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "send",
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    sendIndex() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/less/mixin");

.el-menu-user {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.order-list{
  position: absolute;
  top: 0;
  right: 120px;
  background-color: #76BEF5;
  height: 50px;
  width: 130px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #86C8F8;
  }
}
.print-list {
  position: absolute;
  top: 0;
  right: 0;
  background: #EFDD49;
  height: 50px;
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
   &:hover {
    background: #F6E661;
  }
}
</style>
