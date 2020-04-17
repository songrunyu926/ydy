<template>
  <div class="send-batch">
     <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag2">寄</p>
        <span class="header-title">寄件人信息</span>
        <div>
          <el-radio v-model="useType" :label="1">使用地址簿</el-radio>
          <el-radio v-model="useType" :label="2">使用导入寄件人</el-radio>
        </div>
      </div>
      <div class="send-body">
        <el-row>
          <el-col :span="2">
            <span style="color:#ccc;line-height: 50px;">预览</span>
          </el-col>
          <el-col :span="14" style="border: 1px solid #ccc;height: 50px;">
            电话：1312132124 寄件地址：上海市徐汇区振中路xxx号
          </el-col>
        </el-row>
      </div>
      <div class="send-footer">
        <el-switch
          style="margin-left: 100px;"
          v-model="subscribeLogistics"
          active-text="订阅物流"
        >
        </el-switch>
      </div>
    </div>
    <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag">收</p>
        <span class="header-title">收件人信息</span>
      </div>
      <div class="send-body">
        <el-upload
          class="upload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="iconfont icon-shangchuan1"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
            <span> 单表内容建议不超过500行 </span>
          </div>
        </el-upload>
      </div>
      <div class="send-footer">
        <el-row>
          <el-col :span="3">
            <span style="font-size: 14px;line-height: 2.4">请先下载模版:</span>
          </el-col>
          <el-col :span="10">
            <el-button size="small">下载含寄件人模版</el-button>
            <el-button size="small"
              >下载不含寄件人模版</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>   
    <div class="confirm-print">
      <el-row>
        <el-col :span="3">
          <span style="font-size: 14px;line-height: 2.6;padding-left: 40px;">付款方式:</span>
        </el-col>
        <el-col :span="6">
          <el-select size="small" v-model="payType" placeholder="请选择" style="width: 350px;">
            <el-option
              v-for="(value, index) in options"
              :key="index"
              :label="value"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="60" style="margin-top: 30px">
        <el-col :span="6" :offset="12">
          <button class="confirm-btn">打印订单</button>
        </el-col>
        <el-col :span="6">
          <button class="delay-btn">稍后打印</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "send-batch",
  data() {
    return {
      useType: 1, //1 使用地址簿  2 使用导入寄件人
      subscribeLogistics: true,  //是否订阅物流
      options: [
        '到付',
        '月结'
      ],
      payType: undefined  //付款方式
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.send-batch {
  padding: 30px 40px;
  .send-model {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
    .send-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 20px;
      .header-tag {
        width: 30px;
        height: 37px;
        line-height: 29px;
        text-align: center;
        background: url("../../assets/images/send/receive.jpg");
      }
      .header-tag2 {
        width: 30px;
        height: 37px;
        line-height: 29px;
        text-align: center;
        background: url("../../assets/images/send/send.jpg");
      }
      .header-title {
        color: #333;
        font-size: 16px;
        font-weight: 700;
        margin: 0 20px 0 20px;
      }
      .header-btn {
        &:hover {
          color: #f40 !important;
        }
      }
    }
    .send-body {
      .upload {
        .icon-shangchuan1 {
          display: block;
          font-size: 25px;
          color: #999;
          margin: 10px 0 5px;
        }
        .el-upload__text {
          display: block;
          margin: 0 auto;
          width: 200px;
          font-size: 12px;
          line-height: 1.4;
        }
      }
    }
    .send-footer {
      margin-top: 30px;
      .repeat-order {
        margin: 0 40px 0 20px;
      }
    }
  }
  .parcel-model {
    padding-bottom: 80px;
    margin-bottom: 50px;
    border-bottom: 1px solid #ccc;
    .parcel-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 60px;
      .header-tag {
        width: 30px;
        height: 37px;
        line-height: 29px;
        text-align: center;
        background: url("../../assets/images/send/parcel.jpg");
      }
      .header-title {
        color: #333;
        font-size: 16px;
        font-weight: 700;
        margin: 0 20px 0 20px;
      }
      .header-btn {
        &:hover {
          color: #f40 !important;
        }
      }
    }
    .parcel-footer {
      margin-top: 20px;
    }
  }
  .confirm-print {
    .confirm-btn {
      .button-type120(#5adace, #6ce6db);
      width: 220px;
    }
    .delay-btn {
      .button-type120(#fff, #111);
      border: 1px solid #111;
      width: 220px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
