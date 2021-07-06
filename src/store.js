import Vue from 'vue'
import Vuex from 'vuex'
import EventService from './services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '1010',
      name: 'kevin'
    },
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
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
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
