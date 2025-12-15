<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

const email = ref('')
const senha = ref('')
const lembrar = ref(false)
const carregando = ref(false)

async function login() {
  if (!email.value || !senha.value) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos', life: 3000 })
    return
  }

  carregando.value = true
  
  // Simula login
  setTimeout(() => {
    carregando.value = false
    toast.add({ severity: 'success', summary: 'Bem-vindo!', detail: 'Login realizado com sucesso', life: 2000 })
    router.push('/')
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
            <i class="pi pi-shield text-white text-3xl"></i>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">SensorPax</h1>
          <p class="text-gray-500 mt-2">Sistema de Gestão Funerária</p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Entrar na sua conta</h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <InputText 
                v-model="email" 
                type="email" 
                placeholder="seu@email.com" 
                class="w-full"
                @keyup.enter="login"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <Password 
                v-model="senha" 
                placeholder="Sua senha" 
                :feedback="false"
                toggleMask
                class="w-full"
                inputClass="w-full"
                @keyup.enter="login"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Checkbox v-model="lembrar" :binary="true" />
                <span class="text-sm text-gray-600">Lembrar-me</span>
              </div>
              <a href="#" class="text-sm text-primary-600 hover:text-primary-700">Esqueceu a senha?</a>
            </div>

            <Button 
              label="Entrar" 
              class="w-full"
              :loading="carregando"
              @click="login"
            />
          </div>
        </div>

        <p class="text-center text-sm text-gray-500 mt-6">
          © 2024 SensorPax. Todos os direitos reservados.
        </p>
      </div>
    </div>

    <!-- Right Side - Image -->
    <div class="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12">
      <div class="text-white text-center max-w-md">
        <h2 class="text-4xl font-bold mb-4">Gestão Completa para Funerárias</h2>
        <p class="text-xl text-primary-100 mb-8">
          Sistema profissional com todos os recursos que você precisa para gerenciar sua operação.
        </p>
        <div class="grid grid-cols-2 gap-4 text-left">
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>Contratos & Recorrência</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>Gestão Financeira</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>Automação WhatsApp</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>Obituário Digital</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>Analytics Avançado</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle"></i>
            <span>IA Assistente</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

