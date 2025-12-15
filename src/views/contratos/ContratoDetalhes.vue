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

const contrato = computed(() => contratosStore.getContratoById(parseInt(route.params.id)))
const cliente = computed(() => clientesStore.getClienteById(contrato.value?.cliente_id))

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getStatusSeverity = (status) => {
  const severities = { 'ativo': 'success', 'inadimplente': 'danger', 'suspenso': 'warning', 'cancelado': 'secondary' }
  return severities[status] || 'info'
}

const getStatusLabel = (status) => {
  const labels = { 'ativo': 'Ativo', 'inadimplente': 'Inadimplente', 'suspenso': 'Suspenso', 'cancelado': 'Cancelado' }
  return labels[status] || status
}

const parcelas = ref([
  { numero: 1, vencimento: '2024-01-15', valor: 189.90, status: 'pago', data_pagamento: '2024-01-15' },
  { numero: 2, vencimento: '2024-02-15', valor: 189.90, status: 'pago', data_pagamento: '2024-02-14' },
  { numero: 3, vencimento: '2024-03-15', valor: 189.90, status: 'pago', data_pagamento: '2024-03-15' },
  { numero: 4, vencimento: '2024-04-15', valor: 189.90, status: 'pago', data_pagamento: '2024-04-16' },
  { numero: 5, vencimento: '2024-05-15', valor: 189.90, status: 'pago', data_pagamento: '2024-05-15' },
  { numero: 6, vencimento: '2024-06-15', valor: 189.90, status: 'pago', data_pagamento: '2024-06-15' },
  { numero: 7, vencimento: '2024-07-15', valor: 189.90, status: 'pago', data_pagamento: '2024-07-15' },
  { numero: 8, vencimento: '2024-08-15', valor: 189.90, status: 'pago', data_pagamento: '2024-08-15' },
  { numero: 9, vencimento: '2024-09-15', valor: 189.90, status: 'pago', data_pagamento: '2024-09-15' },
  { numero: 10, vencimento: '2024-10-15', valor: 189.90, status: 'pago', data_pagamento: '2024-10-15' },
  { numero: 11, vencimento: '2024-11-15', valor: 189.90, status: 'pago', data_pagamento: '2024-11-15' },
  { numero: 12, vencimento: '2024-12-15', valor: 189.90, status: 'pendente', data_pagamento: null },
])

function gerarBoleto(parcela) {
  toast.add({ severity: 'info', summary: 'Gerando boleto', detail: `Boleto da parcela ${parcela.numero} está sendo gerado...`, life: 3000 })
}

function enviarWhatsApp() {
  toast.add({ severity: 'success', summary: 'Enviado', detail: 'Mensagem enviada via WhatsApp', life: 3000 })
}
</script>

