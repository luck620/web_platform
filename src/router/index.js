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
import Login from '../components/class/Login'
import Student from '../components/class/Student'
import Teacher from '../components/class/Teacher'
import ClassManager from '../components/class/ClassManager'
import WorkManager from '../components/class/WorkManager'
import UserManager from '../components/class/UserManager'
import UploadResource from '../components/class/UploadResource'

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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/student',
    name: 'student',
    component: Student
  },
  {
    path: '/uploadResource',
    name: 'uploadResource',
    component: UploadResource
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: Teacher,
    redirect: '/classManager',
    children: [
      {
        path: '/classManager',
        name: 'classManager',
        component: ClassManager
      },
      {
        path: '/workManager',
        name: 'workManager',
        component: WorkManager
      },
      {
        path: '/userManager',
        name: 'userManager',
        component: UserManager
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/teacher' && to.path !== '/classManager') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
