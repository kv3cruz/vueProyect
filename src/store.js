import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '1010',
      name: 'kevin'
    },
    categories: [
      { id: 1, descripcion: 'nature' },
      { id: 2, descripcion: 'food' }
    ],
    todos: [
      { id: 1, text: 'nature', done: true },
      { id: 2, text: 'nature', done: false },
      { id: 3, text: 'nature', done: true }
    ],
    events: [
      { id: 1, title: 'nature', organizer: true },
      { id: 2, title: 'nature', organizer: false },
      { id: 3, title: 'nature', organizer: true }
    ]
  },
  mutations: {},
  actions: {},
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
