<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const showDialog = ref(false)

const planos = ref([
  { id: 1, nome: 'Individual Básico', preco: 69.90, dependentes: 0, pets: false, beneficios: ['Assistência 24h', 'Urna padrão'], ativo: true },
  { id: 2, nome: 'Individual Plus', preco: 99.90, dependentes: 0, pets: false, beneficios: ['Assistência 24h', 'Urna premium', 'Flores'], ativo: true },
  { id: 3, nome: 'Individual Premium', preco: 129.90, dependentes: 0, pets: true, beneficios: ['Assistência 24h', 'Urna premium', 'Flores', 'Pet incluso'], ativo: true },
  { id: 4, nome: 'Família Básico', preco: 149.90, dependentes: 3, pets: false, beneficios: ['Assistência 24h', 'Urna padrão', 'Até 3 dependentes'], ativo: true },
  { id: 5, nome: 'Família Premium', preco: 189.90, dependentes: 5, pets: true, beneficios: ['Assistência 24h', 'Urna premium', 'Flores', 'Até 5 dependentes', 'Pet incluso'], ativo: true },
  { id: 6, nome: 'Família VIP', preco: 249.90, dependentes: 10, pets: true, beneficios: ['Assistência 24h Premium', 'Urna VIP', 'Coroa de flores', 'Até 10 dependentes', 'Pet incluso', 'Transporte especial'], ativo: true },
])

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Planos</h1>
        <p class="text-gray-500 mt-1">Configure os planos disponíveis</p>
      </div>
      <Button icon="pi pi-plus" label="Novo Plano" @click="showDialog = true" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="plano in planos" :key="plano.id" 
           :class="['bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg', plano.nome.includes('Premium') || plano.nome.includes('VIP') ? 'border-primary-500' : 'border-gray-100']">
        <div v-if="plano.nome.includes('Premium') || plano.nome.includes('VIP')" class="bg-primary-500 text-white text-center py-1 text-sm font-medium">
          Mais Popular
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900">{{ plano.nome }}</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-primary-600">{{ formatCurrency(plano.preco) }}</span>
            <span class="text-gray-500">/mês</span>
          </div>
          
          <div class="mt-6 space-y-3">
            <div v-for="beneficio in plano.beneficios" :key="beneficio" class="flex items-center gap-2">
              <i class="pi pi-check-circle text-emerald-500"></i>
              <span class="text-gray-600">{{ beneficio }}</span>
            </div>
          </div>

          <div class="mt-6 flex gap-2">
            <Tag v-if="plano.dependentes > 0" :value="`${plano.dependentes} dep.`" severity="info" />
            <Tag v-if="plano.pets" value="Pet" severity="success" />
          </div>

          <div class="mt-6 flex gap-2">
            <Button label="Editar" outlined class="flex-1" />
            <Button icon="pi pi-copy" outlined v-tooltip.top="'Duplicar'" />
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="showDialog" header="Novo Plano" :style="{ width: '600px' }" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Plano</label>
          <InputText class="w-full" placeholder="Ex: Família Premium" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preço Mensal</label>
            <InputNumber mode="currency" currency="BRL" locale="pt-BR" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Máx. Dependentes</label>
            <InputNumber :min="0" :max="20" class="w-full" />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <InputSwitch />
          <span>Incluir Pet</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Benefícios</label>
          <Textarea rows="4" placeholder="Liste os benefícios, um por linha" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" text @click="showDialog = false" />
        <Button label="Salvar" icon="pi pi-check" />
      </template>
    </Dialog>
  </div>
</template>

