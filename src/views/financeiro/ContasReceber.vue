<script setup>
import { ref } from 'vue'
import { useFinanceiroStore } from '@/stores/financeiro'
import { useToast } from 'primevue/usetoast'

const financeiroStore = useFinanceiroStore()
const toast = useToast()

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function baixarConta(conta) {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Pagamento registrado', life: 3000 })
}

function enviarCobranca(conta) {
  toast.add({ severity: 'success', summary: 'Enviado', detail: 'Cobrança enviada via WhatsApp', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Contas a Receber</h1>
        <p class="text-gray-500 mt-1">Gerencie suas receitas</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-whatsapp" label="Cobrar Pendentes" severity="success" />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="financeiroStore.contasReceber" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="descricao" header="Descrição" sortable />
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
            <Tag :value="data.status === 'pago' ? 'Pago' : data.status === 'vencido' ? 'Vencido' : 'Pendente'" 
                 :severity="data.status === 'pago' ? 'success' : data.status === 'vencido' ? 'danger' : 'warning'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 150px">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button v-if="data.status !== 'pago'" icon="pi pi-check" rounded text severity="success" @click="baixarConta(data)" v-tooltip.top="'Baixar'" />
              <Button v-if="data.status !== 'pago'" icon="pi pi-whatsapp" rounded text severity="success" @click="enviarCobranca(data)" v-tooltip.top="'Cobrar'" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

