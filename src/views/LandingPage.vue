<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'nav-scrolled' : 'nav-transparent'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center">
              <i class="pi pi-heart-fill text-white text-lg"></i>
            </div>
            <span class="text-2xl font-bold" :class="scrolled ? 'text-dark-950' : 'text-white'">
              Sensor<span class="gradient-text">Pax</span>
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a v-for="item in menuItems" :key="item.id" 
               :href="item.href"
               class="font-medium transition-colors duration-200 hover:text-primary-500"
               :class="scrolled ? 'text-dark-600' : 'text-white/90'">
              {{ item.label }}
            </a>
          </div>

          <!-- CTA Buttons -->
          <div class="hidden md:flex items-center gap-3">
            <Button label="Entrar" 
                    class="p-button-text"
                    :class="scrolled ? '' : 'text-white hover:text-white'"
                    @click="goToLogin" />
            <Button label="Começar Grátis" 
                    class="btn-gradient" 
                    @click="scrollToPlans" />
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2" @click="mobileMenuOpen = !mobileMenuOpen">
            <i class="pi text-2xl"
               :class="[scrolled ? 'text-dark-950' : 'text-white', mobileMenuOpen ? 'pi-times' : 'pi-bars']"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-xl border-t">
          <div class="px-4 py-6 space-y-4">
            <a v-for="item in menuItems" :key="item.id" 
               :href="item.href"
               class="block py-3 px-4 text-dark-700 font-medium rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
               @click="mobileMenuOpen = false">
              {{ item.label }}
            </a>
            <Divider />
            <div class="flex flex-col gap-3">
              <Button label="Entrar" class="p-button-outlined w-full" @click="goToLogin" />
              <Button label="Começar Grátis" class="btn-gradient w-full" @click="scrollToPlans" />
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section relative min-h-screen flex items-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 hero-gradient"></div>
      <div class="absolute inset-0 hero-pattern opacity-10"></div>
      
      <!-- Floating Elements -->
      <div class="floating-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-white/90 text-sm font-medium">+500 empresas já confiam em nós</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Gestão Funerária
              <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
                Inteligente e Humanizada
              </span>
            </h1>
            
            <p class="text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A plataforma completa para administrar contratos, financeiro, velórios, cemitérios 
              e muito mais. Simplifique sua operação e foque no que importa: acolher famílias.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button label="Teste Grátis por 14 Dias" 
                      icon="pi pi-arrow-right" 
                      iconPos="right"
                      class="btn-white text-lg px-8 py-4" 
                      @click="scrollToPlans" />
              <Button label="Ver Demonstração" 
                      icon="pi pi-play-circle" 
                      class="p-button-outlined btn-outline-white text-lg px-8 py-4" 
                      @click="openDemo" />
            </div>

            <!-- Trust Badges -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div class="flex items-center gap-2 text-white/70">
                <i class="pi pi-shield text-emerald-400"></i>
                <span class="text-sm">Dados Seguros</span>
              </div>
              <div class="flex items-center gap-2 text-white/70">
                <i class="pi pi-cloud text-cyan-400"></i>
                <span class="text-sm">100% Cloud</span>
              </div>
              <div class="flex items-center gap-2 text-white/70">
                <i class="pi pi-headphones text-violet-400"></i>
                <span class="text-sm">Suporte 24/7</span>
              </div>
            </div>
          </div>

          <!-- Hero Image/Illustration -->
          <div class="hidden lg:block relative">
            <div class="dashboard-preview">
              <div class="preview-card preview-card-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <i class="pi pi-chart-line text-emerald-600"></i>
                  </div>
                  <div>
                    <p class="text-xs text-dark-400">Receita Mensal</p>
                    <p class="text-lg font-bold text-dark-900">R$ 285.430</p>
                  </div>
                </div>
                <div class="h-2 bg-dark-100 rounded-full overflow-hidden">
                  <div class="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                </div>
              </div>

              <div class="preview-card preview-card-2">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <i class="pi pi-users text-primary-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-dark-900">2.847</p>
                    <p class="text-sm text-dark-400">Clientes Ativos</p>
                  </div>
                </div>
              </div>

              <div class="preview-card preview-card-3">
                <div class="flex items-center gap-2 mb-3">
                  <Avatar icon="pi pi-user" class="bg-violet-100 text-violet-600" shape="circle" />
                  <div class="flex-1">
                    <p class="text-sm font-semibold text-dark-900">Novo Contrato</p>
                    <p class="text-xs text-dark-400">há 2 minutos</p>
                  </div>
                  <Tag value="Ativo" severity="success" class="text-xs" />
                </div>
                <p class="text-xs text-dark-500">Plano Família Premium - 4 dependentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section id="recursos" class="py-24 bg-surface-ground">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            RECURSOS
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 mb-6">
            Tudo que você precisa em
            <span class="gradient-text">um só lugar</span>
          </h2>
          <p class="text-xl text-dark-500 max-w-3xl mx-auto">
            Módulos integrados que cobrem todas as áreas da sua operação funerária, 
            do primeiro contato ao pós-atendimento.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="feature.title"
               class="feature-card group"
               :style="{ animationDelay: `${index * 100}ms` }">
            <div class="feature-icon" :class="feature.iconBg">
              <i :class="[feature.icon, feature.iconColor]" class="text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-dark-500 leading-relaxed">
              {{ feature.description }}
            </p>
            <div class="mt-4 flex items-center gap-2 text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Saiba mais</span>
              <i class="pi pi-arrow-right text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-dark-950 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary-500 blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-violet-500 blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2">
              {{ stat.value }}
            </p>
            <p class="text-dark-300 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section id="como-funciona" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            COMO FUNCIONA
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 mb-6">
            Simples de começar,
            <span class="text-emerald-500">poderoso de usar</span>
          </h2>
          <p class="text-xl text-dark-500 max-w-3xl mx-auto">
            Em apenas 3 passos você estará com o sistema funcionando e pronto para transformar sua gestão.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div v-for="(step, index) in steps" :key="step.title" class="step-card">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon" :class="step.iconBg">
              <i :class="[step.icon, step.iconColor]" class="text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-dark-900 mb-3">{{ step.title }}</h3>
            <p class="text-dark-500">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="planos" class="py-24 bg-surface-ground">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            PLANOS
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 mb-6">
            Escolha o plano ideal
            <span class="gradient-text">para sua empresa</span>
          </h2>
          <p class="text-xl text-dark-500 max-w-3xl mx-auto mb-8">
            Planos flexíveis que crescem junto com o seu negócio. Sem taxas ocultas, cancele quando quiser.
          </p>

          <!-- Billing Toggle -->
          <div class="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-soft">
            <button 
              class="px-6 py-2 rounded-full font-medium transition-all"
              :class="billingPeriod === 'monthly' ? 'bg-primary-500 text-white' : 'text-dark-500'"
              @click="billingPeriod = 'monthly'">
              Mensal
            </button>
            <button 
              class="px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2"
              :class="billingPeriod === 'yearly' ? 'bg-primary-500 text-white' : 'text-dark-500'"
              @click="billingPeriod = 'yearly'">
              Anual
              <span class="text-xs px-2 py-1 rounded-full" 
                    :class="billingPeriod === 'yearly' ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 items-start">
          <div v-for="plan in plans" :key="plan.name" 
               class="pricing-card"
               :class="{ 'pricing-card-featured': plan.featured }">
            <div v-if="plan.featured" class="featured-badge">
              <i class="pi pi-star-fill mr-1"></i>
              Mais Popular
            </div>
            
            <div class="p-8">
              <h3 class="text-2xl font-bold mb-2" :class="plan.featured ? 'text-white' : 'text-dark-900'">
                {{ plan.name }}
              </h3>
              <p class="mb-6" :class="plan.featured ? 'text-white/70' : 'text-dark-500'">
                {{ plan.description }}
              </p>

              <div class="mb-8">
                <span class="text-5xl font-extrabold" :class="plan.featured ? 'text-white' : 'text-dark-900'">
                  R$ {{ billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly }}
                </span>
                <span :class="plan.featured ? 'text-white/70' : 'text-dark-500'">/mês</span>
              </div>

              <Button :label="plan.cta" 
                      :class="plan.featured ? 'btn-white w-full' : 'btn-gradient w-full'"
                      @click="selectPlan(plan)" />
            </div>

            <Divider :class="plan.featured ? 'border-white/20' : ''" />

            <div class="p-8 pt-0">
              <p class="font-semibold mb-4" :class="plan.featured ? 'text-white' : 'text-dark-900'">
                O que está incluso:
              </p>
              <ul class="space-y-3">
                <li v-for="feature in plan.features" :key="feature" 
                    class="flex items-start gap-3"
                    :class="plan.featured ? 'text-white/80' : 'text-dark-600'">
                  <i class="pi pi-check-circle mt-0.5" 
                     :class="plan.featured ? 'text-emerald-300' : 'text-emerald-500'"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="depoimentos" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
            DEPOIMENTOS
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 mb-6">
            O que nossos clientes
            <span class="text-amber-500">estão dizendo</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
            <div class="flex gap-1 mb-4">
              <i v-for="n in 5" :key="n" class="pi pi-star-fill text-amber-400"></i>
            </div>
            <p class="text-dark-600 mb-6 leading-relaxed italic">
              "{{ testimonial.text }}"
            </p>
            <div class="flex items-center gap-4">
              <Avatar :label="testimonial.avatar" size="large" shape="circle" 
                      class="bg-primary-100 text-primary-700 font-bold" />
              <div>
                <p class="font-bold text-dark-900">{{ testimonial.name }}</p>
                <p class="text-sm text-dark-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-24 bg-surface-ground">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 mb-6">
            Perguntas
            <span class="text-cyan-500">Frequentes</span>
          </h2>
        </div>

        <Accordion :multiple="true" class="faq-accordion">
          <AccordionTab v-for="faq in faqs" :key="faq.question" :header="faq.question">
            <p class="text-dark-600 leading-relaxed">{{ faq.answer }}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 hero-gradient"></div>
      <div class="absolute inset-0 hero-pattern opacity-10"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para transformar sua
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
            gestão funerária?
          </span>
        </h2>
        <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Junte-se a mais de 500 empresas que já modernizaram suas operações com o SensorPax. 
          Comece seu teste grátis hoje mesmo.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button label="Começar Teste Grátis" 
                  icon="pi pi-arrow-right" 
                  iconPos="right"
                  class="btn-white text-lg px-8 py-4" 
                  @click="scrollToPlans" />
          <Button label="Falar com Consultor" 
                  icon="pi pi-whatsapp" 
                  class="p-button-outlined btn-outline-white text-lg px-8 py-4" 
                  @click="openWhatsApp" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-950 pt-20 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center">
                <i class="pi pi-heart-fill text-white text-lg"></i>
              </div>
              <span class="text-2xl font-bold text-white">
                Sensor<span class="text-primary-400">Pax</span>
              </span>
            </div>
            <p class="text-dark-400 mb-6">
              A plataforma mais completa para gestão de empresas funerárias do Brasil.
            </p>
            <div class="flex gap-4">
              <a href="#" class="social-link">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i class="pi pi-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="pi pi-linkedin"></i>
              </a>
              <a href="#" class="social-link">
                <i class="pi pi-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-bold mb-6">Produto</h4>
            <ul class="space-y-4">
              <li><a href="#recursos" class="footer-link">Recursos</a></li>
              <li><a href="#planos" class="footer-link">Preços</a></li>
              <li><a href="#" class="footer-link">Integrações</a></li>
              <li><a href="#" class="footer-link">API</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6">Empresa</h4>
            <ul class="space-y-4">
              <li><a href="#" class="footer-link">Sobre nós</a></li>
              <li><a href="#" class="footer-link">Blog</a></li>
              <li><a href="#" class="footer-link">Carreiras</a></li>
              <li><a href="#" class="footer-link">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-6">Suporte</h4>
            <ul class="space-y-4">
              <li><a href="#faq" class="footer-link">FAQ</a></li>
              <li><a href="#" class="footer-link">Central de Ajuda</a></li>
              <li><a href="#" class="footer-link">Status do Sistema</a></li>
              <li><a href="#" class="footer-link">Comunidade</a></li>
            </ul>
          </div>
        </div>

        <Divider class="border-dark-800" />

        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p class="text-dark-500 text-sm">
            © {{ currentYear }} SensorPax. Todos os direitos reservados.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" class="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" class="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              LGPD
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Demo Dialog -->
    <Dialog v-model:visible="demoDialogVisible" modal header="Agendar Demonstração" 
            :style="{ width: '500px' }" class="demo-dialog">
      <div class="space-y-6">
        <p class="text-dark-500">
          Preencha seus dados e um especialista entrará em contato para uma demonstração personalizada.
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-dark-700 mb-2">Nome completo</label>
            <InputText v-model="demoForm.name" class="w-full" placeholder="Seu nome" />
          </div>
          <div>
            <label class="block text-sm font-medium text-dark-700 mb-2">E-mail</label>
            <InputText v-model="demoForm.email" class="w-full" placeholder="seu@email.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-dark-700 mb-2">Telefone</label>
            <InputMask v-model="demoForm.phone" mask="(99) 99999-9999" class="w-full" placeholder="(00) 00000-0000" />
          </div>
          <div>
            <label class="block text-sm font-medium text-dark-700 mb-2">Nome da empresa</label>
            <InputText v-model="demoForm.company" class="w-full" placeholder="Sua empresa" />
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" class="p-button-text" @click="demoDialogVisible = false" />
        <Button label="Agendar Demo" class="btn-gradient" @click="submitDemo" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const billingPeriod = ref('monthly')
