<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const showDialog = ref(false)

const acordos = ref([
  { id: 1, cliente: 'Carlos Roberto Ferreira', valor_original: 449.70, valor_acordo: 400.00, parcelas: 4, status: 'ativo', criado_em: '2024-11-20' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const novoAcordo = ref({
  cliente: null,
  valor_original: 0,
  desconto: 10,
  parcelas: 3
})

function salvarAcordo() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Acordo criado com sucesso', life: 3000 })
  showDialog.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Acordos</h1>
        <p class="text-gray-500 mt-1">Gerencie acordos e renegociações</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Acordo" @click="showDialog = true" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="acordos" responsiveLayout="scroll" class="p-datatable-sm">
        <Column field="cliente" header="Cliente" sortable />
        <Column field="valor_original" header="Valor Original" sortable>
          <template #body="{ data }">
            <span class="line-through text-gray-400">{{ formatCurrency(data.valor_original) }}</span>
          </template>
        </Column>
        <Column field="valor_acordo" header="Valor Acordo" sortable>
          <template #body="{ data }">
            <span class="font-semibold text-emerald-600">{{ formatCurrency(data.valor_acordo) }}</span>
          </template>
        </Column>
        <Column field="parcelas" header="Parcelas" sortable>
          <template #body="{ data }">
            {{ data.parcelas }}x de {{ formatCurrency(data.valor_acordo / data.parcelas) }}
          </template>
        </Column>
        <Column field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="data.status === 'ativo' ? 'Ativo' : 'Finalizado'" :severity="data.status === 'ativo' ? 'success' : 'info'" />
          </template>
        </Column>
        <Column field="criado_em" header="Criado em" sortable>
          <template #body="{ data }">
            {{ formatDate(data.criado_em) }}
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDialog" header="Novo Acordo" :style="{ width: '500px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
          <Dropdown v-model="novoAcordo.cliente" :options="[{ label: 'Carlos Roberto Ferreira', value: 1 }]" optionLabel="label" optionValue="value" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Valor Original</label>
          <InputNumber v-model="novoAcordo.valor_original" mode="currency" currency="BRL" locale="pt-BR" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Desconto (%)</label>
          <Slider v-model="novoAcordo.desconto" :min="0" :max="50" class="w-full" />
          <p class="text-sm text-gray-500 mt-1">{{ novoAcordo.desconto }}% de desconto</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Parcelas</label>
          <SelectButton v-model="novoAcordo.parcelas" :options="[{ label: '2x', value: 2 }, { label: '3x', value: 3 }, { label: '4x', value: 4 }, { label: '6x', value: 6 }]" optionLabel="label" optionValue="value" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Criar Acordo" icon="pi pi-check" @click="salvarAcordo" />
      </template>
    </Dialog>
  </div>
</template>

