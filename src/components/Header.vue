<template>
  <div class="header">
    <div class="header__container container">
      <a href="#" class="header__logo">
        <img src="logo" alt="logo" />
      </a>
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
      <button class="header__logout" @click="vklogout">Выйти</button>
    </div>
  </div>
</template>

<script>
import { logout, fetchLoginStatus } from "../helpers/api";

export default {
  data() {
    return {};
  },
  methods: {
    async vklogout() {
      try {
        const status = await fetchLoginStatus();
        if (status === "connected") {
          await logout();
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
    // async getLoginStatus() {
    //   try {
    //     await fetchLoginStatus();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // logout() {
    //   VK.Auth.logout((r) => {
    //     console.log(r);
    //     if (this.$route.name !== "Auth") {
    //       this.$router.push({ name: "Auth" });
    //     }
    //   });
    // },
  },
};
</script>
