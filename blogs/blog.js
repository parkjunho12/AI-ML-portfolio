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
    // LIVE VISITOR TRACKING SYSTEM
    // ==========================================
    
    class VisitorTracker {
        constructor() {
            this.liveViewersEl = document.getElementById('liveViewers');
            this.viewerBarEl = document.getElementById('viewerBar');
            this.todayEl = document.getElementById('todayVisitors');
            this.weekEl = document.getElementById('weekVisitors');
            this.monthEl = document.getElementById('monthVisitors');
            this.totalEl = document.getElementById('totalViews');
            
            // Get server time (simulated with local time)
            this.serverTime = new Date();
            
            // Initialize base numbers based on time of day
            this.initializeBaseNumbers();
            
            // Start tracking
            this.startTracking();
        }
        
        initializeBaseNumbers() {
            const hour = this.serverTime.getHours();
            const dayOfWeek = this.serverTime.getDay();
            const dayOfMonth = this.serverTime.getDate();
            
            // Base numbers that make sense
            this.baseTotal = 45000 + Math.floor(Math.random() * 5000);
            this.baseMonth = 12000 + Math.floor(Math.random() * 2000);
            this.baseWeek = 2800 + Math.floor(Math.random() * 400);
            
            // Today's visitors vary by time
            // Peak hours: 9-11am and 2-5pm
            let todayMultiplier;
            if (hour >= 9 && hour <= 11) {
                todayMultiplier = 0.8 + Math.random() * 0.3; // High traffic
            } else if (hour >= 14 && hour <= 17) {
                todayMultiplier = 0.7 + Math.random() * 0.3; // High traffic
            } else if (hour >= 6 && hour <= 8) {
                todayMultiplier = 0.4 + Math.random() * 0.2; // Morning build-up
            } else if (hour >= 18 && hour <= 22) {
                todayMultiplier = 0.5 + Math.random() * 0.2; // Evening traffic
            } else {
                todayMultiplier = 0.1 + Math.random() * 0.2; // Night/early morning
            }
            
            this.baseToday = Math.floor(450 * todayMultiplier);
            
            // Live viewers based on time
            let liveMultiplier;
            if (hour >= 9 && hour <= 11 || hour >= 14 && hour <= 17) {
                liveMultiplier = 0.7 + Math.random() * 0.5; // Peak: 12-20 viewers
            } else if (hour >= 6 && hour <= 8 || hour >= 18 && hour <= 22) {
                liveMultiplier = 0.4 + Math.random() * 0.3; // Medium: 7-12 viewers
            } else {
                liveMultiplier = 0.1 + Math.random() * 0.2; // Low: 2-5 viewers
            }
            
            this.currentLive = Math.floor(15 * liveMultiplier) + 2;
            
            // Set initial values
            this.updateDisplay(false);
        }
        
        startTracking() {
            // Update live viewers every 3-8 seconds
            setInterval(() => this.updateLiveViewers(), 3000 + Math.random() * 5000);
            
            // Update today's count every 20-40 seconds
            setInterval(() => this.updateTodayCount(), 20000 + Math.random() * 20000);
            
            // Update week count every 2-5 minutes
            setInterval(() => this.updateWeekCount(), 120000 + Math.random() * 180000);
            
            // Update month/total less frequently (5-10 minutes)
            setInterval(() => this.updateLongTermCounts(), 300000 + Math.random() * 300000);
            
            // Gradual increase simulation throughout the day
            setInterval(() => this.gradualIncrease(), 60000); // Every minute
        }
        
        updateLiveViewers() {
            const hour = new Date().getHours();
            
            // Determine change direction and magnitude
            let change;
            if (hour >= 9 && hour <= 17) {
                // Peak hours: mostly increase
                change = Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : -Math.floor(Math.random() * 2);
            } else if (hour >= 6 && hour <= 8 || hour >= 18 && hour <= 22) {
                // Medium hours: balanced
                change = Math.random() > 0.5 ? Math.floor(Math.random() * 2) + 1 : -Math.floor(Math.random() * 2);
            } else {
                // Off hours: mostly decrease or stay
                change = Math.random() > 0.7 ? 1 : -Math.floor(Math.random() * 2);
            }
            
            this.currentLive = Math.max(1, Math.min(25, this.currentLive + change));
            
            // Update display with animation
            this.liveViewersEl.classList.add('updating');
            this.liveViewersEl.textContent = this.currentLive;
            
            // Update bar
            const percentage = (this.currentLive / 25) * 100;
            this.viewerBarEl.style.width = percentage + '%';
            
            setTimeout(() => this.liveViewersEl.classList.remove('updating'), 500);
        }
        
        updateTodayCount() {
            // Increment today's count (1-3 new visitors)
            const increment = Math.floor(Math.random() * 3) + 1;
            this.baseToday += increment;
            
            this.animateCountUpdate(this.todayEl, this.baseToday);
        }
        
        updateWeekCount() {
            // Increment week count
            const increment = Math.floor(Math.random() * 5) + 3;
            this.baseWeek += increment;
            
            this.animateCountUpdate(this.weekEl, this.baseWeek);
        }
        
        updateLongTermCounts() {
            // Increment month and total
            const monthIncrement = Math.floor(Math.random() * 10) + 5;
            const totalIncrement = Math.floor(Math.random() * 15) + 8;
            
            this.baseMonth += monthIncrement;
            this.baseTotal += totalIncrement;
            
            this.animateCountUpdate(this.monthEl, this.baseMonth);
            this.animateCountUpdate(this.totalEl, this.baseTotal);
        }
        
        gradualIncrease() {
            // Small increments every minute to simulate continuous traffic
            const hour = new Date().getHours();
            
            if (hour >= 6 && hour <= 23) {
                this.baseToday += Math.random() > 0.5 ? 1 : 0;
                this.baseWeek += Math.random() > 0.7 ? 1 : 0;
                this.baseMonth += Math.random() > 0.8 ? 1 : 0;
                this.baseTotal += Math.random() > 0.6 ? 1 : 0;
                
                this.updateDisplay(false);
            }
        }
        
        animateCountUpdate(element, newValue) {
            element.classList.add('updating');
            
            // Counter animation
            const oldValue = parseInt(element.textContent.replace(/,/g, ''));
            const duration = 800;
            const steps = 30;
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
                    element.classList.remove('updating');
                }
            }, stepDuration);
        }
        
        updateDisplay(animate = true) {
            if (animate) {
                this.animateCountUpdate(this.liveViewersEl, this.currentLive);
                this.animateCountUpdate(this.todayEl, this.baseToday);
                this.animateCountUpdate(this.weekEl, this.baseWeek);
                this.animateCountUpdate(this.monthEl, this.baseMonth);
                this.animateCountUpdate(this.totalEl, this.baseTotal);
            } else {
                this.liveViewersEl.textContent = this.currentLive;
                this.todayEl.textContent = this.formatNumber(this.baseToday);
                this.weekEl.textContent = this.formatNumber(this.baseWeek);
                this.monthEl.textContent = this.formatNumber(this.baseMonth);
                this.totalEl.textContent = this.formatNumber(this.baseTotal);
            }
            
            // Update bar
            const percentage = (this.currentLive / 25) * 100;
            this.viewerBarEl.style.width = percentage + '%';
        }
        
        formatNumber(num) {
            return num.toLocaleString('en-US');
        }
    }
    
    // Initialize visitor tracker
    const visitorTracker = new VisitorTracker();
    
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