<template>
  <div class="space-y-6" v-if="contrato">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Button icon="pi pi-arrow-left" rounded text @click="router.back()" />
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900">{{ contrato.numero }}</h1>
            <Tag :value="getStatusLabel(contrato.status)" :severity="getStatusSeverity(contrato.status)" />
          </div>
          <p class="text-gray-500 mt-1">{{ contrato.cliente_nome }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-print" label="Imprimir" outlined />
        <Button icon="pi pi-download" label="PDF" outlined />
        <Button icon="pi pi-pencil" label="Editar" @click="router.push(`/contratos/novo?edit=${contrato.id}`)" />
      </div>
    </div>

    <!-- Cards Info -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Valor Mensal</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(contrato.valor) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Início</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatDate(contrato.data_inicio) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Vencimento</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatDate(contrato.data_vencimento) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Dia Vencimento</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">Dia {{ contrato.dia_vencimento }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-2xl border border-gray-100">
      <TabView>
        <TabPanel header="Informações">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div class="space-y-4">
              <h3 class="font-semibold text-gray-900">Dados do Contrato</h3>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Plano</span>
                  <span class="font-medium">{{ contrato.plano }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Forma de Pagamento</span>
                  <span class="font-medium">{{ contrato.forma_pagamento }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Dependentes</span>
                  <span class="font-medium">{{ contrato.dependentes }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Pets</span>
                  <span class="font-medium">{{ contrato.pets }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-500">Assinatura Digital</span>
                  <Tag :value="contrato.assinatura_digital ? 'Sim' : 'Não'" :severity="contrato.assinatura_digital ? 'success' : 'secondary'" />
                </div>
              </div>
            </div>

            <div class="space-y-4" v-if="cliente">
              <h3 class="font-semibold text-gray-900">Dados do Cliente</h3>
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center gap-4 mb-4">
                  <Avatar :label="cliente.nome.charAt(0)" size="xlarge" shape="circle" class="bg-primary-100 text-primary-700" />
                  <div>
                    <p class="font-semibold text-gray-900">{{ cliente.nome }}</p>
                    <p class="text-sm text-gray-500">{{ cliente.cpf }}</p>
                  </div>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-phone text-gray-400"></i>
                    <span>{{ cliente.telefone }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="pi pi-envelope text-gray-400"></i>
                    <span>{{ cliente.email }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="pi pi-map-marker text-gray-400"></i>
                    <span>{{ cliente.endereco?.logradouro }}, {{ cliente.endereco?.numero }} - {{ cliente.endereco?.cidade }}/{{ cliente.endereco?.estado }}</span>
                  </div>
                </div>
                <div class="mt-4 flex gap-2">
                  <Button icon="pi pi-whatsapp" label="WhatsApp" size="small" severity="success" @click="enviarWhatsApp" />
                  <Button icon="pi pi-user" label="Ver Cliente" size="small" outlined @click="router.push(`/clientes/${cliente.id}`)" />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Parcelas">
          <div class="p-4">
            <DataTable :value="parcelas" :paginator="true" :rows="12" responsiveLayout="scroll" class="p-datatable-sm">
              <Column field="numero" header="#" style="width: 60px">
                <template #body="{ data }">
                  <span class="font-mono font-medium">{{ data.numero }}</span>
                </template>
              </Column>
              <Column field="vencimento" header="Vencimento">
                <template #body="{ data }">
                  {{ formatDate(data.vencimento) }}
                </template>
              </Column>
              <Column field="valor" header="Valor">
                <template #body="{ data }">
                  <span class="font-semibold">{{ formatCurrency(data.valor) }}</span>
                </template>
              </Column>
              <Column field="status" header="Status">
                <template #body="{ data }">
                  <Tag :value="data.status === 'pago' ? 'Pago' : 'Pendente'" :severity="data.status === 'pago' ? 'success' : 'warning'" />
                </template>
              </Column>
              <Column field="data_pagamento" header="Pago em">
                <template #body="{ data }">
                  {{ data.data_pagamento ? formatDate(data.data_pagamento) : '-' }}
                </template>
              </Column>
              <Column header="Ações" style="width: 120px">
                <template #body="{ data }">
                  <Button v-if="data.status !== 'pago'" icon="pi pi-file" label="Boleto" size="small" text @click="gerarBoleto(data)" />
                  <i v-else class="pi pi-check-circle text-emerald-500"></i>
                </template>
              </Column>
            </DataTable>
          </div>
        </TabPanel>

        <TabPanel header="Histórico">
          <div class="p-4">
            <Timeline :value="[
              { date: '10/12/2024', icon: 'pi pi-dollar', color: '#10b981', title: 'Pagamento recebido', desc: 'Parcela 11 - R$ 189,90' },
              { date: '15/11/2024', icon: 'pi pi-dollar', color: '#10b981', title: 'Pagamento recebido', desc: 'Parcela 10 - R$ 189,90' },
              { date: '10/10/2024', icon: 'pi pi-envelope', color: '#3b82f6', title: 'Lembrete enviado', desc: 'WhatsApp - Vencimento próximo' },
              { date: '15/01/2023', icon: 'pi pi-file', color: '#8b5cf6', title: 'Contrato assinado', desc: 'Assinatura digital realizada' }
            ]">
              <template #marker="{ item }">
                <div :style="{ backgroundColor: item.color }" class="w-8 h-8 rounded-full flex items-center justify-center">
                  <i :class="item.icon" class="text-white text-sm"></i>
                </div>
              </template>
              <template #content="{ item }">
                <div class="ml-4">
                  <p class="font-medium text-gray-900">{{ item.title }}</p>
                  <p class="text-sm text-gray-500">{{ item.desc }}</p>
                </div>
              </template>
              <template #opposite="{ item }">
                <span class="text-sm text-gray-400">{{ item.date }}</span>
              </template>
            </Timeline>
          </div>
        </TabPanel>

        <TabPanel header="Documentos">
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <i class="pi pi-file-pdf text-red-600"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Contrato Assinado</p>
                    <p class="text-sm text-gray-500">PDF - 245 KB</p>
                  </div>
                </div>
              </div>
              <div class="p-4 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <i class="pi pi-file text-blue-600"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Proposta Comercial</p>
                    <p class="text-sm text-gray-500">PDF - 128 KB</p>
                  </div>
                </div>
              </div>
              <div class="p-4 border border-dashed border-gray-300 rounded-xl hover:border-primary-300 cursor-pointer transition-colors flex items-center justify-center">
                <div class="text-center">
                  <i class="pi pi-upload text-gray-400 text-2xl"></i>
                  <p class="text-sm text-gray-500 mt-2">Adicionar documento</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

