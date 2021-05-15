<template>
  <div class="home">
    <h1 class="visually-hidden">Лента фотографий</h1>
    <section class="newsfeed">
      <div class="newsfeed__container container">
        <Loader v-if="loading" />
        <ul class="photos-grid" v-if="filteredPhotosData.length">
          <li
            class="photos-grid__column"
            v-for="photo in filteredPhotosData"
            :key="photo.id"
            data-aos="build"
            data-aos-duration="1100"
            data-aos-easing="new-easing"
          >
            <router-link
              class="photos-grid__item photos-item"
              :to="{
                name: 'SinglePhoto',
                query: { uid: photo.owner_id, pid: photo.id },
              }"
            >
              <img
                :src="photo.photo_807 || photo.photo_604"
                alt=""
                class="photos-item__image"
              />
              <div class="photos-item__descr descr-photos">
                <div class="descr-photos__top">
                  <Like
                    class="descr-photos__likes"
                    :active="photo.likes.user_likes"
                  />
                </div>
                <div class="descr-photos__bottom">
                  <User
                    :photo="photo.user_photo_50"
                    :name="photo.user_full_name"
                    colorClass="owner__name--white"
                    class="descr-photos__owner"
                  />
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <button
          @click="getNextPhotos"
          v-if="canLoadPhotos && !error"
          class="newsfeed__btn"
        >
          Загрузить еще
        </button>
        <Loader v-if="moreLoading" />
      </div>
    </section>
    <router-view />
  </div>
</template>

<script>
import { getFullName } from '../helpers/utils'
import Loader from '../components/Loader.vue'
import {
  subscribeToLoadPhotos,
  unsubscribeToLoadPhotos
} from '../helpers/loadMorePhotos'
import messages from '../helpers/messages'
import { mapGetters } from 'vuex'
import User from '../components/User'
import Like from '../components/Like'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  components: { Like, User, Loader },
  data() {
    return {
      loading: false,
      moreLoading: false,
      error: false
    }
  },
  computed: {
    ...mapGetters(['photosData', 'filteredPhotosData', 'canLoadPhotos'])
  },
  watch: {
    photosData(data) {
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
        this.moreLoading = false
      } catch (e) {
        this.error = true
        this.$error(messages[e.error_code] || 'Ошибка(')
        unsubscribeToLoadPhotos()
        this.moreLoading = false
      }
    }
  },
  async mounted() {
    this.loading = true
    AOS.init({
      disable: function() {
        const maxWidth = 992
        return window.innerWidth < maxWidth
      },
      once: true
    })
    try {
      await this.$store.dispatch('getInitialPhotos')
      subscribeToLoadPhotos(this.getNextPhotos, 300, 300)
      this.loading = false
    } catch (e) {
      this.$error(messages[e.error_code] || 'Ошибка(')
      this.error = true
      unsubscribeToLoadPhotos()
      this.loading = false
    }
  },
  beforeDestroy() {
    unsubscribeToLoadPhotos()
  }
}
</script>
