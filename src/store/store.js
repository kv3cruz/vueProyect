import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '../services/EventService'
import * as user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: 'nature', done: true },
      { id: 2, text: 'nature', done: false },
      { id: 3, text: 'nature', done: true }
    ],
    events: [],
    totalEvents: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    FECTH_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, value) {
      state.totalEvents = value
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    async createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    async fetchEvents({ commit }, { perPage, page }) {
      return EventService.getEvents(perPage, page).then(response => {
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        commit('FECTH_EVENTS', response.data)
      })
    },
    async fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done)
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
