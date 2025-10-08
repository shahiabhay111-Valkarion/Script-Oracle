// Script Oracle Frontend Implementation - Fixed Version
class ScriptOracle {
    constructor() {
        this.currentPage = 'landing';
        this.navExpanded = true;
        this.cursorTrail = [];
        this.mockData = this.initializeMockData();
        this.animations = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeSplashScreen();
        this.initializeNavigation();
        this.initializeCursorTrail();
        this.initializeCosmicBackground();
        this.initializeTensorFlowOrb();
        this.initializeAnimations();
        this.initializeDashboard();
        this.initializeHeatmap();
        this.initializeBadges();
        this.initializeThemeToggle();
        this.startRealTimeUpdates();
    }

    initializeMockData() {
        return {
            user: {
                name: "Arihant Jain",
                level: 8,
                xp: 15420,
                nextLevelXp: 20000,
                streak: 7,
                badges: 12,
                guild: "Cosmic Debuggers",
                rank: 3
            },
            activeRuns: [
                {
                    id: 1,
                    name: "Security Analysis",
                    status: "running",
                    progress: 67,
                    timeElapsed: "00:15:32"
                },
                {
                    id: 2,
                    name: "Test Generation", 
                    status: "completed",
                    progress: 100,
                    timeElapsed: "00:08:45"
                },
                {
                    id: 3,
                    name: "Code Review",
                    status: "pending",
                    progress: 0,
                    timeElapsed: "00:00:00"
                }
            ],
            recentActivity: [
                {
                    type: "badge",
                    message: "Earned 'Bug Slayer' badge",
                    timestamp: "2 hours ago",
                    icon: "🏆"
                },
                {
                    type: "xp", 
                    message: "Gained 250 XP from debug session",
                    timestamp: "3 hours ago",
                    icon: "⭐"
                },
                {
                    type: "streak",
                    message: "Maintained 7-day streak",
                    timestamp: "1 day ago",
                    icon: "🔥"
                }
            ],
            badges: [
                {
                    id: "bug-slayer",
                    name: "Bug Slayer",
                    description: "Fixed 100 critical bugs",
                    icon: "🐛",
                    rarity: "legendary",
                    unlocked: true,
                    progress: 100
                },
                {
                    id: "speed-demon",
                    name: "Speed Demon", 
                    description: "Completed 10 sessions under 5 minutes",
                    icon: "⚡",
                    rarity: "epic",
                    unlocked: true,
                    progress: 100
                },
                {
                    id: "streak-keeper",
                    name: "Streak Keeper",
                    description: "Maintained 7-day debugging streak",
                    icon: "🔥",
                    rarity: "rare",
                    unlocked: true,
                    progress: 100
                },
                {
                    id: "cosmic-debugger",
                    name: "Cosmic Debugger",
                    description: "Reach Level 10",
                    icon: "🏆",
                    rarity: "legendary",
                    unlocked: false,
                    progress: 80,
                    requirement: "Level 8/10"
                },
                {
                    id: "guild-master",
                    name: "Guild Master",
                    description: "Reach #1 in guild leaderboard",
                    icon: "🌟",
                    rarity: "mythic",
                    unlocked: false,
                    progress: 33,
                    requirement: "Current: #3"
                },
                {
                    id: "precision-strike",
                    name: "Precision Strike",
                    description: "100% accuracy on 50 fixes",
                    icon: "🎯",
                    rarity: "epic",
                    unlocked: false,
                    progress: 32,
                    requirement: "16/50"
                }
            ]
        };
    }

