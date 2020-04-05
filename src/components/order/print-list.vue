<template>
  <el-card style="padding: 0 !important;">
    <el-menu
      :default-active="orderIndex"
      class="el-menu-user"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#5ADACE"
      active-text-color="#5c5c5c"
      actice-background-color="#5ADACE"
      :router="true"
    >
      <el-menu-item index="/ydy/order/printlist/1">待打印</el-menu-item>
      <el-menu-item index="/ydy/order/printlist/2">已打印</el-menu-item>
      <el-menu-item index="/ydy/order/printlist/3">打印失败</el-menu-item>
      <el-menu-item index="/ydy/order/printlist/4">全部订单</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-card>
</template>

<script>
export default {
  name: "print-list",
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    orderIndex() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-user {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
</style>

