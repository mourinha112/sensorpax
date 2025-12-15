<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const showDialog = ref(false)

const campanhas = ref([
  { id: 1, nome: 'Aniversariantes Dezembro', tipo: 'Aniversário', enviados: 45, entregues: 44, taxa: 97.8, status: 'concluida', data: '2024-12-01' },
  { id: 2, nome: 'Lembrete Vencimento', tipo: 'Cobrança', enviados: 120, entregues: 118, taxa: 98.3, status: 'ativa', data: '2024-12-10' },
  { id: 3, nome: 'Boas Festas', tipo: 'Marketing', enviados: 0, entregues: 0, taxa: 0, status: 'agendada', data: '2024-12-23' },
])

const getStatusSeverity = (status) => ({ 'concluida': 'success', 'ativa': 'info', 'agendada': 'warning', 'pausada': 'secondary' }[status])
const getStatusLabel = (status) => ({ 'concluida': 'Concluída', 'ativa': 'Ativa', 'agendada': 'Agendada', 'pausada': 'Pausada' }[status])

function enviarCampanha(campanha) {
  toast.add({ severity: 'success', summary: 'Enviando', detail: `Campanha "${campanha.nome}" iniciada`, life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Campanhas</h1>
        <p class="text-gray-500 mt-1">Envios em massa via WhatsApp</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Campanha" @click="showDialog = true" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="campanhas" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Campanha" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.nome }}</span>
          </template>
        </Column>
        <Column field="tipo" header="Tipo">
          <template #body="{ data }">
            <Chip :label="data.tipo" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="enviados" header="Enviados" sortable />
        <Column field="entregues" header="Entregues" sortable />
        <Column field="taxa" header="Taxa">
          <template #body="{ data }">
            <span :class="data.taxa >= 95 ? 'text-emerald-600' : 'text-amber-600'" class="font-semibold">
              {{ data.taxa }}%
            </span>
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column field="data" header="Data">
          <template #body="{ data }">
            {{ new Date(data.data).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button v-if="data.status === 'agendada'" icon="pi pi-play" rounded text severity="success" @click="enviarCampanha(data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="showDialog" header="Nova Campanha" :style="{ width: '500px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Campanha</label>
          <InputText class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <Dropdown :options="['Cobrança', 'Aniversário', 'Marketing', 'Informativo']" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
          <Textarea rows="4" class="w-full" placeholder="Olá {nome}, ..." />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data de Envio</label>
          <Calendar dateFormat="dd/mm/yy" showIcon class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Criar Campanha" icon="pi pi-check" />
      </template>
    </Dialog>
  </div>
</template>

