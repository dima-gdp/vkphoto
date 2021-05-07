<template>
  <section class="single-photo">
    <Loader v-if="loading" />
    <div
      class="single-photo__container"
      v-if="!loading"
      @click.self="goToNewsfeed"
    >
      <div class="single-photo__error" v-if="error">Упс, ошибка</div>
      <template v-if="photoData && user">
        <div class="single-photo__content">
          <div class="single-photo__image">
            <img :src="photoData.photo_807 || photoData.photo_604" alt="" />
          </div>
          <div class="single-photo__bot" v-if="user">
            <User
              :photo="user.photo_50"
              :name="userFullName"
              class="single-photo__owner"
            />
            <Like
              class="single-photo__likes"
              :active="photoData.likes.user_likes"
            >
              <span class="likes__count">{{ photoData.likes.count }}</span>
            </Like>
          </div>
        </div>
      </template>
      <button class="single-photo__close-btn" @click="goToNewsfeed">
        <svg>
          <use xlink:href="#close"></use>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { getFullName } from '../helpers/utils'
import { setBodyStyles, restoreBodyStyles } from '../helpers/body.styles'
import { fetchSinglePhoto, fetchUser } from '../helpers/api'
import messages from '../helpers/messages'
import User from '../components/User'
import Like from '../components/Like'

export default {
  components: { Like, User },
  data() {
    return {
      loading: false,
      photoData: null,
      user: null,
      error: false
    }
  },
  computed: {
    userFullName() {
      return getFullName(this.user.first_name, this.user.last_name)
    }
  },
  methods: {
    goToNewsfeed() {
      this.$router.push({ name: 'Home' })
    }
  },
  async created() {
    this.loading = true
    const uid = this.$route.query.uid
    const pid = this.$route.query.pid
    if (!uid || !pid) {
      this.loading = false
      this.error = true
      this.$error('Неккоркетная ссылка')
      return
    }

    const photoId = `${uid}_${pid}`
    try {
      const singlePhoto = await fetchSinglePhoto(photoId)
      this.photoData = singlePhoto
      const user = await fetchUser(this.$route.query.uid)
      this.user = user
    } catch (e) {
      this.error = true
      this.$error(messages[e.error_code] || 'Ошибка(')
    }
    setBodyStyles()
    this.loading = false
  },

  beforeDestroy() {
    restoreBodyStyles()
  }
}
</script>
