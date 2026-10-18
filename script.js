// ============================================================================
// LAURA FAJARDO - SCRIPT.JS
// ============================================================================

// FUNCIÓN: Abrir WhatsApp con mensaje pre-rellenado
function abrirWhatsApp() {
    const numeroWhatsApp = '34613024556'; // Tu número sin +
    const mensaje = encodeURIComponent(
        'Hola Laura, me interesa la consulta gratuita de 15 minutos. ' +
        'Quiero saber más sobre tus sesiones online para neurodivergentes. ' +
        '¿Cuándo podríamos agendar?'
    );
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
}

// FUNCIÓN: Toggle FAQ (abrir/cerrar respuestas)
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// CERRAR FAQ al hacer clic fuera
document.addEventListener('click', function(event) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!item.contains(event.target) && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
});

// FUNCIÓN: Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// FUNCIÓN: Animación al scroll (fade-in para elementos)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a tarjetas y secciones
document.querySelectorAll('.card, .step, .pillar, .testimonio').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// FUNCIÓN: Formulario de contacto (si lo agregas después)
function enviarFormulario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre')?.value;
    const email = document.getElementById('email')?.value;
    const mensaje = document.getElementById('mensaje')?.value;

    if (nombre && email && mensaje) {
        // Aquí puedes integrar con un servicio de email (Formspree, Emailjs, etc.)
        // Por ahora, abrimos WhatsApp con los datos
        const mensajeFormulario = encodeURIComponent(
            `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
        );
        const numeroWhatsApp = '34613024556';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeFormulario}`;
        window.open(urlWhatsApp, '_blank');
        event.target.reset();
    }
}

// FUNCIÓN: Trackear clics en CTAs (para Google Analytics)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Agregar tracking a botones
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('CTA', 'click', this.textContent.trim());
    });
});

// FUNCIÓN: Detectar si el dispositivo es móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamiento en móvil
if (isMobile()) {
    document.body.classList.add('mobile');
}

console.log('✅ Script de Laura Fajardo cargado correctamente');
