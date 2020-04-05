<template>
  <div class="user-model">
    <el-row :gutter="24">
      <el-col :span="5">
        <el-input v-model="search" placeholder="请输入姓名或手机号"></el-input>
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
      <el-col :span="4" :offset="3">
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
    </el-row>
    <div style="margin-top: 70px">
      <el-button type="success" plain
        >选择全部</el-button
      >
      <el-button  type="primary" plain
        >反向选择</el-button
      >
      <el-button  type="warning" plain
        >清除选择</el-button
      >
      <el-button type="danger" plain>删除选择</el-button>
    </div>
    <el-table
      ref="fansTable"
      :data="
        fansList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 40px"
      @selection-change="SelectionChange"
    >
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="focusTime" label="关注时间" width="160" align="center">
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="80" align="center">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center">
      </el-table-column>
      <el-table-column prop="wechatAccount" label="微信号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="tip" label="备注" width="300" align="center">
      </el-table-column>
      
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <button class="edit-btn">编辑标签</button>
          <button class="del-btn" @click="delContact(scope.$index)">
            取消关注
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
        :total="fansList.length"
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
  name: "fans",
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
      fansList: [
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        }
      ],
      Selection: [],
      pageSize: 5, //每页显示信息数
      currentPage: 1, //当前显示页
      addAddressFormVisible: false //新增弹框显示
    };
  },
  methods: {
    //表格选择改变的触发事件
    SelectionChange(selection) {
      //拿到选中的数据
      this.selection = selection;
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
        "此操作将永久删除" + this.fansList[index].name + "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.fansList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    }
  },
  computed: {}
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
  .button-type60(#76bef5,#86C8F8);
  width: 80px;
  height: 26px;
  margin: 3px;
}
.del-btn {
  .button-type60(#fb8888,#FB9E9E);
  width: 80px;
  height: 26px;
  margin: 3px;
}
</style>
