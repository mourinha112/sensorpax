import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOcorrenciasStore = defineStore('ocorrencias', () => {
  const ocorrencias = ref([
    {
      id: 1,
      numero: 'OC-2024-001',
      falecido: 'Antônio Carlos Pereira',
      data_falecimento: '2024-12-08',
      hora_falecimento: '14:30',
      local_falecimento: 'Hospital São Paulo',
      causa: 'Natural',
      cliente_id: 1,
      responsavel: 'João da Silva Santos',
      parentesco: 'Filho',
      status: 'em_andamento',
      velorio: {
        local: 'Sala 1 - Central',
        inicio: '2024-12-09T10:00',
        fim: '2024-12-10T10:00'
      },
      sepultamento: {
        cemiterio: 'Cemitério da Paz',
        jazigo: 'Quadra A - Lote 15',
        data: '2024-12-10',
        hora: '11:00'
      },
      checklist: [
        { item: 'Documentação coletada', concluido: true },
        { item: 'Certidão de óbito emitida', concluido: true },
        { item: 'Corpo preparado', concluido: true },
        { item: 'Urna selecionada', concluido: true },
        { item: 'Flores encomendadas', concluido: false },
        { item: 'Velório preparado', concluido: false },
        { item: 'Transporte agendado', concluido: true }
      ],
      materiais: [
        { item: 'Urna Modelo Premium', quantidade: 1, valor: 2500 },
        { item: 'Kit de preparação', quantidade: 1, valor: 350 },
        { item: 'Arranjo de flores', quantidade: 3, valor: 450 }
      ],
      observacoes: 'Família solicitou cerimônia reservada'
    },
    {
      id: 2,
      numero: 'OC-2024-002',
      falecido: 'Maria José Souza',
      data_falecimento: '2024-12-07',
      hora_falecimento: '08:15',
      local_falecimento: 'Residência',
      causa: 'Natural',
      cliente_id: 2,
      responsavel: 'Maria Aparecida Oliveira',
      parentesco: 'Sobrinha',
      status: 'finalizado',
      velorio: {
        local: 'Sala 2 - Norte',
        inicio: '2024-12-07T18:00',
        fim: '2024-12-08T12:00'
      },
      sepultamento: {
        cemiterio: 'Cemitério Municipal',
        jazigo: 'Quadra C - Lote 42',
        data: '2024-12-08',
        hora: '14:00'
      },
      checklist: [
        { item: 'Documentação coletada', concluido: true },
        { item: 'Certidão de óbito emitida', concluido: true },
        { item: 'Corpo preparado', concluido: true },
        { item: 'Urna selecionada', concluido: true },
        { item: 'Flores encomendadas', concluido: true },
        { item: 'Velório preparado', concluido: true },
        { item: 'Transporte agendado', concluido: true }
      ],
      materiais: [
        { item: 'Urna Modelo Standard', quantidade: 1, valor: 1800 },
        { item: 'Kit de preparação', quantidade: 1, valor: 350 },
        { item: 'Arranjo de flores', quantidade: 2, valor: 300 }
      ],
      observacoes: ''
    }
  ])

  const loading = ref(false)

  const ocorrenciasEmAndamento = computed(() => 
    ocorrencias.value.filter(o => o.status === 'em_andamento')
  )

  const ocorrenciasFinalizadas = computed(() => 
    ocorrencias.value.filter(o => o.status === 'finalizado')
  )

  function getOcorrenciaById(id) {
    return ocorrencias.value.find(o => o.id === id)
  }

  function addOcorrencia(ocorrencia) {
    const novoId = Math.max(...ocorrencias.value.map(o => o.id)) + 1
    const numero = `OC-${new Date().getFullYear()}-${String(novoId).padStart(3, '0')}`
    ocorrencias.value.push({ ...ocorrencia, id: novoId, numero })
    return novoId
  }

  function updateOcorrencia(id, dados) {
    const index = ocorrencias.value.findIndex(o => o.id === id)
    if (index !== -1) {
      ocorrencias.value[index] = { ...ocorrencias.value[index], ...dados }
    }
  }

  function updateChecklist(ocorrenciaId, checklistIndex, concluido) {
    const ocorrencia = ocorrencias.value.find(o => o.id === ocorrenciaId)
    if (ocorrencia && ocorrencia.checklist[checklistIndex]) {
      ocorrencia.checklist[checklistIndex].concluido = concluido
    }
  }

  return {
    ocorrencias,
    loading,
    ocorrenciasEmAndamento,
    ocorrenciasFinalizadas,
    getOcorrenciaById,
    addOcorrencia,
    updateOcorrencia,
    updateChecklist
  }
})

