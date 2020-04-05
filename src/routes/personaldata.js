export default [
  {
    path: 'baseset',
    name: 'BaseSet',
    component: () => import('@/components/personalData/base-set')
  },
  {
    path: 'accountbind',
    name: 'AccountBind',
    component: () => import('@/components/personalData/account-bind')
  },
  {
    path: 'addressbook',
    name: 'AddressBook',
    component: () => import('@/components/personalData/address-book')
  },
  {
    path: 'notice',
    name: 'Notice',
    component: () => import('@/components/personalData/notice')
  },
  {
    path: 'personalcard',
    name: 'PersonalCard',
    component: () => import('@/components/personalData/personal-card')
  },
  {
    path: 'otherdevices',
    name: 'OtherDevices',
    component: () => import('@/components/personalData/other-devices')
  },
  {
    path: '/ydy/personalData',
    redirect: 'baseset'
  }
]
