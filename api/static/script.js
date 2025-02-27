const TRANSITION_DURATION = 500;
const BUTTON_ANIMATION_DURATION = 500;
const HINT_SLIDE_DURATION = 300;
const validWords = [
    "genesis", "exodus", "leviticus", "numbers", "deuteronomy", 
    "joshua", "judges", "ruth", "1 samuel", "2 samuel", 
    "1 kings", "2 kings", "1 chronicles", "2 chronicles", 
    "ezra", "nehemiah", "esther", "job", "psalms", "proverbs", 
    "ecclesiastes", "song of solomon", "isaiah", "jeremiah", 
    "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", 
    "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", 
    "haggai", "zechariah", "malachi", "matthew", "mark", "luke", 
    "john", "acts", "romans", "1 corinthians", "2 corinthians", 
    "galatians", "ephesians", "philippians", "colossians", 
    "1 thessalonians", "2 thessalonians", "1 timothy", "2 timothy", 
    "titus", "philemon", "hebrews", "james", "1 peter", "2 peter", 
    "1 john", "2 john", "3 john", "jude", "revelation"
];

class HintSystem {
    constructor() {
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
        if (!this.validateElements()) {
            console.error('Required hint elements are missing');
            return;
        }
        this.setInitialStates();
        this.bindEvents();
    }

    validateElements() {
        return Object.values(this.elements).every(
            ({button, container, text}) => button && container && text
        );
    }

    setInitialStates() {
        Object.values(this.elements).forEach(({container}) => {
            container.style.display = 'none';
        });

        Object.values(this.elements).forEach(({text}) => {
            text.style.transition = 'transform 0.3s ease-in-out';
        });
    }

