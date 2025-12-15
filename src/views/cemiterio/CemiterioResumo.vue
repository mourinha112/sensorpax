<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Gestão de Cemitério</h1>
        <p class="text-gray-500 mt-1">Controle de jazigos e sepultamentos</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <i class="pi pi-map-marker text-blue-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Jazigos</p>
            <p class="text-xl font-bold text-gray-900">248</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-check-circle text-emerald-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Disponíveis</p>
            <p class="text-xl font-bold text-gray-900">42</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <i class="pi pi-clock text-amber-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Renovação Pendente</p>
            <p class="text-xl font-bold text-gray-900">15</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
            <i class="pi pi-book text-violet-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Sepultamentos (ano)</p>
            <p class="text-xl font-bold text-gray-900">87</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div @click="router.push('/jazigos')" class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <i class="pi pi-map-marker text-blue-600 text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Jazigos</h3>
            <p class="text-gray-500">Gerencie jazigos e concessões</p>
          </div>
        </div>
      </div>
      
      <div @click="router.push('/sepultamentos')" class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center">
            <i class="pi pi-book text-violet-600 text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Sepultamentos</h3>
            <p class="text-gray-500">Histórico de sepultamentos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mapa do Cemitério -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Mapa do Cemitério</h2>
      <div class="bg-gray-100 rounded-xl h-80 flex items-center justify-center">
        <div class="text-center text-gray-500">
          <i class="pi pi-map text-4xl mb-2"></i>
          <p>Mapa georreferenciado</p>
          <p class="text-sm">(Em desenvolvimento)</p>
        </div>
      </div>
    </div>
  </div>
</template>

