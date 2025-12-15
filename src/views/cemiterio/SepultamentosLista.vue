<script setup>
import { ref } from 'vue'

const sepultamentos = ref([
  { id: 1, falecido: 'Maria José Souza', data: '2024-12-08', jazigo: 'Quadra C - Lote 42', responsavel: 'Maria Aparecida Oliveira' },
  { id: 2, falecido: 'José Antônio Lima', data: '2024-12-05', jazigo: 'Quadra A - Lote 15', responsavel: 'João da Silva Santos' },
  { id: 3, falecido: 'Helena Costa', data: '2024-11-28', jazigo: 'Quadra B - Lote 08', responsavel: 'Maria Oliveira' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Sepultamentos</h1>
        <p class="text-gray-500 mt-1">Histórico de sepultamentos realizados</p>
      </div>
      <Button icon="pi pi-download" label="Exportar" outlined />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="sepultamentos" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="falecido" header="Falecido" sortable>
          <template #body="{ data }">
            <span class="font-medium">{{ data.falecido }}</span>
          </template>
        </Column>
        <Column field="data" header="Data" sortable>
          <template #body="{ data }">
            {{ new Date(data.data).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column field="jazigo" header="Jazigo" sortable />
        <Column field="responsavel" header="Responsável" sortable />
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-file-pdf" rounded text severity="secondary" v-tooltip.top="'Certidão'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

