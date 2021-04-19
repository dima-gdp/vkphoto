<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <div class="footer"></div>
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'App',
  components: { Header },
};
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';
</style>
