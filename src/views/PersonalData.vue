<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本设置" name="1" :lazy="true" :stretch="true">
        <base-set></base-set>
      </el-tab-pane>
      <el-tab-pane label="账号绑定" name="2" :lazy="true" :stretch="true">
        <account-bind></account-bind>
      </el-tab-pane>
      <el-tab-pane label="地址簿" name="3" :lazy="true" :stretch="true">
        <address-book></address-book>
      </el-tab-pane>
      <el-tab-pane label="通知信息" name="4" :lazy="true" :stretch="true">
        <notice></notice>
      </el-tab-pane>
      <el-tab-pane label="个人名片" name="5" :lazy="true" :stretch="true">
        <personal-card></personal-card>
      </el-tab-pane>
      <el-tab-pane label="其他配置" name="6" :lazy="true" :stretch="true">
        <other-devices></other-devices>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

//tab组件
import baseSet from '@/components/personalData/base-set'
import accountBind from '@/components/personalData/account-bind'
import addressBook from '@/components/personalData/address-book'
import notice from '@/components/personalData/notice'
import personalCard from '@/components/personalData/personal-card'
import otherDevices from '@/components/personalData/other-devices'

export default {
  name: "PersonalData",
  data() {
    return {
      activeName: "5"
    };
  },
  methods: {
    handleClick(tab, event) {
    }
  },
  components: {
    'base-set': baseSet,
    'account-bind': accountBind,
    'address-book': addressBook,
    'notice': notice,
    'personal-card': personalCard,
    'other-devices': otherDevices
  }
};
</script>
<style lang="less" scoped>
.el-tabs__item {
  border: none !important;
}
</style>
