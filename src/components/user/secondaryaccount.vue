<template>
  <div class="user-model">
    <!-- 搜索 -->
    <el-row :gutter="24">
       <el-col :span="5">
        <el-input v-model="search" placeholder="请输入姓名或手机号"></el-input>
      </el-col>
      <el-col :span="5">
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
      <el-col :span="9">
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
      <el-col :span="4" :offset="1">
        <el-select v-model="state" clearable placeholder="请选择标签">
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
    <!-- 按钮行 -->
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
        <button class="add">
          <i class="iconfont icon-xinzeng"></i>
          新增
        </button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="secondaryAccountTable"
      :data="
        secondaryAccountList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 60px"
      @selection-change="SelectionChange"
    >
      <el-table-column prop="dateTime" label="添加时间" width="160" align="center">
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="120" align="center">
      </el-table-column>
      <el-table-column prop="salesman" label="业务员" width="120" align="center">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="80" align="center">
         <template slot-scope="scope">
          <span :class="scope.row.state | stateColor">{{
            scope.row.state | stateShow
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tip" label="备注" min-width="150"  align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="320" fixed="right">
           <template>
            <button class="edit-btn">编辑</button>
            <button class="copy-btn">发送激活短信</button>
            <button class="download-btn">二维码</button>
            <button class="del-btn">删除</button>
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
        :total="secondaryAccountList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import shortcuts from "@/config/timeoptions";

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
      ],      //状态选项
      state: "", //按状态搜索
      pickerOptions: {
        shortcuts
      },     //事件快捷选项
      searchTime: "",    //时间搜索
      secondaryAccountList: [
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 0, //状态  0激活 1冻结 2待激活
          tip: 'sadasdasdasdasd'
        },
       {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 1, //状态  0激活 1冻结 2待激活
          tip: 'sadasdasdasdasd'
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 2, //状态  0激活 1冻结 2待激活
          tip: 'sadasdasdasdasd'
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 0, //状态  0激活 1冻结 2待激活
          tip: 'sad'
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 2, //状态  0激活 1冻结 2待激活
          tip: 'sadasdasdasdasdsadasdasdasdasdasdsa'
        },
        {
          dateTime: "2016-05-02 11:11:11",
          tag: "客户",
          name: "王小虎",
          tel: "18356289987",
          salesman: "韵小达",
          state: 1, //状态  0激活 1冻结 2待激活
          tip: 'sadasdasdasdasd'
        },
      ],
      Selection: [],
      pageSize: 5, //每页显示信息数
      currentPage: 1, //当前显示页
      addAddressFormVisible: false, //新增弹框显示
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
        "此操作将永久删除" + this.secondaryAccountList[index].name + "联系人, 是否继续?",
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

.edit-btn {
  .button-type60(#76bef5,#6CE6DB);
  width: 40px;
  height: 26px;
  margin: 3px;
}
.del-btn {
  .button-type60(#fb8888,#FB9E9E);
  width: 40px;
  height: 26px;
  margin: 3px;
}
.copy-btn {
  .button-type60(#6aed6d,#81F484);
  width: 90px;
  height: 26px;
  margin: 3px;
}
.download-btn {
  .button-type60(#efdd49,#F6E661);
  width: 80px;
  height: 26px;
}
</style>
