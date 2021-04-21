<template>
  <section class="auth">
    <div class="auth__container _container">
      <h1 class="visually-hidden">Авторизация</h1>
      <p>Нажми на кнопку ниже, чтобы авторизироваться</p>
      <button id="vk-ui-btn" @click="login"></button>
    </div>
  </section>
</template>

<script>
import { loginVk } from "../helpers/api";

export default {
  data() {
    return {
      photosData: null,
    };
  },
  methods: {
    async login() {
      try {
        const auth = await loginVk();
        this.$message("Вы успешно авторизировались");
        this.$router.push({ name: "Home" });
      } catch (e) {
        this.$error("Ошибка(");
      }
    },
  },
  mounted() {
    VK.UI.button("vk-ui-btn");
  },
};
</script>
