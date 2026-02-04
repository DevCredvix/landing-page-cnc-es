// Landing Page de Alta Conversão - Credvix
// Rastreamento e Melhorias de UX

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todos os FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir o FAQ clicado se não estava ativo
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Animação de contadores
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target) + (element.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '');
            }
        }, 16);
    }

    // Observar quando a seção de stats entra na tela
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Rastreamento de cliques nos CTAs do WhatsApp
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp-main, .whatsapp-float');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Log para análise
            console.log('CTA WhatsApp clicado:', this.className);
            
            // Facebook Pixel - Lead Event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'WhatsApp CTA',
                    content_category: 'Credito na Conta'
                });
                console.log('Facebook Pixel: Lead event tracked');
            }
            
            // TikTok Pixel - ClickButton Event
            if (typeof ttq !== 'undefined') {
                ttq.track('ClickButton', {
                    content_type: 'WhatsApp CTA',
                    content_name: 'Credito na Conta'
                });
                console.log('TikTok Pixel: ClickButton event tracked');
            }
            
            // Google Analytics (se configurado)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': 'WhatsApp Button',
                    'value': 1
                });
            }
        });
    });

    // Intersection Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards de benefícios e steps
    document.querySelectorAll('.benefit-card, .step-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Adicionar urgência visual (opcional)
    // Pode adicionar um contador de tempo ou número de pessoas visualizando
    
    // Prevenir saída da página (exit intent) - Desktop apenas
    let exitIntentShown = false;
    document.addEventListener('mouseout', function(e) {
        if (!exitIntentShown && e.clientY < 0 && window.innerWidth > 768) {
            exitIntentShown = true;
            // Aqui você pode mostrar um modal ou alerta
            // Por exemplo: oferta especial, desconto, etc.
            console.log('Exit intent detectado - Mostrar oferta especial');
        }
    });

    // Adicionar classe "scrolled" ao body quando rolar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

});

// Função para adicionar parâmetros UTM ao link do WhatsApp
function addUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'direct';
    const utmMedium = urlParams.get('utm_medium') || 'none';
    const utmCampaign = urlParams.get('utm_campaign') || 'none';
    
    // Pode usar esses dados para rastreamento
    console.log('Origem do tráfego:', {
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign
    });
}

// Executar ao carregar
addUTMParameters();
