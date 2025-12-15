<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold gradient-text">404</h1>
      <h2 class="text-2xl font-bold text-gray-900 mt-4">Página não encontrada</h2>
      <p class="text-gray-500 mt-2 mb-8">A página que você está procurando não existe ou foi movida.</p>
      <Button label="Voltar ao Início" icon="pi pi-home" @click="router.push('/')" />
    </div>
  </div>
</template>

