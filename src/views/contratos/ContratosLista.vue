<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContratosStore } from '@/stores/contratos'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const contratosStore = useContratosStore()

const selectedContratos = ref([])
const filters = ref({
  global: { value: null, matchMode: 'contains' }
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getStatusSeverity = (status) => {
  const severities = {
    'ativo': 'success',
    'inadimplente': 'danger',
    'suspenso': 'warning',
    'cancelado': 'secondary'
  }
  return severities[status] || 'info'
}

const getStatusLabel = (status) => {
  const labels = {
    'ativo': 'Ativo',
    'inadimplente': 'Inadimplente',
    'suspenso': 'Suspenso',
    'cancelado': 'Cancelado'
  }
  return labels[status] || status
}

function viewContrato(contrato) {
  router.push(`/contratos/${contrato.id}`)
}

function editContrato(contrato) {
  router.push(`/contratos/${contrato.id}`)
}

function deleteContrato(contrato) {
  confirm.require({
    message: `Deseja realmente excluir o contrato ${contrato.numero}?`,
    header: 'Confirmar Exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Excluir',
    rejectLabel: 'Cancelar',
    accept: () => {
      contratosStore.deleteContrato(contrato.id)
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contrato excluído com sucesso', life: 3000 })
    }
  })
}

function exportData() {
  toast.add({ severity: 'info', summary: 'Exportando', detail: 'Gerando arquivo...', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Contratos</h1>
        <p class="text-gray-500 mt-1">Gerencie todos os contratos e assinaturas</p>
      </div>
      <div class="flex gap-2">
        <Button 
          icon="pi pi-download" 
          label="Exportar" 
          outlined
          @click="exportData"
        />
        <Button 
          icon="pi pi-plus" 
          label="Novo Contrato" 
          @click="router.push('/contratos/novo')"
        />
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <i class="pi pi-file text-blue-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total</p>
            <p class="text-xl font-bold text-gray-900">{{ contratosStore.totalContratos }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-check-circle text-emerald-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ativos</p>
            <p class="text-xl font-bold text-gray-900">{{ contratosStore.contratosAtivos }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <i class="pi pi-exclamation-triangle text-amber-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Inadimplentes</p>
            <p class="text-xl font-bold text-gray-900">{{ contratosStore.contratos.filter(c => c.status === 'inadimplente').length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
            <i class="pi pi-dollar text-violet-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Valor Mensal</p>
            <p class="text-xl font-bold text-gray-900">{{ formatCurrency(contratosStore.valorTotalMensal) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable 
        :value="contratosStore.contratos" 
        :paginator="true" 
        :rows="10"
        v-model:selection="selectedContratos"
        v-model:filters="filters"
        filterDisplay="menu"
        :globalFilterFields="['numero', 'cliente_nome', 'plano', 'status']"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Buscar contratos..." class="w-full md:w-80" />
            </span>
            <div class="flex gap-2">
              <Dropdown 
                :options="['Todos', 'Ativo', 'Inadimplente', 'Suspenso']" 
                placeholder="Status"
                class="w-40"
              />
            </div>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        
        <Column field="numero" header="Número" sortable>
          <template #body="{ data }">
            <span class="font-mono font-medium text-primary-600">{{ data.numero }}</span>
          </template>
        </Column>
        
        <Column field="cliente_nome" header="Cliente" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar 
                :label="data.cliente_nome.charAt(0)" 
                shape="circle"
                class="bg-primary-100 text-primary-700"
              />
              <span class="font-medium">{{ data.cliente_nome }}</span>
            </div>
          </template>
        </Column>
        
        <Column field="plano" header="Plano" sortable>
          <template #body="{ data }">
            <Chip :label="data.plano" class="bg-gray-100" />
          </template>
        </Column>
        
        <Column field="valor" header="Valor" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor) }}</span>
          </template>
        </Column>
        
        <Column field="data_inicio" header="Início" sortable>
          <template #body="{ data }">
            {{ formatDate(data.data_inicio) }}
          </template>
        </Column>
        
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        
        <Column field="assinatura_digital" header="Assinatura" sortable>
          <template #body="{ data }">
            <i :class="[data.assinatura_digital ? 'pi pi-check-circle text-emerald-500' : 'pi pi-times-circle text-gray-400']"></i>
          </template>
        </Column>
        
        <Column header="Ações" headerStyle="width: 8rem">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button 
                icon="pi pi-eye" 
                rounded 
                text 
                severity="secondary"
                @click="viewContrato(data)"
                v-tooltip.top="'Visualizar'"
              />
              <Button 
                icon="pi pi-pencil" 
                rounded 
                text 
                severity="secondary"
                @click="editContrato(data)"
                v-tooltip.top="'Editar'"
              />
              <Button 
                icon="pi pi-trash" 
                rounded 
                text 
                severity="danger"
                @click="deleteContrato(data)"
                v-tooltip.top="'Excluir'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

