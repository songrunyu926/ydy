<template>
  <div class="base-set">
    <div class="set-info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="set-form"
      >
        <el-form-item label="昵称:" prop="name">
          <el-input placeholder="请输入昵称" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="个人简介:" prop="abstract">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入个人简介"
            v-model="ruleForm.abstract"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别:" required>
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="国籍:" prop="country">
          <el-select v-model="ruleForm.country" placeholder="请选择国籍">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
          <el-area></el-area>
        </el-form-item>
        <el-form-item label="街道地址:" prop="detailAddress" >
          <el-input v-model="ruleForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item class="submit-button">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >更新信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="set-avatar">
      <el-avatar
        :size="200"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <p class="username"><span>业务员</span> - <span>王大帅</span></p>
      <el-upload
        class="upload-avatar"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        multiple
        :limit="1"
      >
        <button style=""><i class="iconfont icon-shangchuan"></i>更换头像</button>
      </el-upload>
    </div>
  </div>
</template>

<script>

import elArea from '@/components/country-and-area/el-area'

export default {
  name: "base-set",
  data() {
    return {
      ruleForm: {
        nickName: "",  //昵称
        abstract: "",  //个人简介
        gender: "男",    //性别
        country: "",   //国家
        city: "",      //城市
        detailAddress: ""  //街道地址
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
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
  },
  components: {
    'el-area': elArea
  },
  mounted() {
    //订阅省市区组件的消息 定义form中的city字段
    this.bus.$on('chooseCity',city => {
      this.ruleForm.city = city
    })
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.base-set {
  display: flex;
  .clear-float();
  div {
    flex: 1;
    &.set-info {
      .set-form {
        margin-top: 65px;
        &>* {
          margin-bottom: 52px;
        }
        .submit-button {
          margin-top: 60px;
        }
      }
    }
    &.set-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 200px;
      .username {
        margin: 40px auto 30px;
        color: #333;
        font-size: 14px;
      }
      .upload-avatar {
        button {
          outline: none;
          display: block;
          width: 220px;
          height: 50px;
          color: #111;
          border: 1px solid #333;
          background-color: #fff;
          font-size: 14px;
          i {
            font-size: 18px;
            margin-right: 15px;
            vertical-align: middle;
          }
          &:hover {
            color: #fff;
            background: #333;
          }
        }
      }
    }
  }
}
</style>
