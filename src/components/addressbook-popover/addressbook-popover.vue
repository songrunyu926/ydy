<template>
  <el-popover placement="right" width="650" trigger="click" >
    <el-row :gutter="30">
      <el-col :span="8">
        <el-input
          size="small"
          v-model="addressSearch"
          placeholder="请输入姓名或手机号搜索"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-select size="small" v-model="addressTag" placeholder="请选择标签" :clearable="false">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button size="small" icon="el-icon-search" plain>搜索</el-button>
        <el-button size="small" icon="el-icon-refresh-right" type="info" plain
          >重置</el-button
        >
      </el-col>
    </el-row>
    <el-table class="marginT20" size="mini" :data="showList">
      <el-table-column
        align="center"
        width="100"
        property="tag"
        label="标签"
      ></el-table-column>
      <el-table-column
        align="center"
        width="100"
        property="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        width="250"
        property="address"
        label="地址"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        align="center"
        width="100"
        property="realName"
        label="实名状态"
      ></el-table-column>
      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">选择</el-button>
        </template></el-table-column
      >
    </el-table>
    <div style="margin:15px">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10,15, 20]"
        layout="total, sizes, jumper, prev, pager, next "
        :total="addressBook.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <i
      slot="reference"
      style="font-size:20px"
      class="iconfont icon-tongxunlu hover-red"
    ></i>
  </el-popover>
</template>

<script>
export default {
  name: "addressbook-popover",
  data() {
    return {
      addressBook: [
        {
          id: 1,
          date: "2016-05-02",
          tag: "好友",
          realName: "已实名",
          name: "王小虎",
          tel: "18356289987",
          address:
            "安徽省铜陵市铜官区罗家村小区17栋205室的多的 萨达萨达萨达萨达萨达"
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
      addressSearch: "", //弹出框搜索
      addressTag: "", //弹出框标签
      pageSize: 10, //每页显示信息数
      currentPage: 1, //当前显示页
    };
  },
  methods: {
      //切换分页器的显示数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换当前显示页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  computed: {
    //展示数据
    showList() {
      return this.addressBook.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>

<style></style>
