<template>
  <div class="notice-container">
    <el-row :gutter="40" class="notice-search">
      <el-col :span="6">
        <el-input size="small" v-model="search" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="3">
        <button class="search-btn">
          <i class="iconfont icon-chaxun"></i>搜索
        </button>
      </el-col>
    </el-row>
    <el-row v-for=" (article, index) in articleArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="index" :gutter="50" class="notice-article">
      <el-col :span="22">
        <div>
          <h3 class="notice-title">{{ article.title }}</h3>
          <p class="notice-time">{{ article.time }}</p>
          <p class="notice-content">{{ article.content }}</p>
        </div>
      </el-col>
      <el-col :span="2">
        <button class="del-btn">删除</button>
      </el-col>
    </el-row>
    <!-- 分页器 -->
    <div style="margin-top: 50px;">
      <el-pagination
        style="float: right;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, jumper, prev, pager, next "
        :total="articleArr.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',  //搜索内容
      articleArr: [
        {
          title:'史蒂夫是非得失开发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史sadas 开发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂asdas非得失开发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂ewrwe得失开发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂夫tyry发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂nhgng开发的索科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂夫是洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        },
        {
          title:'史蒂夫是非得失科洛夫都是卡夫卡',
          time: '2020-10-10 12:12:12',
          content: '速度快萨都剌手机登录萨空间的卢萨卡绝对拉升空间的卢卡斯金德拉克撒，撒娇登录萨金德拉克撒就到了撒，萨都剌开始到家啦睡觉的，萨都剌手机登录萨活动款的萨hi 等哈说的话啦收到卡上但是快萨活动卡上开始的开始的库萨开始的肯德基啊是肯定好库萨打开撒娇打开撒娇好看大海开始打开就萨电话卡'
        }
      ],
      pageSize: 5, //每页显示信息数
      currentPage: 1 //当前显示页
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
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixin");

.notice-container {
  padding: 30px 80px 60px;
  .notice-search {
    .search-btn {
      .button-type120(#5adace, #6ce6db);
    }
  }
  .notice-article {
    height: 170px;
    width: 1080px;
    color: #333;
    border-bottom: 1px solid #333;
    .notice-title {
      font-weight: 700;
      margin: 40px 0 15px;
    }
    .notice-time {
      margin-bottom: 15px;
      font-size: 12px;
    }
    .notice-content {
      font-size: 12px;
      line-height: 24px;
    }
    .del-btn {
      margin-top: 60px;
      .button-type60(#fb8888, #fb9e9e);
    }
  }
}
</style>
