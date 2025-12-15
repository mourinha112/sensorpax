<script setup>
import { ref } from 'vue'

const beneficios = ref([
  { id: 1, parceiro: 'Farmácia Popular', categoria: 'Saúde', desconto: '15%', descricao: 'Desconto em medicamentos', ativo: true },
  { id: 2, parceiro: 'Ótica Vista', categoria: 'Saúde', desconto: '20%', descricao: 'Desconto em óculos e lentes', ativo: true },
  { id: 3, parceiro: 'Clínica Odonto', categoria: 'Saúde', desconto: '25%', descricao: 'Consultas e procedimentos', ativo: true },
  { id: 4, parceiro: 'Academia FitLife', categoria: 'Bem-estar', desconto: '30%', descricao: 'Mensalidade da academia', ativo: true },
  { id: 5, parceiro: 'Restaurante Sabor', categoria: 'Alimentação', desconto: '10%', descricao: 'Refeições no estabelecimento', ativo: false },
])

const categorias = ['Saúde', 'Bem-estar', 'Alimentação', 'Educação', 'Lazer', 'Outros']
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Clube de Benefícios</h1>
        <p class="text-gray-500 mt-1">Descontos e vantagens para associados</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Benefício" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-6 text-white">
        <p class="text-violet-100">Total de Parcerias</p>
        <p class="text-3xl font-bold mt-1">{{ beneficios.length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Ativas</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ beneficios.filter(b => b.ativo).length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Categorias</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ [...new Set(beneficios.map(b => b.categoria))].length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Utilizações (mês)</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">156</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="beneficio in beneficios" :key="beneficio.id" 
           :class="['bg-white rounded-2xl p-6 border transition-all', beneficio.ativo ? 'border-gray-100 hover:border-primary-300' : 'border-gray-200 opacity-60']">
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <i class="pi pi-gift text-violet-600 text-xl"></i>
          </div>
          <Tag :value="beneficio.ativo ? 'Ativo' : 'Inativo'" :severity="beneficio.ativo ? 'success' : 'secondary'" />
        </div>
        <h3 class="text-lg font-bold text-gray-900">{{ beneficio.parceiro }}</h3>
        <Chip :label="beneficio.categoria" class="mt-2 bg-gray-100" />
        <p class="text-gray-500 mt-2">{{ beneficio.descricao }}</p>
        <div class="mt-4 p-3 bg-emerald-50 rounded-xl text-center">
          <span class="text-2xl font-bold text-emerald-600">{{ beneficio.desconto }}</span>
          <span class="text-emerald-600"> de desconto</span>
        </div>
      </div>
    </div>
  </div>
</template>

