<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const cobrancas = ref([
  { id: 1, cliente: 'João da Silva Santos', valor: 189.90, vencimento: '2024-12-15', status: 'pendente', forma: 'Boleto' },
  { id: 2, cliente: 'Maria Aparecida Oliveira', valor: 99.90, vencimento: '2024-12-10', status: 'pago', forma: 'Cartão' },
  { id: 3, cliente: 'Carlos Roberto Ferreira', valor: 449.70, vencimento: '2024-11-01', status: 'vencido', forma: 'Boleto' },
  { id: 4, cliente: 'Ana Paula Mendes', valor: 129.90, vencimento: '2024-12-05', status: 'pago', forma: 'PIX' },
  { id: 5, cliente: 'Roberto Almeida Costa', valor: 379.80, vencimento: '2024-10-20', status: 'vencido', forma: 'Boleto' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const getStatusSeverity = (status) => ({ 'pago': 'success', 'pendente': 'warning', 'vencido': 'danger' }[status] || 'info')
const getStatusLabel = (status) => ({ 'pago': 'Pago', 'pendente': 'Pendente', 'vencido': 'Vencido' }[status] || status)

function enviarCobranca(cobranca) {
  toast.add({ severity: 'success', summary: 'Enviado', detail: `Cobrança enviada para ${cobranca.cliente}`, life: 3000 })
}

function gerarBoleto(cobranca) {
  toast.add({ severity: 'info', summary: 'Gerando', detail: 'Boleto sendo gerado...', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Cobranças</h1>
        <p class="text-gray-500 mt-1">Gerencie todas as cobranças</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-whatsapp" label="Enviar em Lote" severity="success" />
        <Button icon="pi pi-plus" label="Nova Cobrança" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-check-circle text-emerald-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Recebido</p>
            <p class="text-xl font-bold text-emerald-600">R$ 229,80</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <i class="pi pi-clock text-amber-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Pendente</p>
            <p class="text-xl font-bold text-amber-600">R$ 189,90</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <i class="pi pi-exclamation-triangle text-red-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Vencido</p>
            <p class="text-xl font-bold text-red-600">R$ 829,50</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <i class="pi pi-chart-line text-blue-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Taxa Recebimento</p>
            <p class="text-xl font-bold text-blue-600">85%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="cobrancas" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="cliente" header="Cliente" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.cliente }}</span>
          </template>
        </Column>
        <Column field="valor" header="Valor" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor) }}</span>
          </template>
        </Column>
        <Column field="vencimento" header="Vencimento" sortable>
          <template #body="{ data }">
            {{ formatDate(data.vencimento) }}
          </template>
        </Column>
        <Column field="forma" header="Forma" sortable />
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Ações" style="width: 150px">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button v-if="data.status !== 'pago'" icon="pi pi-whatsapp" rounded text severity="success" @click="enviarCobranca(data)" v-tooltip.top="'Cobrar'" />
              <Button v-if="data.status !== 'pago'" icon="pi pi-file" rounded text severity="secondary" @click="gerarBoleto(data)" v-tooltip.top="'Boleto'" />
              <Button icon="pi pi-eye" rounded text severity="secondary" v-tooltip.top="'Ver'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

