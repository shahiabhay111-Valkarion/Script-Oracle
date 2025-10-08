// Script Oracle - Billion Dollar Multi-Dimensional Debugging Platform
// Production-Grade Cosmic JavaScript Implementation

class ScriptOracleEngine {
    constructor() {
        this.currentRealm = 'hero-realm';
        this.isAuthenticated = false;
        this.isAdmin = false;
        
        // User Data from Cosmic Database
        this.userData = {
            username: 'Reariang',
            rank: 27,
            level: 8,
            currentXP: 4073,
            maxXP: 7500,
            streak: 2,
            badges: ['Winter Debugger', 'Bug Slayer', 'Guardian', 'Patch Champion'],
            guild: 'Code Guardians'
        };

        // Workspace Sanctums
        this.workspaces = [
            { name: 'Ascendant', status: 'Active', glow: 'cyan', lastActive: '2 mins ago' },
            { name: 'Bayer', status: 'Idle', glow: 'dim', lastActive: '1 hour ago' },
            { name: 'Besst', status: 'Processing', glow: 'magenta', lastActive: 'Now' },
            { name: 'Charliant', status: 'Complete', glow: 'green', lastActive: '5 mins ago' }
        ];

        // Active Debugging Runs
        this.activeRuns = [{
            id: 'ERC_30_Function_A',
            name: 'ERC-30 Function A',
            progress: 47,
            error: 'Expected identifier, string, number, or concatenation',
            type: 'Function Declaration',
            code: `const declaration = true;\nreturn declaration * 2;\nexport default declaration;`,
            status: 'In Progress'
        }];

        // Seasonal Data - Fixed to show exact countdown
        this.seasonalData = {
            name: 'Winter Season',
            timeRemaining: { days: 41, hours: 2, minutes: 33 },
            multiplier: '2x XP',
            rewards: ['Winter Debugger Badge', 'Seasonal Vault', 'Mystic Glyphs']
        };

        // Integration Status
        this.integrations = [
            { name: 'GitHub', xp: 107551, status: 'connected', icon: '⚡' },
            { name: 'Vercel', xp: 105390, status: 'connected', icon: '▲' },
            { name: 'Supabase', xp: 103215, status: 'connected', icon: '🔋' },
            { name: 'MongoDB', xp: 103615, status: 'connected', icon: '🍃' },
            { name: 'Cursor', xp: 0, status: 'available', icon: '🖱️' },
            { name: 'Lovable', xp: 0, status: 'available', icon: '💖' }
        ];

        // Leaderboard Data
        this.leaderboard = [
            { rank: 1, name: 'ELIA', xp: 107551, level: 25, guild: 'Nexus Architects' },
            { rank: 2, name: 'MARTA', xp: 105390, level: 24, guild: 'Code Shamans' },
            { rank: 3, name: 'JUREMI', xp: 103215, level: 23, guild: 'Debug Warriors' },
            { rank: 27, name: 'REARIANG', xp: 100883, level: 8, guild: 'Code Guardians' }
        ];

        this.init();
    }

    init() {
        this.setupCosmicFoundation();
        this.initializeAnimationSystems();
        this.startIgnitionSequence();
        this.setupEventHandlers();
        this.initializeRealTimeStreams();
        this.setupRealmNavigation();
    }

    setupCosmicFoundation() {
        this.initElectricCursor();
        this.initCosmicBackground();
        this.initEtherFlow();
        this.initTensorFlowOrbitals();
    }

    initElectricCursor() {
        const cursor = document.getElementById('electric-cursor');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Add velocity-based effects
            const velocity = Math.sqrt(dx * dx + dy * dy);
            if (velocity > 5) {
                cursor.classList.add('cursor-moving');
                setTimeout(() => cursor.classList.remove('cursor-moving'), 100);
            }
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Enhanced hover effects
        document.querySelectorAll('button, .rune-link, .capability-node, .scanner-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                this.createElectricSpark(mouseX, mouseY);
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    initCosmicBackground() {
        const canvas = document.getElementById('cosmic-background');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const starCount = 200;

        // Create cosmic star field
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * 0.05 + 0.02,
                color: this.getCosmicColor()
            });
        }

        const animateStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
                star.opacity = Math.max(0.2, Math.min(1, star.opacity));
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.fill();
                
