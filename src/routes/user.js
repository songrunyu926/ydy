export default [
  {
    path: 'salesman',
    name: 'Salesman',
    component: () => import('@/components/user/salesman'),
  },
  {
    path: 'negotiateuser',
    name: 'NegotiateUser',
    component: () => import('@/components/user/negotiateuser'),
  },
  {
    path: 'secondaryaccount',
    name: 'SecondaryAccount',
    component: () => import('@/components/user/secondaryaccount'),
  },
  {
    path: 'fans',
    name: 'Fans',
    component: () => import('@/components/user/fans'),
  },
  {
    path:'/ydy/user',
    redirect: 'salesman'
  }
]
