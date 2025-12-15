<script setup>
import { ref } from 'vue'

const chamados = ref([
  { id: 1, cliente: 'João da Silva', telefone: '(11) 99999-1111', hora: '14:30', status: 'em_atendimento', tipo: 'Emergência' },
  { id: 2, cliente: 'Maria Oliveira', telefone: '(11) 99999-2222', hora: '12:15', status: 'finalizado', tipo: 'Informação' },
])

const getStatusSeverity = (status) => ({ 'em_atendimento': 'warning', 'finalizado': 'success', 'pendente': 'danger' }[status])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Assistência 24h</h1>
        <p class="text-gray-500 mt-1">Central de atendimento emergencial</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-100">Em Atendimento</p>
            <p class="text-3xl font-bold mt-1">{{ chamados.filter(c => c.status === 'em_atendimento').length }}</p>
          </div>
          <i class="pi pi-phone text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Chamados Hoje</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ chamados.length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Tempo Médio</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">15 min</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Satisfação</p>
        <p class="text-3xl font-bold text-emerald-600 mt-1">98%</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Chamados do Dia</h2>
      </div>
      <DataTable :value="chamados" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="cliente" header="Cliente" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.cliente }}</span>
          </template>
        </Column>
        <Column field="telefone" header="Telefone" />
        <Column field="tipo" header="Tipo">
          <template #body="{ data }">
            <Chip :label="data.tipo" :class="data.tipo === 'Emergência' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'" />
          </template>
        </Column>
        <Column field="hora" header="Hora" />
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status === 'em_atendimento' ? 'Em atendimento' : 'Finalizado'" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-phone" rounded text severity="success" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Botão SOS -->
    <div class="bg-red-50 rounded-2xl p-6 border border-red-200">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
          <i class="pi pi-phone text-white text-2xl"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-red-800">Botão de Emergência do App</h3>
          <p class="text-red-600">Quando acionado pelo associado, aparece aqui em tempo real</p>
        </div>
      </div>
    </div>
  </div>
</template>

