
import requests
import random
from typing import Optional, Tuple, Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

# Bible books data structure
books = {
  1: ["Genesis", 50, [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 30, 20, 18, 16, 21, 16, 27, 33, 30, 18, 24, 34, 20, 67, 34, 35, 24, 21, 30, 43, 55, 23, 21, 20, 18, 31, 20, 27, 25, 29, 23, 31, 18, 16, 12, 16, 27, 28, 26, 32]],
  2: ["Exodus", 40, [22, 25, 22, 31, 23, 30, 25, 28, 35, 29, 10, 36, 20, 31, 27, 36, 16, 27, 25, 26, 37, 31, 21, 19, 40, 37]],
  3: ["Leviticus", 27, [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 34, 33, 34, 26]],
  4: ["Numbers", 36, [54, 34, 51, 49, 31, 27, 89, 26, 14, 36, 35, 9, 33, 29, 41, 32, 30, 25, 37, 30, 29, 41, 37, 30, 48, 23, 23, 26, 23, 39, 12, 43, 30, 30, 34, 10]],
  5: ["Deuteronomy", 34, [46, 37, 29, 43, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 18, 25, 20, 25, 28, 20, 17, 30, 21, 29, 19, 22, 15, 23, 19, 20, 30, 52]],
  6: ["Joshua", 24, [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 22, 24, 21, 15, 12, 10, 14, 32, 10, 9, 29, 10, 10, 31]],
  7: ["Judges", 21, [36, 23, 31, 24, 31, 40, 24, 35, 57, 18, 31, 15, 25, 23, 30, 31, 26, 30, 30, 48, 25]],
  8: ["Ruth", 4, [22, 23, 18, 22]],
  9: ["1 Samuel", 31, [28, 36, 21, 22, 12, 21, 17, 22, 27, 25, 15, 25, 23, 22, 35, 23, 25, 29, 24, 17, 21, 20, 17, 18, 28, 25, 12, 17, 11, 30, 31]],
  10: ["2 Samuel", 24, [27, 32, 39, 12, 25, 23, 29, 18, 19, 21, 27, 31, 39, 33, 29, 23, 23, 33, 43, 26, 23, 22, 20, 25]],
  11: ["1 Kings", 22, [53, 46, 28, 34, 28, 38, 51, 66, 28, 29, 43, 33, 34, 29, 30, 34, 21, 37, 29, 14, 29, 20]],
  12: ["2 Kings", 25, [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 20, 18, 37, 21, 38, 28, 37, 23, 30, 35, 22, 20, 30]],
  13: ["1 Chronicles", 29, [54, 55, 24, 43, 29, 81, 40, 40, 25, 14, 47, 22, 15, 25, 29, 43, 27, 30, 19, 30, 14, 34, 31, 31, 19, 32, 13, 25, 30]],
  14: ["2 Chronicles", 36, [17, 22, 17, 21, 14, 12, 22, 28, 31, 36, 20, 13, 25, 27, 30, 16, 29, 19, 23, 31, 26, 20, 15, 21, 27, 14, 9, 10, 35, 26, 23, 24]],
  15: ["Ezra", 10, [11, 70, 20, 24, 8, 22, 28, 36, 15, 44]],
  16: ["Nehemiah", 13, [11, 20, 38, 23, 19, 16, 73, 18, 38, 30, 36, 47, 31]],
  17: ["Esther", 10, [22, 23, 15, 17, 14, 13, 10, 17, 10, 3]],
  18: ["Job", 42, [22, 18, 26, 21, 27, 30, 21, 22, 20, 19, 21, 22, 27, 22, 31, 22, 16, 21, 30, 31, 35, 30, 28, 25, 24, 23, 20, 28, 31, 19, 18, 26, 20, 24, 37, 23, 31, 24, 25, 34, 29, 17]],
  19: ["Psalms", 150, [6, 12, 8, 8, 12, 10, 12, 9, 20, 18, 7, 6, 9, 6, 9, 11, 6, 9, 7, 6, 12, 11, 10, 11, 10, 12, 9, 11, 6, 12, 24, 10, 22, 7, 8, 10, 11, 10, 7, 9, 16, 9, 11, 10, 8, 10, 14, 7, 12, 14, 13, 11, 7, 9, 9, 10, 10, 9, 16, 11, 9, 7, 13, 11, 10, 12, 8, 14, 12, 10, 14, 12, 11, 15, 9, 9, 5, 11, 11, 12, 8, 10, 12, 15, 14, 16, 20, 16, 12, 13, 10, 18, 9, 17, 18, 14, 13, 8, 16, 8, 9, 10, 15, 19, 11, 11, 9, 7, 13, 13, 11, 16, 11, 7, 10, 12, 12, 14, 18, 13, 16, 13, 11, 15, 12, 10, 8, 8, 10, 10, 9, 6, 12, 13, 6, 12, 15, 14, 16, 19, 16, 18, 12, 7, 11, 9, 13, 18, 16, 11, 15, 8, 15, 9, 10, 12]],
  20: ["Proverbs", 31, [33, 22, 35, 27, 29, 35, 27, 36, 18, 32, 31, 28, 25, 34, 29, 33, 27, 24, 29, 30, 29, 31, 18, 34, 27, 25, 29, 17, 27, 33, 31]],
  21: ["Ecclesiastes", 12, [18, 26, 22, 16, 20, 12, 29, 17, 18, 14, 10, 14]],
  22: ["Song of Solomon", 8, [17, 18, 11, 16, 16, 12, 13, 14]],
  23: ["Isaiah", "66", [31, 22, 26, 6, 30, 13, 25, 24, 21, 34, 16, 12, 15, 31, 20, 23, 26, 7, 25, 6, 20, 24, 22, 29, 23, 28, 15, 32, 24, 16, 21, 32, 18, 16, 19, 11, 29, 12, 22, 23, 31, 24, 22, 26, 23, 28, 26, 25, 26, 31, 21, 23, 21, 24, 30, 17, 23, 22, 14, 17, 20, 21, 24, 14]],
  24: ["Jeremiah", 52, [19, 37, 25, 31, 31, 30, 34, 23, 24, 25, 19, 15, 23, 22, 25, 21, 27, 23, 25, 24, 14, 30, 26, 23, 26, 27, 17, 24, 32, 31, 21, 23, 26, 25, 25, 22, 29, 23, 28, 24, 27, 22, 31, 18, 23, 33, 15, 29, 23, 36, 32, 34]],
  25: ["Lamentations", 5, [22, 22, 66, 22, 22]],
  26: ["Ezekiel", 48, [28, 10, 27, 17, 17, 14, 27, 18, 27, 21, 25, 28, 23, 20, 24, 26, 21, 30, 24, 23, 26, 25, 29, 19, 22, 20, 23, 19, 30, 26, 32, 38, 23, 21, 30, 21, 30, 30, 25, 29, 26, 17, 21, 25, 24, 35, 15, 27]],
  27: ["Daniel", 12, [21, 49, 30, 37, 31, 27, 28, 27, 27, 21, 45, 13]],
  28: ["Hosea", 14, [11, 23, 5, 19, 15, 11, 16, 14, 17, 14, 12, 11, 14, 9]],
  29: ["Joel", 3, [20, 32, 21]],
  30: ["Amos", 9, [15, 16, 15, 13, 27, 14, 17, 14, 15]],
  31: ["Obadiah", 1, [21]],
  32: ["Jonah", 4, [17, 10, 10, 11]],
  33: ["Micah", 7, [16, 13, 12, 10, 15, 16, 20]],
  34: ["Nahum", 3, [14, 13, 19]],
  35: ["Habakkuk", 3, [17, 20, 19]],
  36: ["Zephaniah", 3, [18, 15, 20]],
  37: ["Haggai", 2, [15, 23]],
  38: ["Zechariah", 14, [21, 13, 10, 14, 11, 15, 14, 21, 17, 13, 11, 14, 9, 12]],
  39: ["Malachi", 4, [14, 17, 24, 6]],
  40: ["Matthew", 28, [25, 12, 17, 25, 48, 34, 29, 33, 38, 42, 30, 50, 58, 36, 30, 28, 26, 33, 30, 34, 17, 22, 30, 27, 46, 75, 56, 20]],
  41: ["Mark", 16, [45, 38, 35, 41, 43, 30, 37, 38, 24, 52, 25, 33, 38, 21, 29, 20]],
  42: ["Luke", 24, [80, 52, 38, 44, 39, 42, 50, 56, 43, 62, 32, 34, 38, 35, 32, 31, 37, 27, 43, 30, 24, 49, 56, 53]],
  43: ["John", 21, [51, 25, 36, 54, 47, 71, 53, 59, 58, 42, 57, 50, 36, 32, 27, 33, 26, 37, 41, 31]],
  44: ["Acts", 28, [26, 47, 22, 37, 42, 15, 60, 40, 15, 48, 30, 20, 25, 36, 32, 40, 26, 29, 20, 38, 30, 32, 39, 31, 35, 28]],
  45: ["Romans", 16, [32, 29, 31, 25, 21, 23, 25, 39, 27, 21, 36, 21, 14, 21, 33, 27]],
  46: ["1 Corinthians", 16, [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 29, 40, 24, 24]],
  47: ["2 Corinthians", 13, [24, 17, 18, 18, 21, 18, 16, 24, 16, 33, 24, 21, 14]],
  48: ["Galatians", 6, [24, 21, 29, 31, 26, 18]],
  49: ["Ephesians", 6, [23, 22, 21, 32, 33, 24]],
  50: ["Philippians", 4, [30, 30, 21, 23]],
  51: ["Colossians", 4, [29, 23, 25, 18]],
  52: ["1 Thessalonians", 5, [10, 20, 13, 18, 28]],
  53: ["2 Thessalonians", 3, [12, 17, 18]],
  54: ["1 Timothy", 6, [20, 15, 16, 16, 25, 21]],
  55: ["2 Timothy", 4, [18, 26, 17, 22]],
  56: ["Titus", 3, [16, 15, 15]],
  57: ["Philemon", 1, [25]],
  58: ["Hebrews", 13, [14, 18, 19, 16, 14, 20, 28, 13, 25, 18, 24, 29, 25]],
  59: ["James", 5, [27, 26, 18, 17, 20]],
  60: ["1 Peter", 5, [25, 25, 22, 19, 14]],
  61: ["2 Peter", 3, [21, 22, 18]],
  62: ["1 John", 5, [10, 29, 24, 21, 21]],
  63: ["2 John", 1, [13]],
  64: ["3 John", 1, [15]],
  65: ["Jude", 1, [25]],
  66: ["Revelation", 22, [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 18, 17, 18, 20, 16, 21, 27, 24, 21, 21, 24, 21]]
}

