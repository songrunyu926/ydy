// 登录 注册 表单组件
<template>
  <form class="login-mobile">
        <div class="mobile-info">
          <i class="iconfont icon-shouji"></i>
          <input type="tel" placeholder="请输入电话号码" />
        </div>
        <div class="yam-info">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="tel" placeholder="请输入验证码" />
          <button>发送验证码</button>
        </div>
        <div>
          <button @click.prevent="loginOrRegisterSubmit" class="login-btn">{{isLogin? '登录' : '注册'}}</button>
        </div>
      </form>
</template>

<script>
export default {
  name: 'login-register-form',
  data() {
    return {
      
    }
  },
  computed: {
    isLogin() {
      if (this.$route.path === "/login") {
        return true;
      } else if (this.$route.path === "/register") {
        return false;
      }
    }
  },
  methods: {
    //手机登录或手机号注册
    loginOrRegisterSubmit() {
      if(this.isLogin){
        this.$router.replace('/ydy')
      }else {
        this.$emit('MobileComp')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-mobile {
    .mobile-info {
      width: 100%;
      height: 50px;
      padding-left: 96px;
      position: relative;
      i {
        position: absolute;
        top: 16px;
        left: 104px;
        font-size: 20px;
      }
      input {
        text-indent: 2em;
        width: 308px;
        height: 100%;
        border: 1px solid #bbbbbb;
      }
    }
    .yam-info {
      width: 100%;
      height: 50px;
      padding-left: 96px;
      margin-top: 60px;
      margin-bottom: 80px;
      position: relative;
      i {
        position: absolute;
        top: 16px;
        left: 104px;
        font-size: 20px;
      }
      input {
        text-indent: 2em;
        width: 192px;
        height: 100%;
        border: 1px solid #bbbbbb;
        border-right: none;
      }
      button {
        background: #5adace;
        font-size: 14px;
        border: none;
        color: #111;
        width: 119px;
        height: 52px;
        vertical-align: top;
      }
    }
    .login-btn {
      display: block;
      margin: 0 auto;
      width: 308px;
      height: 50px;
      background: #5adace;
      font-size: 14px;
      color: #333;
      border: none;
    }
  }
</style>