const demoDialogVisible = ref(false)
const demoForm = ref({
  name: '',
  email: '',
  phone: '',
  company: ''
})

const currentYear = computed(() => new Date().getFullYear())

// Menu Items
const menuItems = [
  { id: 1, label: 'Recursos', href: '#recursos' },
  { id: 2, label: 'Como Funciona', href: '#como-funciona' },
  { id: 3, label: 'Planos', href: '#planos' },
  { id: 4, label: 'Depoimentos', href: '#depoimentos' },
  { id: 5, label: 'FAQ', href: '#faq' }
]

// Stats
const stats = [
  { value: '500+', label: 'Empresas Ativas' },
  { value: '50k+', label: 'Contratos Gerenciados' },
  { value: '99.9%', label: 'Uptime Garantido' },
  { value: '24/7', label: 'Suporte Disponível' }
]

// Features
const features = [
  {
    icon: 'pi pi-file',
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-100',
    title: 'Gestão de Contratos',
    description: 'Controle completo de contratos, parcelas, carnês e cobranças recorrentes com automação inteligente.'
  },
  {
    icon: 'pi pi-chart-line',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    title: 'Financeiro Integrado',
    description: 'Contas a pagar/receber, fluxo de caixa, centro de custos e relatórios gerenciais em tempo real.'
  },
  {
    icon: 'pi pi-home',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
    title: 'Velórios & Cemitérios',
    description: 'Agenda de velórios, gestão de jazigos, sepultamentos e controle de capacidade automatizado.'
  },
  {
    icon: 'pi pi-users',
    iconColor: 'text-cyan-600',
    iconBg: 'bg-cyan-100',
    title: 'CRM Completo',
    description: 'Funil de vendas, gestão de leads, histórico de clientes e acompanhamento de propostas.'
  },
  {
    icon: 'pi pi-whatsapp',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    title: 'WhatsApp Business',
    description: 'Chatbot inteligente, campanhas automatizadas e atendimento integrado via WhatsApp.'
  },
  {
    icon: 'pi pi-microchip-ai',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    title: 'Inteligência Artificial',
    description: 'Assistente IA para análise de dados, previsões financeiras e insights automáticos.'
  },
  {
    icon: 'pi pi-heart-fill',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
    title: 'Memorial Online',
    description: 'Crie páginas de homenagem personalizadas para as famílias compartilharem memórias.'
  },
  {
    icon: 'pi pi-phone',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    title: 'Assistência 24h',
    description: 'Módulo completo para gestão de atendimentos de emergência e acionamentos.'
  },
  {
    icon: 'pi pi-gift',
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-100',
    title: 'Clube de Benefícios',
    description: 'Fidelize clientes com descontos em parceiros, farmácias, consultas e muito mais.'
  }
]

