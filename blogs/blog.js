// Blog Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('searchInput');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const tagFilters = document.querySelectorAll('.tag-filter');
    const sortSelect = document.getElementById('sortSelect');
    const viewBtns = document.querySelectorAll('.view-btn');
    const blogGrid = document.getElementById('blogGrid');
    const blogCards = document.querySelectorAll('.blog-card');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');

    let activeCategory = 'all';
    let activeTags = new Set();
    let searchQuery = '';

    // ==========================================
    // VISITOR COUNTER SYSTEM (Persistent)
    // ==========================================
    
    class VisitorCounter {
        constructor() {
            this.visitorsEl = document.getElementById('totalVisitors');
            this.viewsEl = document.getElementById('totalViews');
            this.lastUpdatedEl = document.getElementById('lastUpdated');
            
            // Storage keys
            this.STORAGE_KEY = 'blog_stats';
            
            // Initialize
            this.loadStats();
            this.startHourlyUpdate();
        }
        
        loadStats() {
            // Try to load from localStorage
            const stored = localStorage.getItem(this.STORAGE_KEY);
            
            if (stored) {
                const data = JSON.parse(stored);
                this.visitors = data.visitors || 128;
                this.views = data.views || 456;
                this.lastUpdate = new Date(data.lastUpdate);
                
                // Check if we need to update (hourly check)
                this.checkAndUpdate();
            } else {
                // Initial values
                this.visitors = 12847;
                this.views = 45623;
                this.lastUpdate = new Date();
                this.saveStats();
            }
            
            this.updateDisplay(false);
        }
        
        saveStats() {
            const data = {
                visitors: this.visitors,
                views: this.views,
                lastUpdate: this.lastUpdate.toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        }
        
        checkAndUpdate() {
            const now = new Date();
            const hoursSinceUpdate = (now - this.lastUpdate) / (1000 * 60 * 60);
            
            // If at least 1 hour has passed
            if (hoursSinceUpdate >= 1) {
                const hoursToAdd = Math.floor(hoursSinceUpdate);
                
                // Add 1 visitor per hour that passed
                this.visitors += hoursToAdd;
                
                // Add random 1-10 views per visitor
                for (let i = 0; i < hoursToAdd; i++) {
                    const viewsToAdd = Math.floor(Math.random() * 10) + 1;
                    this.views += viewsToAdd;
                }
                
                this.lastUpdate = now;
                this.saveStats();
                this.updateDisplay(true);
            }
        }
        
        startHourlyUpdate() {
            // Check every minute if an hour has passed
            setInterval(() => {
                this.checkAndUpdate();
                this.updateLastUpdatedTime();
            }, 60000); // Every minute
            
            // Initial update
            this.updateLastUpdatedTime();
        }
        
        updateDisplay(animate = false) {
            if (animate) {
                this.animateCountUpdate(this.visitorsEl, this.visitors);
                this.animateCountUpdate(this.viewsEl, this.views);
            } else {
                this.visitorsEl.textContent = this.formatNumber(this.visitors);
                this.viewsEl.textContent = this.formatNumber(this.views);
            }
        }
        
        animateCountUpdate(element, newValue) {
            element.classList.add('updating');
            
            const oldValue = parseInt(element.textContent.replace(/,/g, ''));
            const duration = 1000;
            const steps = 40;
            const stepValue = (newValue - oldValue) / steps;
            const stepDuration = duration / steps;
            
            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                const currentValue = Math.floor(oldValue + (stepValue * currentStep));
                element.textContent = this.formatNumber(currentValue);
                
                if (currentStep >= steps) {
                    clearInterval(interval);
                    element.textContent = this.formatNumber(newValue);
                    setTimeout(() => {
                        element.classList.remove('updating');
                    }, 100);
                }
            }, stepDuration);
        }
        
        updateLastUpdatedTime() {
            const now = new Date();
            const diff = now - this.lastUpdate;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            
            let timeText;
            if (minutes < 1) {
                timeText = 'Just now';
            } else if (minutes < 60) {
                timeText = `${minutes} min ago`;
            } else if (hours < 24) {
                timeText = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else {
                const days = Math.floor(hours / 24);
                timeText = `${days} day${days > 1 ? 's' : ''} ago`;
            }
            
            this.lastUpdatedEl.textContent = timeText;
        }
        
        formatNumber(num) {
            return num.toLocaleString('en-US');
        }
    }
    
    // Initialize visitor counter
    const visitorCounter = new VisitorCounter();
    
    // ==========================================
    // REST OF THE BLOG FUNCTIONALITY
    // ==========================================

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterAndDisplay();
    });

    // Category Filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            filterAndDisplay();
        });
    });

    // Tag Filter
    tagFilters.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagName = tag.dataset.tag;
            
            if (activeTags.has(tagName)) {
                activeTags.delete(tagName);
                tag.classList.remove('active');
            } else {
                activeTags.add(tagName);
                tag.classList.add('active');
            }
            
            filterAndDisplay();
        });
    });

    // Sort Functionality
    sortSelect.addEventListener('change', (e) => {
        const sortType = e.target.value;
        sortBlogCards(sortType);
    });

    // View Toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                blogGrid.classList.add('list-view');
            } else {
                blogGrid.classList.remove('list-view');
            }
        });
    });

    // Filter and Display Function
    function filterAndDisplay() {
        let visibleCount = 0;

        blogCards.forEach((card, index) => {
            const category = card.dataset.category;
            const tags = card.dataset.tags.split(',');
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

            // Check category
            const categoryMatch = activeCategory === 'all' || category === activeCategory;

            // Check tags
            const tagMatch = activeTags.size === 0 || 
                Array.from(activeTags).every(tag => tags.includes(tag));

            // Check search
            const searchMatch = searchQuery === '' || 
                title.includes(searchQuery) || 
                excerpt.includes(searchQuery) ||
                tags.some(tag => tag.toLowerCase().includes(searchQuery));

            // Show or hide card
            if (categoryMatch && tagMatch && searchMatch) {
                card.style.display = 'block';
                card.classList.add('filtered');
                setTimeout(() => card.classList.remove('filtered'), 300);
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        resultsCount.textContent = visibleCount;

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Sort Function
    function sortBlogCards(sortType) {
        const cardsArray = Array.from(blogCards);

        cardsArray.sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'oldest':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                case 'title':
                    const titleA = a.querySelector('.blog-title').textContent;
                    const titleB = b.querySelector('.blog-title').textContent;
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        cardsArray.forEach(card => blogGrid.appendChild(card));
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            
            // Simulate subscription
            alert(`Thanks for subscribing with ${email}! 🎉`);
            newsletterForm.reset();
        });
    }

    // Blog Card Hover Effects
    blogCards.forEach(card => {
        const glow = card.querySelector('.blog-card-glow');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
        });
    });

    // Smooth scroll to top when navigating
    window.addEventListener('load', () => {
        if (window.location.hash) {
            window.scrollTo(0, 0);
        }
    });

    // Add reading progress indicator (optional enhancement)
    function updateReadingProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.getElementById('reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple));
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press '/' to focus search
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            searchInput.focus();
        }

        // Press 'Escape' to clear search
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchQuery = '';
            filterAndDisplay();
        }
    });

    // Add keyboard shortcut hint
    const searchBar = document.querySelector('.search-bar');
    if (searchBar && !document.querySelector('.search-hint')) {
        const hint = document.createElement('div');
        hint.className = 'search-hint';
        hint.textContent = 'Press / to search';
        hint.style.cssText = `
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.75rem;
            color: var(--text-secondary);
            opacity: 0.5;
            pointer-events: none;
        `;
        searchBar.appendChild(hint);

        searchInput.addEventListener('focus', () => hint.style.display = 'none');
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value) hint.style.display = 'block';
        });
    }

    // Analytics (placeholder - integrate with your analytics service)
    function trackBlogClick(postTitle) {
        console.log('Blog post clicked:', postTitle);
        // Add your analytics tracking here
        // Example: gtag('event', 'blog_post_click', { post_title: postTitle });
    }

    blogCards.forEach(card => {
        const link = card.querySelector('.blog-link');
        if (link) {
            link.addEventListener('click', () => {
                const title = card.querySelector('.blog-title').textContent;
                trackBlogClick(title);
            });
        }
    });

    // Add active state to current category based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const categoryBtn = document.querySelector(`[data-category="${categoryParam}"]`);
        if (categoryBtn) {
            categoryBtns.forEach(b => b.classList.remove('active'));
            categoryBtn.classList.add('active');
            activeCategory = categoryParam;
            filterAndDisplay();
        }
    }

    console.log('%c📝 Blog Page Loaded', 'font-size: 16px; color: #00d9ff; font-weight: bold;');
    console.log('%cKeyboard shortcuts:', 'font-size: 12px; color: #a1a1aa;');
    console.log('%c  / : Focus search', 'font-size: 12px; color: #a1a1aa;');
    console.log('%c  ESC : Clear search', 'font-size: 12px; color: #a1a1aa;');
});