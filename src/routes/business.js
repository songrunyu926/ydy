export default [
  {
    path: 'couriercompany',
    name: 'CourierCompany',
    component: () => import('@/components/business/courier-company.vue')
  },
  {
    path: 'printer',
    name: 'Printer',
    component: () => import('@/components/business/printer.vue')
  },
  {
    path: '/ydy/business',
    redirect: 'couriercompany'
  }
]