// Steps
const steps = [
  {
    icon: 'pi pi-user-plus',
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-100',
    title: 'Crie sua conta',
    description: 'Cadastre-se em menos de 2 minutos. Não precisa de cartão de crédito para começar.'
  },
  {
    icon: 'pi pi-upload',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    title: 'Importe seus dados',
    description: 'Nossa equipe ajuda a migrar todos os dados do seu sistema atual sem complicação.'
  },
  {
    icon: 'pi pi-check-circle',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
    title: 'Comece a usar',
    description: 'Treinamento completo incluso. Em poucos dias sua equipe estará produzindo.'
  }
]

// Plans
const plans = [
  {
    name: 'Essencial',
    description: 'Para empresas iniciando a digitalização',
    priceMonthly: '297',
    priceYearly: '237',
    cta: 'Começar Agora',
    featured: false,
    features: [
      'Até 500 contratos ativos',
      'Gestão financeira básica',
      'Controle de velórios',
      'Relatórios essenciais',
      '2 usuários inclusos',
      'Suporte por e-mail'
    ]
  },
  {
    name: 'Profissional',
    description: 'Para empresas em crescimento',
    priceMonthly: '497',
    priceYearly: '397',
    cta: 'Teste Grátis 14 dias',
    featured: true,
    features: [
      'Contratos ilimitados',
      'Financeiro completo',
      'Velórios + Cemitério',
      'WhatsApp integrado',
      'Memorial online',
      '10 usuários inclusos',
      'Suporte prioritário',
      'Treinamento incluído'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Para redes e grandes operações',
    priceMonthly: '997',
    priceYearly: '797',
    cta: 'Falar com Vendas',
    featured: false,
    features: [
      'Multi-unidades',
      'API personalizada',
      'IA Assistente',
      'Integrações customizadas',
      'Usuários ilimitados',
      'SLA garantido',
      'Gerente de sucesso dedicado',
      'Customização de marca'
    ]
  }
]

// Testimonials
const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Diretor - Pax Esperança',
    avatar: 'CM',
    text: 'O SensorPax revolucionou nossa operação. Reduzimos 40% do tempo administrativo e aumentamos a satisfação dos clientes.'
  },
  {
    name: 'Ana Paula Silva',
    role: 'Gerente Financeira - Grupo Memorial',
    avatar: 'AP',
    text: 'A integração financeira é impecável. Antes usávamos 3 sistemas diferentes, agora temos tudo centralizado e funcionando perfeitamente.'
  },
  {
    name: 'Roberto Ferreira',
    role: 'Proprietário - Funerária São José',
    avatar: 'RF',
    text: 'O suporte é excepcional. Sempre que preciso, a equipe resolve rapidamente. Recomendo para qualquer empresa do setor.'
  }
]

