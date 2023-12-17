import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoView
    },
    {
      path: '/todo/create',
      name: 'todo-create',
      component: () => import('../views/TodoCreateView.vue')
    }
  ]
})

export default router
