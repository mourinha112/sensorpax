import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const sidebarMobileOpen = ref(false)
  const currentUser = ref({
    id: 1,
    nome: 'Administrador',
    email: 'admin@sensorpax.com.br',
    avatar: null,
    cargo: 'Administrador',
    permissoes: ['all']
  })
  const empresa = ref({
    id: 1,
    nome: 'Funerária Exemplo',
    cnpj: '00.000.000/0001-00',
    logo: null,
    cor_primaria: '#5a6cf3',
    telefone: '(11) 99999-9999',
    email: 'contato@funerariaexemplo.com.br'
  })
  const notifications = ref([
    { id: 1, tipo: 'cobranca', titulo: '5 cobranças vencem hoje', tempo: '5 min', lida: false },
    { id: 2, tipo: 'contrato', titulo: 'Novo contrato assinado', tempo: '1h', lida: false },
    { id: 3, tipo: 'ocorrencia', titulo: 'Nova ocorrência aberta', tempo: '2h', lida: true }
  ])
  const darkMode = ref(false)

  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.lida).length
  )

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleMobileSidebar() {
    sidebarMobileOpen.value = !sidebarMobileOpen.value
  }

  function closeMobileSidebar() {
    sidebarMobileOpen.value = false
  }

  function markNotificationAsRead(id) {
    const notif = notifications.value.find(n => n.id === id)
    if (notif) notif.lida = true
  }

  function markAllNotificationsAsRead() {
    notifications.value.forEach(n => n.lida = true)
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  return {
    sidebarCollapsed,
    sidebarMobileOpen,
    currentUser,
    empresa,
    notifications,
    darkMode,
    unreadNotifications,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    toggleDarkMode
  }
})

