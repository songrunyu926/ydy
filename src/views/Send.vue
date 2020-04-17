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
    <div @click="$router.push('/ydy/order/orderlist/1')" class="order-list">
      <el-badge :value="200" :max="99" class="item">
        管理订单
      </el-badge>
    </div>
    <div @click="$router.push('/ydy/order/printlist/1')" class="print-list">
      <el-badge :value="200" :max="99">
        管理打印任务
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
  height: 40px;
  border-bottom: 1px solid #ccc;
}
.order-list {
  position: absolute;
  top: 0;
  right: 120px;
  background-color: #76bef5;
  height: 40px;
  width: 130px;
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #86c8f8;
  }
}
.print-list {
  position: absolute;
  top: 0;
  right: 0;
  background: #efdd49;
  height: 40px;
  width: 160px;
   display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   .el-badge {
    top: 0 !important;
  }
  &:hover {
    background: #f6e661;
  }
}
</style>
