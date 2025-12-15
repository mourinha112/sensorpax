import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useContratosStore = defineStore('contratos', () => {
  const contratos = ref([
    {
      id: 1,
      numero: 'CTR-2024-0001',
      cliente_id: 1,
      cliente_nome: 'João da Silva Santos',
      plano: 'Família Premium',
      valor: 189.90,
      data_inicio: '2023-01-15',
      data_vencimento: '2025-01-15',
      status: 'ativo',
      forma_pagamento: 'Boleto',
      dia_vencimento: 15,
      dependentes: 2,
      pets: 1,
      observacoes: '',
      assinatura_digital: true,
      data_assinatura: '2023-01-15'
    },
    {
      id: 2,
      numero: 'CTR-2024-0002',
      cliente_id: 2,
      cliente_nome: 'Maria Aparecida Oliveira',
      plano: 'Individual Plus',
      valor: 99.90,
      data_inicio: '2022-06-10',
      data_vencimento: '2024-06-10',
      status: 'ativo',
      forma_pagamento: 'Cartão de Crédito',
      dia_vencimento: 10,
      dependentes: 0,
      pets: 0,
      observacoes: '',
      assinatura_digital: true,
      data_assinatura: '2022-06-10'
    },
    {
      id: 3,
      numero: 'CTR-2024-0003',
      cliente_id: 3,
      cliente_nome: 'Carlos Roberto Ferreira',
      plano: 'Família Básico',
      valor: 149.90,
      data_inicio: '2021-09-01',
      data_vencimento: '2023-09-01',
      status: 'inadimplente',
      forma_pagamento: 'Boleto',
      dia_vencimento: 1,
      dependentes: 1,
      pets: 0,
      observacoes: 'Cliente com 3 parcelas em atraso',
      assinatura_digital: false,
      data_assinatura: '2021-09-01'
    },
    {
      id: 4,
      numero: 'CTR-2024-0004',
      cliente_id: 4,
      cliente_nome: 'Ana Paula Mendes',
      plano: 'Individual Premium',
      valor: 129.90,
      data_inicio: '2024-01-05',
      data_vencimento: '2026-01-05',
      status: 'ativo',
      forma_pagamento: 'PIX',
      dia_vencimento: 5,
      dependentes: 0,
      pets: 1,
      observacoes: 'Incluiu pet no plano',
      assinatura_digital: true,
      data_assinatura: '2024-01-05'
    },
    {
      id: 5,
      numero: 'CTR-2024-0005',
      cliente_id: 5,
      cliente_nome: 'Roberto Almeida Costa',
      plano: 'Família Premium',
      valor: 189.90,
      data_inicio: '2020-03-20',
      data_vencimento: '2024-03-20',
      status: 'suspenso',
      forma_pagamento: 'Boleto',
      dia_vencimento: 20,
      dependentes: 3,
      pets: 0,
      observacoes: 'Contrato suspenso por solicitação do cliente',
      assinatura_digital: false,
      data_assinatura: '2020-03-20'
    }
  ])

  const loading = ref(false)
  const filtro = ref('')

  const contratosFiltrados = computed(() => {
    if (!filtro.value) return contratos.value
    const termo = filtro.value.toLowerCase()
    return contratos.value.filter(c => 
      c.numero.toLowerCase().includes(termo) ||
      c.cliente_nome.toLowerCase().includes(termo) ||
      c.plano.toLowerCase().includes(termo)
    )
  })

  const totalContratos = computed(() => contratos.value.length)
  const contratosAtivos = computed(() => contratos.value.filter(c => c.status === 'ativo').length)
  const valorTotalMensal = computed(() => 
    contratos.value
      .filter(c => c.status === 'ativo')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  function getContratoById(id) {
    return contratos.value.find(c => c.id === id)
  }

  function addContrato(contrato) {
    const novoId = Math.max(...contratos.value.map(c => c.id)) + 1
    const numero = `CTR-${new Date().getFullYear()}-${String(novoId).padStart(4, '0')}`
    contratos.value.push({ ...contrato, id: novoId, numero })
    return novoId
  }

  function updateContrato(id, dados) {
    const index = contratos.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contratos.value[index] = { ...contratos.value[index], ...dados }
    }
  }

  function deleteContrato(id) {
    const index = contratos.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contratos.value.splice(index, 1)
    }
  }

  return {
    contratos,
    loading,
    filtro,
    contratosFiltrados,
    totalContratos,
    contratosAtivos,
    valorTotalMensal,
    getContratoById,
    addContrato,
    updateContrato,
    deleteContrato
  }
})

