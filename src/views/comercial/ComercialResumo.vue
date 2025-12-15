<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const vendasData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [{ label: 'Vendas', data: [12, 19, 15, 25, 22, 30], borderColor: '#5a6cf3', backgroundColor: 'rgba(90, 108, 243, 0.1)', fill: true, tension: 0.4 }]
})

const topVendedores = ref([
  { nome: 'Carlos Silva', vendas: 15, valor: 2848.50, meta: 90 },
  { nome: 'Ana Santos', vendas: 12, valor: 2278.80, meta: 75 },
  { nome: 'Pedro Lima', vendas: 8, valor: 1519.20, meta: 50 },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Comercial</h1>
        <p class="text-gray-500 mt-1">Acompanhe as vendas e metas</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl p-6 text-white">
        <p class="text-primary-100">Vendas no Mês</p>
        <p class="text-3xl font-bold mt-1">35</p>
        <p class="text-sm text-primary-100 mt-2">+15% vs mês anterior</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Valor Total</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ formatCurrency(6646.50) }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Ticket Médio</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ formatCurrency(189.90) }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <p class="text-gray-500">Taxa de Conversão</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">32%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Evolução de Vendas</h2>
        <div class="h-64">
          <Chart type="line" :data="vendasData" />
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Top Vendedores</h2>
          <Button label="Ver todos" text size="small" @click="router.push('/vendedores')" />
        </div>
        <div class="space-y-4">
          <div v-for="(vendedor, index) in topVendedores" :key="vendedor.nome" class="flex items-center gap-4">
            <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium">{{ vendedor.nome }}</span>
                <span class="text-sm text-gray-500">{{ vendedor.vendas }} vendas</span>
              </div>
              <ProgressBar :value="vendedor.meta" :showValue="false" style="height: 6px" />
            </div>
            <span class="font-semibold">{{ formatCurrency(vendedor.valor) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div @click="router.push('/funil-vendas')" class="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <i class="pi pi-filter text-primary-500 text-2xl mb-2"></i>
        <p class="font-medium">Funil de Vendas</p>
      </div>
      <div @click="router.push('/propostas')" class="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <i class="pi pi-file-edit text-primary-500 text-2xl mb-2"></i>
        <p class="font-medium">Propostas</p>
      </div>
      <div @click="router.push('/planos')" class="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <i class="pi pi-box text-primary-500 text-2xl mb-2"></i>
        <p class="font-medium">Planos</p>
      </div>
      <div @click="router.push('/checkout')" class="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
        <i class="pi pi-shopping-bag text-primary-500 text-2xl mb-2"></i>
        <p class="font-medium">Checkout Online</p>
      </div>
    </div>
  </div>
</template>

