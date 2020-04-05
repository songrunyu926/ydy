<template>
  <div class="send-single">
    <!-- 收件人信息 -->
    <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag">收</p>
        <span class="header-title">收件人信息</span>
        <el-button class="header-btn" type="text" style="color: #0056CC;">
          <i class="iconfont icon-tongxunlu"></i>
          通讯录</el-button
        >
      </div>
      <div class="send-body">
        <el-row :gutter="60">
          <el-col :span="15">
            <div class="body-left">
              <el-form
                :model="receiveInfoForm"
                :rules="rules"
                ref="receiveInfoForm"
                label-width="90px"
                class="receiveinfo-form"
              >
                <el-row :gutter="60" style="margin-bottom: 40px;">
                  <el-col :span="12">
                    <el-form-item label="姓名:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="60" style="margin-bottom: 40px;">
                  <el-col :span="12">
                    <el-form-item label="收件城市:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="详细地址:" prop="name">
                  <el-input v-model="receiveInfoForm.name"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="body-right">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="地址智能识别：粘贴地址，例如：马云,1351111111,北京市朝阳区富康路姚家园3楼邮编038300"
                v-model="textarea"
                resize="none"
                :multiple="false"
                style="margin-bottom: 30px;"
              >
              </el-input>
              <el-upload
                class="upload"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <i class="iconfont icon-shangchuan1"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                  <span>，只能上传jpg/png文件，且不超过500kb</span>
                </div>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="send-footer">
        <el-switch
          class="repeat-order"
          v-model="repeatOrder"
          active-text="重复下单"
        >
        </el-switch>
        <el-input-number
          v-model="repeatNum"
          :min="1"
          :max="1000"
          label="描述文字"
        ></el-input-number>
      </div>
    </div>
    <!-- 寄件人信息 -->
    <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag2">寄</p>
        <span class="header-title">寄件人信息</span>
        <el-button class="header-btn" type="text" style="color: #0056CC;">
          <i class="iconfont icon-tongxunlu"></i>
          通讯录</el-button
        >
      </div>
      <div class="send-body">
        <el-row :gutter="60">
          <el-col :span="15">
            <div class="body-left">
              <el-form
                :model="receiveInfoForm"
                :rules="rules"
                ref="receiveInfoForm"
                label-width="90px"
                class="receiveinfo-form"
              >
                <el-row :gutter="60" style="margin-bottom: 40px;">
                  <el-col :span="12">
                    <el-form-item label="姓名:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="60" style="margin-bottom: 40px;">
                  <el-col :span="12">
                    <el-form-item label="寄件城市:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司:" prop="name">
                      <el-input v-model="receiveInfoForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="详细地址:" prop="name">
                  <el-input v-model="receiveInfoForm.name"></el-input>
                </el-form-item>
                <el-form-item
                  label="身份证号:"
                  prop="name"
                  style="margin-top: 60px;"
                >
                  <el-input v-model="receiveInfoForm.name"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="body-right">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="地址智能识别：粘贴地址，例如：马云,1351111111,北京市朝阳区富康路姚家园3楼邮编038300"
                v-model="textarea"
                resize="none"
                :multiple="false"
                style="margin-bottom: 30px;"
              >
              </el-input>
              <el-upload
                class="upload"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <i class="iconfont icon-shangchuan1"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                  <span>，只能上传jpg/png文件，且不超过500kb</span>
                </div>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="send-footer">
        <el-switch
          class="repeat-order"
          v-model="repeatOrder"
          active-text="添加到地址簿"
        >
        </el-switch>
      </div>
    </div>
    <!-- 包裹信息 -->
    <div class="parcel-model">
      <div class="parcel-header clearfix">
        <p class="header-tag">包</p>
        <span class="header-title">包裹信息</span>
        <el-button class="header-btn" type="text" style="color: #0056CC;"
          >没有想要的快递</el-button
        >
      </div>
      <div class="parcel-body">
        <el-form
          :model="receiveInfoForm"
          :rules="rules"
          ref="receiveInfoForm"
          label-width="90px"
          class="receiveinfo-form"
        >
          <el-row :gutter="30" style="margin-bottom: 40px;">
            <el-col :span="7">
              <el-form-item label="快递公司:" prop="name">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="快递类型:">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <span style="margin-left: 15px;">设为默认</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="到付金额:">
                <el-input
                  placeholder="请输入内容"
                  v-model="receiveInfoForm.name"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" style="margin-bottom: 40px;">
            <el-col :span="7">
              <el-form-item label="物品名称:" prop="name">
                <el-input v-model="receiveInfoForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="17">
              <el-form-item label="物品类型:">
                <el-radio-group v-model="receiveInfoForm.type" size="medium">
                  <el-radio-button
                    style="margin: 0 10px"
                    v-for="(type, index) in goodTypes"
                    :key="index"
                    :label="type"
                  ></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item label="物品重量:">
                <el-input placeholder="物品重量" v-model="receiveInfoForm.name">
                  <template slot="append">KG</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="体积:">
                <el-row>
                  <el-col :span="8">
                    <el-input placeholder="长度" v-model="receiveInfoForm.name">
                      <template slot="append">CM</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input placeholder="宽度" v-model="receiveInfoForm.name">
                      <template slot="append">CM</template>
                    </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input placeholder="高度" v-model="receiveInfoForm.name">
                      <template slot="append">CM</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 40px;">
            <el-col :span="12">
              <el-form-item label="备注:" prop="name">
                <el-input
                  v-model="receiveInfoForm.name"
                  placeholder="物品备注"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
      </div>
      <div class="parcel-footer">
        <el-switch
          style="margin-left: 100px;"
          v-model="subscribeLogistics"
          active-text="订阅物流"
        >
        </el-switch>
      </div>
    </div>
    <!-- 在添加一个收件人 -->
    <div class="add-receiver">
      <button>
        <i class="iconfont icon-xinzeng"></i>
        在添加一个联系人
      </button>
    </div>
    <!-- 付款方式 打印 -->
    <div class="confirm-print">
      <el-row>
        <el-col :span="3">
          <span style="line-height: 2.6;padding-left: 40px;">付款方式:</span>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择" style="width: 350px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="60" style="margin-top: 60px">
        <el-col :span="6" :offset="6" style="padding: 10px;">
          <el-checkbox v-model="checked" style="color: #111;">我已理解并同意</el-checkbox>
          <a href="##" style="color: #0056CC;font-size: 14px;">&nbsp;&nbsp;服务协议</a>
        </el-col>
        <el-col :span="6">
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
import {goodTypes} from "../../config";

