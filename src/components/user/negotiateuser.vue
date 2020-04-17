<template>
  <div class="user-model">
    <!-- 搜索 -->
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
          placeholder="请选择状态"
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
      <el-col :span="6">
        <el-date-picker
          size="small"
          v-model="searchTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          style="width: 260px"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-select
          size="small"
          v-model="state"
          clearable
          placeholder="请选择业务员"
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
      <el-col :span="2">
        <button class="add" @click="dialogVisible = true">
          <i class="iconfont icon-xinzeng"></i>
          新增
        </button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      ref="negotiateUserTable"
      :data="
        negotiateUserList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      stripe
      border
      highlight-current-row
      style="width: 100%; margin-top: 40px"
      @header-click="headerClick"
      size="mini"
    >
      <el-table-column
        prop="dateTime"
        label="添加时间"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="company"
        label="名称"
        width="220"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="contact" label="联系人" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="330"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="pushOption"
        label="订单推送业务员"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span :class="scope.row.pushOption ? 'blue' : 'red'">{{
            scope.row.pushOption ? "是" : "否"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="salesman" label="业务员" width="80" align="center">
        <template slot-scope="scope">
          <span class="green">{{ scope.row.salesman }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="share"
        label="共享面单账号"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span :class="scope.row.share ? 'green' : 'red'">{{
            scope.row.share ? "是" : "否"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="80" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.state | stateColor">{{
            scope.row.state | stateShow
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="tip"
        label="备注"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tip }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="handleTitle"
        :width="morehandle === false ? 90 : 280"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <button class="edit-btn">编辑</button>
          <button v-if="morehandle" class="copy-btn">发送激活短信</button>
          <button v-if="morehandle" class="download-btn">二维码</button>
          <button
            v-if="morehandle"
            class="del-btn"
            @click="delContact(scope.$index)"
          >
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="margin-top: 40px;">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, jumper, prev, pager, next "
        :total="negotiateUserList.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      title="新增协议用户"
      :visible.sync="dialogVisible"
      center
      width="60%"
    >
      <el-form
        :model="negotiateUserForm"
        label-position="right"
        :rules="rules"
        ref="negotiateUserForm"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="ID:">
              <el-input
                v-model="negotiateUserForm.id"
                size="small"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称:" prop="company">
              <el-input
                v-model="negotiateUserForm.company"
                size="small"
                placeholder="请输入公司名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人:" prop="contact">
              <el-input
                v-model="negotiateUserForm.contact"
                size="small"
                placeholder="请输入联系人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="tel">
              <el-input
                v-model.number="negotiateUserForm.tel"
                size="small"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号码:">
              <span>46567XXXXXX34565</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绑定微信ID:">
              <span>wxid_21321sadadsada</span>
              <el-button size="small" type="primary" style="margin: 0 20px"
                >解绑</el-button
              >
              <el-button size="small">绑定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市:" prop="city">
              <el-cascader
                size="small"
                :options="cityOptions"
                v-model="negotiateUserForm.city"
                @change="handleChange"
                style="width: 350px"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="街道地址:" prop="detailAddress">
              <el-input
                v-model="negotiateUserForm.detailAddress"
                placeholder="请输入详细地址"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务员:" prop="salesman">
              <el-select
                v-model="negotiateUserForm.salesman"
                placeholder="请选择业务员"
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
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享打印机:" prop="printer">
              <el-select
                v-model="negotiateUserForm.printer"
                placeholder="内含不共享选项"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="共享电子面单:">
              <el-switch
                v-model="negotiateUserForm.share"
                active-text="开启"
                inactive-text="关闭"
                size="small"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信息推送业务员:">
              <el-switch
                v-model="negotiateUserForm.pushInfo"
                active-text="开启"
                inactive-text="关闭"
                size="small"
              >
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="当前状态:">
              <el-radio-group size="small" v-model="negotiateUserForm.state">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">待激活</el-radio>
                <el-radio :label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            v-model="negotiateUserForm.tip"
            placeholder="请输入备注"
            :rows="4"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNegotiateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import shortcuts from "@/config/timeoptions";

import { regionData, CodeToText } from "element-china-area-data";
import { telRule, personalCardRule, ruleRequired } from "@/config";

export default {
  name: "negotiateuser",
  data() {
    return {
      cityOptions: regionData,
      search: "", //搜索字段
      stateOptions: [
        {
          value: "0",
          label: "激活"
        },
        {
          value: "1",
          label: "待激活"
        },
        {
          value: "2",
          label: "冻结"
        }
      ], //状态选项
      state: "", //按状态搜索
      pickerOptions: {
        shortcuts
      }, //事件快捷选项
      searchTime: "", //时间搜索
      negotiateUserList: [
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address:
            "安徽省铜陵市铜官区罗家村小区17栋205室的多的萨达萨达萨达萨达萨达萨达", //地址
          pushOption: false, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: true, //共享面单账号  false 不共享  true 共享
          state: 0, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        },
        {
          dateTime: "2016-05-02 11:11:11", //添加时间
          company: "上海威尔瑞信息科技有限公司", //名称
          contact: "达小韵", //联系人
          tel: "18356289987", //电话
          address: "安徽省铜陵市铜官区罗家村小区17栋205室的多的", //地址
          pushOption: true, //订单推送业务员 false 不推送  true 推送
          salesman: "韵小达", //业务员
          share: false, //共享面单账号  false 不共享  true 共享
          state: 1, //状态  0激活 1冻结 2待激活
          tip: "sadasdasdasdasdsada" //备注
        }
      ],
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页
      dialogVisible: false, //新增编辑弹窗 显示隐藏
      //表单对象
      negotiateUserForm: {
        company: "",
        contact: "",
        tel: undefined,
        city: [],
        detailAddress: "",
        salesman: "",
        printer: "",
        share: true,
        pushInfo: true,
        state: 0,
        tip: ""
      },
      //校验规则
      rules: {
        company: [ruleRequired("string", "公司名称")],
        contact: [ruleRequired("string", "联系人")],
        tel: [ruleRequired("number", "手机号码"), telRule],
        personalCard: [ruleRequired("string", "身份证号码"), personalCardRule],
        city: [ruleRequired("array", "所在城市")],
        detailAddress: [ruleRequired("string", "街道地址")],
        salesman: [ruleRequired("string", "业务员")],
        printer: [ruleRequired("string", "共享打印机")]
      },
      //下拉框假数据
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
      //显示操作按钮
      morehandle: false
    };
  },
  methods: {
    //点击列头展示操作按钮
    headerClick(column, event) {
      if (column.fixed) {
        this.morehandle = !this.morehandle;
      }
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
          this.negotiateUserList[index].name +
          "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.negotiateUserList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
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
    //添加协议用户
    addNegotiateUser() {
      this.$refs.negotiateUserForm.validate(valid => {
        if (valid) {
          //校验通过 发送请求
          //清空表单
          this.$refs.negotiateUserForm.resetFields();
          //关闭对话框
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "表单未正确填写,请检查",
            type: "warning"
          });
          return false;
        }
      });
    }
  },
  computed: {
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
  width: 40px;
  height: 26px;
}
.del-btn {
  .button-type60(#fb8888, #fb9e9e);
  width: 40px;
  height: 26px;
  margin-left: 3px;
}
.copy-btn {
  .button-type60(#6aed6d, #81f484);
  width: 90px;
  height: 26px;
  margin-left: 3px;
}
.download-btn {
  .button-type60(#efdd49, #f6e661);
  width: 60px;
  height: 26px;
  margin-left: 3px;
}
</style>
