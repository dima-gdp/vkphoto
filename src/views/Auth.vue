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
export default {
  data() {
    return {
      photosData: null
    }
  },
  methods: {
    login() {
      VK.Auth.login(r => {
        console.log(r)
      }, 8192 + 2)
    },
    status() {
      VK.Auth.getLoginStatus(r => {
        console.log(r.status)
      })
    }
  },
  mounted() {
    VK.UI.button('vk-ui-btn')
  }
}
</script>
