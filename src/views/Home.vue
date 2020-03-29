<template>
  <div class="main">
    <!-- 头部 -->
    <main-header></main-header>
    <!-- 面包屑导航 -->
    <section class="app-breadcrumb">
      <div class="container">
        <p class="breadcrumb-tip">您的位置:</p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </section>
    <!-- 主体部分 按照路由显示 -->
    <section class="app-main">
      <router-view></router-view>
    </section>
    <!-- 底部 -->
    <main-footer></main-footer>
    <!-- 侧栏 微信下单等  -->
    <ul class="app-tip">
      <li>
        <i class="iconfont icon-erweima"></i>
        <span>微信下单</span>
        </li>
      <li>
        <i class="iconfont icon-dingdan"></i>
        <span>添加订单</span></li>
      <li @click="backTop">
        <i class="iconfont icon-fanhuidingbu1"></i>
      </li>
    </ul>
  </div>
</template>

<script>

//结构组件
import mainHeader from '@/components/main-construction/main-header.vue';
import mainFooter from '@/components/main-construction/main-footer.vue';

export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  methods: {
    handleSelect() {},
    backTop() {
      if(document.documentElement.scrollTop > 150) {
        const timer = setInterval(() => {
          let st = document.documentElement.scrollTop - 40
          if(document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop = st
          }else {
            document.documentElement.scrollTop = 0
            clearInterval(timer)
          }
        },10)
      }
    }
  },
  components: {
    'main-header': mainHeader,
    'main-footer': mainFooter
  }
};
</script>
<style lang="less" scoped>
.main {
  background-color: #f4f4f4;
  .app-breadcrumb {
    font-size: 14px;
    height: 100px;
    line-height: 100px;
    .container {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .breadcrumb-tip {
        padding-right: 15px;
      }
    }
  }
  .app-main {
    width: 1200px;
    margin: 0 auto 80px;
  }

  .app-tip {
    position: fixed;
    right: 50px;
    top: 50%;
    margin-top: -136px;
    li {
      width: 90px;
      height: 90px;
      background-color: #fff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 2px;
      span {
        font-size: 14px;
        color: #333;
      }
      .icon-erweima {
        font-size: 35px;
        color: #6aed6d;
      }
      .icon-dingdan {
        font-size: 35px;
        color: #76bef5;
      }
      .icon-fanhuidingbu1 {
        font-size: 40px;
        color: #666;
      }
    }
  }
}
</style>
