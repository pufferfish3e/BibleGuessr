const wordList = [
    'dead', 'death', 'decay', 'december', 'decline', 'deep',
    'degree', 'delay', 'deliver', 'demand', 'democracy',
    'demonstrate', 'dental', 'deny', 'depend', 'deposit',
    'depression', 'depth', 'deputy', 'derive', 'describe',
    'desert', 'design', 'desire', 'desk', 'destroy',
    'detail', 'detect', 'determine', 'develop'
];

const textInput = document.getElementById('textInput');
const suggestionsDiv = document.getElementById('suggestions');

textInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    suggestionsDiv.innerHTML = '';

    if (inputValue.length < 2) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const matchingWords = wordList.filter(word => 
        word.toLowerCase().startsWith(inputValue)
    );

    if (matchingWords.length > 0) {
        suggestionsDiv.style.display = 'block';
        matchingWords.forEach(word => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = word;
            div.addEventListener('click', function() {
                textInput.value = word;
                suggestionsDiv.style.display = 'none';
            });
            suggestionsDiv.appendChild(div);
        });
    } else {
        suggestionsDiv.style.display = 'none';
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!textInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
        suggestionsDiv.style.display = 'none';
    }
});

// Add input validation for number fields
const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach(input => {
    input.addEventListener('input', function() {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    const hintElements = document.querySelectorAll('.hint');
    const hintDropdowns = document.querySelectorAll('.hint-dropdown');

    
    hintElements.forEach((hint, index) => {
        hint.addEventListener('click', function(e) {
            e.stopPropagation();

            
            hintDropdowns.forEach((dropdown, dropIndex) => {
                if (dropIndex !== index) {
                    dropdown.classList.remove('active');
                    hintElements[dropIndex].classList.remove('active');
                }
            });

            
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
    });

    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hint-container')) {
            hintDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            hintElements.forEach(hint => {
                hint.classList.remove('active');
            });
        }
    });
});

function resizeTextArea() {
  const textArea = document.querySelector('.text-area-container');
  const textContent = textArea.querySelector('.text-display');
  textArea.style.height = 'auto';
  textArea.style.height = textContent.scrollHeight + 'px';
}