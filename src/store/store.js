import Vue from 'vue'
import Vuex from 'vuex'
import * as user from './modules/user'
import * as event from './modules/event'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
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
    ]
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
    }
  }
})
