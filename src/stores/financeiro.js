import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFinanceiroStore = defineStore('financeiro', () => {
  const contasReceber = ref([
    { id: 1, descricao: 'Mensalidade João da Silva', valor: 189.90, vencimento: '2024-12-15', status: 'pendente', cliente_id: 1 },
    { id: 2, descricao: 'Mensalidade Maria Oliveira', valor: 99.90, vencimento: '2024-12-10', status: 'pago', cliente_id: 2, data_pagamento: '2024-12-10' },
    { id: 3, descricao: 'Mensalidade Carlos Ferreira', valor: 149.90, vencimento: '2024-11-01', status: 'vencido', cliente_id: 3 },
    { id: 4, descricao: 'Mensalidade Ana Mendes', valor: 129.90, vencimento: '2024-12-05', status: 'pago', cliente_id: 4, data_pagamento: '2024-12-05' },
    { id: 5, descricao: 'Taxa de jazigo - Roberto Costa', valor: 350.00, vencimento: '2024-12-20', status: 'pendente', cliente_id: 5 },
  ])

  const contasPagar = ref([
    { id: 1, descricao: 'Energia elétrica', valor: 850.00, vencimento: '2024-12-20', status: 'pendente', categoria: 'Utilidades' },
    { id: 2, descricao: 'Fornecedor de urnas', valor: 3500.00, vencimento: '2024-12-15', status: 'pendente', categoria: 'Fornecedores' },
    { id: 3, descricao: 'Folha de pagamento', valor: 12000.00, vencimento: '2024-12-30', status: 'pendente', categoria: 'Pessoal' },
    { id: 4, descricao: 'Aluguel', valor: 4500.00, vencimento: '2024-12-05', status: 'pago', categoria: 'Imóveis', data_pagamento: '2024-12-05' },
    { id: 5, descricao: 'Internet e telefone', valor: 320.00, vencimento: '2024-12-10', status: 'pago', categoria: 'Utilidades', data_pagamento: '2024-12-10' },
  ])

  const centroCustos = ref([
    { id: 1, nome: 'Administrativo', orcamento: 15000, gasto: 12350 },
    { id: 2, nome: 'Operacional', orcamento: 25000, gasto: 22100 },
    { id: 3, nome: 'Comercial', orcamento: 8000, gasto: 6500 },
    { id: 4, nome: 'Marketing', orcamento: 5000, gasto: 4200 },
  ])

  const receitaMensal = computed(() => 
    contasReceber.value
      .filter(c => c.status === 'pago')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  const despesaMensal = computed(() => 
    contasPagar.value
      .filter(c => c.status === 'pago')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  const saldoMensal = computed(() => receitaMensal.value - despesaMensal.value)

  const aReceber = computed(() =>
    contasReceber.value
      .filter(c => c.status === 'pendente')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  const aPagar = computed(() =>
    contasPagar.value
      .filter(c => c.status === 'pendente')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  const inadimplencia = computed(() =>
    contasReceber.value
      .filter(c => c.status === 'vencido')
      .reduce((acc, c) => acc + c.valor, 0)
  )

  return {
    contasReceber,
    contasPagar,
    centroCustos,
    receitaMensal,
    despesaMensal,
    saldoMensal,
    aReceber,
    aPagar,
    inadimplencia
  }
})

