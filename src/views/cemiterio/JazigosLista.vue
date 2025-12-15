<script setup>
import { ref } from 'vue'

const jazigos = ref([
  { id: 1, localizacao: 'Quadra A - Lote 15', tipo: 'Perpétuo', concessionario: 'João da Silva Santos', ocupantes: 2, capacidade: 4, status: 'ativo', renovacao: null },
  { id: 2, localizacao: 'Quadra B - Lote 08', tipo: 'Temporário', concessionario: 'Maria Oliveira', ocupantes: 1, capacidade: 2, status: 'ativo', renovacao: '2025-03-15' },
  { id: 3, localizacao: 'Quadra C - Lote 42', tipo: 'Perpétuo', concessionario: 'Carlos Ferreira', ocupantes: 3, capacidade: 4, status: 'pendente', renovacao: '2024-12-20' },
  { id: 4, localizacao: 'Quadra A - Lote 22', tipo: 'Temporário', concessionario: null, ocupantes: 0, capacidade: 2, status: 'disponivel', renovacao: null },
])

const getStatusSeverity = (status) => ({ 'ativo': 'success', 'pendente': 'warning', 'disponivel': 'info', 'vencido': 'danger' }[status])
const getStatusLabel = (status) => ({ 'ativo': 'Ativo', 'pendente': 'Renovação Pendente', 'disponivel': 'Disponível', 'vencido': 'Vencido' }[status])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Jazigos</h1>
        <p class="text-gray-500 mt-1">Controle de jazigos e concessões</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Jazigo" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="jazigos" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="localizacao" header="Localização" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.localizacao }}</span>
          </template>
        </Column>
        <Column field="tipo" header="Tipo">
          <template #body="{ data }">
            <Chip :label="data.tipo" :class="data.tipo === 'Perpétuo' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'" />
          </template>
        </Column>
        <Column field="concessionario" header="Concessionário">
          <template #body="{ data }">
            {{ data.concessionario || '-' }}
          </template>
        </Column>
        <Column header="Ocupação">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <ProgressBar :value="(data.ocupantes / data.capacidade) * 100" :showValue="false" style="height: 6px; width: 60px" />
              <span class="text-sm">{{ data.ocupantes }}/{{ data.capacidade }}</span>
            </div>
          </template>
        </Column>
        <Column field="renovacao" header="Próx. Renovação">
          <template #body="{ data }">
            {{ data.renovacao ? new Date(data.renovacao).toLocaleDateString('pt-BR') : '-' }}
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-eye" rounded text severity="secondary" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

