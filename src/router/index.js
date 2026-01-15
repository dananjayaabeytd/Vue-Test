import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import StudentDetails from '../views/StudentDetails.vue'
import AddStudent from '../views/AddStudent.vue'
import EditStudent from '../views/EditStudent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
  {
    path: '/students/add',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/students/:id',
    name: 'StudentDetails',
    component: StudentDetails
  },
  {
    path: '/students/:id/edit',
    name: 'EditStudent',
    component: EditStudent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
