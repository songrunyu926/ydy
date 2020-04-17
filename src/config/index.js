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
    name: '用户管理',
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


//校验规则

//电话格式校验
export const telRule = {
  pattern: /^1[3456789]\d{9}$/,
  message: "电话号码格式不正确",
  trigger: "blur"
}
//身份证格式校验
export const personalNumRule = {
  pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  message: "身份证号码格式不正确",
  trigger: "blur"
}
//金额 长宽高的校验 不小于0
const checkNumber = (rule, value, callback) => {
  let num = +value
  if (!value) {
    return callback(new Error('值不能为空'));
  }
  if (num <= 0) {
    callback(new Error('值不能小于0'));
  }
  if (!/^[0-9]+\.?[0-9]*$/.test(value)) {
    callback(new Error('必须为一个数字'));
  } else {
    callback();
  };
}

export const numberRule = {
  validator: checkNumber,
  trigger: 'blur'
}
//类型自定义，类型不为空 
export function ruleRequired(type, fieldName) {
  return {
    type,
    required: true,
    message: `${fieldName}不能为空`,
    trigger: "change"
  }
}
