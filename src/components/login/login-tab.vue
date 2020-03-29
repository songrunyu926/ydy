// 登录切换组件
<template>
  <div>
    <ul class="login-type">
      <li @click="loginType = false" :class="{ active: !loginType }">
        扫码登录
      </li>
      <li @click="loginType = true" :class="{ active: loginType }">手机登录</li>
    </ul>
    <div class="login-tab">
      <transition name="el-zoom-in-center" >
        <div class="login-sm" v-show="!loginType">
          <img
            src="../../assets/images/login/login-ercode.png"
            alt="等待加载"
          />
          <i>请使用微信扫码登录</i>
        </div>
      </transition>
      <transition name="el-zoom-in-center" >
        <login-register-form v-show="loginType"></login-register-form>
      </transition>
    </div>
  </div>
</template>

<script>
import loginRegisterForm from "@/components/login-register-form/login-register-form";

export default {
  name: "login-tab",
  data() {
    return {
      loginType: false //false： 扫码登录  true: 手机登录
    };
  },
  components: {
    "login-register-form": loginRegisterForm
  }
};
</script>

<style lang="less" scoped>
.login-type {
  width: 240px;
  margin: 65px auto 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 18px;
  color: #666;
  li {
    user-select: none;
    cursor: pointer;
    &.active {
      font-size: 24px;
      color: #111;
    }
  }
}
.login-tab {
  width: 100%;
  padding-top: 20px;
  height: 320px;
  .login-sm {
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: 18px;
      color: #666;
    }
  }
}
</style>
