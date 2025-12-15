<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const config = ref({
  habilitado: true,
  pix: true,
  cartao: true,
  boleto: true,
  recuperacao_carrinho: true,
  dias_recuperacao: 3
})

function salvar() {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Configurações do checkout salvas', life: 3000 })
}

function copiarLink() {
  navigator.clipboard.writeText('https://checkout.sensorpax.com.br/seu-link')
  toast.add({ severity: 'success', summary: 'Copiado', detail: 'Link copiado para a área de transferência', life: 2000 })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Checkout Online</h1>
        <p class="text-gray-500 mt-1">Configure o checkout para vendas online</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Vendas Online (mês)</p>
        <p class="text-2xl font-bold text-gray-900">28</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Taxa de Conversão</p>
        <p class="text-2xl font-bold text-gray-900">32%</p>
      </div>
      <div class="bg-white rounded-xl p-4 border border-gray-100">
        <p class="text-sm text-gray-500">Carrinhos Recuperados</p>
        <p class="text-2xl font-bold text-emerald-600">12</p>
      </div>
    </div>

    <!-- Link do Checkout -->
    <div class="bg-primary-50 rounded-2xl p-6 border border-primary-200">
      <h3 class="font-semibold text-primary-800 mb-2">Link do Checkout</h3>
      <div class="flex gap-2">
        <InputText value="https://checkout.sensorpax.com.br/seu-link" class="flex-1" readonly />
        <Button icon="pi pi-copy" @click="copiarLink" v-tooltip.top="'Copiar'" />
        <Button icon="pi pi-external-link" outlined v-tooltip.top="'Abrir'" />
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">Configurações</h2>

      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p class="font-medium">Checkout Habilitado</p>
          <p class="text-sm text-gray-500">Permite vendas online</p>
        </div>
        <InputSwitch v-model="config.habilitado" />
      </div>

      <Divider />

      <h3 class="font-semibold text-gray-900">Formas de Pagamento</h3>

      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-qrcode text-emerald-500"></i>
            <span>PIX</span>
          </div>
          <InputSwitch v-model="config.pix" />
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-credit-card text-blue-500"></i>
            <span>Cartão de Crédito</span>
          </div>
          <InputSwitch v-model="config.cartao" />
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-3">
            <i class="pi pi-file text-amber-500"></i>
            <span>Boleto Bancário</span>
          </div>
          <InputSwitch v-model="config.boleto" />
        </div>
      </div>

      <Divider />

      <h3 class="font-semibold text-gray-900">Recuperação de Carrinho</h3>

      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p class="font-medium">Recuperação Automática</p>
          <p class="text-sm text-gray-500">Envia lembrete por WhatsApp</p>
        </div>
        <InputSwitch v-model="config.recuperacao_carrinho" />
      </div>

      <div class="flex justify-end">
        <Button label="Salvar Configurações" icon="pi pi-check" @click="salvar" />
      </div>
    </div>
  </div>
</template>

