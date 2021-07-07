export const namespaced = true
export const state = {
  user: {
    id: '1010',
    name: 'kevin'
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}
export const actions = {
  updateUser({ commit }, user) {
    commit('SET_USER', user)
  }
}
