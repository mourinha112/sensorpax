<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOcorrenciasStore } from '@/stores/ocorrencias'

const router = useRouter()
const ocorrenciasStore = useOcorrenciasStore()

const getStatusSeverity = (status) => ({ 'em_andamento': 'warning', 'finalizado': 'success', 'cancelado': 'danger' }[status])
const getStatusLabel = (status) => ({ 'em_andamento': 'Em andamento', 'finalizado': 'Finalizado', 'cancelado': 'Cancelado' }[status])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Ocorrências Funerárias</h1>
        <p class="text-gray-500 mt-1">Gerencie os atendimentos funerários</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Ocorrência" @click="router.push('/ocorrencias/nova')" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-100">Em Andamento</p>
            <p class="text-3xl font-bold mt-1">{{ ocorrenciasStore.ocorrenciasEmAndamento.length }}</p>
          </div>
          <i class="pi pi-clock text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Finalizadas (mês)</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ ocorrenciasStore.ocorrenciasFinalizadas.length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Total (ano)</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ ocorrenciasStore.ocorrencias.length }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="ocorrenciasStore.ocorrencias" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="numero" header="Número">
          <template #body="{ data }">
            <span class="font-mono font-medium text-primary-600">{{ data.numero }}</span>
          </template>
        </Column>
        <Column field="falecido" header="Falecido" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.falecido }}</span>
          </template>
        </Column>
        <Column field="responsavel" header="Responsável" sortable />
        <Column field="data_falecimento" header="Data">
          <template #body="{ data }">
            {{ new Date(data.data_falecimento).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column field="velorio" header="Velório">
          <template #body="{ data }">
            {{ data.velorio?.local || '-' }}
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
          </template>
        </Column>
        <Column header="Progresso">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <ProgressBar :value="(data.checklist.filter(c => c.concluido).length / data.checklist.length) * 100" :showValue="false" style="height: 6px; width: 80px" />
              <span class="text-sm text-gray-500">{{ data.checklist.filter(c => c.concluido).length }}/{{ data.checklist.length }}</span>
            </div>
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button icon="pi pi-eye" rounded text severity="secondary" @click="router.push(`/ocorrencias/${data.id}`)" v-tooltip.top="'Ver'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

