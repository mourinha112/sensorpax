<script setup>
import { ref } from 'vue'

const parcerias = ref([
  { id: 1, nome: 'Farmácia Popular', cnpj: '00.000.000/0001-00', contato: '(11) 99999-0001', categoria: 'Saúde', status: 'ativo' },
  { id: 2, nome: 'Ótica Vista', cnpj: '00.000.000/0002-00', contato: '(11) 99999-0002', categoria: 'Saúde', status: 'ativo' },
  { id: 3, nome: 'Clínica Odonto', cnpj: '00.000.000/0003-00', contato: '(11) 99999-0003', categoria: 'Saúde', status: 'ativo' },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Parcerias</h1>
        <p class="text-gray-500 mt-1">Gerencie os parceiros do clube</p>
      </div>
      <Button icon="pi pi-plus" label="Nova Parceria" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="parcerias" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Parceiro" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.nome.charAt(0)" shape="circle" class="bg-violet-100 text-violet-700" />
              <span class="font-medium">{{ data.nome }}</span>
            </div>
          </template>
        </Column>
        <Column field="cnpj" header="CNPJ" />
        <Column field="contato" header="Contato" />
        <Column field="categoria" header="Categoria">
          <template #body="{ data }">
            <Chip :label="data.categoria" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status === 'ativo' ? 'Ativo' : 'Inativo'" :severity="data.status === 'ativo' ? 'success' : 'secondary'" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-pencil" rounded text severity="secondary" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

