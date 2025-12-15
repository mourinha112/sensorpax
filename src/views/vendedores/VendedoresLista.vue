<script setup>
import { ref } from 'vue'

const vendedores = ref([
  { id: 1, nome: 'Carlos Silva', email: 'carlos@email.com', telefone: '(11) 99999-0001', vendas_mes: 15, comissao_mes: 854.70, meta: 90, status: 'ativo' },
  { id: 2, nome: 'Ana Santos', email: 'ana@email.com', telefone: '(11) 99999-0002', vendas_mes: 12, comissao_mes: 683.76, meta: 75, status: 'ativo' },
  { id: 3, nome: 'Pedro Lima', email: 'pedro@email.com', telefone: '(11) 99999-0003', vendas_mes: 8, comissao_mes: 455.76, meta: 50, status: 'ativo' },
  { id: 4, nome: 'Maria Costa', email: 'maria@email.com', telefone: '(11) 99999-0004', vendas_mes: 5, comissao_mes: 284.85, meta: 30, status: 'inativo' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Vendedores</h1>
        <p class="text-gray-500 mt-1">Gerencie a equipe de vendas</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Vendedor" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Total Vendedores</p>
        <p class="text-2xl font-bold text-gray-900">{{ vendedores.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Vendas (mês)</p>
        <p class="text-2xl font-bold text-gray-900">{{ vendedores.reduce((a, v) => a + v.vendas_mes, 0) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Comissões (mês)</p>
        <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(vendedores.reduce((a, v) => a + v.comissao_mes, 0)) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Meta Geral</p>
        <p class="text-2xl font-bold text-gray-900">{{ Math.round(vendedores.reduce((a, v) => a + v.meta, 0) / vendedores.length) }}%</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="vendedores" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Vendedor" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.nome.charAt(0)" shape="circle" class="bg-primary-100 text-primary-700" />
              <div>
                <p class="font-medium">{{ data.nome }}</p>
                <p class="text-sm text-gray-500">{{ data.email }}</p>
              </div>
            </div>
          </template>
        </Column>
        <Column field="telefone" header="Telefone" />
        <Column field="vendas_mes" header="Vendas (mês)" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ data.vendas_mes }}</span>
          </template>
        </Column>
        <Column field="comissao_mes" header="Comissão" sortable>
          <template #body="{ data }">
            <span class="font-semibold text-emerald-600">{{ formatCurrency(data.comissao_mes) }}</span>
          </template>
        </Column>
        <Column field="meta" header="Meta">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <ProgressBar :value="data.meta" :showValue="false" style="height: 6px; width: 60px" />
              <span class="text-sm">{{ data.meta }}%</span>
            </div>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status === 'ativo' ? 'Ativo' : 'Inativo'" :severity="data.status === 'ativo' ? 'success' : 'secondary'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-pencil" rounded text severity="secondary" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

