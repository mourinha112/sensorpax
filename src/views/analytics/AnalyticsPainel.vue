<script setup>
import { ref } from 'vue'

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const kpis = ref([
  { label: 'Receita Mensal', valor: 'R$ 42.350', variacao: '+12%', positivo: true, icon: 'pi-dollar' },
  { label: 'Novos Clientes', valor: '35', variacao: '+8%', positivo: true, icon: 'pi-user-plus' },
  { label: 'Taxa de Churn', valor: '2.1%', variacao: '-0.5%', positivo: true, icon: 'pi-chart-line' },
  { label: 'Ticket Médio', valor: 'R$ 152,90', variacao: '+5%', positivo: true, icon: 'pi-shopping-cart' },
])

const receitaData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [{
    label: 'Receita',
    data: [28500, 31200, 29800, 35400, 38200, 42100, 39800, 44500, 47200, 45800, 48900, 52300],
    borderColor: '#5a6cf3',
    backgroundColor: 'rgba(90, 108, 243, 0.1)',
    fill: true,
    tension: 0.4
  }]
})

const pagamentosData = ref({
  labels: ['Boleto', 'Cartão', 'PIX', 'Débito'],
  datasets: [{ data: [45, 30, 20, 5], backgroundColor: ['#5a6cf3', '#10b981', '#f59e0b', '#8b5cf6'] }]
})

const planosData = ref({
  labels: ['Família Premium', 'Individual Plus', 'Família Básico', 'Individual Premium'],
  datasets: [{ data: [120, 85, 65, 45], backgroundColor: ['#5a6cf3', '#10b981', '#f59e0b', '#8b5cf6'] }]
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Analytics</h1>
        <p class="text-gray-500 mt-1">Indicadores e métricas do negócio</p>
      </div>
      <div class="flex gap-2">
        <Dropdown :options="['Últimos 7 dias', 'Últimos 30 dias', 'Este mês', 'Este ano']" placeholder="Período" class="w-48" />
        <Button icon="pi pi-download" label="Exportar" outlined />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <i :class="['pi', kpi.icon, 'text-primary-600']"></i>
          </div>
          <span :class="['text-sm font-semibold', kpi.positivo ? 'text-emerald-600' : 'text-red-600']">
            {{ kpi.variacao }}
          </span>
        </div>
        <p class="text-sm text-gray-500">{{ kpi.label }}</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ kpi.valor }}</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Evolução da Receita</h2>
        <div class="h-80">
          <Chart type="line" :data="receitaData" />
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Formas de Pagamento</h2>
        <div class="h-64">
          <Chart type="doughnut" :data="pagamentosData" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Distribuição por Plano</h2>
        <div class="h-64">
          <Chart type="bar" :data="planosData" />
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Métricas de Retenção</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Taxa de Retenção</span>
            <div class="flex items-center gap-2">
              <ProgressBar :value="97.9" :showValue="false" style="width: 100px; height: 8px" />
              <span class="font-semibold">97.9%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Churn Rate</span>
            <div class="flex items-center gap-2">
              <ProgressBar :value="2.1" :showValue="false" style="width: 100px; height: 8px" class="[&_.p-progressbar-value]:!bg-red-500" />
              <span class="font-semibold">2.1%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">NPS Score</span>
            <div class="flex items-center gap-2">
              <ProgressBar :value="85" :showValue="false" style="width: 100px; height: 8px" class="[&_.p-progressbar-value]:!bg-emerald-500" />
              <span class="font-semibold">85</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">LTV Médio</span>
            <span class="font-semibold">{{ formatCurrency(3650) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

