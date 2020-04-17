<template>
  <div class="detail-form">
    <el-form
      :model="companyForm"
      status-icon
      :rules="rules"
      ref="companyForm"
      label-width="90px"
      class="detail-companyForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="网点名称:" prop="branchName">
            <el-input
              size="small"
              v-model="companyForm.branchName"
              placeholder="请输入网点名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网点代码:" prop="branchCode">
            <el-input
              size="small"
              v-model="companyForm.branchCode"
              placeholder="请输入网点代码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面单类型:" prop="expressSheetType">
            <el-select
              size="small"
              v-model="companyForm.expressSheetType"
              placeholder="请选择面单类型"
            >
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
      </el-row>
      <!-- 根据面单类型切换 -->
      <div class="mdtype-content">
        <el-row>
          <el-col :span="12">
            <el-form-item label="二维码账号:" prop="ercodeAccount">
              <el-input
                size="small"
                v-model="companyForm.ercodeAccount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col style="margin-top: 10px" :span="12">
            <span style="margin-left: 20px">请使用"散客"类型的二维码账号</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二维码密钥:" prop="ercodeKey">
              <el-input size="small" v-model="companyForm.ercodeKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="margin-top: 10px" :span="12">
            <span style="margin-left: 20px"
              >如密钥有疑问请联系快递公司40089209669</span
            >
          </el-col>
        </el-row>
      </div>
      <!-- 下 -->
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-switch
              size="small"
              style="margin-left: -50px"
              v-model="companyForm.defaultReceive"
              active-text="默认接单"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 15px" :span="10">
          <span style="margin-left: 20px;font-size: 12px"
            >选中后, 该类型的订单将会默认直接接单</span
          >
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择模版:" prop="sheetTemplate">
            <el-select
              size="small"
              v-model="companyForm.sheetTemplate"
              placeholder="请选择模版"
            >
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
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-switch
              style="margin-left: -50px"
              size="small"
              v-model="companyForm.defaultPrint"
              active-text="默认打印"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col style="margin-top: 15px" :span="10">
          <span style="margin-left: 20px;font-size: 12px"
            >选中后, 该类型的订单将会默认直接打印</span
          >
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认打印机:" prop="printer">
            <el-select
              size="small"
              v-model="companyForm.printer"
              placeholder="请选择打印机"
            >
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
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-switch
              style="margin-left: -50px"
              size="small"
              v-model="companyForm.secondaryDistribution"
              active-text="二次分发"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择平台:">
            <el-select
              size="small"
              v-model="companyForm.platform"
              placeholder="请选择平台"
              :disabled="companyForm.secondaryDistribution === false"
            >
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
        <el-col :span="8" :offset="2">
          <el-form-item label="业务员编码:">
            <el-input
              :disabled="companyForm.secondaryDistribution === false"
              size="small"
              v-model="companyForm.salesmanCode"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <span style="margin-left: 80px;font-size: 12px"
        >选中后,
        该类型的订单将会直接分发给对接的平台，如韵达微笑平台，圆通金刚，中通中天平台</span
      >
    </el-form>
    <div class="md-model">
      <p style="font-size:16px;">
        模版预览: {{ company.name }} - {{ company.expressWaybillModel }}
      </p>
      <div class="md-img">
        <pic-zoom :url="imgUrl" :scale="3"></pic-zoom>
      </div>

      <p style="font-size:14px;">鼠标移入图片可预览放大效果</p>
    </div>
  </div>
</template>

<script>
import PicZoom from "vue-piczoom";
import { telRule, personalNumRule, ruleRequired } from "@/config";

export default {
  name: "detail-form",
  props: {
    company: Object
  },
  data() {
    return {
      imgUrl: require("../../assets/images/company/miandan.png"),
      companyForm: {
        branchName: "", //网点名称
        branchCode: "", //网点账号
        expressSheetType: "", //面单类型
        ercodeAccount: "", //二维码账号
        ercodeKey: "", //二维码密钥
        defaultReceive: true, //默认接单
        sheetTemplate: "", //选择模版
        defaultPrint: true, //默认打印
        printer: "", //选择打印机
        secondaryDistribution: true, //二次分发
        platform: "", //平台
        salesmanCode: "" //业务员编码
      },
      //校验
      rules: {
        branchName: [ruleRequired("string", "网点名称")],
        branchCode: [ruleRequired("string", "网点账号")],
        expressSheetType: [ruleRequired("string", "面单类型")],
        ercodeAccount: [ruleRequired("string", "二维码账号")],
        ercodeKey: [ruleRequired("string", "二维码密钥")],
        sheetTemplate: [ruleRequired("string", "模版")],
        expressSheetType: [ruleRequired("string", "面单类型")],
        printer: [ruleRequired("string", "打印机")]
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
      value1: true,
    };
  },
  methods: {
    validataForm() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
           this.$emit("closeDialog");
           //清理表单
          this.$refs.companyForm.resetFields();
        } else {
          this.$notify.error({
          title: '错误',
          message: '表单信息未正确填写',
          duration: 3000
        });
          return false;
        }
      });
    }
  },
  components: {
    "pic-zoom": PicZoom
  }
};
</script>

<style lang="less" scoped>
.detail-form {
  display: flex;
  color: #111;
  .detail-companyForm {
    width: 60%;
    .mdtype-content {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      margin: 20px;
      padding-top: 10px;
    }
  }
  .md-model {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0 auto;
    }
    .md-img {
      margin: 20px auto;
      height: 478px;
      width: 267px;
    }
  }
}
</style>
