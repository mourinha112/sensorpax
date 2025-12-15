<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const formData = ref({
  nome: '',
  nascimento: null,
  falecimento: null,
  biografia: '',
  foto: null,
  video_url: '',
  permitir_velas: true,
  permitir_flores: true,
  permitir_mensagens: true,
  publico: true
})

function submitForm() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Memorial criado com sucesso', life: 3000 })
  router.push('/obituario')
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Criar Memorial</h1>
        <p class="text-gray-500 mt-1">Crie uma homenagem digital</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
      <!-- Foto -->
      <div class="flex justify-center">
        <div class="relative">
          <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <i v-if="!formData.foto" class="pi pi-user text-4xl text-gray-400"></i>
            <img v-else :src="formData.foto" class="w-full h-full object-cover" />
          </div>
          <Button icon="pi pi-camera" rounded class="absolute bottom-0 right-0" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
          <InputText v-model="formData.nome" class="w-full" placeholder="Nome do homenageado" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
          <Calendar v-model="formData.nascimento" dateFormat="dd/mm/yy" showIcon class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data de Falecimento</label>
          <Calendar v-model="formData.falecimento" dateFormat="dd/mm/yy" showIcon class="w-full" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Biografia / Mensagem</label>
        <Textarea v-model="formData.biografia" rows="5" class="w-full" placeholder="Escreva uma mensagem de homenagem..." />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Link do Vídeo (YouTube)</label>
        <InputText v-model="formData.video_url" class="w-full" placeholder="https://youtube.com/..." />
      </div>

      <Divider />

      <h3 class="font-semibold text-gray-900">Configurações do Memorial</h3>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-star-fill text-amber-500"></i>
            <span>Permitir acender velas</span>
          </div>
          <InputSwitch v-model="formData.permitir_velas" />
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-heart-fill text-pink-500"></i>
            <span>Permitir enviar flores</span>
          </div>
          <InputSwitch v-model="formData.permitir_flores" />
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-comment text-blue-500"></i>
            <span>Permitir mensagens</span>
          </div>
          <InputSwitch v-model="formData.permitir_mensagens" />
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-globe text-green-500"></i>
            <span>Memorial público</span>
          </div>
          <InputSwitch v-model="formData.publico" />
        </div>
      </div>

      <Divider />

      <div class="flex justify-end gap-3">
        <Button label="Cancelar" text @click="router.back()" />
        <Button label="Criar Memorial" icon="pi pi-check" @click="submitForm" />
      </div>
    </div>
  </div>
</template>

