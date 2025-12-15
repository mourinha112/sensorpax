<script setup>
import { ref, nextTick } from 'vue'

const mensagens = ref([
  { id: 1, tipo: 'assistente', texto: 'Olá! Sou o assistente IA do SensorPax. Como posso ajudar você hoje?', hora: '10:00' },
])

const novaMensagem = ref('')
const carregando = ref(false)
const chatContainer = ref(null)

const sugestoes = [
  'Gerar relatório de inadimplência',
  'Analisar perfil de cliente',
  'Sugerir plano para novo cliente',
  'Criar campanha de cobrança',
  'Resumo financeiro do mês'
]

async function enviarMensagem() {
  if (!novaMensagem.value.trim()) return

  const mensagemUsuario = {
    id: mensagens.value.length + 1,
    tipo: 'usuario',
    texto: novaMensagem.value,
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }
  mensagens.value.push(mensagemUsuario)
  const pergunta = novaMensagem.value
  novaMensagem.value = ''
  carregando.value = true

  await nextTick()
  scrollToBottom()

  // Simula resposta da IA
  setTimeout(() => {
    let resposta = ''
    if (pergunta.toLowerCase().includes('inadimpl')) {
      resposta = '📊 **Análise de Inadimplência:**\n\nAtualmente você tem 2 clientes inadimplentes, totalizando R$ 829,50 em atraso.\n\n**Recomendações:**\n1. Enviar cobrança via WhatsApp imediatamente\n2. Oferecer acordo com 10% de desconto\n3. Considerar bloqueio de benefícios após 60 dias'
    } else if (pergunta.toLowerCase().includes('relatório') || pergunta.toLowerCase().includes('relatorio')) {
      resposta = '📈 Posso gerar os seguintes relatórios:\n\n1. **Financeiro** - Receitas, despesas e saldo\n2. **Comercial** - Vendas e conversões\n3. **Inadimplência** - Clientes em atraso\n4. **Operacional** - Ocorrências e atendimentos\n\nQual relatório deseja gerar?'
    } else if (pergunta.toLowerCase().includes('plano')) {
      resposta = '🎯 Para sugerir o melhor plano, preciso saber:\n\n1. Quantas pessoas na família?\n2. Deseja incluir pet?\n3. Qual a faixa de renda?\n4. Região de residência?\n\nCom essas informações, posso recomendar o plano ideal!'
    } else {
      resposta = 'Entendi sua solicitação! Posso ajudar com:\n\n• Análise de dados e relatórios\n• Sugestões de planos para clientes\n• Estratégias de cobrança\n• Criação de campanhas automáticas\n• Geração de contratos\n\nO que você gostaria de fazer?'
    }

    mensagens.value.push({
      id: mensagens.value.length + 1,
      tipo: 'assistente',
      texto: resposta,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    })
    carregando.value = false
    nextTick(() => scrollToBottom())
  }, 1500)
}

function usarSugestao(sugestao) {
  novaMensagem.value = sugestao
  enviarMensagem()
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">IA Assistente</h1>
        <p class="text-gray-500 mt-1">Seu assistente inteligente para gestão</p>
      </div>
    </div>

    <div class="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
      <!-- Chat Messages -->
      <div ref="chatContainer" class="flex-1 p-6 overflow-y-auto space-y-4">
        <div v-for="msg in mensagens" :key="msg.id" 
             :class="['flex', msg.tipo === 'usuario' ? 'justify-end' : 'justify-start']">
          <div :class="[
            'max-w-2xl rounded-2xl p-4',
            msg.tipo === 'usuario' 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 text-gray-800'
          ]">
            <div v-if="msg.tipo === 'assistente'" class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                <i class="pi pi-microchip-ai text-white text-xs"></i>
              </div>
              <span class="text-sm font-medium text-primary-600">SensorPax IA</span>
            </div>
            <p class="whitespace-pre-line">{{ msg.texto }}</p>
            <p :class="['text-xs mt-2', msg.tipo === 'usuario' ? 'text-primary-200' : 'text-gray-400']">
              {{ msg.hora }}
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="carregando" class="flex justify-start">
          <div class="bg-gray-100 rounded-2xl p-4">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                <i class="pi pi-microchip-ai text-white text-xs"></i>
              </div>
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sugestões -->
      <div class="px-6 py-3 border-t border-gray-100">
        <p class="text-xs text-gray-500 mb-2">Sugestões:</p>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="sugestao in sugestoes" 
            :key="sugestao"
            @click="usarSugestao(sugestao)"
            class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-full text-sm transition-colors"
          >
            {{ sugestao }}
          </button>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex gap-3">
          <InputText 
            v-model="novaMensagem" 
            placeholder="Digite sua pergunta..." 
            class="flex-1"
            @keyup.enter="enviarMensagem"
          />
          <Button 
            icon="pi pi-send" 
            :disabled="!novaMensagem.trim() || carregando"
            @click="enviarMensagem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

