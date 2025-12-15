<script setup>
import { ref } from 'vue'

const planos = ref([
  { id: 1, nome: 'Pet Básico', preco: 29.90, beneficios: ['Cremação', 'Urna básica'], ativo: true },
  { id: 2, nome: 'Pet Premium', preco: 49.90, beneficios: ['Cremação', 'Urna premium', 'Cinzas personalizadas', 'Memorial digital'], ativo: true },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Planos Pet</h1>
        <p class="text-gray-500 mt-1">Configure os planos para pets</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Plano" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="plano in planos" :key="plano.id" class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
            <i class="pi pi-heart-fill text-pink-500 text-xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900">{{ plano.nome }}</h3>
            <p class="text-2xl font-bold text-primary-600">{{ formatCurrency(plano.preco) }}<span class="text-sm text-gray-500">/mês</span></p>
          </div>
        </div>
        <div class="space-y-2">
          <div v-for="beneficio in plano.beneficios" :key="beneficio" class="flex items-center gap-2">
            <i class="pi pi-check-circle text-emerald-500"></i>
            <span class="text-gray-600">{{ beneficio }}</span>
          </div>
        </div>
        <Button label="Editar Plano" outlined class="w-full mt-4" />
      </div>
    </div>
  </div>
</template>

