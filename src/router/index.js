import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Password_Update from '@/views/Password_Update'
import Home from '@/views/Home'
import TodoList from '@/views/TodoList'
import Logout from '@/views/Logout'
import Profile from '@/views/Profile'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
        requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true,
    meta: {
        requiresVisitor: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
        requiresVisitor: true,
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoList,
    meta: {
        requiresAuth: true,
    },
  },
  {
    path: '/password-update',
    name: 'password-update',
    component: Password_Update,
    meta: {
        requiresAuth: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/404',
    name: 'notfound',
    component: NotFound
  },
  {
      path: "*",
      redirect: {name: "notfound"}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('token')===''){
      next({
        name: 'home',
      })
    }else{
      next()
    }
  }else if(to.matched.some(record => record.meta.requiresVisitor)){
    if(localStorage.getItem('token')!==''){
      next({
        name: 'todo',
      })
    }else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
