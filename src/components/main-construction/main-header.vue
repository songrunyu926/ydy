<template>
  <!-- 头部 -->
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <img src="../../assets/images/main/logo.jpg" alt="">
      </div>
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
        <el-menu-item index="/ydy/personaldata" >个人资料</el-menu-item>
        <el-menu-item index="/ydy/send">我要寄件</el-menu-item>
        <el-submenu index="3" :show-timeout="200">
          <template slot="title">用户管理</template>
          <el-menu-item index="/ydy/user/salesman">业务员</el-menu-item>
          <el-menu-item index="/ydy/user/negotiateuser">协议用户</el-menu-item>
          <el-menu-item index="/ydy/user/secondaryaccount">二级账号</el-menu-item>
          <el-menu-item index="/ydy/user/fans">粉丝管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">业务资料</template>
          <el-menu-item index="/ydy/business/couriercompany">快递公司</el-menu-item>
          <el-menu-item index="/ydy/business/printer">打印机</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">订单管理</template>
          <el-menu-item index="/ydy/order/orderlist">订单列表</el-menu-item>
          <el-menu-item index="/ydy/order/printlist">打印任务</el-menu-item>
        </el-submenu>
         <el-submenu index="6">
          <template slot="title">报表中心</template>
          <el-menu-item index="/ydy/report/userreport">用户报表</el-menu-item>
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
    };
  },
  methods: {
    handleSelect() {
    }
  },
  computed: {
    //刷新页面  选中当前导航
    headerNavIndex() {
      if(this.$route.path.includes('persondata')) {
         return "/ydy/personaldata"
      }else if (this.$route.path.includes('send')) {
        return  "/ydy/send" 
      }else {
        return this.$route.path
      }
    }
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
    .el-menu-item {
      font-size: 14px !important;
      color: rgb(51,51,51) !important;
    }
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
