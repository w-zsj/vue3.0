
const baseRouter = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/404.vue')
    }
]
export default baseRouter