<template>
  <div class="address-book">
    <!-- 查询 新增行 -->
    <el-row :gutter="27" class="address-buttons-row">
      <el-col :span="6" class="address-buttons-col">
        <el-input v-model="search" placeholder="请输入姓名或地址"></el-input>
      </el-col>
      <el-col :span="3" class="address-buttons-col">
        <button class="search">
          <i class="iconfont icon-chaxun"></i>
          搜索
        </button>
      </el-col>
      <el-col :span="3" class="address-buttons-col">
        <button class="reset">
          <i class="iconfont icon-zhongzhi"></i>
          重置
        </button>
      </el-col>
      <el-col :span="3" :push="2" class="address-buttons-col">
        <button class="export">导出</button>
      </el-col>
      <el-col :span="3" :push="2" class="address-buttons-col">
        <button class="btach-export">批量导出</button>
      </el-col>
      <el-col :span="3" :push="2" class="address-buttons-col">
        <button class="add" @click="addAddress">
          <i class="iconfont icon-xinzeng"></i>
          新增
        </button>
      </el-col>
    </el-row>
    <!-- 四个选择按钮 -->
    <div style="margin-top: 70px">
      <el-button @click="allSelection(addressBook)" plain
        >选择全部</el-button
      >
      <el-button @click="reverseSelection(addressBook)" plain
        >反向选择</el-button
      >
      <el-button @click="clearSelection" plain
        >清除选择</el-button
      >
      <el-button @click="delSelection" plain>删除选择</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="addressTable"
      :data="
        addressBook.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
        :total="addressBook.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog title="添加联系人" :visible.sync="addAddressFormVisible" center>
      <el-form label-position="left" :model="addressForm" label-width="80px">
        <el-row :gutter="24">
         <el-col :span="12">
            <el-form-item label="姓名:">
          <el-input v-model="addressForm.name"></el-input>
        </el-form-item>
         </el-col>
         <el-col :span="12">
        <el-form-item label="电话:">
          <el-input v-model="addressForm.tel"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="身份证号:">
          <el-input v-model="addressForm.personalCard"></el-input>
        </el-form-item>
        <el-form-item label="标签:">
          <el-tag
            :key="tag"
            v-for="(tag, index) in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            :effect="effect"
            @click="clickTag(index)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 新增标签</el-button
          >
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addressForm.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址:">
          <el-input v-model="addressForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addressForm.tip"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAddressFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddressFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "address-book",
  data() {
    return {
      search: "", //搜索内容
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
      addAddressFormVisible: false, //新增弹框显示
      addressForm: {}, //Dialog信息
      dynamicTags: ["同事", "客户", "家人", "朋友"], //默认标签
      inputVisible: false, //新增标签输入框
      inputValue: "", //新增标签值
      effectChoose: false
    };
  },
  computed: {
    effect() {
      return this.effectChoose ? "dark" : "plain";
    }
  },
  methods: {
    //点击新增
    addAddress() {
      this.addAddressFormVisible = true;
    },
    //全部选择
    allSelection() {
      this.$refs.addressTable.toggleAllSelection();
    },
    //反向选择
    reverseSelection(rows) {
      if (rows) {
        rows.forEach(row => this.$refs.addressTable.toggleRowSelection(row));
      }
    },
    //清除选择
    clearSelection() {
      this.$refs.addressTable.clearSelection();
    },
    //删除选择
    delSelection() {
      if(this.selection.length === 0) {
         this.$message({
            type: "warning",
            message: "请选择联系人"
          });
      }else {
        this.$confirm("此操作将永久删除部分联系人, 是否继续?", "删除联系人", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除操作
          this.selection.forEach(selectItem => {
            this.addressBook = this.addressBook.filter(
              item => selectItem.id !== item.id
            );
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
      }
    },
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
        "此操作将永久删除" + this.addressBook[index].name + "联系人, 是否继续?",
        "删除操作",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.addressBook.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //点击tag标签
    clickTag($event) {
      console.log($event)
      this.effectChoose = !this.effectChoose;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.address-book {
  padding: 65px;
  .address-buttons-col {
    .search {
      .button-type120(#5adace,#6CE6DB);
    }
    .reset {
      .button-type120(#fff,#111);
      border: 1px solid #111;
      &:hover {
        color: #fff;
      }
    }
    .export {
      .button-type120(#efdd49,#F6E661);
    }
    .btach-export {
      .button-type120(#76bef5,#86C8F8);
    }
    .add {
      .button-type120(#6aed6d,#81F484);
    }
  }
}
// 标签
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

// 按钮样式
.edit-btn {
  margin-right: 12px;
  .button-type60(#76bef5,#86C8F8);
}
.del-btn {
  .button-type60(#fb8888,#FB9E9E);
}
</style>
