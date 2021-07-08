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
  async createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating event' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  async fetchEvents({ commit, dispatch }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
        commit('FECTH_EVENTS', response.data)
        const notification = {
          type: 'success',
          message: 'Your events have been fetched!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        console.log(error)
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  async fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          const notification = {
            type: 'success',
            message: 'Your event has been fetched!'
          }
          dispatch('notification/add', notification, { root: true })
          return response.data
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
