// 导入用来创建路由和确定路由模式的两个方法
import {
    createRouter,
    createWebHistory,
    RouteRecordRaw
} from 'vue-router'

/**
 * 定义路由信息
 *
 */
const routes:Array<RouteRecordRaw> = [
    {
        path:'/reg',
        name:'register',
        component: ()=>import('@/components/pc/register/register.vue')
    },
    {
        path:'/',
        name:'login',
        component: ()=>import('@/components/pc/login/login.vue')
    },
    {
        path:'/upload',
        name:'upload1',
        component:()=>import('@/components/pc/home/upload/upload1.vue'),
        children:[
            {
                path:'upload2',
                name:'upload2',
                component: ()=>import('@/components/pc/home/upload/upload2.vue')
            },
            {
                path:'upload3',
                name:'upload3',
                component: ()=>import('@/components/pc/home/upload/upload3.vue')
            }
        ]
    },
    {
        path:'/home',
        name:'home',
        component: ()=>import('@/components/pc/home/home.vue'),
        children:[
            {
                path:'',
                name:'index',
                component: ()=>import('@/components/pc/home/video/videoIndex.vue')
            },{
                path:'userIndex',
                name:'userIndex',
                component: ()=>import('@/components/pc/personal/personalIndex.vue')
            },{
                path: 'videoPlay',
                name:'videoPlay',
                component: ()=>import('@/components/pc/home/video/videoPlay.vue')
            }
        ]
    }
];

// 创建路由实例并传递 `routes` 配置
// 我们在这里使用 html5 的路由模式，url中不带有#，部署项目的时候需要注意。
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由白名单：那些不需要 token 就可以直接访问的页面
const whiteList = ['/','/reg','/loginOut','/upload','/home']

//状态管理
import {useUser} from "@/store/login";
import {login} from "@/api/login/login";

// 全局的路由守卫
router.beforeEach((to, from,next) => {
    //next 直接放行
    //next（route对象 || path ）重定向
    //next（false） 取消用户导航行为
    //next  不写不调用  就会白屏。
    //to代表当前的访问路径  from 从哪里来

    //访问白名单不需要验证
    if(whiteList.includes(to.path)){
        return next();
    }

    // 验证有没有token
    // const token = localStorage.getItem("token")
    // if(!token){
    //     return next({
    //         name: "login",
    //         query:{
    //             redirect: to.path
    //         }
    //     })
    // }
    //验证权限

    //最后放行
    return next()
})

// 讲路由实例导出
export default router