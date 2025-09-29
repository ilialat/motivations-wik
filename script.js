// Main JavaScript for Motivational Landing Page

class MotivationalLandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupCountdown();
        this.setupTypingAnimation();
        this.setupCatBackground();
        this.addLoadingClass();
    }

    // Countdown Timer to October 5th
    setupCountdown() {
        const targetDate = new Date('2025-10-05T00:00:00');
        
        const updateCountdown = () => {
            const now = new Date();
            const timeRemaining = targetDate - now;

            if (timeRemaining <= 0) {
                this.displayBirthdayMessage();
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        };

        // Update immediately and then every second
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }

    displayBirthdayMessage() {
        clearInterval(this.countdownInterval);
        
        // Replace countdown with birthday message
        const countdownSection = document.querySelector('.countdown-section');
        countdownSection.innerHTML = `
            <h2 class="countdown-title">🎉 Happy Birthday! 🎉</h2>
            <div class="birthday-celebration">
                <div class="celebration-text">Hope your special day is amazing!</div>
                <div class="celebration-emoji">🎂🎈🎁✨</div>
            </div>
        `;
    }

    // Typing Animation for Quotes
    setupTypingAnimation() {
        const quoteElement = document.getElementById('quote-text');
        const cursorElement = document.getElementById('cursor');
        
        if (!motivationalQuotes || motivationalQuotes.length === 0) {
            quoteElement.textContent = "Believe in yourself and all that you are.";
            return;
        }

        // Get random quote
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        
        // Clear any existing content
        quoteElement.textContent = '';
        
        // Typing animation
        let currentChar = 0;
        const typingSpeed = 50; // milliseconds per character
        
        const typeWriter = () => {
            if (currentChar < randomQuote.length) {
                quoteElement.textContent += randomQuote.charAt(currentChar);
                currentChar++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Animation complete, hide cursor after a delay
                setTimeout(() => {
                    cursorElement.style.opacity = '0';
                }, 2000);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Cat Background Setup
    setupCatBackground() {
        const backgroundContainer = document.querySelector('.background-container');
        
        // Array of cat image APIs and fallback images
        const catImageSources = [
            'https://api.thecatapi.com/v1/images/search?size=full',
            'https://cataas.com/cat',
            'https://thiscatdoesnotexist.com/',
            'https://placekitten.com/1920/1080'
        ];

        // Fallback cat images (in case APIs are down)
        const fallbackImages = [
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ];

        this.loadCatImage(backgroundContainer, fallbackImages);
    }

    async loadCatImage(container, fallbackImages) {
        try {
            // Try to get a random cat from The Cat API
            const response = await fetch('https://api.thecatapi.com/v1/images/search?size=full');
            if (response.ok) {
                const data = await response.json();
                if (data && data[0] && data[0].url) {
                    this.setCatBackground(container, data[0].url);
                    return;
                }
            }
        } catch (error) {
            console.log('Cat API failed, trying fallback images');
        }

        // Fallback to random Unsplash cat image
        const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        this.setCatBackground(container, randomFallback);
    }

    setCatBackground(container, imageUrl) {
        // Create a new image element to preload
        const img = new Image();
        
        img.onload = () => {
            container.style.backgroundImage = `url(${imageUrl})`;
            container.style.opacity = '1';
        };
        
        img.onerror = () => {
            // If image fails to load, use a solid color background
            container.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            container.style.opacity = '1';
        };
        
        img.src = imageUrl;
    }

    // Add loading animation class
    addLoadingClass() {
        document.body.classList.add('loading');
        
        // Hide loading spinner after content is ready
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 2000);
    }

    // Utility method to refresh the page (can be called manually)
    refresh() {
        location.reload();
    }
}

// Additional utility functions

// Function to add sparkle effect on click
function addSparkleEffect(event) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ffd93d, #ff6b6b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${event.clientX - 5}px;
        top: ${event.clientY - 5}px;
        animation: sparkleAnimation 0.6s ease-out forwards;
    `;

    document.body.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 600);
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Add sparkle CSS to document
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Press 'R' to refresh
    if (event.key.toLowerCase() === 'r' && !event.ctrlKey && !event.metaKey) {
        location.reload();
    }
    
    // Press Space to add sparkles at random positions
    if (event.key === ' ') {
        event.preventDefault();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                addSparkleEffect({ clientX: x, clientY: y });
            }, i * 100);
        }
    }
});

// Add click sparkle effect to the whole document
document.addEventListener('click', addSparkleEffect);

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = new MotivationalLandingPage();
    
    // Make refresh function globally available
    window.refreshPage = () => landingPage.refresh();
    
    // Add some console easter eggs
    console.log('%c🌟 Welcome to your Motivational Landing Page! 🌟', 'color: #ffd93d; font-size: 16px; font-weight: bold;');
    console.log('%cPress "R" to refresh, or Space for sparkles! ✨', 'color: #ff6b6b; font-size: 12px;');
    console.log('%cMade with ❤️ for your birthday countdown!', 'color: #667eea; font-size: 12px;');
});

// Handle page visibility changes (when user returns to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh content when page becomes visible again
        setTimeout(() => {
            location.reload();
        }, 500);
    }
});

// Add some fun animations for mobile touch
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            addSparkleEffect({ clientX: touch.clientX, clientY: touch.clientY });
        }
    });
}

// Performance optimization: Preload next quote
setTimeout(() => {
    if (motivationalQuotes && motivationalQuotes.length > 1) {
        const nextQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        // Store in sessionStorage for potential future use
        sessionStorage.setItem('nextQuote', nextQuote);
    }
}, 3000);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MotivationalLandingPage;
}