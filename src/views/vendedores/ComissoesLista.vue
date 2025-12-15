<script setup>
import { ref } from 'vue'

const comissoes = ref([
  { id: 1, vendedor: 'Carlos Silva', vendas: 15, valor_vendas: 2848.50, percentual: 30, comissao: 854.70, status: 'pago', data_pagamento: '2024-12-05' },
  { id: 2, vendedor: 'Ana Santos', vendas: 12, valor_vendas: 2279.20, percentual: 30, comissao: 683.76, status: 'pendente', data_pagamento: null },
  { id: 3, vendedor: 'Pedro Lima', vendas: 8, valor_vendas: 1519.20, percentual: 30, comissao: 455.76, status: 'pendente', data_pagamento: null },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Comissões</h1>
        <p class="text-gray-500 mt-1">Controle de repasses aos vendedores</p>
      </div>
      <Button icon="pi pi-download" label="Exportar" outlined />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <p class="text-emerald-100">Total a Pagar</p>
        <p class="text-3xl font-bold mt-1">{{ formatCurrency(comissoes.filter(c => c.status === 'pendente').reduce((a, c) => a + c.comissao, 0)) }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Pago (mês)</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ formatCurrency(comissoes.filter(c => c.status === 'pago').reduce((a, c) => a + c.comissao, 0)) }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Percentual Padrão</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">30%</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="comissoes" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="vendedor" header="Vendedor" sortable />
        <Column field="vendas" header="Vendas" sortable />
        <Column field="valor_vendas" header="Valor Vendas" sortable>
          <template #body="{ data }">
            {{ formatCurrency(data.valor_vendas) }}
          </template>
        </Column>
        <Column field="percentual" header="%">
          <template #body="{ data }">
            {{ data.percentual }}%
          </template>
        </Column>
        <Column field="comissao" header="Comissão" sortable>
          <template #body="{ data }">
            <span class="font-semibold text-emerald-600">{{ formatCurrency(data.comissao) }}</span>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status === 'pago' ? 'Pago' : 'Pendente'" :severity="data.status === 'pago' ? 'success' : 'warning'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button v-if="data.status === 'pendente'" icon="pi pi-check" rounded text severity="success" v-tooltip.top="'Pagar'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

