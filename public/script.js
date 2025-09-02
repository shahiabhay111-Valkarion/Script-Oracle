// Script Oracle - Divine Debugger JavaScript
// Production-ready implementation with OpenRouter API integration
// For optimal results, structure code in Next.js components and extract styling into Tailwind class utilities

class ScriptOracle {
    constructor() {
        this.apiEndpoint = 'https://openrouter.ai/api/v1/chat/completions';
        this.model = 'deepseek/deepseek-r1-0528:free';
        this.maxChars = 15000;
        this.currentSession = null;
        this.sessions = JSON.parse(localStorage.getItem('oracle-sessions') || '[]');
        this.isStreaming = false;
        
        // Bind methods to maintain context
        this.summonAthena = this.summonAthena.bind(this);
        this.clearSanctum = this.clearSanctum.bind(this);
        this.toggleFixes = this.toggleFixes.bind(this);
        this.downloadScroll = this.downloadScroll.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupParticles();
        this.updateCharacterCount();
        this.setupAutoSave();
        this.initializeTheme();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Main functionality buttons
        const summonBtn = document.getElementById('summonAthena');
        const clearBtn = document.getElementById('clearSanctum');
        const revealBtn = document.getElementById('revealFixes');
        const downloadBtn = document.getElementById('downloadScroll');
        const codeInput = document.getElementById('codeInput');
        const languageSelect = document.getElementById('languageSelect');
        const themeToggle = document.getElementById('themeToggle');

        // Button event listeners with proper error handling
        if (summonBtn) {
            summonBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.summonAthena();
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearSanctum();
            });
        }
        
        if (revealBtn) {
            revealBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleFixes();
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadScroll();
            });
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Input event listeners
        if (codeInput) {
            codeInput.addEventListener('input', () => this.updateCharacterCount());
            codeInput.addEventListener('paste', () => {
                setTimeout(() => this.updateCharacterCount(), 10);
            });
        }

        if (languageSelect) {
            languageSelect.addEventListener('change', () => this.onLanguageChange());
        }

        // Modal event listeners
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create cosmic particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    updateCharacterCount() {
        const codeInput = document.getElementById('codeInput');
        const charCount = document.getElementById('charCount');
        const maxChars = document.getElementById('maxChars');
        
        if (!codeInput || !charCount) return;

        const currentLength = codeInput.value.length;
        charCount.textContent = currentLength.toLocaleString();
        
        // Visual feedback for character limit
        if (currentLength > this.maxChars * 0.9) {
            charCount.style.color = '#ec4899'; // Pink warning
        } else if (currentLength > this.maxChars * 0.7) {
            charCount.style.color = '#fbbf24'; // Gold warning
        } else {
            charCount.style.color = '#a855f7'; // Amethyst normal
        }

        // Update button state
        const summonBtn = document.getElementById('summonAthena');
        if (summonBtn) {
            summonBtn.disabled = currentLength === 0 || currentLength > this.maxChars;
        }
    }

    setupAutoSave() {
        const codeInput = document.getElementById('codeInput');
        if (!codeInput) return;

        let saveTimeout;
        codeInput.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                this.autoSave();
            }, 1000); // Save after 1 second of inactivity
        });

        // Load saved content on page load
        const savedCode = localStorage.getItem('oracle-autosave');
        if (savedCode) {
            codeInput.value = savedCode;
            this.updateCharacterCount();
        }
    }

    autoSave() {
        const codeInput = document.getElementById('codeInput');
        if (!codeInput) return;

        localStorage.setItem('oracle-autosave', codeInput.value);
        this.showToast('Code auto-saved', 'success');
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('oracle-theme') || 'cosmic';
        document.body.className = savedTheme + '-theme';
        this.updateThemeToggle();
    }

    toggleTheme() {
        const currentTheme = document.body.className.includes('cosmic') ? 'cosmic' : 'light';
        const newTheme = currentTheme === 'cosmic' ? 'light' : 'cosmic';
        
        document.body.className = newTheme + '-theme';
        localStorage.setItem('oracle-theme', newTheme);
        this.updateThemeToggle();
        
        this.showToast(`Switched to ${newTheme} theme`, 'success');
    }

    updateThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const isCosmicTheme = document.body.className.includes('cosmic');
        themeToggle.textContent = isCosmicTheme ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Switch to ${isCosmicTheme ? 'light' : 'cosmic'} theme`);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to summon Athena
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.summonAthena();
            }
            
            // Ctrl/Cmd + K to clear sanctum
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.clearSanctum();
            }
            
            // Ctrl/Cmd + D to download
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.downloadScroll();
            }
        });
    }

    async summonAthena() {
        if (this.isStreaming) return;

        const codeInput = document.getElementById('codeInput');
        const languageSelect = document.getElementById('languageSelect');
        const summonBtn = document.getElementById('summonAthena');
        const statusIndicator = document.getElementById('statusIndicator');
        const resultsContainer = document.getElementById('resultsContainer');

        if (!codeInput || !codeInput.value.trim()) {
            this.showToast('Please provide code to analyze', 'error');
            return;
        }

        if (codeInput.value.length > this.maxChars) {
            this.showToast(`Code exceeds ${this.maxChars.toLocaleString()} character limit`, 'error');
            return;
        }

        this.isStreaming = true;
        this.setUIState('loading');

        try {
            const language = languageSelect?.value || 'unknown';
            const code = codeInput.value.trim();
            
            // Prepare the prompt for debugging
            const prompt = this.createDebuggingPrompt(code, language);
            
            // Call OpenRouter API
            const response = await this.callOpenRouterAPI(prompt);
            
            if (response) {
                await this.displayStreamingResponse(response);
                this.setUIState('success');
                this.enableActionButtons(true);
                
                // Save session
                this.saveSession({
                    code,
                    language,
                    response,
                    timestamp: new Date().toISOString()
                });
            } else {
                throw new Error('No response received from AI service');
            }
            
        } catch (error) {
            console.error('Summon Athena error:', error);
            this.setUIState('error');
            this.showToast('Failed to connect to the Oracle. Please try again.', 'error');
            this.displayError(error.message);
        } finally {
            this.isStreaming = false;
        }
    }

    createDebuggingPrompt(code, language) {
        return `You are Athena, a divine code oracle. Analyze the following ${language} code with cosmic precision and provide:

