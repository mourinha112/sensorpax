import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClientesStore = defineStore('clientes', () => {
  const clientes = ref([
    {
      id: 1,
      nome: 'João da Silva Santos',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      data_nascimento: '1970-05-15',
      telefone: '(11) 99999-1111',
      email: 'joao.santos@email.com',
      endereco: {
        cep: '01310-100',
        logradouro: 'Av. Paulista',
        numero: '1000',
        complemento: 'Apto 101',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      status: 'ativo',
      plano: 'Família Premium',
      valor_mensalidade: 189.90,
      data_adesao: '2023-01-15',
      dependentes: [
        { id: 1, nome: 'Maria da Silva Santos', parentesco: 'Cônjuge', data_nascimento: '1972-08-20' },
        { id: 2, nome: 'Pedro da Silva Santos', parentesco: 'Filho', data_nascimento: '1998-03-10' }
      ],
      pets: [
        { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador' }
      ],
      historico: []
    },
    {
      id: 2,
      nome: 'Maria Aparecida Oliveira',
      cpf: '987.654.321-00',
      rg: '98.765.432-1',
      data_nascimento: '1965-11-20',
      telefone: '(11) 99999-2222',
      email: 'maria.oliveira@email.com',
      endereco: {
        cep: '04538-132',
        logradouro: 'Av. Brigadeiro Faria Lima',
        numero: '2000',
        complemento: '',
        bairro: 'Itaim Bibi',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      status: 'ativo',
      plano: 'Individual Plus',
      valor_mensalidade: 99.90,
      data_adesao: '2022-06-10',
      dependentes: [],
      pets: [],
      historico: []
    },
    {
      id: 3,
      nome: 'Carlos Roberto Ferreira',
      cpf: '456.789.123-00',
      rg: '45.678.912-3',
      data_nascimento: '1980-03-08',
      telefone: '(11) 99999-3333',
      email: 'carlos.ferreira@email.com',
      endereco: {
        cep: '01310-200',
        logradouro: 'Rua Augusta',
        numero: '500',
        complemento: 'Sala 302',
        bairro: 'Consolação',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      status: 'inadimplente',
      plano: 'Família Básico',
      valor_mensalidade: 149.90,
      data_adesao: '2021-09-01',
      dependentes: [
        { id: 3, nome: 'Ana Paula Ferreira', parentesco: 'Cônjuge', data_nascimento: '1982-07-15' }
      ],
      pets: [],
      historico: []
    },
    {
      id: 4,
      nome: 'Ana Paula Mendes',
      cpf: '789.123.456-00',
      rg: '78.912.345-6',
      data_nascimento: '1990-12-25',
      telefone: '(11) 99999-4444',
      email: 'ana.mendes@email.com',
      endereco: {
        cep: '04543-011',
        logradouro: 'Rua Funchal',
        numero: '129',
        complemento: '',
        bairro: 'Vila Olímpia',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      status: 'ativo',
      plano: 'Individual Premium',
      valor_mensalidade: 129.90,
      data_adesao: '2024-01-05',
      dependentes: [],
      pets: [
        { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Siamês' }
      ],
      historico: []
    },
    {
      id: 5,
      nome: 'Roberto Almeida Costa',
      cpf: '321.654.987-00',
      rg: '32.165.498-7',
      data_nascimento: '1955-08-30',
      telefone: '(11) 99999-5555',
      email: 'roberto.costa@email.com',
      endereco: {
        cep: '01311-100',
        logradouro: 'Alameda Santos',
        numero: '800',
        complemento: 'Cobertura',
        bairro: 'Cerqueira César',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      status: 'suspenso',
      plano: 'Família Premium',
      valor_mensalidade: 189.90,
      data_adesao: '2020-03-20',
      dependentes: [
        { id: 4, nome: 'Helena Almeida Costa', parentesco: 'Cônjuge', data_nascimento: '1958-04-12' },
        { id: 5, nome: 'Marcos Almeida Costa', parentesco: 'Filho', data_nascimento: '1985-09-18' },
        { id: 6, nome: 'Fernanda Almeida Costa', parentesco: 'Filha', data_nascimento: '1988-02-22' }
      ],
      pets: [],
      historico: []
    }
  ])

  const loading = ref(false)
  const filtro = ref('')

  const clientesFiltrados = computed(() => {
    if (!filtro.value) return clientes.value
    const termo = filtro.value.toLowerCase()
    return clientes.value.filter(c => 
      c.nome.toLowerCase().includes(termo) ||
      c.cpf.includes(termo) ||
      c.email.toLowerCase().includes(termo)
    )
  })

  const totalClientes = computed(() => clientes.value.length)
  const clientesAtivos = computed(() => clientes.value.filter(c => c.status === 'ativo').length)
  const clientesInadimplentes = computed(() => clientes.value.filter(c => c.status === 'inadimplente').length)

  function getClienteById(id) {
    return clientes.value.find(c => c.id === id)
  }

  function addCliente(cliente) {
    const novoId = Math.max(...clientes.value.map(c => c.id)) + 1
    clientes.value.push({ ...cliente, id: novoId })
    return novoId
  }

  function updateCliente(id, dados) {
    const index = clientes.value.findIndex(c => c.id === id)
    if (index !== -1) {
      clientes.value[index] = { ...clientes.value[index], ...dados }
    }
  }

  function deleteCliente(id) {
    const index = clientes.value.findIndex(c => c.id === id)
    if (index !== -1) {
      clientes.value.splice(index, 1)
    }
  }

  return {
    clientes,
    loading,
    filtro,
    clientesFiltrados,
    totalClientes,
    clientesAtivos,
    clientesInadimplentes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
  }
})

