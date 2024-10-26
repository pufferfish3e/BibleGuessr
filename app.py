import requests

def fetch_bible_verse(book, chapter, verse):
    url = "https://api.esv.org/v3/passage/text/"
    headers = {
        "Authorization": "218ba7cda3be2343ea707e4846fbdc278299c56e"
    }
    query = f"{book} {chapter}:{verse}"
    params = {
        "q": query,
        "include-passage-references": False,
        "include-verse-numbers": False,
        "include-footnotes": False,
        "include-copyright": False,
        "include-headings": False
    }
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()

        data = response.json()["passages"][0].strip()[:-6]  
        print(data)

    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)

# fetch_bible_verse("John", 11, 36)

