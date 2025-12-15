<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const pastas = ref([
  { id: 1, nome: 'Contratos', arquivos: 45, tamanho: '125 MB', icone: 'pi-file' },
  { id: 2, nome: 'Documentos de Clientes', arquivos: 128, tamanho: '340 MB', icone: 'pi-users' },
  { id: 3, nome: 'Certidões de Óbito', arquivos: 87, tamanho: '95 MB', icone: 'pi-file-pdf' },
  { id: 4, nome: 'Notas Fiscais', arquivos: 230, tamanho: '180 MB', icone: 'pi-receipt' },
])

const arquivosRecentes = ref([
  { id: 1, nome: 'Contrato_CTR-2024-0001.pdf', pasta: 'Contratos', tamanho: '245 KB', data: '2024-12-10' },
  { id: 2, nome: 'RG_João_Silva.pdf', pasta: 'Documentos de Clientes', tamanho: '1.2 MB', data: '2024-12-09' },
  { id: 3, nome: 'Certidao_Maria_Souza.pdf', pasta: 'Certidões de Óbito', tamanho: '890 KB', data: '2024-12-08' },
])

function upload() {
  toast.add({ severity: 'info', summary: 'Upload', detail: 'Selecione os arquivos...', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Documentos</h1>
        <p class="text-gray-500 mt-1">Gestão de arquivos e mídias</p>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-folder-plus" label="Nova Pasta" outlined />
        <Button icon="pi pi-upload" label="Upload" @click="upload" />
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Total de Arquivos</p>
        <p class="text-2xl font-bold text-gray-900">490</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Espaço Usado</p>
        <p class="text-2xl font-bold text-gray-900">740 MB</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Pastas</p>
        <p class="text-2xl font-bold text-gray-900">{{ pastas.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Limite</p>
        <p class="text-2xl font-bold text-gray-900">Ilimitado</p>
      </div>
    </div>

    <!-- Pastas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="pasta in pastas" :key="pasta.id" 
           class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 hover:shadow-md transition-all">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <i class="pi pi-folder text-amber-600 text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ pasta.nome }}</h3>
            <p class="text-sm text-gray-500">{{ pasta.arquivos }} arquivos</p>
          </div>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>{{ pasta.tamanho }}</span>
          <i class="pi pi-ellipsis-h cursor-pointer"></i>
        </div>
      </div>
    </div>

    <!-- Arquivos Recentes -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Arquivos Recentes</h2>
      </div>
      <DataTable :value="arquivosRecentes" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Arquivo">
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <i class="pi pi-file-pdf text-red-600"></i>
              </div>
              <span class="font-medium">{{ data.nome }}</span>
            </div>
          </template>
        </Column>
        <Column field="pasta" header="Pasta" />
        <Column field="tamanho" header="Tamanho" />
        <Column field="data" header="Data">
          <template #body="{ data }">
            {{ new Date(data.data).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column header="Ações" style="width: 100px">
          <template #body>
            <Button icon="pi pi-download" rounded text severity="secondary" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

