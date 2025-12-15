<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const searchQuery = ref('')
const notificationsPanel = ref(null)
const userMenuPanel = ref(null)

const menuItems = [
  { 
    label: 'Dashboard', 
    icon: 'pi-home', 
    to: '/app/dashboard' 
  },
  { 
    label: 'Gestão', 
    icon: 'pi-briefcase',
    children: [
      { label: 'Clientes', icon: 'pi-users', to: '/app/clientes' },
      { label: 'Dependentes', icon: 'pi-user-plus', to: '/app/dependentes' },
      { label: 'Contratos', icon: 'pi-file', to: '/app/contratos' },
      { label: 'Carnês', icon: 'pi-wallet', to: '/app/carnes' },
    ]
  },
  { 
    label: 'Financeiro', 
    icon: 'pi-chart-line',
    children: [
      { label: 'Resumo', icon: 'pi-chart-bar', to: '/app/financeiro' },
      { label: 'Contas a Pagar', icon: 'pi-wallet', to: '/app/contas-pagar' },
      { label: 'Contas a Receber', icon: 'pi-dollar', to: '/app/contas-receber' },
      { label: 'Fluxo de Caixa', icon: 'pi-sync', to: '/app/fluxo-caixa' },
      { label: 'Centro de Custos', icon: 'pi-building', to: '/app/centro-custos' },
    ]
  },
  { 
    label: 'Cobranças', 
    icon: 'pi-money-bill',
    children: [
      { label: 'Cobranças', icon: 'pi-money-bill', to: '/app/cobrancas' },
      { label: 'Inadimplência', icon: 'pi-exclamation-triangle', to: '/app/inadimplencia' },
      { label: 'Acordos', icon: 'pi-handshake', to: '/app/acordos' },
    ]
  },
  { 
    label: 'Comercial', 
    icon: 'pi-shopping-cart',
    children: [
      { label: 'Resumo', icon: 'pi-chart-pie', to: '/app/comercial' },
      { label: 'Funil de Vendas', icon: 'pi-filter', to: '/app/funil-vendas' },
      { label: 'Propostas', icon: 'pi-file-edit', to: '/app/propostas' },
      { label: 'Planos', icon: 'pi-box', to: '/app/planos' },
    ]
  },
  { 
    label: 'Operações', 
    icon: 'pi-cog',
    children: [
      { label: 'Ocorrências', icon: 'pi-bell', to: '/app/ocorrencias' },
      { label: 'Velórios', icon: 'pi-home', to: '/app/velorios' },
      { label: 'Agenda Velórios', icon: 'pi-calendar', to: '/app/velorios/agenda' },
      { label: 'Cemitério', icon: 'pi-map', to: '/app/cemiterio' },
      { label: 'Jazigos', icon: 'pi-map-marker', to: '/app/jazigos' },
      { label: 'Sepultamentos', icon: 'pi-book', to: '/app/sepultamentos' },
    ]
  },
  { 
    label: 'Obituário', 
    icon: 'pi-heart', 
    to: '/app/obituario' 
  },
  { 
    label: 'Pets', 
    icon: 'pi-heart-fill',
    children: [
      { label: 'Pets Cadastrados', icon: 'pi-list', to: '/app/pets' },
      { label: 'Planos Pet', icon: 'pi-box', to: '/app/planos-pet' },
    ]
  },
  { 
    label: 'Benefícios', 
    icon: 'pi-gift',
    children: [
      { label: 'Clube', icon: 'pi-gift', to: '/app/beneficios' },
      { label: 'Parcerias', icon: 'pi-building', to: '/app/parcerias' },
    ]
  },
  { 
    label: 'Equipe', 
    icon: 'pi-users',
    children: [
      { label: 'Vendedores', icon: 'pi-user', to: '/app/vendedores' },
      { label: 'Comissões', icon: 'pi-percentage', to: '/app/comissoes' },
    ]
  },
  { 
    label: 'Automação', 
    icon: 'pi-bolt',
    children: [
      { label: 'WhatsApp', icon: 'pi-whatsapp', to: '/app/whatsapp' },
      { label: 'Campanhas', icon: 'pi-megaphone', to: '/app/campanhas' },
      { label: 'Chatbot IA', icon: 'pi-comments', to: '/app/chatbot' },
    ]
  },
  { 
    label: 'IA Assistente', 
    icon: 'pi-microchip-ai', 
    to: '/app/ia-assistente' 
  },
  { 
    label: 'Analytics', 
    icon: 'pi-chart-bar',
    children: [
      { label: 'Dashboard', icon: 'pi-chart-bar', to: '/app/analytics' },
      { label: 'Relatórios', icon: 'pi-file-pdf', to: '/app/relatorios' },
    ]
  },
  { 
    label: 'Fiscal', 
    icon: 'pi-receipt',
    children: [
      { label: 'Resumo', icon: 'pi-chart-pie', to: '/app/fiscal' },
      { label: 'Notas Fiscais', icon: 'pi-file-export', to: '/app/notas-fiscais' },
    ]
  },
  { 
    label: 'Documentos', 
    icon: 'pi-folder', 
    to: '/app/documentos' 
  },
  { 
    label: 'Assistência 24h', 
    icon: 'pi-phone', 
    to: '/app/assistencia-24h' 
  },
  { 
    label: 'Checkout', 
    icon: 'pi-shopping-bag', 
    to: '/app/checkout' 
  },
  { 
    label: 'Migração', 
    icon: 'pi-upload', 
    to: '/app/migracao' 
  },
  { 
    label: 'Configurações', 
    icon: 'pi-cog',
    children: [
      { label: 'Geral', icon: 'pi-cog', to: '/app/configuracoes' },
      { label: 'Usuários', icon: 'pi-user-edit', to: '/app/usuarios' },
      { label: 'Segurança', icon: 'pi-shield', to: '/app/seguranca' },
    ]
  },
]

