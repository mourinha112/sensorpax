<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const inadimplentes = ref([
  { id: 1, cliente: 'Carlos Roberto Ferreira', parcelas_atrasadas: 3, valor_total: 449.70, dias_atraso: 45, ultimo_contato: '2024-11-15' },
  { id: 2, cliente: 'Roberto Almeida Costa', parcelas_atrasadas: 2, valor_total: 379.80, dias_atraso: 52, ultimo_contato: '2024-11-10' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function criarAcordo(cliente) {
  router.push('/acordos')
}

function enviarCobranca(cliente) {
  toast.add({ severity: 'success', summary: 'Enviado', detail: `Cobrança enviada para ${cliente.cliente}`, life: 3000 })
}

function bloquearBeneficios(cliente) {
  toast.add({ severity: 'warn', summary: 'Bloqueado', detail: `Benefícios de ${cliente.cliente} foram bloqueados`, life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Inadimplência</h1>
        <p class="text-gray-500 mt-1">Gerencie clientes inadimplentes</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-whatsapp" label="Cobrar Todos" severity="success" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-100">Total em Atraso</p>
            <p class="text-3xl font-bold mt-1">R$ 829,50</p>
          </div>
          <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <i class="pi pi-exclamation-triangle text-2xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500">Clientes Inadimplentes</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ inadimplentes.length }}</p>
          </div>
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <i class="pi pi-users text-red-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500">Taxa de Inadimplência</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">4.2%</p>
          </div>
          <div class="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <i class="pi pi-percentage text-amber-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="inadimplentes" responsiveLayout="scroll" class="p-datatable-sm">
        <Column field="cliente" header="Cliente" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.cliente.charAt(0)" shape="circle" class="bg-red-100 text-red-700" />
              <span class="font-medium">{{ data.cliente }}</span>
            </div>
          </template>
        </Column>
        <Column field="parcelas_atrasadas" header="Parcelas" sortable>
          <template #body="{ data }">
            <Tag :value="`${data.parcelas_atrasadas} parcelas`" severity="danger" />
          </template>
        </Column>
        <Column field="valor_total" header="Valor Total" sortable>
          <template #body="{ data }">
            <span class="font-semibold text-red-600">{{ formatCurrency(data.valor_total) }}</span>
          </template>
        </Column>
        <Column field="dias_atraso" header="Dias em Atraso" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.dias_atraso }} dias</span>
          </template>
        </Column>
        <Column field="ultimo_contato" header="Último Contato" sortable>
          <template #body="{ data }">
            {{ formatDate(data.ultimo_contato) }}
          </template>
        </Column>
        <Column header="Ações" style="width: 200px">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button icon="pi pi-whatsapp" size="small" severity="success" @click="enviarCobranca(data)" v-tooltip.top="'Cobrar'" />
              <Button icon="pi pi-handshake" size="small" outlined @click="criarAcordo(data)" v-tooltip.top="'Acordo'" />
              <Button icon="pi pi-ban" size="small" severity="danger" outlined @click="bloquearBeneficios(data)" v-tooltip.top="'Bloquear'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

