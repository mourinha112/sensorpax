<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const twoFactor = ref(true)
const backupAutomatico = ref(true)
const logs = ref(true)

const acessosRecentes = ref([
  { id: 1, usuario: 'Administrador', ip: '192.168.1.100', data: '2024-12-10 14:30', acao: 'Login' },
  { id: 2, usuario: 'Carlos Silva', ip: '192.168.1.105', data: '2024-12-10 14:15', acao: 'Login' },
  { id: 3, usuario: 'Ana Santos', ip: '192.168.1.110', data: '2024-12-10 09:00', acao: 'Login' },
])

function salvar() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Configurações de segurança atualizadas', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Segurança</h1>
      <p class="text-gray-500 mt-1">Configurações de segurança do sistema</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Configurações</h2>
        
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-shield text-primary-500"></i>
            <div>
              <p class="font-medium">Autenticação 2FA</p>
              <p class="text-sm text-gray-500">Para administradores</p>
            </div>
          </div>
          <InputSwitch v-model="twoFactor" />
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-cloud text-primary-500"></i>
            <div>
              <p class="font-medium">Backup Automático</p>
              <p class="text-sm text-gray-500">Diário às 03:00</p>
            </div>
          </div>
          <InputSwitch v-model="backupAutomatico" />
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-list text-primary-500"></i>
            <div>
              <p class="font-medium">Logs de Atividade</p>
              <p class="text-sm text-gray-500">Registrar todas as ações</p>
            </div>
          </div>
          <InputSwitch v-model="logs" />
        </div>

        <Button label="Salvar" icon="pi pi-check" class="w-full" @click="salvar" />
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Acessos Recentes</h2>
        <div class="space-y-3">
          <div v-for="acesso in acessosRecentes" :key="acesso.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p class="font-medium">{{ acesso.usuario }}</p>
              <p class="text-sm text-gray-500">{{ acesso.ip }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm">{{ acesso.data }}</p>
              <Tag :value="acesso.acao" severity="info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

