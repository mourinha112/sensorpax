<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const salas = ref([
  { id: 1, nome: 'Sala 1 - Central', capacidade: 100, status: 'ocupada', ocupacao: 'Antônio Carlos Pereira', ate: '2024-12-10T10:00' },
  { id: 2, nome: 'Sala 2 - Norte', capacidade: 80, status: 'livre', ocupacao: null, ate: null },
  { id: 3, nome: 'Sala 3 - Sul', capacidade: 60, status: 'reservada', ocupacao: 'Reserva - José Silva', ate: '2024-12-11T08:00' },
  { id: 4, nome: 'Sala 4 - VIP', capacidade: 50, status: 'manutencao', ocupacao: null, ate: null },
])

const getStatusSeverity = (status) => ({ 'ocupada': 'danger', 'livre': 'success', 'reservada': 'warning', 'manutencao': 'secondary' }[status])
const getStatusLabel = (status) => ({ 'ocupada': 'Ocupada', 'livre': 'Livre', 'reservada': 'Reservada', 'manutencao': 'Manutenção' }[status])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Gestão de Velórios</h1>
        <p class="text-gray-500 mt-1">Controle de salas e reservas</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-calendar" label="Ver Agenda" outlined @click="router.push('/velorios/agenda')" />
        <Button icon="pi pi-plus" label="Nova Reserva" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="sala in salas" :key="sala.id" class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900">{{ sala.nome }}</h3>
          <Tag :value="getStatusLabel(sala.status)" :severity="getStatusSeverity(sala.status)" />
        </div>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-gray-500">
            <i class="pi pi-users"></i>
            <span>Capacidade: {{ sala.capacidade }} pessoas</span>
          </div>
          <div v-if="sala.ocupacao" class="flex items-center gap-2 text-gray-700">
            <i class="pi pi-user"></i>
            <span>{{ sala.ocupacao }}</span>
          </div>
          <div v-if="sala.ate" class="flex items-center gap-2 text-gray-500">
            <i class="pi pi-clock"></i>
            <span>Até {{ new Date(sala.ate).toLocaleString('pt-BR') }}</span>
          </div>
        </div>

        <div class="mt-4">
          <Button v-if="sala.status === 'livre'" label="Reservar" class="w-full" size="small" />
          <Button v-else-if="sala.status === 'ocupada'" label="Ver Detalhes" class="w-full" size="small" outlined />
          <Button v-else-if="sala.status === 'reservada'" label="Editar Reserva" class="w-full" size="small" outlined />
          <Button v-else label="Em Manutenção" class="w-full" size="small" disabled />
        </div>
      </div>
    </div>

    <!-- Transmissão ao Vivo -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Transmissão ao Vivo</h2>
        <Tag value="Em breve" severity="info" />
      </div>
      <p class="text-gray-500">Funcionalidade de transmissão de velório ao vivo para familiares distantes.</p>
    </div>
  </div>
</template>

