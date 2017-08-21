import Vue from 'vue'
import App from './components/App'
import router from './router'

const app = new Vue({
  router,
  render: h => h(App)
})

export { app, router }