                // Add subtle glow effect
                if (star.opacity > 0.7) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`;
                    ctx.fill();
                }
            });
            
            requestAnimationFrame(animateStars);
        };
        animateStars();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    initEtherFlow() {
        const canvas = document.getElementById('ether-flow');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 4 + 2,
                opacity: Math.random() * 0.6 + 0.2,
                hue: Math.random() * 360,
                life: Math.random() * 200 + 100
            });
        }

        const animateEther = () => {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 26, 101, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.globalCompositeOperation = 'screen';
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life--;
                
                if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || 
                    particle.y < 0 || particle.y > canvas.height) {
                    particles[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.width,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        size: Math.random() * 4 + 2,
                        opacity: Math.random() * 0.6 + 0.2,
                        hue: Math.random() * 360,
                        life: Math.random() * 200 + 100
                    };
                }
                
                // Draw particle with ethereal glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`);
                gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 70%, 0)`);
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Connect nearby particles with ethereal streams
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 100%, 70%, ${0.3 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateEther);
        };
        animateEther();
    }

    initTensorFlowOrbitals() {
        // Enhanced orbital system with dynamic interaction
        const orbitalSystem = document.getElementById('orbital-system');
        const nodes = orbitalSystem.querySelectorAll('.orbital-node');
        
        nodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                this.highlightOrbitalConnections(node);
                this.showOrbitalTooltip(node);
            });
            
            node.addEventListener('mouseleave', () => {
                this.clearOrbitalHighlights();
                this.hideOrbitalTooltip();
            });
        });
    }

    initializeAnimationSystems() {
        this.initElectricBorderSystem();
        this.initLaserFlowSystem();
        this.initMatrixTextSystem();
        this.initAdvancedStaggering();
        this.initMagicBentoSystem();
    }

    initElectricBorderSystem() {
        // Dynamic electric border effects
        document.querySelectorAll('.electric-border').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.activateElectricBorder(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.deactivateElectricBorder(element);
            });
        });
    }

    initLaserFlowSystem() {
        // Implement flowing laser effects
        setInterval(() => {
            this.triggerRandomLaserFlow();
        }, 3000);
    }

    initMatrixTextSystem() {
        // Matrix-style text animations for debugging streams
        document.querySelectorAll('.matrix-text').forEach(element => {
            this.animateMatrixText(element);
        });
    }

    initAdvancedStaggering() {
        // Staggered animations with intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('stagger-animation');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.capability-node, .rune-link').forEach(el => {
            observer.observe(el);
        });
    }

    initMagicBentoSystem() {
        // Advanced grid layout animations
        document.querySelectorAll('.magic-bento').forEach(element => {
            this.enhanceBentoMagic(element);
        });
    }

    startIgnitionSequence() {
        const ignitionOverlay = document.getElementById('rune-ignition');
        const app = document.getElementById('sanctum-app');
        
        // Play ignition sequence
        setTimeout(() => {
            ignitionOverlay.classList.remove('active');
            app.style.opacity = '1';
            
            // Initialize UI after ignition
            this.initializeUserInterface();
            this.startCapabilityConstellation();
            
        }, 5000); // 5 second ignition sequence
    }

    initializeUserInterface() {
        // Set user data in profile
        this.updateUserProfile();
        this.updateSeasonalCountdown();
        this.initializeEssenceProgress();
        
        // Start real-time systems
        this.startRealTimeUpdates();
    }

    updateUserProfile() {
        const usernameElement = document.querySelector('.username-glow');
        const essenceFill = document.querySelector('.essence-fill');
        const essenceStats = document.querySelector('.essence-stats');
        const streakCount = document.querySelector('.streak-count');
        const powerLevel = document.querySelector('.power-level');
        
        if (usernameElement) usernameElement.textContent = `${this.userData.username} #${this.userData.rank}`;
        if (powerLevel) powerLevel.textContent = `LVL ${this.userData.level}`;
        if (essenceStats) essenceStats.textContent = `+${this.userData.currentXP.toLocaleString()} / ${this.userData.maxXP.toLocaleString()} VP`;
        if (streakCount) streakCount.textContent = `${this.userData.streak} Days`;
        
        if (essenceFill) {
            const progress = (this.userData.currentXP / this.userData.maxXP) * 100;
            essenceFill.style.setProperty('--progress', progress + '%');
            essenceFill.setAttribute('data-progress', progress);
        }
    }

    updateSeasonalCountdown() {
        const countdownDisplay = document.getElementById('season-countdown');
        if (countdownDisplay) {
            const formatCountdown = () => {
                const { days, hours, minutes } = this.seasonalData.timeRemaining;
                return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
            };
            countdownDisplay.textContent = formatCountdown();
        }
    }

    startCapabilityConstellation() {
        const nodes = document.querySelectorAll('.capability-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.classList.add('node-ignited');
                this.createCapabilityAura(node);
            }, index * 300);
        });
    }

    setupEventHandlers() {
        // Navigation system
        document.querySelectorAll('.rune-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const realm = link.dataset.realm;
                this.navigateToRealm(realm);
            });
        });

        // Theme toggle
        const themeNexus = document.getElementById('theme-nexus');
        if (themeNexus) {
            themeNexus.addEventListener('click', () => this.toggleDimensionalTheme());
        }

        // CTA Buttons - FIXED: Now properly navigates to auth realm
        const igniteOracle = document.getElementById('ignite-oracle');
        if (igniteOracle) {
            igniteOracle.addEventListener('click', () => this.initiateOracleAccess());
        }

        // Authentication
        const credMatrix = document.getElementById('cred-matrix');
        if (credMatrix) {
            credMatrix.addEventListener('submit', (e) => this.handleAuthentication(e));
        }

        // Scanner buttons
        document.querySelectorAll('.scanner-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleBiometricAuth(e));
        });

        // Capability nodes
        document.querySelectorAll('.capability-node').forEach(node => {
            node.addEventListener('click', (e) => this.handleCapabilityActivation(e));
        });

        // Modal handlers
        document.querySelectorAll('.ascension-continue').forEach(btn => {
            btn.addEventListener('click', () => this.closeAscensionModal());
        });

        // Seasonal chamber
        document.querySelectorAll('.ascension-btn').forEach(btn => {
            btn.addEventListener('click', () => this.joinSeason());
        });
    }

    navigateToRealm(realmId) {
        // Update navigation state
        document.querySelectorAll('.rune-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const targetLink = document.querySelector(`[data-realm="${realmId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // Hide current realm
        document.querySelectorAll('.realm').forEach(realm => {
            realm.classList.remove('active');
        });
        
        // Hide realm content container first
        document.getElementById('realm-content').style.display = 'none';

        // Show target realm or generate dynamic content
        let targetRealm = document.getElementById(`${realmId}-realm`);
        
        if (targetRealm) {
            targetRealm.classList.add('active');
        } else {
            // Generate dynamic realm content
            this.loadDynamicRealm(realmId);
        }

        this.currentRealm = realmId;
        this.updateURL(realmId);
    }

    loadDynamicRealm(realmId) {
        const realmContent = document.getElementById('realm-content');
        realmContent.innerHTML = this.generateRealmContent(realmId);
        
        // Show the dynamic content container
        realmContent.style.display = 'block';
        
        // Initialize realm-specific features
        this.initializeRealmFeatures(realmId);
    }

    generateRealmContent(realmId) {
        const generators = {
            'sanctum': () => this.generateSanctumDashboard(),
            'console': () => this.generateRunConsole(),
            'heatmap': () => this.generateHeatmapAnalyzer(),
            'badge-vault': () => this.generateBadgeVault(),
            'guild-hall': () => this.generateGuildHall(),
            'leaderboard': () => this.generateGlobalLeaderboard(),
            'integration': () => this.generateIntegrationHub(),
            'trust-center': () => this.generateTrustCenter()
        };

        const generator = generators[realmId];
        return generator ? generator() : this.generatePlaceholderRealm(realmId);
    }

    generateSanctumDashboard() {
        return `
            <section class="realm sanctum-realm active">
                <div class="sanctum-grid">
                    <div class="sanctum-header">
                        <h1 class="cosmic-title gradient-text">This is your sanctum</h1>
                        <p class="sanctum-subtitle matrix-text">All runs begin here</p>
                    </div>

                    <div class="dashboard-constellation">
                        <!-- XP Tracking Widget -->
                        <div class="cosmic-widget xp-nexus glass-morphism electric-border">
                            <div class="widget-header">
                                <h3 class="widget-title gradient-text">Power Level XP</h3>
                                <div class="level-badge">LVL ${this.userData.level}</div>
                            </div>
                            <div class="xp-visualization">
                                <div class="xp-orb">
                                    <div class="orb-core"></div>
                                    <div class="xp-progress-ring">
                                        <svg class="progress-circle" viewBox="0 0 200 200">
                                            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(62, 205, 239, 0.2)" stroke-width="8"/>
                                            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#xpGradient)" stroke-width="8" 
                                                    stroke-dasharray="${(this.userData.currentXP / this.userData.maxXP) * 565} 565" 
                                                    stroke-linecap="round" transform="rotate(-90 100 100)"/>
                                        </svg>
                                        <div class="xp-display">
                                            <div class="current-xp">${this.userData.currentXP.toLocaleString()}</div>
                                            <div class="xp-separator">/</div>
                                            <div class="max-xp">${this.userData.maxXP.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="xp-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Rank</span>
                                        <span class="stat-value">#${this.userData.rank}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Streak</span>
                                        <span class="stat-value">${this.userData.streak} Days 🔥</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Favorite Workspaces -->
                        <div class="cosmic-widget workspace-nexus glass-morphism electric-border">
                            <div class="widget-header">
                                <h3 class="widget-title gradient-text">Favorite Workspaces</h3>
                                <button class="add-workspace-btn" onclick="scriptOracle.createWorkspace()">+ New Realm</button>
                            </div>
                            <div class="workspace-constellation">
                                ${this.workspaces.map(ws => `
                                    <div class="workspace-crystal ${ws.status.toLowerCase()}" onclick="scriptOracle.activateWorkspace('${ws.name}')">
                                        <div class="crystal-aura ${ws.glow}"></div>
                                        <div class="crystal-core">
                                            <div class="workspace-icon">${this.getWorkspaceIcon(ws.status)}</div>
                                            <div class="workspace-name">${ws.name}</div>
                                            <div class="workspace-status">${ws.status}</div>
                                            <div class="workspace-activity">${ws.lastActive}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- ERC-30 Function Debugging -->
                        <div class="cosmic-widget debug-nexus glass-morphism electric-border">
                            <div class="widget-header">
                                <h3 class="widget-title gradient-text">ERC-30 Function A</h3>
                                <div class="debug-status">
                                    <div class="progress-indicator">${this.activeRuns[0].progress}%</div>
                                    <div class="status-badge in-progress">Debugging</div>
                                </div>
                            </div>
                            <div class="debug-visualization">
                                <div class="code-preview matrix-text">
                                    <pre><code>${this.activeRuns[0].code}</code></pre>
                                </div>
                                <div class="error-analysis">
                                    <div class="error-glyph">⚠️</div>
                                    <div class="error-message">${this.activeRuns[0].error}</div>
                                </div>
                                <div class="debug-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${this.activeRuns[0].progress}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Daily Heatmap -->
                        <div class="cosmic-widget heatmap-nexus glass-morphism electric-border">
                            <div class="widget-header">
                                <h3 class="widget-title gradient-text">Daily Heatmap</h3>
                                <div class="streak-display">
                                    <span class="flame-icon">🔥</span>
                                    <span class="streak-number">${this.userData.streak} Days</span>
                                </div>
                            </div>
                            <div class="heatmap-grid" id="sanctum-heatmap">
                                ${this.generateActivityHeatmap()}
                            </div>
                        </div>

                        <!-- Badge Showcase -->
                        <div class="cosmic-widget badge-nexus glass-morphism electric-border">
                            <div class="widget-header">
                                <h3 class="widget-title gradient-text">Badge Collection</h3>
                                <button class="view-vault-btn" onclick="scriptOracle.navigateToRealm('badge-vault')">View Vault</button>
                            </div>
                            <div class="badge-showcase">
                                ${this.userData.badges.slice(0, 4).map(badge => `
                                    <div class="badge-crystal" onclick="scriptOracle.inspectBadge('${badge}')">
                                        <div class="badge-aura"></div>
                                        <div class="badge-core">
                                            <div class="badge-icon">${this.getBadgeIcon(badge)}</div>
                                            <div class="badge-name">${badge}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateRunConsole() {
        return `
            <section class="realm console-realm active">
                <div class="console-nexus">
                    <div class="console-header">
                        <h1 class="cosmic-title gradient-text">Live Debugging Console</h1>
                        <p class="console-subtitle matrix-text">Real-time code execution with AI Oracle</p>
                    </div>

                    <div class="console-grid">
                        <!-- Code Editor Chamber -->
                        <div class="editor-chamber glass-morphism electric-border">
                            <div class="chamber-header">
                                <h3 class="chamber-title gradient-text">Cosmic Code Editor</h3>
                                <div class="editor-controls">
                                    <button class="oracle-execute-btn" onclick="scriptOracle.executeCode()">
                                        <span class="btn-rune">⚡</span>
                                        Execute Oracle
                                    </button>
                                    <button class="save-btn">💾 Save</button>
                                    <button class="analyze-btn">🔍 Analyze</button>
                                </div>
                            </div>
                            <div class="code-matrix">
                                <div class="line-numbers" id="line-numbers">
                                    ${Array.from({length: 20}, (_, i) => `<div class="line-number">${i + 1}</div>`).join('')}
                                </div>
                                <textarea class="code-editor matrix-text" id="cosmic-editor" placeholder="// Enter your code for cosmic analysis...
function processTransaction(amount) {
    if (amount <= 0) {
        throw new Error('Amount must be positive');
    }
    return approveTransaction(amount);
}">${this.activeRuns[0].code}</textarea>
                            </div>
                        </div>

                        <!-- Execution Stream -->
                        <div class="stream-chamber glass-morphism electric-border">
                            <div class="chamber-header">
                                <h3 class="chamber-title gradient-text">Matrix Execution Stream</h3>
                                <div class="stream-status">
                                    <div class="status-orb pulsing"></div>
                                    <span class="matrix-text">Real-time Analysis</span>
                                </div>
                            </div>
                            <div class="execution-matrix" id="execution-matrix">
                                <div class="matrix-line success">
                                    <span class="timestamp">14:32:01.247</span>
                                    <span class="line-ref">L1:</span>
                                    <span class="message">Function declaration validated ✓</span>
                                </div>
                                <div class="matrix-line warning">
                                    <span class="timestamp">14:32:02.156</span>
                                    <span class="line-ref">L2:</span>
                                    <span class="message">Type checking: amount parameter</span>
                                </div>
                                <div class="matrix-line error">
                                    <span class="timestamp">14:32:03.423</span>
                                    <span class="line-ref">L3:</span>
                                    <span class="message">Error: approveTransaction not defined ⚠️</span>
                                </div>
                                <div class="matrix-line ai">
                                    <span class="timestamp">14:32:04.512</span>
                                    <span class="line-ref">AI:</span>
                                    <span class="message">Suggesting: Import approveTransaction from utils</span>
                                </div>
                                <div class="matrix-line processing">
                                    <span class="timestamp">14:32:05.089</span>
                                    <span class="line-ref">SYS:</span>
                                    <span class="message">Applying cosmic patch recommendations...</span>
                                </div>
                            </div>
                        </div>

                        <!-- Patch Management -->
                        <div class="patch-chamber glass-morphism electric-border">
                            <div class="chamber-header">
                                <h3 class="chamber-title gradient-text">Cosmic Patches</h3>
                                <div class="patch-counter">3 pending</div>
                            </div>
                            <div class="patch-constellation">
                                <div class="patch-crystal">
                                    <div class="patch-info">
                                        <div class="patch-title">Import Enhancement</div>
                                        <div class="patch-description">Add missing import statement</div>
                                    </div>
                                    <div class="patch-actions">
                                        <button class="approve-btn" onclick="scriptOracle.approvePatch('import')">Approve</button>
                                        <button class="reject-btn">Reject</button>
                                    </div>
                                </div>
                                <div class="patch-crystal">
                                    <div class="patch-info">
                                        <div class="patch-title">Type Guardian</div>
                                        <div class="patch-description">Add runtime type validation</div>
                                    </div>
                                    <div class="patch-actions">
                                        <button class="approve-btn" onclick="scriptOracle.approvePatch('type-guard')">Approve</button>
                                        <button class="reject-btn">Reject</button>
                                    </div>
                                </div>
                                <div class="patch-crystal">
                                    <div class="patch-info">
                                        <div class="patch-title">Security Shield</div>
                                        <div class="patch-description">Enhance error handling</div>
                                    </div>
                                    <div class="patch-actions">
                                        <button class="approve-btn" onclick="scriptOracle.approvePatch('security')">Approve</button>
                                        <button class="reject-btn">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Cosmic Metrics -->
                        <div class="metrics-chamber glass-morphism electric-border">
                            <div class="chamber-header">
                                <h3 class="chamber-title gradient-text">Cosmic Metrics</h3>
                            </div>
                            <div class="metrics-constellation">
                                <div class="metric-crystal">
                                    <div class="metric-value gradient-text">94%</div>
                                    <div class="metric-label">Quality Score</div>
                                    <div class="metric-trend positive">+2%</div>
                                </div>
                                <div class="metric-crystal">
                                    <div class="metric-value gradient-text">2.3s</div>
                                    <div class="metric-label">Execution Time</div>
                                    <div class="metric-trend negative">+0.1s</div>
                                </div>
                                <div class="metric-crystal">
                                    <div class="metric-value gradient-text">3</div>
                                    <div class="metric-label">Issues Found</div>
                                    <div class="metric-trend neutral">±0</div>
                                </div>
                                <div class="metric-crystal">
                                    <div class="metric-value gradient-text">+47</div>
                                    <div class="metric-label">XP Earned</div>
                                    <div class="metric-trend positive">+15</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateHeatmapAnalyzer() {
        return `
            <section class="realm heatmap-realm active">
                <div class="heatmap-nexus">
                    <div class="heatmap-header">
                        <h1 class="cosmic-title gradient-text">Run Heatmap XP</h1>
                        <p class="heatmap-subtitle matrix-text">Solo-leveling style activity visualization</p>
                    </div>

                    <div class="heatmap-controls">
                        <div class="time-selector">
                            <button class="time-rune active" data-range="7d">7 Days</button>
                            <button class="time-rune" data-range="30d">30 Days</button>
                            <button class="time-rune" data-range="90d">90 Days</button>
                            <button class="time-rune" data-range="1y">1 Year</button>
                        </div>
                        <div class="view-selector">
                            <button class="view-rune active" data-view="commits">Commits</button>
                            <button class="view-rune" data-view="debugging">Debugging</button>
                            <button class="view-rune" data-view="reviews">Reviews</button>
                        </div>
                    </div>

                    <div class="heatmap-chamber glass-morphism electric-border">
                        <div class="heatmap-matrix" id="activity-calendar">
                            ${this.generateFullHeatmap()}
                        </div>
                        <div class="heatmap-legend">
                            <span class="legend-label">Less</span>
                            <div class="legend-colors">
                                <div class="legend-color level-0"></div>
                                <div class="legend-color level-1"></div>
                                <div class="legend-color level-2"></div>
                                <div class="legend-color level-3"></div>
                                <div class="legend-color level-4"></div>
                            </div>
                            <span class="legend-label">More</span>
                        </div>
                    </div>

                    <div class="heatmap-stats-constellation">
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">${this.userData.streak}</div>
                            <div class="stat-label">Current Streak</div>
                            <div class="stat-trend positive">+2 days</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">47</div>
                            <div class="stat-label">Best Streak</div>
                            <div class="stat-trend neutral">Personal Record</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">342</div>
                            <div class="stat-label">Total Sessions</div>
                            <div class="stat-trend positive">+15 this week</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">2.3k</div>
                            <div class="stat-label">Bugs Fixed</div>
                            <div class="stat-trend positive">+127 this month</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateBadgeVault() {
        const allBadges = [
            { name: 'Winter Debugger', icon: '❄️', rarity: 'legendary', earned: true, description: 'Survived the Winter Season trials with honor' },
            { name: 'Bug Slayer', icon: '⚔️', rarity: 'epic', earned: true, description: 'Eliminated 1000+ bugs from the digital realm' },
            { name: 'Guardian', icon: '🛡️', rarity: 'epic', earned: true, description: 'Protected code from security vulnerabilities' },
            { name: 'Patch Champion', icon: '🏆', rarity: 'rare', earned: true, description: 'Created 100+ successful patches' },
            { name: 'Code Whisperer', icon: '🌟', rarity: 'legendary', earned: false, description: 'Achieved 95%+ code quality rating' },
            { name: 'Night Owl', icon: '🦉', rarity: 'common', earned: false, description: 'Debugged code after midnight hours' },
            { name: 'Speed Demon', icon: '⚡', rarity: 'rare', earned: false, description: 'Fixed a critical bug in under 60 seconds' },
            { name: 'Phoenix Rising', icon: '🔥', rarity: 'mythic', earned: false, description: 'Recovered from a catastrophic system failure' }
        ];

        return `
            <section class="realm badge-vault-realm active">
                <div class="vault-nexus">
                    <div class="vault-header">
                        <h1 class="cosmic-title gradient-text">Badge Vault</h1>
                        <p class="vault-subtitle matrix-text">Your collection of cosmic achievements</p>
                    </div>

                    <div class="vault-stats">
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">${allBadges.filter(b => b.earned).length}</div>
                            <div class="stat-label">Badges Earned</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">${allBadges.filter(b => b.rarity === 'legendary').length}</div>
                            <div class="stat-label">Legendary</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">${Math.round((allBadges.filter(b => b.earned).length / allBadges.length) * 100)}%</div>
                            <div class="stat-label">Completion</div>
                        </div>
                        <div class="stat-crystal glass-morphism">
                            <div class="stat-value gradient-text">${allBadges.filter(b => b.rarity === 'mythic').length}</div>
                            <div class="stat-label">Mythic</div>
                        </div>
                    </div>

                    <div class="badge-filters">
                        <button class="filter-rune active" data-filter="all">All Badges</button>
                        <button class="filter-rune" data-filter="earned">Earned</button>
                        <button class="filter-rune" data-filter="locked">Locked</button>
                        <button class="filter-rune" data-filter="legendary">Legendary</button>
                        <button class="filter-rune" data-filter="mythic">Mythic</button>
                    </div>

                    <div class="badges-constellation">
                        ${allBadges.map((badge, index) => `
                            <div class="badge-shrine ${badge.earned ? 'earned' : 'locked'} ${badge.rarity}" 
                                 onclick="scriptOracle.inspectBadge('${badge.name}')"
                                 style="--shrine-delay: ${index * 0.1}s">
                                <div class="shrine-aura ${badge.rarity}"></div>
                                <div class="shrine-pedestal">
                                    <div class="badge-hologram">
                                        <div class="hologram-icon">${badge.earned ? badge.icon : '🔒'}</div>
                                        <div class="hologram-particles"></div>
                                    </div>
                                    <div class="badge-inscription">
                                        <div class="badge-name">${badge.name}</div>
                                        <div class="badge-rarity ${badge.rarity}">${badge.rarity.toUpperCase()}</div>
                                    </div>
                                </div>
                                ${!badge.earned ? '<div class="lock-field"></div>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generateGlobalLeaderboard() {
        return `
            <section class="realm leaderboard-realm active">
                <div class="leaderboard-nexus">
                    <div class="leaderboard-header">
                        <h1 class="cosmic-title gradient-text">Global Leaderboard</h1>
                        <p class="leaderboard-subtitle matrix-text">Compete with elite debuggers across dimensions</p>
                    </div>

                    <div class="leaderboard-filters">
                        <button class="filter-rune active" data-period="all-time">All Time</button>
                        <button class="filter-rune" data-period="season">This Season</button>
                        <button class="filter-rune" data-period="monthly">Monthly</button>
                        <button class="filter-rune" data-period="weekly">Weekly</button>
                    </div>

                    <div class="champions-podium">
                        ${this.leaderboard.slice(0, 3).map((player, index) => `
                            <div class="podium-position position-${index + 1}">
                                <div class="champion-aura rank-${index + 1}"></div>
                                <div class="champion-crystal">
                                    <div class="rank-crown">${index + 1}</div>
                                    <div class="champion-avatar">${player.name.charAt(0)}</div>
                                    <div class="champion-info">
                                        <div class="champion-name gradient-text">${player.name}</div>
                                        <div class="champion-guild">${player.guild}</div>
                                        <div class="champion-level">Level ${player.level}</div>
                                    </div>
                                    <div class="champion-xp">${player.xp.toLocaleString()} XP</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="leaderboard-matrix glass-morphism electric-border">
                        ${this.leaderboard.map(player => `
                            <div class="rank-entry ${player.name === this.userData.username ? 'current-user' : ''}">
                                <div class="rank-position">
                                    <div class="position-number">#${player.rank}</div>
                                </div>
                                <div class="player-avatar">${player.name.charAt(0)}</div>
                                <div class="player-info">
                                    <div class="player-name ${player.name === this.userData.username ? 'gradient-text' : ''}">${player.name}</div>
                                    <div class="player-guild">${player.guild}</div>
                                </div>
                                <div class="player-level">Level ${player.level}</div>
                                <div class="player-xp gradient-text">${player.xp.toLocaleString()}</div>
                                <div class="player-actions">
                                    <button class="challenge-btn" onclick="scriptOracle.challengePlayer('${player.name}')">Challenge</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generateIntegrationHub() {
        return `
            <section class="realm integration-realm active">
                <div class="integration-nexus">
                    <div class="integration-header">
                        <h1 class="cosmic-title gradient-text">Integration Hub</h1>
                        <p class="integration-subtitle matrix-text">Connect your development ecosystem</p>
                    </div>

                    <div class="integration-constellation">
                        ${this.integrations.map(integration => `
                            <div class="integration-crystal ${integration.status}" onclick="scriptOracle.toggleIntegration('${integration.name}')">
                                <div class="crystal-aura ${integration.status}"></div>
                                <div class="crystal-core">
                                    <div class="integration-icon">${integration.icon}</div>
                                    <div class="integration-info">
                                        <div class="integration-name">${integration.name}</div>
                                        <div class="integration-status ${integration.status}">${integration.status.toUpperCase()}</div>
                                        ${integration.xp > 0 ? `<div class="integration-xp">${integration.xp.toLocaleString()} XP earned</div>` : ''}
                                    </div>
                                    <div class="integration-actions">
                                        <button class="connection-btn ${integration.status === 'connected' ? 'disconnect' : 'connect'}">
                                            ${integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generateTrustCenter() {
        return `
            <section class="realm trust-realm active">
                <div class="trust-nexus">
                    <div class="trust-header">
                        <h1 class="cosmic-title gradient-text">Trust Center</h1>
                        <p class="trust-subtitle matrix-text">Security, compliance, and transparency</p>
                    </div>

                    <div class="security-constellation">
                        <div class="security-crystal glass-morphism electric-border">
                            <h3 class="crystal-title gradient-text">🛡️ Security Certifications</h3>
                            <div class="certification-list">
                                <div class="cert-item">
                                    <span class="cert-icon">✅</span>
                                    <span class="cert-name">SOC 2 Type II</span>
                                </div>
                                <div class="cert-item">
                                    <span class="cert-icon">✅</span>
                                    <span class="cert-name">GDPR Compliant</span>
                                </div>
                                <div class="cert-item">
                                    <span class="cert-icon">✅</span>
                                    <span class="cert-name">ISO 27001</span>
                                </div>
                                <div class="cert-item">
                                    <span class="cert-icon">✅</span>
                                    <span class="cert-name">End-to-End Encryption</span>
                                </div>
                            </div>
                        </div>

                        <div class="security-crystal glass-morphism electric-border">
                            <h3 class="crystal-title gradient-text">🌍 Regional Status</h3>
                            <div class="region-matrix">
                                <div class="region-item">
                                    <div class="region-name">Americas</div>
                                    <div class="region-status operational">96.51%</div>
                                </div>
                                <div class="region-item">
                                    <div class="region-name">Europe</div>
                                    <div class="region-status operational">100%</div>
                                </div>
                                <div class="region-item">
                                    <div class="region-name">APAC</div>
                                    <div class="region-status operational">99.02%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateGuildHall() {
        return `
            <section class="realm guild-realm active">
                <div class="guild-nexus">
                    <div class="guild-header">
                        <h1 class="cosmic-title gradient-text">Guild Hall</h1>
                        <p class="guild-subtitle matrix-text">Collaborate with fellow code masters</p>
                    </div>

                    <div class="guild-chamber glass-morphism electric-border">
                        <h3 class="chamber-title gradient-text">Code Guardians Guild</h3>
                        <p class="guild-description">Elite debugging collective • Level 15 Guild • 47 Members</p>
                        
                        <div class="guild-stats">
                            <div class="guild-stat">
                                <div class="stat-value gradient-text">15</div>
                                <div class="stat-label">Guild Level</div>
                            </div>
                            <div class="guild-stat">
                                <div class="stat-value gradient-text">47</div>
                                <div class="stat-label">Active Members</div>
                            </div>
                            <div class="guild-stat">
                                <div class="stat-value gradient-text">2.3M</div>
                                <div class="stat-label">Total XP</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Utility Functions
    generateActivityHeatmap() {
        let heatmapHTML = '';
        for (let week = 0; week < 7; week++) {
            for (let day = 0; day < 53; day++) {
                const intensity = Math.floor(Math.random() * 5);
                heatmapHTML += `<div class="heatmap-cell level-${intensity}" 
                                     title="Week ${week}, Day ${day}" 
                                     onclick="scriptOracle.showActivityDetail(${week}, ${day})"></div>`;
            }
        }
        return heatmapHTML;
    }

    generateFullHeatmap() {
        let heatmapHTML = '<div class="heatmap-grid">';
        for (let week = 0; week < 53; week++) {
            for (let day = 0; day < 7; day++) {
                const intensity = Math.floor(Math.random() * 5);
                heatmapHTML += `<div class="heatmap-cell level-${intensity}" 
                                     title="Week ${week}, Day ${day}" 
                                     onclick="scriptOracle.showActivityDetail(${week}, ${day})"></div>`;
            }
        }
        heatmapHTML += '</div>';
        return heatmapHTML;
    }

    getWorkspaceIcon(status) {
        const icons = {
            'Active': '⚡',
            'Idle': '💤', 
            'Processing': '🔄',
            'Complete': '✅'
        };
        return icons[status] || '📁';
    }

    getBadgeIcon(badge) {
        const icons = {
            'Winter Debugger': '❄️',
            'Bug Slayer': '⚔️',
            'Guardian': '🛡️',
            'Patch Champion': '🏆'
        };
        return icons[badge] || '🏅';
    }

    getCosmicColor() {
        const colors = ['#3ECDEF', '#FD1D75', '#F601C0', '#055CCC', '#8B5CF6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Event Handlers
    toggleDimensionalTheme() {
        const toggle = document.getElementById('theme-nexus');
        toggle.classList.toggle('dark');
        
        // Add cosmic transition effect
        document.body.classList.add('dimensional-shift');
        setTimeout(() => {
            document.body.classList.remove('dimensional-shift');
        }, 600);
        
        this.showAscension('Dimensional Shift', 'Reality frequency adjusted', '🌌');
    }

    // FIXED: Now properly navigates to auth realm
    initiateOracleAccess() {
        this.showCosmicLoading('Channeling cosmic energies...');
        
        setTimeout(() => {
            this.hideCosmicLoading();
            // Navigate to the auth realm instead of staying on hero
            this.navigateToRealm('auth');
        }, 2500);
    }

    handleAuthentication(e) {
        e.preventDefault();
        this.showCosmicLoading('Authenticating with cosmic database...');
        
        setTimeout(() => {
            this.isAuthenticated = true;
            this.hideCosmicLoading();
            this.showAscension('Welcome Back, Oracle', 'Authentication successful', '👑');
            this.navigateToRealm('sanctum');
        }, 2000);
    }

    handleBiometricAuth(e) {
        const authType = e.target.closest('.scanner-btn').classList[1].replace('-scanner', '');
        this.showCosmicLoading(`Connecting to ${authType} neural link...`);
        
        setTimeout(() => {
            this.isAuthenticated = true;
            this.hideCosmicLoading();
            this.showAscension('Neural Link Established', `Connected via ${authType}`, '🔗');
            this.navigateToRealm('sanctum');
        }, 2500);
    }

    handleCapabilityActivation(e) {
        const capability = e.target.closest('.capability-node').dataset.capability;
        this.showAscension('Capability Unlocked', `${capability.replace('-', ' ')} powers activated`, '⚡');
    }

    // Real-time Systems
    initializeRealTimeStreams() {
        this.startXPUpdates();
        this.startCountdownUpdates();
        this.startMatrixStream();
        this.startProgressUpdates();
    }

    startRealTimeUpdates() {
        // XP progression simulation
        setInterval(() => {
            if (Math.random() < 0.15) { // 15% chance
                this.gainXP(Math.floor(Math.random() * 25) + 5);
            }
        }, 8000);

        // Progress updates
        setInterval(() => {
            this.updateRunProgress();
        }, 5000);

        // Countdown updates - FIXED: Now properly updates countdown
        setInterval(() => {
            this.updateSeasonalCountdown();
        }, 60000); // Update every minute
    }

    startMatrixStream() {
        const streamContainer = document.getElementById('execution-matrix');
        if (!streamContainer) return;

        setInterval(() => {
            this.addMatrixLine();
        }, 3000);
    }

    gainXP(amount) {
        this.userData.currentXP += amount;
        
        if (this.userData.currentXP >= this.userData.maxXP) {
            this.userData.level++;
            this.userData.currentXP = this.userData.currentXP - this.userData.maxXP;
            this.userData.maxXP = Math.floor(this.userData.maxXP * 1.15);
            this.showAscension('Level Ascension!', `Welcome to Level ${this.userData.level}!`, '🎉');
        }
        
        this.updateUserProfile();
        this.showXPGain(amount);
    }

    showXPGain(amount) {
        const xpNotification = document.createElement('div');
        xpNotification.className = 'xp-ascension';
        xpNotification.textContent = `+${amount} XP`;
        document.body.appendChild(xpNotification);
        
        setTimeout(() => {
            xpNotification.style.opacity = '0';
            xpNotification.style.transform = 'translateY(-100px)';
        }, 100);
        
        setTimeout(() => {
            if (document.body.contains(xpNotification)) {
                document.body.removeChild(xpNotification);
            }
        }, 2000);
    }

    addMatrixLine() {
        const streamContainer = document.getElementById('execution-matrix');
        if (!streamContainer) return;

        const messages = [
            'Memory optimization complete ✓',
            'Scanning for potential vulnerabilities...',
            'AI suggestion: Refactor for better performance',
            'Type inference analysis running...',
            'Security audit passed ✓',
            'Code complexity: Moderate',
            'Applying cosmic debugging enhancements...'
        ];

        const types = ['success', 'info', 'ai', 'warning', 'processing'];
        const timestamp = new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 1000);
        
        const line = document.createElement('div');
        line.className = `matrix-line ${types[Math.floor(Math.random() * types.length)]}`;
        line.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <span class="line-ref">SYS:</span>
            <span class="message">${messages[Math.floor(Math.random() * messages.length)]}</span>
        `;
        
        streamContainer.appendChild(line);
        streamContainer.scrollTop = streamContainer.scrollHeight;
        
        // Keep only last 20 lines
        while (streamContainer.children.length > 20) {
            streamContainer.removeChild(streamContainer.firstChild);
        }
    }

    updateRunProgress() {
        if (this.activeRuns.length > 0) {
            const run = this.activeRuns[0];
            if (run.progress < 100 && Math.random() < 0.4) {
                run.progress = Math.min(100, run.progress + Math.floor(Math.random() * 8) + 1);
                
                if (run.progress >= 100) {
                    run.status = 'Complete';
                    this.showAscension('Debugging Complete!', `${run.name} analysis finished`, '✅');
                }
                
                this.updateProgressDisplays();
            }
        }
    }

    updateProgressDisplays() {
        document.querySelectorAll('.progress-fill').forEach((fill, index) => {
            if (this.activeRuns[index]) {
                const progress = this.activeRuns[index].progress;
                fill.style.width = progress + '%';
            }
        });
        
        document.querySelectorAll('.progress-indicator').forEach((indicator, index) => {
            if (this.activeRuns[index]) {
                indicator.textContent = this.activeRuns[index].progress + '%';
            }
        });
    }

    // Advanced Interaction Systems
    executeCode() {
        this.showCosmicLoading('Analyzing code with Cosmic AI Oracle...');
        
        setTimeout(() => {
            this.hideCosmicLoading();
            this.gainXP(47);
            this.showAscension('Code Analysis Complete', 'Cosmic patterns identified and optimized', '🔮');
            this.addMatrixLine();
        }, 3500);
    }

    approvePatch(patchType) {
        this.showCosmicLoading('Applying cosmic patch...');
        
        setTimeout(() => {
            this.hideCosmicLoading();
            this.gainXP(25);
            this.showAscension('Patch Applied', `${patchType} enhancement successfully integrated`, '✨');
        }, 2000);
    }

    activateWorkspace(name) {
        this.navigateToRealm('console');
        this.showAscension('Workspace Activated', `Entered ${name} debugging realm`, '🚪');
    }

    inspectBadge(badgeName) {
        this.showAscension(badgeName, 'Achievement unlocked through cosmic mastery', this.getBadgeIcon(badgeName));
    }

    joinSeason() {
        this.showCosmicLoading('Joining Winter Season...');
        
        setTimeout(() => {
            this.hideCosmicLoading();
            this.showAscension('Season Joined!', 'Winter trials await your courage', '❄️');
        }, 2000);
    }

    toggleIntegration(name) {
        const integration = this.integrations.find(i => i.name === name);
        if (integration) {
            const newStatus = integration.status === 'connected' ? 'available' : 'connected';
            integration.status = newStatus;
            
            this.showAscension('Integration Updated', `${name} ${newStatus}`, '🔗');
        }
    }

    challengePlayer(playerName) {
        this.showAscension('Challenge Sent!', `Debugging duel request sent to ${playerName}`, '⚔️');
    }

    createWorkspace() {
        this.showAscension('Workspace Created', 'New debugging realm initialized', '🏗️');
    }

    showActivityDetail(week, day) {
        this.showAscension('Activity Detail', `Week ${week}, Day ${day} - Detailed breakdown available`, '📊');
    }

    // Modal and Loading Systems
    showAscension(title, message, icon = '⚡') {
        const modal = document.getElementById('ascension-modal');
        const titleElement = modal.querySelector('.achievement-decree');
        const messageElement = modal.querySelector('.achievement-essence');
        const iconElement = modal.querySelector('.achievement-glyph');
        
        titleElement.textContent = title;
        messageElement.textContent = message;
        iconElement.textContent = icon;
        
        modal.classList.remove('hidden');
        
        // Auto-close after 4 seconds
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 4000);
    }

    closeAscensionModal() {
        document.getElementById('ascension-modal').classList.add('hidden');
    }

    showCosmicLoading(text = 'Channeling cosmic energy...') {
        const loading = document.getElementById('cosmic-loading');
        const loadingText = loading.querySelector('.loading-essence');
        loadingText.textContent = text;
        loading.classList.remove('hidden');
    }

    hideCosmicLoading() {
        document.getElementById('cosmic-loading').classList.add('hidden');
    }

    // Advanced Animation Helpers
    createElectricSpark(x, y) {
        const spark = document.createElement('div');
        spark.className = 'electric-spark';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        document.body.appendChild(spark);
        
        setTimeout(() => {
            if (document.body.contains(spark)) {
                document.body.removeChild(spark);
            }
        }, 1000);
    }

    activateElectricBorder(element) {
        element.classList.add('electric-active');
    }

    deactivateElectricBorder(element) {
        element.classList.remove('electric-active');
    }

    triggerRandomLaserFlow() {
        const elements = document.querySelectorAll('.glass-morphism');
        if (elements.length > 0) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            randomElement.classList.add('laser-active');
            
            setTimeout(() => {
                randomElement.classList.remove('laser-active');
            }, 2000);
        }
    }

    animateMatrixText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                element.textContent += text[i];
            }, i * 50);
        }
    }

    enhanceBentoMagic(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    highlightOrbitalConnections(node) {
        // Add visual connections between orbital elements
        node.classList.add('orbital-highlighted');
    }

    clearOrbitalHighlights() {
        document.querySelectorAll('.orbital-highlighted').forEach(el => {
            el.classList.remove('orbital-highlighted');
        });
    }

    showOrbitalTooltip(node) {
        // Create and show tooltip for orbital node
        const tooltip = document.createElement('div');
        tooltip.className = 'orbital-tooltip';
        tooltip.textContent = node.dataset.label + ' - Click to activate';
        document.body.appendChild(tooltip);
    }

    hideOrbitalTooltip() {
        document.querySelectorAll('.orbital-tooltip').forEach(tooltip => {
            tooltip.remove();
        });
    }

    updateURL(realm) {
        history.pushState({ realm }, '', `#${realm}`);
    }

    // Initialize realm-specific features
    initializeRealmFeatures(realmId) {
        switch(realmId) {
            case 'console':
                this.initCodeEditor();
                break;
            case 'sanctum':
                this.initSanctumWidgets();
                break;
            case 'badge-vault':
                this.initBadgeFilters();
                break;
            case 'heatmap':
                this.initHeatmapControls();
                break;
            case 'leaderboard':
                this.initLeaderboardFilters();
                break;
        }
    }

    initCodeEditor() {
        const editor = document.getElementById('cosmic-editor');
        if (editor) {
            editor.addEventListener('input', () => {
                this.updateLineNumbers();
                // Simulate real-time analysis
                if (Math.random() < 0.3) {
                    this.addMatrixLine();
                }
            });
        }
    }

    updateLineNumbers() {
        const editor = document.getElementById('cosmic-editor');
        const lineNumbers = document.getElementById('line-numbers');
        if (editor && lineNumbers) {
            const lines = editor.value.split('\n').length;
            lineNumbers.innerHTML = Array.from({length: Math.max(20, lines)}, (_, i) => 
                `<div class="line-number">${i + 1}</div>`
            ).join('');
        }
    }

    initSanctumWidgets() {
        // Initialize interactive widgets in the sanctum
        this.startProgressAnimations();
    }

    startProgressAnimations() {
        document.querySelectorAll('.essence-fill').forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            if (progress) {
                setTimeout(() => {
                    fill.style.width = progress + '%';
                }, 500);
            }
        });
    }

    initBadgeFilters() {
        document.querySelectorAll('.filter-rune').forEach(filter => {
            filter.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-rune').forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
                
                const filterType = e.target.dataset.filter;
                this.filterBadges(filterType);
            });
        });
    }

    filterBadges(filterType) {
        const badges = document.querySelectorAll('.badge-shrine');
        badges.forEach(badge => {
            let show = true;
            
            switch(filterType) {
                case 'earned':
                    show = badge.classList.contains('earned');
                    break;
                case 'locked':
                    show = badge.classList.contains('locked');
                    break;
                case 'legendary':
                    show = badge.classList.contains('legendary');
                    break;
                case 'mythic':
                    show = badge.classList.contains('mythic');
                    break;
            }
            
            badge.style.display = show ? 'block' : 'none';
        });
    }

    initHeatmapControls() {
        document.querySelectorAll('.time-rune').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-rune').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        document.querySelectorAll('.view-rune').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-rune').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    initLeaderboardFilters() {
        document.querySelectorAll('.filter-rune').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-rune').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    setupRealmNavigation() {
        // Handle browser navigation
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.realm) {
                this.navigateToRealm(e.state.realm);
            }
        });
        
        // Set initial state
        const initialRealm = window.location.hash.replace('#', '') || 'hero-realm';
        if (initialRealm !== 'hero-realm') {
            this.navigateToRealm(initialRealm);
        }
    }
}

// Initialize the Script Oracle Engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scriptOracle = new ScriptOracleEngine();
});

// Add dynamic CSS for enhanced effects
const enhancedStyles = `
.xp-ascension {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #3ECDEF, #FD1D75);
    color: white;
    padding: 15px 30px;
    border-radius: 30px;
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: 18px;
    z-index: 10000;
    transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
    opacity: 1;
    box-shadow: 0 0 30px rgba(62, 205, 239, 0.8);
}

.electric-spark {
    position: fixed;
    width: 4px;
    height: 4px;
    background: #3ECDEF;
    border-radius: 50%;
    pointer-events: none;
    animation: sparkExplosion 1s ease-out forwards;
    z-index: 9998;
}

@keyframes sparkExplosion {
    0% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 5px #3ECDEF;
    }
    100% {
        opacity: 0;
        transform: scale(20);
        box-shadow: 0 0 50px #FD1D75;
    }
}

.cursor-moving .cursor-lightning {
    box-shadow: 0 0 30px rgba(253, 29, 117, 1);
}

.cursor-hover .cursor-lightning {
    transform: scale(1.5);
    background: #FD1D75;
}

.cursor-hover .cursor-aura {
    border-width: 3px;
    opacity: 0.8;
}

.electric-active::before {
    opacity: 1 !important;
    animation: electricSurge 0.5s ease-out;
}

@keyframes electricSurge {
    0% { opacity: 0; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
}

.laser-active::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3ECDEF, transparent);
    animation: laserSweep 1.5s ease-in-out;
}

@keyframes laserSweep {
    0% { left: -100%; }
    100% { left: 100%; }
}

.dimensional-shift {
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    filter: hue-rotate(180deg) saturate(1.2);
}

.node-ignited {
    animation: nodeIgnition 0.8s ease-out;
}

@keyframes nodeIgnition {
    0% {
        opacity: 0;
        transform: scale(0.5) rotate(-180deg);
        filter: brightness(0);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.2) rotate(-90deg);
        filter: brightness(1.5);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
        filter: brightness(1);
    }
}

.orbital-highlighted {
    box-shadow: 0 0 20px rgba(62, 205, 239, 0.8) !important;
    transform: scale(1.1) !important;
}

.orbital-tooltip {
    position: fixed;
    background: rgba(0, 26, 101, 0.95);
    border: 1px solid rgba(62, 205, 239, 0.5);
    border-radius: 8px;
    padding: 8px 12px;
    color: #3ECDEF;
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    z-index: 10001;
    pointer-events: none;
    backdrop-filter: blur(20px);
}

/* Sanctum Dashboard Styles */
.sanctum-grid {
    padding: 2rem;
}

.dashboard-constellation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.cosmic-widget {
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(62, 205, 239, 0.2);
    transition: all 0.4s ease;
}

.cosmic-widget:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(62, 205, 239, 0.3);
}

.widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.widget-title {
    font-size: 1.2rem;
    font-weight: 700;
}

.workspace-constellation {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.workspace-crystal {
    position: relative;
    padding: 1rem;
    border-radius: 12px;
    background: rgba(62, 205, 239, 0.05);
    border: 1px solid rgba(62, 205, 239, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.workspace-crystal:hover {
    transform: scale(1.05);
    background: rgba(62, 205, 239, 0.1);
}

/* Console Styles */
.console-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 2rem;
}

.editor-chamber {
    grid-column: 1 / -1;
    border-radius: 16px;
    padding: 2rem;
}

.code-matrix {
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    overflow: hidden;
}

.line-numbers {
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: rgba(62, 205, 239, 0.6);
    min-width: 60px;
}

.code-editor {
    flex: 1;
    background: transparent;
    border: none;
    color: #3ECDEF;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    padding: 1rem;
    resize: none;
    min-height: 300px;
}

.code-editor:focus {
    outline: none;
}

.execution-matrix {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 1rem;
    max-height: 400px;
    overflow-y: auto;
}

.matrix-line {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
}

.matrix-line.success { color: #3ECDEF; }
.matrix-line.warning { color: #F59E0B; }
.matrix-line.error { color: #FD1D75; }
.matrix-line.ai { color: #8B5CF6; }
.matrix-line.info { color: #A5E4EE; }
.matrix-line.processing { color: #FD1D75; }

/* Heatmap Styles */
.heatmap-grid {
    display: grid;
    grid-template-columns: repeat(53, 1fr);
    gap: 2px;
    margin: 2rem 0;
}

.heatmap-cell {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.heatmap-cell.level-0 { background: rgba(62, 205, 239, 0.1); }
.heatmap-cell.level-1 { background: rgba(62, 205, 239, 0.3); }
.heatmap-cell.level-2 { background: rgba(62, 205, 239, 0.5); }
.heatmap-cell.level-3 { background: rgba(62, 205, 239, 0.7); }
.heatmap-cell.level-4 { background: rgba(62, 205, 239, 1); }

.heatmap-cell:hover {
    transform: scale(1.5);
    box-shadow: 0 0 10px rgba(62, 205, 239, 0.8);
}

@media (max-width: 1200px) {
    .dashboard-constellation {
        grid-template-columns: 1fr;
    }
    
    .console-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .cosmic-widget {
        padding: 1rem;
    }
    
    .workspace-constellation {
        grid-template-columns: 1fr;
    }
}
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);