import { createApp, watch, reactive, } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { LoginScreen, AdminScreen }  from './screens';
import { getStorage } from './utils/localStorageService';
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginScreen },
    { path: '/dashboard', name: 'dashboard', component: AdminScreen }
  ]
});

router.beforeEach((to, from, next) => {
  
  let store = JSON.parse(localStorage.getItem('data'));

  if(to.name == 'dashboard') {
    if(store?.email) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
