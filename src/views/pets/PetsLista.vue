<script setup>
import { ref, computed } from 'vue'
import { useClientesStore } from '@/stores/clientes'

const clientesStore = useClientesStore()

const pets = computed(() => {
  const lista = []
  clientesStore.clientes.forEach(cliente => {
    cliente.pets?.forEach(pet => {
      lista.push({ ...pet, titular: cliente.nome, titular_id: cliente.id })
    })
  })
  return lista
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Pets Cadastrados</h1>
        <p class="text-gray-500 mt-1">Gerencie os pets dos associados</p>
      </div>
      <Button icon="pi pi-plus" label="Cadastrar Pet" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-pink-100">Total de Pets</p>
            <p class="text-3xl font-bold mt-1">{{ pets.length }}</p>
          </div>
          <i class="pi pi-heart-fill text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Cachorros</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ pets.filter(p => p.especie === 'Cachorro').length }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Gatos</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ pets.filter(p => p.especie === 'Gato').length }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="pets" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Nome" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <i class="pi pi-heart-fill text-pink-500"></i>
              </div>
              <span class="font-medium">{{ data.nome }}</span>
            </div>
          </template>
        </Column>
        <Column field="especie" header="Espécie" sortable />
        <Column field="raca" header="Raça" sortable />
        <Column field="titular" header="Titular" sortable />
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-id-card" rounded text severity="secondary" v-tooltip.top="'Carteirinha'" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

