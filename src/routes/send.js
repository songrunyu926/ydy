export default [
  {
    path: 'single',
    name: 'Single',
    component: () => import('@/components/send/send-single'),
  },
  {
    path: 'batch',
    name: 'Batch',
    component: () => import('@/components/send/send-batch'),
  },
  {
    path: 'scancode',
    name: 'Scancode',
    component: () => import('@/components/send/send-scancode'),
  },
  {
    path: 'ecode',
    name: 'Ecode',
    component: () => import('@/components/send/send-ecode'),
  },
  {
    path: 'fastprint',
    name: 'Fastprint',
    component: () => import('@/components/send/fastprint'),
  },
  {
    path:'/ydy/send',
    redirect: 'single'
  }
]
