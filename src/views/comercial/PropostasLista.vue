<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const propostas = ref([
  { id: 1, numero: 'PROP-001', cliente: 'José Oliveira', plano: 'Família Premium', valor: 189.90, status: 'enviada', criada: '2024-12-08' },
  { id: 2, numero: 'PROP-002', cliente: 'Fernanda Costa', plano: 'Individual Plus', valor: 99.90, status: 'visualizada', criada: '2024-12-07' },
  { id: 3, numero: 'PROP-003', cliente: 'Ricardo Santos', plano: 'Família Básico', valor: 149.90, status: 'aceita', criada: '2024-12-05' },
  { id: 4, numero: 'PROP-004', cliente: 'Mariana Lima', plano: 'Individual Premium', valor: 129.90, status: 'recusada', criada: '2024-12-04' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const getStatusSeverity = (status) => ({ 'enviada': 'info', 'visualizada': 'warning', 'aceita': 'success', 'recusada': 'danger' }[status])
const getStatusLabel = (status) => ({ 'enviada': 'Enviada', 'visualizada': 'Visualizada', 'aceita': 'Aceita', 'recusada': 'Recusada' }[status])

function reenviarProposta(proposta) {
  toast.add({ severity: 'success', summary: 'Enviada', detail: 'Proposta reenviada com sucesso', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Propostas</h1>
        <p class="text-gray-500 mt-1">Gerencie propostas comerciais</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Proposta" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="propostas" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="numero" header="Número">
          <template #body="{ data }">
            <span class="font-mono font-medium text-primary-600">{{ data.numero }}</span>
          </template>
        </Column>
        <Column field="cliente" header="Cliente" sortable />
        <Column field="plano" header="Plano">
          <template #body="{ data }">
            <Chip :label="data.plano" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="valor" header="Valor">
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor) }}/mês</span>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column field="criada" header="Criada em">
          <template #body="{ data }">
            {{ new Date(data.criada).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column header="Ações" style="width: 150px">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button icon="pi pi-eye" rounded text severity="secondary" v-tooltip.top="'Ver'" />
              <Button v-if="data.status !== 'aceita'" icon="pi pi-send" rounded text severity="secondary" @click="reenviarProposta(data)" v-tooltip.top="'Reenviar'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

