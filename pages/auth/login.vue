<template>
  <VaForm @submit.prevent="submit" class="form" ref="form">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      New to Vuestic?
      <NuxtLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</NuxtLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="Keep me signed in on this device" />
      <NuxtLink to="recover-password" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        Forgot password?
      </NuxtLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit">Login</VaButton>
    </div>
  </VaForm>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'login',
  layout: 'auth',
})

import { reactive } from 'vue'
import { useForm } from 'vuestic-ui'
import { useRouter } from 'vue-router'

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const user = useUserStore()
const router = useRouter()
const { validate } = useForm('form')

const submit = async () => {
  if (validate()) {
    await user.login(formData.email, formData.password)
    await user.refresh()
    router.push('/dashboard')
  }
}
</script>
