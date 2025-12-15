<script setup>
import { ref } from 'vue'

const usuarios = ref([
  { id: 1, nome: 'Administrador', email: 'admin@sensorpax.com.br', perfil: 'Administrador', status: 'ativo', ultimo_acesso: '2024-12-10' },
  { id: 2, nome: 'Carlos Silva', email: 'carlos@empresa.com.br', perfil: 'Vendedor', status: 'ativo', ultimo_acesso: '2024-12-10' },
  { id: 3, nome: 'Ana Santos', email: 'ana@empresa.com.br', perfil: 'Atendente', status: 'ativo', ultimo_acesso: '2024-12-09' },
  { id: 4, nome: 'Pedro Lima', email: 'pedro@empresa.com.br', perfil: 'Financeiro', status: 'inativo', ultimo_acesso: '2024-11-15' },
])

const showDialog = ref(false)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Usuários</h1>
        <p class="text-gray-500 mt-1">Gerencie os usuários do sistema</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Usuário" @click="showDialog = true" />
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="usuarios" responsiveLayout="scroll" class="p-datatable-sm" stripedRows>
        <Column field="nome" header="Usuário" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar :label="data.nome.charAt(0)" shape="circle" class="bg-primary-100 text-primary-700" />
              <div>
                <p class="font-medium">{{ data.nome }}</p>
                <p class="text-sm text-gray-500">{{ data.email }}</p>
              </div>
            </div>
          </template>
        </Column>
        <Column field="perfil" header="Perfil">
          <template #body="{ data }">
            <Chip :label="data.perfil" class="bg-gray-100" />
          </template>
        </Column>
        <Column field="ultimo_acesso" header="Último Acesso">
          <template #body="{ data }">
            {{ new Date(data.ultimo_acesso).toLocaleDateString('pt-BR') }}
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

    <Dialog v-model:visible="showDialog" header="Novo Usuário" :style="{ width: '500px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
          <InputText class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <InputText type="email" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Perfil</label>
          <Dropdown :options="['Administrador', 'Vendedor', 'Atendente', 'Financeiro']" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
          <Password class="w-full" toggleMask />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Criar Usuário" icon="pi pi-check" />
      </template>
    </Dialog>
  </div>
</template>

