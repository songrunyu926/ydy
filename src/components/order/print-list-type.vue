<template>
  <div class="order-container">
    <!-- 搜索条件 -->
    <el-row :gutter="50">
      <el-col :span="3">
        <p style="line-height: 30px;font-size: 14px">订单日期:</p>
      </el-col>
      <el-col :span="7">
        <el-radio-group v-model="ChooseTime" size="small">
          <el-radio-button :label="1">今天</el-radio-button>
          <el-radio-button style="margin: 0 10px" :label="2"
            >最近一周</el-radio-button
          >
          <el-radio-button :label="3">最近一个月</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="10">
        <el-date-picker
          size="small"
          v-model="orderTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="自定义开始日期"
          end-placeholder="自定义结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="margin-top: 20px">
      <el-col :span="6">
        <el-input
          size="small"
          v-model="orderNum"
          placeholder="请输入运单号"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="sendInfo"
          size="small"
          placeholder="请输入寄件人姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="receiveInfo"
          size="small"
          placeholder="请输入收件人姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-select
          v-if="moreSearch"
          size="small"
          v-model="value"
          placeholder="请选择快递品牌"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          style="color: blue"
          v-if="!moreSearch"
          type="text"
          @click="moreSearch = !moreSearch"
          >展开<i style="margin-left: 5px" class="el-icon-arrow-down"></i
        ></el-button>
        <button v-if="!moreSearch" class="search-btn">
          <i class="iconfont icon-chaxun"></i>查询
        </button>
        <button v-if="!moreSearch" class="reset-btn">
          <i class="iconfont icon-zhongzhi"></i>重置
        </button>
      </el-col>
    </el-row>
    <el-row v-if="moreSearch" :gutter="30" style="margin-top: 20px">
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择快递类型"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择任务来源"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择业务员"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择协议用户"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-if="moreSearch" :gutter="30" style="margin-top: 20px">
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择操作人"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择打印机"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col v-if="printType === 4" :span="6">
        <el-select
          size="small"
          v-model="value"
          placeholder="请选择打印状态"
          class="width230"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button
          style="color: blue"
          v-if="moreSearch"
          type="text"
          @click="moreSearch = !moreSearch"
          >收起<i style="margin-left: 5px" class="el-icon-arrow-up"></i
        ></el-button>
        <button class="search-btn">
          <i class="iconfont icon-chaxun"></i>查询
        </button>
        <button class="reset-btn">
          <i class="iconfont icon-chaxun"></i>重置
        </button>
      </el-col>
    </el-row>
    <!-- 操作表格 -->
    <div class="handle-btns">
      <div class="btns-left">
        <el-button size="small" plain>打印订单</el-button>
        <el-button size="small" plain>导出Excel</el-button>
        <el-button @click="delSelection" size="small" plain>批量删除</el-button>
      </div>
      <div class="btns-right">
        <div class="other">
          <span>选择打印机:</span>
          <el-select
            size="small"
            v-model="value"
            placeholder="请选择"
            style="margin: 0 15px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="set">设置为默认打印机</span>
        </div>
      </div>
    </div>
    <!-- 显示当前选中的项目数 -->
    <div style="font-size: 12px">
      <span
        >当前选中<span style="color: red;margin: 0 15px">{{
          selection.length
        }}</span
        >条</span
      >
    </div>
    <!-- 表格 -->
    <el-table
      ref="fansTable"
      :data="
        showList
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 10px"
      @selection-change="selectionChange"
      size="mini"
    >
      <el-table-column type="selection" width="50" fixed="left">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="订单时间"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="taskSource"
        label="任务来源"
        width="130"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="运单号"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="courierCompany"
        label="快递公司"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="businessTypes"
        label="业务类型"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sender" label="寄件人" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="receiver"
        label="收件人"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="subscribePrint"
        label="预约打印机"
        width="180"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="printState"
        label="打印状态"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="printType === 2"
        prop="printNum"
        label="打印次数"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="printType === 3"
        prop="failNum"
        label="失败次数"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-if="printType === 3"
        prop="failReason"
        label="失败原因"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="printTime"
        label="打印时间"
        width="170"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作人"
        width="100"
        align="center"
      >
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
        :page-size="10"
        layout="total, sizes, jumper, prev, pager, next "
        :total="printList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-list-type",
  props: {
    printType: Number //打印状态路由
  },
  data() {
    return {
      ChooseTime: 1, //快速选择搜索时间
      orderTime: "", //搜索时间
      orderNum: "",
      sendInfo: "",
      receiveInfo: "",
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
      value: "",
      printList: [
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        },
        {
          orderTime: "2016-05-02 11:11:11",
          taskSource: "订单开放平台",
          orderNum: "1232123432453",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          receiver: "韵小达",
          subscribePrint: "虹桥萨达萨达省当时的",
          printState: "打印失败",
          printTime: "2016-05-02 11:11:11",
          operator: "似懂非懂"
        }
      ],
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页
      moreSearch: false, //显示更多搜索条件
      morehandle: false, //显示更多操作按钮
      selection: [] //选择多少条
    };
  },
  methods: {
    //表格选择改变的触发事件
    selectionChange(selection) {
      //拿到选中的数据
      this.selection = selection;
    },
    handleselectionChange(val) {
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
        "此操作将永久删除" + this.printList[index].name + "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.printList.splice(index, 1);
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
              this.printList = this.printList.filter(
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
    //显示的数据
    showList() {
      return this.printList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.order-container {
  padding: 30px 40px 60px;
  .handle-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 15px;
    .btns-right {
      display: flex;
      justify-content: center;
      font-size: 14px;
      .wait {
        span {
          color: #e20000;
          font-size: 14px;
        }
      }
      .other {
        .set {
          font-size: 14px;
          color: #0056cc;
          &:hover {
            color: #f40;
          }
        }
      }
    }
  }
}

//订单详情
.detail-container {
  margin: 50px 10px;
  width: 942px;
  height: 1272px;
  background-color: #f4f4f4;
  padding: 40px;
  .detail-header {
    margin-bottom: 40px;
    text-align: center;
    font-size: 18px;
    color: #333;
  }
  .detail-content {
    background-color: #fff;
    padding: 40px;
    font-size: 12px;
  }
}

//按钮
.search-btn {
  .button-type120(#5adace, #6ce6db);
  display: inline-block;
  margin: 0 10px;
  width: 80px;
  height: 32px;
  font-size: 12px;
  line-height: 32px;
  i {
    font-size: 12px;
  }
}
.reset-btn {
  .button-type120(#fff, #111);
  border: 1px solid #111;
  width: 80px;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  display: inline-block;
  i {
    font-size: 12px;
  }
  &:hover {
    color: #fff;
  }
}
.first-btn {
  .button-type60(#76bef5, #86c8f8);
  width: 80px;
  height: 26px;
  margin: 8px;
}
.second-btn {
  .button-type60(#efdd49, #f6e661);
  width: 80px;
  height: 26px;
}
</style>
