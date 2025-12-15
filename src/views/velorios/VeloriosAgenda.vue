<script setup>
import { ref } from 'vue'

const eventos = ref([
  { id: 1, titulo: 'Antônio Carlos Pereira', sala: 'Sala 1 - Central', inicio: '2024-12-09T10:00', fim: '2024-12-10T10:00', cor: '#ef4444' },
  { id: 2, titulo: 'Reserva - José Silva', sala: 'Sala 3 - Sul', inicio: '2024-12-11T08:00', fim: '2024-12-12T08:00', cor: '#f59e0b' },
])

const dataAtual = ref(new Date())
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Agenda de Velórios</h1>
        <p class="text-gray-500 mt-1">Visualize e gerencie a agenda</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Reserva" />
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <Button icon="pi pi-chevron-left" text rounded />
          <span class="text-lg font-semibold">Dezembro 2024</span>
          <Button icon="pi pi-chevron-right" text rounded />
        </div>
        <div class="flex gap-2">
          <SelectButton :options="[{ label: 'Dia', value: 'dia' }, { label: 'Semana', value: 'semana' }, { label: 'Mês', value: 'mes' }]" optionLabel="label" optionValue="value" />
        </div>
      </div>

      <!-- Calendário Simples -->
      <div class="border rounded-xl overflow-hidden">
        <div class="grid grid-cols-7 bg-gray-50">
          <div v-for="dia in ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']" :key="dia" class="p-3 text-center text-sm font-medium text-gray-500 border-b">
            {{ dia }}
          </div>
        </div>
        <div class="grid grid-cols-7">
          <div v-for="i in 35" :key="i" class="min-h-24 p-2 border-b border-r">
            <span class="text-sm text-gray-600">{{ ((i - 1) % 31) + 1 }}</span>
            <div v-if="i === 9" class="mt-1">
              <div class="bg-red-100 text-red-700 text-xs p-1 rounded truncate">Velório - Sala 1</div>
            </div>
            <div v-if="i === 11" class="mt-1">
              <div class="bg-amber-100 text-amber-700 text-xs p-1 rounded truncate">Reserva - Sala 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Próximos Eventos -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h2>
      <div class="space-y-3">
        <div v-for="evento in eventos" :key="evento.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div :style="{ backgroundColor: evento.cor }" class="w-1 h-12 rounded-full"></div>
          <div class="flex-1">
            <p class="font-medium text-gray-900">{{ evento.titulo }}</p>
            <p class="text-sm text-gray-500">{{ evento.sala }}</p>
          </div>
          <div class="text-right text-sm">
            <p class="text-gray-900">{{ new Date(evento.inicio).toLocaleDateString('pt-BR') }}</p>
            <p class="text-gray-500">{{ new Date(evento.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