1. **Divine Insights**: Overall code analysis and potential issues
2. **Sacred Diagnostics**: Specific bugs, errors, or improvements needed
3. **Mystical Corrections**: Exact fixes and optimizations
4. **Prophetic Guidance**: Best practices and recommendations

Be thorough, precise, and mystical in your analysis. Format your response with clear sections and actionable advice.

\`\`\`${language}
${code}
\`\`\``;
    }

    async callOpenRouterAPI(prompt) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            throw new Error('OpenRouter API key not configured');
        }

        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Script Oracle - Divine Debugger'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.7,
                stream: false // Set to true for streaming if needed
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    }

    getApiKey() {
        // In production, this should be handled securely on the backend
        // For demo purposes, you can set this in localStorage or environment
        return localStorage.getItem('openrouter-api-key') || 
               prompt('Please enter your OpenRouter API key:');
    }

    async displayStreamingResponse(content) {
        const resultsContainer = document.getElementById('resultsContainer');
        const streamingResponse = document.getElementById('streamingResponse');
        const responseContent = document.getElementById('responseContent');
        const emptyState = resultsContainer.querySelector('.empty-state');

        if (emptyState) emptyState.style.display = 'none';
        if (streamingResponse) streamingResponse.style.display = 'block';

        // Simulate streaming effect
        if (responseContent) {
            responseContent.innerHTML = '';
            const words = content.split(' ');
            
            for (let i = 0; i < words.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 20));
                responseContent.innerHTML += words[i] + ' ';
                responseContent.scrollTop = responseContent.scrollHeight;
            }
        }

        // Parse and display structured content
        this.parseAndDisplayAnalysis(content);
    }

    parseAndDisplayAnalysis(content) {
        const errorCards = document.getElementById('errorCards');
        if (!errorCards) return;

        // Extract potential issues and create error cards
        const issues = this.extractIssues(content);
        
        if (issues.length > 0) {
            errorCards.innerHTML = '';
            errorCards.style.display = 'block';
            
            issues.forEach((issue, index) => {
                const card = this.createErrorCard(issue, index);
                errorCards.appendChild(card);
            });
        }
    }

    extractIssues(content) {
        // Simple pattern matching to extract issues
        const issues = [];
        const lines = content.split('\n');
        
        for (const line of lines) {
            if (line.includes('error') || line.includes('bug') || line.includes('issue') || line.includes('problem')) {
                issues.push({
                    type: 'error',
                    message: line.trim(),
                    severity: this.determineSeverity(line)
                });
            }
        }
        
        return issues;
    }

    determineSeverity(line) {
        const lowerLine = line.toLowerCase();
        if (lowerLine.includes('critical') || lowerLine.includes('fatal')) return 'high';
        if (lowerLine.includes('warning') || lowerLine.includes('minor')) return 'low';
        return 'medium';
    }

    createErrorCard(issue, index) {
        const card = document.createElement('div');
        card.className = `error-card severity-${issue.severity}`;
        card.innerHTML = `
            <div class="error-header">
                <span class="error-icon">${this.getErrorIcon(issue.severity)}</span>
                <span class="error-type">${issue.type.toUpperCase()}</span>
                <span class="error-severity severity-${issue.severity}">${issue.severity.toUpperCase()}</span>
            </div>
            <div class="error-message">${issue.message}</div>
            <button class="error-toggle" onclick="scriptOracle.toggleErrorDetails(${index})">
                Show Details
            </button>
            <div class="error-details" id="errorDetails${index}" style="display: none;">
                <p>Detailed analysis and suggested fixes would appear here.</p>
            </div>
        `;
        return card;
    }

    getErrorIcon(severity) {
        switch (severity) {
            case 'high': return '🚨';
            case 'medium': return '⚠️';
            case 'low': return '💡';
            default: return '🔍';
        }
    }

    toggleErrorDetails(index) {
        const details = document.getElementById(`errorDetails${index}`);
        if (details) {
            const isVisible = details.style.display !== 'none';
            details.style.display = isVisible ? 'none' : 'block';
            
            const button = details.previousElementSibling;
            if (button) {
                button.textContent = isVisible ? 'Show Details' : 'Hide Details';
            }
        }
    }

    clearSanctum() {
        const codeInput = document.getElementById('codeInput');
        const resultsContainer = document.getElementById('resultsContainer');
        const emptyState = resultsContainer?.querySelector('.empty-state');
        const streamingResponse = document.getElementById('streamingResponse');
        const errorCards = document.getElementById('errorCards');
        const fixesSection = document.getElementById('fixesSection');

        if (codeInput) codeInput.value = '';
        if (streamingResponse) streamingResponse.style.display = 'none';
        if (errorCards) errorCards.style.display = 'none';
        if (fixesSection) fixesSection.style.display = 'none';
        if (emptyState) emptyState.style.display = 'flex';

        this.updateCharacterCount();
        this.setUIState('idle');
        this.enableActionButtons(false);
        localStorage.removeItem('oracle-autosave');
        
        this.showToast('Sanctum cleared successfully', 'success');
    }

    toggleFixes() {
        const fixesSection = document.getElementById('fixesSection');
        const revealBtn = document.getElementById('revealFixes');
        
        if (!fixesSection || !revealBtn) return;

        const isVisible = fixesSection.style.display !== 'none';
        fixesSection.style.display = isVisible ? 'none' : 'block';
        revealBtn.textContent = isVisible ? '✨ Reveal Fixes' : '🔮 Hide Fixes';
        
        if (!isVisible) {
            // Generate sample fixes if not already present
            const fixesContent = document.getElementById('fixesContent');
            if (fixesContent && !fixesContent.innerHTML.trim()) {
                fixesContent.innerHTML = `
                    <div class="fix-item">
                        <h5>🔧 Optimization Suggestion</h5>
                        <p>Consider using more efficient algorithms or data structures.</p>
                        <pre><code>// Optimized code example would appear here</code></pre>
                    </div>
                `;
            }
        }
    }

    downloadScroll() {
        const codeInput = document.getElementById('codeInput');
        const languageSelect = document.getElementById('languageSelect');
        const responseContent = document.getElementById('responseContent');
        
        if (!codeInput?.value.trim()) {
            this.showToast('No code to download', 'error');
            return;
        }

        const language = languageSelect?.value || 'text';
        const code = codeInput.value;
        const analysis = responseContent?.textContent || '';
        
        const content = `# Script Oracle Analysis Report
Generated: ${new Date().toLocaleString()}
Language: ${language}

## Original Code:
\`\`\`${language}
${code}
\`\`\`

## Divine Analysis:
${analysis}

---
Purified by Script Oracle - Divine Debugger
Built by the Unseen. Forged for the Infinite.
`;

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `oracle-analysis-${Date.now()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Sacred scroll downloaded successfully', 'success');
    }

    setUIState(state) {
        const summonBtn = document.getElementById('summonAthena');
        const statusIndicator = document.getElementById('statusIndicator');
        const loadingElement = document.getElementById('summonLoading');
        
        if (!summonBtn || !statusIndicator) return;

        const statusDot = statusIndicator.querySelector('.status-dot');
        const statusText = statusIndicator.querySelector('.status-text');

        switch (state) {
            case 'loading':
                summonBtn.disabled = true;
                summonBtn.classList.add('loading');
                if (loadingElement) loadingElement.style.display = 'block';
                if (statusText) statusText.textContent = 'Communing with Oracle...';
                if (statusDot) statusDot.style.background = '#fbbf24';
                break;
                
            case 'success':
                summonBtn.disabled = false;
                summonBtn.classList.remove('loading');
                if (loadingElement) loadingElement.style.display = 'none';
                if (statusText) statusText.textContent = 'Divine wisdom received';
                if (statusDot) statusDot.style.background = '#10b981';
                break;
                
            case 'error':
                summonBtn.disabled = false;
                summonBtn.classList.remove('loading');
                if (loadingElement) loadingElement.style.display = 'none';
                if (statusText) statusText.textContent = 'Oracle connection failed';
                if (statusDot) statusDot.style.background = '#ef4444';
                break;
                
            default: // idle
                summonBtn.disabled = false;
                summonBtn.classList.remove('loading');
                if (loadingElement) loadingElement.style.display = 'none';
                if (statusText) statusText.textContent = 'Awaiting invocation';
                if (statusDot) statusDot.style.background = '#9333ea';
        }
    }

    enableActionButtons(enabled) {
        const revealBtn = document.getElementById('revealFixes');
        const downloadBtn = document.getElementById('downloadScroll');
        
        if (revealBtn) revealBtn.disabled = !enabled;
        if (downloadBtn) downloadBtn.disabled = !enabled;
    }

    saveSession(sessionData) {
        const session = {
            id: Date.now(),
            ...sessionData
        };
        
        this.sessions.unshift(session);
        
        // Keep only last 10 sessions
        if (this.sessions.length > 10) {
            this.sessions = this.sessions.slice(0, 10);
        }
        
        localStorage.setItem('oracle-sessions', JSON.stringify(this.sessions));
    }

    displayError(message) {
        const resultsContainer = document.getElementById('resultsContainer');
        const emptyState = resultsContainer?.querySelector('.empty-state');
        
        if (emptyState) {
            emptyState.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">⚡</div>
                    <h3>Oracle Connection Disrupted</h3>
                    <p>${message}</p>
                    <button class="btn btn-outline" onclick="location.reload()">
                        Reconnect to Oracle
                    </button>
                </div>
            `;
            emptyState.style.display = 'flex';
        }
    }

    onLanguageChange() {
        const languageSelect = document.getElementById('languageSelect');
        if (!languageSelect) return;
        
        const selectedLanguage = languageSelect.value;
        this.showToast(`Language set to ${selectedLanguage}`, 'success');
        
        // Save language preference
        localStorage.setItem('oracle-language', selectedLanguage);
        
        // Update code input placeholder based on language
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            const placeholders = {
                python: 'def debug_me():\n    # Your Python code here\n    pass',
                javascript: 'function debugMe() {\n    // Your JavaScript code here\n}',
                typescript: 'function debugMe(): void {\n    // Your TypeScript code here\n}',
                cpp: '#include <iostream>\nint main() {\n    // Your C++ code here\n    return 0;\n}',
                java: 'public class DebugMe {\n    public static void main(String[] args) {\n        // Your Java code here\n    }\n}',
                csharp: 'using System;\npublic class DebugMe {\n    public static void Main() {\n        // Your C# code here\n    }\n}',
                go: 'package main\nimport "fmt"\nfunc main() {\n    // Your Go code here\n}',
                rust: 'fn main() {\n    // Your Rust code here\n}',
                php: '<?php\n// Your PHP code here\n?>',
                ruby: '# Your Ruby code here\ndef debug_me\nend'
            };
            
            codeInput.placeholder = placeholders[selectedLanguage] || 
                'Paste your sacred code scrolls here... The Oracle awaits your invocation.';
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${this.getToastIcon(type)}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// Global functions for HTML onclick handlers
function scrollToDebugger() {
    document.getElementById('debugger')?.scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function openGithub() {
    window.open('https://github.com/shahiabhay111-Valkarion/Script-Oracle', '_blank');
}

function openModal(modalId) {
    scriptOracle.openModal(modalId);
}

function closeModal(modalId) {
    scriptOracle.closeModal(modalId);
}

// Initialize the application when DOM is loaded
let scriptOracle;

document.addEventListener('DOMContentLoaded', () => {
    scriptOracle = new ScriptOracle();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add loading state to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.innerHTML += ' <span style="font-size:0.8em;">↗</span>';
        });
    });

    // Initialize tooltips for complex elements
    initializeTooltips();
    
    // Set up intersection observer for animations
    setupScrollAnimations();
    
    console.log('🔮 Script Oracle - Divine Debugger initialized');
    console.log('Built by the Unseen. Forged for the Infinite.');
    console.log('For optimal results, structure code in Next.js components and extract styling into Tailwind class utilities.');
});

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = event.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .trust-metric, .debugger-panel, .results-panel')
        .forEach(el => observer.observe(el));
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptOracle;
}