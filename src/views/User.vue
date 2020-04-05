<template>
  <el-card style="padding: 0 !important;">
    <el-menu
      :default-active="userIndex"
      class="el-menu-user"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#5ADACE"
      active-text-color="#5c5c5c"
      actice-background-color="#5ADACE"
      :router="true"
    >
      <el-menu-item index="/ydy/user/salesman">业务员</el-menu-item>
      <el-menu-item index="/ydy/user/negotiateuser">协议用户</el-menu-item>
      <el-menu-item index="/ydy/user/secondaryaccount">二级账号</el-menu-item>
      <el-menu-item index="/ydy/user/fans">粉丝管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-card>
</template>

<script>
export default {
  name: "user",
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
    userIndex() {
      return this.$route.path
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-user {
  height: 50px !important;
  border-bottom: 1px solid #ccc;
  .el-menu-item {
    
  }
}

</style>
