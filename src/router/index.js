import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home'
import NewsContent from '../components/home/NewsContent'
import Academic from '../components/home/Academic'
import Teach from '../components/home/Teach'
import Activity from '../components/home/Activity'
import University from '../components/home/University'
import BookDiscovery from '../components/bookDiscovery/BookDiscovery'
import yqfk from '../components/home/yqfk'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/findDetail',
    name: 'NewsContent',
    component: NewsContent
  },
  {
    path: '/academic',
    name: 'Academic',
    component: Academic
  },
  {
    path: '/teach',
    name: 'Teach',
    component: Teach
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/university',
    name: 'University',
    component: University
  },
  {
    path: '/bookDiscovery',
    name: 'BookDiscovery',
    component: BookDiscovery
  },
  {
    path: '/yqfk',
    name: 'yqfk',
    component: yqfk
  }
]

const router = new VueRouter({
  routes
})
export default router
