<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const carnes = ref([
  { id: 1, numero: 'CRN-2024-001', cliente: 'João da Silva Santos', parcelas: 12, valor_parcela: 189.90, valor_total: 2278.80, pagas: 11, vencidas: 0, status: 'ativo' },
  { id: 2, numero: 'CRN-2024-002', cliente: 'Maria Aparecida Oliveira', parcelas: 12, valor_parcela: 99.90, valor_total: 1198.80, pagas: 12, vencidas: 0, status: 'quitado' },
  { id: 3, numero: 'CRN-2024-003', cliente: 'Carlos Roberto Ferreira', parcelas: 12, valor_parcela: 149.90, valor_total: 1798.80, pagas: 8, vencidas: 3, status: 'inadimplente' },
  { id: 4, numero: 'CRN-2024-004', cliente: 'Ana Paula Mendes', parcelas: 12, valor_parcela: 129.90, valor_total: 1558.80, pagas: 0, vencidas: 0, status: 'ativo' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const getStatusSeverity = (status) => {
  return { 'ativo': 'success', 'quitado': 'info', 'inadimplente': 'danger', 'cancelado': 'secondary' }[status] || 'info'
}

const getStatusLabel = (status) => {
  return { 'ativo': 'Ativo', 'quitado': 'Quitado', 'inadimplente': 'Inadimplente', 'cancelado': 'Cancelado' }[status] || status
}

function gerarCarne() {
  toast.add({ severity: 'info', summary: 'Gerando', detail: 'Carnê sendo gerado...', life: 3000 })
}

function imprimirCarne(carne) {
  toast.add({ severity: 'info', summary: 'Imprimindo', detail: `Carnê ${carne.numero} sendo impresso...`, life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Carnês</h1>
        <p class="text-gray-500 mt-1">Gerencie carnês e boletos</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-plus" label="Gerar Carnê" @click="gerarCarne" />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="carnes" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="numero" header="Número" sortable>
          <template #body="{ data }">
            <span class="font-mono font-medium text-primary-600">{{ data.numero }}</span>
          </template>
        </Column>
        <Column field="cliente" header="Cliente" sortable />
        <Column field="parcelas" header="Parcelas" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.pagas }}/{{ data.parcelas }}</span>
          </template>
        </Column>
        <Column field="valor_parcela" header="Valor Parcela" sortable>
          <template #body="{ data }">
            {{ formatCurrency(data.valor_parcela) }}
          </template>
        </Column>
        <Column field="valor_total" header="Valor Total" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor_total) }}</span>
          </template>
        </Column>
        <Column field="vencidas" header="Vencidas">
          <template #body="{ data }">
            <Tag v-if="data.vencidas > 0" :value="`${data.vencidas} vencidas`" severity="danger" />
            <span v-else class="text-gray-400">-</span>
          </template>
        </Column>
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button icon="pi pi-print" rounded text severity="secondary" @click="imprimirCarne(data)" v-tooltip.top="'Imprimir'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

