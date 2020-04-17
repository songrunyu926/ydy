import dayjs from 'dayjs'

let ydyPlugin = Object.create(null)

ydyPlugin.install = function (Vue, options) {
  //显示激活状态的过滤器
  Vue.filter('stateShow', function(state) {
    switch (state) {
      case 0:
        return '激活'
      case 1:
        return '冻结'
      case 2:
        return '待激活'
      default:
        break;
    }
  })
  //状态颜色改变
  Vue.filter('stateColor', function(state) {
    switch (state) {
      case 0:
        return 'green'
      case 1:
        return 'red'
      case 2:
        return 'gray'
      default:
        break;
    }
  })
  //时间格式过滤器
  Vue.filter('timeFormat', function(time) {
    return dayjs(time).format('YYYY-MM-DD')
  })
}

export default ydyPlugin
