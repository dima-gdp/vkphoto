<template>
  <section class="single-photo">
    <Loader v-if="loading" />
    <div
      class="single-photo__container"
      v-if="!loading"
      @click.self="goToNewsfeed"
    >
      <div class="single-photo__error" v-if="error">Ошибка</div>
      <div class="single-photo__content" v-if="photoData && user">
        <div class="single-photo__image">
          <img :src="photoData.photo_807 || photoData.photo_604" alt="" />
        </div>
        <div class="single-photo__bot" v-if="user">
          <div class="single-photo__owner owner">
            <div class="owner__ava">
              <img :src="user.photo_50" alt="" />
            </div>
            <span class="owner__name">{{ userFullName }}</span>
          </div>
          <div class="single-photo__likes likes">
            <span class="likes__count">{{ photoData.likes.count }}</span>
            <button
              class="likes__btn"
              :class="{
                'likes__btn--red': photoData.likes.user_likes,
              }"
            >
              <svg>
                <use xlink:href="#like"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button class="single-photo__close-btn" @click="goToNewsfeed">
        <svg>
          <use xlink:href="#close"></use>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getFullName } from "../helpers/utils";
import { setBodyStyles, restoreBodyStyles } from "../helpers/body.styles";
import { fetchSinglePhoto, fetchUser } from "../helpers/api";
import messages from "../helpers/messages";

export default {
  data() {
    return {
      loading: false,
      photoData: null,
      user: null,
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getError"]),
    userFullName() {
      return getFullName(this.user.first_name, this.user.last_name);
    },
  },
  methods: {
    ...mapMutations(["setBodyOffsetTop"]),
    goToNewsfeed() {
      this.$router.push({ name: "Home" });
    },
  },
  async created() {
    this.loading = true;
    const uid = this.$route.query.uid;
    const pid = this.$route.query.pid;
    if (!uid && !pid) {
      this.loading = false;
      this.error = true;
      this.$error("Неправильная ссылка");
      return;
    }

    const photoId = `${uid}_${pid}`;
    try {
      const singlePhoto = await fetchSinglePhoto(photoId);
      this.photoData = singlePhoto;
      const user = await fetchUser(this.$route.query.uid);
      this.user = user;
    } catch (e) {
      this.error = true;
      this.$error(messages[e.error_code] || "Ошибка(");
    }
    setBodyStyles();
    this.loading = false;
  },

  beforeDestroy() {
    restoreBodyStyles();
  },
};
</script>

<style scoped>
</style>
