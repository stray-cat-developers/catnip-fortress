<template>
  <h1 class="page-title font-bold">Dashboard</h1>
  <section class="flex flex-col gap-4">
    <DataSection />
  </section>
</template>

<script setup lang="ts">
import DataSection from '~/components/data-section/DataSection.vue'

definePageMeta({
  layout: 'private',
  private: true,
})
</script>
