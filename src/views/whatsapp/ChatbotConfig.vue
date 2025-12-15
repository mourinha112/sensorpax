<script setup>
import { ref } from 'vue'

const chatbotAtivo = ref(true)
const usarIA = ref(true)

const fluxos = ref([
  { id: 1, nome: 'Menu Principal', gatilho: 'Início da conversa', respostas: 5, ativo: true },
  { id: 2, nome: '2ª Via Boleto', gatilho: 'Palavra: boleto', respostas: 3, ativo: true },
  { id: 3, nome: 'Falar com Atendente', gatilho: 'Palavra: atendente', respostas: 2, ativo: true },
  { id: 4, nome: 'Dúvidas sobre Planos', gatilho: 'Palavra: plano', respostas: 4, ativo: true },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Chatbot IA</h1>
        <p class="text-gray-500 mt-1">Configure o atendimento automático</p>
      </div>
    </div>

    <!-- Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <i class="pi pi-comments text-emerald-600 text-xl"></i>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Chatbot</h3>
              <p class="text-sm text-gray-500">Atendimento automático</p>
            </div>
          </div>
          <InputSwitch v-model="chatbotAtivo" />
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <i class="pi pi-microchip-ai text-violet-600 text-xl"></i>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Inteligência Artificial</h3>
              <p class="text-sm text-gray-500">Respostas inteligentes</p>
            </div>
          </div>
          <InputSwitch v-model="usarIA" />
        </div>
      </div>
    </div>

    <!-- Fluxos -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Fluxos de Conversa</h2>
        <Button icon="pi pi-plus" label="Novo Fluxo" size="small" />
      </div>
      <div class="space-y-3">
        <div v-for="fluxo in fluxos" :key="fluxo.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <i class="pi pi-sitemap text-blue-600"></i>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ fluxo.nome }}</p>
              <p class="text-sm text-gray-500">Gatilho: {{ fluxo.gatilho }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-500">{{ fluxo.respostas }} respostas</span>
            <InputSwitch v-model="fluxo.ativo" />
            <Button icon="pi pi-pencil" rounded text severity="secondary" />
          </div>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Conversas (mês)</p>
        <p class="text-2xl font-bold text-gray-900">328</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Resolvidas pelo Bot</p>
        <p class="text-2xl font-bold text-emerald-600">78%</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Transferidas</p>
        <p class="text-2xl font-bold text-gray-900">72</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Tempo Médio</p>
        <p class="text-2xl font-bold text-gray-900">2min</p>
      </div>
    </div>
  </div>
</template>

