import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "默认路径",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "登录",
      component: () => import('@/views/Login.vue'),
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem("jwt");
  if (to.meta.needLogin != null && to.meta.needLogin && userInfo == null) {
    router.push("/login");
  }
  next();
})
export default router