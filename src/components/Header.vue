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
      <button class="header__logout" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      VK.Auth.logout((r) => {
        console.log(r);
        if (this.$route.name !== 'Auth') {
          this.$router.push({ name: 'Auth' });
        }
      });
    },
  },
};
</script>
