<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientesStore } from '@/stores/clientes'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const clientesStore = useClientesStore()

const selectedClientes = ref([])
const filters = ref({ global: { value: null, matchMode: 'contains' } })

const getStatusSeverity = (status) => {
  return { 'ativo': 'success', 'inadimplente': 'danger', 'suspenso': 'warning', 'inativo': 'secondary' }[status] || 'info'
}

const getStatusLabel = (status) => {
  return { 'ativo': 'Ativo', 'inadimplente': 'Inadimplente', 'suspenso': 'Suspenso', 'inativo': 'Inativo' }[status] || status
}

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function viewCliente(cliente) {
  router.push(`/clientes/${cliente.id}`)
}

function deleteCliente(cliente) {
  confirm.require({
    message: `Deseja realmente excluir o cliente ${cliente.nome}?`,
    header: 'Confirmar Exclusão',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      clientesStore.deleteCliente(cliente.id)
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluído', life: 3000 })
    }
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Clientes</h1>
        <p class="text-gray-500 mt-1">Gerencie todos os clientes e associados</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-download" label="Exportar" outlined />
        <Button icon="pi pi-plus" label="Novo Cliente" @click="router.push('/clientes/novo')" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <i class="pi pi-users text-blue-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total</p>
            <p class="text-xl font-bold text-gray-900">{{ clientesStore.totalClientes }}</p>
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
            <p class="text-xl font-bold text-gray-900">{{ clientesStore.clientesAtivos }}</p>
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
            <p class="text-xl font-bold text-gray-900">{{ clientesStore.clientesInadimplentes }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
            <i class="pi pi-user-plus text-violet-600"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Novos (mês)</p>
            <p class="text-xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable 
        :value="clientesStore.clientes" 
        :paginator="true" 
        :rows="10"
        v-model:selection="selectedClientes"
        v-model:filters="filters"
        :globalFilterFields="['nome', 'cpf', 'email', 'telefone']"
        responsiveLayout="scroll"
        class="p-datatable-sm"
        stripedRows
      >
        <template #header>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Buscar clientes..." class="w-full md:w-80" />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        
        <Column field="nome" header="Cliente" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.nome.charAt(0)" shape="circle" class="bg-primary-100 text-primary-700" />
              <div>
                <p class="font-medium">{{ data.nome }}</p>
                <p class="text-sm text-gray-500">{{ data.cpf }}</p>
              </div>
            </div>
          </template>
        </Column>
        
        <Column field="telefone" header="Telefone" sortable />
        <Column field="email" header="E-mail" sortable />
        
        <Column field="plano" header="Plano" sortable>
          <template #body="{ data }">
            <Chip :label="data.plano" class="bg-gray-100" />
          </template>
        </Column>
        
        <Column field="valor_mensalidade" header="Mensalidade" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor_mensalidade) }}</span>
          </template>
        </Column>
        
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        
        <Column header="Ações" headerStyle="width: 8rem">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button icon="pi pi-eye" rounded text severity="secondary" @click="viewCliente(data)" v-tooltip.top="'Ver'" />
              <Button icon="pi pi-whatsapp" rounded text severity="success" v-tooltip.top="'WhatsApp'" />
              <Button icon="pi pi-trash" rounded text severity="danger" @click="deleteCliente(data)" v-tooltip.top="'Excluir'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