// FAQs
const faqs = [
  {
    question: 'Quanto tempo leva para implementar o sistema?',
    answer: 'A implementação básica leva de 3 a 7 dias úteis. Nossa equipe cuida de toda a migração de dados e configuração inicial. Incluímos treinamento completo para sua equipe.'
  },
  {
    question: 'Posso testar antes de contratar?',
    answer: 'Sim! Oferecemos 14 dias de teste grátis com acesso completo a todas as funcionalidades do plano Profissional. Não é necessário cartão de crédito.'
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta, servidores no Brasil com certificação ISO 27001, backups automáticos diários e estamos em total conformidade com a LGPD.'
  },
  {
    question: 'Como funciona o suporte?',
    answer: 'Oferecemos suporte por e-mail, chat e telefone. Planos Profissional e Enterprise têm suporte prioritário com tempo de resposta garantido em até 2 horas.'
  },
  {
    question: 'Posso migrar dados do meu sistema atual?',
    answer: 'Sim, migramos dados de qualquer sistema. Nossa equipe especializada cuida de todo o processo, garantindo que nenhuma informação seja perdida.'
  },
  {
    question: 'O sistema funciona offline?',
    answer: 'O SensorPax é 100% cloud, mas temos funcionalidades de cache que permitem consultar dados mesmo sem internet. Todas as alterações são sincronizadas quando a conexão é restabelecida.'
  }
]

