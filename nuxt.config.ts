// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@vuestic/nuxt", "@pinia/nuxt"],
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  vuestic: {
    config: {},
  },

  devtools: { enabled: true },
});
