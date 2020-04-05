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
      <el-menu-item index="/ydy/personaldata/baseset">基本资料</el-menu-item>
      <el-menu-item index="/ydy/personaldata/accountbind">账号绑定</el-menu-item>
      <el-menu-item index="/ydy/personaldata/addressbook">地址簿</el-menu-item>
      <el-menu-item index="/ydy/personaldata/notice">通知消息</el-menu-item>
      <el-menu-item index="/ydy/personaldata/personalcard">个人名片</el-menu-item>
      <el-menu-item index="/ydy/personaldata/otherdevices">其他设置</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </el-card>
</template>

<script>
export default {
  name: "personal-data",
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
}

</style>
