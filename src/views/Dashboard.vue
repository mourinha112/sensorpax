<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClientesStore } from '@/stores/clientes'
import { useContratosStore } from '@/stores/contratos'
import { useFinanceiroStore } from '@/stores/financeiro'
import { useOcorrenciasStore } from '@/stores/ocorrencias'

const router = useRouter()
const clientesStore = useClientesStore()
const contratosStore = useContratosStore()
const financeiroStore = useFinanceiroStore()
const ocorrenciasStore = useOcorrenciasStore()

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const stats = computed(() => [
  {
    label: 'Clientes Ativos',
    value: clientesStore.clientesAtivos,
    icon: 'pi-users',
    color: 'bg-emerald-500',
    trend: '+12%',
    trendUp: true
  },
  {
    label: 'Contratos Ativos',
    value: contratosStore.contratosAtivos,
    icon: 'pi-file',
    color: 'bg-blue-500',
    trend: '+8%',
    trendUp: true
  },
  {
    label: 'Receita Mensal',
    value: formatCurrency(contratosStore.valorTotalMensal),
    icon: 'pi-dollar',
    color: 'bg-violet-500',
    trend: '+15%',
    trendUp: true
  },
  {
    label: 'Inadimplência',
    value: formatCurrency(financeiroStore.inadimplencia),
    icon: 'pi-exclamation-triangle',
    color: 'bg-amber-500',
    trend: '-5%',
    trendUp: false
  }
])

const revenueChartData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [
    {
      label: 'Receita',
      data: [28500, 31200, 29800, 35400, 38200, 42100, 39800, 44500, 47200, 45800, 48900, 52300],
      fill: true,
      borderColor: '#5a6cf3',
      backgroundColor: 'rgba(90, 108, 243, 0.1)',
      tension: 0.4
    },
    {
      label: 'Despesas',
      data: [18200, 19500, 17800, 21200, 23400, 25100, 24300, 26800, 28100, 27500, 29200, 31400],
      fill: true,
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4
    }
  ]
})

const revenueChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        padding: 20
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        color: '#f1f5f9'
      },
      ticks: {
        callback: (value) => 'R$ ' + (value / 1000) + 'k'
      }
    }
  }
})

const planDistributionData = ref({
  labels: ['Família Premium', 'Individual Plus', 'Família Básico', 'Individual Premium', 'Pet'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: ['#5a6cf3', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e']
    }
  ]
})

const planDistributionOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        padding: 15
      }
    }
  }
})

const quickActions = [
  { icon: 'pi-user-plus', label: 'Novo Cliente', to: '/clientes/novo' },
  { icon: 'pi-file-plus', label: 'Novo Contrato', to: '/contratos/novo' },
  { icon: 'pi-bell', label: 'Nova Ocorrência', to: '/ocorrencias/nova' },
  { icon: 'pi-heart', label: 'Novo Memorial', to: '/obituario/novo' },
  { icon: 'pi-dollar', label: 'Lançamento', to: '/financeiro' },
  { icon: 'pi-whatsapp', label: 'Campanha', to: '/campanhas' }
]

const recentActivities = ref([
  { icon: 'pi-file', color: 'bg-blue-500', title: 'Novo contrato assinado', desc: 'João da Silva Santos - Família Premium', time: '5 min' },
  { icon: 'pi-dollar', color: 'bg-emerald-500', title: 'Pagamento recebido', desc: 'Maria Aparecida Oliveira - R$ 99,90', time: '15 min' },
  { icon: 'pi-bell', color: 'bg-amber-500', title: 'Nova ocorrência aberta', desc: 'OC-2024-001 - Em andamento', time: '1h' },
  { icon: 'pi-user-plus', color: 'bg-violet-500', title: 'Novo cliente cadastrado', desc: 'Ana Paula Mendes', time: '2h' },
  { icon: 'pi-whatsapp', color: 'bg-emerald-600', title: 'Campanha enviada', desc: 'Aniversariantes do mês - 45 envios', time: '3h' }
])

