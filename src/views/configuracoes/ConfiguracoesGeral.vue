<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useToast } from 'primevue/usetoast'

const appStore = useAppStore()
const toast = useToast()

const empresa = ref({ ...appStore.empresa })

function salvar() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Configurações salvas', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Configurações</h1>
      <p class="text-gray-500 mt-1">Personalize o sistema</p>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">Dados da Empresa</h2>
      
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center">
          <i class="pi pi-building text-4xl text-gray-400"></i>
        </div>
        <div>
          <Button label="Alterar Logo" outlined size="small" />
          <p class="text-sm text-gray-500 mt-2">PNG ou JPG, máximo 2MB</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
          <InputText v-model="empresa.nome" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
          <InputMask v-model="empresa.cnpj" mask="99.999.999/9999-99" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
          <InputMask v-model="empresa.telefone" mask="(99) 99999-9999" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <InputText v-model="empresa.email" type="email" class="w-full" />
        </div>
      </div>

      <Divider />

      <h2 class="text-lg font-semibold text-gray-900">Personalização</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cor Principal</label>
          <div class="flex gap-2">
            <InputText v-model="empresa.cor_primaria" class="w-full" />
            <div :style="{ backgroundColor: empresa.cor_primaria }" class="w-12 h-10 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button label="Salvar Alterações" icon="pi pi-check" @click="salvar" />
      </div>
    </div>
  </div>
</template>

