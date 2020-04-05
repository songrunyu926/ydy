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
          placeholder="请输入寄件人姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="receiveInfo"
          placeholder="请输入收件人姓名或手机号搜索"
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
        <el-select v-model="value" placeholder="请选择订单来源">
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
        <el-select v-model="value" placeholder="请选择目标城市">
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
        <el-select v-model="value" placeholder="请选择订单标签">
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
      <el-col :span="6"> </el-col>
    </el-row>
    <!-- 操作表格 -->
    <div class="handle-btns">
      <div class="btns-left">
        <el-button size="medium" plain>{{ firstBtnContent }}</el-button>
        <el-button :disabled="availableBtn" plain>更换快递</el-button>
        <el-button :disabled="availableBtn" v-if="orderType !== 1" plain
          >更换类型</el-button
        >
        <el-button :disabled="availableBtn" plain>取消订单</el-button>
        <el-button plain>导出Excel</el-button>
      </div>
      <div class="btns-right">
        <div v-if="orderType === 1" class="wait">
          <span>每次都要确认很麻烦？设置自动接单吧！</span>
          <el-button plain>设置</el-button>
        </div>
        <div v-else class="other">
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
        orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 40px"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="expand" width="80">
        <template slot="header">
          <span>查看详情</span>
        </template>
        <template slot-scope="props">
          <div class="detail-container">
            <p class="detail-header">订 单 详 情</p>
            <div class="detail-content">
              <div class="detail-section">
                <el-row :gutter="50" class="content-row">
                  <el-col :span="6">订单来源: 小程序</el-col>
                  <el-col :span="6">订单归属用户ID: asdsadadsasd</el-col>
                  <el-col :span="6">订单归属业务员: 张三</el-col>
                  <el-col :span="6">订单归属协议客户: 萨达萨达省萨达萨公司</el-col>
                </el-row>
                <el-row :gutter="50" class="content-row">
                  <el-col :span="6">快递品牌: 韵达快递</el-col>
                  <el-col :span="6">快递类型: 标准快递</el-col>
                  <el-col :span="6">运单号: 13232123231231233</el-col>
                  <el-col :span="6">订单标签: 名片码</el-col>
                </el-row>
              </div>
              <div class="detail-section">
                  <el-row :gutter="50" class="content-row">
                  <el-col :span="6">订单状态: 已确认</el-col>
                  <el-col :span="6">是否实名: 已实名</el-col>
                  <el-col :span="6">订阅物流: 是 <button>取消订阅</button></el-col>
                  <el-col :span="6">订单分发: 是-微笑系统</el-col>
                </el-row>
              </div>
            </div>
          </div>
          <p>{{ props.row.nickName }}</p>
          <p>asdasd</p>
          <p>asdasd</p>
          <p>asdasd</p>
          <p>asdasd</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="日期"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="orderNum" label="订单号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="courierCompany" label="快递公司" width="90" align="center">
      </el-table-column>
      <el-table-column prop="businessTypes" label="业务类型" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="sender"
        label="寄件人"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="senderTel" label="寄件人电话" width="110" align="center">
      </el-table-column>
      <el-table-column prop="receiver" label="收件人" width="90" align="center">
      </el-table-column>
      <el-table-column prop="receiverAddress" label="收件人地址" width="270" align="center">
      </el-table-column>
      <el-table-column v-if="handleShow" label="操作" align="center" :width="orderType === 3 ? 120 : 200" fixed="right">
        <template slot-scope="scope">
          <button class="first-btn">{{ orderType === 3 ? '打印订单' : '修改订单'}}</button>
          <button v-if="orderType !== 3"   class="second-btn" @click="delContact(scope.$index)">
            {{ orderType === 1 ? '确认订单' : '预约并打印' }}
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
        :total="orderList.length"
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
    orderType: Number
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
      orderList: [
        {
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdsdaasd金沙江路1518弄",
        },
        {
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区assdaasd金沙江路1518弄",
        },
        {
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
        },
        {
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
        },{
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
        },{
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
        },{
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
        },{
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄",
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
        "此操作将永久删除" + this.orderList[index].name + "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.orderList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    //判断按钮是否可用 1 2 可用 3 4 5 6 不可用
    availableBtn() {
      return this.orderType === 1 || this.orderType === 2 ? false : true;
    },
    //判断第一个按钮内容
    firstBtnContent() {
      switch (this.orderType) {
        case 1:
          return "确认订单";
          break;
        case 2:
          return "预约并打印";
          break;
        case 3:
        case 4:
        case 6:
          return "打印订单";
          break;
        case 5:
          return "确认揽收";
          break;
        default:
          break;
      }
    },
    //是否有操作
    handleShow() {
      return this.orderType === 1 || this.orderType ===2 || this.orderType ===3 ? true : false
    }
  }
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
  background-color: #F4F4F4;
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
    font-size: 12px
  }
}

//按钮
.search-btn {
  .button-type120(#5adace, #6ce6db);
}
.first-btn {
  .button-type60(#76bef5,#86C8F8);
  width: 80px;
  height: 26px;
  margin: 8px;
}
.second-btn {
  .button-type60(#efdd49,#F6E661);
  width: 80px;
  height: 26px;
}
</style>