// Scroll handler
const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

// Methods
const goToLogin = () => {
  router.push('/login')
}

const scrollToPlans = () => {
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
  mobileMenuOpen.value = false
}

const openDemo = () => {
  demoDialogVisible.value = true
}

const submitDemo = () => {
  // Here you would submit the form
  console.log('Demo form submitted:', demoForm.value)
  demoDialogVisible.value = false
  // Reset form
  demoForm.value = { name: '', email: '', phone: '', company: '' }
}

const selectPlan = (plan) => {
  if (plan.name === 'Enterprise') {
    openWhatsApp()
  } else {
    // Navigate to signup with plan
    console.log('Selected plan:', plan.name)
  }
}

const openWhatsApp = () => {
  window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o SensorPax.', '_blank')
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Navigation */
.nav-transparent {
  background: transparent;
}

.nav-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a1b52 0%, #2d30ab 50%, #4149e7 100%);
}

.hero-gradient {
  background: linear-gradient(135deg, #1a1b52 0%, #2d30ab 50%, #4149e7 100%);
}

.hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #8b5cf6, #f43f5e);
  bottom: 100px;
  left: -50px;
  animation-delay: -5s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  top: 50%;
  left: 50%;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -30px) rotate(5deg);
  }
  50% {
    transform: translate(-20px, 20px) rotate(-5deg);
  }
  75% {
    transform: translate(20px, 30px) rotate(3deg);
  }
}

