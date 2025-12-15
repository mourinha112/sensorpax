<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOcorrenciasStore } from '@/stores/ocorrencias'
import { useClientesStore } from '@/stores/clientes'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const ocorrenciasStore = useOcorrenciasStore()
const clientesStore = useClientesStore()

const activeStep = ref(0)
const steps = ref([{ label: 'Falecido' }, { label: 'Velório' }, { label: 'Sepultamento' }, { label: 'Revisão' }])

const formData = ref({
  falecido: '',
  data_falecimento: new Date(),
  hora_falecimento: '',
  local_falecimento: '',
  causa: null,
  cliente_id: null,
  responsavel: '',
  parentesco: '',
  velorio: { local: null, inicio: null, fim: null },
  sepultamento: { cemiterio: null, jazigo: '', data: null, hora: '' },
  observacoes: ''
})

const causas = ref([
  { label: 'Natural', value: 'Natural' },
  { label: 'Acidental', value: 'Acidental' },
  { label: 'Outros', value: 'Outros' }
])

const salasVelorio = ref([
  { label: 'Sala 1 - Central', value: 'Sala 1 - Central' },
  { label: 'Sala 2 - Norte', value: 'Sala 2 - Norte' },
  { label: 'Sala 3 - Sul', value: 'Sala 3 - Sul' }
])

const cemiterios = ref([
  { label: 'Cemitério da Paz', value: 'Cemitério da Paz' },
  { label: 'Cemitério Municipal', value: 'Cemitério Municipal' },
  { label: 'Memorial Garden', value: 'Memorial Garden' }
])

function nextStep() { if (activeStep.value < steps.value.length - 1) activeStep.value++ }
function prevStep() { if (activeStep.value > 0) activeStep.value-- }

function submitForm() {
  const ocorrencia = {
    ...formData.value,
    data_falecimento: formData.value.data_falecimento.toISOString().split('T')[0],
    status: 'em_andamento',
    checklist: [
      { item: 'Documentação coletada', concluido: false },
      { item: 'Certidão de óbito emitida', concluido: false },
      { item: 'Corpo preparado', concluido: false },
      { item: 'Urna selecionada', concluido: false },
      { item: 'Flores encomendadas', concluido: false },
      { item: 'Velório preparado', concluido: false },
      { item: 'Transporte agendado', concluido: false }
    ],
    materiais: []
  }
  ocorrenciasStore.addOcorrencia(ocorrencia)
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Ocorrência criada com sucesso', life: 3000 })
  router.push('/ocorrencias')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Nova Ocorrência</h1>
        <p class="text-gray-500 mt-1">Registre uma nova ocorrência funerária</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <Steps :model="steps" :activeStep="activeStep" class="mb-8" />

      <!-- Step 1: Falecido -->
      <div v-show="activeStep === 0" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Dados do Falecido</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Falecido *</label>
            <InputText v-model="formData.falecido" class="w-full" placeholder="Nome completo" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data do Falecimento *</label>
            <Calendar v-model="formData.data_falecimento" dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hora</label>
            <InputMask v-model="formData.hora_falecimento" mask="99:99" class="w-full" placeholder="00:00" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Local do Falecimento</label>
            <InputText v-model="formData.local_falecimento" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Causa</label>
            <Dropdown v-model="formData.causa" :options="causas" optionLabel="label" optionValue="value" class="w-full" />
          </div>
        </div>

        <Divider />

        <h2 class="text-lg font-semibold text-gray-900">Responsável</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cliente Associado</label>
            <Dropdown v-model="formData.cliente_id" :options="clientesStore.clientes" optionLabel="nome" optionValue="id" filter class="w-full" placeholder="Selecione" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável *</label>
            <InputText v-model="formData.responsavel" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Parentesco</label>
            <InputText v-model="formData.parentesco" class="w-full" placeholder="Ex: Filho, Cônjuge" />
          </div>
        </div>

        <div class="flex justify-end">
          <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="nextStep" :disabled="!formData.falecido" />
        </div>
      </div>

      <!-- Step 2: Velório -->
      <div v-show="activeStep === 1" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Dados do Velório</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Sala de Velório</label>
            <Dropdown v-model="formData.velorio.local" :options="salasVelorio" optionLabel="label" optionValue="value" class="w-full" placeholder="Selecione" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Início do Velório</label>
            <Calendar v-model="formData.velorio.inicio" showTime hourFormat="24" dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Término do Velório</label>
            <Calendar v-model="formData.velorio.fim" showTime hourFormat="24" dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
        </div>

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="nextStep" />
        </div>
      </div>

      <!-- Step 3: Sepultamento -->
      <div v-show="activeStep === 2" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Dados do Sepultamento</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cemitério</label>
            <Dropdown v-model="formData.sepultamento.cemiterio" :options="cemiterios" optionLabel="label" optionValue="value" class="w-full" placeholder="Selecione" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jazigo</label>
            <InputText v-model="formData.sepultamento.jazigo" class="w-full" placeholder="Ex: Quadra A - Lote 15" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Data do Sepultamento</label>
            <Calendar v-model="formData.sepultamento.data" dateFormat="dd/mm/yy" showIcon class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hora</label>
            <InputMask v-model="formData.sepultamento.hora" mask="99:99" class="w-full" placeholder="00:00" />
          </div>
        </div>

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="nextStep" />
        </div>
      </div>

      <!-- Step 4: Revisão -->
      <div v-show="activeStep === 3" class="space-y-6 fade-in">
        <h2 class="text-lg font-semibold text-gray-900">Revisão</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Falecido</h3>
            <p class="font-medium">{{ formData.falecido }}</p>
            <p class="text-sm text-gray-500">{{ formData.data_falecimento?.toLocaleDateString('pt-BR') }} - {{ formData.hora_falecimento }}</p>
            <p class="text-sm text-gray-500">{{ formData.local_falecimento }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Responsável</h3>
            <p class="font-medium">{{ formData.responsavel }}</p>
            <p class="text-sm text-gray-500">{{ formData.parentesco }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Velório</h3>
            <p class="font-medium">{{ formData.velorio.local || 'Não definido' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Sepultamento</h3>
            <p class="font-medium">{{ formData.sepultamento.cemiterio || 'Não definido' }}</p>
            <p class="text-sm text-gray-500">{{ formData.sepultamento.jazigo }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
          <Textarea v-model="formData.observacoes" rows="3" class="w-full" />
        </div>

        <div class="flex justify-between">
          <Button label="Voltar" text icon="pi pi-arrow-left" @click="prevStep" />
          <Button label="Criar Ocorrência" icon="pi pi-check" @click="submitForm" />
        </div>
      </div>
    </div>
  </div>
</template>

