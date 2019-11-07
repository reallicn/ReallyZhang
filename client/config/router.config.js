
export default [
  {
    path: '/page/write',
    component: '../layouts/BlankLayout',
    routes:[
      {
        path:'/page/write',
        redirect:'/page/write/blog'
      },
      {
        path: '/page/write/blog',
        component: './Blog/Write',
      },

    ]
  },
  {
    path: '/page/user',
    component: '../layouts/UserLayout',
    routes:[
      {
        path:'/page/user',
        redirect:'/page/user/login'
      },
      {
        path: '/page/user/login',
        component: './User/Login',
      },
      {
        path: '/page/user/register',
        component: './User/Register',
      },

    ]
  },
  {
    path: '/page/main',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      {
        path:'/page/main',
        redirect:'/page/main/home'
      },
      {
        path: '/page/main/home',
        name: '博客',
        component: './Home',
      },
      // {
      //   path: '/page/main/blog',
      //   name: '博客',
      //   component: './Blog',
      // },
      {
        path: '/page/main/blog/detail/:id',
        component: './Blog/Detail',
      },
      {
        path: '/page/main/idea',
        name: '痛点',
        component: './Idea',
      },
      {
        path: '/page/main/pdf',
        name: '阅读',
        component: './Pdf',
      },
      {
        path: '/page/main/video',
        name: '视频',
        component: './Video',
      },
      {
        path: '/page/main/real',
        name: '生活',
        component: './Real',
      },
      {
        path: '/page/main/about',
        name: '关于我',
        component: './About',
      },
      {
        path: '/page/main/user-info',
        component: './User/UserInfo',
      },
    ],
  },{
    path:'/page',
    redirect:'/page/main'
  },{
    path:'/',
    redirect:'/page'
  },
];
