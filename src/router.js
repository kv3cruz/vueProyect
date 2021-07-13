import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: 'notFound', params: { resource: 'event' } })
            } else {
              next({ name: 'networkIssue' })
            }
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/notFound',
      name: 'notFound',
      props: true,
      component: () =>
        import(/* webpackChunkName: "Not Found" */ './views/NotFound'),
      meta: {
        title: 'App - Not Found'
      }
    },
    {
      path: '/networkIssue',
      name: 'networkIssue',
      props: true,
      component: () =>
        import(/* webpackChunkName: "Network Issue" */ './views/NetworkIssue'),
      meta: {
        title: 'App - Network Issue'
      }
    },
    {
      path: '*',
      redirect: { name: 'notFound', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
