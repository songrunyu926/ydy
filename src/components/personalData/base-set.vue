<template>
  <div class="base-set">
    <div class="set-info">
      <el-form
        :model="baseSetForm"
        :rules="rules"
        ref="baseSetForm"
        label-width="100px"
        class="set-form"
      >
        <el-form-item label="昵称:" prop="nickName">
          <el-input placeholder="请输入昵称" v-model="baseSetForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="个人简介:" prop="abstract">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入个人简介"
            v-model="baseSetForm.abstract"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别:" required>
          <el-radio-group v-model="baseSetForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="国籍:" prop="country"> 
          <el-country selectBg="selectBlue" groupBg="groupGray" ></el-country>
        </el-form-item>
        <el-form-item label="城市:" prop="city">
           <el-cascader
                size="large"
                :options="options"
                v-model="baseSetForm.city"
                @change="handleChange"
                style="width: 300px"
              >
              </el-cascader>
        </el-form-item>
        <el-form-item label="街道地址:" prop="detailAddress" >
          <el-input v-model="baseSetForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item class="submit-button">
          <el-button type="primary" @click="submitForm('baseSetForm')"
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
        <button><i class="iconfont icon-shangchuan"></i>更换头像</button>
      </el-upload>
    </div>
  </div>
</template>

<script>

import { regionData, CodeToText } from "element-china-area-data";
import elCountry from '@/components/country-and-area/el-country'

export default {
  name: "base-set",
  data() {
    return {
      options: regionData,  //城市下拉数据
      baseSetForm: {
        nickName: "",  //昵称
        abstract: "",  //个人简介
        gender: 1,    //性别
        country: "",   //国家
        city: "",      //城市
        detailAddress: ""  //街道地址
      },
      //校验规则
      rules: {
        nickName: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        country: [
          { required: true, message: "请选择国籍", trigger: "blur" },
        ],
        city: [
          { required: true, message: "请选择城市", trigger: "blur" },
        ],
        detailAddress: [
          { required: true, message: "请输入您的街道地址", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    //城市数据转换
    handleChange(value) {
      let data =
        CodeToText[value[0]] +
        ", " +
        CodeToText[value[1]] +
        ", " +
        CodeToText[value[2]];
      console.log(data);
    },
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
    'el-country': elCountry
  },
  mounted() {
    //订阅省市区组件的消息 定义form中的city字段
    this.bus.$on('selectCity',city => {
      this.baseSetForm.city = city
    })
    //订阅国籍
    this.bus.$on('selectCountry',country => {
      this.baseSetForm.country = country
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
        margin-top: 40px;
        &>* {
          margin-bottom: 30px;
        }
        .submit-button {
          margin-top: 40px;
        }
      }
    }
    &.set-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
      .username {
        margin: 40px auto 30px;
        color: #333;
        font-size: 14px;
      }
      .upload-avatar {
        button {
          outline: none;
          display: block;
          width: 180px;
          height: 40px;
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