const expandedMenus = ref([])

function toggleMenu(label) {
  const index = expandedMenus.value.indexOf(label)
  if (index === -1) {
    expandedMenus.value.push(label)
  } else {
    expandedMenus.value.splice(index, 1)
  }
}

function isMenuExpanded(label) {
  return expandedMenus.value.includes(label)
}

function isActive(to) {
  return route.path === to
}

function isChildActive(children) {
  return children?.some(child => route.path === child.to)
}

function navigate(to) {
  router.push(to)
  appStore.closeMobileSidebar()
}

function toggleNotifications(event) {
  notificationsPanel.value.toggle(event)
}

function toggleUserMenu(event) {
  userMenuPanel.value.toggle(event)
}

function logout() {
  router.push('/login')
}

const userMenuItems = ref([
  { label: 'Meu Perfil', icon: 'pi pi-user', command: () => router.push('/app/configuracoes') },
  { label: 'Configurações', icon: 'pi pi-cog', command: () => router.push('/app/configuracoes') },
  { separator: true },
  { label: 'Sair', icon: 'pi pi-sign-out', command: logout }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Desktop -->
    <aside 
      :class="[
        'fixed left-0 top-0 h-full bg-white border-r border-gray-100 transition-all duration-300 z-40',
        appStore.sidebarCollapsed ? 'w-20' : 'w-72'
      ]"
      class="hidden lg:block"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <div class="flex items-center gap-3" v-if="!appStore.sidebarCollapsed">
          <div class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <i class="pi pi-shield text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-900">SensorPax</h1>
            <p class="text-xs text-gray-500">Gestão Funerária</p>
          </div>
        </div>
        <div v-else class="w-full flex justify-center">
          <div class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <i class="pi pi-shield text-white text-lg"></i>
          </div>
        </div>
      </div>

      <!-- Menu -->
      <nav class="p-3 overflow-y-auto h-[calc(100vh-4rem)]">
        <div v-for="item in menuItems" :key="item.label" class="mb-1">
          <!-- Item com filhos -->
          <template v-if="item.children">
            <button
              @click="toggleMenu(item.label)"
              :class="[
                'w-full sidebar-item justify-between',
                isChildActive(item.children) ? 'bg-primary-50 text-primary-600' : ''
              ]"
            >
              <div class="flex items-center gap-3">
                <i :class="['pi', item.icon]"></i>
                <span v-if="!appStore.sidebarCollapsed">{{ item.label }}</span>
              </div>
              <i 
                v-if="!appStore.sidebarCollapsed"
                :class="['pi pi-chevron-down transition-transform', isMenuExpanded(item.label) ? 'rotate-180' : '']"
                class="text-xs"
              ></i>
            </button>
            <div 
              v-if="isMenuExpanded(item.label) && !appStore.sidebarCollapsed" 
              class="ml-4 mt-1 space-y-1"
            >
              <button
                v-for="child in item.children"
                :key="child.to"
                @click="navigate(child.to)"
                :class="[
                  'sidebar-item w-full text-sm',
                  isActive(child.to) ? 'active' : ''
                ]"
              >
                <i :class="['pi', child.icon]"></i>
                <span>{{ child.label }}</span>
              </button>
            </div>
          </template>

          <!-- Item simples -->
          <template v-else>
            <button
              @click="navigate(item.to)"
              :class="[
                'sidebar-item w-full',
                isActive(item.to) ? 'active' : ''
              ]"
            >
              <i :class="['pi', item.icon]"></i>
              <span v-if="!appStore.sidebarCollapsed">{{ item.label }}</span>
            </button>
          </template>
        </div>
      </nav>
    </aside>

    <!-- Sidebar Mobile -->
    <Sidebar 
      v-model:visible="appStore.sidebarMobileOpen" 
      :showCloseIcon="false"
      class="lg:hidden w-72"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <i class="pi pi-shield text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-900">SensorPax</h1>
            <p class="text-xs text-gray-500">Gestão Funerária</p>
          </div>
        </div>
      </template>

      <nav class="mt-4">
        <div v-for="item in menuItems" :key="item.label" class="mb-1">
          <template v-if="item.children">
            <button
              @click="toggleMenu(item.label)"
              :class="[
                'w-full sidebar-item justify-between',
                isChildActive(item.children) ? 'bg-primary-50 text-primary-600' : ''
              ]"
            >
              <div class="flex items-center gap-3">
                <i :class="['pi', item.icon]"></i>
                <span>{{ item.label }}</span>
              </div>
              <i 
                :class="['pi pi-chevron-down transition-transform', isMenuExpanded(item.label) ? 'rotate-180' : '']"
                class="text-xs"
              ></i>
            </button>
            <div v-if="isMenuExpanded(item.label)" class="ml-4 mt-1 space-y-1">
              <button
                v-for="child in item.children"
                :key="child.to"
                @click="navigate(child.to)"
                :class="['sidebar-item w-full text-sm', isActive(child.to) ? 'active' : '']"
              >
                <i :class="['pi', child.icon]"></i>
                <span>{{ child.label }}</span>
              </button>
            </div>
          </template>
          <template v-else>
            <button
              @click="navigate(item.to)"
              :class="['sidebar-item w-full', isActive(item.to) ? 'active' : '']"
            >
              <i :class="['pi', item.icon]"></i>
              <span>{{ item.label }}</span>
            </button>
          </template>
        </div>
      </nav>
    </Sidebar>

    <!-- Main Content -->
    <div :class="['flex-1 transition-all duration-300', appStore.sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72']">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-100 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
        <div class="flex items-center gap-4">
          <!-- Mobile menu toggle -->
          <button 
            @click="appStore.toggleMobileSidebar"
            class="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <i class="pi pi-bars text-gray-600"></i>
          </button>

          <!-- Desktop sidebar toggle -->
          <button 
            @click="appStore.toggleSidebar"
            class="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg"
          >
            <i class="pi pi-bars text-gray-600"></i>
          </button>

          <!-- Search -->
          <div class="hidden md:flex items-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search text-gray-400" />
              <InputText 
                v-model="searchQuery" 
                placeholder="Buscar clientes, contratos..." 
                class="w-80 bg-gray-50 border-0"
              />
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Mobile search -->
          <button class="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <i class="pi pi-search text-gray-600"></i>
          </button>

          <!-- Quick Actions -->
          <Button 
            icon="pi pi-plus" 
            label="Nova Ocorrência" 
            class="hidden lg:flex"
            size="small"
            @click="router.push('/app/ocorrencias/nova')"
          />

          <!-- Notifications -->
          <button 
            @click="toggleNotifications"
            class="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <i class="pi pi-bell text-gray-600"></i>
            <span 
              v-if="appStore.unreadNotifications > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
            >
              {{ appStore.unreadNotifications }}
            </span>
          </button>

          <OverlayPanel ref="notificationsPanel" class="w-80">
            <div class="p-2">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-900">Notificações</h3>
                <button 
                  @click="appStore.markAllNotificationsAsRead"
                  class="text-sm text-primary-600 hover:text-primary-700"
                >
                  Marcar todas como lidas
                </button>
              </div>
              <div class="space-y-2">
                <div 
                  v-for="notif in appStore.notifications" 
                  :key="notif.id"
                  :class="[
                    'p-3 rounded-lg cursor-pointer transition-colors',
                    notif.lida ? 'bg-gray-50' : 'bg-primary-50'
                  ]"
                  @click="appStore.markNotificationAsRead(notif.id)"
                >
                  <p class="text-sm font-medium text-gray-900">{{ notif.titulo }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ notif.tempo }} atrás</p>
                </div>
              </div>
            </div>
          </OverlayPanel>

          <!-- User Menu -->
          <button 
            @click="toggleUserMenu"
            class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <Avatar 
              :label="appStore.currentUser.nome.charAt(0)" 
              shape="circle" 
              class="bg-primary-100 text-primary-700"
            />
            <div class="hidden lg:block text-left">
              <p class="text-sm font-medium text-gray-900">{{ appStore.currentUser.nome }}</p>
              <p class="text-xs text-gray-500">{{ appStore.currentUser.cargo }}</p>
            </div>
            <i class="pi pi-chevron-down text-gray-400 text-xs hidden lg:block"></i>
          </button>

          <OverlayPanel ref="userMenuPanel">
            <div class="w-48">
              <div class="p-3 border-b border-gray-100">
                <p class="font-medium text-gray-900">{{ appStore.currentUser.nome }}</p>
                <p class="text-sm text-gray-500">{{ appStore.currentUser.email }}</p>
              </div>
              <div class="p-2">
                <button 
                  @click="router.push('/app/configuracoes')"
                  class="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <i class="pi pi-user"></i>
                  Meu Perfil
                </button>
                <button 
                  @click="router.push('/app/configuracoes')"
                  class="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <i class="pi pi-cog"></i>
                  Configurações
                </button>
                <Divider class="my-2" />
                <button 
                  @click="logout"
                  class="w-full p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <i class="pi pi-sign-out"></i>
                  Sair
                </button>
              </div>
            </div>
          </OverlayPanel>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 lg:p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

