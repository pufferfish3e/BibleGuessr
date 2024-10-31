// hints.js

// Animation timing constants
const TRANSITION_DURATION = 500;
const BUTTON_ANIMATION_DURATION = 200;
const HINT_SLIDE_DURATION = 300;

class HintSystem {
    constructor() {
        // Initialize element references
        this.elements = {
            hint1: {
                button: document.querySelector('.show-hints'),
                container: document.querySelector('.hints'),
                text: document.querySelector('.hints .hint')
            },
            hint2: {
                button: document.querySelector('.show-hints-2'),
                container: document.querySelector('.hints-2'),
                text: document.querySelector('.hints-2 .hint')
            }
        };

        this.initializeSystem();
    }

    initializeSystem() {
        // Validate elements exist
        if (!this.validateElements()) {
            console.error('Required hint elements are missing');
            return;
        }

        // Set initial states
        this.setInitialStates();

        // Bind event listeners
        this.bindEvents();
    }

    validateElements() {
        return Object.values(this.elements).every(
            ({button, container, text}) => button && container && text
        );
    }

    setInitialStates() {
        // Hide hint containers initially
        Object.values(this.elements).forEach(({container}) => {
            container.style.display = 'none';
        });

        // Set transitions for hint texts
        Object.values(this.elements).forEach(({text}) => {
            text.style.transition = 'transform 0.3s ease-in-out';
        });
    }

    bindEvents() {
        // Bind button click events
        Object.values(this.elements).forEach(({button, container}) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContainer(container);
                this.animateButtonPress(button);
            });
        });

        // Bind hint reveal events
        Object.values(this.elements).forEach(({text}) => {
            text.addEventListener('click', () => this.revealHint(text));
        });
    }

    toggleContainer(container) {
        const isHidden = container.style.display === 'none' || !container.style.display;

        if (isHidden) {
            // Show container
            container.style.opacity = '0';
            container.style.display = 'block';
            container.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out`;

            // Force reflow
            void container.offsetHeight;

            // Fade in
            container.style.opacity = '1';
        } else {
            // Fade out
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.display = 'none';
            }, TRANSITION_DURATION);
        }
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, BUTTON_ANIMATION_DURATION);
    }

    revealHint(hintElement) {
        if (hintElement.getAttribute('data-show') !== 'true') {
            const hintText = hintElement.getAttribute('data-hint');
            if (!hintText) {
                console.warn('Hint is missing data-hint attribute');
                return;
            }

            // Slide animation
            hintElement.style.transform = 'translateX(10px)';
            hintElement.textContent = hintText;
            hintElement.setAttribute('data-show', 'true');

            // Reset position
            setTimeout(() => {
                hintElement.style.transform = 'translateX(0)';
            }, HINT_SLIDE_DURATION);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HintSystem();
});