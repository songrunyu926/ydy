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
      <el-menu-item index="/ydy/order/orderlist/1">
        <el-badge :value="200" :max="99" class="item">待确定</el-badge></el-menu-item
      >
      <el-menu-item index="/ydy/order/orderlist/2">已确定</el-menu-item>
      <el-menu-item index="/ydy/order/orderlist/3">已预约</el-menu-item>
      <el-menu-item index="/ydy/order/orderlist/4">已取消</el-menu-item>
      <el-menu-item index="/ydy/order/orderlist/5">未揽收</el-menu-item>
      <el-menu-item index="/ydy/order/orderlist/6">全部订单</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-card>
</template>

<script>
export default {
  name: "order-list",
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {}
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
  height: 40px;
  border-bottom: 1px solid #ccc;
}


</style>
