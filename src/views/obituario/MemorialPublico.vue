<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const toast = useToast()

const memorial = ref({
  id: 1,
  nome: 'Maria José Souza',
  nascimento: '1940-03-15',
  falecimento: '2024-12-07',
  biografia: 'Uma pessoa querida, amada por todos que tiveram o privilégio de conhecê-la. Mãe dedicada, avó carinhosa e amiga de todos. Sua memória viverá eternamente em nossos corações.',
  foto: null,
  velas: 45,
  flores: 18,
  mensagens: [
    { id: 1, autor: 'João Silva', texto: 'Descanse em paz, tia Maria. Muita saudade.', data: '2024-12-08' },
    { id: 2, autor: 'Ana Santos', texto: 'Uma pessoa maravilhosa. Sentiremos sua falta.', data: '2024-12-08' },
    { id: 3, autor: 'Pedro Lima', texto: 'Meus sentimentos à família. Ela foi uma pessoa muito especial.', data: '2024-12-07' },
  ]
})

const novaMensagem = ref({ autor: '', texto: '' })
const showMensagemDialog = ref(false)

function acenderVela() {
  memorial.value.velas++
  toast.add({ severity: 'success', summary: '🕯️ Vela acesa', detail: 'Sua homenagem foi registrada', life: 3000 })
}

function enviarFlor() {
  memorial.value.flores++
  toast.add({ severity: 'success', summary: '🌹 Flor enviada', detail: 'Sua homenagem foi registrada', life: 3000 })
}

function enviarMensagem() {
  memorial.value.mensagens.unshift({
    id: memorial.value.mensagens.length + 1,
    autor: novaMensagem.value.autor,
    texto: novaMensagem.value.texto,
    data: new Date().toISOString().split('T')[0]
  })
  showMensagemDialog.value = false
  novaMensagem.value = { autor: '', texto: '' }
  toast.add({ severity: 'success', summary: 'Mensagem enviada', detail: 'Sua condolência foi registrada', life: 3000 })
}

function compartilhar() {
  navigator.share?.({
    title: `Memorial de ${memorial.value.nome}`,
    url: window.location.href
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
    <!-- Header com foto -->
    <div class="relative h-80 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="relative text-center text-white z-10">
        <div class="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/50">
          <i v-if="!memorial.foto" class="pi pi-heart text-5xl"></i>
          <img v-else :src="memorial.foto" class="w-full h-full object-cover rounded-full" />
        </div>
        <h1 class="text-4xl font-bold">{{ memorial.nome }}</h1>
        <p class="text-xl text-white/80 mt-2">
          {{ new Date(memorial.nascimento).toLocaleDateString('pt-BR') }} - {{ new Date(memorial.falecimento).toLocaleDateString('pt-BR') }}
        </p>
      </div>
    </div>

    <!-- Ações de homenagem -->
    <div class="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
      <div class="bg-white rounded-2xl shadow-xl p-6">
        <div class="flex justify-center gap-4">
          <button @click="acenderVela" class="flex flex-col items-center p-4 rounded-xl hover:bg-amber-50 transition-colors">
            <div class="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <span class="text-3xl">🕯️</span>
            </div>
            <span class="font-medium text-gray-700">Acender Vela</span>
            <span class="text-sm text-gray-500">{{ memorial.velas }} velas</span>
          </button>
          
          <button @click="enviarFlor" class="flex flex-col items-center p-4 rounded-xl hover:bg-pink-50 transition-colors">
            <div class="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-2">
              <span class="text-3xl">🌹</span>
            </div>
            <span class="font-medium text-gray-700">Enviar Flor</span>
            <span class="text-sm text-gray-500">{{ memorial.flores }} flores</span>
          </button>
          
          <button @click="showMensagemDialog = true" class="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors">
            <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <span class="text-3xl">💬</span>
            </div>
            <span class="font-medium text-gray-700">Deixar Mensagem</span>
            <span class="text-sm text-gray-500">{{ memorial.mensagens.length }} mensagens</span>
          </button>
          
          <button @click="compartilhar" class="flex flex-col items-center p-4 rounded-xl hover:bg-green-50 transition-colors">
            <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <span class="text-3xl">📤</span>
            </div>
            <span class="font-medium text-gray-700">Compartilhar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Biografia -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl p-6 shadow-lg">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Em Memória</h2>
        <p class="text-gray-600 leading-relaxed">{{ memorial.biografia }}</p>
      </div>
    </div>

    <!-- Mensagens -->
    <div class="max-w-4xl mx-auto px-4 pb-12">
      <div class="bg-white rounded-2xl p-6 shadow-lg">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Mensagens de Condolências</h2>
        <div class="space-y-4">
          <div v-for="msg in memorial.mensagens" :key="msg.id" class="p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-gray-900">{{ msg.autor }}</span>
              <span class="text-sm text-gray-500">{{ new Date(msg.data).toLocaleDateString('pt-BR') }}</span>
            </div>
            <p class="text-gray-600">{{ msg.texto }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center py-8 text-white/60">
      <p>Memorial criado por <span class="font-semibold text-white">SensorPax</span></p>
    </div>

    <!-- Dialog Mensagem -->
    <Dialog v-model:visible="showMensagemDialog" header="Deixar Mensagem" :style="{ width: '450px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Seu Nome</label>
          <InputText v-model="novaMensagem.autor" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sua Mensagem</label>
          <Textarea v-model="novaMensagem.texto" rows="4" class="w-full" placeholder="Escreva sua mensagem de condolências..." />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showMensagemDialog = false" />
        <Button label="Enviar" icon="pi pi-send" @click="enviarMensagem" :disabled="!novaMensagem.autor || !novaMensagem.texto" />
      </template>
    </Dialog>
  </div>
</template>

