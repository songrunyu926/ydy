<template>
  <div class="user-model">
    <!-- 搜索 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          size="small"
          v-model="search"
          placeholder="请输入姓名或手机号"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="state"
          clearable
          placeholder="请选择状态"
          class="width230"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          size="small"
          v-model="searchTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          style="width: 260px"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="state"
          clearable
          placeholder="请选择标签"
          class="width230"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 按钮 搜索 新增 -->
    <el-row :gutter="20" class="search-btns">
      <el-col :span="2">
        <button class="search">
          <i class="iconfont icon-chaxun"></i>
          搜索
        </button>
      </el-col>
      <el-col :span="2">
        <button class="reset">
          <i class="iconfont icon-zhongzhi"></i>
          重置
        </button>
      </el-col>
      <el-col :span="2">
        <button class="add" @click="dialogVisible = true">
          <i class="iconfont icon-xinzeng"></i>
          新增
        </button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="secondaryAccountTable"
      :data="
        secondaryAccountList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 40px"
      @header-click="headerClick"
      size="mini"
    >
      <el-table-column
        prop="dateTime"
        label="添加时间"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="90" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="90" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="127" align="center">
      </el-table-column>
      <el-table-column
        prop="salesman"
        label="业务员"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="state" label="状态" width="90" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.state | stateColor">{{
            scope.row.state | stateShow
          }}</span>
        </template>
      </el-table-column>
     <el-table-column
        show-overflow-tooltip
        prop="tip"
        label="备注"
        width="350"
        align="center"
      >
        
      </el-table-column>
      <el-table-column
        :label="handleTitle"
        :width="morehandle === false ? 90 : 280"
        align="center"
        fixed="right"
      >
        <template>
          <button class="edit-btn">编辑</button>
          <button v-if="morehandle" class="copy-btn">发送激活短信</button>
          <button v-if="morehandle" class="download-btn">二维码</button>
          <button v-if="morehandle" class="del-btn">删除</button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="margin-top: 30px;">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, jumper, prev, pager, next "
        :total="secondaryAccountList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 弹出表单项 -->
    <el-dialog
      title="新增协议用户"
      :visible.sync="dialogVisible"
      center
      width="60%"
    >
      <el-form
        :model="secondaryaccountForm"
        label-position="right"
        :rules="rules"
        ref="secondaryaccountForm"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户名称:">
              <el-input
                v-model="secondaryaccountForm.company"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ID:">
              <el-input
                v-model="secondaryaccountForm.id"
                size="small"
                disabled=""
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <el-col :span="12">
            <el-form-item label="联系人:" prop="contact">
              <el-input
                v-model.number="secondaryaccountForm.contact"
                size="small"
                placeholder="请输入联系人"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="tel">
              <el-input
                v-model.number="secondaryaccountForm.tel"
                size="small"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绑定微信ID:">
              <span>wxid_21321sadadsada</span>
              <el-button size="small" type="primary" style="margin: 0 20px"
                >解绑</el-button
              >
              <el-button size="small">绑定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="共享打印机:" prop="printer">
              <el-select
                v-model="secondaryaccountForm.printer"
                size="small"
                placeholder="内含不共享选项"
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
          <el-col :span="12">
            <el-form-item label="当前状态:">
              <el-radio-group size="small" v-model="secondaryaccountForm.state">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">待激活</el-radio>
                <el-radio :label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            v-model="secondaryaccountForm.tip"
            placeholder="请输入备注"
            :rows="3"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNegotiateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shortcuts from "@/config/timeoptions";

import { regionData, CodeToText } from "element-china-area-data";
import { telRule, personalCardRule, ruleRequired } from "@/config";

export default {
  name: "secondaryaccount",
  data() {
    return {
      search: "", //搜索字段
      stateOptions: [
        {
          value: "选项1",
          label: "激活"
        },
        {
          value: "选项2",
          label: "待激活"
        },
        {
          value: "选项3",
          label: "冻结"
        }
      ], //状态选项
      state: "", //按状态搜索
      pickerOptions: {
        shortcuts
      }, //事件快捷选项
      searchTime: "", //时间搜索
      secondaryAccountList: [
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 0, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasd"
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasd"
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 2, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasd"
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 0, //状态  0激活 1冻结 2待激活
          tip: "sad"
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 2, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsadasdasdasdasdasdsa"
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasd"
        }
      ],
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页

      addAddressFormVisible: false, //新增弹框显示
      options: regionData,
      dialogVisible: false, //新增编辑弹窗 显示隐藏
      //表单对象
      secondaryaccountForm: {
        company: "",
        contact: "",
        tel: undefined,
        tag: "同事",
        printer: "",
        state: 0,
        tip: ""
      },
      //校验规则
      rules: {
        company: [ruleRequired("string", "公司名称")],
        contact: [ruleRequired("string", "联系人")],
        tel: [ruleRequired("number", "手机号码"), telRule],
        personalCard: [ruleRequired("string", "身份证号码"), personalCardRule],
        city: [ruleRequired("array", "所在城市")],
        detailAddress: [ruleRequired("string", "街道地址")],
        salesman: [ruleRequired("string", "业务员")],
        printer: [ruleRequired("string", "共享打印机")]
      },
      //下拉框假数据
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

      inputVisible: false, //新增标签输入框
      inputValue: "", //新增标签值
      dynamicTags: [
        { name: "同事", selected: true }, //默认选中同事
        { name: "客户", selected: false },
        { name: "家人", selected: false },
        { name: "朋友", selected: false }
      ], //默认标签
      //显示操作按钮
      morehandle: false
    };
  },
  methods: {
    //点击列头展示操作按钮
    headerClick(column, event) {
      if (column.fixed) {
        this.morehandle = !this.morehandle;
      }
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
        "此操作将永久删除" +
          this.secondaryAccountList[index].name +
          "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.secondaryAccountList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
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
    },
    //添加协议用户
    addNegotiateUser() {
      this.$refs.secondaryaccountForm.validate(valid => {
        if (valid) {
          //校验通过 发送请求
          //清空表单
          this.$refs.secondaryaccountForm.resetFields();
          //关闭对话框
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "表单未正确填写,请检查",
            type: "warning"
          });
          return false;
        }
      });
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
      this.secondaryaccountForm.tag = this.dynamicTags[index].name;
    }
  },
  computed: {
    //操作列 列头内容
    handleTitle() {
      return this.morehandle ? "➡  隐藏操作" : "⬅  展开操作";
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.user-model {
  padding: 30px 40px 60px;
  .search-btns {
    margin: 15px 30px;
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
    .add {
      .button-type120(#6aed6d, #81f484);
    }
  }
}

.edit-btn {
  .button-type60(#76bef5, #86c8f8);
  width: 40px;
  height: 26px;
}
.del-btn {
  .button-type60(#fb8888, #fb9e9e);
  width: 40px;
  height: 26px;
  margin-left: 3px;
}
.copy-btn {
  .button-type60(#6aed6d, #81f484);
  width: 90px;
  height: 26px;
  margin-left: 3px;
}
.download-btn {
  .button-type60(#efdd49, #f6e661);
  width: 60px;
  height: 26px;
  margin-left: 3px;
}
</style>
