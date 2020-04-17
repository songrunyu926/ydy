<template>
  <div class="user-model">
    <!-- 搜索条件 -->
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
      <el-col :span="7">
        <el-date-picker
          size="small"
          v-model="searchTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
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
      ref="addressTable"
      :data="
        salesmanList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="70" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="cancelOrderPermission"
        label="取消订单权限"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span :class="scope.row.permission ? 'blue' : 'red'">{{
            scope.row.permission ? "是" : "否"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.state | stateColor">{{
            scope.row.state | stateShow
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tip"
        label="备注"
        width="300"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        :label="handleTitle"
        :width="morehandle === false ? 100 : 160"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <button class="edit-btn" @click="updateContact(scope.$index, scope.row)">编辑</button>
          <button
            v-if="morehandle"
            class="del-btn"
            @click="delContact(scope.$index)"
          >
            删除
          </button>
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
        :total="salesmanList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增业务员"
      :visible.sync="dialogVisible"
      center
      width="60%"
    >
      <el-form
        :model="salesmanForm"
        label-position="right"
        :rules="rules"
        ref="salesmanForm"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="ID:">
              <el-input
                v-model="salesmanForm.id"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证:">
              <el-input
                v-model="salesmanForm.personalNum"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="tel">
              <el-input
                v-model.number="salesmanForm.tel"
                size="small"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="name">
              <el-input
                v-model="salesmanForm.name"
                size="small"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="绑定微信ID:" class="marginT20">
          <span>wxid_21321sadadsada</span>
          <el-button size="small" type="primary" style="margin: 0 20px"
            >解绑</el-button
          >
          <el-button size="small">绑定</el-button>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市:" prop="city">
              <el-cascader
                size="small"
                :options="cityOptions"
                v-model="salesmanForm.city"
                @change="handleChange"
                style="width: 350px"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址:" prop="detailAddress">
              <el-input
                v-model="salesmanForm.detailAddress"
                size="small"
                placeholder="请输入详细地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="取消订单权限:">
              <el-switch
                v-model="salesmanForm.permission"
                active-text="开启"
                inactive-text="关闭"
                size="small"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享电子面单:">
              <el-switch
                v-model="salesmanForm.share"
                active-text="开启"
                inactive-text="关闭"
                size="small"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="消息订阅设置:">
              <el-switch
                v-model="salesmanForm.subscribe"
                active-text="开启"
                inactive-text="关闭"
                size="small"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态:">
              <el-radio-group size="small" v-model="salesmanForm.state">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">待激活</el-radio>
                <el-radio :label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注:">
          <el-input
            size="small"
            type="textarea"
            v-model="salesmanForm.tip"
            placeholder="请输入备注"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSalesman">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shortcuts from "@/config/timeoptions";

import { regionData, CodeToText } from "element-china-area-data";
import { telRule, personalCardRule, ruleRequired } from "@/config";

export default {
  name: "salesman",
  data() {
    return {
      cityOptions: regionData, //城市数据
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
      }, //时间搜索条件快捷选项
      searchTime: "", //时间搜索
      salesmanList: [
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: false,  //取消订单权限
          state: 0, //0 激活 1 冻结  2 待激活
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 0,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 1,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 2,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 1,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 1,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 2,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        },
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: true,
          state: 1,
          tip: "sadasdasdasdasdasdasdasdasdasd"
        }
      ], //业务员列表
      selection: [], //选中的表格项
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页
      dialogVisible: false, //新增编辑弹窗 显示隐藏
      salesmanForm: {
        id: "DJFGT32489DF78",
        personalNum: "23453566XXXX324234",
        tel: undefined,
        name: "",
        city: [],
        detailAddress: "",
        permission: true,
        share: true,
        subscribe: true,
        state: 0,
        resource: "",
        tip: ""
      }, //表单对象
      //校验规则
      rules: {
        name: [ruleRequired("string", "姓名")],
        tel: [ruleRequired("number", "电话号码"), telRule],
        personalCard: [ruleRequired("string", "身份证号码"), personalCardRule],
        city: [ruleRequired("array", "所在城市")],
        detailAddress: [ruleRequired("string", "街道地址")]
      },
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
          this.salesmanList[index].name +
          "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.salesmanList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //增加业务员
    addSalesman() {
      this.$refs.salesmanForm.validate(valid => {
        if (valid) {
          //校验通过 发送请求
          //清空表单
          this.$refs.salesmanForm.resetFields();
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
    //修改数据
    updateContact(index, row) {
      
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

//按钮样式
.edit-btn {
  .button-type60(#76bef5, #86c8f8);
}
.del-btn {
  margin-left: 10px;
  .button-type60(#fb8888, #fb9e9e);
}
</style>
