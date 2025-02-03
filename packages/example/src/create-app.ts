import './reset.css'
import { createSSRApp } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/home.vue'
import TypographyView from './views/typography.vue'
import App from './components/app.vue'

export function createApp() {
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        component: HomeView,
        name: 'home',
        path: '/',
      },
      {
        component: TypographyView,
        name: 'typography',
        path: '/typography',
      },
    ],
  })

  const app = createSSRApp(App).use(router)

  return {
    app,
    router,
  }
}
