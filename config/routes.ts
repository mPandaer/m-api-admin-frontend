export default [
  {
    path: '/',
    name: '主页',
    icon: 'crown',
    // hideInMenu: true,
    routes: [
      { path: '/', redirect: '/welcome' },
      { path: '/welcome', name: 'API接口', icon: 'smile', component: './User/WelcomePage' },
      {
        path: '/api-detail/:id',
        name: 'API详细信息',
        icon: 'smile',
        component: './User/DetailApiPage',
        hideInMenu: true,
      },
    ],
  },

  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/LoginPage' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/api-info' },
      { path: '/admin/api-info', name: '接口管理', component: './Admin/ApiInfoList' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
