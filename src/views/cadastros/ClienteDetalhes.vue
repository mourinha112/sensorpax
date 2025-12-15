<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClientesStore } from '@/stores/clientes'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const clientesStore = useClientesStore()

const cliente = computed(() => clientesStore.getClienteById(parseInt(route.params.id)))

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const getStatusSeverity = (status) => {
  return { 'ativo': 'success', 'inadimplente': 'danger', 'suspenso': 'warning' }[status] || 'info'
}

function enviarWhatsApp() {
  toast.add({ severity: 'success', summary: 'Enviado', detail: 'Mensagem enviada via WhatsApp', life: 3000 })
}

function gerarCarteirinha() {
  toast.add({ severity: 'info', summary: 'Gerando', detail: 'Carteirinha sendo gerada...', life: 3000 })
}
</script>

<template>
  <div class="space-y-6" v-if="cliente">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900">{{ cliente.nome }}</h1>
            <Tag :value="cliente.status" :severity="getStatusSeverity(cliente.status)" />
          </div>
          <p class="text-gray-500 mt-1">{{ cliente.cpf }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-id-card" label="Carteirinha" outlined @click="gerarCarteirinha" />
        <Button icon="pi pi-whatsapp" label="WhatsApp" severity="success" @click="enviarWhatsApp" />
        <Button icon="pi pi-pencil" label="Editar" @click="router.push(`/clientes/novo?edit=${cliente.id}`)" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Plano</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ cliente.plano }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Mensalidade</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ formatCurrency(cliente.valor_mensalidade) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Desde</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ formatDate(cliente.data_adesao) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Dependentes</p>
        <p class="text-lg font-bold text-gray-900 mt-1">{{ cliente.dependentes?.length || 0 }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100">
      <TabView>
        <TabPanel header="Informações">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900">Dados Pessoais</h3>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Telefone</span>
                  <span class="font-medium">{{ cliente.telefone }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">E-mail</span>
                  <span class="font-medium">{{ cliente.email }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">RG</span>
                  <span class="font-medium">{{ cliente.rg }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Nascimento</span>
                  <span class="font-medium">{{ formatDate(cliente.data_nascimento) }}</span>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900">Endereço</h3>
              <div class="bg-gray-50 rounded-xl p-4">
                <p class="font-medium">{{ cliente.endereco?.logradouro }}, {{ cliente.endereco?.numero }}</p>
                <p class="text-gray-500">{{ cliente.endereco?.complemento }}</p>
                <p class="text-gray-500">{{ cliente.endereco?.bairro }}</p>
                <p class="text-gray-500">{{ cliente.endereco?.cidade }}/{{ cliente.endereco?.estado }}</p>
                <p class="text-gray-500">CEP: {{ cliente.endereco?.cep }}</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Dependentes">
          <div class="p-4">
            <div v-if="cliente.dependentes?.length > 0" class="space-y-3">
              <div v-for="dep in cliente.dependentes" :key="dep.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <Avatar :label="dep.nome.charAt(0)" shape="circle" class="bg-primary-100 text-primary-700" />
                  <div>
                    <p class="font-medium">{{ dep.nome }}</p>
                    <p class="text-sm text-gray-500">{{ dep.parentesco }} • {{ formatDate(dep.data_nascimento) }}</p>
                  </div>
                </div>
                <Button icon="pi pi-id-card" text v-tooltip.top="'Carteirinha'" />
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <i class="pi pi-users text-4xl mb-2"></i>
              <p>Nenhum dependente cadastrado</p>
            </div>
            <Button icon="pi pi-plus" label="Adicionar Dependente" class="mt-4" outlined />
          </div>
        </TabPanel>

        <TabPanel header="Pets">
          <div class="p-4">
            <div v-if="cliente.pets?.length > 0" class="space-y-3">
              <div v-for="pet in cliente.pets" :key="pet.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <i class="pi pi-heart-fill text-pink-500"></i>
                  </div>
                  <div>
                    <p class="font-medium">{{ pet.nome }}</p>
                    <p class="text-sm text-gray-500">{{ pet.especie }} • {{ pet.raca }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <i class="pi pi-heart text-4xl mb-2"></i>
              <p>Nenhum pet cadastrado</p>
            </div>
            <Button icon="pi pi-plus" label="Adicionar Pet" class="mt-4" outlined />
          </div>
        </TabPanel>

        <TabPanel header="Financeiro">
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="p-4 bg-emerald-50 rounded-xl">
                <p class="text-sm text-emerald-600">Pagos</p>
                <p class="text-2xl font-bold text-emerald-700">R$ 2.088,90</p>
              </div>
              <div class="p-4 bg-amber-50 rounded-xl">
                <p class="text-sm text-amber-600">Pendentes</p>
                <p class="text-2xl font-bold text-amber-700">R$ 189,90</p>
              </div>
              <div class="p-4 bg-red-50 rounded-xl">
                <p class="text-sm text-red-600">Vencidos</p>
                <p class="text-2xl font-bold text-red-700">R$ 0,00</p>
              </div>
            </div>
            <Button icon="pi pi-file" label="Ver Extrato Completo" outlined />
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