# Global variables for current verse
current_verse = {
    "book_index": None,
    "book": None,
    "chapter": None,
    "verse": None,
    "max_verse": None
}

def generate_random_verse() -> Dict[str, Any]:
    """Generate a random Bible verse and return its details"""
    book_index = random.randint(1, 66)
    book = books[book_index][0]
    chapter = random.randint(1, int(books[book_index][1]))
    max_verse = int(books[book_index][2][int(chapter)-1])
    verse = random.randint(1, max_verse)
    
    # Update global state
    current_verse.update({
        "book_index": book_index,
        "book": book,
        "chapter": chapter,
        "verse": verse,
        "max_verse": max_verse
    })
    
    return current_verse

def fetch_bible_verse(book: str, chapter: str, verse: str) -> Optional[str]:
    """Fetch a Bible verse from the ESV API and format it for display"""
    url = "https://api.esv.org/v3/passage/text/"
    api_token = os.getenv("ESV_API_KEY")
    
    if not api_token:
        print("Error: ESV API key not found in environment variables")
        return None
    
    verse_num = int(verse)
    max_verse = current_verse["max_verse"]
    
    # Calculate verse range to fetch (previous, current, and next verse)
    start_verse = max(1, verse_num - 1)
    end_verse = min(max_verse, verse_num + 1)
    
    params = {
        "q": f"{book} {chapter}:{start_verse}-{end_verse}",
        "include-passage-references": False,
        "include-verse-numbers": True, 
        "include-footnotes": False,
        "include-copyright": False,
        "include-headings": False,
        "include-selahs": False,
        "indent-paragraphs": 0,
        "indent-poetry-lines": 0,
        "indent-psalm-doxology": 0
    }

    try:
        response = requests.get(
            url,
            headers={"Authorization": api_token},
            params=params
        )
        response.raise_for_status()
        
        # Process API response
        raw_text = response.json().get("passages", [""])[0].strip()
        if not raw_text:
            return "Could not fetch Bible verse. Please try again."
            
        # Remove copyright notice if present
        if raw_text.endswith("ESV"):
            raw_text = raw_text[:-6]
            
        # Split by verse numbers
        parts = raw_text.split("[")
        cleaned_response = []
        
        for item in parts:
            if "]" in item:
                item = item.split("]")[1].strip()
            if "\n" in item:
                item = str(item.replace("\n", " "))
            if item:  # Only add non-empty items
                cleaned_response.append(item)
        
        # Skip the first empty element if it exists
        if cleaned_response and not cleaned_response[0]:
            cleaned_response = cleaned_response[1:]
        
        # Format the verse with the target verse highlighted
        if len(cleaned_response) == 3:
            return f"{cleaned_response[0]} <strong>{cleaned_response[1]}</strong> {cleaned_response[2]}"
        elif len(cleaned_response) == 2:
            if int(verse) == max_verse:
                return f"{cleaned_response[0]} <strong>{cleaned_response[1]}</strong>"
            else:
                return f"<strong>{cleaned_response[0]}</strong> {cleaned_response[1]}"
        elif len(cleaned_response) == 1:
            return f"<strong>{cleaned_response[0]}</strong>"
        else:
            return "Error formatting Bible verse."
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching Bible verse: {e}")
        return f"Error fetching Bible verse: {str(e)}"

