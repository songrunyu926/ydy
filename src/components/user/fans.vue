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
    </el-row>
    <div style="margin-top: 30px">
      <el-button @click="delSelection" size="small" plain
        >批量取消关注</el-button
      >
    </div>
    <!-- 显示当前选中的项目数 -->
    <div style="margin: 10px 0 10px;font-size: 12px">
      <span
        >当前选中<span style="color: red;margin: 0 15px">{{
          selection.length
        }}</span
        >条</span
      >
    </div>
    <el-table
      ref="fansTable"
      :data="showList"
      stripe
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="selectionChange"
      @header-click="headerClick"
      size="mini"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="focusTime"
        label="关注时间"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="80" align="center">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="wechatAccount"
        label="微信号"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tip" label="备注" width="370" align="center" show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        :label="handleTitle"
        :width="morehandle === false ? 110 : 200"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <button class="edit-btn">编辑标签</button>
          <button
            v-if="morehandle"
            class="del-btn"
            @click="delContact(scope.$index)"
          >
            取消关注
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
        layout="total, sizes, jumper, prev, pager, next"
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
          id: 1,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 2,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 3,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 4,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 5,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 6,
          focusTime: "2016-05-02 11:11:11",
          tag: "好友",
          nickName: "已实名",
          name: "王小虎",
          wechatAccount: "1sadas_dasdasdasdasd",
          tip: "上海市普陀区asdasdaasd金沙江路1518弄"
        }
      ],
      selection: [], //选中
      pageSize: 5, //每页显示信息数
      currentPage: 1, //当前显示页
      addAddressFormVisible: false, //新增弹框显示
      morehandle: false  //是否展示所有操作按钮
    };
  },
  methods: {
    //点击列头展示操作按钮
    headerClick(column, event) {
      if (column.fixed) {
        this.morehandle = !this.morehandle;
      }
    },
    //表格选择改变的触发事件
    selectionChange(selection) {
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
    },
    //删除选择
    delSelection() {
      if (this.selection.length === 0) {
        this.$notify({
          title: "警告",
          message: "请勾选要删除联系人",
          type: "warning",
          duration: 2000
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
              this.fansList = this.fansList.filter(
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
    }
  },
  computed: {
    showList() {
      return this.fansList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
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
  width: 80px;
  height: 26px;
  margin: 0 3px;
}
.del-btn {
  .button-type60(#fb8888, #fb9e9e);
  width: 80px;
  height: 26px;
  margin: 0 3px;
}
</style>
