import logic
from flask import Flask, render_template
from markupsafe import Markup

logic.generate_random_verse()
data = logic.fetch_bible_verse(str(logic.book),str(logic.chapter),str(logic.verse))

app = Flask(__name__)

@app.route('/')
def home():
    global data
    return render_template('index.html', text_content=Markup(data))  

if __name__ == '__main__':
    app.run(debug=True)
