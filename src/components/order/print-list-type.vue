<template>
  <div class="order-container">
    <!-- 搜索条件 -->
    <el-row :gutter="50">
      <el-col :span="3">
        <p style="line-height: 40px;">订单日期:</p>
      </el-col>
      <el-col :span="9">
        <el-radio-group v-model="ChooseTime">
          <el-radio-button :label="1">今天</el-radio-button>
          <el-radio-button style="margin: 0 35px" :label="2"
            >最近一周</el-radio-button
          >
          <el-radio-button :label="3">最近一个月</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="10">
        <el-date-picker
          v-model="orderTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="自定义开始日期"
          end-placeholder="自定义结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top: 40px">
      <el-col :span="6">
        <el-input v-model="orderNum" placeholder="请输入运单号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="sendInfo"
          placeholder="请输入运寄件人姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="receiveInfo"
          placeholder="请输入运收件人姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value" placeholder="请选择快递品牌">
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
    <el-row :gutter="40" style="margin-top: 40px">
      <el-col :span="6">
        <el-select v-model="value" placeholder="请选择快递类型">
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
        <el-select v-model="value" placeholder="请选择任务来源">
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
        <el-select v-model="value" placeholder="请选择业务员">
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
        <el-select v-model="value" placeholder="请选择协议用户">
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
    <el-row :gutter="40" style="margin-top: 40px">
      <el-col :span="6">
        <el-select v-model="value" placeholder="请选择操作人">
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
        <el-select v-model="value" placeholder="请选择打印机">
          <span> {{ listType }}</span>
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
        <el-select v-model="value" placeholder="请选择打印状态">
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
        <button class="search-btn">
          <i class="iconfont icon-chaxun"></i>查询
        </button>
      </el-col>
    </el-row>
    <!-- 操作表格 -->
    <div class="handle-btns">
      <div class="btns-left">
        <el-button plain>打印订单</el-button>
        <el-button plain>导出Excel</el-button>
      </div>
      <div class="btns-right">
        <div class="other">
          <span>选择打印机:</span>
          <el-select
            v-model="value"
            placeholder="请选择订单来源"
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
    <!-- 表格 -->
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
      >
      </el-table-column>
      <el-table-column prop="orderNum" label="运单号" width="140" align="center">
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
      <el-table-column prop="receiver" label="收件人" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="subscribePrint"
        label="预约打印机"
        width="180"
        align="center"
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
      fansList: [
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
      Selection: [],
      pageSize: 5, //每页显示信息数
      currentPage: 1 //当前显示页
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

.order-container {
  padding: 80px;
  .handle-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 80px 0 30px;
    .btns-right {
      display: flex;
      justify-content: center;
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
