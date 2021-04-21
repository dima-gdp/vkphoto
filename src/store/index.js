import Vue from 'vue'
import Vuex from 'vuex'
import { fetchInitialPhotos, fetchMorePhotos } from '../helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photosData: {
      items: [],
      profiles: [],
    },
    filteredPhotosData: [],
    start_from: null,
    canLoadPhotos: true,
  },
  mutations: {
    setPhotosData(state, { photosData, start_from }) {
      state.photosData = photosData
      state.start_from = start_from
    },
    setCanLoadPhotos(state, boolean) {
      state.canLoadPhotos = boolean
    },
    setFilteredPhotosData(state, filteredData) {
      state.filteredPhotosData = filteredData
    },
  },
  actions: {
    async getInitialPhotos({ commit }) {
      try {
        const initialPhotos = await fetchInitialPhotos();
        commit('setPhotosData', {
          photosData: initialPhotos,
          start_from: initialPhotos.next_from
        })
      } catch (e) {
        throw e
      }
    },
    async getNextPhotos({ commit, state }) {
      try {
        const morePhotos = await fetchMorePhotos(state.start_from);
        if (!morePhotos.next_from || morePhotos.next_from === state.start_from) {
          commit('setCanLoadPhotos', false)
          // this.$message("Лента фотографий закончилась");
          return;
        }
        commit('setPhotosData', {
          photosData: {
            items: [...state.photosData.items, ...morePhotos.items],
            profiles: [...state.photosData.profiles, ...morePhotos.profiles],
          },
          start_from: morePhotos.next_from
        })
        this.start_from = morePhotos.next_from;
      } catch (e) {
        this.canLoadPhotos = false;
        throw e
      }
    },
  },
  getters: {
    photosData: state => state.photosData,
    filteredPhotosData: state => state.filteredPhotosData,
    canLoadPhotos: state => state.canLoadPhotos,
  },
})
