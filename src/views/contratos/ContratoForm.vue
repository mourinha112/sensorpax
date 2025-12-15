<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useContratosStore } from '@/stores/contratos'
import { useClientesStore } from '@/stores/clientes'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const contratosStore = useContratosStore()
const clientesStore = useClientesStore()

const isEditing = computed(() => !!route.params.id)
const activeStep = ref(0)

const formData = ref({
  cliente_id: null,
  cliente_nome: '',
  plano: null,
  valor: 0,
  data_inicio: new Date(),
  dia_vencimento: 10,
  forma_pagamento: null,
  dependentes: 0,
  pets: 0,
  observacoes: '',
  assinatura_digital: true
})

const planos = ref([
  { label: 'Individual Básico', value: 'Individual Básico', preco: 69.90 },
  { label: 'Individual Plus', value: 'Individual Plus', preco: 99.90 },
  { label: 'Individual Premium', value: 'Individual Premium', preco: 129.90 },
  { label: 'Família Básico', value: 'Família Básico', preco: 149.90 },
  { label: 'Família Premium', value: 'Família Premium', preco: 189.90 },
  { label: 'Família VIP', value: 'Família VIP', preco: 249.90 }
])

const formasPagamento = ref([
  { label: 'Boleto Bancário', value: 'Boleto' },
  { label: 'Cartão de Crédito', value: 'Cartão de Crédito' },
  { label: 'PIX', value: 'PIX' },
  { label: 'Débito Automático', value: 'Débito Automático' }
])

const diasVencimento = ref([
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 }
])

const steps = ref([
  { label: 'Cliente' },
  { label: 'Plano' },
  { label: 'Pagamento' },
  { label: 'Revisão' }
])

const clientesOptions = computed(() => {
  return clientesStore.clientes.map(c => ({
    label: c.nome,
    value: c.id,
    cpf: c.cpf
  }))
})

function selectCliente(event) {
  const cliente = clientesStore.getClienteById(event.value)
  if (cliente) {
    formData.value.cliente_nome = cliente.nome
  }
}

function selectPlano(event) {
  const plano = planos.value.find(p => p.value === event.value)
  if (plano) {
    formData.value.valor = plano.preco
  }
}

function nextStep() {
  if (activeStep.value < steps.value.length - 1) {
    activeStep.value++
  }
}

