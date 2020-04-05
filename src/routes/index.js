import UserRoutes from './user'
import BusinessRoutes from './business'
import OrderRoutes from './order'
import ReportRoutes from './report'
import SendRoutes from './send'
import personaldataRoutes from './personaldata'


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
        component: () => import('@/views/PersonalData.vue'),
        children: personaldataRoutes
      },
      {
        path:'send',
        name: 'Send',
        component: () => import('@/views/Send.vue'),
        children: SendRoutes
      },
      {
        path:'user',
        name: 'User',
        component: () => import('@/views/User.vue'),
        children: UserRoutes
      },
      {
        path:'business',
        name: 'Business',
        component: () => import('@/views/Business.vue'),
        children: BusinessRoutes
      },
      {
        path:'order',
        name: 'Order',
        component: () => import('@/views/Order.vue'),
        children: OrderRoutes
      },
      {
        path:'report',
        name: 'Report',
        component: () => import('@/views/Report.vue'),
        children: ReportRoutes
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
