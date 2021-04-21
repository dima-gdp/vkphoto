<template>
  <div class="header">
    <div class="header__container container">
      <router-link :to="{ name: 'Home' }" href="#" class="header__logo">
        <svg>
          <use xlink:href="#logo"></use>
        </svg>
      </router-link>
      <nav class="header__nav">
        <ul>
          <li>
            <router-link :to="{ name: 'Home' }">Лента</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Auth' }">Войти</router-link>
          </li>
        </ul>
      </nav>
      <button class="header__logout" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import { logoutVk, fetchLoginStatus } from "../helpers/api";

export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      try {
        const status = await fetchLoginStatus();
        if (status === "connected") {
          await logoutVk();
          this.$message("Вы вышли из приложения");
        } else {
          this.$message("Вы уже вышли из приложения");
        }
      } catch (e) {
        this.$error("Ошибка(");
      }
      this.canLogout = false;
      if (this.$route.name !== "Auth") {
        this.$router.push({ name: "Auth" });
      }
    },
  },
};
</script>
