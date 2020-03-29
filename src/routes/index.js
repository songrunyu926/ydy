export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/ydy',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path:'personaldata',
        name: 'PersonalData',
        component: () => import('@/views/PersonalData.vue')
      },
      {
        path:'send',
        name: 'Send',
        component: () => import('@/views/Send.vue')
      },
      {
        path:'user',
        name: 'User',
        component: () => import('@/views/User.vue')
      },
      {
        path:'business',
        name: 'Business',
        component: () => import('@/views/Business.vue')
      },
      {
        path:'order',
        name: 'Order',
        component: () => import('@/views/Order.vue')
      },
      {
        path:'report',
        name: 'Report',
        component: () => import('@/views/Report.vue')
      },
      {
        path:'/ydy',
        redirect: 'personaldata'
      }
    ],

  },
  {
    path: '/',
    redirect: '/login'
  }
]