    setupEventListeners() {
        // Enhanced navigation events
        document.addEventListener('click', (e) => {
            // Navigation item clicks
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                e.preventDefault();
                const page = navItem.dataset.page;
                if (page) {
                    this.switchPage(page);
                    console.log('Switching to page:', page);
                }
                return;
            }

            // Settings menu clicks
            const settingsItem = e.target.closest('.settings-item');
            if (settingsItem) {
                e.preventDefault();
                this.switchSettingsSection(settingsItem);
                return;
            }
        });

        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNavigation();
            });
        }

        // CTA button
        const ctaButton = document.getElementById('launch-oracle');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.addElectricEffect(ctaButton);
                setTimeout(() => this.switchPage('dashboard'), 500);
            });
        }

        // Console actions
        const executeButton = document.getElementById('execute-code');
        if (executeButton) {
            executeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.executeCode();
            });
        }

        const saveButton = document.getElementById('save-session');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.addNotification('Session saved successfully!', 'success');
            });
        }

        // Mobile navigation
        this.setupMobileNavigation();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.badge-modal, .heatmap-tooltip');
                if (modal) {
                    modal.remove();
                }
            }
        });
    }

    setupMobileNavigation() {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        
        const handleMobile = (e) => {
            const nav = document.querySelector('.navigation');
            if (e.matches) {
                nav.classList.add('mobile');
                this.navExpanded = false;
            } else {
                nav.classList.remove('mobile');
                this.navExpanded = true;
            }
        };
        
        mediaQuery.addListener(handleMobile);
        handleMobile(mediaQuery);

        // Handle clicks outside navigation on mobile
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.navigation');
            const navToggle = document.getElementById('nav-toggle');
            
            if (window.innerWidth <= 1024) {
                if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                    nav.classList.remove('mobile-open');
                }
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchPage('landing');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchPage('dashboard');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchPage('console');
                        break;
                    case '4':
                        e.preventDefault();
                        this.switchPage('heatmap');
                        break;
                    case '5':
                        e.preventDefault();
                        this.switchPage('badges');
                        break;
                    case 'Enter':
                        if (this.currentPage === 'console') {
                            e.preventDefault();
                            this.executeCode();
                        }
                        break;
                }
            }
        });
    }

    initializeSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        if (!splashScreen) return;

        // Decrypted text animation
        this.animateDecryptedText();
        
        // Auto-hide splash after 3 seconds
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 3000);
    }

    animateDecryptedText() {
        const decryptedText = document.querySelector('.decrypted-text');
        if (!decryptedText) return;

        const originalText = decryptedText.dataset.text || 'INITIALIZING ORACLE';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let iterations = 0;

        const interval = setInterval(() => {
            decryptedText.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 50);
    }

    initializeNavigation() {
        this.updateActiveNavItem();
        
        // Ensure navigation is visible
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            navigation.style.display = 'block';
        }
    }

    updateActiveNavItem() {
        document.querySelectorAll('.nav-item').forEach(item => {
            const isActive = item.dataset.page === this.currentPage;
            item.classList.toggle('active', isActive);
        });
    }

    toggleNavigation() {
        const nav = document.querySelector('.navigation');
        
        if (window.innerWidth <= 1024) {
            // Mobile toggle
            nav.classList.toggle('mobile-open');
        } else {
            // Desktop collapse/expand
            this.navExpanded = !this.navExpanded;
            nav.classList.toggle('collapsed', !this.navExpanded);
        }
    }

    switchPage(pageName) {
        console.log('Switching to page:', pageName);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
            this.updateActiveNavItem();
            
            // Page-specific initialization
            this.initializePage(pageName);
            
            // Close mobile navigation
            if (window.innerWidth <= 1024) {
                const nav = document.querySelector('.navigation');
                nav.classList.remove('mobile-open');
            }
            
            console.log('Page switched successfully to:', pageName);
        } else {
            console.error('Page not found:', `${pageName}-page`);
        }
    }

    switchSettingsSection(clickedItem) {
        const href = clickedItem.getAttribute('href');
        if (!href) return;
        
        const sectionId = href.substring(1);
        
        // Update active menu item
        document.querySelectorAll('.settings-item').forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
        
        // Show corresponding section
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${sectionId}-settings`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    initializePage(pageName) {
        switch (pageName) {
            case 'landing':
                this.initializeTensorFlowOrb();
                break;
            case 'dashboard':
                this.refreshDashboard();
                break;
            case 'console':
                this.initializeConsole();
                break;
            case 'heatmap':
                this.generateHeatmap();
                break;
            case 'badges':
                this.animateBadges();
                break;
        }
    }

    initializeCursorTrail() {
        const trailContainer = document.getElementById('cursor-trail');
        if (!trailContainer) {
            // Create cursor trail container if it doesn't exist
            const container = document.createElement('div');
            container.id = 'cursor-trail';
            document.body.appendChild(container);
        }

        const colors = ['#5227ff', '#12c2e9', '#ff6ec7'];
        let colorIndex = 0;
        let lastTime = 0;

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTime < 50) return; // Throttle to 20fps
            lastTime = now;

            const container = document.getElementById('cursor-trail');
            if (!container) return;

            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.background = colors[colorIndex % colors.length];
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            container.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
            
            colorIndex++;
            
            // Clean up old particles
            if (container.children.length > 20) {
                const oldParticle = container.firstChild;
                if (oldParticle) {
                    container.removeChild(oldParticle);
                }
            }
        });
    }

    initializeCosmicBackground() {
        const canvas = document.getElementById('cosmic-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Cosmic particles
        const particles = [];
        const particleCount = 50;

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: ['#5227ff', '#12c2e9', '#ff6ec7'][Math.floor(Math.random() * 3)]
            });
        }

        let animationId;
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                
                // Draw connections to nearby particles
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (80 - distance) / 80 * 0.1;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Store animation ID for cleanup
        this.cosmicAnimationId = animationId;
    }

    initializeTensorFlowOrb() {
        const orb = document.querySelector('.tensorflow-orb');
        if (!orb) return;

        // Enhanced mouse interaction
        orb.addEventListener('mousemove', (e) => {
            const rect = orb.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const angle = Math.atan2(mouseY, mouseX);
            const distance = Math.min(Math.sqrt(mouseX * mouseX + mouseY * mouseY), 50);
            
            const offsetX = Math.cos(angle) * distance * 0.1;
            const offsetY = Math.sin(angle) * distance * 0.1;
            
            const orbCore = orb.querySelector('.orb-core');
            if (orbCore) {
                orbCore.style.transition = 'transform 0.3s ease-out';
                orbCore.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
            }
            
            // Also affect the rings
            const rings = orb.querySelectorAll('.orb-ring');
            rings.forEach((ring, index) => {
                const ringOffset = offsetX * (0.5 - index * 0.1);
                ring.style.transform = `translate(calc(-50% + ${ringOffset}px), -50%)`;
            });
        });

        orb.addEventListener('mouseleave', () => {
            const orbCore = orb.querySelector('.orb-core');
            const rings = orb.querySelectorAll('.orb-ring');
            
            if (orbCore) {
                orbCore.style.transition = 'transform 0.5s ease-out';
                orbCore.style.transform = 'translate(-50%, -50%)';
            }
            
            rings.forEach(ring => {
                ring.style.transform = 'translate(-50%, -50%)';
            });
        });

        // Add click interaction for orb
        orb.addEventListener('click', () => {
            this.addElectricEffect(orb);
            setTimeout(() => this.switchPage('dashboard'), 300);
        });
    }

    initializeAnimations() {
        // Electric border animation
        this.setupElectricBorders();
        
        // XP progress animation
        this.animateXPProgress();
        
        // Badge glow effects
        this.setupBadgeGlows();
    }

    setupElectricBorders() {
        document.querySelectorAll('.electric-border').forEach(border => {
            border.style.backgroundSize = '400% 400%';
        });
    }

    animateXPProgress() {
        const xpFill = document.querySelector('.xp-fill');
        if (xpFill) {
            const progress = this.mockData.user.xp / this.mockData.user.nextLevelXp * 100;
            xpFill.style.width = '0%';
            
            setTimeout(() => {
                xpFill.style.transition = 'width 2s cubic-bezier(0.23, 1, 0.32, 1)';
                xpFill.style.width = progress + '%';
            }, 500);
        }
    }

    setupBadgeGlows() {
        document.querySelectorAll('.badge-card.unlocked').forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                this.addBadgeGlow(badge);
            });
        });
    }

    addBadgeGlow(badge) {
        const glow = badge.querySelector('.badge-glow');
        if (glow) {
            glow.style.animation = 'badge-constellation 4s ease-in-out infinite';
        }
    }

    addElectricEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(255, 110, 199, 0.8)';
        element.style.transform = 'translateY(-2px) scale(1.05)';
        
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 300);
    }

    initializeDashboard() {
        this.updateDashboardStats();
        this.updateActiveRuns();
        this.updateRecentActivity();
    }

    updateDashboardStats() {
        const stats = [
            { selector: '.stat-card:nth-child(1) .stat-value', value: this.mockData.user.xp.toLocaleString() },
            { selector: '.stat-card:nth-child(2) .stat-value', value: this.mockData.user.streak },
            { selector: '.stat-card:nth-child(3) .stat-value', value: this.mockData.user.badges },
            { selector: '.stat-card:nth-child(4) .stat-value', value: `#${this.mockData.user.rank}` }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.selector);
            if (element) {
                this.animateNumber(element, stat.value);
            }
        });
    }

    animateNumber(element, targetValue) {
        const isNumeric = typeof targetValue === 'number' || /^\d+$/.test(targetValue);
        if (!isNumeric) {
            element.textContent = targetValue;
            return;
        }

        const numericValue = parseInt(targetValue.toString().replace(/,/g, ''));
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(numericValue * progress);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    updateActiveRuns() {
        const runsList = document.querySelector('.runs-list');
        if (!runsList) return;

        runsList.innerHTML = '';
        
        this.mockData.activeRuns.forEach(run => {
            const runElement = document.createElement('div');
            runElement.className = `run-item ${run.status}`;
            
            let statusIcon = '';
            let statusContent = '';
            
            switch (run.status) {
                case 'running':
                    statusIcon = '▶️';
                    statusContent = `
                        <div class="run-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${run.progress}%"></div>
                            </div>
                            <span>${run.progress}% • ${run.timeElapsed}</span>
                        </div>
                    `;
                    break;
                case 'completed':
                    statusIcon = '✅';
                    statusContent = `<div class="run-status">Completed • ${run.timeElapsed}</div>`;
                    break;
                case 'pending':
                    statusIcon = '⏳';
                    statusContent = `<div class="run-status">Queued</div>`;
                    break;
            }
            
            runElement.innerHTML = `
                <div class="run-icon">${statusIcon}</div>
                <div class="run-info">
                    <div class="run-name">${run.name}</div>
                    ${statusContent}
                </div>
            `;
            
            runsList.appendChild(runElement);
        });
    }

    updateRecentActivity() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        activityList.innerHTML = '';
        
        this.mockData.recentActivity.forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'activity-item';
            
            activityElement.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    ${activity.icon}
                </div>
                <div class="activity-content">
                    <span>${activity.message}</span>
                    <time>${activity.timestamp}</time>
                </div>
            `;
            
            activityList.appendChild(activityElement);
        });
    }

    refreshDashboard() {
        this.updateDashboardStats();
        this.updateActiveRuns();
        this.updateRecentActivity();
        this.animateXPProgress();
    }

    initializeConsole() {
        const codeEditor = document.getElementById('code-editor');
        if (codeEditor) {
            // Add syntax highlighting simulation
            this.applySyntaxHighlighting(codeEditor);
        }
    }

    applySyntaxHighlighting(editor) {
        // Simple syntax highlighting simulation
        const content = editor.textContent;
        const highlightedContent = content
            .replace(/(def|class|import|from|if|else|for|while|try|except|return)/g, '<span style="color: #5227ff;">$1</span>')
            .replace(/(#.*$)/gm, '<span style="color: #10b981;">$1</span>')
            .replace(/(".*?"|'.*?')/g, '<span style="color: #f59e0b;">$1</span>');
        
        // Note: In a real implementation, you'd use Monaco Editor or similar
    }

    executeCode() {
        const outputContainer = document.querySelector('.execution-output');
        if (!outputContainer) return;

        // Clear any existing AI suggestions
        const existingSuggestions = outputContainer.querySelectorAll('.ai-suggestion');
        existingSuggestions.forEach(suggestion => suggestion.remove());

        // Add execution output
        const newOutput = document.createElement('div');
        newOutput.className = 'output-line';
        
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        newOutput.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="output-text">🚀 Executing code analysis...</span>
        `;
        
        outputContainer.appendChild(newOutput);
        
        // Simulate analysis steps
        setTimeout(() => {
            this.addExecutionStep(outputContainer, 'Scanning for performance issues...');
        }, 1000);
        
        setTimeout(() => {
            this.addExecutionStep(outputContainer, '✓ Found 2 optimization opportunities', 'success');
        }, 2000);
        
        setTimeout(() => {
            this.addExecutionStep(outputContainer, '⚠ Nested loop complexity detected', 'warning');
        }, 2500);
        
        // Simulate AI suggestion after execution
        setTimeout(() => {
            this.addAISuggestion(outputContainer);
        }, 3000);
        
        // Auto-scroll to bottom
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    addExecutionStep(container, message, type = '') {
        const stepOutput = document.createElement('div');
        stepOutput.className = `output-line ${type}`;
        
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        stepOutput.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="output-text">${message}</span>
        `;
        
        container.appendChild(stepOutput);
        container.scrollTop = container.scrollHeight;
    }

    addAISuggestion(container) {
        const suggestion = document.createElement('div');
        suggestion.className = 'ai-suggestion';
        suggestion.style.opacity = '0';
        suggestion.style.transform = 'translateY(20px)';
        
        const suggestions = [
            'Consider using list comprehension for better performance',
            'Replace nested loops with numpy operations', 
            'Add error handling for edge cases',
            'Optimize database queries with indexing',
            'Use caching to reduce API calls',
            'Consider async/await for I/O operations',
            'Implement connection pooling for database calls'
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        suggestion.innerHTML = `
            <div class="suggestion-header">🤖 AI Suggestion</div>
            <div class="suggestion-content">${randomSuggestion}</div>
            <div class="suggestion-actions">
                <button class="btn btn-sm btn-primary">Apply Fix</button>
                <button class="btn btn-sm btn-secondary">Ignore</button>
            </div>
        `;
        
        container.appendChild(suggestion);
        
        // Animate in
        setTimeout(() => {
            suggestion.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            suggestion.style.opacity = '1';
            suggestion.style.transform = 'translateY(0)';
        }, 100);
        
        // Add event listeners to buttons
        suggestion.querySelector('.btn-primary').addEventListener('click', () => {
            this.applyAIFix(suggestion);
        });
        
        suggestion.querySelector('.btn-secondary').addEventListener('click', () => {
            this.dismissSuggestion(suggestion);
        });
        
        container.scrollTop = container.scrollHeight;
    }

    applyAIFix(suggestion) {
        suggestion.style.background = 'rgba(16, 185, 129, 0.1)';
        suggestion.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        suggestion.querySelector('.suggestion-header').innerHTML = '✅ Fix Applied';
        suggestion.querySelector('.suggestion-actions').style.display = 'none';
        
        this.addNotification('AI suggestion applied successfully!', 'success');
    }

    dismissSuggestion(suggestion) {
        suggestion.style.transition = 'all 0.3s ease-out';
        suggestion.style.opacity = '0';
        suggestion.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (suggestion.parentNode) {
                suggestion.parentNode.removeChild(suggestion);
            }
        }, 300);
    }

    initializeHeatmap() {
        this.generateHeatmap();
    }

    generateHeatmap() {
        const heatmapGrid = document.querySelector('.heatmap-grid');
        if (!heatmapGrid) return;

        heatmapGrid.innerHTML = '';
        
        // Generate 365 days of data (53 weeks * 7 days)  
        for (let week = 0; week < 53; week++) {
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                // Random activity level (0-4) with more realistic distribution
                const level = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4) + 1;
                cell.dataset.level = level;
                cell.dataset.date = this.getDateForCell(week, day);
                
                // Style based on level
                const opacity = level === 0 ? 0.1 : level * 0.25;
                cell.style.background = level === 0 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : `rgba(82, 39, 255, ${opacity})`;
                cell.style.width = '12px';
                cell.style.height = '12px';
                cell.style.borderRadius = '2px';
                cell.style.cursor = 'pointer';
                cell.style.transition = 'all 0.2s ease';
                
                // Enhanced hover effect
                cell.addEventListener('mouseenter', (e) => {
                    e.target.style.transform = 'scale(1.2)';
                    e.target.style.zIndex = '100';
                    this.showHeatmapTooltip(cell, level);
                });
                
                cell.addEventListener('mouseleave', (e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.zIndex = '1';
                    this.hideHeatmapTooltip();
                });
                
                heatmapGrid.appendChild(cell);
            }
        }
    }

    getDateForCell(week, day) {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const dayOfYear = week * 7 + day;
        const date = new Date(startOfYear.getTime() + dayOfYear * 24 * 60 * 60 * 1000);
        return date.toLocaleDateString();
    }

    showHeatmapTooltip(cell, level) {
        this.hideHeatmapTooltip(); // Remove any existing tooltip
        
        const tooltip = document.createElement('div');
        tooltip.className = 'heatmap-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(17, 19, 32, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 10000;
            pointer-events: none;
            border: 1px solid rgba(82, 39, 255, 0.3);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        const sessions = level * Math.floor(Math.random() * 5) + Math.floor(Math.random() * 3);
        const activityText = level === 0 ? 'No activity' : `${sessions} debugging session${sessions !== 1 ? 's' : ''}`;
        
        tooltip.innerHTML = `
            <div style="font-weight: 600;">${activityText}</div>
            <div style="color: rgba(255, 255, 255, 0.7); font-size: 0.75rem; margin-top: 2px;">${cell.dataset.date}</div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = cell.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;
        
        // Keep tooltip within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        
        this.currentTooltip = tooltip;
    }

    hideHeatmapTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    initializeBadges() {
        this.renderBadges();
    }

    renderBadges() {
        const badgesGrid = document.querySelector('.badges-grid');
        if (!badgesGrid) return;

        badgesGrid.innerHTML = '';
        
        this.mockData.badges.forEach((badge, index) => {
            const badgeCard = document.createElement('div');
            badgeCard.className = `badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`;
            badgeCard.dataset.badge = badge.id;
            badgeCard.style.opacity = '0';
            badgeCard.style.transform = 'translateY(30px)';
            
            let progressContent = '';
            if (!badge.unlocked && badge.progress !== undefined) {
                if (badge.progress > 0) {
                    progressContent = `
                        <div class="badge-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${badge.progress}%"></div>
                            </div>
                            <span>${badge.requirement || `${badge.progress}%`}</span>
                        </div>
                    `;
                } else {
                    progressContent = `
                        <div class="badge-progress">
                            <span>${badge.requirement || 'Locked'}</span>
                        </div>
                    `;
                }
            }
            
            badgeCard.innerHTML = `
                ${badge.unlocked ? '<div class="badge-glow"></div>' : ''}
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
                ${badge.unlocked ? `<div class="badge-rarity ${badge.rarity}">${badge.rarity}</div>` : ''}
                ${progressContent}
            `;
            
            badgesGrid.appendChild(badgeCard);
            
            // Add click handler for unlocked badges
            if (badge.unlocked) {
                badgeCard.addEventListener('click', () => {
                    this.showBadgeDetails(badge);
                });
                badgeCard.style.cursor = 'pointer';
            }
            
            // Animate in with stagger
            setTimeout(() => {
                badgeCard.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                badgeCard.style.opacity = '1';
                badgeCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateBadges() {
        // Re-animate all badges when page is visited
        const badgeCards = document.querySelectorAll('.badge-card');
        badgeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showBadgeDetails(badge) {
        // Remove any existing modal
        const existingModal = document.querySelector('.badge-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal for badge details
        const modal = document.createElement('div');
        modal.className = 'badge-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--color-surface);
            border: 2px solid var(--color-primary);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            margin: 2rem;
            position: relative;
            transform: translateY(50px);
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem; animation: badge-celebration 2s ease-in-out;">${badge.icon}</div>
            <h3 style="color: var(--color-primary); margin-bottom: 0.5rem; font-size: 1.5rem;">${badge.name}</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.6;">${badge.description}</p>
            <div class="badge-rarity ${badge.rarity}" style="margin-bottom: 1.5rem; display: inline-block;">${badge.rarity}</div>
            <br>
            <button class="btn btn-primary" style="margin-top: 0.5rem;">Awesome!</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 50);
        
        // Close handlers
        const closeButton = modalContent.querySelector('.btn');
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(50px)';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Add celebration CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes badge-celebration {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.2) rotate(-10deg); }
                50% { transform: scale(1.3) rotate(10deg); }
                75% { transform: scale(1.1) rotate(-5deg); }
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => style.remove(), 3000);
    }

    initializeThemeToggle() {
        const bb8Container = document.querySelector('.bb8-container');
        if (!bb8Container) return;

        bb8Container.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const bb8Head = document.querySelector('.bb8-head');
        const bb8Body = document.querySelector('.bb8-body');
        
        if (bb8Head && bb8Body) {
            // Animate BB8 movement
            bb8Head.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            bb8Body.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            
            bb8Head.style.transform = 'translateX(-50%) translateY(-10px) rotate(45deg)';
            bb8Body.style.transform = 'translateX(-50%) rotate(15deg)';
            
            setTimeout(() => {
                bb8Head.style.transform = 'translateX(-50%) translateY(0) rotate(0deg)';
                bb8Body.style.transform = 'translateX(-50%) rotate(0deg)';
            }, 500);
        }
        
        // Theme toggle feedback
        this.addNotification('Theme toggle activated! 🎨', 'info');
        console.log('BB8 theme toggle activated');
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateRunProgress();
        }, 5000);
        
        setInterval(() => {
            this.updateXPProgress();
        }, 15000);
        
        // Simulate streak updates
        setInterval(() => {
            this.updateStreakCounter();
        }, 60000);
    }

    updateRunProgress() {
        const runningRuns = this.mockData.activeRuns.filter(run => run.status === 'running');
        
        runningRuns.forEach(run => {
            if (run.progress < 100) {
                run.progress = Math.min(run.progress + Math.random() * 15, 100);
                
                // Update time elapsed
                const parts = run.timeElapsed.split(':');
                let seconds = parseInt(parts[2]) + 5;
                let minutes = parseInt(parts[1]);
                let hours = parseInt(parts[0]);
                
                if (seconds >= 60) {
                    minutes += Math.floor(seconds / 60);
                    seconds = seconds % 60;
                }
                if (minutes >= 60) {
                    hours += Math.floor(minutes / 60);
                    minutes = minutes % 60;
                }
                
                run.timeElapsed = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (run.progress >= 100) {
                    run.status = 'completed';
                    this.addNotification(`${run.name} completed successfully! 🎉`, 'success');
                }
            }
        });
        
        if (this.currentPage === 'dashboard') {
            this.updateActiveRuns();
        }
    }

    updateXPProgress() {
        const xpGain = Math.floor(Math.random() * 75) + 25;
        this.mockData.user.xp += xpGain;
        
        // Check for level up
        if (this.mockData.user.xp >= this.mockData.user.nextLevelXp) {
            this.mockData.user.level++;
            const overflow = this.mockData.user.xp - this.mockData.user.nextLevelXp;
            this.mockData.user.nextLevelXp = Math.floor(this.mockData.user.nextLevelXp * 1.3);
            this.mockData.user.xp = overflow;
            
            this.addNotification(`🌟 Level Up! Welcome to Level ${this.mockData.user.level}!`, 'success');
            this.playLevelUpEffect();
        } else {
            this.addNotification(`+${xpGain} XP earned from background analysis! ⭐`, 'info');
        }
        
        if (this.currentPage === 'dashboard') {
            this.refreshDashboard();
        }
    }

    updateStreakCounter() {
        // Sometimes break streak, sometimes maintain
        if (Math.random() < 0.1) {
            this.mockData.user.streak = 1;
            this.addNotification('Streak reset. Start a new debugging session to rebuild it! 🔥', 'warning');
        } else {
            this.mockData.user.streak++;
            if (this.mockData.user.streak % 5 === 0) {
                this.addNotification(`${this.mockData.user.streak}-day streak maintained! 🔥`, 'success');
            }
        }
        
        if (this.currentPage === 'dashboard') {
            this.refreshDashboard();
        }
    }

    playLevelUpEffect() {
        // Create celebratory particles
        const colors = ['#5227ff', '#12c2e9', '#ff6ec7'];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: levelup-particle 2s ease-out forwards;
                `;
                
                const angle = (i / particleCount) * Math.PI * 2;
                const velocity = 200;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--vx', vx + 'px');
                particle.style.setProperty('--vy', vy + 'px');
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 50);
        }
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes levelup-particle {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        setTimeout(() => style.remove(), 3000);
    }

    addNotification(message, type = 'info') {
        // Remove oldest notification if there are too many
        const existingNotifications = document.querySelectorAll('.notification');
        if (existingNotifications.length >= 3) {
            existingNotifications[0].remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const typeColors = {
            'success': 'var(--gradient-secondary)',
            'warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            'info': 'var(--gradient-primary)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: ${20 + existingNotifications.length * 70}px;
            right: 20px;
            background: ${typeColors[type] || typeColors['info']};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            font-size: 0.875rem;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }

    handleResize() {
        // Handle responsive behavior
        const navigation = document.querySelector('.navigation');
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        
        if (mediaQuery.matches) {
            navigation.classList.add('mobile');
            if (!navigation.classList.contains('mobile-open')) {
                this.navExpanded = false;
            }
        } else {
            navigation.classList.remove('mobile', 'mobile-open');
            this.navExpanded = true;
        }
        
        // Redraw cosmic background
        const canvas = document.getElementById('cosmic-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    // Cleanup method for when page is unloaded
    destroy() {
        if (this.cosmicAnimationId) {
            cancelAnimationFrame(this.cosmicAnimationId);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scriptOracle = new ScriptOracle();
    console.log('Script Oracle initialized successfully!');
});

// Handle mobile navigation toggle
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navigation');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navToggle && (e.target === navToggle || navToggle.contains(e.target))) {
        e.preventDefault();
        nav.classList.toggle('mobile-open');
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.scriptOracle && window.scriptOracle.destroy) {
        window.scriptOracle.destroy();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptOracle;
}