<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const showDialog = ref(false)

const notas = ref([
  { id: 1, numero: 'NFS-001234', cliente: 'João da Silva Santos', valor: 189.90, status: 'emitida', data: '2024-12-10' },
  { id: 2, numero: 'NFS-001233', cliente: 'Maria Aparecida Oliveira', valor: 99.90, status: 'emitida', data: '2024-12-09' },
  { id: 3, numero: 'NFS-001232', cliente: 'Ana Paula Mendes', valor: 129.90, status: 'cancelada', data: '2024-12-08' },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function emitirNota() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Nota fiscal emitida', life: 3000 })
  showDialog.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Notas Fiscais</h1>
        <p class="text-gray-500 mt-1">Emita e consulte NFS-e</p>
      </div>
      <Button icon="pi pi-plus" label="Emitir Nota" @click="showDialog = true" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="notas" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="numero" header="Número">
          <template #body="{ data }">
            <span class="font-mono font-medium text-primary-600">{{ data.numero }}</span>
          </template>
        </Column>
        <Column field="cliente" header="Cliente" sortable />
        <Column field="valor" header="Valor">
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.valor) }}</span>
          </template>
        </Column>
        <Column field="data" header="Data">
          <template #body="{ data }">
            {{ new Date(data.data).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status === 'emitida' ? 'Emitida' : 'Cancelada'" :severity="data.status === 'emitida' ? 'success' : 'danger'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button v-if="data.status === 'emitida'" icon="pi pi-download" rounded text severity="secondary" v-tooltip.top="'Download'" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDialog" header="Emitir Nota Fiscal" :style="{ width: '500px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
          <Dropdown :options="[{ label: 'João da Silva', value: 1 }, { label: 'Maria Oliveira', value: 2 }]" optionLabel="label" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descrição do Serviço</label>
          <InputText class="w-full" placeholder="Plano funerário mensal" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Valor</label>
          <InputNumber mode="currency" currency="BRL" locale="pt-BR" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Emitir" icon="pi pi-check" @click="emitirNota" />
      </template>
    </Dialog>
  </div>
</template>

