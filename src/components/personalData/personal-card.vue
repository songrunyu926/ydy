<template>
  <div class="personal-card">
    <div class="card-header">
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
            <span>寄件链接</span>
            <span ref="myLink">https://www.baidu/text/xxx.html</span>
          </div>
          <button @click.prevent="copyLink">复制</button>
          <div>
            <span>Tips:可以将寄件链接发给你的朋友</span>
            <span>点击链接即可快速下单给你</span>
          </div>
        </div>
      </div>
    </div>
    <div class="live-post-code">
      <p class="title">直播订单码</p>
      <div class="explain">
        <p>问：什么是直播订单码？</p>
        <el-divider></el-divider>
        <p>
          答：直播订单码通过绑定一个固定的寄件人信息，收件人扫码后只需要输入收件地址寄可。
          非常适用于直播带货、商务件、批发市场等固定寄件信息的场景，大大提升效率！
        </p>
      </div>
      <button class="add-btn">
        <i class="iconfont icon-xinzeng"></i>
        添加直播码
      </button>
      <el-table :data="livePostList" border style="width: 100%;">
        <el-table-column type="index" :index="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="170"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postName"
          label="寄件人"
          width="70"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postTel"
          label="寄件人电话"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="realName"
          label="实名信息"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postAddress"
          label="寄件地址"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="tip" label="备注" width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <button class="edit-btn">编辑</button>
            <button class="copy-btn">复制链接地址</button>
            <button class="download-btn">下载二维码</button>
            <button class="del-btn">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="back-post-code">
      <p class="title">退件直达码</p>
      <div class="explain">
        <p>问：什么是退件直达码？</p>
        <el-divider></el-divider>
        <p>
          答：退件直达码通过绑定一个固定的收件人信息，寄件人扫码后只需要输入寄件地址寄可。
          非常适用于电商退货，门店调配等固定收件信息的场景，大大提升效率！
        </p>
      </div>
      <button class="add-btn">
        <i class="iconfont icon-xinzeng"></i>
        添加退件码
      </button>
      <el-table :data="livePostList" border style="width: 100%;">
        <el-table-column type="index" :index="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="添加时间"
          width="170"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postName"
          label="收件人"
          width="70"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postTel"
          label="收件人电话"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="realName"
          label="实名信息"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="postAddress"
          label="收件地址"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="tip" label="备注" width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <button class="edit-btn">编辑</button>
            <button class="copy-btn">复制链接地址</button>
            <button class="download-btn">下载二维码</button>
            <button class="del-btn">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import util from "@/util";

export default {
  name: "personal-card",
  data() {
    return {
      subscribeLiveCode: true, //是否显示
      //直播码列表
      livePostList: [
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        }
      ],
      //退件码列表
      livePostList: [
        {
          addTime: "2016-05-02 17:20:20",
          postName: "阿斯顿",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        },
        {
          addTime: "2016-05-02 17:20:20",
          postName: "王小虎",
          postTel: "18089798765",
          realName: "王大帅",
          postAddress: "安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注"
        }
      ]
    };
  },
  methods: {
    index(idx) {
      return idx + 1;
    },
    //点击大复制按钮
    copyLink() {
      console.log(1);
      util.copyToClipboard(this.$refs.myLink);
      this.$message({
        message: "链接已复制到粘贴板",
        type: "success"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.personal-card {
  .card-header {
    height: 730px;
    display: flex;
    .card-header-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left-tip {
        font-size: 18px;
        color: #111;
        margin-bottom: 20px;
      }
      .left-btn {
        .button-type120(#5adace);
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
        width: 445px;
        height: 450px;
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
          .button-type120(#fff);
          margin-top: -50px;
          width: 200px;
          height: 50px;
          border: 1px solid #111;
          &:hover {
            color: #fff;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
  .live-post-code,
  .back-post-code {
    border-top: 2px solid #ccc;
    padding: 80px 0;
    .title {
      font-size: 18px;
      color: #111;
      margin-bottom: 40px;
      padding-left: 20px;
    }
    .explain {
      padding: 40px;
      font-size: 14px;
      background-color: #f4f4f4;
      margin-bottom: 40px;
    }
    .add-btn {
      .button-type120(#6aed6d);
      width: 150px;
      margin-bottom: 30px;
    }
  }
}

// 按钮样式
.edit-btn {
  .button-type60(#76bef5);
  width: 40px;
  height: 26px;
  margin: 3px;
}
.del-btn {
  .button-type60(#fb8888);
  width: 40px;
  height: 26px;
  margin: 3px;
}
.copy-btn {
  .button-type60(#6aed6d);
  width: 90px;
  height: 26px;
  margin: 3px;
}
.download-btn {
  .button-type60(#efdd49);
  width: 80px;
  height: 26px;
}
</style>
