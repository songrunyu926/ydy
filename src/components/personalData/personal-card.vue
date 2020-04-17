<template>
  <div class="personal-card" style="padding: 0 20px">
    <card-model></card-model>
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
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="tip" label="备注" width="80" align="center" show-overflow-tooltip>
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
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="tip" label="备注" width="80" align="center" show-overflow-tooltip>
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

import cardModel from '../personal-card/card-model'


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
          postAddress: "萨达萨达萨达安徽省铜陵市铜官区罗家村小区17栋205室大萨达萨达萨达省",
          tip: "这是备注萨达萨达萨达萨达"
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
          postAddress: "萨达萨达安徽省铜陵市铜官区罗家村小区17栋205室大",
          tip: "这是备注萨达萨达"
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
    }
  },
  components: {
    'card-model': cardModel
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.personal-card {
  .live-post-code,
  .back-post-code {
    border-top: 2px solid #ccc;
    padding: 30px 0;
    .title {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
      padding-left: 20px;
    }
    .explain {
      padding: 30px;
      font-size: 14px;
      background-color: #f4f4f4;
      margin-bottom: 20px;
    }
    .add-btn {
      .button-type120(#6aed6d ,#81F484);
      width: 150px;
      margin-bottom: 20px;
    }
  }
}

// 按钮样式
.edit-btn {
  .button-type60(#76bef5,#86C8F8);
  width: 40px;
  height: 26px;
}
.del-btn {
  .button-type60(#fb8888 ,#FB9E9E);
  width: 40px;
  height: 26px;
  margin: 3px;
}
.copy-btn {
  .button-type60(#6aed6d,#81F484);
  width: 90px;
  height: 26px;
  margin: 3px;
}
.download-btn {
  .button-type60(#efdd49 ,#F6E661);
  width: 80px;
  height: 26px;
}
</style>
