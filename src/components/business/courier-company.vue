<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <span>已开通快递公司列表</span>
    </div>
    <!-- 公司列表 -->
    <div class="company-list">
      <ul>
        <li v-for="(company, index) in companyList" :key="index">
          <div class="company-top">
            <img :src="company.logo_img" alt="加载失败" />
            <div class="company-title">
              <span class="company-name">{{ company.name }}</span>
              <span
                >剩余面单:
                <i style="color: red">{{
                  company.remainExpressWaybill
                }}</i></span
              >
            </div>
          </div>
          <div class="company-bottom">
            <span>账号类型: {{ company.accountType }}</span>
            <span>自动打印机: {{ company.printer }}</span>
            <span>模版: {{ company.expressWaybillModel }}</span>
            <div>
              <button class="view-btn" @click="viewDetail(index)">
                查看详情
              </button>
              <button class="del-btn">删除</button>
            </div>
          </div>
        </li>
        <li class="add-company">
          <div class="add-view" @click="addCompanyDialogVisible = true">
            <i class="iconfont icon-xinzeng"></i>
            <p>添加更多快递公司</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 表单弹出框 -->
    <el-dialog
      :title="chooseCompany.name"
      :visible.sync="detailFormVisible"
      width="100%"
      top="5vh"
      center
    >
      <el-tabs v-model="courierType">
        <el-tab-pane label="标准快递" name="first">
          <detail-form ref="companyForm" @closeDialog="closeDialog" :company="chooseCompany"></detail-form>
        </el-tab-pane>
        <el-tab-pane label="到付" name="second">敬请期待</el-tab-pane>
        <el-tab-pane label="保价" name="third">敬请期待</el-tab-pane>
        <el-tab-pane label="隐私" name="fourth">敬请期待</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="">取 消</el-button>
        <el-button type="primary" @click="confirmForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加快递公司 -->
    <el-dialog
      title="添加快递公司"
      :visible.sync="addCompanyDialogVisible"
      width="50%"
      center
    >
      <el-row
      >
        <el-col  style="margin-top: 12px" :span="2" :offset="8">
          <span>快递公司:</span>
        </el-col>
        <el-col :span="12">
          <el-select v-model="value" placeholder="请选择快递公司">
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import detailForm from "@/components/company-detail-form/detail-form";

export default {
  name: "courier-company",
  data() {
    return {
      companyList: [
        {
          logo_img: require("../../assets/images/company/company-yunda.jpg"),
          name: "韵达快递",
          remainExpressWaybill: 50,
          accountType: "韵达电子面单",
          printer: "公用打印机",
          expressWaybillModel: "标准三联单 - 200*180" //面单模版
        },
        {
          logo_img: require("../../assets/images/company/company-yunda.jpg"),
          name: "中通快递",
          remainExpressWaybill: 50,
          accountType: "菜鸟电子面单",
          printer: "001打印机",
          expressWaybillModel: "标准三联单 - 300*280" //面单模版
        },
        {
          logo_img: require("../../assets/images/company/company-yunda.jpg"),
          name: "申通快递",
          remainExpressWaybill: 50,
          accountType: "韵达电子面单",
          printer: "002打印机",
          expressWaybillModel: "标准三联单 - 400*380" //面单模版
        }
      ],
      detailFormVisible: false, //dialog显示隐藏
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      courierType: "first", //dialog中的tab切换
      chooseCompany: {}, //当前选中的快递公司
      addCompanyDialogVisible: false, //快递公司dialog开关
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
      value: ""
    };
  },
  methods: {
    //点击查看详情
    viewDetail(index) {
      //选中一个公司
      this.chooseCompany = this.companyList[index];
      this.detailFormVisible = true;
    },
    //确认快递公司详情
    confirmForm() {
      //触发子组件校验功能
       this.$refs.companyForm.validataForm();
    },
    //关闭弹框
    closeDialog() {
      this.detailFormVisible = false
    }
  },
  components: {
    "detail-form": detailForm
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.company-list {
  padding: 30px 40px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    li {
      width: 300px;
      height: 210px;
      background-color: #f4f4f4;
      margin-bottom: 15px;
      padding: 10px;
      .company-top {
        border-bottom: 1px solid #666;
        height: 80px;
        display: flex;
        align-items: flex-start;
        .company-title {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 40px;
          .company-name {
            color: #333333;
            font-weight: 700;
            font-size: 16px;
            line-height: 45px;
          }
        }
      }
      .company-bottom {
        margin-top: 20px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        div {
          .view-btn {
            .button-type60(#5adace, #6ce6db);
            width: 80px;
          }
          .del-btn {
            margin-left: 20px;
            .button-type60(#fff, #111);
            border: 1px solid #111;
            width: 80px;
            &:hover {
              color: #fff;
            }
          }
        }
      }
      &.add-company {
        display: flex;
          justify-content: center;
          align-items: center;
        div {
          height: 160px;
          width: 200px;
          background-color: #5adace;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          i {
            font-size: 35px;
          }
          &:hover {
            background: #6ce6db;
          }
        }
      }
    }
  }
}
</style>
