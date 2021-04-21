<template>
  <section class="auth">
    <div class="auth__container _container">
      <h1 class="visually-hidden">Авторизация</h1>
      <p>Нажми на кнопку ниже, чтобы авторизироваться</p>
      <button id="vk-ui-btn" @click="vklogin"></button>
    </div>
  </section>
</template>

<script>
import { login } from "../helpers/api";

export default {
  data() {
    return {
      photosData: null,
    };
  },
  methods: {
    async vklogin() {
      try {
        const auth = await login();
        this.$message("Вы успешно авторизировались");
        this.$router.push({ name: "Home" });
      } catch (e) {
        this.$error("Ошибка(");
      }
    },
    status() {
      VK.Auth.getLoginStatus((r) => {
        console.log(r.status);
      });
    },
  },
  mounted() {
    VK.UI.button("vk-ui-btn");
  },
};
</script>
