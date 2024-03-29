// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    hosts: {
      auth: 'http://localhost:4300',
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@vuestic/nuxt', '@pinia/nuxt'],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {},
  vuestic: {
    config: {},
  },

  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  build: {
    transpile: ['chart.js'],
  },
})
