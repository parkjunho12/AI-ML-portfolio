// Matrix Canvas Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "01アイエンジニアMLOPS";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00d9ff';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Neural Network Connection Drawing
function drawNeuralConnections() {
    const svg = document.querySelector('.network-svg');
    const connectionsGroup = svg.querySelector('.connections');
    
    const inputNodes = [
        {cx: 50, cy: 100},
        {cx: 50, cy: 160},
        {cx: 50, cy: 220},
        {cx: 50, cy: 280}
    ];
    
    const hidden1Nodes = [
        {cx: 150, cy: 80},
        {cx: 150, cy: 140},
        {cx: 150, cy: 200},
        {cx: 150, cy: 260},
        {cx: 150, cy: 320}
    ];
    
    const hidden2Nodes = [
        {cx: 250, cy: 100},
        {cx: 250, cy: 160},
        {cx: 250, cy: 220},
        {cx: 250, cy: 280}
    ];
    
    const outputNodes = [
        {cx: 350, cy: 160},
        {cx: 350, cy: 220}
    ];
    
    // Draw connections
    function createConnection(from, to, delay = 0) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.cx);
        line.setAttribute('y1', from.cy);
        line.setAttribute('x2', to.cx);
        line.setAttribute('y2', to.cy);
        line.setAttribute('class', 'connection');
        line.style.animationDelay = delay + 's';
        connectionsGroup.appendChild(line);
    }
    
    let delay = 0;
    
    // Input to Hidden1
    inputNodes.forEach((input, i) => {
        hidden1Nodes.forEach((hidden, j) => {
            createConnection(input, hidden, delay);
            delay += 0.05;
        });
    });
    
    // Hidden1 to Hidden2
    hidden1Nodes.forEach((h1, i) => {
        hidden2Nodes.forEach((h2, j) => {
            createConnection(h1, h2, delay);
            delay += 0.05;
        });
    });
    
    // Hidden2 to Output
    hidden2Nodes.forEach((h2, i) => {
        outputNodes.forEach((output, j) => {
            createConnection(h2, output, delay);
            delay += 0.05;
        });
    });
}

drawNeuralConnections();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate icon
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.blog-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navbar Background on Scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Blog Card Glow Effect Follow Mouse
document.querySelectorAll('.blog-card').forEach(card => {
    const glow = card.querySelector('.blog-card-glow');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });
});

// Typing Effect for Hero Subtitle
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Terminal Code Animation
const terminalCode = document.querySelector('.terminal-body code');
if (terminalCode) {
    const codeLines = terminalCode.innerHTML.split('\n');
    terminalCode.innerHTML = '';
    
    let lineIndex = 0;
    function addLine() {
        if (lineIndex < codeLines.length) {
            const line = document.createElement('div');
            line.innerHTML = codeLines[lineIndex];
            line.style.opacity = '0';
            line.style.animation = 'fadeIn 0.3s ease forwards';
            terminalCode.appendChild(line);
            lineIndex++;
            setTimeout(addLine, 200);
        }
    }
    
    // Observe terminal to start animation when visible
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && lineIndex === 0) {
                setTimeout(addLine, 500);
            }
        });
    }, { threshold: 0.5 });
    
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminalObserver.observe(terminal);
    }
}

// Add cursor pulse to contact links
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.cursor = 'pointer';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Activate special effect
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

class VisitorCounter {
    constructor() {
        this.visitorsEl = document.getElementById('totalVisitors');
        this.viewsEl = document.getElementById('totalViews');
        this.lastUpdatedEl = document.getElementById('lastUpdated');
        
        // API endpoint
        this.API_URL = '/api';
        
        // Check if this is first visit in this session
        this.hasTracked = sessionStorage.getItem('visit_tracked');
        
        // Initialize
        this.init();
    }
    
    async init() {
        // Get current stats
        await this.loadStats();
        
        // Track visit only once per session
        if (!this.hasTracked) {
            await this.trackVisit();
            sessionStorage.setItem('visit_tracked', 'true');
        } else {
            await this.trackView();
        }
        
        // Update time display
        setInterval(() => this.updateTime(), 30000);
        this.updateTime();
    }
    
    async trackVisit() {
        try {
            const response = await fetch(`${this.API_URL}/visit`, {
                method: 'POST'
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.updateDisplay(data.visitors, data.views, true);
                    console.log('✅ Visit tracked');
                }
            }
        } catch (error) {
            console.log('⚠️ Using fallback mode');
            this.useFallback();
        }
    }
    
    async trackView() {
        try {
            const response = await fetch(`${this.API_URL}/view`, {
                method: 'POST'
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.updateDisplay(data.visitors, data.views, true);
                    console.log('✅ View tracked');
                }
            }
        } catch (error) {
            console.log('⚠️ Using fallback mode');
            this.useFallback();
        }
    }

    
    async loadStats() {
        try {
            const response = await fetch(`${this.API_URL}/stats`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.updateDisplay(data.visitors, data.views, false);
                }
            }
        } catch (error) {
            this.useFallback();
        }
    }
    
    useFallback() {
        // Fallback: show static numbers
        const visitors = 1284;
        const views = 4562;
        this.updateDisplay(visitors, views, false);
    }
    
    updateDisplay(visitors, views, animate) {
        if (animate) {
            this.animateCount(this.visitorsEl, visitors);
            this.animateCount(this.viewsEl, views);
        } else {
            this.visitorsEl.textContent = this.formatNumber(visitors);
            this.viewsEl.textContent = this.formatNumber(views);
        }
    }
    
    animateCount(element, newValue) {
        const oldValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const duration = 1000;
        const steps = 30;
        const increment = (newValue - oldValue) / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current++;
            const value = Math.floor(oldValue + (increment * current));
            element.textContent = this.formatNumber(value);
            
            if (current >= steps) {
                clearInterval(timer);
                element.textContent = this.formatNumber(newValue);
            }
        }, duration / steps);
    }
    
    updateTime() {
        this.lastUpdatedEl.textContent = 'Just now';
    }
    
    formatNumber(num) {
        return num.toLocaleString('en-US');
    }
}

const visitorCounter = new VisitorCounter();

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('%c🚀 Welcome to Applied AI Engineer Blog!', 'font-size: 20px; color: #00d9ff; font-weight: bold;');
console.log('%cBuilt with passion for AI and beautiful code', 'font-size: 14px; color: #a1a1aa;');
console.log('%cTry the Konami code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #00ff88;');

