<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const etapas = ref([
  { nome: 'Leads', cor: 'bg-blue-500', quantidade: 45, valor: 8550 },
  { nome: 'Qualificados', cor: 'bg-indigo-500', quantidade: 28, valor: 5320 },
  { nome: 'Propostas', cor: 'bg-violet-500', quantidade: 15, valor: 2850 },
  { nome: 'Negociação', cor: 'bg-purple-500', quantidade: 8, valor: 1520 },
  { nome: 'Fechados', cor: 'bg-emerald-500', quantidade: 5, valor: 950 },
])

const leads = ref([
  { id: 1, nome: 'José Oliveira', telefone: '(11) 99999-0001', interesse: 'Família Premium', etapa: 'Leads', criado: '2024-12-08' },
  { id: 2, nome: 'Fernanda Costa', telefone: '(11) 99999-0002', interesse: 'Individual Plus', etapa: 'Qualificados', criado: '2024-12-07' },
  { id: 3, nome: 'Ricardo Santos', telefone: '(11) 99999-0003', interesse: 'Família Básico', etapa: 'Propostas', criado: '2024-12-05' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function moverLead(lead, novaEtapa) {
  lead.etapa = novaEtapa
  toast.add({ severity: 'success', summary: 'Movido', detail: `Lead movido para ${novaEtapa}`, life: 2000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Funil de Vendas</h1>
        <p class="text-gray-500 mt-1">Acompanhe o progresso das vendas</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Lead" />
    </div>

    <!-- Funil Visual -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <div class="flex items-end justify-center gap-2 h-48">
        <div v-for="(etapa, index) in etapas" :key="etapa.nome" 
             :class="etapa.cor"
             :style="{ width: `${100 - index * 15}%`, height: `${100 - index * 15}%` }"
             class="rounded-lg flex flex-col items-center justify-center text-white transition-all hover:opacity-90 cursor-pointer">
          <span class="font-bold text-2xl">{{ etapa.quantidade }}</span>
          <span class="text-sm opacity-80">{{ etapa.nome }}</span>
        </div>
      </div>
      <div class="flex justify-around mt-4 text-center">
        <div v-for="etapa in etapas" :key="etapa.nome">
          <p class="font-semibold">{{ formatCurrency(etapa.valor) }}</p>
          <p class="text-sm text-gray-500">{{ etapa.nome }}</p>
        </div>
      </div>
    </div>

    <!-- Lista de Leads -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="leads" responsiveLayout="scroll" class="p-datatable-sm">
        <Column field="nome" header="Nome" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.nome }}</span>
          </template>
        </Column>
        <Column field="telefone" header="Telefone" />
        <Column field="interesse" header="Interesse">
          <template #body="{ data }">
            <Chip :label="data.interesse" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="etapa" header="Etapa">
          <template #body="{ data }">
            <Dropdown 
              v-model="data.etapa" 
              :options="etapas.map(e => e.nome)" 
              @change="moverLead(data, data.etapa)"
              class="w-36"
            />
          </template>
        </Column>
        <Column field="criado" header="Criado em">
          <template #body="{ data }">
            {{ new Date(data.criado).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-whatsapp" rounded text severity="success" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

