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
import Notice from '../components/class/Notice'
import NoticeDetail from '../components/class/NoticeDetail'
import StudentUserManager from '../components/class/StudentUserManager'
import StudentClassManager from '../components/class/StudentClassManager'
import StudentWorkManager from '../components/class/StudentWorkManager'
import StudentNotice from '../components/class/StudentNotice'
import PublishExam from '../components/class/PublishExam'
import DoExam from '../components/class/DoExam'
import Analyze from '../components/discovery/Analyze'
import ClassGrade from '../components/class/ClassGrade'
import ShowClassGrade from '../components/class/ShowClassGrade'
import CourseDetail from '../components/class/CourseDetail'

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
    path: '/analyze',
    name: 'analyze',
    component: Analyze
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
    path: '/showClassGrade',
    name: 'showClassGrade',
    component: ShowClassGrade
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
    path: '/findCourseDetail',
    name: 'findCourseDetail',
    component: CourseDetail
  },
  {
    path: '/noticeDetail',
    name: 'noticeDetail',
    component: NoticeDetail
  },
  {
    path: '/publishExam',
    name: 'publishExam',
    component: PublishExam
  },
  {
    path: '/doExam',
    name: 'doExam',
    component: DoExam
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
      },
      {
        path: '/classGrade',
        name: 'classGrade',
        component: ClassGrade
      },
      {
        path: '/notice',
        name: 'notice',
        component: Notice
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    component: Student,
    redirect: '/studentClassManager',
    children: [
      {
        path: '/studentClassManager',
        name: 'studentClassManager',
        component: StudentClassManager
      },
      {
        path: '/studentWorkManager',
        name: 'studentWorkManager',
        component: StudentWorkManager
      },
      {
        path: '/studentUserManager',
        name: 'studentUserManager',
        component: StudentUserManager
      },
      {
        path: '/studentNotice',
        name: 'studentNotice',
        component: StudentNotice
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
