<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFinanceiroStore } from '@/stores/financeiro'

const router = useRouter()
const financeiroStore = useFinanceiroStore()

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const fluxoCaixaData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    { label: 'Entradas', backgroundColor: '#10b981', data: [28500, 31200, 29800, 35400, 38200, 42100] },
    { label: 'Saídas', backgroundColor: '#f43f5e', data: [18200, 19500, 17800, 21200, 23400, 25100] }
  ]
})

const fluxoCaixaOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } }
})

const centroCustosData = ref({
  labels: ['Administrativo', 'Operacional', 'Comercial', 'Marketing'],
  datasets: [{ data: [12350, 22100, 6500, 4200], backgroundColor: ['#5a6cf3', '#10b981', '#f59e0b', '#8b5cf6'] }]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Financeiro</h1>
        <p class="text-gray-500 mt-1">Visão geral das finanças</p>
      </div>
      <div class="flex gap-2">
        <Dropdown :options="['Dezembro 2024', 'Novembro 2024', 'Outubro 2024']" placeholder="Período" class="w-48" />
        <Button icon="pi pi-download" label="Exportar" outlined />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-emerald-100">Receita</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(financeiroStore.receitaMensal) }}</p>
          </div>
          <i class="pi pi-arrow-up text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-rose-100">Despesas</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(financeiroStore.despesaMensal) }}</p>
          </div>
          <i class="pi pi-arrow-down text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100">Saldo</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(financeiroStore.saldoMensal) }}</p>
          </div>
          <i class="pi pi-wallet text-3xl opacity-50"></i>
        </div>
      </div>
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-amber-100">A Receber</p>
            <p class="text-3xl font-bold mt-1">{{ formatCurrency(financeiroStore.aReceber) }}</p>
          </div>
          <i class="pi pi-clock text-3xl opacity-50"></i>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa</h2>
        <div class="h-80">
          <Chart type="bar" :data="fluxoCaixaData" :options="fluxoCaixaOptions" />
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Centro de Custos</h2>
        <div class="h-64">
          <Chart type="doughnut" :data="centroCustosData" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Contas a Receber</h2>
          <Button label="Ver todas" text size="small" @click="router.push('/contas-receber')" />
        </div>
        <div class="space-y-3">
          <div v-for="conta in financeiroStore.contasReceber.slice(0, 4)" :key="conta.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p class="font-medium text-sm">{{ conta.descricao }}</p>
              <p class="text-xs text-gray-500">{{ new Date(conta.vencimento).toLocaleDateString('pt-BR') }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatCurrency(conta.valor) }}</p>
              <Tag :value="conta.status === 'pago' ? 'Pago' : conta.status === 'vencido' ? 'Vencido' : 'Pendente'" 
                   :severity="conta.status === 'pago' ? 'success' : conta.status === 'vencido' ? 'danger' : 'warning'" 
                   class="text-xs" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Contas a Pagar</h2>
          <Button label="Ver todas" text size="small" @click="router.push('/contas-pagar')" />
        </div>
        <div class="space-y-3">
          <div v-for="conta in financeiroStore.contasPagar.slice(0, 4)" :key="conta.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p class="font-medium text-sm">{{ conta.descricao }}</p>
              <p class="text-xs text-gray-500">{{ new Date(conta.vencimento).toLocaleDateString('pt-BR') }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatCurrency(conta.valor) }}</p>
              <Tag :value="conta.status === 'pago' ? 'Pago' : 'Pendente'" 
                   :severity="conta.status === 'pago' ? 'success' : 'warning'" 
                   class="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

