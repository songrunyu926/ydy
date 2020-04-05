

//订单子路由
export default [
  {
    path: 'orderlist',
    name: 'OrderList',
    component: () => import('@/components/order/order-list'),
    children : [
      {
        path: ':orderId',
        name: 'OrderListType',
        component: () => import('@/components/order/order-list-type'),
        props: route => ({orderType: +route.params.orderId})
      },
      {
        path: '/ydy/order/orderlist',
        redirect: '/ydy/order/orderlist/1'
      }
    ]
  },
  {
    path: 'printlist',
    name: 'PrintList',
    component: () => import('@/components/order/print-list'),
    children : [
      {
        path: ':printId',
        name: 'PrintListType',
        component: () => import('@/components/order/print-list-type'),
        props: route => ({printType: +route.params.printId})
      },
      {
        path: '/ydy/order/printlist',
        redirect: '/ydy/order/printlist/1'
      }
    ]
  },
  {
    path: '/ydy/order',
    redirect: 'orderlist'
  }
]