export default {
  name: "send-single",
  data() {
    return {
      receiveInfoForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "上海",
        resource: "",
        desc: ""
      },
      textarea: "", //智能识别字符串
      repeatOrder: false, //是否重复下单
      repeatNum: 10, //重复下单数
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      goodTypes: goodTypes,
      subscribeLogistics: true, //是否订阅物流
      checked: true  //是否同意服务协议
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.send-single {
  padding: 80px;
  .send-model {
    padding-bottom: 80px;
    margin-bottom: 80px;
    border-bottom: 1px solid #ccc;
    .send-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 60px;
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
      .body-right {
        .upload {
          .icon-shangchuan1 {
            display: block;
            font-size: 45px;
            color: #999;
            margin: 15px 0 10px;
          }
          .el-upload__text {
            display: block;
            margin: 0 auto;
            width: 300px;
            line-height: 1.2;
          }
        }
      }
    }
    .send-footer {
      margin-top: 60px;
      .repeat-order {
        margin: 0 40px 0 100px;
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
      margin-top: 40px;
    }
  }
  .add-receiver {
    padding-bottom: 50px;
    margin-bottom: 80px;
    border-bottom: 1px solid #ccc;
    button {
      .button-type120(#6aed6d, #81f484);
      width: 200px;
    }
  }
  .confirm-print {
    .confirm-btn {
      .button-type120(#5ADACE,#6CE6DB);
      width: 220px;
    }
    .delay-btn {
      .button-type120(#fff,#111);
      border: 1px solid #111;
      width: 220px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
