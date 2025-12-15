<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const relatorios = ref([
  { id: 1, nome: 'Relatório Financeiro Mensal', categoria: 'Financeiro', gerado: '2024-12-10', formato: 'PDF' },
  { id: 2, nome: 'Relatório de Vendas', categoria: 'Comercial', gerado: '2024-12-09', formato: 'Excel' },
  { id: 3, nome: 'Relatório de Inadimplência', categoria: 'Cobrança', gerado: '2024-12-08', formato: 'PDF' },
  { id: 4, nome: 'Relatório de Clientes', categoria: 'Cadastro', gerado: '2024-12-07', formato: 'Excel' },
])

const tiposRelatorio = ref([
  { label: 'Financeiro Mensal', value: 'financeiro', icon: 'pi-chart-line', desc: 'Receitas, despesas e saldo' },
  { label: 'Vendas', value: 'vendas', icon: 'pi-shopping-cart', desc: 'Vendas por período' },
  { label: 'Inadimplência', value: 'inadimplencia', icon: 'pi-exclamation-triangle', desc: 'Clientes em atraso' },
  { label: 'Clientes', value: 'clientes', icon: 'pi-users', desc: 'Lista completa de clientes' },
  { label: 'Contratos', value: 'contratos', icon: 'pi-file', desc: 'Contratos ativos e vencidos' },
  { label: 'Contábil', value: 'contabil', icon: 'pi-calculator', desc: 'Para contabilidade' },
])

function gerarRelatorio(tipo) {
  toast.add({ severity: 'info', summary: 'Gerando', detail: `Relatório ${tipo.label} sendo gerado...`, life: 3000 })
}

function downloadRelatorio(relatorio) {
  toast.add({ severity: 'success', summary: 'Download', detail: `Baixando ${relatorio.nome}...`, life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Relatórios</h1>
        <p class="text-gray-500 mt-1">Gere e exporte relatórios</p>
      </div>
    </div>

    <!-- Tipos de Relatório -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="tipo in tiposRelatorio" :key="tipo.value" 
           @click="gerarRelatorio(tipo)"
           class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 hover:shadow-md transition-all">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <i :class="['pi', tipo.icon, 'text-primary-600 text-xl']"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ tipo.label }}</h3>
            <p class="text-sm text-gray-500">{{ tipo.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Relatórios Gerados -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Relatórios Gerados</h2>
      </div>
      <DataTable :value="relatorios" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Nome" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <i :class="['pi', data.formato === 'PDF' ? 'pi-file-pdf' : 'pi-file-excel', data.formato === 'PDF' ? 'text-red-600' : 'text-emerald-600']"></i>
              </div>
              <span class="font-medium">{{ data.nome }}</span>
            </div>
          </template>
        </Column>
        <Column field="categoria" header="Categoria">
          <template #body="{ data }">
            <Chip :label="data.categoria" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="gerado" header="Gerado em">
          <template #body="{ data }">
            {{ new Date(data.gerado).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column field="formato" header="Formato" />
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button icon="pi pi-download" rounded text severity="secondary" @click="downloadRelatorio(data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

