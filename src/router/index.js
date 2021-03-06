import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shorten from "../views/Shorten.vue"
import Paste from "../views/Paste.vue"
import Upload from "../views/Upload.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shorten',
    name: "Shorten",
    component: Shorten
  },
  {
    path: "/paste",
    name: "Paste",
    component: Paste
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
  {
    path: '/links',
    name: 'My Links',
    component: () => import('../views/Links.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
