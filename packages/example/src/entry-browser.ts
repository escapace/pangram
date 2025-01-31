import { createApp } from './create-app'
const { app, router } = createApp()

void router.isReady().then(() => {
  document.documentElement.classList.remove('no-js')
  document.documentElement.classList.add('js')

  app.mount('#app')
})
