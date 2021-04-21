<template>
  <div class="home">
    <section class="newsfeed">
      <div class="newsfeed__container container">
        <Loader v-if="loading" />
        <ul class="photos-grid" v-if="getFilteredPhotosData.length">
          <li
            class="photos-grid__column"
            v-for="photo in getFilteredPhotosData"
            :key="photo.id"
          >
            <router-link
              class="photos-grid__item photos-item"
              :to="{
                name: 'SinglePhoto',
                query: { uid: photo.owner_id, pid: photo.id },
              }"
            >
              <img :src="photo.photo_604" alt="" class="photos-item__image" />
              <div class="photos-item__descr descr-photos">
                <div class="descr-photos__top">
                  <div class="descr-photos__likes likes">
                    <button
                      @click.prevent="like(photo.id)"
                      @onlike="like(photo.id)"
                      class="likes__btn"
                      :class="{
                        'likes__btn--red': photo.likes.user_likes,
                      }"
                    >
                      <svg>
                        <use xlink:href="#like"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="descr-photos__bottom">
                  <div class="descr-photos__owner owner">
                    <div class="owner__ava">
                      <img
                        :src="photo.user_photo_50"
                        :alt="photo.user_full_name"
                      />
                    </div>
                    <span class="owner__name owner__name--white">{{
                      photo.user_full_name
                    }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <button @click="getNextPhotos" v-if="canLoadPhotos">More</button>
        <Loader v-if="moreLoading" />
      </div>
    </section>
    <router-view />
  </div>
</template>

<script>
import { getFullName } from '../helpers/utils'
import { fetchInitialPhotos, fetchMorePhotos } from '../helpers/api'
import Loader from '../components/Loader.vue'
import {
  subscribeToLoadPhotos,
  unsubscribeToLoadPhotos
} from '../helpers/loadMorePhotos'
import messages from '../helpers/messages'
import { mapGetters } from 'vuex'

export default {
  components: { Loader },
  data() {
    return {
      loading: false,
      moreLoading: false
    }
  },
  computed: {
    ...mapGetters(['getPhotosData', 'getFilteredPhotosData', 'canLoadPhotos']),
    filteredPhotos() {
      return this.fData
    }
  },
  watch: {
    getPhotosData(data) {
      let returnedArray = []
      data.items
        .map(el => el.photos.items)
        .forEach(el => {
          el.forEach(item => returnedArray.push(item))
        })

      returnedArray = returnedArray.map(el => {
        const profile = data.profiles.find(user => user.id === el.owner_id)
        return {
          ...el,
          user_full_name: getFullName(profile.first_name, profile.last_name),
          user_photo_100: profile.photo_100,
          user_photo_50: profile.photo_50
        }
      })
      this.$store.commit('setFilteredPhotosData', returnedArray)
    },
    canLoadPhotos(boolean) {
      if (boolean === false) this.$message('Лента фотографий закончилась')
    }
  },
  methods: {
    like(id) {
      this.$store.commit('setLike', id)
    },
    async getNextPhotos() {
      this.moreLoading = true

      if (!this.$store.state.canLoadPhotos) {
        this.moreLoading = false
        return
      }

      try {
        await this.$store.dispatch(
          'getNextPhotos',
          this.$store.state.start_from
        )
      } catch (e) {
        this.$error(messages[e.error_code] || 'Ошибка(')
      }
      this.moreLoading = false
    }
  },
  async mounted() {
    this.loading = true
    try {
      await this.$store.dispatch('getInitialPhotos')
      subscribeToLoadPhotos(this.getNextPhotos, 300, 300)
    } catch (e) {
      this.$error(messages[e.error_code] || 'Ошибка(')
    }
    this.loading = false
  },
  beforeDestroy() {
    unsubscribeToLoadPhotos()
  }
}
</script>
