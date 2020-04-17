<template>
  <div class="send-single">
    <!-- 收件人信息 -->
    <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag">收</p>
        <span class="header-title">收件人信息</span>
        <el-switch
          class="repeat-order"
          v-model="repeatOrder"
          active-text="重复下单"
          size="mini"
        >
        </el-switch>
        <el-input-number
          size="mini"
          v-model="repeatNum"
          :min="1"
          :max="1000"
          :disabled="repeatOrder === false"
        ></el-input-number>
      </div>
      <div class="send-body">
        <el-row :gutter="60">
          <el-col :span="15">
            <div class="body-left">
              <el-form
                :model="receiveForm"
                :rules="rules"
                ref="receiveForm"
                label-width="90px"
                class="receiveinfo-form"
              >
                <el-row :gutter="40">
                  <el-col class="name-item" :span="12">
                    <el-form-item label="姓名:" prop="name">
                      <el-input size="small" v-model="receiveForm.name">
                      </el-input>
                    </el-form-item>
                    <addressbook-popover></addressbook-popover>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item size="small" label="电话:" prop="tel">
                      <el-input
                        ref="receiveTel"
                        v-model.number="receiveForm.tel"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :span="12">
                    <el-form-item label="收件城市:" prop="city">
                      <el-cascader
                        size="small"
                        :options="cityOptions"
                        v-model="receiveForm.city"
                        style="width: 240px"
                      >
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司:" prop="company">
                      <el-input
                        size="small"
                        v-model="receiveForm.company"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="详细地址:" prop="detailAddress">
                  <el-input
                    size="small"
                    v-model="receiveForm.detailAddress"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="body-right">
              <el-input
                ref="receiveText"
                type="textarea"
                :rows="3"
                placeholder="地址智能识别：粘贴地址，例如：马云,1351111111,北京市朝阳区富康路姚家园3楼邮编038300"
                v-model="receiveText"
                resize="none"
                :multiple="false"
                @input="parsingText('receive')"
                style="margin-bottom: 10px;"
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
      <div class="send-footer"></div>
    </div>
    <!-- 寄件人信息 -->
    <div class="send-model">
      <div class="send-header clearfix">
        <p class="header-tag2">寄</p>
        <span class="header-title">寄件人信息</span>
        <el-switch
          class="repeat-order"
          v-model="addAddress"
          active-text="添加到地址簿"
        >
        </el-switch>
      </div>
      <div class="send-body">
        <el-row :gutter="60">
          <el-col :span="15">
            <div class="body-left">
              <el-form
                :model="sendForm"
                :rules="rules"
                ref="sendForm"
                label-width="90px"
                class="sendinfo-form"
              >
                <el-row :gutter="40">
                  <el-col class="name-item" :span="12">
                    <el-form-item label="姓名:" prop="name">
                      <el-input size="small" v-model="sendForm.name">
                      </el-input>
                    </el-form-item>
                    <addressbook-popover></addressbook-popover>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话:" prop="tel">
                      <el-input
                        ref="sendTel"
                        size="small"
                        v-model.number="sendForm.tel"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :span="12">
                    <el-form-item label="寄件城市:" prop="city">
                      <el-cascader
                        size="small"
                        :options="cityOptions"
                        v-model="sendForm.city"
                        style="width: 240px"
                      >
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公司:" prop="company">
                      <el-input
                        ref="sendCompany"
                        size="small"
                        v-model="sendForm.company"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="40">
                  <el-col :span="12">
                    <el-form-item label="详细地址:" prop="detailAddress">
                      <el-input
                        size="small"
                        v-model="sendForm.detailAddress"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="身份证号:"
                      prop="personalNum"
                      size="small"
                    >
                      <el-input
                        size="small"
                        v-model="sendForm.personalNum"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="body-right">
              <el-input
                ref="sendText"
                type="textarea"
                :rows="3"
                placeholder="地址智能识别：粘贴地址，例如：马云,1351111111,北京市朝阳区富康路姚家园3楼邮编038300"
                v-model="sendText"
                resize="none"
                :multiple="false"
                style="margin-bottom: 10px;"
                @input="parsingText('send')"
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
    </div>
    <!-- 包裹信息 -->
    <div class="parcel-model">
      <div class="parcel-header clearfix">
        <p class="header-tag">包</p>
        <span class="header-title">包裹信息</span>
        <el-button
          class="header-btn hover-red"
          type="text"
          style="color: #0056CC;"
          @click="$router.push({ name: 'CourierCompany' })"
          >没有想要的快递公司</el-button
        >
      </div>
      <div class="parcel-body">
        <el-form
          :model="parcelForm"
          :rules="parcelRules"
          ref="parcelForm"
          label-width="90px"
          class="receiveinfo-form"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="快递公司:" prop="courierCompany">
                <el-select
                  size="small"
                  v-model="parcelForm.courierCompany"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <span class="hover-red" style="margin-left: 15px;">刷新</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="快递类型:" prop="courierType">
                <el-select
                  size="small"
                  v-model="parcelForm.courierType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <span class="hover-red" style="margin-left: 15px;"
                  >设为默认</span
                >
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="到付金额:" prop="toPayAmount">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model.number="parcelForm.toPayAmount"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="7">
              <el-form-item label="物品名称:" prop="parcelName">
                <el-input
                  size="small"
                  v-model="parcelForm.parcelName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="17">
              <el-form-item label="物品类型:" prop="parcelType">
                <el-radio-group size="small" v-model="parcelForm.parcelType">
                  <el-radio-button
                    style="margin: 0 10px"
                    v-for="(type, index) in goodTypes"
                    :key="index"
                    :label="index + 1"
                    >{{ type }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="物品重量:" prop="weight">
                <el-input
                  size="small"
                  placeholder="物品重量"
                  v-model="parcelForm.weight"
                >
                  <template slot="append">KG</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="体积:" prop="volume">
                <el-row>
                  <el-col :span="8">
                    <el-form-item prop="len">
                      <el-input
                        size="small"
                        placeholder.number="长度"
                        v-model.number="parcelForm.len"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="wid">
                      <el-input
                        size="small"
                        placeholder="宽度"
                        v-model.number="parcelForm.wid"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="hei">
                      <el-input
                        size="small"
                        placeholder="高度"
                        v-model.number="parcelForm.hei"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:">
                <el-input
                  size="small"
                  v-model="parcelForm.tip"
                  placeholder="物品备注"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-switch
                style="margin:12px 0 0 100px;"
                v-model="subscribeLogistics"
                active-text="订阅物流"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 在添加一个收件人 -->
    <div class="add-receiver">
      <button>
        <i class="iconfont icon-xinzeng"></i>
        再添加一个联系人
      </button>
    </div>
    <!-- 付款方式 打印 -->
    <div class="confirm-print">
      <el-row>
        <el-col :span="3">
          <span style="font-size: 14px;line-height: 2.6;padding-left: 40px;"
            >付款方式:</span
          >
        </el-col>
        <el-col :span="6">
          <el-select
            size="small"
            v-model="payType"
            placeholder="请选择"
            style="width: 350px;"
          >
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
      <el-row :gutter="60" style="margin-top: 30px">
        <el-col :span="6" :offset="6" style="padding: 10px;">
          <el-checkbox v-model="agree" style="color: #111;"
            >我已理解并同意</el-checkbox
          >
          <a href="##" style="color: #0056CC;font-size: 14px;"
            >&nbsp;&nbsp;服务协议</a
          >
        </el-col>
        <el-col :span="6">
          <button @click="printAndaddOrder" class="confirm-btn">
            打印订单
          </button>
        </el-col>
        <el-col :span="6">
          <button class="delay-btn">稍后打印</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import addressBookPopover from "../addressbook-popover/addressbook-popover";

import {
  goodTypes,
  telRule,
  personalNumRule,
  ruleRequired,
  numberRule
} from "@/config";
import { regionData, CodeToText } from "element-china-area-data";
import { parsingInfo } from "@/util";

export default {
  name: "send-single",
  data() {
    return {
      cityOptions: regionData, //城市数据
      //收件人表单数据
      receiveForm: {
        name: "",
        tel: "",
        city: [],
        company: "",
        detailAddress: ""
      },
      //寄件人表单数据
      sendForm: {
        name: "",
        tel: undefined,
        city: [],
        company: "",
        detailAddress: "",
        personalNum: ""
      },
      //包裹表单信息
      parcelForm: {
        courierCompany: "",
        courierType: "",
        toPayAmount: undefined,
        parcelType: undefined,
        weight: undefined,
        len: undefined,
        wid: undefined,
        hei: undefined,
        tip: ""
      },
      receiveText: "", //收件人智能识别字符串
      sendText: "", //寄件人智能识别字符串
      repeatOrder: false, //是否重复下单
      repeatNum: 10, //重复下单数
      addAddress: true, //是否添加到地址簿
      //寄件信息和收件信息校验规则
      rules: {
        name: [ruleRequired("string", "姓名")],
        tel: [ruleRequired("number", "电话号码"), telRule],
        personalNum: [ruleRequired("string", "身份证号码"), personalNumRule],
        city: [ruleRequired("array", "所在城市")],
        detailAddress: [ruleRequired("string", "街道地址")]
      },
      //包裹信息校验规则
      parcelRules: {
        courierCompany: [ruleRequired("string", "快递公司")],
        courierType: [ruleRequired("string", "快递类型")],
        toPayAmount: [numberRule],
        parcelName: [ruleRequired("string", "物品名称")],
        parcelType: [ruleRequired("number", "物品类型")],
        weight: [numberRule],
        len: [numberRule],
        wid: [numberRule],
        hei: [numberRule]
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
      goodTypes: goodTypes, //类别数据
      subscribeLogistics: true, //是否订阅物流
      payType: "", //付款方式
      agree: true //是否同意服务协议
    };
  },
  methods: {
    //立刻打印
    printAndaddOrder() {
      //验证通过三个表单的标记
      let flag = true;
      //三个表单为一个数组 都需要验证
      const formArr = [
        this.$refs.receiveForm,
        this.$refs.sendForm,
        this.$refs.parcelForm
      ];
      //验证表单
      for (let i = 0; i < formArr.length; i++) {
        formArr[i].validate(valid => {
          if (valid) {
            console.log("表单验证通过");
          } else {
            flag = false;
            console.log("验证失败");
            return false;
          }
        });
      }
      if (flag) {
        //验证通过
      } else {
        //未验证通过
        this.$notify.error({
          title: "错误",
          message: "未完成订单信息填写"
        });
      }
    },
    //智能解析
    parsingText(type) {
      try {
        //smartParse方法是全局引入 智能解析 再使用parsingInfo做数据处理
        const info = parsingInfo(this.smartParse(this[`${type}Text`]));
        this[`${type}Form`] = info;
      } catch (error) {
        this.$notify({
          title: "警告",
          message: "格式不正确，请使用正确格式解析",
          type: "warning",
          duration: 1500
        });
      }
      //解决tel表单校验提示的BUG
      setTimeout(() => {
        this.$refs[`${type}Tel`].focus();
      }, 1);
      setTimeout(() => {
        this.$refs[`${type}Text`].focus();
      }, 1);
    }
  },
  components: {
    "addressbook-popover": addressBookPopover
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.send-single {
  padding: 30px 40px;
  .send-model {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .send-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;
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
        margin: 0 20px;
      }
      .repeat-order {
        margin: 0 20px 0 20px;
      }
    }
    .send-body {
      /deep/ .name-item {
        position: relative;
        /deep/ .icon-tongxunlu {
          position: absolute;
          right: 25px;
          top: 10px;
        }
      }
      .body-right {
        .upload {
          .icon-shangchuan1 {
            display: block;
            font-size: 25px;
            color: #999;
            margin: 10px 0 5px;
          }
          .el-upload__text {
            display: block;
            font-size: 12px;
            margin: 0 auto;
            width: 300px;
            line-height: 1.2;
          }
        }
      }
    }
  }
  .parcel-model {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
    .parcel-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;
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
    }
    .parcel-footer {
      margin-top: 10px;
    }
  }
  .add-receiver {
    padding-bottom: 30px;
    margin-bottom: 50px;
    border-bottom: 1px solid #ccc;
    button {
      .button-type120(#6aed6d, #81f484);
      width: 200px;
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
