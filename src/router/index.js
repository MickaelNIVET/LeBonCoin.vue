import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route)=>{
      return{
        page:parseInt(route.query.page) || 1,
        title: route.query.title || '',
        sort: route.query.sort || '',
        pricemin: Number (route.query.pricemin) || '',
        pricemax: Number (route.query.pricemax) || '' 

        }
      }
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component : SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component : LoginView
    },
    {

      path: '/publish',
      name: 'publish',
      component : () => import('../views/PublishView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component : ProfileView,
      meta: { requiresAuth: true }
    },
    {

      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component : NotFoundView
    },
    
  ]
})

// ❌ SUPPRIMÉ : Le router.beforeEach a été déplacé dans main.js

export default router
