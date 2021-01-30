import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/home/home')
const PayrollA = () => import('@/views/payrollA/payrollA')
const PayrollB = () => import('@/views/payrollB/payrollB')
const PayrollC = () => import('@/views/payrollC/payrollC')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '工资计算器'
    }
  },
  {
    path: '/payrollA',
    name: 'payrollA',
    component: PayrollA
  }, {
    path: '/payrollB',
    name: 'payrollB',
    component: PayrollB
  }, {
    path: '/payrollC',
    name: 'payrollC',
    component: PayrollC
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
