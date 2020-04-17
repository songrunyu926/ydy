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
          placeholder="请选择订单来源"
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
          placeholder="请选择目标城市"
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
          placeholder="请选择订单标签"
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
          <i class="iconfont icon-zhongzhi"></i>重置
        </button>
      </el-col>
      <el-col :span="6"> </el-col>
    </el-row>
    <!-- 操作表格 -->
    <div class="handle-btns">
      <div class="btns-left">
        <el-button size="small" plain>{{ firstBtnContent }}</el-button>
        <el-button size="small" :disabled="availableBtn" plain
          >更换快递</el-button
        >
        <el-button
          size="small"
          :disabled="availableBtn"
          v-if="orderType !== 1"
          plain
          >更换类型</el-button
        >
        <el-button size="small" :disabled="availableBtn" plain
          >取消订单</el-button
        >
        <el-button size="small" plain>导出Excel</el-button>
        <el-button @click="delSelection" size="small" plain>批量删除</el-button>
      </div>
      <div class="btns-right">
        <div v-if="orderType === 1" class="wait">
          <span>每次都要确认很麻烦？设置自动接单吧！</span>
          <el-button size="small" plain>设置</el-button>
        </div>
        <div v-else class="other">
          <span>选择打印机:</span>
          <el-select
            v-model="value"
            placeholder="请选择订单来源"
            style="margin: 0 15px;"
            size="small"
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
    <div style="margin: 10px 0 10px;font-size: 12px">
      <span
        >当前选中<span style="color: red;margin: 0 15px">{{
          selection.length
        }}</span
        >条</span
      >
    </div>
    <!-- 表格 -->
    <el-table
      ref="orderTable"
      :data="showList"
      border
      highlight-current-row
      size="mini"
      @selection-change="selectionChange"
      @header-click="headerClick"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="orderTime" label="日期" width="160" align="center">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单号"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="courierCompany"
        label="快递公司"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="businessTypes"
        label="业务类型"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sender" label="寄件人" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="senderTel"
        label="寄件人电话"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="receiver" label="收件人" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="receiverAddress"
        label="收件人地址"
        width="290"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        v-if="handleShow"
        align="center"
        :label="handleTitle"
        :width="orderType === 3 || morehandle === false ? 120 : 200"
        fixed="right"
      >
        <template slot-scope="scope">
          <button class="first-btn" @click="handleFirstBtn">
            {{ orderType === 3 ? "打印订单" : "查看详情" }}
          </button>
          <button
            v-if="orderType !== 3 && morehandle === true"
            class="second-btn"
            @click="delContact(scope.$index)"
          >
            {{ orderType === 1 ? "确认订单" : "预约并打印" }}
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
        :total="orderList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="70%"
      top="2vh"
      center
    >
      <el-row>
        <el-col :span="6">
          <span>订单来源:</span>
          <span>小程序</span>
        </el-col>
        <el-col :span="6">
          <span>订单归属用户ID:</span>
          <span>wewerwerwer</span>
        </el-col>
        <el-col :span="6">
          <span>订单归属业务员:</span>
          <span>小小小</span>
        </el-col>
        <el-col :span="6">
          <span>订单归属协议用户:</span>
          <span>xxxxxxxxxxxxx</span>
        </el-col>
      </el-row>
      <el-row class="marginT20">
        <el-col :span="6">
          <span>快递品牌:</span>
          <span>xxxxxxxx</span>
        </el-col>
        <el-col :span="6">
          <span>快递类型:</span>
          <span>xxxxxxxx</span>
        </el-col>
        <el-col :span="6">
          <span>运单号:</span>
          <span>暂无</span>
        </el-col>
        <el-col :span="6">
          <span>订单标签:</span>
          <span>xxxxxxxxxxxxx</span>
        </el-col>
      </el-row>
      <el-divider style="margin: 20px 0"></el-divider>
      <el-row>
        <el-col :span="6">
          <span>订单状态:</span>
          <span>待确定</span>
        </el-col>
        <el-col :span="6">
          <span>是否实名:</span>
          <span>已实名-23495666xxxxxxxx2345</span>
        </el-col>
        <el-col :span="6">
          <span>订阅物流:</span>
          <span>是</span>
          <el-button
            size="small"
            style="vertical-align: top;margin: -10px 0 0 10px"
            >取消订阅</el-button
          >
        </el-col>
        <el-col :span="6">
          <span>订单分发:</span>
          <span>是 - 微笑系统</span>
          <el-button
            size="small"
            style="vertical-align: top;margin: -10px 0 0 10px"
            >取消分发</el-button
          >
        </el-col>
      </el-row>
      <el-row class="marginT20">
        <el-col :span="6">
          <span>订单时间:</span>
          <span>2020-03-12 10:10:10</span>
        </el-col>
        <el-col :span="6">
          <span>订单号:</span>
          <span>2131232132132132</span>
        </el-col>
        <el-col :span="6">
          <span>打印时间:</span>
          <span>2020-03-12 10:10:10</span>
        </el-col>
        <el-col :span="6">
          <el-button
            size="small"
            type="warning"
            style="vertical-align: top;margin: -10px 0 0 10px"
            >修改下方订单内容</el-button
          >
        </el-col>
      </el-row>
      <el-divider style="margin: 20px 0"></el-divider>
      <el-form
        class="order-form"
        ref="orderForm"
        :rules="rules"
        :model="orderForm"
        label-width="100px"
      >
        <div
          class="form-left"
          style="width: 55%;margin-right: 30px;border-right:1px solid #ccc;padding-right: 30px"
        >
          <h4 class="h4style">寄件人信息</h4>
          <el-row>
            <el-col :span="12">
              <el-form-item label="寄件人:" prop="sendName">
                <el-input size="small" v-model="orderForm.sendName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="寄件人电话:" prop="sendTel">
                <el-input size="small" v-model="orderForm.sendTel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="城市:" prop="sendCity">
                <el-cascader
                  size="small"
                  :options="cityOptions"
                  v-model="orderForm.sendCity"
                  @change="handleChange"
                  style="width: 300px"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址:" prop="sendDetailAddress">
                <el-input
                  size="small"
                  v-model="orderForm.sendDetailAddress"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h4 class="h4style">收件人信息</h4>
          <el-row>
            <el-col :span="12">
              <el-form-item label="收件人:" prop="receiveName">
                <el-input
                  size="small"
                  v-model="orderForm.receiveName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收件人电话:" prop="receiveTel">
                <el-input
                  size="small"
                  v-model="orderForm.receiveTel"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="城市:" prop="receiveCity">
                <el-cascader
                  size="small"
                  :options="cityOptions"
                  v-model="orderForm.receiveCity"
                  @change="handleChange"
                  style="width: 300px"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="详细地址:" prop="receiveDetailAddress">
                <el-input
                  size="small"
                  v-model="orderForm.receiveDetailAddress"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-right" style="width: 45%">
          <h4 class="h4style">打印信息</h4>
          <el-row>
            <el-col :span="12">
              <el-form-item label="打印机:" label-width="80px" prop="printer">
                <el-select v-model="orderForm.printer" size="small">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="打印模版:" prop="printModel">
                <el-select v-model="orderForm.printModel" size="small">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <h4 class="h4style">物品信息</h4>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="物品名称:"
                label-width="80px"
                prop="goodName"
              >
                <el-input size="small" v-model="orderForm.goodName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物品类型:" prop="goodType">
                <el-select
                  size="small"
                  v-model="orderForm.goodType"
                  placeholder="请选择"
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
            <el-col :span="8">
              <el-form-item label="物品重量:" label-width="80px" prop="weight">
                <el-input size="small" v-model="orderForm.weight">
                  <template slot="append">KG</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="体积:" label-width="60px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item prop="len">
                      <el-input
                        size="small"
                        placeholder="长"
                        v-model="orderForm.len"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="wid">
                      <el-input
                        size="small"
                        placeholder="宽"
                        v-model="orderForm.wid"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="hei">
                      <el-input
                        size="small"
                        placeholder="高"
                        v-model="orderForm.hei"
                      >
                        <template slot="append">CM</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:" label-width="80px">
                <el-input size="small" v-model="orderForm.tip"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <h4 class="h4style">金额信息</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="到付金额:"
                label-width="80px"
                prop="toPayAmount"
              >
                <el-input size="small" v-model="orderForm.toPayAmount">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="保价金额:"
                label-width="80px"
                prop="insuranceAmount"
              >
                <el-input size="small" v-model="orderForm.insuranceAmount">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="保价费用:"
                label-width="80px"
                prop="valuationFee"
              >
                <el-input size="small" v-model="orderForm.valuationFee">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-divider></el-divider>
      <h4 class="h4style">操作日志</h4>
      <p style="margin:10px 0">
        操作日志：2020-02-02 13:30:30 待确认 操作人:xxx
      </p>
      <p>操作日志：2020-02-02 13:30:30 待确认 操作人:xxx</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showOrderDetail"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { telRule, ruleRequired, numberRule } from "@/config";

