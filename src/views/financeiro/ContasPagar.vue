<script setup>
import { ref } from 'vue'
import { useFinanceiroStore } from '@/stores/financeiro'
import { useToast } from 'primevue/usetoast'

const financeiroStore = useFinanceiroStore()
const toast = useToast()
const showDialog = ref(false)

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function pagarConta(conta) {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta paga com sucesso', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Contas a Pagar</h1>
        <p class="text-gray-500 mt-1">Gerencie suas despesas</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Conta" @click="showDialog = true" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="financeiroStore.contasPagar" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="descricao" header="Descrição" sortable />
        <Column field="categoria" header="Categoria" sortable>
          <template #body="{ data }">
            <Chip :label="data.categoria" class="bg-gray-100" />
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
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="data.status === 'pago' ? 'Pago' : 'Pendente'" :severity="data.status === 'pago' ? 'success' : 'warning'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button v-if="data.status !== 'pago'" icon="pi pi-check" rounded text severity="success" @click="pagarConta(data)" v-tooltip.top="'Pagar'" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDialog" header="Nova Conta a Pagar" :style="{ width: '500px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <InputText class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <Dropdown :options="['Utilidades', 'Fornecedores', 'Pessoal', 'Imóveis', 'Marketing']" class="w-full" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor</label>
            <InputNumber mode="currency" currency="BRL" locale="pt-BR" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vencimento</label>
            <Calendar dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Salvar" icon="pi pi-check" />
      </template>
    </Dialog>
  </div>
</template>

