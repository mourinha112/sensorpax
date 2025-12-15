<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const memoriais = ref([
  { id: 1, nome: 'Maria José Souza', nascimento: '1940-03-15', falecimento: '2024-12-07', velas: 45, mensagens: 23, flores: 18, visualizacoes: 320 },
  { id: 2, nome: 'Antônio Carlos Pereira', nascimento: '1955-08-22', falecimento: '2024-12-08', velas: 12, mensagens: 8, flores: 5, visualizacoes: 85 },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Obituário Digital</h1>
        <p class="text-gray-500 mt-1">Memoriais e homenagens online</p>
      </div>
      <Button icon="pi pi-plus" label="Criar Memorial" @click="router.push('/obituario/novo')" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="memorial in memoriais" :key="memorial.id" 
           class="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer"
           @click="router.push(`/memorial/${memorial.id}`)">
        <div class="h-32 bg-gradient-to-r from-slate-800 to-slate-600 flex items-center justify-center">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <i class="pi pi-heart text-white text-3xl"></i>
          </div>
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-bold text-gray-900">{{ memorial.nome }}</h3>
          <p class="text-gray-500 mt-1">
            {{ new Date(memorial.nascimento).toLocaleDateString('pt-BR') }} - {{ new Date(memorial.falecimento).toLocaleDateString('pt-BR') }}
          </p>
          
          <div class="flex justify-center gap-6 mt-4">
            <div class="text-center">
              <div class="flex items-center justify-center gap-1 text-amber-500">
                <i class="pi pi-star-fill"></i>
                <span class="font-bold">{{ memorial.velas }}</span>
              </div>
              <p class="text-xs text-gray-500">Velas</p>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center gap-1 text-pink-500">
                <i class="pi pi-heart-fill"></i>
                <span class="font-bold">{{ memorial.flores }}</span>
              </div>
              <p class="text-xs text-gray-500">Flores</p>
            </div>
            <div class="text-center">
              <div class="flex items-center justify-center gap-1 text-blue-500">
                <i class="pi pi-comment"></i>
                <span class="font-bold">{{ memorial.mensagens }}</span>
              </div>
              <p class="text-xs text-gray-500">Mensagens</p>
            </div>
          </div>

          <div class="mt-4 flex gap-2 justify-center">
            <Button icon="pi pi-eye" label="Ver Memorial" size="small" outlined />
            <Button icon="pi pi-share-alt" size="small" outlined v-tooltip.top="'Compartilhar'" />
          </div>
        </div>
      </div>

      <!-- Card para criar novo -->
      <div @click="router.push('/obituario/novo')"
           class="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-12 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
        <i class="pi pi-plus text-4xl text-gray-400 mb-3"></i>
        <p class="font-medium text-gray-500">Criar Novo Memorial</p>
      </div>
    </div>
  </div>
</template>

