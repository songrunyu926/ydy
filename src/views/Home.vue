<template>
  <div class="main">
    <!-- 头部 -->
    <main-header></main-header>
    <!-- 面包屑导航 -->
    <section class="app-breadcrumb">
      <div class="container">
        <p class="breadcrumb-tip">您的位置:</p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            style="font-size:12px"
            v-for="(item, index) in breadcrumbContent"
            :key="index"
            >{{ item }}</el-breadcrumb-item
          >
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
      <el-popover
        placement="left"
        width="200"
        trigger="click"
      >
      <img src="../assets/images/login/login-ercode.png" style="width: 200px" alt="网络出错">
        <li slot="reference">
          <i class="iconfont icon-erweima"></i>
          <span>微信下单</span>
        </li>
      </el-popover>
      <li @click="$router.push('/ydy/send')">
        <i class="iconfont icon-dingdan"></i>
        <span>添加订单</span>
      </li>
      <li @click="backTop">
        <i class="iconfont icon-fanhuidingbu1"></i>
      </li>
    </ul>
  </div>
</template>

<script>
//结构组件
import mainHeader from "@/components/main-construction/main-header.vue";
import mainFooter from "@/components/main-construction/main-footer.vue";

import { bbObj } from "../config";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    handleSelect() {},
    backTop() {
      if (document.documentElement.scrollTop > 150) {
        const timer = setInterval(() => {
          let st = document.documentElement.scrollTop - 40;
          if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop = st;
          } else {
            document.documentElement.scrollTop = 0;
            clearInterval(timer);
          }
        }, 10);
      }
    }
  },
  components: {
    "main-header": mainHeader,
    "main-footer": mainFooter
  },
  computed: {
    //面包屑导航内容
    breadcrumbContent() {
      //导航数组  初始化第一个位置
      let breadcrumbArr = ["云打印"];
      //获取导航数组
      const pathArr = this.$route.path.split("/").filter(item => item !== "");
      //导航数组的第二个位置
      breadcrumbArr.push(bbObj[pathArr[1]].name);
      //导航数组的第三个位置
      if (pathArr[1] === "order") {
        breadcrumbArr.push(bbObj[pathArr[1]].children[pathArr[2]]["name"]);
        //导航第四个位置
        breadcrumbArr.push(
          bbObj[pathArr[1]].children[pathArr[2]].type[+pathArr[3] - 1]
        );
      } else {
        breadcrumbArr.push(bbObj[pathArr[1]].children[pathArr[2]]);
      }
      return breadcrumbArr;
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  background-color: #f4f4f4;
  .app-breadcrumb {
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    margin-top: 20px;
    margin-bottom: 5px;
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
    right: 30px;
    top: 50%;
    margin-top: -136px;
    /deep/ li {
      width: 70px;
      height: 70px;
      background-color: #fff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 2px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
      span {
        font-size: 12px;
        color: #333;
      }
      .icon-erweima {
        font-size: 30px;
        color: #6aed6d;
      }
      .icon-dingdan {
        font-size: 30px;
        color: #76bef5;
      }
      .icon-fanhuidingbu1 {
        font-size: 35px;
        color: #666;
      }
    }
  }
}
</style>
