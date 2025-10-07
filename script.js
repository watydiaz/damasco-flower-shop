// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Scroll suave para los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar el header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar color del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animaciones al scroll
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

    // Aplicar animaciones a las cards
    const cards = document.querySelectorAll('.arreglo-card, .servicio-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Botón del hero
    const heroBtn = document.querySelector('.hero-btn');
    heroBtn.addEventListener('click', function() {
        const categoriasSection = document.querySelector('#categorias');
        const offsetTop = categoriasSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Sistema de filtrado por categorías
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const arregloCards = document.querySelectorAll('.arreglo-card');

    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            
            // Actualizar botón activo
            categoriaBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filtrar productos
            arregloCards.forEach(card => {
                const cardCategoria = card.getAttribute('data-categoria');
                
                if (categoria === 'todos' || cardCategoria === categoria) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contacto-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación de envío
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Mensaje Enviado ✓';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Los efectos de hover para las imágenes ahora se manejan con CSS

    // Partículas decorativas (opcional)
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `linear-gradient(45deg, 
            ${Math.random() > 0.33 ? '#c41e3a' : Math.random() > 0.5 ? '#d4af37' : '#f8f8f8'}, 
            ${Math.random() > 0.33 ? '#8b1538' : Math.random() > 0.5 ? '#b8941f' : '#1a1a1a'})`;
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.5';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    // Crear partículas ocasionalmente
    setInterval(createFloatingParticle, 3000);
});