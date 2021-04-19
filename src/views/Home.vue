<template>
  <div class="home">
    <section class="newsfeed">
      <div class="newsfeed__container container">
        <Loader v-if="loading"/>
        <ul class="photos-grid" v-else>
          <li
            class="photos-grid__column"
            v-for="photo in filteredPhotos"
            :key="photo.id"
          >
            <router-link
              class="photos-grid__item photos-item"
              :to="{
                name: 'SinglePhoto',
                query: { uid: photo.owner_id, pid: photo.id },
              }"
            >
              <img :src="photo.photo_604" alt="" class="photos-item__image"/>
              <div class="photos-item__descr descr-photos">
                <div class="descr-photos__top">
                  <div class="descr-photos__likes likes">
                    <button
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
        <Loader v-if="moreLoading"/>
        <button @click="getNextPhotos">fwef</button>
      </div>
    </section>
    <router-view/>
  </div>
</template>

<script>
import { getFullName } from '../helpers/utils'
import { fetchInitialPhotos, fetchMorePhotos } from '../helpers/api'
import Loader from '../components/Loader.vue'
import {subscribeToLoadPhotos, unsubscribeToLoadPhotos} from '../helpers/loadMorePhotos'
import messages from '../helpers/messages'
import {mapGetters} from 'vuex'

export default {
  components: { Loader },
  data () {
    return {
      photosData: {
        items: [],
        profiles: []
      },
      start_from: null,
      canLoadPhotos: true,
      loading: false,
      moreLoading: false
    }
  },
  computed: {
    ...mapGetters(['getError']),
    filteredPhotos () {
      let returnedArray = []

      this.photosData.items
        .map(el => el.photos.items)
        .forEach(el => {
          el.forEach(item => returnedArray.push(item))
        })

      returnedArray = returnedArray.map(el => {
        const profile = this.photosData.profiles.find(
          user => user.id === el.owner_id
        )
        return {
          ...el,
          user_full_name: getFullName(profile.first_name, profile.last_name),
          user_photo_100: profile.photo_100,
          user_photo_50: profile.photo_50
        }
      })
      return returnedArray
    }
  },
  methods: {
    async getNextPhotos () {

      this.moreLoading = true
      if (!this.canLoadPhotos) {
        this.moreLoading = false
        return
      }
      try {
        const morePhotos = await fetchMorePhotos(this.start_from)
        if (!morePhotos.next_from || morePhotos.next_from === this.start_from) {
          this.canLoadPhotos = false
          this.moreLoading = false
          this.$message('Лента фотографий закончилась')
          return
        }
        this.start_from = morePhotos.next_from
        this.photosData = {
          items: [...this.photosData.items, ...morePhotos.items],
          profiles: [...this.photosData.profiles, ...morePhotos.profiles]
        }
      } catch (e) {
        this.canLoadPhotos = false
        this.$error(messages[e.error_code] || 'Ошибка(')

      }

      this.moreLoading = false
    },
  },
  async mounted () {
    this.loading = true
    try {
      const initialPhotos = await fetchInitialPhotos()
      this.start_from = initialPhotos.next_from
      this.photosData = initialPhotos
      subscribeToLoadPhotos(this.getNextPhotos, 300, 300)
    } catch (e) {
      this.$error(messages[e.error_code] || 'Ошибка(')
    }
    this.loading = false
  },
  beforeDestroy () {
    unsubscribeToLoadPhotos()
  }
}
</script>
