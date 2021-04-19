import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    bodyOffsetTop: 0
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    setBodyOffsetTop(state, offset){
      state.bodyOffsetTop = offset
    }
  },
  actions: {
  },
  getters: {
    getError: (state) => state.error
  },
  modules: {
  }
})
