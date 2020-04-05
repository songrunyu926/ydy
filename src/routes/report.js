export default [
  {
    path: 'userreport',
    name: 'UserReport',
    component: () => import('@/components/report/user-report')
  },
  {
    path: '/ydy/report',
    redirect: 'userreport'
  }
]
