// Script Oracle - Multi-Dimensional Debugging Platform
// JavaScript Implementation with Gaming & Enterprise Features

class ScriptOracle {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'landing';
        this.animationSettings = {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
        this.data = this.initializeData();
        this.init();
    }

    initializeData() {
        return {
            "brand": {
                "name": "SCRIPT ORACLE",
                "tagline": "Multi-Dimensional Debugging",
                "description": "AI-powered insight meets gamified growth",
                "philosophy": "BREAKING PATCHING is a prayer, RUNNING RESOLVING is a triumph",
                "founder": "VALKARION (Original Name: Abhey Shahl)"
            },
            "users": {
                "current": {
                    "id": "user_001",
                    "name": "Alex Developer",
                    "email": "alex@example.com",
                    "level": 8,
                    "xp": 15420,
                    "xpToNext": 4580,
                    "streak": 12,
                    "badges": 23,
                    "guild": "Code Crusaders",
                    "role": "developer"
                },
                "profile": {
                    "avatar": "/api/placeholder/64/64",
                    "title": "Senior Debugger",
                    "joinDate": "2024-03-15",
                    "totalRuns": 1847,
                    "bugsFixed": 342,
                    "testsWritten": 89
                }
            },
            "dashboard": {
                "stats": [
                    { "label": "Time to Fix", "value": "12m", "change": "-23%", "trend": "down" },
                    { "label": "Code Coverage", "value": "94%", "change": "+15%", "trend": "up" },
                    { "label": "Active Runs", "value": "7", "change": "+2", "trend": "up" },
                    { "label": "Team Velocity", "value": "8.4", "change": "+12%", "trend": "up" }
                ],
                "recentActivity": [
                    { "type": "fix", "message": "Fixed null pointer in UserService.java", "time": "2 min ago", "xp": 50 },
                    { "type": "test", "message": "Generated 12 unit tests for PaymentController", "time": "15 min ago", "xp": 75 },
                    { "type": "badge", "message": "Unlocked 'Bug Slayer' badge", "time": "1 hour ago", "xp": 100 }
                ]
            },
            "gamification": {
                "xpEvents": [
                    { "action": "Bug Fix Approved", "xp": 50, "timestamp": "2024-10-08T10:30:00Z" },
                    { "action": "Streak Maintained", "xp": 25, "timestamp": "2024-10-08T09:00:00Z" },
                    { "action": "Test Generated", "xp": 30, "timestamp": "2024-10-08T08:45:00Z" }
                ],
                "badges": [
                    { "id": "winter_debugger", "name": "Winter Debugger", "description": "Forged in the frost of 50 patches", "rarity": "epic", "unlocked": true, "icon": "❄️" },
                    { "id": "code_crusader", "name": "Code Crusader", "description": "Vanquished 100 bugs in holy code", "rarity": "rare", "unlocked": true, "icon": "⚔️" },
                    { "id": "test_master", "name": "Test Master", "description": "Generated 1000 passing tests", "rarity": "legendary", "unlocked": false, "icon": "🧪" },
                    { "id": "security_guardian", "name": "Security Guardian", "description": "Defended against 50 vulnerabilities", "rarity": "epic", "unlocked": true, "icon": "🛡️" },
                    { "id": "streak_warrior", "name": "Streak Warrior", "description": "Maintained 30-day coding streak", "rarity": "rare", "unlocked": true, "icon": "🔥" },
                    { "id": "bug_slayer", "name": "Bug Slayer", "description": "Eliminated 500 critical bugs", "rarity": "legendary", "unlocked": false, "icon": "🗡️" }
                ],
                "leaderboard": [
                    { "rank": 1, "name": "Sarah Chen", "guild": "Debug Dragons", "xp": 28340, "streak": 45 },
                    { "rank": 2, "name": "Mike Rodriguez", "guild": "Code Crusaders", "xp": 25180, "streak": 32 },
                    { "rank": 3, "name": "Alex Developer", "guild": "Code Crusaders", "xp": 15420, "streak": 12 }
                ]
            },
            "codeAnalysis": {
                "runs": [
                    {
                        "id": "run_001",
                        "status": "completed",
                        "project": "E-Commerce API",
                        "duration": "45s",
                        "issues": 7,
                        "fixes": 5,
                        "coverage": "87%",
                        "timestamp": "2024-10-08T10:30:00Z"
                    }
                ],
                "heatmap": {
                    "data": [
                        { "file": "UserController.java", "complexity": 8.2, "bugs": 3, "coverage": 92, "performance": 7.1 },
                        { "file": "PaymentService.java", "complexity": 6.1, "bugs": 1, "coverage": 98, "performance": 9.2 },
                        { "file": "AuthMiddleware.js", "complexity": 4.5, "bugs": 0, "coverage": 85, "performance": 8.7 },
                        { "file": "DatabaseConfig.java", "complexity": 9.8, "bugs": 5, "coverage": 76, "performance": 5.3 },
                        { "file": "APIGateway.js", "complexity": 7.3, "bugs": 2, "coverage": 89, "performance": 6.8 },
                        { "file": "ValidationUtils.java", "complexity": 3.2, "bugs": 0, "coverage": 94, "performance": 9.1 },
                        { "file": "SecurityFilter.java", "complexity": 8.9, "bugs": 4, "coverage": 81, "performance": 6.2 },
                        { "file": "ResponseHandler.js", "complexity": 5.7, "bugs": 1, "coverage": 91, "performance": 8.4 }
                    ]
                }
            },
            "security": {
                "scans": [
                    { "type": "Static Analysis", "status": "passed", "issues": 0, "timestamp": "2024-10-08T09:15:00Z" },
                    { "type": "Dependency Check", "status": "warning", "issues": 2, "timestamp": "2024-10-08T09:00:00Z" },
                    { "type": "Vulnerability Scan", "status": "passed", "issues": 0, "timestamp": "2024-10-08T08:45:00Z" }
                ],
                "vulnerabilities": [
                    { 
                        "severity": "medium", 
                        "type": "Outdated Dependency", 
                        "package": "lodash@4.17.20", 
                        "fix": "Update to 4.17.21" 
                    }
                ]
            }
        };
    }