def calculate_score(user_book: str, user_chapter: str, user_verse: str) -> int:
    """Calculate the user's score based on how close their guess is to the actual verse"""
    # Initialize score
    score = 1000
    
    # Convert book name to book index if needed
    if isinstance(user_book, str) and not user_book.isdigit():
        user_book_index = None
        user_book_lower = user_book.lower()
        for idx, book_data in books.items():
            if book_data[0].lower() == user_book_lower:
                user_book_index = idx
                break
        
        if user_book_index is None:
            # If book not found, major penalty
            score *= 0.1
            user_book_index = 0
    else:
        user_book_index = int(user_book)
    
    # Score for book accuracy
    if user_book_index == current_verse["book_index"]:
        # Correct book, no penalty
        pass
    else:
        # Calculate penalty based on distance
        book_diff = abs(user_book_index - current_verse["book_index"])
        if book_diff < 2:
            score *= 0.9
        elif book_diff < 4:
            score *= 0.8
        elif book_diff < 6:
            score *= 0.7
        elif book_diff < 10:
            score *= 0.6
        elif book_diff < 15:
            score *= 0.5
        elif book_diff < 20:
            score *= 0.4
        elif book_diff < 25:
            score *= 0.3
        else:
            score *= 0.2
    
    # Score for chapter accuracy
    user_chapter = int(user_chapter)
    if user_chapter == current_verse["chapter"]:
        # Correct chapter, no penalty
        pass
    else:
        # Calculate penalty based on distance
        chapter_diff = abs(user_chapter - current_verse["chapter"])
        if chapter_diff < 2:
            score += 90
        elif chapter_diff < 4:
            score += 80
        elif chapter_diff < 6:
            score += 70
        elif chapter_diff < 10:
            score += 60
        elif chapter_diff < 15:
            score += 50
        elif chapter_diff < 20:
            score += 40
        elif chapter_diff < 25:
            score += 30
        else:
            score += 20
    
    # Score for verse accuracy
    user_verse = int(user_verse)
    if user_verse == current_verse["verse"]:
        # Correct verse, no penalty
        pass
    else:
        # Calculate penalty based on distance
        verse_diff = abs(user_verse - current_verse["verse"])
        if verse_diff < 2:
            score += 9
        elif verse_diff < 4:
            score += 8
        elif verse_diff < 6:
            score += 7
        elif verse_diff < 10:
            score += 6
        elif verse_diff < 15:
            score += 5
        elif verse_diff < 20:
            score += 4
        elif verse_diff < 25:
            score += 3
        else:
            score += 2
    
    return int(score)

def calculate_average(score: int) -> float:
    """Calculate percentage score"""
    if score < 500:
        return 0.0
    
    # Scale score from 500-1000 to 0-100%
    percentage = (score - 500) / 5.0
    return round(percentage, 1)

def get_book_names() -> list:
    """Return a list of all Bible book names for validation"""
    return [books[idx][0] for idx in range(1, 67)]

if __name__ == "__main__":
    # Test code
    test_verse = generate_random_verse()
    print(f"Generated verse: {test_verse['book']} {test_verse['chapter']}:{test_verse['verse']}")
