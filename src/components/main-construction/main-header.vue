<template>
  <!-- 头部 -->
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <img src="../../assets/images/main/logo.jpg" alt="" />
      </div>
      <el-menu
        :default-active="headerNavIndex"
        class="el-menu-header-nav"
        mode="horizontal"
        @select="handleSelect"
        background-color="#5adace"
        text-color="#333"
        active-text-color="#888"
        :router="true"
      >
        <el-submenu index="2" :show-timeout="200">
          <template slot="title">我要寄件</template>
          <el-menu-item index="/ydy/send/single">单个订单</el-menu-item>
          <el-menu-item index="/ydy/send/batch">批量订单</el-menu-item>
          <el-menu-item index="/ydy/send/scancode">扫码寄件</el-menu-item>
          <el-menu-item index="/ydy/send/ecode">E邮码订单</el-menu-item>
          <el-menu-item index="/ydy/send/fastprint">快速打印</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :show-timeout="200">
          <template slot="title">用户管理</template>
          <el-menu-item index="/ydy/user/salesman">业务员</el-menu-item>
          <el-menu-item index="/ydy/user/negotiateuser">协议用户</el-menu-item>
          <el-menu-item index="/ydy/user/secondaryaccount"
            >二级账号</el-menu-item
          >
          <el-menu-item index="/ydy/user/fans">粉丝管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">业务资料</template>
          <el-menu-item index="/ydy/business/couriercompany"
            >快递公司</el-menu-item
          >
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

      <el-dropdown @command="handleCommand">
        <div class="header-user" @click="handleAvatar">
          <el-badge :value="12"
            ><el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </el-badge>
          <p class="header-user-name">云打印网点</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/ydy/personaldata/baseset"
            >基本资料</el-dropdown-item
          >
          <el-dropdown-item command="/ydy/personaldata/accountbind"
            >账号绑定</el-dropdown-item
          >
          <el-dropdown-item command="/ydy/personaldata/addressbook"
            >地址簿</el-dropdown-item
          >
          <el-dropdown-item command="/ydy/personaldata/notice"
            >通知消息</el-dropdown-item
          >
          <el-dropdown-item command="/ydy/personaldata/personalcard"
            >个人名片</el-dropdown-item
          >
          <el-dropdown-item command="/ydy/personaldata/otherdevices"
            >其他设置</el-dropdown-item
          >
          <el-dropdown-item command="" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "main-header",
  data() {
    return {};
  },
  methods: {
    handleSelect() {},
    //头像下拉点击选项跳转
    handleCommand(command) {
      this.$router.push(command);
    },
    //点击头像跳转到基本资料
    handleAvatar() {
      this.$router.push("/ydy/personaldata");
    }
  },
  computed: {
    //刷新页面  选中当前导航
    headerNavIndex() {
      if (this.$route.path.includes("persondata")) {
        return "/ydy/personaldata";
      } else if (this.$route.path.includes("send")) {
        return "/ydy/send";
      } else {
        return this.$route.path;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app-header {
  height: 80px;
  background-color: #5adace;
  .container {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-menu-item {
      font-size: 14px !important;
      color: #111 !important;
      height: 60px !important;
      line-height: 60px !important;
    }
    .el-menu-header-nav {
      display: inline-block;
      border-bottom: 0;
    }
    .header-user {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      .header-user-name {
        font-size: 14px;
        margin-left: 20px;
      }
    }
  }
}
</style>
