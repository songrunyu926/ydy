<template>
  <div>
    <div v-show="!registerMobileComp">
      <p class="register-mobile">新用户注册</p>
      <login-register-form @MobileComp="MobileComp"></login-register-form>
    </div>
    <transition name="el-zoom-in-center">
      <div v-show="registerMobileComp">
        <p class="register-mobile" style="font-size:20px">
          注册成功请扫码绑定微信快速登录
        </p>
        <img
          src="../../assets/images/login/login-ercode.png"
          alt="等待加载"
          style="display:block;margin:-20px auto 0;"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import loginRegisterForm from "@/components/login-register-form/login-register-form";

export default {
  name: "register-mobile",
  data() {
    return {
      registerMobileComp: false //手机注册是否完成
    };
  },
  methods: {
    //自定义事件 手机完成后 显示绑定二维码
    MobileComp() {
      this.registerMobileComp = true;
    }
  },
  components: {
    "login-register-form": loginRegisterForm
  }
};
</script>

<style lang="less" scoped>
.register-mobile {
  width: 300px;
  margin: 65px auto 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 24px;
  color: #111;
}
</style>