/* Dashboard Preview */
.dashboard-preview {
  position: relative;
  height: 500px;
}

.preview-card {
  position: absolute;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: cardFloat 6s ease-in-out infinite;
}

.preview-card-1 {
  top: 0;
  right: 0;
  width: 280px;
  animation-delay: 0s;
}

.preview-card-2 {
  top: 150px;
  left: 0;
  width: 220px;
  animation-delay: -2s;
}

.preview-card-3 {
  bottom: 50px;
  right: 40px;
  width: 300px;
  animation-delay: -4s;
}

@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Buttons */
.btn-gradient {
  background: linear-gradient(135deg, #5a6cf3 0%, #8b5cf6 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #4149e7 0%, #7c3aed 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(90, 108, 243, 0.4) !important;
}

.btn-white {
  background: white !important;
  border: none !important;
  color: #1a1b52 !important;
  font-weight: 600 !important;
}

.btn-white:hover {
  background: #f8fafc !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3) !important;
}

.btn-outline-white {
  background: transparent !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  color: white !important;
}

.btn-outline-white:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: white !important;
}

/* Feature Cards */
.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step Cards */
.step-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5a6cf3 0%, #8b5cf6 100%);
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

/* Pricing Cards */
.pricing-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.pricing-card-featured {
  background: linear-gradient(135deg, #1a1b52 0%, #2d30ab 100%);
  border: none;
  transform: scale(1.05);
  z-index: 10;
}

.pricing-card-featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.featured-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 0 24px 0 16px;
}

/* Testimonial Cards */
.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* FAQ Accordion */
.faq-accordion :deep(.p-accordion-header-link) {
  background: white !important;
  border-radius: 16px !important;
  border: 1px solid #e2e8f0 !important;
  padding: 1.25rem 1.5rem !important;
  font-weight: 600 !important;
  color: #1e293b !important;
  transition: all 0.2s ease !important;
}

.faq-accordion :deep(.p-accordion-header-link:hover) {
  background: #f8fafc !important;
}

.faq-accordion :deep(.p-highlight .p-accordion-header-link) {
  background: linear-gradient(135deg, #5a6cf3 0%, #8b5cf6 100%) !important;
  color: white !important;
  border-color: transparent !important;
}

.faq-accordion :deep(.p-accordion-content) {
  border: none !important;
  padding: 1.5rem !important;
  background: #f8fafc !important;
  border-radius: 0 0 16px 16px !important;
  margin-top: -8px !important;
}

.faq-accordion :deep(.p-accordion-tab) {
  margin-bottom: 1rem !important;
}

/* Footer */
.social-link {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: linear-gradient(135deg, #5a6cf3 0%, #8b5cf6 100%);
  color: white;
  transform: translateY(-2px);
}

.footer-link {
  color: #94a3b8;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: white;
  padding-left: 4px;
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing-card-featured {
    transform: scale(1);
  }
  
  .pricing-card-featured:hover {
    transform: translateY(-8px);
  }
  
  .dashboard-preview {
    display: none;
  }
}
</style>

