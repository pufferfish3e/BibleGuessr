import logic
from flask import Flask, render_template

logic.generate_random_verse()
data = logic.fetch_bible_verse(str(logic.book),int(logic.chapter),str(logic.verse))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html',text_content=data)  

if __name__ == '__main__':
    app.run(debug=True)
