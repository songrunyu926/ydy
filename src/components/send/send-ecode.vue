<template>
  <div class="ecode-container">
    <!-- 第一步 -->
    <div class="ecode-know">
      <p class="know-title">第一步：了解E邮码</p>
      <p class="know-tip">E邮码就是电子交接码,其优点主要有几点</p>
      <ul>
        <li>
          <i>1</i>
          <span>E邮码 = 面单号</span>
        </li>
        <li>
          <i>2</i>
          <span>即用即打，无需提前购买</span>
        </li>
        <li>
          <i>3</i>
          <span>成本低，纸张可淘宝购买</span>
        </li>
      </ul>
      <div class="know-img">
        <img src="../../assets/images/ecode/ecode-1.jpg" alt="" />
        <img src="../../assets/images/ecode/ecode-2.jpg" alt="" />
        <img src="../../assets/images/ecode/ecode-3.jpg" alt="" />
      </div>
      <p class="know-tip">
        E邮码共2联，第一联用于客户扫码下单并留存，第二联贴在交接的快件上，业务员回去后手机扫码即可快速打单。
      </p>
      <p class="know-tip">
        E邮码作为线下订单的补充方案，可以有效提升客户工作效率和寄件体验。
      </p>
    </div>
    <!-- 第二步 -->
    <div class="ecode-allot">
      <div class="allot-title">
        <p>第二步：分配E邮码</p>
        <span @click="historyDialogVisible = true">查看历史分配记录</span>
      </div>
      <el-form
        :model="printForm"
        :rules="rules"
        ref="printForm"
        label-width="150px"
        class="allot-form"
      >
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="分配对象:" prop="allotUser">
              <el-select
                v-model="printForm.allotUser"
                placeholder="请选择分配对象"
                style="width: 400px;"
              >
                <el-option label="分配1" value="1"></el-option>
                <el-option label="分配2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分配数量:" prop="allotNum">
              <el-input-number
                v-model="printForm.allotNum"
                :min="1"
                :max="1000"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60" style="margin-top: 40px;">
          <el-col :span="12">
            <el-form-item label="选择打印机:" prop="printer">
              <el-select
                v-model="printForm.printer"
                placeholder="请选择打印机"
                style="width: 400px;"
              >
                <el-option label="打印机1" value="1"></el-option>
                <el-option label="打印机2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <button class="print-test">打印测试</button>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="60" style="margin-top: 60px">
        <el-col :span="6" :offset="6">
          <button class="confirm-btn">打印订单</button>
        </el-col>
        <el-col :span="6">
          <button class="delay-btn">取消</button>
        </el-col>
      </el-row>
    </div>
    <!-- 历史分配记录弹出框 -->
    <el-dialog
      title="历史分配记录"
      :visible.sync="historyDialogVisible"
      width="60%"
      center
    >
      <!-- 第一行查询 -->
      <el-row :gutter="60" style="margin-top: 40px">
        <el-col :span="12">
          <div>
            使用状态：
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 400px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            打印状态：
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 400px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 第二行查询 -->
      <el-row :gutter="60" style="margin-top: 40px">
        <el-col :span="12">
          <div>
            分配对象：
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 400px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="4" offset="1">
              <span style="line-height: 40px">E邮码:</span>
            </el-col>
            <el-col :span="17" pull="1">
              <el-input placeholder="请输入E邮码" v-model="ecode"> </el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 时间1 -->
      <el-row :gutter="60" style="margin-top: 40px">
        <el-col :span="3" style="line-height: 45px">
          <span>分配时间:</span>
        </el-col>
        <el-col :span="9" pull="1">
          <el-date-picker
            v-model="value2"
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
      <!-- 时间2 -->
      <el-row :gutter="60" style="margin-top: 40px">
        <el-col :span="3" style="line-height: 45px">
          <span>打印时间:</span>
        </el-col>
        <el-col :span="9" pull="1">
          <el-date-picker
            v-model="value2"
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
      <!-- 查询按钮 -->
      <div class="dialog-btn">
        <button class="search-btn">
          <i class="iconfont icon-chaxun"></i>查询
        </button>
        <button class="reset-btn">
          <i class="iconfont icon-zhongzhi"></i>重置
        </button>
      </div>
      <div class="small-btn">
        <button class="reset-print-btn">
          重新打印
        </button>
        <button class="batch-invalid-btn">
          批量作废
        </button>
      </div>
      <!-- 表格 -->
      <el-table
        ref="addressTable"
        :data="
          addressBook.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        stripe
        border
        highlight-current-row
        style="width: 100%; margin-top: 40px"
        @selection-change="SelectionChange"
      >
        <el-table-column type="selection" width="60">
          <template slot="header">
            <span>选择</span>
          </template>
        </el-table-column>
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
        <el-table-column prop="address" label="地址" width="330" align="center">
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
      <div style="margin:60px 0;">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="historyDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import timeoptions from "../../config/timeoptions";

export default {
  name: "send-ecode",
  data() {
    return {
      printForm: {
        printer: "",
        orderNum: "",
        allotNum: 1
      },
      rules: {
        allotUser: [
          { required: true, message: "请选择打印机", trigger: "blur" }
        ],
        printer: [{ required: true, message: "请选择打印机", trigger: "blur" }],
        allotNum: [
          { required: true, message: "请输入运单号或E邮码", trigger: "blur" }
        ]
      },
      historyDialogVisible: false,
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
      ecode: "",
      pickerOptions: timeoptions,
      addressBook: [
        {
          id: 1,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的"
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
      selection: [],
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
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.ecode-container {
  padding: 80px;
  .ecode-know {
    width: 1040px;
    height: 680px;
    background: #eeeeee;
    box-sizing: border-box;
    padding: 50px 50px 20px 50px;
    margin-bottom: 80px;
    color: #333;
    .know-title {
      font-size: 18px;
      margin-bottom: 25px;
    }
    .know-tip {
      line-height: 1.6;
    }
    ul {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      li {
        height: 110px;
        width: 280px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        i {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          background-color: #5adace;
          line-height: 30px;
          text-align: center;
        }
      }
    }
    .know-img {
      width: 933px;
      height: 243px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
    }
  }
  .ecode-allot {
    .allot-title {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 70px;
      p {
        font-size: 18px;
        margin-right: 40px;
      }
      span {
        color: #0056cc;
        &:hover {
          color: #f40;
        }
      }
    }
    .allot-form {
      .print-test {
        .button-type120(#efdd49, #f6e661);
        width: 250px;
      }
    }
    .confirm-btn {
      .button-type120(#5adace, #6ce6db);
      width: 220px;
    }
    .delay-btn {
      .button-type120(#fff, #111);
      border: 1px solid #111;
      width: 220px;
      &:hover {
        color: #fff;
      }
    }
  }
  .dialog-btn {
    margin-top: 40px;
    display: flex;
    padding-left: 50px;
    .search-btn {
      .button-type120(#5adace, #6ce6db);
      margin-right: 40px;
    }
    .reset-btn {
      .button-type120(#fff, #111);
      border: 1px solid #111;
      &:hover {
        color: #fff;
      }
    }
  }
  .small-btn {
    margin-top: 70px;
    display: flex;
    padding-left: 50px;
    button {
      .button-type120(#fff, #111);
      width: 80px;
      height: 35px;
      border: 1px solid #111;
      margin-right: 20px;
      &:hover {
        color: #fff;
      }
    }
  }
  .dialog-footer {
    display: block;
    margin-top: 40px;
  }
}
</style>