function prevStep() {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function submitForm() {
  const contrato = {
    ...formData.value,
    status: 'ativo',
    data_inicio: formData.value.data_inicio.toISOString().split('T')[0],
    data_vencimento: new Date(formData.value.data_inicio.getTime() + 365 * 24 * 60 * 60 * 1000 * 2).toISOString().split('T')[0],
    data_assinatura: new Date().toISOString().split('T')[0]
  }

  if (isEditing.value) {
    contratosStore.updateContrato(parseInt(route.params.id), contrato)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contrato atualizado com sucesso', life: 3000 })
  } else {
    contratosStore.addContrato(contrato)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contrato criado com sucesso', life: 3000 })
  }

  router.push('/contratos')
}

onMounted(() => {
  if (isEditing.value) {
    const contrato = contratosStore.getContratoById(parseInt(route.params.id))
    if (contrato) {
      formData.value = {
        ...contrato,
        data_inicio: new Date(contrato.data_inicio)
      }
    }
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Button 
        icon="pi pi-arrow-left" 
        rounded 
        text 
        @click="router.back()"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Editar Contrato' : 'Novo Contrato' }}
        </h1>
        <p class="text-gray-500 mt-1">
          {{ isEditing ? 'Atualize as informações do contrato' : 'Preencha os dados para criar um novo contrato' }}
        </p>
      </div>
    </div>

    <!-- Steps -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <Steps :model="steps" :activeStep="activeStep" class="mb-8" />

      <!-- Step 1: Cliente -->
      <div v-show="activeStep === 0" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Selecione o Cliente</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Cliente *</label>
            <Dropdown 
              v-model="formData.cliente_id"
              :options="clientesOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione um cliente"
              filter
              class="w-full"
              @change="selectCliente"
            >
              <template #option="{ option }">
                <div class="flex flex-col">
                  <span class="font-medium">{{ option.label }}</span>
                  <span class="text-sm text-gray-500">{{ option.cpf }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>

        <div class="bg-gray-50 rounded-xl p-4" v-if="formData.cliente_id">
          <div class="flex items-center gap-3">
            <Avatar 
              :label="formData.cliente_nome.charAt(0)" 
              size="large"
              shape="circle"
              class="bg-primary-100 text-primary-700"
            />
            <div>
              <p class="font-semibold text-gray-900">{{ formData.cliente_nome }}</p>
              <p class="text-sm text-gray-500">Cliente selecionado</p>
            </div>
          </div>
        </div>

        <Divider />

        <div class="flex justify-between">
          <Button label="Cancelar" text @click="router.back()" />
          <Button 
            label="Próximo" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            :disabled="!formData.cliente_id"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 2: Plano -->
      <div v-show="activeStep === 1" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Escolha o Plano</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="plano in planos" 
            :key="plano.value"
            @click="formData.plano = plano.value; formData.valor = plano.preco"
            :class="[
              'p-4 rounded-xl border-2 cursor-pointer transition-all',
              formData.plano === plano.value 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-300'
            ]"
          >
            <div class="text-center">
              <i 
                :class="[
                  'pi text-2xl mb-2',
                  plano.value.includes('Família') ? 'pi-users' : 'pi-user',
                  formData.plano === plano.value ? 'text-primary-600' : 'text-gray-400'
                ]"
              ></i>
              <h3 class="font-semibold text-gray-900">{{ plano.label }}</h3>
              <p class="text-2xl font-bold text-primary-600 mt-2">{{ formatCurrency(plano.preco) }}</p>
              <p class="text-sm text-gray-500">/mês</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Dependentes</label>
            <InputNumber 
              v-model="formData.dependentes" 
              :min="0" 
              :max="10"
              showButtons
              class="w-full"
            />
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Pets</label>
            <InputNumber 
              v-model="formData.pets" 
              :min="0" 
              :max="5"
              showButtons
              class="w-full"
            />
          </div>
        </div>

        <Divider />

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button 
            label="Próximo" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            :disabled="!formData.plano"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 3: Pagamento -->
      <div v-show="activeStep === 2" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Forma de Pagamento</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento *</label>
            <Dropdown 
              v-model="formData.forma_pagamento"
              :options="formasPagamento"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione"
              class="w-full"
            />
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Dia de Vencimento *</label>
            <Dropdown 
              v-model="formData.dia_vencimento"
              :options="diasVencimento"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
            <Calendar 
              v-model="formData.data_inicio" 
              dateFormat="dd/mm/yy"
              showIcon
              class="w-full"
            />
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor Mensal</label>
            <InputNumber 
              v-model="formData.valor" 
              mode="currency" 
              currency="BRL" 
              locale="pt-BR"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <InputSwitch v-model="formData.assinatura_digital" />
          <div>
            <p class="font-medium text-gray-900">Assinatura Digital</p>
            <p class="text-sm text-gray-500">O cliente assinará o contrato digitalmente</p>
          </div>
        </div>

        <Divider />

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button 
            label="Próximo" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            :disabled="!formData.forma_pagamento"
            @click="nextStep"
          />
        </div>
      </div>

      <!-- Step 4: Revisão -->
      <div v-show="activeStep === 3" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Revisão do Contrato</h2>

        <div class="bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-primary-100">Valor Mensal</p>
              <p class="text-3xl font-bold mt-1">{{ formatCurrency(formData.valor) }}</p>
            </div>
            <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <i class="pi pi-file text-3xl"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
              <i class="pi pi-user text-primary-500"></i> Cliente
            </h3>
            <div class="bg-gray-50 rounded-xl p-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Nome</span>
                <span class="font-medium">{{ formData.cliente_nome }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Dependentes</span>
                <span class="font-medium">{{ formData.dependentes }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Pets</span>
                <span class="font-medium">{{ formData.pets }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
              <i class="pi pi-credit-card text-primary-500"></i> Pagamento
            </h3>
            <div class="bg-gray-50 rounded-xl p-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Plano</span>
                <span class="font-medium">{{ formData.plano }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Forma</span>
                <span class="font-medium">{{ formData.forma_pagamento }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Vencimento</span>
                <span class="font-medium">Dia {{ formData.dia_vencimento }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
          <Textarea 
            v-model="formData.observacoes" 
            rows="3"
            placeholder="Observações sobre o contrato..."
            class="w-full"
          />
        </div>

        <Divider />

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button 
            :label="isEditing ? 'Atualizar Contrato' : 'Criar Contrato'" 
            icon="pi pi-check" 
            @click="submitForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