    bindEvents() {
        Object.values(this.elements).forEach(({button, container}) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContainer(container);
                this.animateButtonPress(button);
            });
        });

        Object.values(this.elements).forEach(({text}) => {
            text.addEventListener('click', () => this.revealHint(text));
        });
    }

    toggleContainer(container) {
        const isHidden = container.style.display === 'none' || !container.style.display;

        if (isHidden) {
            container.style.opacity = '0';
            container.style.display = 'block';
            container.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out`;

            void container.offsetHeight;

            container.style.opacity = '1';
        } else {
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

            hintElement.style.transform = 'translateX(10px)';
            hintElement.textContent = hintText;
            hintElement.setAttribute('data-show', 'true');

            setTimeout(() => {
                hintElement.style.transform = 'translateX(0)';
            }, HINT_SLIDE_DURATION);
        }
    }
}

// Input Validation
const textInput = document.getElementById('textInput');
const form = textInput.closest('form');

function validateInput(input) {
    const trimmedInput = input.trim().toLowerCase();
    return validWords.includes(trimmedInput);
}

form.addEventListener('submit', function(event) {
    const inputValue = textInput.value;

    if (!validateInput(inputValue)) {
        // Prevent form submission
        event.preventDefault();

        // Add error styling
        textInput.classList.add('error');

        // Create or find error message
        let errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.id = 'error-message';
            errorMessage.style.color = 'red';
            textInput.insertAdjacentElement('afterend', errorMessage);
        }
        errorMessage.textContent = 'Not a valid Book!';
    } else {
        // Remove error styling
        textInput.classList.remove('error');

        // Remove error message
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.remove();
        }

        // Log valid submission
        console.log('Valid word submitted:', inputValue);
    }
});

// Initialize Hint System
new HintSystem();
document.addEventListener('DOMContentLoaded', function() {
    const TRANSITION_DURATION = 500;
    const BUTTON_ANIMATION_DURATION = 500;
    const HINT_SLIDE_DURATION = 300;

    // Form validation
    const textInput = document.getElementById('textInput');
    const chapterInput = document.getElementById('chapterInput');
    const verseInput = document.getElementById('verseInput');
    
    if (textInput) {
        const form = textInput.closest('form');
        const validBooks = window.validBooks || [];  // This will be populated in the template

        function validateInput(input) {
            if (!input) return false;
            
            const trimmedInput = input.trim().toLowerCase();
            
            // Check if it's a valid book name
            for (const book of validBooks) {
                if (book.toLowerCase() === trimmedInput) {
                    return true;
                }
            }
            
            return false;
        }

        if (form) {
            form.addEventListener('submit', function(event) {
                const bookValue = textInput.value;
                const chapterValue = chapterInput.value;
                const verseValue = verseInput.value;
                let isValid = true;
                
                // Clear previous errors
                document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
                document.querySelectorAll('#error-message').forEach(el => el.remove());
                
                // Book validation
                if (!validateInput(bookValue)) {
                    isValid = false;
                    textInput.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.id = 'error-message';
                    errorMessage.textContent = 'Please enter a valid Bible book name';
                    textInput.insertAdjacentElement('afterend', errorMessage);
                }
                
                // Chapter validation
                if (!chapterValue || isNaN(parseInt(chapterValue)) || parseInt(chapterValue) <= 0) {
                    isValid = false;
                    chapterInput.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.id = 'error-message';
                    errorMessage.textContent = 'Please enter a valid chapter number';
                    chapterInput.insertAdjacentElement('afterend', errorMessage);
                }
                
                // Verse validation
                if (!verseValue || isNaN(parseInt(verseValue)) || parseInt(verseValue) <= 0) {
                    isValid = false;
                    verseInput.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.id = 'error-message';
                    errorMessage.textContent = 'Please enter a valid verse number';
                    verseInput.insertAdjacentElement('afterend', errorMessage);
                }
                
                if (!isValid) {
                    event.preventDefault();
                }
            });
        }
    }

    // Hint System
    class HintSystem {
        constructor() {
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
            if (!this.validateElements()) {
                console.error('Required hint elements are missing');
                return;
            }
            this.setInitialStates();
            this.bindEvents();
        }

        validateElements() {
            return Object.values(this.elements).every(
                ({button, container, text}) => button && container && text
            );
        }

        setInitialStates() {
            Object.values(this.elements).forEach(({container}) => {
                container.style.display = 'none';
            });

            Object.values(this.elements).forEach(({text}) => {
                text.style.transition = 'transform 0.3s ease-in-out';
            });
        }

        bindEvents() {
            // Toggle hint 1
            this.elements.hint1.button.addEventListener('click', () => {
                this.toggleHintVisibility('hint1');
            });

            // Toggle hint 2
            this.elements.hint2.button.addEventListener('click', () => {
                this.toggleHintVisibility('hint2');
            });
        }

        toggleHintVisibility(hintKey) {
            const {container, button} = this.elements[hintKey];
            
            if (container.style.display === 'none') {
                // Show the hint with animation
                container.style.display = 'block';
                container.style.opacity = '0';
                container.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    container.style.transition = `opacity ${HINT_SLIDE_DURATION}ms ease, transform ${HINT_SLIDE_DURATION}ms ease`;
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }, 10);
                
                button.textContent = `Hide ${hintKey === 'hint1' ? 'Book' : 'Chapter'} Hint`;
            } else {
                // Hide the hint with animation
                container.style.transition = `opacity ${HINT_SLIDE_DURATION}ms ease, transform ${HINT_SLIDE_DURATION}ms ease`;
                container.style.opacity = '0';
                container.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    container.style.display = 'none';
                }, HINT_SLIDE_DURATION);
                
                button.textContent = `Show ${hintKey === 'hint1' ? 'Book' : 'Chapter'} Hint`;
            }
        }
    }

    // Initialize Hint System if on the appropriate page
    if (document.querySelector('.show-hints')) {
        new HintSystem();
    }

    // Add glowing button effects
    const glowingButtons = document.querySelectorAll('.glowing-btn');
    glowingButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const txt = button.querySelector('.glowing-txt');
            if (txt) {
                txt.style.animation = 'none';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const txt = button.querySelector('.glowing-txt');
            if (txt) {
                setTimeout(() => {
                    txt.style.animation = 'text-pulse 2s infinite';
                }, 10);
            }
        });
    });
});
