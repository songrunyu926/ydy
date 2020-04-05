<template>
  <div class="detail-form">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="detail-ruleForm"
    >
      <el-form-item label="网点名称:" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="网点代码:" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="面单类型:" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <div class="mdtype-content">
        <el-form-item label="二维码账号:" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
          <span>请使用"散客"类型的二维码账号</span>
        </el-form-item>
        <el-form-item label="二维码密钥:" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
          <span >如密钥有疑问请联系快递公司40089209669</span>
        </el-form-item>
      </div>
      <el-row :gutter="24">
        <el-col :span="10" :pull="2">
          <el-form-item>
            <el-switch
              style="margin-left: 0"
              v-model="value1"
              active-text="默认接单"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="14" :pull="4">
          <el-form-item label="选择模版:" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
            <span>选中后, 该类型的订单将会默认直接接单</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10" :pull="2">
          <el-form-item>
            <el-switch v-model="value1" active-text="默认打印"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="14" :pull="4">
          <el-form-item label="默认打印机:" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
            <span>选中后, 该类型的订单将会默认直接打印(打印机需在线)</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10" :pull="2">
          <el-form-item>
            <el-switch v-model="value1" active-text="二次分发"> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="14" :pull="4">
          <el-form-item label="选择平台:" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14" :push="6">
          <el-form-item label="业务员编码:" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
            <span 
              >选中后,
              该类型的订单将会直接分发给对接的平台，如韵达微笑平台，圆通金刚，中通中天平台</span
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="md-model">
      <p style="font-size:18px;">
        模版预览: {{ company.name }} - {{ company.expressWaybillModel }}
      </p>
      <img src="../../assets/images/company/miandan.png" alt="" />
      <p style="font-size:16px;">鼠标移入图片可预览放大效果</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail-form",
  props: {
    company: Object
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      value1: true,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
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
.detail-form {
  display: flex;
  color: #111;
  .detail-ruleForm {
    width: 50%;
    .mdtype-content {
      border-top: 1px dashed #888;
      border-bottom: 1px dashed #888;
      margin: 20px;
      padding-top: 30px;
    }
  }
  .md-model {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
    img {
      margin: 30px 0 30px;
    }
  }
}
</style>
