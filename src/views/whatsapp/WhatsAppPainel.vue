<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const conectado = ref(true)
const mensagensEnviadas = ref(1245)
const taxaEntrega = ref(98.5)

function desconectar() {
  conectado.value = false
  toast.add({ severity: 'warn', summary: 'Desconectado', detail: 'WhatsApp desconectado', life: 3000 })
}

function reconectar() {
  toast.add({ severity: 'info', summary: 'Conectando', detail: 'Escaneie o QR Code...', life: 3000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">WhatsApp</h1>
        <p class="text-gray-500 mt-1">Automação e comunicação</p>
      </div>
    </div>

    <!-- Status da Conexão -->
    <div :class="['rounded-2xl p-6', conectado ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200']">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center', conectado ? 'bg-emerald-500' : 'bg-red-500']">
            <i class="pi pi-whatsapp text-white text-2xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold" :class="conectado ? 'text-emerald-800' : 'text-red-800'">
              {{ conectado ? 'WhatsApp Conectado' : 'WhatsApp Desconectado' }}
            </h3>
            <p :class="conectado ? 'text-emerald-600' : 'text-red-600'">
              {{ conectado ? 'Pronto para enviar mensagens' : 'Clique para reconectar' }}
            </p>
          </div>
        </div>
        <Button v-if="conectado" label="Desconectar" severity="danger" outlined @click="desconectar" />
        <Button v-else label="Reconectar" severity="success" @click="reconectar" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Mensagens (mês)</p>
        <p class="text-2xl font-bold text-gray-900">{{ mensagensEnviadas }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Taxa de Entrega</p>
        <p class="text-2xl font-bold text-emerald-600">{{ taxaEntrega }}%</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Campanhas Ativas</p>
        <p class="text-2xl font-bold text-gray-900">5</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Conversas Hoje</p>
        <p class="text-2xl font-bold text-gray-900">23</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div @click="router.push('/campanhas')" class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <i class="pi pi-megaphone text-violet-600 text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Campanhas</h3>
            <p class="text-sm text-gray-500">Envios em massa</p>
          </div>
        </div>
      </div>
      
      <div @click="router.push('/chatbot')" class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <i class="pi pi-comments text-blue-600 text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Chatbot IA</h3>
            <p class="text-sm text-gray-500">Atendimento automático</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-cog text-emerald-600 text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Configurações</h3>
            <p class="text-sm text-gray-500">Templates e fluxos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Templates Automáticos -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Templates Automáticos</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-check-circle text-emerald-500"></i>
            <div>
              <p class="font-medium">Boas-vindas</p>
              <p class="text-sm text-gray-500">Enviado ao cadastrar novo cliente</p>
            </div>
          </div>
          <InputSwitch :modelValue="true" />
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-check-circle text-emerald-500"></i>
            <div>
              <p class="font-medium">Lembrete de Vencimento</p>
              <p class="text-sm text-gray-500">3 dias antes do vencimento</p>
            </div>
          </div>
          <InputSwitch :modelValue="true" />
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-check-circle text-emerald-500"></i>
            <div>
              <p class="font-medium">Cobrança</p>
              <p class="text-sm text-gray-500">Boletos vencidos</p>
            </div>
          </div>
          <InputSwitch :modelValue="true" />
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-check-circle text-emerald-500"></i>
            <div>
              <p class="font-medium">Aniversariantes</p>
              <p class="text-sm text-gray-500">Felicitações automáticas</p>
            </div>
          </div>
          <InputSwitch :modelValue="true" />
        </div>
      </div>
    </div>
  </div>
</template>

