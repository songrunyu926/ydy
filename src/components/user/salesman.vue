<template>
  <div class="user-model">
    <!-- 搜索条件 -->
    <el-row :gutter="24">
      <el-col :span="5">
        <el-input v-model="search" placeholder="请输入姓名或手机号"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="state" clearable placeholder="请选择状态">
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
    <el-row :gutter="24" class="search-btns">
      <el-col :span="3">
        <button class="search">
          <i class="iconfont icon-chaxun"></i>
          搜索
        </button>
      </el-col>
      <el-col :span="3">
        <button class="reset">
          <i class="iconfont icon-zhongzhi"></i>
          重置
        </button>
      </el-col>
      <el-col :span="3">
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
      style="width: 100%; margin-top: 60px"
      @selection-change="SelectionChange"
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
      <el-table-column prop="address" label="地址" width="300" align="center">
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
          <span :class="scope.row.state | stateColor">{{ scope.row.state | stateShow }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tip" label="备注" width="300" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="180">
        <template slot-scope="scope">
          <button class="edit-btn">编辑</button>
          <button class="del-btn" @click="delContact(scope.$index)">
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="margin-top: 80px;">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
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
      width="70%"
    >
      <el-form :model="salesmanForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="ID:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.id"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.persoalNum"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="手机号:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.tel"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="绑定微信ID:" :label-width="formLabelWidth">
          <span>wxid_21321sadadsada</span>
          <el-button type="primary" style="margin: 0 10px">解绑</el-button>
          <el-button>绑定</el-button>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="省市:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址:" :label-width="formLabelWidth">
              <el-input
                v-model="salesmanForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="取消订单权限:" :label-width="formLabelWidth">
              <el-switch
                v-model="salesmanForm.permission"
                active-text="开启"
                inactive-text="关闭"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享电子面单:" :label-width="formLabelWidth">
              <el-switch
                v-model="salesmanForm.share"
                active-text="开启"
                inactive-text="关闭"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="消息订阅设置:" :label-width="formLabelWidth">
              <el-switch
                v-model="salesmanForm.subscribe"
                active-text="开启"
                inactive-text="关闭"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态:" :label-width="formLabelWidth">
              <el-radio-group v-model="salesmanForm.state">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">待激活</el-radio>
                <el-radio :label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="salesmanForm.tip"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shortcuts from "@/config/timeoptions";

export default {
  name: "salesman",
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
      }, //时间搜索条件快捷选项
      searchTime: "", //时间搜索
      salesmanList: [
        {
          dateTime: "2019-10-04 11:11:11",
          name: "韵小达",
          tel: "12345677654",
          address: "上海市青浦区影响东路115弄1111号",
          permission: false,
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
      Selection: [],
      pageSize: 5, //每页显示信息数
      currentPage: 1, //当前显示页

      dialogVisible: false, //新增编辑弹窗 显示隐藏
      salesmanForm: {
        id: "DJFGT32489DF78",
        persoalNum: "23453566XXXX324234",
        tel: "",
        permission: true,
        share: true,
        subscribe: true,
        state: 0,
        type: [],
        resource: "",
        tip: ""
      }, //表单对象
      formLabelWidth: "120px"
    };
  },
  methods: {
    //表格选择改变的触发事件
    SelectionChange(selection) {
      //拿到选中的数据
      this.selection = selection;
      console.log(selection);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    }
  },
  computed: {
    
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.user-model {
  padding: 80px;
  .search-btns {
    margin: 40px 0 60px;
    .search {
      .button-type120(#5adace,#6CE6DB);
    }
    .reset {
      .button-type120(#fff,#111);
      border: 1px solid #111;
      margin: 0 20px;
      &:hover {
        color: #fff;
      }
    }
    .add {
      margin: 0 40px;
      .button-type120(#6aed6d,#81F484);
    }
  }
}

//表格样式 1 权限字体颜色

//按钮样式
.edit-btn {
  margin-right: 12px;
  .button-type60(#76bef5,#86C8F8);
}
.del-btn {
  .button-type60(#fb8888,#FB9E9E);
}
</style>
