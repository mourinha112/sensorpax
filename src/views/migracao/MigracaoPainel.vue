<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const activeStep = ref(0)

const tiposImportacao = ref([
  { label: 'Clientes', icon: 'pi-users', descricao: 'Importar base de clientes', formato: 'CSV, Excel' },
  { label: 'Contratos', icon: 'pi-file', descricao: 'Importar contratos existentes', formato: 'CSV, Excel' },
  { label: 'Carnês/Boletos', icon: 'pi-wallet', descricao: 'Importar carnês e boletos', formato: 'CSV, Excel' },
  { label: 'Dependentes', icon: 'pi-user-plus', descricao: 'Importar dependentes', formato: 'CSV, Excel' },
])

function iniciarImportacao(tipo) {
  toast.add({ severity: 'info', summary: 'Importação', detail: `Preparando importação de ${tipo.label}...`, life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Migração de Dados</h1>
      <p class="text-gray-500 mt-1">Importe dados de outros sistemas</p>
    </div>

    <div class="bg-blue-50 rounded-2xl p-6 border border-blue-200">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
          <i class="pi pi-info-circle text-white text-xl"></i>
        </div>
        <div>
          <h3 class="font-semibold text-blue-800">Suporte à Migração</h3>
          <p class="text-blue-600 mt-1">Nossa equipe oferece apoio completo no processo de migração. Entre em contato para agendar uma sessão de onboarding.</p>
          <Button label="Solicitar Suporte" class="mt-3" severity="info" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="tipo in tiposImportacao" :key="tipo.label" 
           @click="iniciarImportacao(tipo)"
           class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 hover:shadow-md transition-all">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <i :class="['pi', tipo.icon, 'text-primary-600 text-xl']"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ tipo.label }}</h3>
            <p class="text-sm text-gray-500">{{ tipo.descricao }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Formatos: {{ tipo.formato }}</span>
          <i class="pi pi-upload text-primary-500"></i>
        </div>
      </div>
    </div>

    <!-- Importações Recentes -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Importações Recentes</h2>
      <div class="text-center py-8 text-gray-500">
        <i class="pi pi-inbox text-4xl mb-2"></i>
        <p>Nenhuma importação realizada ainda</p>
      </div>
    </div>
  </div>
</template>

