<script setup>
import { ref } from 'vue'
import { useFinanceiroStore } from '@/stores/financeiro'

const financeiroStore = useFinanceiroStore()
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Centro de Custos</h1>
        <p class="text-gray-500 mt-1">Acompanhe os gastos por departamento</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Centro" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="centro in financeiroStore.centroCustos" :key="centro.id" class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900">{{ centro.nome }}</h3>
          <span class="text-sm text-gray-500">{{ Math.round((centro.gasto / centro.orcamento) * 100) }}%</span>
        </div>
        <ProgressBar :value="(centro.gasto / centro.orcamento) * 100" :showValue="false" style="height: 8px" />
        <div class="flex justify-between mt-4 text-sm">
          <div>
            <p class="text-gray-500">Gasto</p>
            <p class="font-semibold">{{ formatCurrency(centro.gasto) }}</p>
          </div>
          <div class="text-right">
            <p class="text-gray-500">Orçamento</p>
            <p class="font-semibold">{{ formatCurrency(centro.orcamento) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

