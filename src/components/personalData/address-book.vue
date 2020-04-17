<template>
  <div class="address-book">
    <!-- 查询 新增行 -->
    <el-row :gutter="0" class="address-buttons-row">
      <el-col :span="6" class="address-buttons-col">
        <el-input size="small" v-model="search" placeholder="请输入姓名或地址"></el-input>
      </el-col>
      <el-col :span="3" :offset="1" class="address-buttons-col">
        <button class="search">
          <i class="iconfont icon-chaxun"></i>
          搜索
        </button>
      </el-col>
      <el-col :span="3" class="address-buttons-col">
        <button class="reset">
          <i class="iconfont icon-zhongzhi"></i>
          重置
        </button>
      </el-col>
      <el-col :span="3"  class="address-buttons-col">
        <button class="export">导出</button>
      </el-col>
      <el-col :span="3"  class="address-buttons-col">
        <button class="add" @click="addAddress">
          <i class="iconfont icon-xinzeng"></i>
          新增
        </button>
      </el-col>
    </el-row>
    <!-- 四个选择按钮 -->
    <div style="margin-top: 40px">
      <el-button size="small" @click="delSelection" plain>删除选择</el-button>
    </div>
    <!-- 显示当前选中的项目数 -->
    <div style="margin: 20px 0 -20px;font-size: 12px">
      <span
        >当前选中<span style="color: red;margin: 0 10px;font-size: 14px">{{
          selection.length
        }}</span
        >条</span
      >
    </div>
    <!-- 表格 -->
    <el-table
      ref="addressTable"
      :data="list"
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 40px"
      @selection-change="selectionChange"
      size="mini"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="date" label="日期" width="120" align="center">
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="70" align="center">
      </el-table-column>
      <el-table-column prop="realName" label="实名" width="70" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="90" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="120" align="center">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="地址" width="350" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <button class="edit-btn">编辑</button>
          <button class="del-btn" @click="delContact(scope.$index)">
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="margin:40px 0 20px;">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, jumper, prev, pager, next "
        :total="addressBook.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog
      width="60%"
      title="添加联系人"
      :visible.sync="addAddressFormVisible"
      center
    >
      <el-form
        label-position="right"
        :rules="rules"
        ref="addressForm"
        :model="addressForm"
        label-width="100px"
      >
        <el-row :gutter="40" style="margin-bottom: 20px">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="name">
              <el-input
                v-model="addressForm.name"
                placeholder="请输入姓名"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话:" prop="tel">
              <el-input
                v-model.number="addressForm.tel"
                placeholder="请输入电话号码"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-bottom: 20px">
          <el-col :span="12">
            <el-form-item label="身份证号:" prop="personalNum">
              <el-input
                v-model="addressForm.personalNum"
                placeholder="请输入身份证号码"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签:">
              <el-tag
                :key="tag.name"
                v-for="(tag, index) in dynamicTags"
                closable
                @close="handleClose(tag)"
                :effect="tag.selected ? 'dark' : 'light'"
                @click="clickTag(index, $event)"
              >
                {{ tag.name }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ 新增标签</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-bottom: 20px">
          <el-col :span="12">
            <el-form-item label="城市:" prop="city">
              <el-cascader
                size="small"
                :options="cityOptions"
                v-model="addressForm.city"
                @change="handleChange"
                style="width: 300px"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址:" prop="detailAddress">
              <el-input
                v-model="addressForm.detailAddress"
                placeholder="请输入详细地址"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAddressFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContact">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { telRule, personalNumRule, ruleRequired } from "@/config";

export default {
  name: "address-book",
  data() {
    return {
      search: "", //搜索内容
      addressBook: [
        {
          id: 1,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的 萨达萨达萨达萨达萨达"
        },
        {
          id: 2,
          date: "2017-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 3,
          date: "2018-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 4,
          date: "2019-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 5,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 6,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 7,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 8,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 9,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 10,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 11,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        },
        {
          id: 12,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "上海市普陀区金沙江路1518弄"
        }
      ],
      selection: [], //选择多少条
      pageSize: 5, //每页显示信息数
      currentPage: 1, //当前显示页
      addAddressFormVisible: false, //新增弹框显示
      addressForm: {
        name: "",
        tel: "",
        personalNum: "",
        tag: "同事",
        city: [],
        detailAddress: ""
      }, //新增信息
      dynamicTags: [
        { name: "同事", selected: true }, //默认选中同事
        { name: "客户", selected: false },
        { name: "家人", selected: false },
        { name: "朋友", selected: false }
      ], //默认标签
      inputVisible: false, //新增标签输入框
      inputValue: "", //新增标签值
      //校验规则
      rules: {
        name: [ruleRequired("string", "姓名")],
        tel: [ruleRequired("number", "电话号码"), telRule],
        personalNum: [ruleRequired("string", "身份证号码"), personalNumRule],
        city: [ruleRequired("array", "所在城市")],
        detailAddress: [ruleRequired("string", "街道地址")]
      },
      cityOptions: regionData //城市下拉数据
    };
  },
  computed: {
    list() {
      return this.addressBook.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
    //表格选中项
  },
  methods: {
    //点击新增
    addAddress() {
      this.addAddressFormVisible = true;
    },
    //全部选择
    allSelection() {
      this.$refs.addressTable.toggleAllSelection();
    },
    //反向选择
    reverseSelection(rows) {
      this.$refs.addressTable.toggleAllSelection();
    },
    //清除选择
    clearSelection() {
      this.$refs.addressTable.clearSelection();
    },
    //删除选择
    delSelection() {
      if (this.selection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择联系人"
        });
      } else {
        this.$confirm("此操作将永久删除部分联系人, 是否继续?", "删除联系人", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //删除操作
            this.selection.forEach(selectItem => {
              this.addressBook = this.addressBook.filter(
                item => selectItem.id !== item.id
              );
            });
            this.$notify({
              title: "成功",
              message: "已删除联系人",
              type: "success",
              duration: 2000
            });
          })
          .catch(() => {});
      }
    },
    //表格选择改变的触发事件
    selectionChange(selection) {
      //拿到选中的数据
      this.selection = selection;
    },
    //切换分页器的显示数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换当前显示页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除一条数据
    delContact(index) {
      this.$confirm(
        "此操作将永久删除" + this.addressBook[index].name + "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.addressBook.splice(index, 1);
          this.$notify({
            title: "成功",
            message: "已删除联系人",
            type: "success",
            duration: 2000
          });
        })
        .catch(() => {});
    },
    //点击删除一个标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //出现标签新增输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //完成一个新标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({ name: inputValue, selected: false });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //点击tag标签
    clickTag(index) {
      //排他
      this.dynamicTags.map(item => (item.selected = false));
      this.dynamicTags[index].selected = true;
      //给表单tag赋值
      this.addressForm.tag = this.dynamicTags[index].name;
    },
    //添加联系人
    addContact() {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          //校验通过 发送请求

          //清理表单
          this.$refs.addressForm.resetFields();
          //关闭对话框
          this.addAddressFormVisible = false;
        } else {
          this.$message({
            message: "表单未正确填写,请检查",
            type: "warning"
          });
          return false;
        }
      });
    },
    //城市数据转换
    handleChange(value) {
      let data =
        CodeToText[value[0]] +
        ", " +
        CodeToText[value[1]] +
        ", " +
        CodeToText[value[2]];
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.address-book {
  padding: 30px 60px 50px;
  .address-buttons-col {
    .search {
      .button-type120(#5adace, #6ce6db);
    }
    .reset {
      .button-type120(#fff, #111);
      border: 1px solid #111;
      &:hover {
        color: #fff;
      }
    }
    .export {
      .button-type120(#efdd49, #f6e661);
    }
    .btach-export {
      .button-type120(#76bef5, #86c8f8);
    }
    .add {
      .button-type120(#6aed6d, #81f484);
    }
  }
}
// 标签
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

// 按钮样式
.edit-btn {
  margin-right: 12px;
  .button-type60(#76bef5, #86c8f8);
}
.del-btn {
  .button-type60(#fb8888, #fb9e9e);
}
</style>
