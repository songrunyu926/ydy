<template>
  <div class="fastprint">
    <el-form
      :model="printForm"
      :rules="rules"
      ref="printForm"
      label-width="150px"
      class="demo-printForm"
    >
      <el-form-item label="选择打印机:" prop="printer" style="margin-bottom: 60px">
        <el-select
          v-model="printForm.printer"
          placeholder="请选择打印机"
          style="width: 405px;"
        >
          <el-option label="打印机1" value="1"></el-option>
          <el-option label="打印机2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入运单号或E邮码:" prop="orderNum">
        <el-input v-model="printForm.orderNum" placeholder="请输入运单号或E邮码"></el-input>
      </el-form-item>
    </el-form>
    <button class="submit">快速打印</button>
  </div>
</template>

<script>
export default {
  name: "fastprint",
  data() {
    return {
      printForm: {
        printer: "",
        orderNum: ""
      },
      rules: {
        printer: [{ required: true, message: "请选择打印机", trigger: "blur" }],
        orderNum: [
          { required: true, message: "请输入运单号或E邮码", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.fastprint {
  padding: 100px 320px;
  button {
    margin-top: 60px;
    margin-left: 180px;
    .button-type120(#5adace, #6ce6db);
    width: 220px;
  }
}
</style>
