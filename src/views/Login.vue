// 注册 和 登录 共用组件
<template>
  <div class="login">
    <div class="login-main">
      <!-- 登录左侧 -->
      <div class="login-main-l">
        <img src="../assets/images/login/login-logo.png" alt="" />
        <div class="login-wel">
          <p>欢迎!</p>
          <p>云打印系统登录</p>
        </div>
        <button @click.prevent="$router.push(isLogin ? '/register' : '/login')">
          {{ isLogin ? "快速注册" : "我要登录" }}
        </button>
      </div>
      <!-- 登录右侧 -->
      <div class="login-main-r">
        <!-- 登录切换组件 -->
        <transition name="el-fade-in-linear">
          <login-tab v-show="isLogin"></login-tab>
        </transition>
         <transition name="el-fade-in-linear">
        <register-mobile v-show="!isLogin"></register-mobile>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
//结构组件
import loginTab from "@/components/login/login-tab";
import registerMobile from "@/components/register/register-mobile";

export default {
  name: "Login",
  data() {
    return {};
  },
  components: {
    "login-tab": loginTab,
    "register-mobile":registerMobile
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
    loginOrRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login/login-bg.jpeg") no-repeat center
    center;
  background-size: cover;
  display: flex;
  .login-main {
    width: 780px;
    height: 528px;
    background: white;
    box-shadow: 0 0 30px -3px rgba(51, 51, 51, 0.7);
    margin: auto;
    display: flex;
    .login-main-l {
      height: 100%;
      width: 280px;
      background-color: #5adace;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .login-wel {
        p {
          color: #111111;
          text-align: center;
          &:first-child {
            font-size: 24px;
            margin-bottom: 20px;
          }
          &:last-child {
            font-size: 18px;
          }
        }
      }
      button {
        background: transparent;
        width: 180px;
        height: 50px;
        border: 1px solid rgba(17, 17, 17, 1);
        font-size: 16px;
        transition: all 0.5s;
        &:hover {
          background-color: #333;
          color: #fff;
        }
      }
    }
    .login-main-r {
      width: 500px;
      overflow: hidden;
    }
  }
}

</style>
