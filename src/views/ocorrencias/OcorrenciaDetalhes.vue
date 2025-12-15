<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOcorrenciasStore } from '@/stores/ocorrencias'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const ocorrenciasStore = useOcorrenciasStore()

const ocorrencia = computed(() => ocorrenciasStore.getOcorrenciaById(parseInt(route.params.id)))

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function toggleChecklist(index) {
  ocorrenciasStore.updateChecklist(parseInt(route.params.id), index, !ocorrencia.value.checklist[index].concluido)
  toast.add({ severity: 'success', summary: 'Atualizado', detail: 'Checklist atualizado', life: 2000 })
}

function finalizarOcorrencia() {
  ocorrenciasStore.updateOcorrencia(parseInt(route.params.id), { status: 'finalizado' })
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Ocorrência finalizada', life: 3000 })
}

const totalMateriais = computed(() => {
  return ocorrencia.value?.materiais?.reduce((acc, m) => acc + m.valor, 0) || 0
})
</script>

<template>
  <div class="space-y-6" v-if="ocorrencia">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900">{{ ocorrencia.numero }}</h1>
            <Tag :value="ocorrencia.status === 'em_andamento' ? 'Em andamento' : 'Finalizado'" 
                 :severity="ocorrencia.status === 'em_andamento' ? 'warning' : 'success'" />
          </div>
          <p class="text-gray-500 mt-1">{{ ocorrencia.falecido }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-print" label="Imprimir OS" outlined />
        <Button v-if="ocorrencia.status === 'em_andamento'" icon="pi pi-check" label="Finalizar" @click="finalizarOcorrencia" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Data do Falecimento</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ new Date(ocorrencia.data_falecimento).toLocaleDateString('pt-BR') }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Velório</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ ocorrencia.velorio?.local || 'Não definido' }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Sepultamento</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ ocorrencia.sepultamento?.cemiterio || 'Não definido' }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Total Materiais</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ formatCurrency(totalMateriais) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Checklist -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Checklist de Preparo</h2>
        <div class="space-y-3">
          <div v-for="(item, index) in ocorrencia.checklist" :key="index" 
               @click="toggleChecklist(index)"
               :class="['flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors', item.concluido ? 'bg-emerald-50' : 'bg-gray-50 hover:bg-gray-100']">
            <Checkbox :modelValue="item.concluido" :binary="true" />
            <span :class="['font-medium', item.concluido ? 'text-emerald-700 line-through' : 'text-gray-700']">
              {{ item.item }}
            </span>
          </div>
        </div>
        <div class="mt-4">
          <ProgressBar :value="(ocorrencia.checklist.filter(c => c.concluido).length / ocorrencia.checklist.length) * 100" style="height: 10px" />
          <p class="text-sm text-gray-500 mt-2 text-center">
            {{ ocorrencia.checklist.filter(c => c.concluido).length }} de {{ ocorrencia.checklist.length }} tarefas concluídas
          </p>
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Responsável</h2>
          <div class="flex items-center gap-3">
            <Avatar :label="ocorrencia.responsavel.charAt(0)" size="large" shape="circle" class="bg-primary-100 text-primary-700" />
            <div>
              <p class="font-medium">{{ ocorrencia.responsavel }}</p>
              <p class="text-sm text-gray-500">{{ ocorrencia.parentesco }}</p>
            </div>
          </div>
          <Button icon="pi pi-whatsapp" label="Contatar" severity="success" class="w-full mt-4" />
        </div>

        <div class="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Materiais Utilizados</h2>
          <div class="space-y-2">
            <div v-for="material in ocorrencia.materiais" :key="material.item" class="flex justify-between text-sm">
              <span>{{ material.item }}</span>
              <span class="font-medium">{{ formatCurrency(material.valor) }}</span>
            </div>
          </div>
          <Divider />
          <div class="flex justify-between font-semibold">
            <span>Total</span>
            <span>{{ formatCurrency(totalMateriais) }}</span>
          </div>
          <Button icon="pi pi-plus" label="Adicionar Material" outlined class="w-full mt-4" />
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Linha do Tempo</h2>
      <Timeline :value="[
        { date: ocorrencia.data_falecimento, icon: 'pi pi-heart', color: '#ef4444', title: 'Falecimento', desc: ocorrencia.local_falecimento },
        { date: ocorrencia.velorio?.inicio, icon: 'pi pi-home', color: '#f59e0b', title: 'Início do Velório', desc: ocorrencia.velorio?.local },
        { date: ocorrencia.sepultamento?.data, icon: 'pi pi-map-marker', color: '#10b981', title: 'Sepultamento', desc: ocorrencia.sepultamento?.cemiterio }
      ]" layout="horizontal" align="top">
        <template #marker="{ item }">
          <div :style="{ backgroundColor: item.color }" class="w-10 h-10 rounded-full flex items-center justify-center">
            <i :class="item.icon" class="text-white"></i>
          </div>
        </template>
        <template #content="{ item }">
          <div class="text-center">
            <p class="font-medium text-gray-900">{{ item.title }}</p>
            <p class="text-sm text-gray-500">{{ item.desc }}</p>
          </div>
        </template>
      </Timeline>
    </div>
  </div>
</template>

