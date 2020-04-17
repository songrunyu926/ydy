// 在personalData/persoonal-card 和 send/send-scancode 中使用
<template>
  <div class="card-model">
      <div class="card-header-left">
        <p class="left-tip">扫描二维码快速寄件</p>
        <img
          src="../../assets/images/login/card-ercode.jpeg"
          alt="二维码加载失败"
        />
        <button class="left-btn">点击下载高清二维码</button>
      </div>
      <div class="card-header-right">
        <div class="right-container">
          <div>
            <span style="color: #333;line-height: 35px">寄件链接</span>
            <span style="color: #666;font-size: 14px;" ref="myLink">https://www.baidu/text/xxx.html</span>
          </div>
          <button @click.prevent="copyLink">复制</button>
          <div>
            <span style="color: #333;line-height: 35px;font-size: 14px;">Tips:可以将寄件链接发给你的朋友</span>
            <span style="color: #333;font-size: 14px;">点击链接即可快速下单给你</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import {copyToClipboard} from "@/util";

export default {
  name: 'card-model',
  methods: {
    //点击复制按钮
    copyLink() {
      copyToClipboard(this.$refs.myLink);
      this.$message({
        message: "链接已复制到粘贴板",
        type: "success"
      });
    }
  }
}
</script>

<style lang="less" scoped>

@import url("../../assets/less/mixin");

  .card-model {
    height: 450px;
    display: flex;
    .card-header-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left-tip {
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
      }
      img {
        width: 300px;
        margin-bottom: 10px;
      }
      .left-btn {
        .button-type120(#5adace,#6CE6DB);
        width: 220px;
      }
    }
    .card-header-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .right-container {
        width: 350px;
        height: 350px;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        button {
          .button-type120(#fff,#111);
          margin-top: -50px;
          width: 200px;
          height: 50px;
          border: 1px solid #333;
          transition: all .5s;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
</style>
