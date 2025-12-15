<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Fiscal</h1>
        <p class="text-gray-500 mt-1">Notas fiscais e relatórios contábeis</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Notas Emitidas (mês)</p>
        <p class="text-2xl font-bold text-gray-900">45</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Valor Total</p>
        <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(8550) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Impostos</p>
        <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(427.50) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Pendentes</p>
        <p class="text-2xl font-bold text-amber-600">3</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div @click="router.push('/notas-fiscais')" class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <i class="pi pi-file-export text-blue-600 text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Notas Fiscais</h3>
            <p class="text-gray-500">Emitir e consultar NFS-e</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-file-excel text-emerald-600 text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Exportar Contabilidade</h3>
            <p class="text-gray-500">Gerar relatórios contábeis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

