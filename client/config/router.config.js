
export default [
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
        name: '首页',
        component: './Home',
      },
      {
        path: '/page/main/blog',
        name: '技术博客',
        component: './Blog',
      },
      {
        path: '/page/main/blog/detail',
        component: './Blog/Detail',
      },
      {
        path: '/page/main/idea',
        name: '创意共享',
        component: './Idea',
      },
      {
        path: '/page/main/pdf',
        name: 'PDF阅读',
        component: './Pdf',
      },
      {
        path: '/page/main/video',
        name: '视频教程',
        component: './Video',
      },
      {
        path: '/page/main/real',
        name: '生活真相',
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