    init() {
        this.setupEventListeners();
        this.initializeSplashScreen();
        this.initializeCursorTrail();
        this.startAnimations();
        this.currentUser = this.data.users.current;
    }

    setupEventListeners() {
        // Navigation event listeners
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const page = navLink.dataset.page;
                this.navigateToPage(page);
            }
        });

        // CTA Button
        const launchButton = document.getElementById('launch-oracle');
        if (launchButton) {
            launchButton.addEventListener('click', () => {
                this.navigateToPage('dashboard');
            });
        }

        // Run button in console
        document.addEventListener('click', (e) => {
            if (e.target.closest('.run-btn')) {
                this.executeCodeAnalysis();
            }
        });

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
        });

        // Heatmap refresh button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#refresh-heatmap')) {
                this.refreshHeatmap();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    initializeSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        const app = document.getElementById('app');
        
        if (!this.animationSettings.reducedMotion) {
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                app.classList.remove('hidden');
                this.navigateToPage('landing');
            }, 4000);
        } else {
            // Skip animation for reduced motion
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                app.classList.remove('hidden');
                this.navigateToPage('landing');
            }, 1000);
        }
    }

    initializeCursorTrail() {
        if (this.animationSettings.reducedMotion) return;

        const cursorTrail = document.getElementById('cursor-trail');
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorTrail.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.classList.remove('active');
        });

        const updateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = `${trailX - 10}px`;
            cursorTrail.style.top = `${trailY - 10}px`;
            
            requestAnimationFrame(updateTrail);
        };
        
        updateTrail();
    }

    startAnimations() {
        if (this.animationSettings.reducedMotion) return;

        // Start various background animations
        this.animateParticles();
        this.animateOrbitals();
        this.animateStats();
    }

    animateParticles() {
        // Cosmic particle animation
        const particles = document.querySelectorAll('.cosmic-particles, .particle-field');
        particles.forEach(particle => {
            if (particle) {
                particle.style.animationPlayState = 'running';
            }
        });
    }

    animateOrbitals() {
        // TensorFlow orb orbital animation
        const orbRings = document.querySelectorAll('.orb-ring');
        orbRings.forEach((ring, index) => {
            ring.style.animationDelay = `${index * 0.5}s`;
        });
    }

    animateStats() {
        // Animate stat counters
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            this.animateCounter(stat);
        });
    }

    animateCounter(element) {
        const target = parseFloat(element.textContent);
        const isPercent = element.textContent.includes('%');
        const isTime = element.textContent.includes('m');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = current.toFixed(isPercent || isTime ? 0 : 1);
            if (isPercent) displayValue += '%';
            if (isTime) displayValue += 'm';
            
            element.textContent = displayValue;
        }, 20);
    }

    navigateToPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
            
            // Update navigation states
            this.updateNavigationState(pageName);
            
            // Load page-specific content
            this.loadPageContent(pageName);
            
            // Update URL without page reload
            history.pushState({ page: pageName }, '', `#${pageName}`);
        }
    }

    updateNavigationState(pageName) {
        // Update header nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });

        // Update sidebar nav
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });
    }

    loadPageContent(pageName) {
        switch (pageName) {
            case 'landing':
                this.loadLandingPage();
                break;
            case 'dashboard':
                this.loadDashboardContent();
                break;
            case 'console':
                this.loadConsoleContent();
                break;
            case 'xp':
                this.loadXPDashboard();
                break;
            case 'badges':
                this.loadBadgeVault();
                break;
            case 'security':
                this.loadSecurityOracle();
                break;
            case 'heatmap':
                this.loadHeatmapAnalyzer();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
            case 'admin':
                this.loadAdminPanel();
                break;
            case 'analytics':
                this.loadAnalyticsPage();
                break;
            default:
                break;
        }
    }

    loadLandingPage() {
        // Landing page is static content, but we can add some dynamic elements
        const orbCore = document.querySelector('.orb-core');
        if (orbCore && !this.animationSettings.reducedMotion) {
            // Add interactive orb effects
            orbCore.addEventListener('click', () => {
                this.navigateToPage('dashboard');
            });
        }
    }

    loadDashboardContent() {
        const activityList = document.getElementById('activity-list');
        if (activityList) {
            activityList.innerHTML = this.data.dashboard.recentActivity.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">${this.getActivityIcon(activity.type)}</div>
                    <div class="activity-content">
                        <div class="activity-message">${activity.message}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                    <div class="activity-xp">+${activity.xp} XP</div>
                </div>
            `).join('');
        }

        // Animate activity items
        setTimeout(() => {
            const activityItems = document.querySelectorAll('.activity-item');
            activityItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'all 0.3s ease';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);
            });
        }, 100);
    }

    getActivityIcon(type) {
        const icons = {
            fix: '🔧',
            test: '🧪',
            badge: '🏆',
            security: '🛡️',
            run: '⚡'
        };
        return icons[type] || '📝';
    }

    loadConsoleContent() {
        const outputContent = document.getElementById('output-content');
        if (outputContent) {
            outputContent.innerHTML = `
                <div class="analysis-placeholder">
                    <p style="color: var(--color-text-secondary); font-style: italic;">Click "Run Analysis" to start debugging...</p>
                    <div class="code-preview">
                        <h4 style="color: var(--color-neon-green); margin-bottom: 1rem;">Ready to analyze:</h4>
                        <ul style="color: var(--color-text-secondary); list-style: none; padding: 0;">
                            <li>• Potential null pointer exceptions</li>
                            <li>• Missing input validation</li>
                            <li>• Code complexity analysis</li>
                            <li>• Security vulnerability scan</li>
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    loadHeatmapAnalyzer() {
        const heatmapGrid = document.getElementById('heatmap-grid');
        const heatmapFiles = document.getElementById('heatmap-files');
        
        if (heatmapGrid) {
            // Create heatmap visualization
            const heatmapData = this.data.codeAnalysis.heatmap.data;
            const metric = document.getElementById('heatmap-metric')?.value || 'complexity';
            
            heatmapGrid.innerHTML = heatmapData.map(file => {
                const intensity = this.getHeatmapIntensity(file[metric]);
                const colorClass = this.getHeatmapColorClass(intensity);
                
                return `
                    <div class="heatmap-cell ${colorClass}" data-file="${file.file}" data-value="${file[metric]}">
                        <div class="heatmap-cell-content">
                            <div class="file-name">${file.file.split('/').pop()}</div>
                            <div class="file-metric">${file[metric]}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        if (heatmapFiles) {
            heatmapFiles.innerHTML = this.data.codeAnalysis.heatmap.data.map(file => `
                <div class="file-analysis-item">
                    <div class="file-info">
                        <div class="file-name">${file.file}</div>
                        <div class="file-metrics">
                            <span class="metric-item">Complexity: ${file.complexity}</span>
                            <span class="metric-item">Bugs: ${file.bugs}</span>
                            <span class="metric-item">Coverage: ${file.coverage}%</span>
                        </div>
                    </div>
                    <div class="file-actions">
                        <button class="btn btn--xs btn--primary">Analyze</button>
                    </div>
                </div>
            `).join('');
        }

        // Add hover effects for heatmap cells
        setTimeout(() => {
            document.querySelectorAll('.heatmap-cell').forEach(cell => {
                cell.addEventListener('mouseenter', (e) => {
                    const file = e.target.dataset.file;
                    const value = e.target.dataset.value;
                    this.showHeatmapTooltip(e, file, value);
                });
                
                cell.addEventListener('mouseleave', () => {
                    this.hideHeatmapTooltip();
                });
            });
        }, 100);
    }

    getHeatmapIntensity(value) {
        // Normalize values to 0-1 scale
        if (typeof value === 'string' && value.includes('%')) {
            return parseFloat(value) / 100;
        }
        return Math.min(value / 10, 1);
    }

    getHeatmapColorClass(intensity) {
        if (intensity < 0.25) return 'low';
        if (intensity < 0.5) return 'medium';
        if (intensity < 0.75) return 'high';
        return 'critical';
    }

    showHeatmapTooltip(event, file, value) {
        const tooltip = document.createElement('div');
        tooltip.className = 'heatmap-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">${file}</div>
            <div class="tooltip-content">Value: ${value}</div>
        `;
        
        tooltip.style.cssText = `
            position: fixed;
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 0.75rem;
            font-size: 0.875rem;
            z-index: 10000;
            pointer-events: none;
            box-shadow: var(--shadow-elevated);
            left: ${event.clientX + 10}px;
            top: ${event.clientY - 10}px;
        `;
        
        document.body.appendChild(tooltip);
    }

    hideHeatmapTooltip() {
        const tooltip = document.querySelector('.heatmap-tooltip');
        if (tooltip) {
            document.body.removeChild(tooltip);
        }
    }

    refreshHeatmap() {
        // Simulate refreshing heatmap data
        const refreshBtn = document.getElementById('refresh-heatmap');
        if (refreshBtn) {
            const originalText = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<span class="btn-icon">🔄</span> Refreshing...';
            refreshBtn.disabled = true;
            
            setTimeout(() => {
                this.loadHeatmapAnalyzer();
                refreshBtn.innerHTML = originalText;
                refreshBtn.disabled = false;
                
                // Show success notification
                this.showNotification('Heatmap data refreshed successfully', 'success');
            }, 2000);
        }
    }

    loadSettingsPage() {
        // Settings page is mostly static, but we can add some interactivity
        const themeSelector = document.getElementById('theme-selector');
        const animationLevel = document.getElementById('animation-level');
        
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => {
                this.changeTheme(e.target.value);
            });
        }
        
        if (animationLevel) {
            animationLevel.addEventListener('change', (e) => {
                this.changeAnimationLevel(e.target.value);
            });
        }

        // Add interactive elements to settings
        document.querySelectorAll('.settings-card input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.updateNotificationSetting(e.target);
            });
        });
    }

    loadAdminPanel() {
        // Admin panel is mostly static, but we can add some dynamic elements
        const addUserBtn = document.querySelector('.admin-card .btn--primary');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => {
                this.showNotification('Add user functionality would open here', 'info');
            });
        }
    }

    loadAnalyticsPage() {
        // Analytics page content is mostly static, showing placeholder charts
        // In a real implementation, this would fetch and display real analytics data
        console.log('Analytics page loaded with placeholder content');
    }

    executeCodeAnalysis() {
        const outputContent = document.getElementById('output-content');
        const outputStatus = document.querySelector('.output-status');
        
        if (!outputContent || !outputStatus) return;

        // Update status to running
        outputStatus.innerHTML = `
            <span class="status-indicator"></span>
            Analyzing code...
        `;
        outputStatus.className = 'output-status running';

        // Show analysis progress
        outputContent.innerHTML = `
            <div class="analysis-running">
                <div style="color: var(--color-neon-green); margin-bottom: 1rem;">🔍 Running analysis...</div>
                <div class="analysis-progress">
                    <div style="color: var(--color-text-secondary); margin-bottom: 0.5rem;">Scanning UserController.java</div>
                    <div style="color: var(--color-text-secondary); margin-bottom: 0.5rem;">Checking for null pointer exceptions...</div>
                    <div style="color: var(--color-text-secondary); margin-bottom: 0.5rem;">Validating input parameters...</div>
                </div>
            </div>
        `;

        // Simulate analysis completion
        setTimeout(() => {
            outputStatus.innerHTML = `
                <span class="status-indicator"></span>
                Analysis complete
            `;
            outputStatus.className = 'output-status completed';

            outputContent.innerHTML = `
                <div class="analysis-results">
                    <div class="result-summary">
                        <h4 style="color: var(--color-neon-green); margin-bottom: 1rem;">📊 Analysis Complete</h4>
                        <div class="summary-stats">
                            <span class="result-stat" style="color: var(--color-error);">3 Issues Found</span>
                            <span class="result-stat" style="color: var(--color-success);">2 Auto-fixes Applied</span>
                            <span class="result-stat" style="color: var(--color-warning);">1 Manual Review</span>
                        </div>
                    </div>
                    
                    <div class="issues-list" style="margin-top: 1.5rem;">
                        <div class="issue-item" style="background: rgba(255, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-error); margin-bottom: 1rem;">
                            <div style="color: var(--color-error); font-weight: 600;">❌ Null Pointer Exception Risk</div>
                            <div style="color: var(--color-text-secondary); margin: 0.5rem 0;">Line 8: userService.findById(id) can return null</div>
                            <div style="color: var(--color-success); font-size: 0.875rem;">✅ Fixed: Added null check with Optional wrapper</div>
                        </div>
                        
                        <div class="issue-item" style="background: rgba(255, 170, 0, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-warning); margin-bottom: 1rem;">
                            <div style="color: var(--color-warning); font-weight: 600;">⚠️ Missing Input Validation</div>
                            <div style="color: var(--color-text-secondary); margin: 0.5rem 0;">Line 14: User object not validated before save</div>
                            <div style="color: var(--color-success); font-size: 0.875rem;">✅ Fixed: Added @Valid annotation and validation</div>
                        </div>
                        
                        <div class="issue-item" style="background: rgba(0, 170, 255, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-electric-blue);">
                            <div style="color: var(--color-electric-blue); font-weight: 600;">💡 Optimization Suggestion</div>
                            <div style="color: var(--color-text-secondary); margin: 0.5rem 0;">Consider adding caching for frequently accessed user data</div>
                            <div style="color: var(--color-text-muted); font-size: 0.875rem;">📝 Manual review recommended</div>
                        </div>
                    </div>
                    
                    <div class="xp-reward" style="text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(0, 255, 136, 0.1); border-radius: 8px;">
                        <div style="color: var(--color-xp-gold); font-family: var(--font-gaming); font-size: 1.25rem; font-weight: 600;">🏆 +75 XP Earned!</div>
                        <div style="color: var(--color-text-secondary); font-size: 0.875rem;">Bug fixes and code improvements</div>
                    </div>
                </div>
            `;

            // Award XP to user
            this.awardXP(75, 'Code Analysis Completed');
        }, 3000);
    }

    loadXPDashboard() {
        const xpEvents = document.getElementById('xp-events');
        if (xpEvents) {
            xpEvents.innerHTML = this.data.gamification.xpEvents.map(event => `
                <div class="xp-event">
                    <div class="xp-event-info">
                        <div class="xp-event-action">${event.action}</div>
                        <div class="xp-event-time">${this.formatTimestamp(event.timestamp)}</div>
                    </div>
                    <div class="xp-event-points">+${event.xp} XP</div>
                </div>
            `).join('');
        }

        // Animate XP progress bar
        const xpFill = document.querySelector('.xp-fill');
        if (xpFill) {
            const currentXP = this.currentUser.xp;
            const totalXP = currentXP + this.currentUser.xpToNext;
            const percentage = (currentXP / totalXP) * 100;
            
            setTimeout(() => {
                xpFill.style.width = `${percentage}%`;
            }, 500);
        }
    }

    loadBadgeVault() {
        const badgeGrid = document.getElementById('badge-grid');
        if (badgeGrid) {
            badgeGrid.innerHTML = this.data.gamification.badges.map(badge => `
                <div class="badge-card ${badge.rarity} ${!badge.unlocked ? 'locked' : ''}" data-badge-id="${badge.id}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-description">${badge.description}</div>
                    <div class="badge-rarity ${badge.rarity}">${badge.rarity}</div>
                </div>
            `).join('');

            // Add hover effects for unlocked badges
            setTimeout(() => {
                const unlockedBadges = badgeGrid.querySelectorAll('.badge-card:not(.locked)');
                unlockedBadges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.opacity = '0';
                        badge.style.transform = 'translateY(20px) scale(0.9)';
                        badge.style.transition = 'all 0.5s ease';
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                });
            }, 200);
        }
    }

    loadSecurityOracle() {
        const securityScans = document.getElementById('security-scans');
        const vulnerabilityList = document.getElementById('vulnerability-list');

        if (securityScans) {
            securityScans.innerHTML = this.data.security.scans.map(scan => `
                <div class="scan-item">
                    <div class="scan-info">
                        <div class="scan-type">${scan.type}</div>
                        <div class="scan-time">${this.formatTimestamp(scan.timestamp)}</div>
                    </div>
                    <div class="scan-status ${scan.status}">
                        ${this.getStatusIcon(scan.status)}
                        ${scan.status} ${scan.issues ? `(${scan.issues} issues)` : ''}
                    </div>
                </div>
            `).join('');
        }

        if (vulnerabilityList) {
            if (this.data.security.vulnerabilities.length > 0) {
                vulnerabilityList.innerHTML = this.data.security.vulnerabilities.map(vuln => `
                    <div class="vulnerability-item">
                        <div class="vuln-header">
                            <div class="vuln-type">${vuln.type}</div>
                            <div class="vuln-severity ${vuln.severity}">${vuln.severity}</div>
                        </div>
                        <div class="vuln-package">${vuln.package}</div>
                        <div class="vuln-fix">💡 ${vuln.fix}</div>
                    </div>
                `).join('');
            } else {
                vulnerabilityList.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
                        <div>No vulnerabilities detected</div>
                        <div style="font-size: 0.875rem; margin-top: 0.5rem;">Your code is secure!</div>
                    </div>
                `;
            }
        }
    }

    getStatusIcon(status) {
        const icons = {
            'passed': '✅',
            'warning': '⚠️',
            'failed': '❌',
            'running': '🔄'
        };
        return icons[status] || '❓';
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }

    changeTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.showNotification(`Theme changed to ${theme}`, 'success');
    }

    changeAnimationLevel(level) {
        this.animationSettings.reducedMotion = level !== 'full';
        this.showNotification(`Animation level set to ${level}`, 'success');
    }

    updateNotificationSetting(checkbox) {
        const setting = checkbox.parentElement.textContent.trim();
        const enabled = checkbox.checked;
        this.showNotification(`${setting}: ${enabled ? 'Enabled' : 'Disabled'}`, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
        `;
        
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            warning: 'var(--color-warning)',
            info: 'var(--color-electric-blue)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.5s ease;
            box-shadow: var(--shadow-elevated);
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    awardXP(amount, reason) {
        if (!this.currentUser) return;

        this.currentUser.xp += amount;
        
        // Check for level up
        const totalXP = this.currentUser.xp + this.currentUser.xpToNext;
        if (this.currentUser.xp >= totalXP) {
            this.levelUp();
        }

        // Update XP displays
        this.updateXPDisplays();
        
        // Show XP notification
        this.showXPNotification(amount, reason);
    }

    levelUp() {
        this.currentUser.level++;
        this.currentUser.xpToNext = Math.floor(this.currentUser.xpToNext * 1.5); // Increase XP requirement
        
        // Show level up animation
        this.showLevelUpNotification();
        
        // Check for new badge unlocks
        this.checkBadgeUnlocks();
    }

    updateXPDisplays() {
        const xpCounts = document.querySelectorAll('.xp-count');
        xpCounts.forEach(el => {
            el.textContent = `${this.currentUser.xp.toLocaleString()} XP`;
        });

        const xpBars = document.querySelectorAll('.xp-progress');
        const totalXP = this.currentUser.xp + this.currentUser.xpToNext;
        const percentage = (this.currentUser.xp / totalXP) * 100;
        
        xpBars.forEach(bar => {
            bar.style.width = `${percentage}%`;
        });
    }

    showXPNotification(amount, reason) {
        const notification = document.createElement('div');
        notification.className = 'xp-notification';
        notification.innerHTML = `
            <div class="xp-notification-content">
                <div class="xp-amount">+${amount} XP</div>
                <div class="xp-reason">${reason}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--color-neon-green), var(--color-electric-blue));
            color: white;
            padding: 1rem;
            border-radius: 12px;
            font-family: var(--font-gaming);
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.5s ease;
            box-shadow: var(--shadow-elevated);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-title">🎉 LEVEL UP! 🎉</div>
                <div class="level-up-subtitle">You reached Level ${this.currentUser.level}!</div>
                <div class="level-up-reward">New abilities unlocked</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, var(--color-xp-gold), var(--color-epic-orange));
            color: var(--color-text-primary);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            font-family: var(--font-gaming);
            z-index: 10001;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: var(--shadow-elevated);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 600);
        }, 4000);
    }

    checkBadgeUnlocks() {
        // Logic to check if user has earned new badges
        const unlockedBadges = this.data.gamification.badges.filter(badge => 
            !badge.unlocked && this.meetsRequirement(badge)
        );

        unlockedBadges.forEach(badge => {
            badge.unlocked = true;
            this.showBadgeUnlockNotification(badge);
        });
    }

    meetsRequirement(badge) {
        // Simplified badge requirement checking
        switch (badge.id) {
            case 'test_master':
                return this.currentUser.profile?.testsWritten >= 1000;
            case 'bug_slayer':
                return this.currentUser.profile?.bugsFixed >= 500;
            default:
                return false;
        }
    }

    showBadgeUnlockNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-unlock-notification';
        notification.innerHTML = `
            <div class="badge-unlock-content">
                <div class="badge-unlock-icon">${badge.icon}</div>
                <div class="badge-unlock-title">Badge Unlocked!</div>
                <div class="badge-unlock-name">${badge.name}</div>
                <div class="badge-unlock-description">${badge.description}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateX(100%);
            background: linear-gradient(135deg, var(--color-${badge.rarity === 'legendary' ? 'legendary-red' : badge.rarity === 'epic' ? 'epic-orange' : 'rare-purple'}), rgba(0, 0, 0, 0.8));
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            font-family: var(--font-gaming);
            z-index: 10002;
            transition: all 0.5s ease;
            box-shadow: var(--shadow-elevated);
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }

    handleFilterClick(filterBtn) {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        filterBtn.classList.add('active');
        
        // Filter activity items based on selection
        const filterType = filterBtn.textContent.toLowerCase();
        const activityItems = document.querySelectorAll('.activity-item');
        
        activityItems.forEach(item => {
            if (filterType === 'all') {
                item.style.display = 'flex';
            } else {
                const activityType = this.getActivityTypeFromIcon(item.querySelector('.activity-icon').textContent);
                item.style.display = activityType === filterType ? 'flex' : 'none';
            }
        });
    }

    getActivityTypeFromIcon(icon) {
        const typeMap = {
            '🔧': 'fixes',
            '🧪': 'tests',
            '🏆': 'badges',
            '🛡️': 'security',
            '⚡': 'runs'
        };
        return typeMap[icon] || 'all';
    }

    handleResize() {
        // Handle responsive behavior
        const sidebar = document.getElementById('sidebar');
        const app = document.getElementById('app');
        
        if (window.innerWidth <= 1024) {
            app.style.gridTemplateColumns = 'var(--sidebar-collapsed) 1fr';
        } else {
            app.style.gridTemplateColumns = 'var(--sidebar-width) 1fr';
        }
    }

    handleKeyboardShortcuts(e) {
        // Handle keyboard navigation
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    this.navigateToPage('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    this.navigateToPage('console');
                    break;
                case '3':
                    e.preventDefault();
                    this.navigateToPage('heatmap');
                    break;
                case '4':
                    e.preventDefault();
                    this.navigateToPage('xp');
                    break;
                case '5':
                    e.preventDefault();
                    this.navigateToPage('badges');
                    break;
                case '6':
                    e.preventDefault();
                    this.navigateToPage('security');
                    break;
            }
        }
    }

    // Real-time updates simulation
    startRealTimeUpdates() {
        setInterval(() => {
            this.simulateRealTimeActivity();
        }, 30000); // Every 30 seconds
    }

    simulateRealTimeActivity() {
        const activities = [
            { type: 'fix', message: 'Resolved memory leak in DataProcessor', xp: 60 },
            { type: 'test', message: 'Generated integration tests for API endpoints', xp: 40 },
            { type: 'security', message: 'Patched SQL injection vulnerability', xp: 100 },
            { type: 'run', message: 'Completed performance analysis', xp: 30 }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity.time = 'Just now';
        
        // Add to activity list if on dashboard
        if (this.currentPage === 'dashboard') {
            this.data.dashboard.recentActivity.unshift(randomActivity);
            this.data.dashboard.recentActivity = this.data.dashboard.recentActivity.slice(0, 5);
            this.loadDashboardContent();
        }
    }
}

// Enhanced Animation Library (Script Oracle UI Elements)
class SOAnimations {
    static electricBorder(element, options = {}) {
        if (!element) return;
        
        const {
            colors = ['#00FF88', '#00AAFF', '#8B5CF6'],
            duration = 3000,
            intensity = 1
        } = options;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const border = document.createElement('div');
        border.style.cssText = `
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, ${colors.join(', ')});
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            animation: electricFlow ${duration}ms linear infinite;
            opacity: ${intensity};
        `;
        
        element.appendChild(border);
    }
    
    static decryptText(element, text, options = {}) {
        if (!element) return;
        
        const {
            characters = '01',
            duration = 2000,
            finalDelay = 500
        } = options;
        
        const originalText = text || element.textContent;
        const textLength = originalText.length;
        let currentText = '';
        
        // Fill with random characters initially
        for (let i = 0; i < textLength; i++) {
            currentText += characters[Math.floor(Math.random() * characters.length)];
        }
        
        element.textContent = currentText;
        
        // Gradually reveal the real text
        let revealed = 0;
        const revealInterval = duration / textLength;
        
        const revealTimer = setInterval(() => {
            if (revealed >= textLength) {
                clearInterval(revealTimer);
                setTimeout(() => {
                    element.textContent = originalText;
                }, finalDelay);
                return;
            }
            
            currentText = originalText.substring(0, revealed + 1) + 
                         currentText.substring(revealed + 1);
            element.textContent = currentText;
            revealed++;
        }, revealInterval);
    }
    
    static pulseGlow(element, options = {}) {
        if (!element) return;
        
        const {
            color = '#00FF88',
            intensity = 0.5,
            duration = 2000
        } = options;
        
        element.style.animation = `pulseGlow ${duration}ms ease-in-out infinite alternate`;
        element.style.textShadow = `0 0 20px ${color}`;
    }
    
    static particleBurst(x, y, options = {}) {
        const {
            count = 20,
            colors = ['#00FF88', '#00AAFF', '#8B5CF6'],
            size = 4,
            speed = 2,
            lifetime = 2000
        } = options;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${x}px;
                top: ${y}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / count;
            const velocity = speed * (0.5 + Math.random() * 0.5);
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 1 / (lifetime / 16);
                
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particle);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
}

// CSS Animation Keyframes (injected dynamically)
const animationStyles = `
@keyframes electricFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

@keyframes pulseGlow {
    0% { 
        text-shadow: 0 0 20px currentColor; 
        transform: scale(1); 
    }
    100% { 
        text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; 
        transform: scale(1.05); 
    }
}

@keyframes matrixRain {
    0% { transform: translateY(-100vh); opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
}

@keyframes hologramFlicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
    75% { opacity: 0.9; }
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scriptOracle = new ScriptOracle();
    
    // Start real-time updates
    setTimeout(() => {
        window.scriptOracle.startRealTimeUpdates();
    }, 5000);
    
    // Add some interactive enhancements
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cta-button')) {
            SOAnimations.particleBurst(e.clientX, e.clientY, {
                count: 30,
                colors: ['#00FF88', '#00AAFF'],
                speed: 3
            });
        }
    });
    
    // Add electric borders to interactive elements
    setTimeout(() => {
        document.querySelectorAll('.electric-border').forEach(el => {
            SOAnimations.electricBorder(el);
        });
        
        document.querySelectorAll('.neon-glow').forEach(el => {
            SOAnimations.pulseGlow(el, { color: '#00FF88' });
        });
    }, 1000);
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        window.scriptOracle.navigateToPage(e.state.page);
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Script Oracle Performance Metrics:', {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime
        });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScriptOracle, SOAnimations };
}