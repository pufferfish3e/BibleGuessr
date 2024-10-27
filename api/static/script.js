const wordList = bible_books = [
       "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua",
       "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
       "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
       "Psalm", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah",
       "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
       "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
       "Zephaniah", "Haggai", "Zechariah", "Malachi",
       "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
       "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
       "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus",
       "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John",
       "3 John", "Jude", "Revelation"
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