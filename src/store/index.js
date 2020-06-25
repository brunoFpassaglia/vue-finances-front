import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_TITLE: 'SET_TITLE'
}

export default new Vuex.Store({
  state: {
    title: undefined
  },
  mutations: {
    [types.SET_TITLE]: (state, { title }) => {
      state.title = title
    }
  },
  actions: {
    setTitle: ({ commit }, payload) => {
      commit(types.SET_TITLE, payload)
    }
  },
  modules: {
  }
})
