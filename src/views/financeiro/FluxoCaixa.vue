<script setup>
import { ref } from 'vue'

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const fluxo = ref([
  { data: '2024-12-10', descricao: 'Mensalidade - Maria Oliveira', tipo: 'entrada', valor: 99.90, saldo: 15420.50 },
  { data: '2024-12-10', descricao: 'Internet e telefone', tipo: 'saida', valor: 320.00, saldo: 15320.60 },
  { data: '2024-12-09', descricao: 'Mensalidade - Ana Mendes', tipo: 'entrada', valor: 129.90, saldo: 15640.60 },
  { data: '2024-12-05', descricao: 'Aluguel', tipo: 'saida', valor: 4500.00, saldo: 15510.70 },
  { data: '2024-12-05', descricao: 'Mensalidades diversas', tipo: 'entrada', valor: 2450.00, saldo: 20010.70 },
])

const chartData = ref({
  labels: ['01', '05', '10', '15', '20', '25', '30'],
  datasets: [{
    label: 'Saldo',
    data: [12000, 15000, 14200, 16800, 15420, 18000, 17500],
    fill: true,
    borderColor: '#5a6cf3',
    backgroundColor: 'rgba(90, 108, 243, 0.1)',
    tension: 0.4
  }]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { ticks: { callback: (value) => 'R$ ' + (value / 1000) + 'k' } }
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Fluxo de Caixa</h1>
        <p class="text-gray-500 mt-1">Acompanhe a movimentação financeira</p>
      </div>
      <div class="flex gap-2">
        <Calendar placeholder="Data inicial" dateFormat="dd/mm/yy" showIcon />
        <Calendar placeholder="Data final" dateFormat="dd/mm/yy" showIcon />
        <Button icon="pi pi-download" label="Exportar" outlined />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Saldo Atual</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(15420.50) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Entradas (mês)</p>
        <p class="text-2xl font-bold text-emerald-600 mt-1">{{ formatCurrency(8250.00) }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Saídas (mês)</p>
        <p class="text-2xl font-bold text-red-600 mt-1">{{ formatCurrency(5120.00) }}</p>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Evolução do Saldo</h2>
      <div class="h-64">
        <Chart type="line" :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <DataTable :value="fluxo" :paginator="true" :rows="10" responsiveLayout="scroll" class="p-datatable-sm">
        <Column field="data" header="Data" sortable>
          <template #body="{ data }">
            {{ new Date(data.data).toLocaleDateString('pt-BR') }}
          </template>
        </Column>
        <Column field="descricao" header="Descrição" sortable />
        <Column field="tipo" header="Tipo" sortable>
          <template #body="{ data }">
            <Tag :value="data.tipo === 'entrada' ? 'Entrada' : 'Saída'" :severity="data.tipo === 'entrada' ? 'success' : 'danger'" />
          </template>
        </Column>
        <Column field="valor" header="Valor" sortable>
          <template #body="{ data }">
            <span :class="data.tipo === 'entrada' ? 'text-emerald-600' : 'text-red-600'" class="font-semibold">
              {{ data.tipo === 'entrada' ? '+' : '-' }} {{ formatCurrency(data.valor) }}
            </span>
          </template>
        </Column>
        <Column field="saldo" header="Saldo" sortable>
          <template #body="{ data }">
            <span class="font-semibold">{{ formatCurrency(data.saldo) }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

