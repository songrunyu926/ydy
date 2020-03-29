<template>
  <!-- 头部 -->
  <header class="app-header">
    <div class="container">
      <div class="logo"></div>
      <el-menu
        :default-active="headerNavIndex"
        class="el-menu-header-nav"
        mode="horizontal"
        @select="handleSelect"
        background-color="#5adace"
        text-color="#333"
        active-text-color="#666"
        :router="true"
      >
        <el-menu-item index="/ydy" style="padding:0 10px; margin:0 10px;">个人资料</el-menu-item>
        <el-menu-item index="/ydy/send" style="padding:0 10px; margin:0 30px;">我要寄件</el-menu-item>
        <el-submenu index="3" :show-timeout="200">
          <template slot="title">用户管理</template>
          <el-menu-item index="/ydy/user">业务员</el-menu-item>
          <el-menu-item index="/ydy/user">协商用户</el-menu-item>
          <el-menu-item index="/ydy/user">二级账号</el-menu-item>
          <el-menu-item index="/ydy/user">粉丝管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">业务资料</template>
          <el-menu-item index="/ydy/business">快递公司</el-menu-item>
          <el-menu-item index="/ydy/business">打印机</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">订单管理</template>
          <el-menu-item index="/ydy/order">订单列表</el-menu-item>
          <el-menu-item index="/ydy/order">打印任务</el-menu-item>
        </el-submenu>
         <el-submenu index="6">
          <template slot="title">报表中心</template>
          <el-menu-item index="/ydy/report">用户列表</el-menu-item>
          <el-menu-item index="/ydy/report">功能升级中</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="header-user">
        <el-badge :value="12" class="item"
          ><el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-badge>
        <p class="header-user-name">云打印网点</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "main-header",
  data() {
    return {
      headerNavIndex: "/ydy"
    };
  },
  methods: {
    handleSelect() {}
  }
};
</script>

<style lang="less" scoped> 

.app-header {
  height: 100px;
  background-color: #5adace;
  .container {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-menu-header-nav {
      display: inline-block;
      border-bottom: 0;
    }
    .header-user {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .header-user-name {
        font-size: 14px;
        margin-left: 20px;
      }
    }
  }
}
</style>