export default {
  name: "order-list-type",
  props: {
    orderType: Number
  },
  data() {
    return {
      ChooseTime: undefined, //快速选择搜索时间
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
          id: 1,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress:
            "上海市普陀区asdsdaasd金沙江路1518弄啊萨达萨达萨达萨达"
        },
        {
          id: 2,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区assdaasd金沙江路1518弄"
        },
        {
          id: 3,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 4,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 5,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 6,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 7,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        },
        {
          id: 8,
          orderTime: "2016-05-02 11:11:11",
          orderNum: "1232142321312131231",
          courierCompany: "韵达快递",
          businessTypes: "标准到付",
          sender: "韵小小达",
          senderTel: "12345677654",
          receiver: "韵小达",
          receiverAddress: "上海市普陀区asdasdaasd金沙江路1518弄"
        }
      ],
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页
      moreSearch: false, //显示更多搜索条件
      morehandle: false, //显示更多操作按钮
      selection: [], //选择多少条
      dialogVisible: false, //弹出框显示隐藏
      orderForm: {
        sendName: "",
        sendTel: "",
        sendCity: [],
        sendDetailAddress: "", //寄件人信息
        receiveName: "",
        receiveTel: "",
        receiveCity: [],
        receiveDetailAddress: "", //收件人信息
        printer: "",
        printModel: "", //打印信息
        goodName: "",
        goodType: "",
        weight: undefined,
        len: undefined,
        wid: undefined,
        hei: undefined,
        tip: "", //物品信息
        toPayAmount: "", //到付金额
        insuranceAmount: "", //保价金额
        valuationFee: "" //保价费用
      },
      rules: {
        sendName: [ruleRequired("string", "寄件人姓名")],
        sendTel: [ruleRequired("number", "电话号码"), telRule],
        sendCity: [ruleRequired("array", "寄件人城市")],
        sendDetailAddress: [ruleRequired("string", "街道地址")],
        receiveName: [ruleRequired("string", "收件人姓名")],
        receiveTel: [ruleRequired("number", "电话号码"), telRule],
        receiveCity: [ruleRequired("array", "收件人城市")],
        receiveDetailAddress: [ruleRequired("string", "街道地址")],
        printer: [ruleRequired("string", "打印机")],
        printModel: [ruleRequired("string", "打印模版")],
        goodName: [ruleRequired("string", "物品名称")],
        goodType: [ruleRequired("string", "物品类型")],
        weight: [numberRule],
        len: [numberRule],
        wid: [numberRule],
        hei: [numberRule],
        toPayAmount: [numberRule],
        insuranceAmount: [numberRule],
        valuationFee: [numberRule]
      },
      cityOptions: regionData, //城市下拉数据
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
      ]
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
              this.orderList = this.orderList.filter(
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
    },
    //打印订单或者查看详情
    handleFirstBtn() {
      if (this.orderType === 3) {
        //打印订单
      } else {
        //查看详情
        this.dialogVisible = true;
      }
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
    //查看详情
    showOrderDetail() {
       this.$refs.orderForm.validate(valid => {
        if (valid) {
          this.dialogVisible = false
           //清理表单
          this.$refs.orderForm.resetFields();

        } else {
          this.$notify.error({
          title: '错误',
          message: '表单信息未正确填写',
          duration: 3000
        });
          return false;
        }
      });
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
      return this.orderType === 1 ||
        this.orderType === 2 ||
        this.orderType === 3
        ? true
        : false;
    },
    //显示的数据
    showList() {
      return this.orderList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    //操作列 列头内容
    handleTitle() {
      if (this.orderType === 1 || this.orderType === 2) {
        return this.morehandle ? "➡  隐藏操作" : "⬅  展开操作";
      } else if (this.orderType === 3) {
        return "操作";
      }
    }
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

.order-form {
  display: flex;
  font-size: 12px;
}

//按钮
.search-btn {
  .button-type120(#5adace, #6ce6db);
  display: inline-block;
  margin: 0 10px;
}
.reset-btn {
  .button-type120(#fff, #111);
  border: 1px solid #111;
  display: inline-block;
  &:hover {
    color: #fff;
  }
}
.first-btn {
  .button-type60(#76bef5, #86c8f8);
  width: 80px;
  height: 26px;
  margin: 0px 8px;
}
.second-btn {
  .button-type60(#efdd49, #f6e661);
  width: 80px;
  height: 26px;
}
</style>
