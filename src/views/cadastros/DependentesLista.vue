<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientesStore } from '@/stores/clientes'

const router = useRouter()
const clientesStore = useClientesStore()

const dependentes = computed(() => {
  const deps = []
  clientesStore.clientes.forEach(cliente => {
    cliente.dependentes?.forEach(dep => {
      deps.push({ ...dep, titular: cliente.nome, titular_id: cliente.id })
    })
  })
  return deps
})

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Dependentes</h1>
        <p class="text-gray-500 mt-1">Lista de todos os dependentes cadastrados</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="dependentes" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Nome" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.nome.charAt(0)" shape="circle" class="bg-primary-100 text-primary-700" />
              <span class="font-medium">{{ data.nome }}</span>
            </div>
          </template>
        </Column>
        <Column field="parentesco" header="Parentesco" sortable />
        <Column field="data_nascimento" header="Nascimento" sortable>
          <template #body="{ data }">
            {{ formatDate(data.data_nascimento) }}
          </template>
        </Column>
        <Column field="titular" header="Titular" sortable>
          <template #body="{ data }">
            <Button :label="data.titular" link @click="router.push(`/clientes/${data.titular_id}`)" />
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body="{ data }">
            <Button icon="pi pi-id-card" rounded text severity="secondary" v-tooltip.top="'Carteirinha'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

