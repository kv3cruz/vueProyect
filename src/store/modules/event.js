import EventService from '@/services/EventService'
export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {}
}
export const mutations = {
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
}
export const actions = {
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
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
