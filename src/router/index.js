import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Landing Page Pública
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('@/views/LandingPage.vue'),
    meta: { title: 'Gestão Funerária Inteligente' }
  },
  // Dashboard e páginas internas (requerem autenticação)
  {
    path: '/app',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/app/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Dashboard', icon: 'pi-home' }
      },
      // Contratos & Recorrência
      {
        path: 'contratos',
        name: 'Contratos',
        component: () => import('@/views/contratos/ContratosLista.vue'),
        meta: { title: 'Contratos', icon: 'pi-file' }
      },
      {
        path: 'contratos/novo',
        name: 'NovoContrato',
        component: () => import('@/views/contratos/ContratoForm.vue'),
        meta: { title: 'Novo Contrato', icon: 'pi-file' }
      },
      {
        path: 'contratos/:id',
        name: 'ContratoDetalhes',
        component: () => import('@/views/contratos/ContratoDetalhes.vue'),
        meta: { title: 'Detalhes do Contrato', icon: 'pi-file' }
      },
      {
        path: 'carnes',
        name: 'Carnes',
        component: () => import('@/views/contratos/CarnesLista.vue'),
        meta: { title: 'Carnês', icon: 'pi-wallet' }
      },
      // Cobranças & Inadimplência
      {
        path: 'cobrancas',
        name: 'Cobrancas',
        component: () => import('@/views/cobrancas/CobrancasLista.vue'),
        meta: { title: 'Cobranças', icon: 'pi-money-bill' }
      },
      {
        path: 'inadimplencia',
        name: 'Inadimplencia',
        component: () => import('@/views/cobrancas/Inadimplencia.vue'),
        meta: { title: 'Inadimplência', icon: 'pi-exclamation-triangle' }
      },
      {
        path: 'acordos',
        name: 'Acordos',
        component: () => import('@/views/cobrancas/Acordos.vue'),
        meta: { title: 'Acordos', icon: 'pi-handshake' }
      },
      // Cadastro e Gestão
      {
        path: 'clientes',
        name: 'Clientes',
        component: () => import('@/views/cadastros/ClientesLista.vue'),
        meta: { title: 'Clientes', icon: 'pi-users' }
      },
      {
        path: 'clientes/novo',
        name: 'NovoCliente',
        component: () => import('@/views/cadastros/ClienteForm.vue'),
        meta: { title: 'Novo Cliente', icon: 'pi-user-plus' }
      },
      {
        path: 'clientes/:id',
        name: 'ClienteDetalhes',
        component: () => import('@/views/cadastros/ClienteDetalhes.vue'),
        meta: { title: 'Detalhes do Cliente', icon: 'pi-user' }
      },
      {
        path: 'dependentes',
        name: 'Dependentes',
        component: () => import('@/views/cadastros/DependentesLista.vue'),
        meta: { title: 'Dependentes', icon: 'pi-user-plus' }
      },
      // Financeiro
      {
        path: 'financeiro',
        name: 'Financeiro',
        component: () => import('@/views/financeiro/FinanceiroResumo.vue'),
        meta: { title: 'Financeiro', icon: 'pi-chart-line' }
      },
      {
        path: 'contas-pagar',
        name: 'ContasPagar',
        component: () => import('@/views/financeiro/ContasPagar.vue'),
        meta: { title: 'Contas a Pagar', icon: 'pi-wallet' }
      },
      {
        path: 'contas-receber',
        name: 'ContasReceber',
        component: () => import('@/views/financeiro/ContasReceber.vue'),
        meta: { title: 'Contas a Receber', icon: 'pi-dollar' }
      },
      {
        path: 'fluxo-caixa',
        name: 'FluxoCaixa',
        component: () => import('@/views/financeiro/FluxoCaixa.vue'),
        meta: { title: 'Fluxo de Caixa', icon: 'pi-sync' }
      },
      {
        path: 'centro-custos',
        name: 'CentroCustos',
        component: () => import('@/views/financeiro/CentroCustos.vue'),
        meta: { title: 'Centro de Custos', icon: 'pi-building' }
      },
      // Comercial
      {
        path: 'comercial',
        name: 'Comercial',
        component: () => import('@/views/comercial/ComercialResumo.vue'),
        meta: { title: 'Comercial', icon: 'pi-shopping-cart' }
      },
      {
        path: 'funil-vendas',
        name: 'FunilVendas',
        component: () => import('@/views/comercial/FunilVendas.vue'),
        meta: { title: 'Funil de Vendas', icon: 'pi-filter' }
      },
      {
        path: 'propostas',
        name: 'Propostas',
        component: () => import('@/views/comercial/PropostasLista.vue'),
        meta: { title: 'Propostas', icon: 'pi-file-edit' }
      },
      {
        path: 'planos',
        name: 'Planos',
        component: () => import('@/views/comercial/PlanosLista.vue'),
        meta: { title: 'Planos', icon: 'pi-box' }
      },
      // Obituário
      {
        path: 'obituario',
        name: 'Obituario',
        component: () => import('@/views/obituario/ObituarioLista.vue'),
        meta: { title: 'Obituário', icon: 'pi-heart' }
      },
      {
        path: 'obituario/novo',
        name: 'NovoObituario',
        component: () => import('@/views/obituario/ObituarioForm.vue'),
        meta: { title: 'Novo Memorial', icon: 'pi-heart' }
      },
      // Ocorrências Funerárias
      {
        path: 'ocorrencias',
        name: 'Ocorrencias',
        component: () => import('@/views/ocorrencias/OcorrenciasLista.vue'),
        meta: { title: 'Ocorrências', icon: 'pi-bell' }
      },
      {
        path: 'ocorrencias/nova',
        name: 'NovaOcorrencia',
        component: () => import('@/views/ocorrencias/OcorrenciaForm.vue'),
        meta: { title: 'Nova Ocorrência', icon: 'pi-bell' }
      },
      {
        path: 'ocorrencias/:id',
        name: 'OcorrenciaDetalhes',
        component: () => import('@/views/ocorrencias/OcorrenciaDetalhes.vue'),
        meta: { title: 'Detalhes da Ocorrência', icon: 'pi-bell' }
      },
      // Velórios
      {
        path: 'velorios',
        name: 'Velorios',
        component: () => import('@/views/velorios/VeloriosLista.vue'),
        meta: { title: 'Velórios', icon: 'pi-home' }
      },
      {
        path: 'velorios/agenda',
        name: 'VeloriosAgenda',
        component: () => import('@/views/velorios/VeloriosAgenda.vue'),
        meta: { title: 'Agenda de Velórios', icon: 'pi-calendar' }
      },
      // Cemitério
      {
        path: 'cemiterio',
        name: 'Cemiterio',
        component: () => import('@/views/cemiterio/CemiterioResumo.vue'),
        meta: { title: 'Cemitério', icon: 'pi-map' }
      },
      {
        path: 'jazigos',
        name: 'Jazigos',
        component: () => import('@/views/cemiterio/JazigosLista.vue'),
        meta: { title: 'Jazigos', icon: 'pi-map-marker' }
      },
      {
        path: 'sepultamentos',
        name: 'Sepultamentos',
        component: () => import('@/views/cemiterio/SepultamentosLista.vue'),
        meta: { title: 'Sepultamentos', icon: 'pi-book' }
      },
      // Pets
      {
        path: 'pets',
        name: 'Pets',
        component: () => import('@/views/pets/PetsLista.vue'),
        meta: { title: 'Pets', icon: 'pi-heart-fill' }
      },
      {
        path: 'planos-pet',
        name: 'PlanosPet',
        component: () => import('@/views/pets/PlanosPet.vue'),
        meta: { title: 'Planos Pet', icon: 'pi-heart-fill' }
      },
      // Clube de Benefícios
      {
        path: 'beneficios',
        name: 'Beneficios',
        component: () => import('@/views/beneficios/BeneficiosLista.vue'),
        meta: { title: 'Clube de Benefícios', icon: 'pi-gift' }
      },
      {
        path: 'parcerias',
        name: 'Parcerias',
        component: () => import('@/views/beneficios/ParceriasLista.vue'),
        meta: { title: 'Parcerias', icon: 'pi-building' }
      },
      // Área do Vendedor
      {
        path: 'vendedores',
        name: 'Vendedores',
        component: () => import('@/views/vendedores/VendedoresLista.vue'),
        meta: { title: 'Vendedores', icon: 'pi-users' }
      },
      {
        path: 'comissoes',
        name: 'Comissoes',
        component: () => import('@/views/vendedores/ComissoesLista.vue'),
        meta: { title: 'Comissões', icon: 'pi-percentage' }
      },
      // WhatsApp & Automação
      {
        path: 'whatsapp',
        name: 'WhatsApp',
        component: () => import('@/views/whatsapp/WhatsAppPainel.vue'),
        meta: { title: 'WhatsApp', icon: 'pi-whatsapp' }
      },
      {
        path: 'campanhas',
        name: 'Campanhas',
        component: () => import('@/views/whatsapp/CampanhasLista.vue'),
        meta: { title: 'Campanhas', icon: 'pi-megaphone' }
      },
      {
        path: 'chatbot',
        name: 'Chatbot',
        component: () => import('@/views/whatsapp/ChatbotConfig.vue'),
        meta: { title: 'Chatbot IA', icon: 'pi-comments' }
      },
      // IA
      {
        path: 'ia-assistente',
        name: 'IAAssistente',
        component: () => import('@/views/ia/IAAssistente.vue'),
        meta: { title: 'IA Assistente', icon: 'pi-microchip-ai' }
      },
      // Analytics
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/analytics/AnalyticsPainel.vue'),
        meta: { title: 'Analytics', icon: 'pi-chart-bar' }
      },
      {
        path: 'relatorios',
        name: 'Relatorios',
        component: () => import('@/views/analytics/RelatoriosLista.vue'),
        meta: { title: 'Relatórios', icon: 'pi-file-pdf' }
      },
      // Documentos
      {
        path: 'documentos',
        name: 'Documentos',
        component: () => import('@/views/documentos/DocumentosLista.vue'),
        meta: { title: 'Documentos', icon: 'pi-folder' }
      },
      // Fiscal
      {
        path: 'fiscal',
        name: 'Fiscal',
        component: () => import('@/views/fiscal/FiscalResumo.vue'),
        meta: { title: 'Fiscal', icon: 'pi-receipt' }
      },
      {
        path: 'notas-fiscais',
        name: 'NotasFiscais',
        component: () => import('@/views/fiscal/NotasFiscaisLista.vue'),
        meta: { title: 'Notas Fiscais', icon: 'pi-file-export' }
      },
      // Configurações
      {
        path: 'configuracoes',
        name: 'Configuracoes',
        component: () => import('@/views/configuracoes/ConfiguracoesGeral.vue'),
        meta: { title: 'Configurações', icon: 'pi-cog' }
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: () => import('@/views/configuracoes/UsuariosLista.vue'),
        meta: { title: 'Usuários', icon: 'pi-user-edit' }
      },
      {
        path: 'seguranca',
        name: 'Seguranca',
        component: () => import('@/views/configuracoes/SegurancaConfig.vue'),
        meta: { title: 'Segurança', icon: 'pi-shield' }
      },
      // Assistência 24h
      {
        path: 'assistencia-24h',
        name: 'Assistencia24h',
        component: () => import('@/views/assistencia/Assistencia24h.vue'),
        meta: { title: 'Assistência 24h', icon: 'pi-phone' }
      },
      // Checkout Online
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/checkout/CheckoutConfig.vue'),
        meta: { title: 'Checkout Online', icon: 'pi-shopping-bag' }
      },
      // Migração
      {
        path: 'migracao',
        name: 'Migracao',
        component: () => import('@/views/migracao/MigracaoPainel.vue'),
        meta: { title: 'Migração de Dados', icon: 'pi-upload' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/memorial/:id',
    name: 'MemorialPublico',
    component: () => import('@/views/obituario/MemorialPublico.vue'),
    meta: { title: 'Memorial' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Página não encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'SensorPax'} - SensorPax`
  next()
})

export default router

