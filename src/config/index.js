//物品类型
export const goodTypes = [
  '文件票件',
  '电子产品',
  '衣物',
  '食品',
  '书籍',
  '其他',
]

//面包屑导航对象
export const bbObj = {
  personaldata: {
    name: '个人资料',
    children: {
      baseset: '基本资料',
      accountbind: '账号绑定',
      addressbook: '地址簿',
      notice: '通知消息',
      personalcard: '个人名片',
      otherdevices: '其他设置',
    }
  },
  send: {
    name: '我要寄件',
    children: {
      single: '单个订单',
      batch: '批量订单',
      scancode: '扫码寄件',
      ecode: 'E邮码订单',
      fastprint: '快速打印'
    }
  },
  user: {
    name: '用户管路',
    children: {
      salesman: '业务员',
      negotiateuser: '协议用户',
      secondaryaccount: '二级账号',
      fans: '粉丝管理'
    }
  },
  business: {
    name: '业务资料',
    children: {
      couriercompany: '快递公司'
    }
  },
  order: {
    name: '订单管理',
    children: {
      orderlist: {
        name: '订单列表',
        type: ['待确定', '已确定', '已预约', '已取消', '未揽收', '全部订单']
      },
      printlist: {
        name: '打印列表',
        type: ['待打印', '已打印', '打印失败', '全部订单']
      }
    }
  },
  report: {
    name: '报表中心',
    children: {
      userreport: '用户报表'
    }
  }
}