const upcomingPayments = computed(() => {
  return financeiroStore.contasReceber
    .filter(c => c.status === 'pendente')
    .slice(0, 5)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-500 mt-1">Bem-vindo ao SensorPax - Visão geral do seu negócio</p>
      </div>
      <div class="flex gap-2">
        <Dropdown 
          :options="['Últimos 7 dias', 'Últimos 30 dias', 'Este mês', 'Este ano']" 
          placeholder="Período"
          class="w-40"
        />
        <Button 
          icon="pi pi-download" 
          label="Exportar" 
          outlined
        />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-white rounded-2xl p-6 border border-gray-100 card-hover stat-card"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
            <div class="flex items-center gap-1 mt-2">
              <span 
                :class="[
                  'text-xs font-semibold',
                  stat.trendUp ? 'text-emerald-600' : 'text-amber-600'
                ]"
              >
                {{ stat.trend }}
              </span>
              <span class="text-xs text-gray-400">vs mês anterior</span>
            </div>
          </div>
          <div :class="[stat.color, 'w-12 h-12 rounded-xl flex items-center justify-center']">
            <i :class="['pi', stat.icon, 'text-white text-xl']"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
        <button 
          v-for="action in quickActions" 
          :key="action.label"
          @click="router.push(action.to)"
          class="quick-action-btn"
        >
          <i :class="['pi', action.icon]"></i>
          <span>{{ action.label }}</span>
        </button>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Receita vs Despesas</h2>
            <p class="text-sm text-gray-500">Comparativo mensal</p>
          </div>
        </div>
        <div class="h-80">
          <Chart type="line" :data="revenueChartData" :options="revenueChartOptions" />
        </div>
      </div>

      <!-- Plan Distribution -->
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Distribuição de Planos</h2>
          <p class="text-sm text-gray-500">Por tipo de plano</p>
        </div>
        <div class="h-64">
          <Chart type="doughnut" :data="planDistributionData" :options="planDistributionOptions" />
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activities -->
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
            <p class="text-sm text-gray-500">Últimas ações no sistema</p>
          </div>
          <Button label="Ver todas" text size="small" />
        </div>
        <div class="space-y-4">
          <div 
            v-for="(activity, index) in recentActivities" 
            :key="index"
            class="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div :class="[activity.color, 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0']">
              <i :class="['pi', activity.icon, 'text-white']"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-500 truncate">{{ activity.desc }}</p>
            </div>
            <span class="text-xs text-gray-400 whitespace-nowrap">{{ activity.time }}</span>
          </div>
        </div>
      </div>

      <!-- Upcoming Payments -->
      <div class="bg-white rounded-2xl p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Próximos Vencimentos</h2>
            <p class="text-sm text-gray-500">Pagamentos a receber</p>
          </div>
          <Button label="Ver todos" text size="small" @click="router.push('/contas-receber')" />
        </div>
        <div class="space-y-3">
          <div 
            v-for="payment in upcomingPayments" 
            :key="payment.id"
            class="flex items-center justify-between p-3 rounded-xl bg-gray-50"
          >
            <div class="flex items-center gap-3">
              <Avatar 
                :label="payment.descricao.charAt(0)" 
                shape="circle"
                class="bg-primary-100 text-primary-700"
              />
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ payment.descricao }}</p>
                <p class="text-xs text-gray-500">Venc: {{ new Date(payment.vencimento).toLocaleDateString('pt-BR') }}</p>
              </div>
            </div>
            <span class="font-semibold text-gray-900">{{ formatCurrency(payment.valor) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ocorrências em Andamento -->
    <div class="bg-white rounded-2xl p-6 border border-gray-100" v-if="ocorrenciasStore.ocorrenciasEmAndamento.length > 0">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Ocorrências em Andamento</h2>
          <p class="text-sm text-gray-500">Acompanhe as ocorrências ativas</p>
        </div>
        <Button label="Ver todas" text size="small" @click="router.push('/ocorrencias')" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="ocorrencia in ocorrenciasStore.ocorrenciasEmAndamento" 
          :key="ocorrencia.id"
          @click="router.push(`/ocorrencias/${ocorrencia.id}`)"
          class="p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
        >
          <div class="flex items-center justify-between mb-3">
            <Tag :value="ocorrencia.numero" severity="info" />
            <Tag value="Em andamento" severity="warning" />
          </div>
          <h3 class="font-semibold text-gray-900">{{ ocorrencia.falecido }}</h3>
          <p class="text-sm text-gray-500 mt-1">
            Velório: {{ ocorrencia.velorio?.local || 'Não definido' }}
          </p>
          <div class="mt-3">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-500">Progresso</span>
              <span class="font-medium">
                {{ ocorrencia.checklist.filter(c => c.concluido).length }}/{{ ocorrencia.checklist.length }}
              </span>
            </div>
            <ProgressBar 
              :value="(ocorrencia.checklist.filter(c => c.concluido).length / ocorrencia.checklist.length) * 100" 
              :showValue="false"
              style="height: 6px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

