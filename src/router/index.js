import Vue from 'vue'
import Router from 'vue-router'
import TagsControl from '../components/TagsControl'
import TagsDisplay from '../components/TagsDisplay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/tag/:id',
      component: TagsControl,
      props: true
    },
    {
    	path: '/',
    	component: TagsDisplay
    },
  ]
})