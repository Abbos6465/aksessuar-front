import { createRouter, createWebHistory } from 'vue-router'
import AuthMiddleware from "./middleware/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: ()=> import("@/layouts/MainLayout.vue"),
      redirect: {name:"Home"},
      children:[
        {
          path:"/products",
          name:"Home",
          component:()=>import("@/views/products/index.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },
        {
          path:"/products/:id",
          name:"ProductShow",
          component: ()=>import("@/views/products/Show/index.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },
        {
          path:"/products/create",
          name:"ProductCreate",
          component: ()=>import("@/views/products/Create/index.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },
        {
          path:"/products/:id/update",
          name:"ProductUpdate",
          component: ()=>import("@/views/products/Update/index.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },
        {
          path:"/products/category/:id",
          name: "getProductsByCategory",
          component:()=>import("@/views/products/GetProductsByCategory.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },
        {
          path:"/products/brand/:id",
          name: "getProductsBybrand",
          component:()=>import("@/views/products/GetProductsByBrand.vue"),
          meta:{
            middleware:AuthMiddleware
          }
        },

      ]
    },
    {
      path:"/login",
      name:"AuthLaoyuth",
      component: () => import("@/layouts/AuthLayout.vue"),
      redirect: {name:"Login"},
      children:[
        {
          path:"/login",
          name:"Login",
          component: () => import("@/views/auth/LoginView.vue")
        },
        {
          path:"/register",
          name:"Register",
          component: () => import("@/views/auth/RegisterView.vue")
        }
      ]
    }
  ]
})

export default router
