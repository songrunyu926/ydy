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
                size="small"
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
                size="small"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60" style="margin-top: 30px;">
          <el-col :span="12">
            <el-form-item label="选择打印机:" prop="printer">
              <el-select
                v-model="printForm.printer"
                placeholder="请选择打印机"
                style="width: 400px;"
                size="small"
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
      <el-row :gutter="60" style="margin-top: 30px">
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
      top="5vh"
      width="70%"
      center
    >
      <!--查询表单-->
      <el-form
        size="small"
        ref="ecodeSearchForm"
        :model="ecodeSearchForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="使用状态:">
              <el-select
                v-model="ecodeSearchForm.useState"
                placeholder="请选择使用状态"
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
          <el-col :span="6">
            <el-form-item label="打印状态:">
              <el-select
                v-model="ecodeSearchForm.printState"
                placeholder="请选择打印状态"
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
          <el-col :span="6">
            <el-form-item label="分配对象:">
              <el-select
                v-model="ecodeSearchForm.allotUser"
                placeholder="请选择分配对象"
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
          <el-col :span="6">
            <el-form-item label="E邮码:">
              <el-input
                placeholder="请输入E邮码"
                v-model="ecodeSearchForm.ecode"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分配时间:">
              <el-date-picker
                v-model="ecodeSearchForm.allotTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打印时间:">
              <el-date-picker
                v-model="ecodeSearchForm.printTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
       <!-- 显示当前选中的项目数 -->
    <div style="margin: 20px 0 20px;font-size: 12px">
      <span
        >当前选中<span style="color: red;margin: 0 10px;font-size: 14px">{{
          selection.length
        }}</span
        >条</span
      >
    </div>
      <!-- 表格 -->
      <el-table
        ref="addressTable"
        :data="
          showList
        "
        stripe
        border
        highlight-current-row
        style="width: 100%; margin-top: 10px"
        @selection-change="selectionChange"
        size="small"
      >
        <el-table-column type="selection" width="60">
        </el-table-column>
       <el-table-column type="index" label="序号" width="65" align="center">
        </el-table-column>
                <el-table-column prop="allotUser" label="分配对象" width="110" align="center">
        </el-table-column>
        <el-table-column prop="ecode" label="E邮码号" width="190" align="center">
        </el-table-column>
        <el-table-column prop="useState" label="使用状态" width="100" align="center">
        </el-table-column>
        <el-table-column prop="allotPerson" label="分配人" width="100" align="center">
        </el-table-column>
        <el-table-column prop="allotTime" label="分配时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="printTime" label="打印时间" width="200" align="center">
        </el-table-column>
        <el-table-column prop="printState" label="打印状态" width="100" align="center">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div style="margin:30px 0;">
        <el-pagination
          style="float: right;"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, jumper, prev, pager, next "
          :total="allotRecord.length"
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
        allotUser: "",
        allotNum: 100,
        printer: 0
      },
      ecodeSearchForm: {
        useState: "",
        printState: "",
        allotUser: "",
        ecode: "",
        allotTime: "",
        printTime: ""
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
      allotRecord: [
        {
          id: 1,
          allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 2,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 3,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 4,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 5,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 6,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 7,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 8,
          allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 9,
          allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 10,
         allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
        },
        {
          id: 11,
          allotUser: 'xxxxxx  ',
          ecode: 'xxxxxxxxxxxxxxxxx',
          useState: '已使用',
          allotPerson: 'wqewe',
          allotTime: '12:12:12 12:12:12',
          printTime: '12:12:12 12:12:12',
          printState: '为打印'
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
    selectionChange(selection) {
      //拿到选中的数据
      this.selection = selection;
    },
    //切换分页器的显示数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换当前显示页
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  computed: {
    //展示数据
    showList() {
      return this.allotRecord.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.ecode-container {
  padding: 30px 80px;
  .ecode-know {
    width: 1040px;
    height: 570px;
    background: #eeeeee;
    box-sizing: border-box;
    padding: 50px 50px 0 50px;
    margin-bottom: 30px;
    color: #333;
    font-size: 14px;
    .know-title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .know-tip {
      line-height: 1.6;
    }
    ul {
      margin: 10px 0;
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
      margin-bottom: 20px;
    }
  }
  .ecode-allot {
    .allot-title {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 30px;
      p {
        font-size: 18px;
        margin-right: 40px;
      }
      span {
        font-size: 14px;
        color: #0056cc;
        &:hover {
          color: #f40;
        }
      }
    }
    .allot-form {
      .print-test {
        margin-top: 4px;
        .button-type120(#efdd49, #f6e661);
        width: 200px;
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
    display: flex;
    padding-left: 30px;
    .search-btn {
      .button-type120(#5adace, #6ce6db);
      margin-right: 20px;
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
    margin-top: 30px;
    display: flex;
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
    margin-top: 20px;
  }
}
</style>
