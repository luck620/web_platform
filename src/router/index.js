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
import SearchResult from '../components/home/SearchResult'
import History from '../components/bookDiscovery/History'
import MaoZD from '../components/bookDiscovery/MaoZD'
import Marxism from '../components/bookDiscovery/Marxism'
import Moral from '../components/bookDiscovery/Moral'
import BookSearchResult from '../components/bookDiscovery/BookSearchResult'

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
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: SearchResult
  },
  {
    path: '/history',
    name: 'history',
    component: History
  },
  {
    path: '/maoZD',
    name: 'maoZD',
    component: MaoZD
  },
  {
    path: '/marxism',
    name: 'marxism',
    component: Marxism
  },
  {
    path: '/moral',
    name: 'moral',
    component: Moral
  },
  {
    path: '/bookSearchResult',
    name: 'bookSearchResult',
    component: BookSearchResult
  }
]

const router = new VueRouter({
  routes
})
export default router
