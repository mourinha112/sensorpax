<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClientesStore } from '@/stores/clientes'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const clientesStore = useClientesStore()

const isEditing = ref(false)
const formData = ref({
  nome: '',
  cpf: '',
  rg: '',
  data_nascimento: null,
  telefone: '',
  email: '',
  endereco: {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  },
  plano: null,
  valor_mensalidade: 0,
  status: 'ativo',
  dependentes: [],
  pets: []
})

const estados = ref([
  { label: 'São Paulo', value: 'SP' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Paraná', value: 'PR' }
])

const planos = ref([
  { label: 'Individual Básico', value: 'Individual Básico', preco: 69.90 },
  { label: 'Individual Plus', value: 'Individual Plus', preco: 99.90 },
  { label: 'Individual Premium', value: 'Individual Premium', preco: 129.90 },
  { label: 'Família Básico', value: 'Família Básico', preco: 149.90 },
  { label: 'Família Premium', value: 'Família Premium', preco: 189.90 }
])

function selectPlano(event) {
  const plano = planos.value.find(p => p.value === event.value)
  if (plano) formData.value.valor_mensalidade = plano.preco
}

async function buscarCep() {
  if (formData.value.endereco.cep.length === 9) {
    toast.add({ severity: 'info', summary: 'Buscando', detail: 'Consultando CEP...', life: 2000 })
    // Simulação
    setTimeout(() => {
      formData.value.endereco.logradouro = 'Rua Exemplo'
      formData.value.endereco.bairro = 'Centro'
      formData.value.endereco.cidade = 'São Paulo'
      formData.value.endereco.estado = 'SP'
    }, 500)
  }
}

function submitForm() {
  if (isEditing.value) {
    clientesStore.updateCliente(parseInt(route.params.id), formData.value)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado', life: 3000 })
  } else {
    clientesStore.addCliente({ ...formData.value, data_adesao: new Date().toISOString().split('T')[0] })
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente cadastrado', life: 3000 })
  }
  router.push('/clientes')
}

onMounted(() => {
  if (route.params.id) {
    isEditing.value = true
    const cliente = clientesStore.getClienteById(parseInt(route.params.id))
    if (cliente) {
      formData.value = { ...cliente, data_nascimento: new Date(cliente.data_nascimento) }
    }
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ isEditing ? 'Editar Cliente' : 'Novo Cliente' }}</h1>
        <p class="text-gray-500 mt-1">Preencha os dados do cliente</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <!-- Dados Pessoais -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-user text-primary-500"></i> Dados Pessoais
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <InputText v-model="formData.nome" class="w-full" placeholder="Nome completo" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
            <InputMask v-model="formData.cpf" mask="999.999.999-99" class="w-full" placeholder="000.000.000-00" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">RG</label>
            <InputText v-model="formData.rg" class="w-full" placeholder="RG" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
            <Calendar v-model="formData.data_nascimento" dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
            <InputMask v-model="formData.telefone" mask="(99) 99999-9999" class="w-full" placeholder="(00) 00000-0000" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <InputText v-model="formData.email" type="email" class="w-full" placeholder="email@exemplo.com" />
          </div>
        </div>
      </div>

      <Divider />

      <!-- Endereço -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-map-marker text-primary-500"></i> Endereço
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
            <InputMask v-model="formData.endereco.cep" mask="99999-999" class="w-full" @complete="buscarCep" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Logradouro</label>
            <InputText v-model="formData.endereco.logradouro" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Número</label>
            <InputText v-model="formData.endereco.numero" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
            <InputText v-model="formData.endereco.complemento" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
            <InputText v-model="formData.endereco.bairro" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <InputText v-model="formData.endereco.cidade" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <Dropdown v-model="formData.endereco.estado" :options="estados" optionLabel="label" optionValue="value" class="w-full" />
          </div>
        </div>
      </div>

      <Divider />

      <!-- Plano -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i class="pi pi-box text-primary-500"></i> Plano
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Plano</label>
            <Dropdown v-model="formData.plano" :options="planos" optionLabel="label" optionValue="value" class="w-full" @change="selectPlano" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor Mensalidade</label>
            <InputNumber v-model="formData.valor_mensalidade" mode="currency" currency="BRL" locale="pt-BR" class="w-full" />
          </div>
        </div>
      </div>

      <Divider />

      <div class="flex justify-end gap-3">
        <Button label="Cancelar" text @click="router.back()" />
        <Button :label="isEditing ? 'Atualizar' : 'Cadastrar'" icon="pi pi-check" @click="submitForm" />
      </div>
    </div>
  </div>
</template>

