export default {
  getAddress: {
    url: '/position',
    method: 'get',
    corsUrl: '/4000'  //有这个字段说明需要跨域
  },
  getCategory: {
    url: '/index_category',
    method: 'get',
    corsUrl: '/4000',
    needToken: true
  },
  getShop: {
    url: '/shops',
    method: 'get',
    corsUrl: '/4000',
    needToken: true
  }
}
