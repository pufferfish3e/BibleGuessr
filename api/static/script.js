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
    const suggestionsDiv = document.getElementById('suggestions'); // Get the suggestions element

    // Clear previous suggestions
    suggestionsDiv.innerHTML = '';

    // If input is less than 2 characters, hide the suggestions 
    if (inputValue.length < 2) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    // Filter the word list for matching suggestions
    const matchingWords = wordList.filter(word => 
        word.toLowerCase().startsWith(inputValue)
    );

    // If there are suggestions, show the suggestions div and add them
    if (matchingWords.length > 0) {
        suggestionsDiv.style.display = 'block'; // Show the suggestions div
        matchingWords.forEach(word => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = word;
            div.addEventListener('click', function() {
                textInput.value = word;
                suggestionsDiv.style.display = 'none'; // Hide after selection
            });
            suggestionsDiv.appendChild(div); // Add the suggestion to the list
        });
    } else {
        suggestionsDiv.style.display = 'none'; // Hide if no suggestions
    }
});

document.addEventListener('click', function(e) {
 if (!textInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
     suggestionsDiv.style.display = 'none';
 }
});

const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach(input => {
 input.addEventListener('input', function() {
     this.value = this.value.replace(/[^0-9]/g, '');
 });
});

function resizeTextArea() {
const textArea = document.querySelector('.text-area-container');
const textContent = textArea.querySelector('.text-display');
textArea.style.height = 'auto';
textArea.style.height = textContent.scrollHeight + 'px';
}

const showHintsButton = document.querySelector('.show-hints');
const hintsContainer = document.querySelector('.hints');
const hints = document.querySelectorAll('.hint');

showHintsButton.addEventListener('click', () => {
hintsContainer.style.display = hintsContainer.style.display === 'none' ? 'block' : 'none';
});

hints.forEach(hint => {
hint.addEventListener('click', () => {
 // Get the hint text from the data-hint attribute
 const hintText = hint.getAttribute('data-hint');

 // Display the hint
 hint.textContent = hintText;
 hint.setAttribute('data-show', 'true'); 
});
});

const showHintsButton2 = document.querySelector('.show-hints-2');
showHintsButton2.addEventListener('click', () => {
const hintsContainer2 = document.querySelector('.hints-2');
hintsContainer2.style.display = hintsContainer2.style.display === 'none' ? 'block' : 'none';
});

textInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // 1. Get the selected suggestion (if any)
        const selectedSuggestion = suggestionsDiv.querySelector('.suggestion-item.selected');

        if (selectedSuggestion) {
            textInput.value = selectedSuggestion.textContent;
        } else {
            console.log('No suggestion selected.');
        }

        suggestionsDiv.style.display = 'none';

        event.preventDefault();
    }
});