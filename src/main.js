import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSignOutAlt, faSearch, faCircle, faMapMarkerAlt, faCheckDouble, faAngleLeft, faAngleRight, faArrowRight, faCamera, faArrowLeft, faTrash, faBars } from '@fortawesome/free-solid-svg-icons'

import { faUser, faPlusSquare, faHeart, faClock, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

library.add(faSignOutAlt, faUser, faSearch, faPlusSquare, faCircle, faHeart, faMapMarkerAlt, faCheckDouble, faClock, faAngleLeft, faAngleRight, faArrowRight, faEye, faEyeSlash, faCamera, faArrowLeft, faTrash, faBars)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(VueCookies)

const userInfos = ref ($cookies.get('userInfos') || null)

const changeUserInfos = (infos)=>{
    userInfos.value = infos
}

// ✅ AJOUTÉ : Configuration du guard de navigation ICI
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !userInfos.value?.token) {
    return { name: 'login', query: { redirect: to.path } }
  }
})

app.provide('GlobalStore', {
    userInfos: userInfos,
    changeUserInfos: changeUserInfos
})

app.use(router)
app.mount('#app')