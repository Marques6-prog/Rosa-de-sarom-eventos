// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(245, 241, 235, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(245, 241, 235, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.depoimento-card');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    showSlide(currentSlide);
}

// Auto-advance testimonials
setInterval(() => {
    changeSlide(1);
}, 5000);

// Gallery Filter and Lightbox
const galleryData = [
    {
        id: 1,
        category: 'casamentos',
        title: 'Casamento Elegante',
        description: 'Cerimônia ao ar livre com decoração romântica',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=375&fit=crop'
    },
    {
        id: 2,
        category: 'casamentos',
        title: 'Recepção de Casamento',
        description: 'Salão decorado com flores e luzes',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=375&fit=crop'
    },
    {
        id: 3,
        category: 'aniversarios',
        title: 'Festa de 15 Anos',
        description: 'Decoração temática em tons de rosa',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=375&fit=crop'
    },
    {
        id: 4,
        category: 'aniversarios',
        title: 'Aniversário Infantil',
        description: 'Mesa decorada com tema de princesa',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=375&fit=crop'
    },
    {
        id: 5,
        category: 'corporativos',
        title: 'Evento Corporativo',
        description: 'Conferência empresarial com coffee break',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=375&fit=crop'
    },
    {
        id: 6,
        category: 'corporativos',
        title: 'Lançamento de Produto',
        description: 'Evento de networking e apresentação',
        image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&h=375&fit=crop'
    },
    {
        id: 7,
        category: 'formaturas',
        title: 'Formatura Universitária',
        description: 'Cerimônia de colação de grau',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=375&fit=crop'
    },
    {
        id: 8,
        category: 'formaturas',
        title: 'Festa de Formatura',
        description: 'Celebração pós-cerimônia',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=375&fit=crop'
    }
   
];

function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galeria-grid');
    const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
    
    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="galeria-item" data-category="${item.category}" onclick="openLightbox('${item.image}', '${item.title}', '${item.description}')">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="galeria-overlay">
                <div class="galeria-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Gallery filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
    });
});

// Lightbox functionality
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightbox.style.display = 'block';
    lightboxImg.src = imageSrc;
    lightboxCaption.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside image or on close button
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Scroll animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to service cards
    document.querySelectorAll('.servico-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add slide-in animations to stats
    document.querySelectorAll('.stat').forEach((stat, index) => {
        stat.classList.add('slide-in-left');
        stat.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize gallery
    renderGallery();
    
    // Initial animation check
    handleScrollAnimations();
});

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else if (counter.textContent.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.sobre-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateCounters();
            statsAnimated = true;
        }
    });
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload images for better performance
function preloadImages() {
    galleryData.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
});

