import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: function () {
      return import(/* webpackChunkName: "Accounts" */ '../views/Accounts.vue')
    },
    children: [
      {
        name: 'accountTransactions',
        path: ':acctNum',
        props: true,
        component: function () {  
          return import(/* webpackChunkName: "TransactionsAcct" */ '../components/accounts/Transactions.vue')
        },
      },
    ]
  },
  {
    path: '/opdays',
    name: 'opdays',
    component: function () {
      return import(/* webpackChunkName: "Opdays" */ '../views/Opdays.vue')
    },
    children: [
      {
        name: 'transOpDays',
        path: ':opDay',
        props: true,
        component: function () {  
          return import(/* webpackChunkName: "TransactionsOpDays" */ '../components/opdays/Transactions.vue')
        },
      },
    ]
  },
  ,
  {
    path: '/operations',
    name: 'operations',
    component: function () {
      return import(/* webpackChunkName: "Operations" */ '../views/Operations.vue')
    },
    children: [
      {
        name: 'transOp',
        path: ':acctNumDB',
        props: true,
        component: function () {  
          return import(/* webpackChunkName: "TransactionsOp" */ '../components/operations/Transactions.vue')
        },
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
